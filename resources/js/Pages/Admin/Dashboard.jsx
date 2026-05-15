import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AdminDashboard({ stats, categorySales, revenueChart, recentTransactions }) {
    const { auth } = usePage().props;

    const getStatusStyle = (status) => {
        switch (status) {
            case 'paid': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'pending_payment': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'failed': case 'cancelled': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
            default: return 'bg-slate-800 text-slate-400 border-slate-700';
        }
    };

    return (
        <div className="flex h-screen bg-[#060816] text-slate-300 font-sans overflow-hidden selection:bg-[#e8ff47] selection:text-black">
            <Head title="System Dashboard - Eventix" />

            {/* SIDEBAR */}
            <aside className="w-64 bg-[#0f172a] border-r border-[#1e293b] flex flex-col justify-between h-full hidden md:flex shrink-0 shadow-2xl z-20">
                <div className="overflow-y-auto overflow-x-hidden no-scrollbar">
                    <div className="h-16 flex items-center px-6 border-b border-[#1e293b] sticky top-0 bg-[#0f172a]/90 backdrop-blur-md z-10">
                        <span className="text-lg font-black text-white uppercase tracking-tighter">EVEN<span className="text-[#e8ff47]">TIX</span></span>
                    </div>
                    
                    <div className="px-4 py-6 space-y-6">
                        <div>
                            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Overview</p>
                            <ul className="space-y-0.5">
                                <li>
                                    <Link href={route('admin.dashboard')} className="flex items-center gap-3 px-3 py-2 bg-slate-800/80 text-white rounded-lg border border-slate-700/50 transition-all shadow-sm">
                                        <svg className="w-4 h-4 text-[#e8ff47]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                                        <span className="text-sm font-semibold">Dashboard</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                                        <span className="text-sm font-medium">Analytics</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Event Management</p>
                            <ul className="space-y-0.5">
                                <li><Link href={route('admin.events.index')} className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><span className="text-sm font-medium">Events</span></Link></li>
                                <li><Link href={route('admin.tickets.index')} className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg><span className="text-sm font-medium">Tickets</span></Link></li>
                                <li><Link href="#" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg><span className="text-sm font-medium">Transactions</span></Link></li>
                            </ul>
                        </div>

                        <div>
                            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">System</p>
                            <ul className="space-y-0.5">
                                <li><Link href="#" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg><span className="text-sm font-medium">Customers</span></Link></li>
                                <li><Link href="#" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg><span className="text-sm font-medium">Settings</span></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t border-[#1e293b] bg-[#0f172a]">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-9 h-9 rounded-md bg-slate-800 flex items-center justify-center text-slate-300 font-bold border border-slate-700 text-xs">
                                {auth.user.FullName.charAt(0)}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#0f172a] rounded-full"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-white truncate leading-tight">{auth.user.FullName}</p>
                            <p className="text-[10px] text-emerald-400 font-medium truncate mt-0.5">Online • System Admin</p>
                        </div>
                        <Link href={route('logout')} method="post" as="button" className="text-slate-500 hover:text-red-400 transition-colors p-1.5 hover:bg-red-500/10 rounded-md">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                        </Link>
                    </div>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                <header className="h-16 flex items-center justify-between px-8 border-b border-[#1e293b] bg-[#0f172a] z-20 shrink-0">
                    <div className="flex items-center gap-4">
                        <h1 className="text-base font-bold text-white">Dashboard</h1>
                        <div className="hidden lg:flex items-center px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse"></div>
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">System Operational</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="relative hidden md:block">
                            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <input type="text" placeholder="Search orders, events..." className="bg-[#060816] border border-[#1e293b] rounded-md pl-9 pr-12 py-1.5 text-xs text-white focus:outline-none focus:border-slate-500 transition-colors w-64 placeholder-slate-600" />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[9px] text-slate-400 font-mono">⌘K</span>
                            </div>
                        </div>
                        <button className="relative p-1.5 text-slate-400 hover:text-white transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full border border-[#0f172a]"></span>
                        </button>
                        <Link href="/" className="ml-2 flex items-center gap-2 px-4 py-1.5 bg-slate-800 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white rounded-md text-xs font-bold transition-all shadow-sm">
                            View Site <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                        </Link>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 space-y-8 no-scrollbar scroll-smooth">
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        <div className="bg-[#0f172a] p-6 rounded-xl border border-[#1e293b] shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1">Total Revenue</p>
                            <p className="text-3xl font-black text-white mb-2">{stats.totalRevenue}</p>
                            <p className="text-[10px] font-bold text-emerald-400 flex items-center"><svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg> +18.5% from last week</p>
                        </div>
                        <div className="bg-[#0f172a] p-6 rounded-xl border border-[#1e293b] shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1">Tickets Sold</p>
                            <p className="text-3xl font-black text-white mb-2">{stats.ticketsSold}</p>
                            <p className="text-[10px] font-bold text-emerald-400 flex items-center"><svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg> +12% from last week</p>
                        </div>
                        <div className="bg-[#0f172a] p-6 rounded-xl border border-[#1e293b] shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1">Active Events</p>
                            <p className="text-3xl font-black text-white mb-2">{stats.activeEvents}</p>
                            <p className="text-[10px] font-bold text-slate-500 flex items-center"><svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14"></path></svg> Stable</p>
                        </div>
                        <div className="bg-[#0f172a] p-6 rounded-xl border border-[#1e293b] shadow-sm relative overflow-hidden group hover:-translate-y-1 transition-all duration-300">
                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-1">Total Customers</p>
                            <p className="text-3xl font-black text-white mb-2">{stats.totalCustomers}</p>
                            <p className="text-[10px] font-bold text-emerald-400 flex items-center"><svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg> +5 new today</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                        <div className="xl:col-span-2 bg-[#0f172a] p-6 rounded-xl border border-[#1e293b] shadow-sm">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-sm font-black text-white uppercase tracking-widest">Revenue Overview</h3>
                                    <p className="text-[10px] text-slate-500 uppercase tracking-widest">Last 7 Days Performance</p>
                                </div>
                                <div className="px-3 py-1 bg-slate-800 text-slate-300 rounded text-[10px] font-bold border border-slate-700">Weekly</div>
                            </div>
                            <div className="h-64 w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={revenueChart}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                        <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} />
                                        <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `Rp ${value / 1000000}M`} />
                                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', fontSize: '12px', color: '#fff' }} formatter={(value) => [`Rp ${value.toLocaleString()}`, 'Revenue']} />
                                        <Line type="monotone" dataKey="revenue" stroke="#e8ff47" strokeWidth={3} dot={{ fill: '#e8ff47', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, fill: '#fff' }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        <div className="bg-[#0f172a] p-6 rounded-xl border border-[#1e293b] shadow-sm flex flex-col justify-between">
                            <div>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                                        <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.956 11.956 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-black text-white uppercase tracking-widest">Security Protocol</h3>
                                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">System Protection Active</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-[#1e293b]">
                                        <div className="flex items-center gap-3">
                                            <svg className="w-4 h-4 text-slate-300" viewBox="0 0 24 24" fill="currentColor"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.761h-9.426"></path></svg>
                                            <span className="text-xs font-bold text-slate-300">Google OAuth</span>
                                        </div>
                                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold rounded uppercase">Secured</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-[#1e293b]">
                                        <div className="flex items-center gap-3">
                                            <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                            <span className="text-xs font-bold text-slate-300">2FA Authentication</span>
                                        </div>
                                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold rounded uppercase">Enabled</span>
                                    </div>
                                    <div className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-[#1e293b]">
                                        <div className="flex items-center gap-3">
                                            <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                                            <span className="text-xs font-bold text-slate-300">SSL / TLS</span>
                                        </div>
                                        <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold rounded uppercase">Active</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-8">
                        <div className="xl:col-span-2 bg-[#0f172a] rounded-xl border border-[#1e293b] shadow-sm overflow-hidden">
                            <div className="p-6 border-b border-[#1e293b] flex justify-between items-center">
                                <h3 className="text-xs font-black text-white uppercase tracking-widest">Recent Transactions</h3>
                                <Link href="#" className="text-[10px] text-slate-400 hover:text-white uppercase font-bold tracking-widest transition-colors">View All</Link>
                            </div>
                            {recentTransactions.length > 0 ? (
                                <table className="w-full text-left">
                                    <thead className="bg-[#060816]/50">
                                        <tr className="text-[10px] font-semibold text-slate-500 uppercase border-b border-[#1e293b]">
                                            <th className="px-6 py-4">Customer</th>
                                            <th className="px-6 py-4">Event Info</th>
                                            <th className="px-6 py-4">Amount</th>
                                            <th className="px-6 py-4">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1e293b]">
                                        {recentTransactions.map((trx) => (
                                            <tr key={trx.id} className="hover:bg-slate-800/30 transition-colors group">
                                                <td className="px-6 py-4 flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center text-slate-300 text-[10px] font-bold border border-slate-700">{trx.initial}</div>
                                                    <div>
                                                        <p className="text-sm font-bold text-white leading-tight">{trx.name}</p>
                                                        <p className="text-[10px] text-slate-500 mt-0.5">{trx.date}</p>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-xs text-slate-400 font-medium truncate max-w-[200px]">{trx.event}</td>
                                                <td className="px-6 py-4 text-sm font-black text-white">{trx.amount}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 text-[9px] font-bold rounded border uppercase tracking-wider ${getStatusStyle(trx.status)}`}>
                                                        {trx.status.replace('_', ' ')}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="p-12 text-center">
                                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
                                        <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
                                    </div>
                                    <p className="text-sm font-bold text-slate-300">No transactions yet</p>
                                    <p className="text-xs text-slate-500 mt-1">When customers buy tickets, they will appear here.</p>
                                </div>
                            )}
                        </div>

                        <div className="bg-[#0f172a] p-6 rounded-xl border border-[#1e293b] shadow-sm flex flex-col">
                            <h3 className="text-xs font-black text-white uppercase tracking-widest mb-2">Sales by Category</h3>
                            <div className="h-48 w-full relative mb-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie data={categorySales} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                                            {categorySales.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', borderRadius: '8px', fontSize: '12px', color: '#fff' }} formatter={(value) => [`${value} Tickets`, 'Sold']} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none">
                                    <span className="text-2xl font-black text-white">{categorySales.reduce((a, b) => a + b.value, 0)}</span>
                                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Total Sold</span>
                                </div>
                            </div>
                            <div className="space-y-3 mt-auto">
                                {categorySales.map((item, i) => (
                                    <div key={i} className="flex justify-between items-center bg-slate-800/30 p-2 rounded-lg border border-[#1e293b]">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                                            <span className="text-xs font-semibold text-slate-300">{item.name}</span>
                                        </div>
                                        <span className="text-xs font-black text-white">{item.value}</span>
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