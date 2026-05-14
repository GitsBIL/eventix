import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';

export default function CustomerDashboard() {
    // Tangkap data 'tickets' yang dikirim dari web.php
    const { auth, tickets = [] } = usePage().props;

    // Kalkulasi otomatis untuk angka di atas (Stats)
    const totalEvents = tickets.length;
    const totalTickets = tickets.reduce((sum, ticket) => sum + ticket.Qty, 0);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-[#e8ff47] leading-tight">Motto</h2>}
        >
            <Head title="Customer Dashboard" />

            <div className="py-12 bg-[#0a0a0a] min-h-screen selection:bg-[#e8ff47] selection:text-black">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Welcome Banner + Browse Events Button */}
                    <div className="bg-gradient-to-r from-[#111111] to-[#0d0d0d] overflow-hidden shadow-2xl sm:rounded-2xl border border-white/5">
                        <div className="p-8 md:p-10 text-gray-300 flex flex-col md:flex-row justify-between items-center gap-6">
                            <div className="text-center md:text-left">
                                <h3 className="text-2xl font-black mb-2 uppercase tracking-tighter">
                                    Halo, <span className="text-[#e8ff47]">{auth.user?.FullName || 'User'}</span>! 👋
                                </h3>
                                <p className="text-sm font-medium text-gray-500 uppercase tracking-widest leading-relaxed max-w-xl">
                                    Selamat datang di sistem tiket <span className="font-bold text-white">EVENTIX</span>. Amankan tiket konser impianmu sekarang!
                                </p>
                            </div>
                            <Link 
                                href={route('home')} 
                                className="shrink-0 px-8 py-4 bg-[#e8ff47] text-black font-black rounded-xl text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_10px_20px_rgba(232,255,71,0.2)]"
                            >
                                Browse More Events
                            </Link>
                        </div>
                    </div>

                    {/* Stats Grid Dinamis */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-[#111] p-8 rounded-2xl border border-white/5 hover:border-[#e8ff47]/20 transition-all">
                            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">My Upcoming Events</p>
                            <p className="text-5xl font-black text-[#e8ff47]">{totalEvents}</p>
                            <p className="text-xs text-gray-500 mt-1">Concerts/Festivals</p>
                        </div>
                        <div className="bg-[#111] p-8 rounded-2xl border border-white/5 hover:border-[#e8ff47]/20 transition-all">
                            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mb-2">My Ticket Wallet</p>
                            <p className="text-5xl font-black text-[#e8ff47]">{totalTickets}</p>
                            <p className="text-xs text-gray-500 mt-1">Active Tickets</p>
                        </div>
                    </div>

                    {/* Logika Kondisi: Tampilkan Riwayat Tiket ATAU Pesan Kosong */}
                    {tickets.length > 0 ? (
                        <div className="space-y-4">
                            <h4 className="text-lg font-bold text-white uppercase tracking-widest mb-4">Riwayat Pesanan</h4>
                            {tickets.map((ticket, index) => (
                                <div key={index} className="bg-[#111] p-6 rounded-2xl border border-white/5 hover:border-[#e8ff47]/30 transition-all flex flex-col md:flex-row justify-between gap-6 md:items-center">
                                    <div>
                                        <h4 className="text-xl font-bold text-white mb-1">{ticket.EventName}</h4>
                                        <p className="text-sm text-gray-400 mb-2 font-medium">
                                            {ticket.Location} • <span className="text-[#e8ff47]">{ticket.CategoryName}</span> (x{ticket.Qty})
                                        </p>
                                        <p className="text-xs font-mono text-gray-600">INVOICE: {ticket.OrderNo}</p>
                                    </div>
                                    <div className="text-left md:text-right flex flex-col justify-center">
                                        <p className="text-2xl font-black text-white mb-2">
                                            Rp {Number(ticket.TotalAmount).toLocaleString()}
                                        </p>
                                        <div>
                                            {/* Status Badge Dinamis */}
                                            <span className={`inline-block px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest ${
                                                ticket.PaymentStatus === 'pending_payment' 
                                                ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' 
                                                : 'bg-green-500/10 text-green-400 border border-green-500/20'
                                            }`}>
                                                {ticket.PaymentStatus.replace('_', ' ')}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        /* No Tickets Section (Tampil kalau data kosong) */
                        <div className="bg-[#111] p-12 rounded-3xl text-center border border-white/5 space-y-6">
                            <span className="text-7xl">🎟️</span>
                            <h4 className="text-xl font-bold text-white uppercase tracking-tight">Belum Ada Tiket yang Dibeli</h4>
                            <p className="text-sm text-gray-600 font-medium max-w-md mx-auto leading-relaxed">
                                Cari konser atau festival favoritmu sekarang dan rasakan pengalaman "War" tiket yang seru & aman!
                            </p>
                            <Link href={route('home')} className="inline-block px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest text-white hover:bg-[#e8ff47] hover:text-black transition-all">
                                Cari Event
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}