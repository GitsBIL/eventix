import React, { useState } from 'react';
import { Head, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout'; 
import axios from 'axios';

// PERHATIKAN: Kita tambahkan props exportLogs dari backend
export default function ExportData({ auth, exportLogs }) {
    const [filter, setFilter] = useState({
        type: 'all_transactions',
        format: 'pdf', 
        start_date: '',
        end_date: ''
    });

    const [datePreset, setDatePreset] = useState('Custom');
    const [isExporting, setIsExporting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [previewData, setPreviewData] = useState([]);
    const [totalRows, setTotalRows] = useState(0);
    const [exportStatus, setExportStatus] = useState('idle');

    const handleDatePreset = (preset) => {
        setDatePreset(preset);
        const today = new Date();
        const formatDate = (date) => date.toISOString().split('T')[0];

        if (preset === 'Today') {
            setFilter({ ...filter, start_date: formatDate(today), end_date: formatDate(today) });
        } else if (preset === '7 Days') {
            const lastWeek = new Date(today);
            lastWeek.setDate(today.getDate() - 7);
            setFilter({ ...filter, start_date: formatDate(lastWeek), end_date: formatDate(today) });
        } else if (preset === '30 Days') {
            const lastMonth = new Date(today);
            lastMonth.setDate(today.getDate() - 30);
            setFilter({ ...filter, start_date: formatDate(lastMonth), end_date: formatDate(today) });
        } else {
            setFilter({ ...filter, start_date: '', end_date: '' });
        }
    };

    const typeLabels = {
        all_transactions: 'All Transactions Mutation',
        paid_transactions: 'Gross Sales Report',
        promoter_settlement: 'Promoter Settlement',
        platform_fee: 'Platform Fee (Profit)',
        failed_transactions: 'Failed / Refund Activity'
    };

    const formatLabels = {
        pdf: 'PDF Document (.pdf)',
        xlsx: 'Excel Spreadsheet (.xlsx)',
        csv: 'CSV File (.csv)'
    };

    const handleExport = async (e) => {
        e.preventDefault();
        setIsExporting(true);
        setExportStatus('preparing');
        
        const queryParams = new URLSearchParams({
            ...filter,
            action: 'preview'
        }).toString();
        
        setTimeout(async () => {
            if (filter.format === 'pdf') {
                window.open(`/admin/export-data/download?${queryParams}`, '_blank');
                setIsExporting(false);
                setExportStatus('idle');
            } else {
                try {
                    const response = await axios.get(`/admin/export-data/download?${queryParams}`);
                    setPreviewData(response.data.preview_data);
                    setTotalRows(response.data.total_rows);
                    setShowModal(true);
                    setExportStatus('idle');
                } catch (error) {
                    console.error("Fetch preview error:", error);
                    setExportStatus('idle');
                }
                setIsExporting(false);
            }
        }, 500);
    };

    const confirmDownload = () => {
        const queryParams = new URLSearchParams({
            ...filter,
            action: 'download'
        }).toString();
        
        window.location.href = `/admin/export-data/download?${queryParams}`;
        setShowModal(false);
        
        // Refresh halaman biar activity log terbaru muncul
        setTimeout(() => {
            router.reload({ only: ['exportLogs'] });
        }, 2000);
    };

    const handleQuickExport = (presetType) => {
        setIsExporting(true);
        setTimeout(() => {
            window.location.href = `/admin/export-data/download?type=${presetType}&format=xlsx&action=download`;
            setIsExporting(false);
            
            setTimeout(() => {
                router.reload({ only: ['exportLogs'] });
            }, 2000);
        }, 1200);
    };

    return (
        <AdminLayout user={auth.user}>
            <Head title="Master Export Data" />

            <div className="absolute top-0 left-0 w-full h-[600px] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[#e8ff47]/10 via-[#0f172a]/5 to-transparent pointer-events-none z-0"></div>

            <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto font-sans relative z-10">
                <div className="mb-8 border-b border-[#1e293b] pb-6">
                    <h1 className="text-2xl font-bold text-white tracking-tight">Master Data Export</h1>
                    <p className="text-slate-400 text-sm mt-1">Generate comprehensive business reports and financial settlements.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-6">
                        
                        <div className="bg-[#0f172a] rounded-lg border border-[#1e293b] p-4 shadow-sm">
                            <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Quick Export Templates</h2>
                            <div className="flex flex-wrap gap-2">
                                <button onClick={() => handleQuickExport('paid_transactions')} className="flex items-center gap-2 bg-[#1e293b] hover:bg-[#2e3e57] text-slate-300 text-xs font-semibold py-1.5 px-3 rounded transition-colors border border-slate-700/50">
                                    <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    Today's Transactions
                                </button>
                                <button onClick={() => handleQuickExport('all_transactions')} className="flex items-center gap-2 bg-[#1e293b] hover:bg-[#2e3e57] text-slate-300 text-xs font-semibold py-1.5 px-3 rounded transition-colors border border-slate-700/50">
                                    <svg className="w-3.5 h-3.5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                    Monthly Revenue
                                </button>
                                <button onClick={() => handleQuickExport('promoter_settlement')} className="flex items-center gap-2 bg-[#1e293b] hover:bg-[#2e3e57] text-slate-300 text-xs font-semibold py-1.5 px-3 rounded transition-colors border border-slate-700/50">
                                    <svg className="w-3.5 h-3.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                                    Settlement Summary
                                </button>
                                <button onClick={() => handleQuickExport('failed_transactions')} className="flex items-center gap-2 bg-[#1e293b] hover:bg-[#2e3e57] text-slate-300 text-xs font-semibold py-1.5 px-3 rounded transition-colors border border-slate-700/50">
                                    <svg className="w-3.5 h-3.5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                    Refund Activity
                                </button>
                            </div>
                        </div>

                        <div className="bg-[#0f172a] rounded-xl border border-[#1e293b] overflow-hidden relative shadow-2xl">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#e8ff47]/40 to-transparent"></div>
                            
                            <form onSubmit={handleExport} className="p-6 sm:p-8 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div>
                                        <label className="block text-xs font-bold text-white">REPORT TYPE</label>
                                        <p className="text-[10px] text-slate-500 mt-0.5 mb-3 leading-snug">Choose the operational dataset to export.</p>
                                        <select 
                                            className="w-full bg-[#0a0f1d] border border-[#1e293b] text-slate-200 text-sm rounded-md focus:ring-1 focus:ring-[#e8ff47] focus:border-[#e8ff47] block p-2.5 transition-colors shadow-inner"
                                            value={filter.type} onChange={(e) => setFilter({...filter, type: e.target.value})}
                                        >
                                            <option value="all_transactions">Laporan Mutasi Transaksi (Semua)</option>
                                            <option value="paid_transactions">Laporan Penjualan (Gross Sales)</option>
                                            <option value="promoter_settlement">Laporan Pencairan Promotor (Settlement)</option>
                                            <option value="platform_fee">Laporan Laba Eventix (Platform Fee)</option>
                                            <option value="failed_transactions">Laporan Transaksi Gagal / Refund</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-white">EXPORT FORMAT</label>
                                        <p className="text-[10px] text-slate-500 mt-0.5 mb-3 leading-snug">Select file extension compatible with your system.</p>
                                        <select 
                                            className="w-full bg-[#0a0f1d] border border-[#1e293b] text-slate-200 text-sm rounded-md focus:ring-1 focus:ring-[#e8ff47] focus:border-[#e8ff47] block p-2.5 transition-colors shadow-inner"
                                            value={filter.format} onChange={(e) => setFilter({...filter, format: e.target.value})}
                                        >
                                            <option value="pdf">PDF Document (.pdf)</option>
                                            <option value="xlsx">Excel Spreadsheet (.xlsx)</option>
                                            <option value="csv">CSV File (.csv)</option>
                                        </select>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-end mb-3">
                                        <div>
                                            <label className="block text-xs font-bold text-white">DATE RANGE</label>
                                            <p className="text-[10px] text-slate-500 mt-0.5 leading-snug">Filter records based on transaction time.</p>
                                        </div>
                                        <div className="flex bg-[#0a0f1d] p-1 rounded-lg border border-[#1e293b]">
                                            {['Today', '7 Days', '30 Days', 'Custom'].map(preset => (
                                                <button 
                                                    key={preset} type="button" 
                                                    onClick={() => handleDatePreset(preset)}
                                                    className={`px-3 py-1.5 text-[10px] font-bold rounded-md transition-all ${
                                                        datePreset === preset ? 'bg-[#1e293b] text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'
                                                    }`}
                                                >
                                                    {preset}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    
                                    <div className={`grid grid-cols-2 gap-4 transition-all duration-300 ${datePreset !== 'Custom' ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
                                        <input type="date" className="w-full bg-[#0a0f1d] border border-[#1e293b] text-slate-200 text-sm rounded-md focus:ring-1 focus:ring-[#e8ff47] p-2.5" value={filter.start_date} onChange={(e) => setFilter({...filter, start_date: e.target.value})} />
                                        <input type="date" className="w-full bg-[#0a0f1d] border border-[#1e293b] text-slate-200 text-sm rounded-md focus:ring-1 focus:ring-[#e8ff47] p-2.5" value={filter.end_date} onChange={(e) => setFilter({...filter, end_date: e.target.value})} />
                                    </div>
                                </div>

                                <div className="bg-[#0a0f1d] border border-[#1e293b] rounded-lg p-5 mt-8">
                                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Export Summary</h4>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        <div>
                                            <p className="text-[10px] text-slate-500 mb-1">Dataset</p>
                                            <p className="text-xs font-bold text-slate-200 truncate">{typeLabels[filter.type]}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 mb-1">Format</p>
                                            <p className="text-xs font-bold text-slate-200 truncate">{formatLabels[filter.format]}</p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 mb-1">Period</p>
                                            <p className="text-xs font-bold text-slate-200 truncate">
                                                {filter.start_date && filter.end_date ? `${filter.start_date} to ${filter.end_date}` : 'All Time'}
                                            </p>
                                        </div>
                                        <div>
                                            <p className="text-[10px] text-slate-500 mb-1">Estimated Rows</p>
                                            <p className="text-xs font-bold text-emerald-400">{totalRows > 0 ? `${totalRows} records` : 'Auto-calculated'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-[#1e293b] flex items-center justify-between">
                                    <div className="text-[11px] text-slate-500 font-medium">
                                        {exportStatus === 'preparing' && <span className="text-[#e8ff47] animate-pulse">Compiling data...</span>}
                                    </div>

                                    <button 
                                        type="submit" disabled={isExporting} 
                                        className="flex items-center justify-center gap-2 bg-[#e8ff47] hover:bg-[#d4ed35] disabled:opacity-70 text-[#0f172a] text-sm font-bold py-3 px-8 rounded-md shadow-[0_4px_14px_rgba(232,255,71,0.2)] transition-all min-w-[180px]"
                                    >
                                        {isExporting ? 'Processing...' : (
                                            <>
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                                Generate Export
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* MAPPING DATA ASLI DARI DATABASE UNTUK HISTORY LOGS */}
                    <div className="lg:col-span-4">
                        <div className="bg-[#0f172a] rounded-xl border border-[#1e293b] sticky top-24 shadow-lg overflow-hidden">
                            <div className="p-5 border-b border-[#1e293b] bg-[#0a0f1d] flex justify-between items-center">
                                <div>
                                    <h3 className="text-sm font-bold text-white">Recent Exports</h3>
                                    <p className="text-[10px] text-slate-500 mt-0.5">Real-time activity log</p>
                                </div>
                                <span className="px-2 py-1 bg-[#1e293b] text-slate-300 text-[10px] font-bold rounded-md">SysLog</span>
                            </div>
                            
                            <div className="p-2 space-y-1 min-h-[200px]">
                                {exportLogs && exportLogs.length > 0 ? (
                                    exportLogs.map((log) => (
                                        <div key={log.id} className="p-3 hover:bg-[#1e293b]/50 rounded-lg transition-colors group flex items-start gap-3">
                                            <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                                                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold text-slate-200 truncate">{log.file_name}</p>
                                                <p className="text-[10px] text-slate-500 mt-0.5 flex items-center gap-1">
                                                    Success <span className="w-1 h-1 rounded-full bg-slate-600"></span> {new Date(log.created_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full pt-10 pb-8 text-center">
                                        <svg className="w-8 h-8 text-slate-600 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path></svg>
                                        <p className="text-xs text-slate-500 font-medium">No export history yet</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* MODAL POP-UP PREVIEW */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0f172a]/80 backdrop-blur-sm p-4">
                        <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl w-full max-w-4xl shadow-2xl overflow-hidden ring-1 ring-white/10">
                            <div className="flex justify-between items-center p-5 border-b border-[#1e293b] bg-[#0a0f1d]">
                                <div>
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <svg className="w-5 h-5 text-[#e8ff47]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                        Preview Dataset
                                    </h3>
                                    <p className="text-xs text-slate-400 mt-1">Showing top 5 of {totalRows} records.</p>
                                </div>
                                <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white p-2 bg-slate-800/50 hover:bg-slate-700 rounded-md transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                </button>
                            </div>

                            <div className="p-0 overflow-x-auto">
                                <table className="min-w-full divide-y divide-[#1e293b] text-sm">
                                    <thead className="bg-[#0f172a]">
                                        <tr>
                                            <th className="px-6 py-4 text-left font-black text-slate-500 uppercase tracking-wider text-[10px]">Order ID</th>
                                            <th className="px-6 py-4 text-left font-black text-slate-500 uppercase tracking-wider text-[10px]">Customer</th>
                                            <th className="px-6 py-4 text-left font-black text-slate-500 uppercase tracking-wider text-[10px]">Event</th>
                                            <th className="px-6 py-4 text-right font-black text-slate-500 uppercase tracking-wider text-[10px]">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1e293b] bg-[#0a0f1d]/50">
                                        {previewData.length > 0 ? previewData.map((row) => (
                                            <tr key={row.ID} className="hover:bg-[#1e293b]/50 transition-colors">
                                                <td className="px-6 py-3.5 text-slate-300 font-medium">{row.OrderNo || row.ID}</td>
                                                <td className="px-6 py-3.5 text-slate-300">{row.CustomerName || 'Guest'}</td>
                                                <td className="px-6 py-3.5 text-slate-400 text-xs">{row.EventName || '-'}</td>
                                                <td className="px-6 py-3.5 text-[#e8ff47] text-right font-bold tracking-wide">Rp {row.TotalAmount}</td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-12 text-center text-slate-400 font-medium">No data found.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>

                            <div className="p-5 border-t border-[#1e293b] bg-[#0a0f1d] flex justify-end gap-3">
                                <button onClick={() => setShowModal(false)} className="px-5 py-2.5 text-sm font-bold text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors">Cancel</button>
                                <button onClick={confirmDownload} disabled={totalRows === 0} className="flex items-center gap-2 px-6 py-2.5 bg-white hover:bg-gray-100 text-[#0f172a] text-sm font-bold rounded-md shadow-lg transition-all">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                    Confirm & Download
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </AdminLayout>
    );
}