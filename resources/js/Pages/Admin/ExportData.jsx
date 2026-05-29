import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout'; 

export default function ExportData({ auth }) {
    // State form utama
    const [filter, setFilter] = useState({
        type: 'all_transactions',
        format: 'csv', // Default format
        start_date: '',
        end_date: ''
    });

    const [datePreset, setDatePreset] = useState('Custom');
    const [isExporting, setIsExporting] = useState(false);
    
    const [includes, setIncludes] = useState({
        customer: true,
        metadata: true,
        refund: false,
    });

    const handleExport = (e) => {
        e.preventDefault();
        setIsExporting(true);
        
        setTimeout(() => {
            // Pastiin 'format' ikut dikirim ke Backend
            const queryParams = new URLSearchParams({
                type: filter.type,
                format: filter.format,
                start_date: filter.start_date,
                end_date: filter.end_date
            }).toString();
            
            window.location.href = `/admin/export-data/download?${queryParams}`;
            setIsExporting(false);
        }, 1500);
    };

    const handleQuickExport = (presetType) => {
        setIsExporting(true);
        setTimeout(() => {
            // Quick export default ke Excel biar mantap
            window.location.href = `/admin/export-data/download?type=${presetType}&format=xlsx`;
            setIsExporting(false);
        }, 1200);
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Master Export Data" />

            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto font-sans">
                
                <div className="mb-8 border-b border-[#1e293b] pb-6">
                    <h1 className="text-2xl font-bold text-white tracking-tight">Master Data Export</h1>
                    <p className="text-slate-400 text-sm mt-1">Generate and download operational reports securely.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* EXPORT CONFIGURATION */}
                    <div className="lg:col-span-8 space-y-6">
                        
                        {/* QUICK EXPORT */}
                        <div className="bg-[#0f172a] rounded-xl border border-[#1e293b] p-5">
                            <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-3">Quick Export (Excel)</h2>
                            <div className="flex flex-wrap gap-3">
                                <button onClick={() => handleQuickExport('paid_transactions')} className="flex items-center gap-2 bg-[#1e293b] hover:bg-[#2e3e57] text-slate-300 text-xs font-bold py-2 px-4 rounded-md transition-colors border border-slate-700">
                                    <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    Today's Successful Orders
                                </button>
                                <button onClick={() => handleQuickExport('all_transactions')} className="flex items-center gap-2 bg-[#1e293b] hover:bg-[#2e3e57] text-slate-300 text-xs font-bold py-2 px-4 rounded-md transition-colors border border-slate-700">
                                    <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    This Month Revenue
                                </button>
                                <button onClick={() => handleQuickExport('pending_transactions')} className="flex items-center gap-2 bg-[#1e293b] hover:bg-[#2e3e57] text-slate-300 text-xs font-bold py-2 px-4 rounded-md transition-colors border border-slate-700">
                                    <svg className="w-3.5 h-3.5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    Pending Transactions
                                </button>
                            </div>
                        </div>

                        {/* FORM EXPORT */}
                        <div className="bg-[#0f172a] rounded-xl border border-[#1e293b] overflow-hidden relative shadow-lg">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#e8ff47]/20 to-transparent"></div>
                            
                            <form onSubmit={handleExport} className="p-6 sm:p-8 space-y-8">
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 mb-2">DATA TYPE</label>
                                        <select 
                                            className="w-full bg-[#0a0f1d] border border-[#1e293b] text-white text-sm rounded-md focus:ring-1 focus:ring-[#e8ff47] focus:border-[#e8ff47] block p-2.5 transition-colors shadow-inner"
                                            value={filter.type}
                                            onChange={(e) => setFilter({...filter, type: e.target.value})}
                                        >
                                            <option value="all_transactions">All Transactions History</option>
                                            <option value="paid_transactions">Successful Orders Only (PAID)</option>
                                            <option value="pending_transactions">Pending / Failed Orders</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-400 mb-2">EXPORT FORMAT</label>
                                        <select 
                                            className="w-full bg-[#0a0f1d] border border-[#1e293b] text-white text-sm rounded-md focus:ring-1 focus:ring-[#e8ff47] focus:border-[#e8ff47] block p-2.5 transition-colors shadow-inner"
                                            value={filter.format}
                                            onChange={(e) => setFilter({...filter, format: e.target.value})}
                                        >
                                            <option value="csv">CSV (Excel Compatible)</option>
                                            <option value="xlsx">Excel (.xlsx) - High Quality</option>
                                            <option value="pdf">PDF Document - Print Ready</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-end mb-2">
                                        <label className="block text-xs font-bold text-slate-400">DATE RANGE</label>
                                        <div className="flex gap-2">
                                            {['Today', '7 Days', '30 Days', 'Custom'].map(preset => (
                                                <button 
                                                    key={preset}
                                                    type="button"
                                                    onClick={() => setDatePreset(preset)}
                                                    className={`text-[10px] font-bold px-2 py-1 rounded transition-colors ${datePreset === preset ? 'bg-[#1e293b] text-white' : 'text-slate-500 hover:text-slate-300'}`}
                                                >
                                                    {preset}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className={`grid grid-cols-2 gap-4 transition-all duration-300 ${datePreset !== 'Custom' ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
                                        <input 
                                            type="date" 
                                            className="w-full bg-[#0a0f1d] border border-[#1e293b] text-white text-sm rounded-md focus:ring-1 focus:ring-[#e8ff47] focus:border-[#e8ff47] p-2.5"
                                            value={filter.start_date}
                                            onChange={(e) => setFilter({...filter, start_date: e.target.value})}
                                        />
                                        <input 
                                            type="date" 
                                            className="w-full bg-[#0a0f1d] border border-[#1e293b] text-white text-sm rounded-md focus:ring-1 focus:ring-[#e8ff47] focus:border-[#e8ff47] p-2.5"
                                            value={filter.end_date}
                                            onChange={(e) => setFilter({...filter, end_date: e.target.value})}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold text-slate-400 mb-3">INCLUDE FIELDS</label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <label className="flex items-center gap-3 p-3 rounded-md border border-[#1e293b] bg-[#0a0f1d] cursor-pointer hover:border-slate-600 transition-colors">
                                            <input type="checkbox" className="rounded bg-slate-800 border-slate-600 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-[#0a0f1d]" checked={includes.customer} onChange={(e) => setIncludes({...includes, customer: e.target.checked})} />
                                            <span className="text-sm text-slate-300">Customer Info (Name, Email)</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 rounded-md border border-[#1e293b] bg-[#0a0f1d] cursor-pointer hover:border-slate-600 transition-colors">
                                            <input type="checkbox" className="rounded bg-slate-800 border-slate-600 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-[#0a0f1d]" checked={includes.metadata} onChange={(e) => setIncludes({...includes, metadata: e.target.checked})} />
                                            <span className="text-sm text-slate-300">Payment Metadata (Method, VA)</span>
                                        </label>
                                        <label className="flex items-center gap-3 p-3 rounded-md border border-[#1e293b] bg-[#0a0f1d] cursor-pointer hover:border-slate-600 transition-colors">
                                            <input type="checkbox" className="rounded bg-slate-800 border-slate-600 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-[#0a0f1d]" checked={includes.refund} onChange={(e) => setIncludes({...includes, refund: e.target.checked})} />
                                            <span className="text-sm text-slate-300">Refund Records (If any)</span>
                                        </label>
                                    </div>
                                </div>

                                <p className="text-[11px] text-slate-500 flex items-center gap-2">
                                    <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    Leave the date range empty to export all available records.
                                </p>

                                <div className="pt-6 border-t border-[#1e293b] flex items-center">
                                    <button 
                                        type="submit"
                                        disabled={isExporting}
                                        className="flex items-center justify-center gap-2 bg-[#e8ff47] hover:bg-[#d4ed35] disabled:bg-[#d4ed35]/50 disabled:cursor-not-allowed text-[#0f172a] text-sm font-bold py-2.5 px-6 rounded-md transition-all shadow-[0_4px_10px_rgba(232,255,71,0.15)] hover:shadow-[0_4px_15px_rgba(232,255,71,0.25)] min-w-[160px]"
                                    >
                                        {isExporting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#0f172a]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                                Preparing...
                                            </>
                                        ) : (
                                            'Generate Export'
                                        )}
                                    </button>
                                </div>

                            </form>
                        </div>
                    </div>

                    {/* RECENT EXPORT ACTIVITY */}
                    <div className="lg:col-span-4">
                        <div className="bg-[#0f172a] rounded-xl border border-[#1e293b] sticky top-24">
                            <div className="p-5 border-b border-[#1e293b] flex justify-between items-center bg-[#0a0f1d] rounded-t-xl">
                                <h3 className="text-sm font-bold text-white">Recent Exports</h3>
                                <span className="text-[10px] font-medium bg-[#1e293b] text-slate-300 px-2 py-0.5 rounded">Activity Log</span>
                            </div>
                            
                            <div className="p-2 space-y-1">
                                <div className="p-3 hover:bg-[#1e293b]/50 rounded-lg transition-colors cursor-default group flex items-start gap-3">
                                    <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                                        <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-slate-200 truncate group-hover:text-[#e8ff47] transition-colors">Sales_May_2026.xlsx</p>
                                        <p className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                                            Completed <span className="w-1 h-1 rounded-full bg-slate-600"></span> 2 mins ago
                                        </p>
                                    </div>
                                    <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 text-slate-400 hover:text-white" title="Download again">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                    </button>
                                </div>

                                <div className="p-3 hover:bg-[#1e293b]/50 rounded-lg transition-colors cursor-default group flex items-start gap-3">
                                    <div className="w-8 h-8 rounded bg-rose-500/10 border border-rose-500/20 flex items-center justify-center shrink-0">
                                        <svg className="w-4 h-4 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-slate-200 truncate">Refund_Report.csv</p>
                                        <p className="text-[10px] text-rose-400/80 mt-0.5 flex items-center gap-1">
                                            Failed <span className="w-1 h-1 rounded-full bg-slate-600"></span> Retry available
                                        </p>
                                    </div>
                                </div>

                                <div className="p-3 hover:bg-[#1e293b]/50 rounded-lg transition-colors cursor-default group flex items-start gap-3 opacity-60">
                                    <div className="w-8 h-8 rounded bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-slate-200 truncate">Customer_List_April.pdf</p>
                                        <p className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                                            Completed <span className="w-1 h-1 rounded-full bg-slate-600"></span> Yesterday
                                        </p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="p-3 border-t border-[#1e293b] text-center">
                                <button className="text-xs font-bold text-slate-400 hover:text-[#e8ff47] transition-colors">View All History</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </AdminLayout>
    );
}