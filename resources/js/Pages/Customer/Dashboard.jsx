import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';

export default function CustomerDashboard() {
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-[#e8ff47] leading-tight">Motto</h2>}
        >
            <Head title="Customer Dashboard" />

            <div className="py-12 bg-[#0a0a0a] min-h-screen selection:bg-[#e8ff47] selection:text-black">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Welcome Banner */}
                    <div className="bg-[#111111] overflow-hidden shadow-2xl sm:rounded-2xl border border-white/5">
                        <div className="p-8 text-gray-300">
                            <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter">
                                Halo, <span className="text-[#e8ff47]">{auth.user?.FullName || 'User'}</span>! 👋
                            </h3>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-widest leading-relaxed max-w-2xl">
                                Selamat datang di sistem tiket <span className="font-bold text-white">EVENTIX</span>. Keamanan 2FA kamu sudah aktif. Amankan tiket konser impianmu sekarang!
                            </p>
                        </div>
                    </div>

                    {/* Stats Grid (Hanya Dummy) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-[#111] p-8 rounded-2xl border border-white/5 hover:border-[#e8ff47]/20 transition-all">
                            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">My Upcoming Events</p>
                            <p className="text-5xl font-black text-[#e8ff47]">0</p>
                            <p className="text-xs text-gray-500 mt-1">Concerts/Festivals</p>
                        </div>
                        <div className="bg-[#111] p-8 rounded-2xl border border-white/5 hover:border-[#e8ff47]/20 transition-all">
                            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">My Ticket Wallet</p>
                            <p className="text-5xl font-black text-[#e8ff47]">0</p>
                            <p className="text-xs text-gray-500 mt-1">Active Tickets</p>
                        </div>
                    </div>

                    {/* No Tickets Section */}
                    <div className="bg-[#111] p-12 rounded-3xl text-center border border-white/5 space-y-6">
                        <span className="text-7xl">🎟️</span>
                        <h4 className="text-xl font-bold text-white uppercase tracking-tight">Belum Ada Tiket yang Dibeli</h4>
                        <p className="text-sm text-gray-600 font-medium max-w-md mx-auto leading-relaxed">
                            Cari konser atau festival favoritmu sekarang dan rasakan pengalaman "War" tiket yang seru & aman!
                        </p>
                        <a href="/" className="inline-block px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest text-white hover:bg-[#e8ff47] hover:text-black transition-all">
                            Cari Event
                        </a>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}