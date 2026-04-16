import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';

// --- DATA DUMMY UPDATE (Nama Temen Lu) ---
const latestTransactions = [
    { id: '#ORD-089', name: 'Bagas Giri', status: 'Paid', total: 'Rp 2.500.000' },
    { id: '#ORD-090', name: 'Dapa Maulana', status: 'Pending', total: 'Rp 450.000' },
    { id: '#ORD-091', name: 'Haidar Yudha', status: 'Paid', total: 'Rp 1.200.000' },
    { id: '#ORD-092', name: 'Rangga Arfiansyah', status: 'Expired', total: 'Rp 750.000' },
];

const sidebarGroups = [
    {
        title: 'MAIN MENU',
        items: [
            { name: 'Dashboard', icon: '📊', active: true },
            { name: 'Event Management', icon: '🎤', active: false },
            { name: 'Ticket Categories', icon: '🎟️', active: false },
        ]
    },
    {
        title: 'FINANCE & USERS',
        items: [
            { name: 'Orders', icon: '💳', active: false },
            { name: 'Reports', icon: '📈', active: false },
        ]
    }
];

export default function AdminDashboard({ auth }) {
    const [showNotif, setShowNotif] = useState(false);

    return (
        <div className="min-h-screen bg-[#07090D] text-gray-400 font-sans flex overflow-hidden">
            <Head title="Premium Admin Panel - Eventix" />

            {/* ========================================== */}
            {/* 🧱 2. SIDEBAR (Integrated Logo & Profile) */}
            {/* ========================================== */}
            <aside className="bg-[#0C0F16] border-r border-white/5 w-72 hidden md:flex flex-col z-30 shadow-2xl">
                
                {/* Section Logo + Profile (Satu Kesatuan) */}
                <div className="p-6 space-y-6 border-b border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent">
                    <div className="flex items-center gap-3">
                        <img src="/images/logo.png" alt="Logo" className="h-8 w-auto object-contain" />
                        <div>
                            <h1 className="text-white font-black tracking-tighter leading-none text-lg">EVENTIX</h1>
                            <p className="text-[10px] text-[#e8ff47] font-bold tracking-[0.2em] uppercase">Admin Panel</p>
                        </div>
                    </div>

                    <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex items-center gap-4 group hover:border-[#e8ff47]/30 transition-all duration-500">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gray-800 border-2 border-[#e8ff47] flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(232,255,71,0.2)]">
                                {auth.user.FullName.charAt(0)}
                            </div>
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0C0F16] rounded-full"></span>
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-bold text-white truncate">{auth.user.FullName}</p>
                            <p className="text-[10px] text-gray-500 font-medium">Super Administrator</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 p-4 space-y-8 overflow-y-auto custom-scrollbar mt-4">
                    {sidebarGroups.map((group, gIdx) => (
                        <div key={gIdx} className="space-y-2">
                            <h4 className="text-[10px] uppercase font-bold text-gray-600 tracking-[0.15em] px-4">{group.title}</h4>
                            <div className="space-y-1">
                                {group.items.map((item, iIdx) => (
                                    <a key={iIdx} href="#" className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${item.active ? 'bg-[#e8ff47]/5 text-[#e8ff47]' : 'hover:bg-white/[0.03] hover:text-white'}`}>
                                        <span className={`text-lg ${item.active ? '' : 'opacity-50 group-hover:opacity-100'}`}>{item.icon}</span>
                                        <span className="text-sm font-semibold tracking-wide">{item.name}</span>
                                        {item.active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#e8ff47] shadow-[0_0_8px_#e8ff47]"></div>}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>

                <div className="p-6 border-t border-white/5">
                    <Link href={route('logout')} method="post" as="button" className="flex items-center justify-center gap-3 w-full py-3 rounded-xl bg-red-500/5 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 font-bold text-sm border border-red-500/10">
                        <span>Logout System</span>
                    </Link>
                </div>
            </aside>

            {/* ========================================== */}
            {/* MAIN CONTENT */}
            {/* ========================================== */}
            <main className="flex-1 flex flex-col h-screen overflow-y-auto">
                
                {/* 🔍 3. TOP BAR (Enhanced Quick Access) */}
                <header className="h-20 bg-[#07090D]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-50">
                    <div className="flex items-center gap-6 w-full max-w-xl">
                        <div className="relative w-full group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-[#e8ff47] transition-colors">🔍</span>
                            <input 
                                type="text" 
                                placeholder="Search orders, events, or analytics..." 
                                className="w-full bg-white/[0.03] border border-white/5 rounded-xl pl-12 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#e8ff47]/30 transition-all shadow-inner"
                            />
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/5 rounded-lg border border-green-500/10 mr-2">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-[10px] text-green-500 font-black tracking-tighter">LIVE</span>
                        </div>

                        <button onClick={() => setShowNotif(!showNotif)} className="p-2.5 bg-white/[0.03] border border-white/5 rounded-xl text-gray-400 hover:text-white relative transition-all active:scale-95">
                            <span className="text-xl">🔔</span>
                            <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-[#07090D]"></span>
                        </button>

                        <div className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center overflow-hidden cursor-pointer hover:border-[#e8ff47]/50 transition-all shadow-lg">
                             <span className="text-xs font-bold text-white uppercase">{auth.user.FullName.charAt(0)}</span>
                        </div>
                    </div>
                </header>

                <div className="p-8 space-y-8">
                    
                    {/* 📊 2. STAT CARDS (Subtle Neon) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { label: 'Total Revenue', value: 'Rp 125M', icon: '💰', color: '#e8ff47' },
                            { label: 'Tiket Terjual', value: '8,420', icon: '🎟️', color: '#06B6D4' },
                            { label: 'Total Event', value: '24', icon: '📅', color: '#7C3AED' },
                            { label: 'Pending Orders', value: '142', icon: '⏳', color: '#F59E0B' },
                        ].map((card, i) => (
                            <div key={i} className="bg-[#0C0F16] border border-white/5 p-6 rounded-2xl relative group hover:border-white/10 transition-all duration-300 shadow-xl">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <p className="text-[10px] uppercase font-black text-gray-500 tracking-widest">{card.label}</p>
                                        <h3 className="text-2xl font-black text-white">{card.value}</h3>
                                    </div>
                                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] flex items-center justify-center text-lg border border-white/5 group-hover:scale-110 transition-transform duration-500" style={{ color: card.color }}>
                                        {card.icon}
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        
                        {/* 📈 6. AREA CHART (Glow & Minimalist) */}
                        <div className="lg:col-span-2 bg-[#0C0F16] border border-white/5 p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                            <div className="flex justify-between items-center mb-10">
                                <div>
                                    <h3 className="text-white font-bold text-lg">Sales Analytics</h3>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Performance per week</p>
                                </div>
                                <div className="flex gap-2">
                                    <div className="px-3 py-1 bg-white/[0.03] border border-white/5 rounded-lg text-[10px] text-white cursor-pointer hover:bg-white/10 transition-all">Daily</div>
                                    <div className="px-3 py-1 bg-[#e8ff47]/10 border border-[#e8ff47]/20 rounded-lg text-[10px] text-[#e8ff47] cursor-pointer">Weekly</div>
                                </div>
                            </div>
                            
                            {/* Line Chart Dummy with Neon Points */}
                            <div className="h-56 w-full flex items-end justify-between relative border-l border-b border-white/5 px-2">
                                {[40, 70, 45, 90, 65, 85, 55].map((h, i) => (
                                    <div key={i} className="relative group w-full flex justify-center">
                                        {/* Point Glow */}
                                        <div className="absolute bg-[#e8ff47] w-2 h-2 rounded-full shadow-[0_0_15px_#e8ff47] z-20 transition-all duration-500 group-hover:scale-150" style={{ bottom: `${h}%` }}></div>
                                        {/* Vertical Bar Support */}
                                        <div className="w-px bg-gradient-to-t from-[#e8ff47]/20 to-transparent absolute bottom-0" style={{ height: `${h}%` }}></div>
                                        <span className="absolute -bottom-6 text-[10px] font-bold text-gray-600 group-hover:text-white transition-colors">
                                            {['Mon','Tue','Wed','Thu','Fri','Sat','Sun'][i]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* 🎯 4. TOP SELLING (Dark & Elegant) */}
                        <div className="space-y-6">
                            <div className="bg-gradient-to-br from-[#121826] to-[#07090D] border border-white/5 p-8 rounded-2xl shadow-2xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#e8ff47] rounded-full blur-[100px] opacity-5 group-hover:opacity-10 transition-opacity"></div>
                                <div className="flex items-center gap-2 mb-6">
                                    <span className="text-xl">🔥</span>
                                    <h3 className="text-sm font-black text-white tracking-widest uppercase">Hot Selling</h3>
                                </div>
                                <div className="space-y-6">
                                    <div>
                                        <p className="text-xs text-gray-400 mb-2">Coldplay Asia Tour 2026</p>
                                        <div className="flex justify-between text-xs font-bold mb-2">
                                            <span className="text-white">92% Capacity</span>
                                            <span className="text-[#e8ff47]">4,600 / 5,000</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-white/[0.05] rounded-full overflow-hidden">
                                            <div className="h-full bg-gradient-to-r from-[#e8ff47] to-[#06B6D4] shadow-[0_0_10px_rgba(232,255,71,0.5)]" style={{ width: '92%' }}></div>
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-white/5">
                                        <div className="flex justify-between items-center">
                                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Conversion Rate</p>
                                            <p className="text-lg font-black text-[#06B6D4]">18.4%</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#0C0F16] border border-white/5 p-6 rounded-2xl">
                                <h3 className="text-white font-bold text-sm mb-4">System Notifications</h3>
                                <div className="space-y-4">
                                    {[
                                        { t: 'New Order', m: 'ORD-093 just came in', c: '#e8ff47' },
                                        { t: 'Stock Alert', m: 'VIP Ticket Low Stock', c: '#F59E0B' }
                                    ].map((n, i) => (
                                        <div key={i} className="flex gap-3 items-start p-3 bg-white/[0.02] rounded-xl border border-white/5">
                                            <div className="w-2 h-2 rounded-full mt-1.5 shadow-[0_0_8px_currentcolor]" style={{ color: n.c, backgroundColor: n.c }}></div>
                                            <div>
                                                <p className="text-[10px] font-black text-white uppercase tracking-wider leading-none mb-1">{n.t}</p>
                                                <p className="text-[10px] text-gray-500 leading-none">{n.m}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 📋 7. LATEST TRANSACTIONS (Polished Table) */}
                    <div className="bg-[#0C0F16] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                        <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
                            <h3 className="text-white font-bold tracking-tight">Latest Transactions</h3>
                            <button className="text-[10px] font-black text-[#e8ff47] uppercase tracking-widest hover:underline transition-all">View Analytics →</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#07090D] text-[10px] uppercase font-black text-gray-600 tracking-[0.2em]">
                                    <tr>
                                        <th className="px-8 py-5">Customer</th>
                                        <th className="px-8 py-5">Order ID</th>
                                        <th className="px-8 py-5">Status</th>
                                        <th className="px-8 py-5">Total</th>
                                        <th className="px-8 py-5 text-right">Action</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {latestTransactions.map((tx, idx) => (
                                        <tr key={idx} className="hover:bg-white/[0.02] transition-colors duration-200 group">
                                            <td className="px-8 py-5 flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-gray-800 flex items-center justify-center text-[10px] font-bold text-gray-400 group-hover:border-[#e8ff47]/50 border border-transparent transition-all">{tx.name.charAt(0)}</div>
                                                <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">{tx.name}</span>
                                            </td>
                                            <td className="px-8 py-5 text-xs font-mono text-gray-500">{tx.id}</td>
                                            <td className="px-8 py-5">
                                                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black border ${
                                                    tx.status === 'Paid' ? 'bg-green-500/5 text-green-500 border-green-500/10' : 
                                                    tx.status === 'Pending' ? 'bg-yellow-500/5 text-yellow-500 border-yellow-500/10' : 
                                                    'bg-red-500/5 text-red-500 border-red-500/10'
                                                }`}>
                                                    <span className={`w-1 h-1 rounded-full ${tx.status === 'Paid' ? 'bg-green-500 shadow-[0_0_8px_#22c55e]' : tx.status === 'Pending' ? 'bg-yellow-500' : 'bg-red-500'}`}></span>
                                                    {tx.status.toUpperCase()}
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-sm font-bold text-white">{tx.total}</td>
                                            <td className="px-8 py-5 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <button className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-[#e8ff47] transition-all">👁️</button>
                                                    <button className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-red-500 transition-all">🗑️</button>
                                                </div>
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