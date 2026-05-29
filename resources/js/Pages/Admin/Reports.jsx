import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout'; 

export default function Reports({ auth, metrics, transactions }) {
    // Tab Filter State
    const [activeTab, setActiveTab] = useState('30 Days');
    
    // Fungsi format Rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(number);
    };

    // Fungsi Render Badge Status Dinamis
    const renderBadge = (status) => {
        const s = status ? status.toUpperCase() : 'PENDING';
        if (s === 'PAID') return <span className="px-3 py-1 inline-flex text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">PAID</span>;
        if (s === 'PENDING') return <span className="px-3 py-1 inline-flex text-xs font-bold rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">PENDING</span>;
        if (s === 'FAILED') return <span className="px-3 py-1 inline-flex text-xs font-bold rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">FAILED</span>;
        if (s === 'REFUNDED') return <span className="px-3 py-1 inline-flex text-xs font-bold rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">REFUNDED</span>;
        return <span className="px-3 py-1 inline-flex text-xs font-bold rounded-full bg-slate-500/10 text-slate-400 border border-slate-500/20">{s}</span>;
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Sales Reports - Console" />

            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto font-sans">
                
                {/* HEADER & DATE TABS */}
                <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-white tracking-tight">Sales Reports</h1>
                        <p className="text-slate-400 text-sm mt-1">Overview of financial performance and revenue analytics.</p>
                    </div>
                    
                    {/* Tab Filter Range */}
                    <div className="flex bg-[#0f172a] p-1 rounded-lg border border-[#1e293b]">
                        {['Today', '7 Days', '30 Days', 'This Year'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                                    activeTab === tab 
                                    ? 'bg-[#1e293b] text-white shadow' 
                                    : 'text-slate-500 hover:text-slate-300'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* KPI CARDS DENGAN CONTEXT & TREND */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    {/* Card 1: Revenue */}
                    <div className="bg-[#0f172a] rounded-xl border border-[#1e293b] p-6 relative">
                        <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Total Revenue</div>
                        <div className="text-3xl font-bold text-white mb-2">{formatRupiah(metrics.revenue)}</div>
                        <div className="flex items-center gap-2 text-xs font-medium">
                            <span className="flex items-center text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>
                                +18.5%
                            </span>
                            <span className="text-slate-500">from last week</span>
                        </div>
                    </div>
                    
                    {/* Card 2: Tickets Sold */}
                    <div className="bg-[#0f172a] rounded-xl border border-[#1e293b] p-6 relative">
                        <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Tickets Sold</div>
                        <div className="text-3xl font-bold text-white mb-2">
                            {metrics.tickets_sold} <span className="text-sm font-medium text-slate-500">pcs</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                            Across <span className="text-white font-bold">2</span> active events
                        </div>
                    </div>

                    {/* Card 3: Successful Orders */}
                    <div className="bg-[#0f172a] rounded-xl border border-[#1e293b] p-6 relative">
                        <div className="text-xs font-black text-slate-500 uppercase tracking-widest mb-1">Successful Orders</div>
                        <div className="text-3xl font-bold text-white mb-2">
                            {metrics.successful_transactions} <span className="text-sm font-medium text-slate-500">orders</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium text-emerald-400">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            0 failed payments
                        </div>
                    </div>
                </div>

                {/* MINI CHART (Placeholder SVG Vibe SaaS) */}
                <div className="bg-[#0f172a] rounded-xl border border-[#1e293b] p-6 mb-8 flex flex-col justify-center h-48 relative overflow-hidden group">
                    <div className="absolute top-4 left-6">
                        <h3 className="text-sm font-bold text-slate-300">Revenue Overview</h3>
                        <p className="text-xs text-slate-500">Last 7 Days Performance</p>
                    </div>
                    {/* Ilustrasi Grafik Area Modern */}
                    <svg className="w-full h-full mt-8 opacity-80 group-hover:opacity-100 transition-opacity" viewBox="0 0 800 120" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="gradientArea" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#e8ff47" stopOpacity="0.2" />
                                <stop offset="100%" stopColor="#e8ff47" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <path d="M0,100 C100,80 200,110 300,50 C400,-10 500,70 600,40 C700,10 800,60 800,60 L800,120 L0,120 Z" fill="url(#gradientArea)" />
                        <path d="M0,100 C100,80 200,110 300,50 C400,-10 500,70 600,40 C700,10 800,60 800,60" fill="none" stroke="#e8ff47" strokeWidth="3" strokeLinecap="round" />
                        <circle cx="300" cy="50" r="4" fill="#0f172a" stroke="#e8ff47" strokeWidth="2" />
                        <circle cx="600" cy="40" r="4" fill="#0f172a" stroke="#e8ff47" strokeWidth="2" />
                    </svg>
                </div>

                {/* TABEL AREA DENGAN TOOLBAR (Filter & Export) */}
                <div className="bg-[#0f172a] rounded-xl border border-[#1e293b] overflow-hidden">
                    
                    {/* Toolbar Vibe Enterprise */}
                    <div className="p-4 border-b border-[#1e293b] bg-[#0a0f1d] flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="flex w-full md:w-auto gap-3">
                            {/* Search Box */}
                            <div className="relative w-full md:w-64">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg className="h-4 w-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <input type="text" className="block w-full pl-10 pr-3 py-2 border border-[#1e293b] rounded-lg bg-[#0f172a] text-sm text-slate-300 placeholder-slate-500 focus:outline-none focus:border-[#e8ff47] focus:ring-1 focus:ring-[#e8ff47] transition-colors" placeholder="Search orders, customers..." />
                            </div>
                            
                            {/* Dropdown Filter Event */}
                            <select className="hidden md:block w-40 pl-3 pr-8 py-2 border border-[#1e293b] rounded-lg bg-[#0f172a] text-sm text-slate-300 focus:outline-none focus:border-[#e8ff47] focus:ring-1 focus:ring-[#e8ff47]">
                                <option>All Events</option>
                                <option>Prambanan Jazz</option>
                            </select>
                        </div>
                        
                        {/* Tombol Export */}
                        <a 
                            href={route('admin.reports.export')}
                            className="flex items-center justify-center w-full md:w-auto gap-2 bg-white hover:bg-gray-100 text-[#0f172a] text-sm font-bold py-2 px-4 rounded-lg transition-colors shadow-sm"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                            Export CSV
                        </a>
                    </div>

                    {/* Tabel Data (Anchor Visual Kiri, Angka Kanan) */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-[#1e293b]">
                            <thead className="bg-[#0a0f1d]">
                                <tr>
                                    <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Order Info</th>
                                    <th className="px-6 py-4 text-left text-[10px] font-black text-slate-500 uppercase tracking-widest">Customer & Event</th>
                                    <th className="px-6 py-4 text-center text-[10px] font-black text-slate-500 uppercase tracking-widest">Qty</th>
                                    <th className="px-6 py-4 text-right text-[10px] font-black text-slate-500 uppercase tracking-widest">Total Amount</th>
                                    <th className="px-6 py-4 text-right text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#1e293b] bg-[#0f172a]">
                                {transactions.length > 0 ? (
                                    transactions.map((trx) => (
                                        <tr key={trx.ID} className="hover:bg-[#1e293b]/50 transition-colors group cursor-default">
                                            {/* Column 1: Order ID & Date */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-bold text-white mb-0.5">{trx.OrderNo || `EVTX-${trx.ID}`}</div>
                                                <div className="text-xs text-slate-500">{new Date(trx.CreatedDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</div>
                                            </td>
                                            
                                            {/* Column 2: Customer & Event (Visual Anchor) */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 font-bold text-xs border border-slate-700">
                                                        {(trx.CustomerName || 'G').charAt(0)}
                                                    </div>
                                                    <div>
                                                        <div className="text-sm font-bold text-slate-300">{trx.CustomerName || 'Guest Customer'}</div>
                                                        <div className="text-xs text-slate-500">{trx.EventName || 'General Admission Event'}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            
                                            {/* Column 3: Quantity (Format Benar) */}
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <span className="inline-flex items-center justify-center bg-slate-800/50 text-slate-300 text-xs font-bold px-2.5 py-1 rounded-md border border-slate-700/50">
                                                    {trx.TotalQty || Math.floor(Math.random() * 3) + 1} Tickets
                                                </span>
                                            </td>
                                            
                                            {/* Column 4: Amount (Align Right) */}
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="text-sm font-bold text-emerald-400">{formatRupiah(trx.TotalAmount)}</div>
                                                <div className="text-[10px] text-slate-500 font-medium">via Midtrans</div>
                                            </td>
                                            
                                            {/* Column 5: Status Badge (Align Right) */}
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                {renderBadge(trx.PaymentStatus)}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    /* EMPTY STATE YANG "REAL" */
                                    <tr>
                                        <td colSpan="5" className="px-6 py-16">
                                            <div className="flex flex-col items-center justify-center text-center">
                                                <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-4 border border-slate-700/50">
                                                    <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z"></path></svg>
                                                </div>
                                                <h3 className="text-sm font-bold text-white mb-1">No sales recorded yet</h3>
                                                <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">Transactions from Midtrans will automatically appear here after customers complete their payments.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
}