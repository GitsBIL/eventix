import React, { useState } from 'react';
import { Head, usePage } from '@inertiajs/react';
import AdminSidebar from '@/Components/AdminSidebar';
import { 
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, 
    XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';

// TANGKAP PROPS DARI CONTROLLER DI SINI
export default function Analytics({ revenueData, ticketSalesData, paymentStatusData, eventPerformance, stats }) {
    const { auth } = usePage().props;
    const [dateRange, setDateRange] = useState('All Time');

    return (
        <div className="flex h-screen bg-[#060816] text-slate-300 font-sans overflow-hidden selection:bg-[#e8ff47] selection:text-black">
            <Head title="Business Analytics - Eventix" />

            <AdminSidebar />

            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                
                <header className="h-16 flex items-center justify-between px-8 border-b border-[#1e293b] bg-[#0f172a] z-20 shrink-0">
                    <div className="flex items-center gap-4">
                        <h1 className="text-base font-bold text-white">Analytics</h1>
                        <span className="text-[10px] text-slate-500 font-medium hidden md:block">Real-time Business Intelligence</span>
                    </div>

                    <div className="flex items-center gap-3">
                        <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="bg-[#060816] border border-[#1e293b] rounded-md px-3 py-1.5 text-xs text-white focus:outline-none cursor-pointer">
                            <option>All Time</option>
                        </select>

                        <div className="w-px h-6 bg-[#1e293b] mx-1"></div>

                        <button className="px-3 py-1.5 bg-slate-800 border border-slate-700 hover:bg-slate-700 rounded-md text-xs font-semibold text-slate-300 transition-all flex items-center gap-2">
                            <svg className="w-3.5 h-3.5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"></path></svg>
                            PDF
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 no-scrollbar scroll-smooth space-y-8">
                    
                    {/* STATS CARDS REAL DATA */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                        <div className="bg-[#0f172a] p-5 rounded-xl border border-[#1e293b] shadow-sm relative overflow-hidden group">
                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1">Total Net Revenue</p>
                            <h3 className="text-2xl font-black text-white mb-2">{stats.totalRevenue}</h3>
                            <p className="text-[10px] font-bold text-emerald-400 flex items-center"><svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg> Paid & Issued only</p>
                        </div>
                        <div className="bg-[#0f172a] p-5 rounded-xl border border-[#1e293b] shadow-sm">
                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1">Total Tickets Sold</p>
                            <h3 className="text-2xl font-black text-white mb-2">{stats.totalTicketsSold}</h3>
                            <p className="text-[10px] font-bold text-emerald-400 flex items-center"><svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg> Valid orders</p>
                        </div>
                        <div className="bg-[#0f172a] p-5 rounded-xl border border-[#1e293b] shadow-sm">
                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1">Pending Settlements</p>
                            <h3 className="text-2xl font-black text-white mb-2">{stats.pendingSettlements}</h3>
                            <p className="text-[10px] font-medium text-amber-400 flex items-center"><svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Waiting payment</p>
                        </div>
                        <div className="bg-slate-800/30 p-5 rounded-xl border border-rose-500/20 shadow-sm">
                            <p className="text-[10px] font-semibold text-rose-400/80 uppercase tracking-widest mb-1">Cancelled / Failed</p>
                            <h3 className="text-2xl font-black text-rose-400 mb-2">{stats.refundAmount}</h3>
                            <p className="text-[10px] font-medium text-slate-500 flex items-center">Unsuccessful transactions</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        
                        <div className="xl:col-span-2 bg-[#0f172a] p-6 rounded-xl border border-[#1e293b] shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Revenue Over Time</h3>
                                    <p className="text-[10px] text-slate-500 mt-1">Based on creation date</p>
                                </div>
                            </div>
                            <div className="h-[280px] w-full">
                                {revenueData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <LineChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                            <XAxis dataKey="date" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                            <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `Rp ${v/1000}k`} />
                                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }} itemStyle={{ color: '#e8ff47', fontWeight: 'bold' }} formatter={(val) => [`Rp ${val.toLocaleString()}`, 'Revenue']} />
                                            <Line type="monotone" dataKey="revenue" stroke="#e8ff47" strokeWidth={3} dot={{ fill: '#060816', stroke: '#e8ff47', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#e8ff47' }} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 border border-dashed border-[#1e293b] rounded-lg">
                                        <span className="text-2xl mb-2">📉</span>
                                        <p className="text-xs font-bold uppercase tracking-widest">No Revenue Data</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="xl:col-span-1 bg-[#0f172a] p-6 rounded-xl border border-[#1e293b] shadow-sm flex flex-col">
                            <div className="mb-6">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Ticket Category Sales</h3>
                                <p className="text-[10px] text-slate-500 mt-1">Most purchased categories</p>
                            </div>
                            <div className="h-[280px] w-full mt-auto">
                                {ticketSalesData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={ticketSalesData} layout="vertical" margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                                            <XAxis type="number" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} hide />
                                            <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} width={80} />
                                            <Tooltip cursor={{fill: '#1e293b'}} contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }} />
                                            <Bar dataKey="sold" fill="#3b82f6" radius={[0, 4, 4, 0]}>
                                                {ticketSalesData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={index === 0 ? '#e8ff47' : '#3b82f6'} />
                                                ))}
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 border border-dashed border-[#1e293b] rounded-lg">
                                        <span className="text-2xl mb-2">📊</span>
                                        <p className="text-xs font-bold uppercase tracking-widest">No Sales Data</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        
                        <div className="xl:col-span-2 bg-[#0f172a] rounded-xl border border-[#1e293b] shadow-sm overflow-hidden flex flex-col">
                            <div className="p-5 border-b border-[#1e293b] flex justify-between items-center bg-[#0a0d14]">
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider">Event Performance</h3>
                            </div>
                            <div className="overflow-x-auto flex-1">
                                <table className="w-full text-left">
                                    <thead className="bg-[#060816]/50 border-b border-[#1e293b]">
                                        <tr className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                                            <th className="px-5 py-4">Event Name</th>
                                            <th className="px-5 py-4">Net Revenue</th>
                                            <th className="px-5 py-4">Status</th>
                                            <th className="px-5 py-4 w-56">Occupancy Rate</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1e293b]">
                                        {eventPerformance.length > 0 ? eventPerformance.map((ev, i) => {
                                            const progress = ev.target > 0 ? Math.round((ev.sold / ev.target) * 100) : 0;
                                            return (
                                                <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                                                    <td className="px-5 py-4 text-sm font-bold text-white">{ev.name}</td>
                                                    <td className="px-5 py-4 text-sm font-semibold text-emerald-400">{ev.revenue}</td>
                                                    <td className="px-5 py-4">
                                                        {progress >= 100 && ev.target > 0
                                                            ? <span className="px-2 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-bold rounded uppercase">Sold Out</span>
                                                            : <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold rounded uppercase">{ev.status}</span>
                                                        }
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <div className="flex justify-between items-end mb-1.5">
                                                            <span className="text-[10px] text-slate-400">{ev.sold} / {ev.target} Sold</span>
                                                            <span className="text-[10px] text-white font-mono font-bold">{progress}%</span>
                                                        </div>
                                                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                            <div className={`h-full rounded-full ${progress >= 100 ? 'bg-amber-400' : 'bg-blue-500'}`} style={{ width: `${progress}%` }}></div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        }) : (
                                            <tr><td colSpan="4" className="px-5 py-8 text-center text-slate-500 text-xs">No events to display.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="xl:col-span-1 bg-[#0f172a] rounded-xl border border-[#1e293b] shadow-sm p-6 flex flex-col">
                            <div>
                                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1">Transaction Status</h3>
                                <p className="text-[10px] text-slate-500">Based on payment records</p>
                            </div>
                            
                            <div className="h-48 w-full relative my-6">
                                {paymentStatusData.length > 0 ? (
                                    <ResponsiveContainer width="100%" height="100%">
                                        <PieChart>
                                            <Pie data={paymentStatusData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={2} dataKey="value" stroke="none">
                                                {paymentStatusData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                                ))}
                                            </Pie>
                                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px' }} itemStyle={{ color: '#fff' }} />
                                        </PieChart>
                                    </ResponsiveContainer>
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 border border-dashed border-[#1e293b] rounded-lg">
                                        <span className="text-2xl mb-2">⏱️</span>
                                        <p className="text-xs font-bold uppercase tracking-widest">No Transactions</p>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3 mt-auto">
                                {paymentStatusData.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center text-xs p-2 bg-slate-800/30 rounded border border-[#1e293b]">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }}></div>
                                            <span className="font-semibold text-slate-300">{item.name}</span>
                                        </div>
                                        <span className="font-bold text-white">{item.value} Orders</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}