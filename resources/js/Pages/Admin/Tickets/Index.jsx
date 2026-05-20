import React, { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import Swal from 'sweetalert2';
import AdminSidebar from '@/Components/AdminSidebar';

export default function IssuedTicketsIndex({ issuedTickets = [], event = {}, stats = {} }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    // Mencegah error jika tanggal belum tersedia
    const formattedDate = event?.EventDate 
        ? new Date(event.EventDate).toLocaleDateString('id-ID', { 
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
        }) 
        : 'Tanggal Belum Ditetapkan';

    const filteredTickets = useMemo(() => {
        return issuedTickets.filter(t => {
            const searchString = `${t.OrderNo} ${t.AttendeeName}`.toLowerCase();
            if (!searchString.includes(searchTerm.toLowerCase())) return false;
            
            if (activeFilter === 'Valid / Paid') return ['paid', 'issued'].includes(t.PaymentStatus);
            if (activeFilter === 'Pending') return t.PaymentStatus === 'pending_payment';
            if (activeFilter === 'Cancelled') return t.PaymentStatus === 'cancelled';
            return true;
        });
    }, [issuedTickets, searchTerm, activeFilter]);

    const handleCompTicket = () => {
        Swal.fire({
            title: 'Terbitkan Tiket Gratis',
            text: 'Fitur penerbitan tiket masuk gratis untuk sponsor atau media akan segera dikembangkan.',
            icon: 'info',
            background: '#0F172A',
            color: '#fff',
            confirmButtonColor: '#A3C957'
        });
    };

    return (
        <div className="flex h-screen bg-[#070B17] text-slate-300 font-sans overflow-hidden selection:bg-[#A3C957]/30 selection:text-white">
            <Head title={`Daftar Tamu - ${event?.EventName || 'Memuat...'}`} />
            
            <AdminSidebar />

            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#38BDF8]/[0.015] rounded-full blur-3xl pointer-events-none"></div>

                {/* WORKSPACE HEADER TERINTEGRASI */}
                <header className="px-8 pt-8 pb-0 bg-[#070B17]/95 backdrop-blur-sm shrink-0 border-b border-white/[0.04] z-20 flex flex-col">
                    
                    <div className="mb-4">
                        <p className="text-[10px] font-bold text-[#38BDF8] tracking-widest uppercase mb-3 flex items-center gap-2 drop-shadow-md">
                            <Link href={route('admin.dashboard')} className="hover:text-white transition-colors">Operations</Link> 
                            <span className="text-slate-500">/</span> 
                            <Link href={route('admin.events.index')} className="hover:text-white transition-colors">Event Management</Link> 
                            <span className="text-slate-500">/</span> 
                            <span className="text-white">{event?.EventName}</span>
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-20 bg-[#0F172A] rounded-lg border border-white/[0.08] overflow-hidden shrink-0 shadow-lg">
                                {event?.BannerImage ? (
                                    <img src={`/storage/${event.BannerImage}`} alt={event.EventName} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-600">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1.5">
                                    <h1 className="text-2xl font-bold text-white tracking-tight leading-none">{event?.EventName}</h1>
                                    <span className="px-2.5 py-1 rounded bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm shadow-lg">Gate Ready</span>
                                </div>
                                <p className="text-xs text-slate-400 font-medium flex items-center gap-3 drop-shadow-md">
                                    <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-[#A3C957]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> {event?.Location || 'TBA'}</span>
                                    <span className="text-slate-500">|</span>
                                    <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-[#A3C957]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> {formattedDate}</span>
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-[#0F172A] border border-white/[0.08] hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-2">
                                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                Ekspor CSV
                            </button>
                            <button onClick={handleCompTicket} className="px-5 py-2 bg-white hover:bg-slate-200 text-[#070B17] rounded-lg text-xs font-bold transition-all flex items-center gap-2 shadow-sm hover:-translate-y-0.5">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg>
                                Comp Ticket
                            </button>
                        </div>
                    </div>

                    {/* NAVIGASI TAB WORKSPACE - MENGGUNAKAN OPTIONAL CHAINING AGAR TIDAK CRASH */}
                    <div className="flex items-center gap-8">
                        <Link href={event?.ID ? route('admin.events.show', event.ID) : '#'} className="pb-4 text-xs font-semibold text-slate-500 hover:text-slate-300 transition-all">Dashboard Overview</Link>
                        <Link href={event?.ID ? route('admin.events.categories', event.ID) : '#'} className="pb-4 text-xs font-semibold text-slate-500 hover:text-slate-300 transition-all">Ticket Inventory</Link>
                        <Link href={event?.ID ? route('admin.events.tickets', event.ID) : '#'} className="pb-4 text-xs font-bold text-[#38BDF8] transition-all relative">
                            Attendees & Guests
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#38BDF8] rounded-t-full shadow-[0_-2px_10px_rgba(56,189,248,0.5)]"></div>
                        </Link>
                        <Link href="#" className="pb-4 text-xs font-semibold text-slate-500 hover:text-slate-300 transition-all">Transactions</Link>
                        <Link href="#" className="pb-4 text-xs font-semibold text-slate-500 hover:text-slate-300 transition-all">Analytics</Link>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 no-scrollbar scroll-smooth">
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
                        <div className="bg-[#0F172A] p-5 rounded-xl border border-white/[0.04] shadow-sm flex flex-col justify-between">
                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-4">Valid Tickets (Issued)</p>
                            <h3 className="text-3xl font-light text-white tracking-tight">{stats?.totalIssued || 0} <span className="text-xs text-slate-500 font-medium">pax</span></h3>
                        </div>
                        <div className="bg-[#0F172A] p-5 rounded-xl border border-white/[0.04] shadow-sm flex flex-col justify-between">
                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Pending Payment</p>
                            <h3 className="text-3xl font-light text-white tracking-tight">{stats?.pendingTickets || 0} <span className="text-xs text-slate-500 font-medium">tickets</span></h3>
                        </div>
                        <div className="bg-[#0F172A] p-5 rounded-xl border border-white/[0.04] shadow-sm flex flex-col justify-between">
                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-[#38BDF8]"></span> Gate Checked-In</p>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-3xl font-light text-white tracking-tight">{stats?.checkedIn || 0}</h3>
                                <span className="text-[10px] text-slate-500">dari {stats?.totalIssued || 0} hadir</span>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-[#0F172A] to-[#070B17] p-5 rounded-xl border border-white/[0.04] shadow-sm flex flex-col justify-between relative overflow-hidden">
                            <div className="relative z-10">
                                <p className="text-[10px] font-bold text-[#A3C957] uppercase tracking-widest mb-4">Gross Revenue Volume</p>
                                <h3 className="text-xl font-bold text-white tracking-tight">{stats?.grossRevenue || 'Rp 0'}</h3>
                            </div>
                            <svg className="w-24 h-24 absolute -right-4 -bottom-4 text-white/[0.02]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>
                        </div>
                    </div>

                    <div className="flex items-center justify-between mb-4 border-b border-white/[0.03]">
                        <div className="flex items-center gap-6">
                            {['All', 'Valid / Paid', 'Pending', 'Cancelled'].map(tab => (
                                <button key={tab} onClick={() => setActiveFilter(tab)} className={`pb-2.5 text-xs font-semibold transition-all relative ${activeFilter === tab ? 'text-white' : 'text-slate-600 hover:text-slate-300'}`}>
                                    {tab}
                                    {activeFilter === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white shadow-[0_-2px_10px_rgba(255,255,255,0.3)]"></div>}
                                </button>
                            ))}
                        </div>
                        <div className="relative mb-2">
                            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <input type="text" placeholder="Cari Kode atau Nama..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-[#0F172A] border border-white/[0.05] focus:border-[#38BDF8]/50 rounded-lg pl-9 pr-4 py-1.5 text-xs text-white outline-none transition-all w-64 shadow-inner" />
                        </div>
                    </div>

                    <div className="bg-[#0F172A] rounded-xl border border-white/[0.04] shadow-sm overflow-hidden flex flex-col">
                        <div className="overflow-x-auto">
                            {filteredTickets.length > 0 ? (
                                <table className="w-full text-left whitespace-nowrap">
                                    <thead className="bg-[#070B17]/40 border-b border-white/[0.06]">
                                        <tr>
                                            <th className="px-6 py-5 text-xs font-semibold text-slate-500">Kode Booking</th>
                                            <th className="px-6 py-5 text-xs font-semibold text-slate-500">Info Pengunjung</th>
                                            <th className="px-6 py-5 text-xs font-semibold text-slate-500">Kategori Tiket</th>
                                            <th className="px-6 py-5 text-xs font-semibold text-slate-500 text-center">Qty</th>
                                            <th className="px-6 py-5 text-xs font-semibold text-slate-500">Status</th>
                                            <th className="px-6 py-5 text-right text-xs font-semibold text-slate-500">Aksi</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/[0.04]">
                                        {filteredTickets.map((t) => {
                                            const isPaid = ['paid', 'issued'].includes(t.PaymentStatus);
                                            const isPending = t.PaymentStatus === 'pending_payment';
                                            const dateObj = new Date(t.PurchaseDate);
                                            const formattedDateTime = dateObj.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

                                            return (
                                                <tr key={t.ItemID} className="transition-all duration-200 hover:bg-white/[0.02] even:bg-[#070B17]/30 border-l-2 border-l-transparent hover:border-l-[#38BDF8] group">
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center gap-3">
                                                            <div className="w-8 h-8 rounded bg-slate-800/50 flex items-center justify-center border border-white/[0.05]">
                                                                <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg>
                                                            </div>
                                                            <div>
                                                                <p className="font-bold text-sm font-mono text-white tracking-wider">{t.OrderNo}</p>
                                                                <p className="text-[10px] text-slate-500 mt-0.5">{formattedDateTime}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="font-semibold text-sm text-slate-200">{t.AttendeeName || 'Pembeli Tamu'}</p>
                                                        <p className="text-[11px] text-slate-500 mt-0.5">{t.AttendeeEmail || 'Tidak ada email'}</p>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <p className="font-bold text-sm text-white">{t.CategoryName}</p>
                                                    </td>
                                                    <td className="px-6 py-4 text-center">
                                                        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-800 text-white font-bold text-xs border border-slate-600">
                                                            {t.Qty}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        {isPaid ? (
                                                            <span className="inline-flex px-2.5 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-bold rounded uppercase tracking-widest">Valid / Paid</span>
                                                        ) : isPending ? (
                                                            <span className="inline-flex px-2.5 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-bold rounded uppercase tracking-widest">Pending</span>
                                                        ) : (
                                                            <span className="inline-flex px-2.5 py-1 bg-rose-500/10 text-rose-500 border border-rose-500/20 text-[10px] font-bold rounded uppercase tracking-widest">Cancelled</span>
                                                        )}
                                                    </td>
                                                    <td className="px-6 py-4 text-right">
                                                        <button className="px-3 py-1.5 bg-[#070B17] hover:bg-slate-800 border border-white/[0.05] hover:border-white/[0.2] text-slate-300 hover:text-white rounded text-xs font-semibold transition-all">
                                                            Detail Transaksi
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="px-6 py-24 flex flex-col items-center justify-center text-center bg-[#070B17]/20">
                                    <div className="w-16 h-16 bg-[#0F172A] rounded-full flex items-center justify-center mb-5 border border-white/[0.04] text-slate-600 shadow-inner">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg>
                                    </div>
                                    <h3 className="text-base font-semibold text-white mb-2 leading-tight">Belum Ada Tiket Diterbitkan</h3>
                                    <p className="text-xs text-slate-500 max-w-xs mb-8 leading-relaxed">Daftar tamu dan pembeli tiket untuk acara ini akan muncul di sini secara otomatis.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}