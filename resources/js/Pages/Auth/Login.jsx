import React, { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const [showEmailForm, setShowEmailForm] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#050505] relative overflow-hidden font-sans">
            <Head title="Log In - Eventix" />

            {/* Glow Effect Background */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none"></div>

            {/* Logo Eventix di Luar Card (Logo di atas teks, tanpa tulisan Part of) */}
            <div className="flex flex-col items-center mb-8 relative z-10">
                <img src="/images/logo.png" alt="Eventix Logo" className="h-12 object-contain mb-3 drop-shadow-[0_0_10px_rgba(232,255,71,0.2)]" onError={(e) => e.target.style.display='none'} />
                <span className="text-4xl font-black tracking-tighter text-white uppercase">
                    EVEN<span className="text-[#e8ff47]">TIX</span>
                </span>
            </div>

            {/* Main Card */}
            <div className="w-full sm:max-w-[400px] px-8 py-10 bg-[#111111] shadow-2xl border border-white/5 sm:rounded-2xl relative z-10">
                
                {status && <div className="mb-4 font-medium text-sm text-green-400">{status}</div>}

                {/* 🔄 KONDISI 1: TAMPILAN AWAL (MENU PILIHAN) */}
                {!showEmailForm ? (
                    <div className="flex flex-col gap-4 animate-[fadeIn_0.3s_ease-out]">
                        {/* Tombol Google Utama */}
                        <a 
                            href={route('google.redirect')} 
                            className="w-full flex items-center p-1 bg-[#1a73e8] hover:bg-[#155ebd] transition-colors rounded-lg overflow-hidden group"
                        >
                            <div className="w-10 h-10 bg-white rounded flex items-center justify-center shrink-0">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
                                    <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                                    <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                                    <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                                    <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
                                </svg>
                            </div>
                            <span className="flex-1 text-center font-medium text-white pr-10 tracking-wide">Continue with Google</span>
                        </a>

                        {/* Tombol Email / Phone */}
                        <button 
                            type="button"
                            onClick={() => setShowEmailForm(true)}
                            className="w-full flex items-center p-1 bg-transparent border border-white/20 hover:bg-white/5 transition-colors rounded-lg overflow-hidden"
                        >
                            <div className="w-10 h-10 flex items-center justify-center shrink-0 text-gray-300">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                            </div>
                            <span className="flex-1 text-center font-medium text-white pr-10 tracking-wide">Continue with Phone or Email</span>
                        </button>

                        {/* Divider */}
                        <div className="flex items-center my-4">
                            <div className="flex-1 border-t border-white/10"></div>
                            <span className="px-3 text-xs text-gray-500 bg-[#111] font-medium">Or continue with</span>
                            <div className="flex-1 border-t border-white/10"></div>
                        </div>

                        {/* Social Buttons Grid */}
                        <div className="flex justify-center gap-4 mb-4">
                            <button className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors group">
                                <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"></path></svg>
                            </button>
                            <button className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors group">
                                <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.89-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-1.226 1.76-2.504 3.51-4.43 3.51-1.874 0-2.553-1.15-4.697-1.15-2.167 0-2.924 1.12-4.64 1.12-1.908 0-3.392-1.9-4.576-3.65-2.543-3.66-4.045-9.35-1.745-13.34 1.14-1.96 3.09-3.21 5.228-3.21 1.834 0 3.327 1.19 4.615 1.19 1.34 0 3.192-1.29 5.396-1.29 1.636 0 3.208.72 4.314 1.94-3.774 2.24-3.146 7.42.723 8.97-.24.71-.56 1.42-.97 2.09z"></path></svg>
                            </button>
                            <button className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors group">
                                <svg className="w-5 h-5 text-gray-300 group-hover:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 15.68a6.34 6.34 0 006.33 6.33 6.33 6.33 0 006.31-6.2v-5.9a8.55 8.55 0 004.36 1.2V7.63a5.07 5.07 0 01-2.41-.94z"></path></svg>
                            </button>
                        </div>

                        {/* Terms & Conditions */}
                        <div className="text-center mt-4">
                            <p className="text-xs text-gray-500 leading-relaxed">
                                By logging in, you agree to Eventix's <br />
                                <a href="#" className="underline hover:text-gray-300 transition-colors">Privacy Policy</a> and <a href="#" className="underline hover:text-gray-300 transition-colors">Terms & Conditions</a>.
                            </p>
                        </div>
                    </div>
                ) : (

                    /* 🔄 KONDISI 2: TAMPILAN FORM EMAIL */
                    <div className="animate-[fadeIn_0.3s_ease-out]">
                        <div className="flex items-center mb-6">
                            <button 
                                onClick={() => setShowEmailForm(false)}
                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors mr-3"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                            </button>
                            <h3 className="text-lg font-bold text-white">Login with Email</h3>
                        </div>

                        <form onSubmit={submit}>
                            <div>
                                <InputLabel htmlFor="email" value="Email" className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-2" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full bg-[#0a0a0a] border border-white/10 text-white rounded-xl focus:border-[#e8ff47] focus:ring-[#e8ff47]"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email ? "Email atau password yang Anda masukkan salah." : ""} className="mt-2 text-red-500 font-bold text-xs" />
                            </div>

                            <div className="mt-6">
                                <InputLabel htmlFor="password" value="Password" className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-2" />
                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full bg-[#0a0a0a] border border-white/10 text-white rounded-xl focus:border-[#e8ff47] focus:ring-[#e8ff47]"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />
                                <InputError message={errors.password} className="mt-2 text-red-500 font-bold text-xs" />
                            </div>

                            <div className="block mt-6 flex justify-between items-center">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="remember"
                                        checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="bg-[#0a0a0a] border-white/10 text-[#e8ff47] focus:ring-[#e8ff47]"
                                    />
                                    <span className="ms-2 text-xs text-gray-500 font-bold">Ingat Saya</span>
                                </label>

                                {canResetPassword && (
                                    <Link href={route('password.request')} className="text-xs text-gray-500 hover:text-[#e8ff47] font-bold transition-colors">
                                        Lupa password?
                                    </Link>
                                )}
                            </div>

                            <div className="mt-8 flex flex-col gap-4">
                                <button 
                                    type="submit" 
                                    disabled={processing}
                                    className={`w-full flex justify-center items-center gap-2 px-4 py-3.5 bg-[#e8ff47] border border-transparent rounded-xl font-black text-xs text-black uppercase tracking-widest hover:bg-[#d4ed35] transition-all shadow-[0_0_20px_rgba(232,255,71,0.2)] ${processing ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {processing ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Verifying...
                                        </>
                                    ) : (
                                        'Sign In'
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
}