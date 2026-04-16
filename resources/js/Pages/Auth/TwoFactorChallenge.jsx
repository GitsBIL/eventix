import React, { useState, useRef, useEffect } from 'react';
import { Head, useForm, usePage } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function TwoFactorChallenge() {
    const { auth } = usePage().props;
    
    // Setup form Inertia
    const { data, setData, post, processing, errors } = useForm({
        code: '',
    });

    // State khusus buat 6 kotak OTP
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const inputRefs = useRef([]);

    // Fungsi canggih buat nanganin input 6 kotak
    const handleChange = (index, value) => {
        // Cuma bolehin angka
        if (isNaN(value)) return;

        const newOtp = [...otp];
        // Ambil karakter terakhir aja (biar gak numpuk di 1 kotak)
        newOtp[index] = value.substring(value.length - 1);
        setOtp(newOtp);

        // Gabungin 6 angka dan simpan ke form Inertia
        const combinedCode = newOtp.join('');
        setData('code', combinedCode);

        // Pindah otomatis ke kotak kanan kalau udah diisi
        if (value && index < 5) {
            inputRefs.current[index + 1].focus();
        }
    };

    // Fungsi buat hapus (Backspace) mundur otomatis
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1].focus();
        }
    };

    // Fungsi buat Paste (kalau user copy dari Google Authenticator)
    const handlePaste = (e) => {
        e.preventDefault();
        const pasteData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6).split('');
        
        if (pasteData.length > 0) {
            const newOtp = [...otp];
            pasteData.forEach((char, i) => {
                if (i < 6) newOtp[i] = char;
            });
            setOtp(newOtp);
            setData('code', newOtp.join(''));
            
            // Fokus ke kotak terakhir yang terisi
            const focusIndex = Math.min(pasteData.length, 5);
            inputRefs.current[focusIndex].focus();
        }
    };

    const submit = (e) => {
        e.preventDefault();
        // Pastiin URL route-nya sesuai dengan nama route 2FA POST lu
        post(route('2fa.challenge')); 
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<span className="text-[#e8ff47] font-black uppercase tracking-[0.2em] text-lg">Security Check</span>}
        >
            <Head title="2FA Verification - Eventix" />

            <div className="min-h-[80vh] flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#0a0a0a] relative overflow-hidden">
                
                {/* Efek Pendaran Cahaya (Glow) di Background */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#e8ff47]/5 blur-[120px] rounded-full pointer-events-none"></div>

                {/* Card Verifikasi (Glassmorphism + Neon Border) */}
                <div className="w-full max-w-lg mt-6 px-10 py-12 bg-[#111111]/90 backdrop-blur-xl border border-white/5 rounded-3xl shadow-[0_0_40px_rgba(232,255,71,0.05)] relative z-10 transition-all focus-within:border-[#e8ff47]/30 focus-within:shadow-[0_0_50px_rgba(232,255,71,0.15)]">
                    
                    <div className="flex flex-col items-center mb-8">
                        {/* Ikon Tameng (Shield) */}
                        <div className="w-16 h-16 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                            <svg className="w-8 h-8 text-[#e8ff47]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-black text-white tracking-tight mb-2">Verifikasi 2-Langkah <span className="text-blue-400">🛡️</span></h2>
                        <p className="text-sm text-gray-500 text-center font-medium leading-relaxed max-w-xs">
                            Buka aplikasi Google Authenticator di HP kamu dan masukkan 6 digit angka.
                        </p>
                    </div>

                    <form onSubmit={submit} className="flex flex-col items-center">
                        
                        {/* 6 Kotak Input OTP (Kunci Profesionalitas) */}
                        <div className="flex gap-3 mb-6 justify-center" onPaste={handlePaste}>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => (inputRefs.current[index] = el)}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    className={`w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-black text-white bg-[#0a0a0a] border rounded-xl focus:ring-0 transition-all shadow-inner ${
                                        errors.code ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#e8ff47] focus:bg-[#1a1a1a]'
                                    }`}
                                />
                            ))}
                        </div>

                        {/* Pesan Error Validasi */}
                        {errors.code && (
                            <p className="text-red-500 text-xs font-bold mb-6 tracking-wide animate-pulse">
                                {errors.code}
                            </p>
                        )}

                        {/* Tombol Submit */}
                        <button
                            type="submit"
                            disabled={processing || data.code.length < 6}
                            className="w-full py-4 px-4 bg-[#e8ff47] text-black rounded-xl font-black text-sm uppercase tracking-widest hover:bg-[#d4ed35] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#e8ff47] focus:ring-offset-[#111] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(232,255,71,0.2)]"
                        >
                            {processing ? 'Memverifikasi...' : 'Masuk ke Dashboard'}
                        </button>

                        {/* Link Bantuan Bawah */}
                        <div className="mt-8 flex gap-4 text-xs font-bold">
                            <button type="button" className="text-gray-500 hover:text-white transition-colors">Kirim Ulang Kode</button>
                            <span className="text-gray-700">|</span>
                            <button type="button" className="text-[#e8ff47] hover:text-white transition-colors">Butuh Bantuan?</button>
                        </div>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}