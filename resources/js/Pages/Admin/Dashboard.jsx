import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function AdminDashboard() {
    const { auth } = usePage().props;

    // Dummy Data Transaksi dari Referensi
    const transactions = [
        { id: 1, initial: 'RD', color: 'bg-blue-500', name: 'Rina Dewi', event: 'Coldplay World Tour', category: 'VIP', amount: 'Rp 2.000.000', method: 'QRIS' },
        { id: 2, initial: 'BH', color: 'bg-green-500', name: 'Budi Hartono', event: 'Jazz Festival Night', category: 'Regular', amount: 'Rp 350.000', method: 'Transfer' },
        { id: 3, initial: 'SA', color: 'bg-yellow-500', name: 'Siti Anisa', event: 'Rock Arena Festival', category: 'Festival', amount: 'Rp 850.000', method: 'GoPay' },
        { id: 4, initial: 'AW', color: 'bg-red-500', name: 'Andi Wijaya', event: 'Neon Rave Bali', category: 'Early Bird', amount: 'Rp 300.000', method: 'OVO' },
        { id: 5, initial: 'MR', color: 'bg-purple-500', name: 'Maya Rahayu', event: 'Coldplay World Tour', category: 'VVIP', amount: 'Rp 2.500.000', method: 'CC' },
    ];

    return (
        <div className="flex h-screen bg-[#0C0F16] text-gray-300 font-sans selection:bg-[#e8ff47] selection:text-black overflow-hidden">
            <Head title="Admin Overview - Eventix" />

            {/* 🌟 SIDEBAR KIRI */}
            <aside className="w-64 bg-[#12161f] border-r border-white/5 flex flex-col justify-between h-full hidden md:flex">
                <div>
                    {/* Logo */}
                    <div className="h-20 flex items-center px-8 border-b border-white/5">
                        <span className="text-xl font-black tracking-tighter text-white uppercase">
                            EVEN<span className="text-[#e8ff47]">TIX</span>
                        </span>
                    </div>

                    {/* Menu Navigasi */}
                    <nav className="px-4 py-6 space-y-8">
                        <div>
                            <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Main</p>
                            <ul className="space-y-1">
                                <li>
                                    <a href="#" className="flex items-center gap-3 px-4 py-2.5 bg-white/5 text-white rounded-xl border border-white/10 shadow-sm">
                                        <svg className="w-4 h-4 text-[#e8ff47]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                                        <span className="text-sm font-medium">Overview</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center justify-between px-4 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                                        <div className="flex items-center gap-3">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                                            <span className="text-sm font-medium">Events</span>
                                        </div>
                                        <span className="bg-blue-600/20 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full">12</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg>
                                        <span className="text-sm font-medium">Tickets</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <span className="text-sm font-medium">Transactions</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                        <span className="text-sm font-medium">Customers</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Reports</p>
                            <ul className="space-y-1">
                                <li>
                                    <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"></path></svg>
                                        <span className="text-sm font-medium">Analytics</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                                        <span className="text-sm font-medium">Export</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

                {/* Profile Admin Bottom */}
                <div className="p-4 border-t border-white/5">
                    <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-pointer">
                        <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 font-bold border border-blue-500/30">
                            AR
                        </div>
                        <div>
                            <p className="text-sm font-bold text-white leading-tight">{auth.user?.FullName || 'Admin Role'}</p>
                            <p className="text-[10px] text-gray-500">{auth.user?.Role || 'Super Admin'}</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* 🌟 MAIN CONTENT AREA */}
            <main className="flex-1 flex flex-col h-full overflow-hidden bg-[#0C0F16]">
                {/* Header Navbar */}
                <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-[#12161f]/50 backdrop-blur-sm shrink-0">
                    <div className="flex items-center gap-4">
                        <h1 className="text-xl font-bold text-white">Overview</h1>
                        <span className="text-sm text-gray-500 hidden sm:block">Apr 22, 2026</span>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* JALAN PULANG KE MAIN MENU */}
                        <Link href={route('home')} className="px-4 py-2 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/5 transition-colors hidden sm:block">
                            Go to Website
                        </Link>
                        <button className="px-4 py-2 border border-white/10 rounded-lg text-xs font-bold hover:bg-white/5 transition-colors">
                            Export
                        </button>
                        <button className="px-4 py-2 bg-[#e8ff47] text-black rounded-lg text-xs font-bold hover:bg-[#d4ed35] transition-colors">
                            + New Event
                        </button>
                    </div>
                </header>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">
                    
                    {/* 📊 4 STAT CARDS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {/* Card 1 */}
                        <div className="bg-[#12161f] p-6 rounded-2xl border border-white/5 shadow-lg">
                            <p className="text-xs font-medium text-gray-400 mb-2">Total revenue</p>
                            <p className="text-3xl font-black text-white mb-2">Rp 847M</p>
                            <p className="text-[10px] text-gray-500"><span className="text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded">+12.4%</span> vs last month</p>
                        </div>
                        {/* Card 2 */}
                        <div className="bg-[#12161f] p-6 rounded-2xl border border-white/5 shadow-lg">
                            <p className="text-xs font-medium text-gray-400 mb-2">Tickets sold</p>
                            <p className="text-3xl font-black text-white mb-2">24,391</p>
                            <p className="text-[10px] text-gray-500"><span className="text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded">+8.1%</span> vs last month</p>
                        </div>
                        {/* Card 3 */}
                        <div className="bg-[#12161f] p-6 rounded-2xl border border-white/5 shadow-lg">
                            <p className="text-xs font-medium text-gray-400 mb-2">Active events</p>
                            <p className="text-3xl font-black text-white mb-2">12</p>
                            <p className="text-[10px] text-gray-500"><span className="text-red-400 bg-red-400/10 px-1.5 py-0.5 rounded">-2</span> vs last month</p>
                        </div>
                        {/* Card 4 */}
                        <div className="bg-[#12161f] p-6 rounded-2xl border border-white/5 shadow-lg">
                            <p className="text-xs font-medium text-gray-400 mb-2">Avg. capacity</p>
                            <p className="text-3xl font-black text-white mb-2">78%</p>
                            <p className="text-[10px] text-gray-500"><span className="text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded">+5.2%</span> vs last month</p>
                        </div>
                    </div>

                    {/* 📈 CHARTS AREA */}
                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                        {/* Line Chart Section */}
                        <div className="xl:col-span-2 bg-[#12161f] p-6 rounded-2xl border border-white/5 shadow-lg">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="text-sm font-bold text-white">Revenue trend</h3>
                                    <p className="text-[10px] text-gray-500">Monthly gross revenue (in million Rp)</p>
                                </div>
                                <select className="bg-[#1a1f2b] border border-white/10 text-xs text-gray-300 rounded-lg px-3 py-1.5 focus:ring-[#e8ff47]">
                                    <option>Last 6 months</option>
                                    <option>This Year</option>
                                </select>
                            </div>
                            
                            {/* Dummy Line Chart visual menggunakan SVG */}
                            <div className="h-48 w-full relative mt-4">
                                <div className="absolute inset-0 flex flex-col justify-between">
                                    {[900, 700, 500, 300, 100].map((val) => (
                                        <div key={val} className="border-t border-white/5 w-full h-0 relative">
                                            <span className="absolute -left-6 -top-2 text-[8px] text-gray-600">{val}</span>
                                        </div>
                                    ))}
                                </div>
                                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                                    <path d="M0,60 L20,55 L40,45 L60,35 L80,25 L100,15" fill="none" stroke="#3b82f6" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                                    <path d="M0,85 L20,83 L40,80 L60,78 L80,75 L100,75" fill="none" stroke="#10b981" strokeWidth="2" strokeDasharray="4,4" vectorEffect="non-scaling-stroke" />
                                    {/* Data Points */}
                                    <circle cx="0" cy="60" r="2" fill="#3b82f6" />
                                    <circle cx="20" cy="55" r="2" fill="#3b82f6" />
                                    <circle cx="40" cy="45" r="2" fill="#3b82f6" />
                                    <circle cx="60" cy="35" r="2" fill="#3b82f6" />
                                    <circle cx="80" cy="25" r="2" fill="#3b82f6" />
                                    <circle cx="100" cy="15" r="2" fill="#3b82f6" />
                                </svg>
                                <div className="absolute -bottom-6 left-0 right-0 flex justify-between text-[9px] text-gray-500 px-2">
                                    <span>Nov</span><span>Des</span><span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span>
                                </div>
                            </div>
                            <div className="flex gap-4 mt-8 text-[10px] text-gray-400">
                                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-blue-500"></div> Revenue</span>
                                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded bg-green-500"></div> Tickets</span>
                            </div>
                        </div>

                        {/* Donut Chart Section */}
                        <div className="bg-[#12161f] p-6 rounded-2xl border border-white/5 shadow-lg">
                            <h3 className="text-sm font-bold text-white mb-1">Ticket category</h3>
                            <p className="text-[10px] text-gray-500 mb-8">Sales by tier this month</p>
                            
                            <div className="flex justify-center mb-8 relative">
                                {/* Dummy Donut Chart pakai CSS Conic Gradient */}
                                <div className="w-40 h-40 rounded-full" style={{ background: 'conic-gradient(#3b82f6 0% 35%, #10b981 35% 65%, #8b5cf6 65% 85%, #ef4444 85% 100%)' }}></div>
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 bg-[#12161f] rounded-full"></div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="flex items-center gap-2 text-gray-400"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Festival</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="flex items-center gap-2 text-gray-400"><div className="w-2 h-2 rounded-full bg-green-500"></div> VIP</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="flex items-center gap-2 text-gray-400"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Tribune</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="flex items-center gap-2 text-gray-400"><div className="w-2 h-2 rounded-full bg-red-500"></div> VVIP</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 📋 TRANSACTIONS TABLE */}
                    <div className="bg-[#12161f] rounded-2xl border border-white/5 shadow-lg overflow-hidden">
                        <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <h3 className="text-sm font-bold text-white">Recent transactions</h3>
                            <div className="flex bg-[#0a0a0a] rounded-lg p-1 border border-white/5 overflow-x-auto">
                                <button className="px-4 py-1.5 text-xs font-medium bg-[#1a1f2b] text-white rounded-md shadow">All</button>
                                <button className="px-4 py-1.5 text-xs font-medium text-gray-400 hover:text-white">Paid</button>
                                <button className="px-4 py-1.5 text-xs font-medium text-gray-400 hover:text-white">Pending</button>
                                <button className="px-4 py-1.5 text-xs font-medium text-gray-400 hover:text-white">Refunded</button>
                            </div>
                        </div>
                        
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/5">
                                        <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Customer</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Event</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Amount</th>
                                        <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Method</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {transactions.map((trx) => (
                                        <tr key={trx.id} className="hover:bg-white/[0.02] transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-full ${trx.color} flex items-center justify-center text-white text-xs font-bold`}>
                                                        {trx.initial}
                                                    </div>
                                                    <span className="text-sm font-medium text-white">{trx.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-300 max-w-[150px] truncate block">{trx.event}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-400">{trx.category}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-medium text-white">{trx.amount}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-400">{trx.method}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}