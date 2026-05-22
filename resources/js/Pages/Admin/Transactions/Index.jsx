import React, { useState, useMemo } from 'react';
import { Head, Link } from '@inertiajs/react';
import Swal from 'sweetalert2';
import AdminSidebar from '@/Components/AdminSidebar';

export default function TransactionIndex({ transactions = [], kpi = {} }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    // Filter Super Enterprise
    const filteredTransactions = useMemo(() => {
        return transactions.filter(trx => {
            const searchString = `${trx.OrderNo} ${trx.CustomerName}`.toLowerCase();
            const matchesSearch = searchString.includes(searchTerm.toLowerCase());
            if (!matchesSearch) return false;

            if (statusFilter === 'Success') return ['paid', 'issued', 'settlement'].includes(trx.PaymentStatus);
            if (statusFilter === 'Pending') return ['pending', 'pending_payment'].includes(trx.PaymentStatus);
            if (statusFilter === 'Failed') return ['cancelled', 'failed', 'deny'].includes(trx.PaymentStatus);
            if (statusFilter === 'Expired') return ['expire'].includes(trx.PaymentStatus);
            if (statusFilter === 'Refunded') return ['refund', 'partial_refund'].includes(trx.PaymentStatus);
            if (statusFilter === 'Fraud') return ['challenge'].includes(trx.PaymentStatus);
            
            return true;
        });
    }, [transactions, searchTerm, statusFilter]);

    // Badge Status Premium
    const renderStatusBadge = (status) => {
        const s = status.toLowerCase();
        if (['paid', 'issued', 'settlement'].includes(s)) return <span className="inline-flex items-center gap-1.5 px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold rounded uppercase tracking-widest"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Success</span>;
        if (['pending', 'pending_payment'].includes(s)) return <span className="inline-flex px-2 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-bold rounded uppercase tracking-widest">Pending</span>;
        if (['cancelled', 'failed', 'deny'].includes(s)) return <span className="inline-flex px-2 py-1 bg-rose-500/10 text-rose-500 border border-rose-500/20 text-[9px] font-bold rounded uppercase tracking-widest">Failed</span>;
        if (['expire'].includes(s)) return <span className="inline-flex px-2 py-1 bg-slate-700/50 text-slate-400 border border-slate-600 text-[9px] font-bold rounded uppercase tracking-widest">Expired</span>;
        if (['refund', 'partial_refund'].includes(s)) return <span className="inline-flex px-2 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[9px] font-bold rounded uppercase tracking-widest">Refunded</span>;
        if (['challenge'].includes(s)) return <span className="inline-flex px-2 py-1 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[9px] font-bold rounded uppercase tracking-widest">Fraud Check</span>;
        return <span className="inline-flex px-2 py-1 bg-slate-800 text-slate-400 border border-slate-700 text-[9px] font-bold rounded uppercase tracking-widest">{s}</span>;
    };

    // Payment Method Branding
    const renderPaymentMethod = (method) => {
        const m = method.toLowerCase();
        if (m.includes('gopay')) return <span className="flex items-center gap-2 text-[10px] font-bold text-white"><span className="px-1.5 py-0.5 rounded bg-[#00AED6] text-white text-[8px]">GOPAY</span> E-Wallet</span>;
        if (m.includes('qris')) return <span className="flex items-center gap-2 text-[10px] font-bold text-white"><span className="px-1.5 py-0.5 rounded bg-[#ED1C24] text-white text-[8px]">QRIS</span> Scan</span>;
        if (m.includes('transfer') || m.includes('bca') || m.includes('mandiri')) return <span className="flex items-center gap-2 text-[10px] font-bold text-white"><span className="px-1.5 py-0.5 rounded bg-blue-600 text-white text-[8px]">VA</span> Virtual Account</span>;
        if (m.includes('credit')) return <span className="flex items-center gap-2 text-[10px] font-bold text-white"><span className="px-1.5 py-0.5 rounded bg-slate-700 text-white text-[8px]">CC</span> Credit Card</span>;
        return <span className="flex items-center gap-2 text-[10px] font-bold text-white"><span className="px-1.5 py-0.5 rounded bg-slate-700 text-white text-[8px]">PG</span> Midtrans Gateway</span>;
    };

    return (
        <div className="flex h-screen bg-[#070B17] text-slate-300 font-sans overflow-hidden selection:bg-[#38BDF8]/30 selection:text-white">
            <Head title="Finance Operations - Eventix" />
            <AdminSidebar />

            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#070B17]">
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#A3C957]/[0.015] rounded-full blur-3xl pointer-events-none"></div>

                {/* 1. HEADER SUPER CORPORATE */}
                <header className="px-8 pt-8 pb-4 shrink-0 z-20 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.04]">
                    <div>
                        <p className="text-[10px] font-bold text-[#A3C957] tracking-widest uppercase mb-2 flex items-center gap-2 drop-shadow-md">
                            <span className="text-slate-500">PAYMENT /</span> 
                            <span className="text-white">TRANSACTIONS</span>
                        </p>
                        <h1 className="text-3xl font-black text-white tracking-tight drop-shadow-lg">Finance Operations</h1>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                        {/* 9. SYSTEM STATUS INDICATOR */}
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-widest">Midtrans API Operational</span>
                            </div>
                            <div className="text-[10px] font-mono text-slate-500">Last sync: Just now</div>
                        </div>

                        {/* 6. ACTION BUTTONS */}
                        <div className="flex gap-2">
                            <button className="px-4 py-2 bg-[#0F172A] border border-white/[0.05] hover:bg-slate-800 hover:border-white/[0.1] text-white rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-2">
                                <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                Refresh
                            </button>
                            <button className="px-4 py-2 bg-[#38BDF8] hover:bg-[#7dd3fc] text-[#070B17] rounded-lg text-xs font-bold transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)] flex items-center gap-2">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                Export CSV
                            </button>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    
                    {/* 2. KPI CARD YANG LEBIH HIDUP */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
                        <div className="bg-gradient-to-br from-[#0F172A] to-[#070B17] p-5 rounded-xl border border-white/[0.04] shadow-sm relative overflow-hidden group">
                            <p className="text-[10px] font-bold text-[#A3C957] uppercase tracking-widest mb-1">Gross Revenue</p>
                            <h3 className="text-2xl font-black text-white tracking-tight">{kpi.gross_revenue || 'Rp 0'}</h3>
                            <p className="text-[10px] text-emerald-400 mt-2 font-medium flex items-center gap-1"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg> +18.2% vs yesterday</p>
                            <svg className="w-24 h-24 absolute -right-4 -bottom-4 text-white/[0.02] group-hover:scale-110 transition-transform duration-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"></path></svg>
                        </div>
                        <div className="bg-[#0F172A] p-5 rounded-xl border border-white/[0.04] shadow-sm">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Successful Payments</p>
                            <h3 className="text-2xl font-black text-white tracking-tight">{kpi.successful || 0} <span className="text-xs text-slate-500 font-medium">trx</span></h3>
                            <p className="text-[10px] text-slate-500 mt-2 font-medium">98.5% Settlement rate</p>
                        </div>
                        <div className="bg-[#0F172A] p-5 rounded-xl border border-white/[0.04] shadow-sm">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Pending Payments</p>
                            <h3 className="text-2xl font-black text-white tracking-tight">{kpi.pending || 0} <span className="text-xs text-slate-500 font-medium">trx</span></h3>
                            <p className="text-[10px] text-amber-400 mt-2 font-medium flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span> 3 require manual review</p>
                        </div>
                        <div className="bg-[#0F172A] p-5 rounded-xl border border-white/[0.04] shadow-sm">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Failed / Refunded</p>
                            <h3 className="text-2xl font-black text-white tracking-tight">{kpi.failed || 0} <span className="text-xs text-slate-500 font-medium">trx</span></h3>
                            <p className="text-[10px] text-slate-500 mt-2 font-medium">Auto-cancelled by gateway</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
                        
                        {/* KIRI: TABLE AREA */}
                        <div className="xl:col-span-3 flex flex-col space-y-4">
                            
                            {/* 5. TOOLBAR (SEARCH + TABS + DATE) */}
                            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 p-1">
                                {/* 4. FILTER TABS LENGKAP */}
                                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar bg-[#0F172A] p-1 rounded-lg border border-white/[0.04] w-fit">
                                    {['All', 'Success', 'Pending', 'Failed', 'Expired', 'Refunded', 'Fraud'].map(tab => (
                                        <button key={tab} onClick={() => setStatusFilter(tab)} className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest rounded-md transition-all whitespace-nowrap ${statusFilter === tab ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]'}`}>
                                            {tab}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex items-center gap-2">
                                    <button className="px-3 py-1.5 bg-[#0F172A] border border-white/[0.05] hover:bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold transition-all flex items-center gap-2">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        Today
                                    </button>
                                    <div className="relative">
                                        <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                        <input type="text" placeholder="Search Order ID / Email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-[#0F172A] border border-white/[0.05] focus:border-[#38BDF8]/50 rounded-lg pl-9 pr-4 py-1.5 text-xs text-white outline-none transition-all w-64 shadow-inner placeholder-slate-600" />
                                    </div>
                                </div>
                            </div>

                            {/* 7. TABLE SELALU TAMPIL HEADERNYA */}
                            <div className="bg-[#0F172A] rounded-xl border border-white/[0.04] shadow-sm overflow-hidden flex flex-col">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left whitespace-nowrap">
                                        <thead className="bg-[#070B17]/40 border-b border-white/[0.06]">
                                            <tr>
                                                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Order ID & Date</th>
                                                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Customer Info</th>
                                                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Gross Amount</th>
                                                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Payment Method</th>
                                                <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Status</th>
                                                <th className="px-6 py-4 text-right text-[10px] font-bold text-slate-500 uppercase tracking-widest">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/[0.04]">
                                            {filteredTransactions.length > 0 ? (
                                                filteredTransactions.map((trx) => (
                                                    <tr key={trx.ID} className="transition-all duration-200 hover:bg-white/[0.02] even:bg-[#070B17]/30 group border-l-2 border-l-transparent hover:border-l-[#38BDF8]">
                                                        <td className="px-6 py-4">
                                                            <p className="font-bold text-xs font-mono text-white tracking-wider">{trx.OrderNo}</p>
                                                            <p className="text-[10px] text-slate-500 mt-0.5">{new Date(trx.CreatedDate).toLocaleString('id-ID', {day:'2-digit', month:'short', year:'numeric', hour:'2-digit', minute:'2-digit'})}</p>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <p className="font-semibold text-xs text-slate-200">{trx.CustomerName}</p>
                                                            <p className="text-[10px] text-slate-500 mt-0.5">customer@eventix.id</p>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            <p className="font-bold text-xs font-mono text-white">Rp {Number(trx.TotalAmount).toLocaleString('id-ID')}</p>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {/* 8. PAYMENT METHOD INDICATOR */}
                                                            {renderPaymentMethod(trx.PaymentMethod || 'Midtrans Gateway')}
                                                        </td>
                                                        <td className="px-6 py-4 text-center">
                                                            {renderStatusBadge(trx.PaymentStatus)}
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <button onClick={() => Swal.fire('Order ' + trx.OrderNo, 'Transaction Detail Drawer coming soon.', 'info')} className="px-3 py-1.5 bg-[#070B17] hover:bg-[#38BDF8] border border-white/[0.05] hover:border-[#38BDF8] text-slate-400 hover:text-[#070B17] rounded text-[10px] font-bold uppercase tracking-wider transition-all shadow-sm">
                                                                Detail
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                /* 3. SKELETON / EMPTY STATE DALAM TABEL */
                                                <tr>
                                                    <td colSpan="6" className="px-6 py-20 text-center">
                                                        <div className="flex flex-col items-center justify-center">
                                                            <div className="w-16 h-16 bg-[#070B17] rounded-full flex items-center justify-center mb-5 border border-white/[0.04] text-slate-600 shadow-inner">
                                                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                                                            </div>
                                                            <h3 className="text-sm font-bold text-white mb-2 tracking-tight">No Transactions Found</h3>
                                                            <p className="text-[11px] text-slate-500 max-w-sm leading-relaxed">System is waiting for incoming webhooks. Completed payments from Midtrans will populate this table automatically.</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* 10. KANAN BAWAH: MINI ACTIVITY PANEL */}
                        <div className="xl:col-span-1 space-y-6">
                            <div className="bg-[#0F172A] rounded-xl border border-white/[0.04] shadow-sm p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">Live System Logs</h3>
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                </div>
                                
                                <div className="space-y-6 relative before:absolute before:inset-y-0 before:left-[11px] before:w-px before:bg-white/[0.05]">
                                    <div className="relative flex gap-4">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex shrink-0 items-center justify-center relative z-10 text-[10px]">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                        </div>
                                        <div className="flex-1 min-w-0 pt-1">
                                            <p className="text-[11px] font-bold text-white leading-snug">Payment settlement received</p>
                                            <p className="text-[10px] text-slate-500 mt-1 truncate">Order #ORD-2026-9812 via GoPay</p>
                                            <p className="text-[9px] text-slate-600 mt-1.5 font-mono">2 mins ago</p>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-4">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex shrink-0 items-center justify-center relative z-10 text-[10px]">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                                        </div>
                                        <div className="flex-1 min-w-0 pt-1">
                                            <p className="text-[11px] font-bold text-white leading-snug">Refund processed by admin</p>
                                            <p className="text-[10px] text-slate-500 mt-1 truncate">Rp 750.000 returned to customer</p>
                                            <p className="text-[9px] text-slate-600 mt-1.5 font-mono">1 hr ago</p>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-4">
                                        <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-slate-400 flex shrink-0 items-center justify-center relative z-10 text-[10px]">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                        </div>
                                        <div className="flex-1 min-w-0 pt-1">
                                            <p className="text-[11px] font-bold text-white leading-snug">Invoice automatically resent</p>
                                            <p className="text-[10px] text-slate-500 mt-1 truncate">E-Ticket delivered to guest</p>
                                            <p className="text-[9px] text-slate-600 mt-1.5 font-mono">3 hrs ago</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <button className="w-full mt-6 py-2.5 bg-[#070B17] border border-white/[0.05] hover:border-white/[0.1] text-slate-400 hover:text-white rounded-lg text-[10px] font-bold uppercase tracking-widest transition-all">
                                    View Full Logs
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}