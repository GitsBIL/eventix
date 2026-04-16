import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function TwoFactorSetup({ auth, qrCodeSvg, secretKey }) {
    // Mesin pengirim data dari form
    const { data, setData, post, processing, errors } = useForm({
        code: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('2fa.verify')); // Ngirim ke rute pengecekan
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-[#e8ff47] leading-tight">Setup 2FA Security</h2>}
        >
            <Head title="Setup 2FA" />

            <div className="py-12 bg-[#0a0a0a] min-h-screen">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-[#111111]/80 backdrop-blur-xl overflow-hidden shadow-2xl sm:rounded-2xl border border-white/10 p-8 text-center text-gray-300">

                        <h3 className="text-2xl font-bold text-white mb-4">Aktifkan Google Authenticator 🔐</h3>
                        <p className="mb-6 text-sm text-gray-400">Scan QR Code di bawah ini menggunakan aplikasi Google Authenticator di HP kamu.</p>

                        <div className="flex justify-center mb-6">
                            <div 
                                className="bg-white p-4 rounded-xl shadow-lg"
                                dangerouslySetInnerHTML={{ __html: qrCodeSvg }} 
                            />
                        </div>

                        <p className="text-sm mb-2 text-gray-400">Atau masukkan kode rahasia ini secara manual:</p>
                        <div className="bg-[#1a1a1a] p-3 rounded-lg border border-white/10 inline-block font-mono text-[#e8ff47] tracking-widest text-xl mb-8">
                            {secretKey}
                        </div>

                        {/* KITA UBAH BAGIAN INI JADI FORM YAH */}
                        <form onSubmit={submit} className="border-t border-white/10 pt-6 mt-4">
                            <p className="text-sm text-gray-400 mb-4">Setelah di-scan, masukkan 6 digit angka dari HP kamu di bawah ini untuk konfirmasi:</p>
                            <div className="flex flex-col items-center gap-3">
                                <div className="flex justify-center gap-3">
                                    <input
                                        type="text"
                                        value={data.code}
                                        onChange={(e) => setData('code', e.target.value)}
                                        placeholder="123456"
                                        className="bg-[#1a1a1a] border border-white/10 text-white text-center text-xl rounded-lg focus:ring-[#e8ff47] focus:border-[#e8ff47] w-48 py-3 tracking-widest"
                                        maxLength="6"
                                        autoComplete="off"
                                    />
                                    <button 
                                        type="submit" 
                                        disabled={processing}
                                        className="bg-[#e8ff47] text-black font-bold px-6 py-3 rounded-lg hover:bg-[#d4e830] transition duration-150 disabled:opacity-50"
                                    >
                                        Konfirmasi 2FA
                                    </button>
                                </div>
                                {/* Nampilin pesan error kalau salah masukin kode */}
                                {errors.code && <div className="text-red-500 font-bold mt-2">{errors.code}</div>}
                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}