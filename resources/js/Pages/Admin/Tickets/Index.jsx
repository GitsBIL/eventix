import React, { useState } from 'react';
import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function TicketIndex({ tickets = [], events = [], stats }) {
    const { auth } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [isFixedEvent, setIsFixedEvent] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    
    // STATE BARU BUAT FILTER DROPDOWN
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState('All');

    const { data, setData, post, put, processing, reset, errors } = useForm({
        EventID: '',
        CategoryName: '',
        Price: '',
        Quota: '',
        Status: 1,
    });

    const openModalNew = (eventId = null) => {
        setIsEditing(false);
        reset();
        if (eventId) {
            setData('EventID', eventId);
            setIsFixedEvent(true);
        } else {
            setData('EventID', '');
            setIsFixedEvent(false);
        }
        setShowModal(true);
    };

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            put(route('admin.tickets.update', editId), { onSuccess: () => { setShowModal(false); Swal.fire('Updated', 'Ticket category updated.', 'success'); } });
        } else {
            post(route('admin.tickets.store'), { onSuccess: () => { setShowModal(false); reset(); Swal.fire('Created', 'New ticket category added.', 'success'); } });
        }
    };

    const getCategoryBadge = (name) => {
        const n = name.toLowerCase();
        if (n.includes('vip')) return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
        if (n.includes('festival')) return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
        if (n.includes('tribune')) return 'text-purple-400 bg-purple-500/10 border-purple-500/20';
        if (n.includes('early')) return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
        return 'text-slate-300 bg-slate-800 border-slate-700';
    };

    const recentActivities = [
        { title: 'New VIP ticket created', target: 'Pestapora', time: '10 mins ago', icon: '🎫' },
        { title: '2 refunds requested', target: 'Order #992', time: '1 hour ago', icon: '💸' },
        { title: 'QR scanned successfully', target: 'Gate 3', time: '2 hours ago', icon: '📱' },
    ];

    return (
        <div className="flex h-screen bg-[#060816] text-slate-300 font-sans overflow-hidden selection:bg-[#e8ff47] selection:text-black">
            <Head title="Tickets Management - Eventix" />

            <aside className="w-64 bg-[#0f172a] border-r border-[#1e293b] flex flex-col justify-between h-full hidden md:flex shrink-0 shadow-2xl z-20">
                <div className="overflow-y-auto overflow-x-hidden no-scrollbar">
                    <div className="h-16 flex items-center px-6 border-b border-[#1e293b] sticky top-0 bg-[#0f172a]/90 backdrop-blur-md z-10">
                        <span className="text-lg font-black text-white uppercase tracking-tighter">EVEN<span className="text-[#e8ff47]">TIX</span></span>
                    </div>
                    
                    <div className="px-4 py-6 space-y-6">
                        <div>
                            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Overview</p>
                            <ul className="space-y-0.5">
                                <li><Link href={route('admin.dashboard')} className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg><span className="text-sm font-medium">Dashboard</span></Link></li>
                                <li><Link href="#" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg><span className="text-sm font-medium">Analytics</span></Link></li>
                            </ul>
                        </div>
                        <div>
                            <p className="px-3 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2">Event Management</p>
                            <ul className="space-y-0.5">
                                <li><Link href={route('admin.events.index')} className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><span className="text-sm font-medium">Events</span></Link></li>
                                <li>
                                    <Link href={route('admin.tickets.index')} className="flex items-center gap-3 px-3 py-2 bg-slate-800/80 text-white rounded-lg border border-slate-700/50 transition-all shadow-sm">
                                        <svg className="w-4 h-4 text-[#e8ff47]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg>
                                        <span className="text-sm font-semibold">Tickets</span>
                                    </Link>
                                </li>
                                <li><Link href="#" className="flex items-center gap-3 px-3 py-2 text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg><span className="text-sm font-medium">Transactions</span></Link></li>
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
                    </div>
                </div>
            </aside>

            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                
                <header className="h-16 flex items-center justify-between px-8 border-b border-[#1e293b] bg-[#0f172a] z-20 shrink-0">
                    <div className="flex items-center gap-4">
                        <h1 className="text-base font-bold text-white">Tickets</h1>
                        <div className="hidden lg:flex items-center px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">System Synced</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative hidden md:block">
                            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <input type="text" placeholder="Search ticket categories..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-[#060816] border border-[#1e293b] rounded-md pl-9 pr-12 py-1.5 text-xs text-white focus:outline-none focus:border-slate-500 transition-colors w-64 placeholder-slate-600" />
                        </div>

                        {/* INTERACTIVE DROPDOWN FILTER DI SINI */}
                        <div className="relative">
                            <button 
                                onClick={() => setIsFilterOpen(!isFilterOpen)} 
                                className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#060816] border border-[#1e293b] rounded-md cursor-pointer hover:border-slate-600 transition-colors"
                            >
                                <span className="text-xs text-slate-400">Filter: <span className="text-white font-medium">{filterStatus}</span></span>
                                <svg className={`w-3 h-3 text-slate-500 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            
                            {isFilterOpen && (
                                <div className="absolute right-0 mt-1 w-36 bg-[#0f172a] border border-[#1e293b] rounded-lg shadow-xl z-50 overflow-hidden">
                                    <button onClick={() => {setFilterStatus('All'); setIsFilterOpen(false)}} className={`w-full text-left px-4 py-2 text-xs hover:bg-slate-800 transition-colors ${filterStatus === 'All' ? 'text-white font-bold bg-slate-800/50' : 'text-slate-400'}`}>All Status</button>
                                    <button onClick={() => {setFilterStatus('Active'); setIsFilterOpen(false)}} className={`w-full text-left px-4 py-2 text-xs hover:bg-slate-800 transition-colors ${filterStatus === 'Active' ? 'text-emerald-400 font-bold bg-slate-800/50' : 'text-slate-400'}`}>Active (Live)</button>
                                    <button onClick={() => {setFilterStatus('Draft'); setIsFilterOpen(false)}} className={`w-full text-left px-4 py-2 text-xs hover:bg-slate-800 transition-colors ${filterStatus === 'Draft' ? 'text-slate-300 font-bold bg-slate-800/50' : 'text-slate-400'}`}>Draft (Hidden)</button>
                                </div>
                            )}
                        </div>

                        <div className="w-px h-6 bg-[#1e293b] mx-1"></div>

                        <button onClick={() => openModalNew(null)} className="ml-2 px-4 py-1.5 bg-white text-slate-900 hover:bg-slate-200 rounded-md text-xs font-bold transition-all flex items-center gap-2 shadow-sm">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                            New Category
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 no-scrollbar scroll-smooth">
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-[#0f172a] p-5 rounded-xl border border-[#1e293b] flex flex-col justify-between">
                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Total Categories</p>
                            <h3 className="text-2xl font-black text-white mt-2">{stats?.totalCategories || 0}</h3>
                        </div>
                        <div className="bg-[#0f172a] p-5 rounded-xl border border-[#1e293b] flex flex-col justify-between">
                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Tickets Sold Today</p>
                            <div className="mt-2 flex items-baseline gap-2">
                                <h3 className="text-2xl font-black text-white">{stats?.ticketsSoldToday || 0}</h3>
                                <span className="text-xs text-emerald-400 font-bold">Live</span>
                            </div>
                        </div>
                        <div className="bg-[#0f172a] p-5 rounded-xl border border-[#1e293b] flex flex-col justify-between">
                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Pending Verification</p>
                            <div className="mt-2 flex items-baseline gap-2">
                                <h3 className="text-2xl font-black text-white">{stats?.pendingTransactions || 0}</h3>
                                <span className="text-xs text-amber-400 font-medium">Action needed</span>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-slate-800 to-[#0f172a] p-5 rounded-xl border border-[#1e293b] flex flex-col justify-between">
                            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">Revenue Impact</p>
                            <h3 className="text-2xl font-black text-white mt-2">{stats?.revenue || 'Rp 0'}</h3>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                        
                        <div className="xl:col-span-3 space-y-8">
                            {events.length > 0 ? events.map((event) => {
                                // LOGIKA FILTER DITERAPKAN DI SINI
                                const eventTickets = tickets.filter(t => {
                                    if (t.EventID !== event.ID) return false;
                                    if (filterStatus === 'Active') return t.Status === 1 || t.Status === '1';
                                    if (filterStatus === 'Draft') return t.Status === 0 || t.Status === '0';
                                    return true;
                                });

                                const formattedDate = event.EventDate ? new Date(event.EventDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'TBA';
                                const totalSold = eventTickets.reduce((acc, t) => acc + (t.Sold || 0), 0);
                                
                                return (
                                    <div key={event.ID} className="bg-[#0f172a] rounded-xl border border-[#1e293b] overflow-hidden shadow-sm flex flex-col">
                                        
                                        <div className="p-5 border-b border-[#1e293b] flex justify-between items-start bg-[#0a0d14]">
                                            <div className="flex gap-4">
                                                <div className="w-14 h-20 rounded-md bg-slate-800 shrink-0 border border-slate-700 overflow-hidden shadow-sm">
                                                    {event.BannerImage ? (
                                                        <img src={`/storage/${event.BannerImage}`} className="w-full h-full object-cover" alt="Poster" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-slate-600 bg-[#060816]">
                                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h2 className="text-base font-bold text-white mb-1">{event.EventName}</h2>
                                                    <p className="text-xs text-slate-400 font-medium">
                                                        {event.Location || 'TBA'} • {formattedDate} • <span className="text-white">{eventTickets.length} Categories</span> • <span className="text-emerald-400">{totalSold} Tickets Sold</span>
                                                    </p>
                                                    <div className="mt-2.5 flex items-center gap-2">
                                                        {event.Status === 1 || event.Status === '1' 
                                                            ? <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold rounded uppercase tracking-wider">Live Event</span>
                                                            : <span className="px-2 py-0.5 bg-slate-800 text-slate-400 border border-slate-700 text-[9px] font-bold rounded uppercase tracking-wider">Draft</span>
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <button onClick={() => openModalNew(event.ID)} className="px-3 py-1.5 bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 rounded text-[10px] font-bold uppercase tracking-widest transition-all">
                                                + Add Category
                                            </button>
                                        </div>

                                        <div className="overflow-x-auto">
                                            {eventTickets.length > 0 ? (
                                                <table className="w-full text-left border-collapse">
                                                    <thead className="bg-[#0f172a]">
                                                        <tr className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider border-b border-[#1e293b]">
                                                            <th className="px-6 py-3">Category Identity</th>
                                                            <th className="px-6 py-3">Price</th>
                                                            <th className="px-6 py-3 w-48">Sales Progress</th>
                                                            <th className="px-6 py-3">Status</th>
                                                            <th className="px-6 py-3 text-right">Actions</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="divide-y divide-[#1e293b]">
                                                        {eventTickets.map((ticket) => {
                                                            const sold = ticket.Sold || 0;
                                                            const progress = Math.min(100, Math.round((sold / Math.max(1, ticket.Quota)) * 100));
                                                            const isSoldOut = progress >= 100;

                                                            return (
                                                                <tr key={ticket.ID} className="hover:bg-slate-800/30 transition-colors duration-200 group">
                                                                    <td className="px-6 py-4">
                                                                        <span className={`px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider rounded border ${getCategoryBadge(ticket.CategoryName)}`}>
                                                                            {ticket.CategoryName}
                                                                        </span>
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        <p className={`font-semibold text-sm ${isSoldOut ? 'text-slate-500 line-through' : 'text-white'}`}>
                                                                            Rp {Number(ticket.Price).toLocaleString('id-ID')}
                                                                        </p>
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        <div className="flex justify-between items-end mb-1.5">
                                                                            <span className="text-[10px] text-slate-400 font-medium">{sold} / {ticket.Quota} Sold</span>
                                                                            <span className="text-[10px] text-slate-500 font-mono">{progress}%</span>
                                                                        </div>
                                                                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                                            <div className={`h-full rounded-full ${isSoldOut ? 'bg-rose-500' : 'bg-emerald-400'}`} style={{ width: `${progress}%` }}></div>
                                                                        </div>
                                                                    </td>
                                                                    <td className="px-6 py-4">
                                                                        {isSoldOut ? (
                                                                            <span className="text-rose-400 text-[10px] font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span> Sold Out</span>
                                                                        ) : ticket.Status === 1 || ticket.Status === '1' ? (
                                                                            <span className="text-emerald-400 text-[10px] font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active</span>
                                                                        ) : (
                                                                            <span className="text-slate-500 text-[10px] font-bold flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-slate-500"></span> Hidden</span>
                                                                        )}
                                                                    </td>
                                                                    <td className="px-6 py-4 text-right">
                                                                        <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                                            <button onClick={() => { setIsEditing(true); setEditId(ticket.ID); setData({ EventID: ticket.EventID, CategoryName: ticket.CategoryName, Price: ticket.Price, Quota: ticket.Quota, Status: ticket.Status }); setIsFixedEvent(false); setShowModal(true); }} className="p-1.5 text-slate-400 hover:text-white bg-slate-800 border border-slate-700 hover:border-slate-500 rounded transition-all shadow-sm" title="Edit Category">
                                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                                                            </button>
                                                                            <button onClick={() => { Swal.fire({ title: 'Delete Ticket?', text: 'Cannot be undone.', icon: 'warning', showCancelButton: true, confirmButtonColor: '#e11d48', cancelButtonColor: '#334155', background: '#0f172a', color: '#fff' }).then((r) => { if(r.isConfirmed) router.delete(route('admin.tickets.destroy', ticket.ID)) }); }} className="p-1.5 text-slate-400 hover:text-rose-400 bg-slate-800 border border-slate-700 hover:border-rose-500/50 hover:bg-rose-500/10 rounded transition-all shadow-sm" title="Delete">
                                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                                            </button>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })}
                                                    </tbody>
                                                </table>
                                            ) : (
                                                <div className="px-6 py-12 flex flex-col items-center justify-center bg-[#060816]/50">
                                                    <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-3 border border-slate-700">
                                                        <span className="text-xl">🎫</span>
                                                    </div>
                                                    <p className="text-sm font-semibold text-slate-300">No ticket categories yet</p>
                                                    <p className="text-xs text-slate-500 mt-1 max-w-[250px] text-center">Create your first ticket category to start selling tickets for this event.</p>
                                                    <button onClick={() => openModalNew(event.ID)} className="mt-4 px-4 py-2 bg-white text-slate-900 rounded-md text-xs font-bold hover:bg-slate-200 transition-colors">
                                                        + Add Ticket Category
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            }) : (
                                <div className="p-12 text-center bg-[#0f172a] rounded-xl border border-[#1e293b]">
                                    <p className="text-slate-500 font-bold uppercase tracking-widest">No Events Found</p>
                                </div>
                            )}
                        </div>

                        <div className="xl:col-span-1">
                            <div className="bg-[#0f172a] rounded-xl border border-[#1e293b] flex flex-col sticky top-8">
                                <div className="p-4 border-b border-[#1e293b] flex justify-between items-center">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">System Logs</h3>
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                                </div>
                                <div className="p-5 flex-1">
                                    <div className="relative before:absolute before:inset-y-0 before:left-[11px] before:w-px before:bg-[#1e293b]">
                                        {recentActivities.map((act, i) => (
                                            <div key={i} className="relative flex gap-4 mb-6 last:mb-0">
                                                <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex shrink-0 items-center justify-center relative z-10 text-[10px]">
                                                    {act.icon}
                                                </div>
                                                <div className="flex-1 min-w-0 pt-0.5">
                                                    <p className="text-[11px] font-semibold text-slate-300 leading-snug">{act.title}</p>
                                                    <p className="text-[10px] text-slate-500 mt-1">{act.target} • {act.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060816]/90 backdrop-blur-sm overflow-y-auto">
                        <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl w-full max-w-xl my-auto shadow-2xl">
                            <div className="p-5 border-b border-[#1e293b] flex justify-between items-center bg-slate-800/20 rounded-t-xl">
                                <h2 className="text-sm font-bold text-white">{isEditing ? 'Update Ticket Category' : 'Create New Ticket'}</h2>
                                <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-white transition-colors p-1 hover:bg-slate-800 rounded"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round"></path></svg></button>
                            </div>
                            
                            <form onSubmit={submit} className="p-6 grid grid-cols-2 gap-5">
                                <div className="col-span-2">
                                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Target Event</label>
                                    {isFixedEvent ? (
                                        <input type="text" value={events.find(ev => ev.ID === data.EventID)?.EventName || ''} disabled className="w-full bg-[#060816]/50 border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-slate-500 cursor-not-allowed outline-none" />
                                    ) : (
                                        <select value={data.EventID} onChange={e => setData('EventID', e.target.value)} className="w-full bg-[#060816] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-white focus:border-slate-400 outline-none transition-all cursor-pointer appearance-none" required>
                                            <option value="">-- Choose Event --</option>
                                            {events.map((ev) => (<option key={ev.ID} value={ev.ID}>{ev.EventName}</option>))}
                                        </select>
                                    )}
                                </div>
                                
                                <div className="col-span-2">
                                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Category Name</label>
                                    <select value={data.CategoryName} onChange={e => setData('CategoryName', e.target.value)} className="w-full bg-[#060816] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-white focus:border-slate-400 outline-none transition-all appearance-none cursor-pointer" required>
                                        <option value="">-- Select Category --</option>
                                        <option value="VVIP Exclusive">VVIP Exclusive</option>
                                        <option value="VIP Early Access">VIP Early Access</option>
                                        <option value="Festival Regular">Festival Regular</option>
                                        <option value="Tribune A">Tribune A</option>
                                        <option value="Presale Ticket">Presale Ticket</option>
                                    </select>
                                </div>

                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Price (Rp)</label>
                                    <input type="number" value={data.Price} onChange={e => setData('Price', e.target.value)} className="w-full bg-[#060816] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-white focus:border-slate-400 outline-none transition-all" placeholder="500000" required />
                                </div>
                                
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Quota Allocation</label>
                                    <input type="number" value={data.Quota} onChange={e => setData('Quota', e.target.value)} className="w-full bg-[#060816] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-white focus:border-slate-400 outline-none transition-all" placeholder="100" required />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Visibility Status</label>
                                    <select value={data.Status} onChange={e => setData('Status', e.target.value)} className="w-full bg-[#060816] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-white focus:border-slate-400 outline-none transition-all appearance-none cursor-pointer" required>
                                        <option value="1">Active (Available for purchase)</option>
                                        <option value="0">Hidden (Draft / Upcoming)</option>
                                    </select>
                                </div>

                                <div className="col-span-2 pt-4 flex justify-end gap-3 border-t border-[#1e293b] mt-2">
                                    <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-all">Cancel</button>
                                    <button type="submit" disabled={processing} className="px-6 py-2 bg-white text-slate-900 hover:bg-slate-200 rounded-lg text-xs font-bold transition-all shadow-sm disabled:opacity-50">
                                        {processing ? 'Saving...' : 'Save Configuration'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}