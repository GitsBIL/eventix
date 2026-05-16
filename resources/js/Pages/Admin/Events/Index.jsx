import React, { useState } from 'react';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import AdminSidebar from '@/Components/AdminSidebar';

export default function EventIndex({ events = [] }) {
    const { auth } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filterStatus, setFilterStatus] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const { data, setData, post, processing, reset, errors } = useForm({
        EventName: '',
        EventDate: '',
        Location: '',
        Description: '',
        BannerImage: null, 
        Status: 1,
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEditing) {
            router.post(route('admin.events.update', editId), {
                ...data,
                _method: 'PUT',
            }, { 
                onSuccess: () => {
                    setShowModal(false);
                    Swal.fire('Pembaruan Berhasil', 'Data acara telah sukses diperbarui di dalam sistem.', 'success');
                } 
            });
        } else {
            post(route('admin.events.store'), { 
                onSuccess: () => { 
                    setShowModal(false); 
                    reset(); 
                    Swal.fire('Penambahan Berhasil', 'Data acara baru telah direkam.', 'success');
                } 
            });
        }
    };

    const recentActivities = [
        { user: 'Nabil P.', action: 'updated event', target: 'Pestapora', time: '2m ago', color: 'text-blue-400', bg: 'bg-blue-500/10' },
        { user: 'System', action: 'auto-published', target: 'Joyland Festival', time: '1h ago', color: 'text-green-400', bg: 'bg-green-500/10' },
        { user: 'Sarah W.', action: 'requested refund', target: 'Order #EVTX-092', time: '3h ago', color: 'text-orange-400', bg: 'bg-orange-500/10' },
        { user: 'Nabil P.', action: 'changed status', target: 'Synchronize Fest', time: '5h ago', color: 'text-slate-400', bg: 'bg-slate-500/10' },
    ];

    const filteredEvents = events.filter(event => {
        if (filterStatus === 'Active') return event.Status === 1 || event.Status === '1';
        if (filterStatus === 'Draft') return event.Status === 0 || event.Status === '0';
        return true;
    });

    const topEvent = events.find(e => e.BannerImage) || events[0];

    return (
        <div className="flex h-screen bg-[#060816] text-slate-300 font-sans overflow-hidden selection:bg-[#e8ff47] selection:text-black">
            <Head title="Events Management - Eventix" />

            {/* PANGGIL KOMPONEN SIDEBAR DI SINI */}
            <AdminSidebar />

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                
                <header className="h-16 flex items-center justify-between px-8 border-b border-[#1e293b] bg-[#0f172a] z-20 shrink-0">
                    <div className="flex items-center gap-4">
                        <h1 className="text-base font-bold text-white">Events</h1>
                        <div className="hidden lg:flex items-center px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mr-2 animate-pulse"></div>
                            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Sync Active</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="relative hidden md:block">
                            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <input type="text" placeholder="Search events..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-[#060816] border border-[#1e293b] rounded-md pl-9 pr-12 py-1.5 text-xs text-white focus:outline-none focus:border-slate-500 transition-colors w-64 placeholder-slate-600" />
                            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                                <span className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[9px] text-slate-400 font-mono">⌘K</span>
                            </div>
                        </div>

                        <div className="relative">
                            <button 
                                onClick={() => setIsFilterOpen(!isFilterOpen)} 
                                className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-[#060816] border border-[#1e293b] rounded-md cursor-pointer hover:border-slate-600 transition-colors"
                            >
                                <span className="text-xs text-slate-400">Status: <span className="text-white font-medium">{filterStatus}</span></span>
                                <svg className={`w-3 h-3 text-slate-500 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                            
                            {isFilterOpen && (
                                <div className="absolute right-0 mt-1 w-36 bg-[#0f172a] border border-[#1e293b] rounded-lg shadow-xl z-50 overflow-hidden">
                                    <button onClick={() => {setFilterStatus('All'); setIsFilterOpen(false)}} className={`w-full text-left px-4 py-2 text-xs hover:bg-slate-800 transition-colors ${filterStatus === 'All' ? 'text-white font-bold bg-slate-800/50' : 'text-slate-400'}`}>All Events</button>
                                    <button onClick={() => {setFilterStatus('Active'); setIsFilterOpen(false)}} className={`w-full text-left px-4 py-2 text-xs hover:bg-slate-800 transition-colors ${filterStatus === 'Active' ? 'text-emerald-400 font-bold bg-slate-800/50' : 'text-slate-400'}`}>Active Only</button>
                                    <button onClick={() => {setFilterStatus('Draft'); setIsFilterOpen(false)}} className={`w-full text-left px-4 py-2 text-xs hover:bg-slate-800 transition-colors ${filterStatus === 'Draft' ? 'text-white font-bold bg-slate-800/50' : 'text-slate-400'}`}>Draft Only</button>
                                </div>
                            )}
                        </div>

                        <div className="w-px h-6 bg-[#1e293b] mx-1"></div>

                        <button onClick={() => { setIsEditing(false); reset(); setShowModal(true); }} className="ml-2 px-4 py-1.5 bg-white text-slate-900 hover:bg-slate-200 rounded-md text-xs font-bold transition-all flex items-center gap-2 shadow-sm">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                            New Event
                        </button>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 no-scrollbar scroll-smooth">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-[#0f172a] p-5 rounded-xl border border-[#1e293b] flex flex-col justify-between">
                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Total Events</p>
                            <div className="mt-2 flex items-baseline gap-2">
                                <h3 className="text-2xl font-black text-white">{events.length}</h3>
                                <span className="text-xs text-slate-500 font-medium">Published</span>
                            </div>
                        </div>
                        <div className="bg-[#0f172a] p-5 rounded-xl border border-[#1e293b] flex flex-col justify-between">
                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Tickets Sold</p>
                            <div className="mt-2 flex items-baseline gap-2">
                                <h3 className="text-2xl font-black text-white">1,482</h3>
                                <span className="text-xs text-emerald-400 font-bold flex items-center"><svg className="w-3 h-3 mr-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg> 12%</span>
                            </div>
                        </div>
                        <div className="bg-[#0f172a] p-5 rounded-xl border border-[#1e293b] flex flex-col justify-between">
                            <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest">Upcoming Soon</p>
                            <div className="mt-2 flex items-baseline gap-2">
                                <h3 className="text-2xl font-black text-white">2</h3>
                                <span className="text-xs text-amber-400 font-medium">Next 30 days</span>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-slate-800 to-[#0f172a] p-5 rounded-xl border border-[#1e293b] flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute right-0 bottom-0 opacity-10 translate-x-4 translate-y-4">
                                <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.64-2.25 1.64-1.74 0-2.1-.96-2.11-1.66H8.1c.04 1.52 1.04 2.73 2.8 3.12V19h2.33v-1.64c1.51-.31 2.8-1.22 2.8-2.92 0-2.18-1.79-2.7-3.72-3.3z"/></svg>
                            </div>
                            <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest relative z-10">Est. Revenue</p>
                            <div className="mt-2 relative z-10">
                                <h3 className="text-2xl font-black text-white">Rp 125M</h3>
                                <p className="text-[10px] text-slate-400 mt-1">Pending settlement: Rp 12M</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
                        
                        <div className="xl:col-span-3 bg-[#0f172a] rounded-xl border border-[#1e293b] shadow-sm overflow-hidden flex flex-col">
                            <div className="p-5 border-b border-[#1e293b] flex justify-between items-center bg-[#0f172a]">
                                <h2 className="text-sm font-bold text-white">All Events Directory</h2>
                                <span className="text-[10px] text-slate-500 font-medium">
                                    {filterStatus !== 'All' ? `Showing ${filterStatus} events` : 'Showing all events'}
                                </span>
                            </div>
                            
                            <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-[#060816]/50">
                                        <tr className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider border-b border-[#1e293b]">
                                            <th className="px-5 py-3">Event Info</th>
                                            <th className="px-5 py-3">Organizer</th>
                                            <th className="px-5 py-3">Visibility</th>
                                            <th className="px-5 py-3">Sales Target</th>
                                            <th className="px-5 py-3 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#1e293b]">
                                        {filteredEvents.map((event, index) => {
                                            const formattedDate = event.EventDate ? new Date(event.EventDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'TBA';
                                            const isSoldOut = index === 1;
                                            const progress = isSoldOut ? 100 : Math.floor(Math.random() * 60) + 20;

                                            return (
                                                <tr key={event.ID} className="hover:bg-slate-800/30 transition-colors duration-200 group">
                                                    <td className="px-5 py-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-14 rounded bg-[#060816] shrink-0 border border-slate-700 overflow-hidden shadow-sm">
                                                                {event.BannerImage ? (
                                                                    <img src={`/storage/${event.BannerImage}`} className="w-full h-full object-cover" alt="Poster" />
                                                                ) : (
                                                                    <div className="w-full h-full flex items-center justify-center text-slate-600 bg-slate-800">
                                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="min-w-0">
                                                                <p className="font-bold text-white text-sm truncate">{event.EventName}</p>
                                                                <p className="text-[10px] text-slate-500 mt-1 truncate">{formattedDate} • {event.Location || 'TBA'}</p>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        <p className="text-xs text-slate-300 font-medium">PT Eventix Global</p>
                                                        <p className="text-[10px] text-slate-500">Corporate</p>
                                                    </td>
                                                    <td className="px-5 py-4">
                                                        {isSoldOut ? (
                                                            <span className="px-2 py-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[9px] font-bold rounded flex inline-flex items-center uppercase tracking-wider">Sold Out</span>
                                                        ) : event.Status === 1 || event.Status === '1' ? (
                                                            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold rounded flex inline-flex items-center uppercase tracking-wider">Active</span>
                                                        ) : (
                                                            <span className="px-2 py-1 bg-slate-800 text-slate-400 border border-slate-700 text-[9px] font-bold rounded flex inline-flex items-center uppercase tracking-wider">Draft</span>
                                                        )}
                                                    </td>
                                                    <td className="px-5 py-4 w-48">
                                                        <div className="flex justify-between items-end mb-1.5">
                                                            <span className="text-[10px] text-slate-400 font-medium">{progress}% Sold</span>
                                                            <span className="text-[10px] text-slate-500 font-mono">1.2k / 1.5k</span>
                                                        </div>
                                                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                                            <div className={`h-full rounded-full ${isSoldOut ? 'bg-amber-400' : 'bg-blue-500'}`} style={{ width: `${progress}%` }}></div>
                                                        </div>
                                                    </td>
                                                    <td className="px-5 py-4 text-right">
                                                        <div className="flex gap-2 justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                            <button onClick={() => { setIsEditing(true); setEditId(event.ID); setData({ EventName: event.EventName, EventDate: event.EventDate ? event.EventDate.split(' ')[0] : '', Location: event.Location || '', Description: event.Description || '', Status: event.Status, BannerImage: null }); setShowModal(true); }} className="p-1.5 text-slate-400 hover:text-white bg-slate-800 border border-slate-700 hover:border-slate-500 rounded transition-all shadow-sm" title="Edit Event">
                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                                            </button>
                                                            <button onClick={() => { Swal.fire({ title: 'System Warning', text: 'Delete this event? Action cannot be undone.', icon: 'warning', showCancelButton: true, confirmButtonColor: '#e11d48', cancelButtonColor: '#334155', confirmButtonText: 'Yes, delete', cancelButtonText: 'Cancel', background: '#0f172a', color: '#fff' }).then((result) => { if (result.isConfirmed) router.delete(route('admin.events.destroy', event.ID)) }); }} className="p-1.5 text-slate-400 hover:text-rose-400 bg-slate-800 border border-slate-700 hover:border-rose-500/50 hover:bg-rose-500/10 rounded transition-all shadow-sm" title="Delete Event">
                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                        {filteredEvents.length === 0 && (
                                            <tr>
                                                <td colSpan="5" className="px-5 py-12 text-center">
                                                    <div className="w-12 h-12 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-3">
                                                        <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
                                                    </div>
                                                    <p className="text-sm font-semibold text-slate-400">No events found</p>
                                                    <p className="text-xs text-slate-500 mt-1">Try changing the status filter or create a new event.</p>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div className="xl:col-span-1 space-y-6">
                            <div className="bg-[#0f172a] rounded-xl border border-[#1e293b] p-5">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Top Event 🔥</h3>
                                <div className="relative rounded-lg overflow-hidden aspect-[4/3] bg-[#060816] border border-slate-700 shadow-inner">
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#060816] via-[#060816]/40 to-transparent z-10"></div>
                                    {topEvent ? (
                                        topEvent.BannerImage ? (
                                            <img src={`/storage/${topEvent.BannerImage}`} className="w-full h-full object-cover opacity-80" alt={topEvent.EventName} />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center"><span className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">No Cover Image</span></div>
                                        )
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center"><span className="text-slate-600 text-[10px] font-bold uppercase tracking-widest">No Events Yet</span></div>
                                    )}

                                    {topEvent && (
                                        <div className="absolute bottom-3 left-3 z-20 pr-3">
                                            <p className="text-sm font-bold text-white leading-tight line-clamp-2">{topEvent.EventName}</p>
                                            <p className="text-[10px] text-slate-300 mt-1.5 flex items-center gap-1.5 font-medium">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_5px_#34d399]"></span> System Choice
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="bg-[#0f172a] rounded-xl border border-[#1e293b] flex flex-col h-[300px]">
                                <div className="p-4 border-b border-[#1e293b]">
                                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recent Activity</h3>
                                </div>
                                <div className="p-4 flex-1 overflow-y-auto no-scrollbar">
                                    <div className="relative before:absolute before:inset-y-0 before:left-2 before:w-px before:bg-[#1e293b]">
                                        {recentActivities.map((act, i) => (
                                            <div key={i} className="relative flex gap-3 mb-5 last:mb-0">
                                                <div className={`w-4 h-4 rounded-full ${act.bg} border border-[#1e293b] flex shrink-0 items-center justify-center relative z-10 ring-4 ring-[#0f172a]`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full bg-current ${act.color}`}></div>
                                                </div>
                                                <div className="flex-1 min-w-0 -mt-0.5">
                                                    <p className="text-[11px] text-slate-300 leading-snug"><span className="font-semibold text-white">{act.user}</span> {act.action} <span className="font-medium text-white">{act.target}</span></p>
                                                    <p className="text-[9px] text-slate-500 mt-1">{act.time}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="p-3 border-t border-[#1e293b] text-center">
                                    <button className="text-[10px] font-bold text-slate-400 hover:text-white transition-colors">View All Logs</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060816]/90 backdrop-blur-sm overflow-y-auto">
                        <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl w-full max-w-xl my-auto shadow-2xl">
                            <div className="p-5 border-b border-[#1e293b] flex justify-between items-center bg-slate-800/20 rounded-t-xl">
                                <h2 className="text-sm font-bold text-white">{isEditing ? 'Update Event Details' : 'Create New Event'}</h2>
                                <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-white transition-colors p-1 hover:bg-slate-800 rounded"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round"></path></svg></button>
                            </div>
                            
                            <form onSubmit={submit} className="p-6 grid grid-cols-2 gap-5">
                                <div className="col-span-2">
                                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Event Name</label>
                                    <input type="text" value={data.EventName} onChange={e => setData('EventName', e.target.value)} className="w-full bg-[#060816] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-white focus:border-slate-400 outline-none transition-all placeholder-slate-600" placeholder="e.g. Pestapora 2026" required />
                                </div>
                                
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Event Date</label>
                                    <input type="date" value={data.EventDate} onChange={e => setData('EventDate', e.target.value)} className="w-full bg-[#060816] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-white focus:border-slate-400 outline-none transition-all [color-scheme:dark]" />
                                </div>
                                
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Location</label>
                                    <input type="text" value={data.Location} onChange={e => setData('Location', e.target.value)} className="w-full bg-[#060816] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-white focus:border-slate-400 outline-none transition-all placeholder-slate-600" placeholder="Venue Name" />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Upload Poster (Aspect 4:5)</label>
                                    <div className="relative">
                                        <input type="file" onChange={e => setData('BannerImage', e.target.files[0])} className="w-full bg-[#060816] border border-dashed border-[#1e293b] rounded-lg px-3 py-4 text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-slate-800 file:text-white hover:border-slate-500 transition-all cursor-pointer" accept="image/*" />
                                    </div>
                                    {errors.BannerImage && <p className="text-red-400 text-[10px] mt-1.5 font-medium">{errors.BannerImage}</p>}
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Description</label>
                                    <textarea value={data.Description} onChange={e => setData('Description', e.target.value)} rows="3" className="w-full bg-[#060816] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-white focus:border-slate-400 outline-none transition-all resize-none placeholder-slate-600" placeholder="Write event details here..."></textarea>
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