import React, { useState, useMemo } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';
import AdminSidebar from '@/Components/AdminSidebar';

export default function RefundIndex({ refunds = [], kpi = {} }) {
    const { auth } = usePage().props;
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('All');

    // Filter Logic untuk Refund Workflow
    const filteredRefunds = useMemo(() => {
        return refunds.filter(item => {
            const searchString = `${item.OrderNo} ${item.CustomerName}`.toLowerCase();
            const matchesSearch = searchString.includes(searchTerm.toLowerCase());
            if (!matchesSearch) return false;

            if (activeTab === 'Pending') return item.Status === 'requested';
            if (activeTab === 'Reviewed') return item.Status === 'under_review';
            if (activeTab === 'Approved') return item.Status === 'approved';
            if (activeTab === 'Processed') return item.Status === 'processed';
            if (activeTab === 'Rejected') return item.Status === 'rejected';

            return true;
        });
    }, [refunds, searchTerm, activeTab]);

    // Status Badge dengan variasi Opacity & Realistis
    const renderStatusBadge = (status) => {
        const s = status.toLowerCase();
        switch(s) {
            case 'requested': return <span className="px-2.5 py-1 bg-amber-500/20 text-amber-500 border border-amber-500/30 text-[10px] font-bold rounded shadow-sm flex items-center gap-1.5 w-fit"><span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Pending Review</span>;
            case 'under_review': return <span className="px-2.5 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-bold rounded flex items-center w-fit">Under Review</span>;
            case 'approved': return <span className="px-2.5 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-bold rounded flex items-center w-fit">Approved</span>;
            case 'processed': return <span className="px-2.5 py-1 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 text-[10px] font-bold rounded flex items-center gap-1.5 w-fit"><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg> Processed</span>;
            case 'rejected': return <span className="px-2.5 py-1 bg-rose-500/10 text-rose-500 border border-rose-500/20 text-[10px] font-bold rounded flex items-center w-fit">Rejected</span>;
            default: return <span className="px-2.5 py-1 bg-slate-800 text-slate-400 text-[10px] font-bold rounded w-fit">{s}</span>;
        }
    };

    // Simulasi Risk Flags Premium
    const renderRiskFlag = (amount) => {
        if (amount > 1000000) return <span className="px-1.5 py-0.5 bg-rose-500/10 text-rose-500 border border-rose-500/20 text-[8px] font-bold rounded uppercase tracking-wider mt-1 block w-fit">Manual Validation</span>;
        if (amount === 750000) return <span className="px-1.5 py-0.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[8px] font-bold rounded uppercase tracking-wider mt-1 block w-fit">VIP Customer</span>;
        return null;
    };

    return (
        <div className="flex h-screen bg-[#070B17] text-slate-300 font-sans overflow-hidden selection:bg-indigo-500/30 selection:text-white">
            <Head title="Refund Management - Eventix" />
            <AdminSidebar />

            <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#070B17]">
                {/* Header Tanpa Glow Dribbble, Flat & Professional */}
                <header className="px-8 pt-8 pb-4 shrink-0 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800/60 bg-[#070B17]">
                    <div>
                        <p className="text-[10px] font-bold text-indigo-400 tracking-widest uppercase mb-1.5 flex items-center gap-2">
                            <span className="text-slate-500">PAYMENT /</span> 
                            <span className="text-slate-300">REFUND REQUESTS</span>
                        </p>
                        <h1 className="text-2xl font-black text-white tracking-tight">Refund Management</h1>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-3 px-3 py-1.5 bg-slate-800/50 border border-slate-700/50 rounded flex-row">
                            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                            <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Refund SLA: 2 Hours Avg.</span>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    
                    {/* KPI CARDS - Operational Style */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-[#0F172A] p-4 rounded-lg border border-slate-800 shadow-sm flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Pending Refunds</p>
                                <svg className="w-4 h-4 text-amber-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-black text-white tracking-tight">{kpi.pending || 0} <span className="text-xs text-slate-500 font-medium font-sans">open cases</span></h3>
                            <p className="text-[10px] text-slate-500 mt-2 font-medium">{kpi.pending > 0 ? 'Action required' : 'No pending review'}</p>
                        </div>
                        <div className="bg-[#0F172A] p-4 rounded-lg border border-slate-800 shadow-sm flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Approved</p>
                                <svg className="w-4 h-4 text-cyan-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <h3 className="text-xl font-black text-white tracking-tight">{kpi.approved || 0} <span className="text-xs text-slate-500 font-medium font-sans">trx</span></h3>
                            <p className="text-[10px] text-cyan-500 mt-2 font-medium">Awaiting payout sync</p>
                        </div>
                        <div className="bg-[#0F172A] p-4 rounded-lg border border-slate-800 shadow-sm flex flex-col justify-between">
                            <div className="flex justify-between items-start mb-2">
                                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Processed / Paid</p>
                                <svg className="w-4 h-4 text-emerald-500/50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                            <h3 className="text-xl font-black text-white tracking-tight">{kpi.processed || 0} <span className="text-xs text-slate-500 font-medium font-sans">trx</span></h3>
                            <p className="text-[10px] text-slate-500 mt-2 font-medium">Synced with Midtrans settlement</p>
                        </div>
                        <div className="bg-[#0F172A] p-4 rounded-lg border border-slate-800 shadow-sm flex flex-col justify-between">
                            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Total Refund Volume</p>
                            <h3 className="text-xl font-black text-white tracking-tight font-mono">{kpi.total_amount || 'Rp 0'}</h3>
                            <p className="text-[10px] text-slate-500 mt-2 font-medium">Year to date</p>
                        </div>
                    </div>

                    {/* Layout 75/25 untuk Table & Audit Trail */}
                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start">
                        
                        {/* KIRI: TABLE AREA */}
                        <div className="xl:col-span-3 flex flex-col space-y-4">
                            
                            {/* TOOLBAR */}
                            <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
                                <div className="flex items-center overflow-x-auto no-scrollbar bg-[#0F172A] rounded border border-slate-800">
                                    {['All', 'Pending', 'Reviewed', 'Approved', 'Processed', 'Rejected'].map(tab => (
                                        <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap border-b-2 ${activeTab === tab ? 'border-indigo-500 text-white bg-slate-800/50' : 'border-transparent text-slate-500 hover:text-slate-300 hover:bg-slate-800/30'}`}>
                                            {tab}
                                        </button>
                                    ))}
                                </div>

                                <div className="relative">
                                    <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                    <input type="text" placeholder="Search Case ID / Order..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-[#0F172A] border border-slate-800 focus:border-indigo-500/50 rounded pl-9 pr-4 py-1.5 text-xs text-white outline-none transition-all w-64 shadow-inner placeholder-slate-600" />
                                </div>
                            </div>

                            {/* REFUND TABLE DENGAN HEADER OPERASIONAL */}
                            <div className="bg-[#0F172A] rounded-lg border border-slate-800 overflow-hidden flex flex-col">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left whitespace-nowrap">
                                        <thead className="bg-[#1E293B]/30 border-b border-slate-800">
                                            <tr>
                                                <th className="px-5 py-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest">Case ID</th>
                                                <th className="px-5 py-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest">Customer & Transaction</th>
                                                <th className="px-5 py-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest">Refund Reason</th>
                                                <th className="px-5 py-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest">Refund Amount</th>
                                                <th className="px-5 py-3 text-[9px] font-bold text-slate-500 uppercase tracking-widest">Workflow Status</th>
                                                <th className="px-5 py-3 text-right text-[9px] font-bold text-slate-500 uppercase tracking-widest">Case Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-800/60">
                                            {filteredRefunds.length > 0 ? (
                                                filteredRefunds.map((item) => (
                                                    <tr key={item.ID} className="hover:bg-slate-800/20 transition-colors group">
                                                        <td className="px-5 py-3">
                                                            <p className="font-mono text-xs font-bold text-indigo-400">#RF-{item.ID}</p>
                                                            <p className="text-[9px] text-slate-500 mt-1">Requested 2h ago</p>
                                                        </td>
                                                        <td className="px-5 py-3">
                                                            <p className="font-bold text-xs text-slate-200">{item.CustomerName}</p>
                                                            <p className="text-[10px] text-slate-500 mt-0.5 font-mono">{item.OrderNo}</p>
                                                        </td>
                                                        <td className="px-5 py-3">
                                                            <p className="text-[11px] text-slate-300 max-w-[150px] truncate" title={item.Reason}>{item.Reason}</p>
                                                            {renderRiskFlag(item.Amount)}
                                                        </td>
                                                        <td className="px-5 py-3">
                                                            <p className="font-bold text-xs text-slate-200 font-mono">Rp {Number(item.Amount).toLocaleString('id-ID')}</p>
                                                        </td>
                                                        <td className="px-5 py-3">
                                                            {renderStatusBadge(item.Status)}
                                                        </td>
                                                        <td className="px-5 py-3 text-right">
                                                            {/* ROLE VALIDATION SIMULATION */}
                                                            {auth?.user?.Role === 'Admin' || auth?.user?.Role === 'Super Admin' ? (
                                                                <button onClick={() => Swal.fire('Review Case', `Process case #RF-${item.ID}?`, 'question')} className="px-3 py-1.5 bg-slate-800 hover:bg-indigo-600 border border-slate-700 hover:border-indigo-500 text-slate-300 hover:text-white rounded text-[9px] font-bold uppercase tracking-wider transition-all">
                                                                    Review Case
                                                                </button>
                                                            ) : (
                                                                <button disabled className="px-3 py-1.5 bg-slate-800/50 border border-slate-800 text-slate-600 rounded text-[9px] font-bold uppercase tracking-wider cursor-not-allowed" title="Require Finance Role">
                                                                    Restricted
                                                                </button>
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                /* EMPTY STATE OPERASIONAL */
                                                <tr>
                                                    <td colSpan="6" className="px-5 py-20 text-center bg-[#070B17]/50">
                                                        <div className="flex flex-col items-center justify-center">
                                                            <div className="w-12 h-12 bg-slate-800/50 rounded flex items-center justify-center mb-4 border border-slate-700/50 text-slate-500">
                                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                                            </div>
                                                            <h3 className="text-xs font-bold text-slate-300 mb-1.5 tracking-tight">No refund cases have been submitted yet.</h3>
                                                            <p className="text-[10px] text-slate-500 max-w-sm leading-relaxed">System is monitoring refund requests. Approved and rejected requests will appear here for operational review.</p>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* POLICY BOX - SOP STYLE */}
                            <div className="mt-2 bg-[#0F172A] border border-slate-800 rounded-lg p-4 flex gap-4 items-start">
                                <div className="p-2 bg-indigo-500/10 rounded text-indigo-400 shrink-0 border border-indigo-500/20">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.956 11.956 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-2">Standard Operating Procedure (SOP)</h4>
                                    <ul className="text-[10px] text-slate-500 space-y-1.5 list-disc list-inside marker:text-slate-700">
                                        <li><strong className="text-slate-400 font-medium">Duplicate payments</strong> are automatically flagged and eligible for immediate review.</li>
                                        <li>Refunds for <strong className="text-slate-400 font-medium">Event Cancellations</strong> must be authorized by Super Admin.</li>
                                        <li>Manual verification by Finance is strictly required for amounts <strong className="text-rose-400 font-medium">above Rp 1.000.000</strong>.</li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                        {/* KANAN: AUDIT TRAIL PANEL */}
                        <div className="xl:col-span-1 space-y-4">
                            <div className="bg-[#0F172A] rounded-lg border border-slate-800 shadow-sm p-5">
                                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-5 flex items-center justify-between">
                                    Recent Activity
                                    <svg className="w-3.5 h-3.5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                </h3>
                                
                                <div className="space-y-5 relative before:absolute before:inset-y-0 before:left-[9px] before:w-px before:bg-slate-800">
                                    <div className="relative flex gap-3">
                                        <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 flex shrink-0 items-center justify-center relative z-10 text-[8px]">
                                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                                        </div>
                                        <div className="flex-1 min-w-0 pt-0.5">
                                            <p className="text-[10px] font-bold text-slate-300">Refund RF-108 approved</p>
                                            <p className="text-[9px] text-slate-500 mt-0.5">By Nabil Putra (Admin)</p>
                                            <p className="text-[8px] text-slate-600 mt-1 font-mono">10 mins ago</p>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-3">
                                        <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 flex shrink-0 items-center justify-center relative z-10 text-[8px]">
                                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                                        </div>
                                        <div className="flex-1 min-w-0 pt-0.5">
                                            <p className="text-[10px] font-bold text-slate-300">Midtrans payout confirmed</p>
                                            <p className="text-[9px] text-slate-500 mt-0.5">Batch settlement successful</p>
                                            <p className="text-[8px] text-slate-600 mt-1 font-mono">45 mins ago</p>
                                        </div>
                                    </div>
                                    <div className="relative flex gap-3">
                                        <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 text-slate-400 flex shrink-0 items-center justify-center relative z-10 text-[8px]">
                                            <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                        </div>
                                        <div className="flex-1 min-w-0 pt-0.5">
                                            <p className="text-[10px] font-bold text-slate-300">Customer notified</p>
                                            <p className="text-[9px] text-slate-500 mt-0.5">Email receipt delivered</p>
                                            <p className="text-[8px] text-slate-600 mt-1 font-mono">1 hr ago</p>
                                        </div>
                                    </div>
                                </div>
                                
                                <button className="w-full mt-5 py-2 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 text-slate-400 hover:text-slate-200 rounded text-[9px] font-bold uppercase tracking-widest transition-all">
                                    View Audit Logs
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    );
}