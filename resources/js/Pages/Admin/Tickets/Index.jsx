import React, { useState } from 'react';
import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function TicketIndex({ tickets = [], events = [] }) {
    const { auth } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [isFixedEvent, setIsFixedEvent] = useState(false);

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
            put(route('admin.tickets.update', editId), { 
                onSuccess: () => {
                    setShowModal(false);
                    Swal.fire('Pembaruan Berhasil', 'Data kategori tiket telah sukses diperbarui di dalam sistem.', 'success');
                } 
            });
        } else {
            post(route('admin.tickets.store'), { 
                onSuccess: () => { 
                    setShowModal(false); 
                    reset(); 
                    Swal.fire('Penambahan Berhasil', 'Data kategori tiket baru telah direkam.', 'success');
                } 
            });
        }
    };

    return (
        <div className="flex h-screen bg-[#090B10] text-gray-300 font-sans overflow-hidden selection:bg-[#e8ff47] selection:text-black">
            <Head title="Tickets Management - Eventix" />

            {/* SIDEBAR CORPORATE SINKRON */}
            <aside className="w-64 bg-[#0F131C] border-r border-white/5 flex flex-col justify-between h-full hidden md:flex shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.5)] z-20">
                <div className="overflow-y-auto overflow-x-hidden no-scrollbar">
                    <div className="h-20 flex items-center px-8 border-b border-white/5 sticky top-0 bg-[#0F131C]/90 backdrop-blur-md z-10">
                        <span className="text-xl font-black text-white uppercase tracking-tighter">EVEN<span className="text-[#e8ff47] drop-shadow-[0_0_8px_rgba(232,255,71,0.5)]">TIX</span></span>
                    </div>
                    
                    <div className="px-4 py-6 space-y-8">
                        <div>
                            <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Overview</p>
                            <ul className="space-y-1">
                                <li>
                                    <Link href={route('admin.dashboard')} className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                                        <span className="text-sm font-medium">Dashboard</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Event Management</p>
                            <ul className="space-y-1">
                                <li><Link href={route('admin.events.index')} className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg><span className="text-sm font-medium">Events</span></Link></li>
                                <li>
                                    <Link href={route('admin.tickets.index')} className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-[#e8ff47]/10 to-transparent text-white rounded-xl border-l-2 border-[#e8ff47] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all">
                                        <svg className="w-4 h-4 text-[#e8ff47]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg>
                                        <span className="text-sm font-bold">Tickets</span>
                                    </Link>
                                </li>
                                <li><Link href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg><span className="text-sm font-medium">Transactions</span></Link></li>
                            </ul>
                        </div>

                        <div>
                            <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">System & Users</p>
                            <ul className="space-y-1">
                                <li><Link href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg><span className="text-sm font-medium">Customers</span></Link></li>
                                <li><Link href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg><span className="text-sm font-medium">Settings</span></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* PROFILE ADMIN */}
                <div className="p-4 border-t border-white/5 bg-[#0A0D14]/80 backdrop-blur-xl">
                    <Link href={route('logout')} method="post" as="button" className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#e8ff47]/30 hover:bg-[#e8ff47]/5 transition-all group relative overflow-hidden">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-[#e8ff47]/10 flex items-center justify-center text-[#e8ff47] font-bold border border-[#e8ff47]/30 text-xs shrink-0 shadow-[0_0_15px_rgba(232,255,71,0.2)]">
                                {auth.user.FullName.charAt(0)}
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-[#0F131C] rounded-full animate-pulse"></div>
                        </div>
                        <div className="text-left truncate flex-1">
                            <p className="text-sm font-bold text-white truncate group-hover:text-[#e8ff47] transition-colors">{auth.user.FullName}</p>
                            <p className="text-[10px] text-gray-500 uppercase tracking-tighter">System {auth.user.Role}</p>
                        </div>
                        <svg className="w-4 h-4 text-gray-500 group-hover:text-red-500 transition-colors relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    </Link>
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                <header className="h-20 flex items-center justify-between px-8 border-b border-white/5 bg-[#0F131C]/80 backdrop-blur-xl z-20 shrink-0">
                    <h1 className="text-xl font-bold text-white uppercase tracking-widest">Tickets Management</h1>
                    <button onClick={() => openModalNew(null)} className="px-5 py-2.5 bg-[#e8ff47] hover:bg-[#d4ed36] text-black rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(232,255,71,0.2)] hover:shadow-[0_0_25px_rgba(232,255,71,0.4)] hover:-translate-y-0.5">
                        + New Global Ticket
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto p-8 text-xs no-scrollbar">
                    {events.length > 0 ? events.map((event) => {
                        const eventTickets = tickets.filter(t => t.EventID === event.ID);
                        
                        return (
                            <div key={event.ID} className="bg-[#0F131C] rounded-2xl border border-white/5 overflow-hidden shadow-2xl mb-8">
                                <div className="p-5 border-b border-white/5 flex justify-between items-center bg-[#0A0D14]">
                                    <div className="flex items-center gap-4">
                                        <h2 className="text-sm font-black text-white uppercase tracking-widest">{event.EventName}</h2>
                                        {event.Status === 1 || event.Status === '1' ? (
                                            <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[9px] font-black rounded border border-green-500/20 uppercase">Live Event</span>
                                        ) : (
                                            <span className="px-2 py-0.5 bg-gray-500/10 text-gray-400 text-[9px] font-black rounded border border-gray-500/20 uppercase">Draft Event</span>
                                        )}
                                    </div>
                                    <button onClick={() => openModalNew(event.ID)} className="text-[10px] text-[#e8ff47] hover:text-white transition-colors flex items-center gap-1 font-bold uppercase tracking-widest">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                        Add Ticket
                                    </button>
                                </div>

                                <table className="w-full text-left">
                                    <thead className="bg-[#0F131C] text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-white/5">
                                        <tr>
                                            <th className="px-6 py-4">Category Name</th>
                                            <th className="px-6 py-4">Price</th>
                                            <th className="px-6 py-4 text-center">Quota</th>
                                            <th className="px-6 py-4">Status</th>
                                            <th className="px-6 py-4 text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {eventTickets.length > 0 ? eventTickets.map((ticket) => (
                                            <tr key={ticket.ID} className="hover:bg-white/[0.02] transition-colors group">
                                                <td className="px-6 py-4">
                                                    <span className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-gray-300 font-bold tracking-wider uppercase text-[10px]">{ticket.CategoryName}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <p className="text-[#e8ff47] font-black text-sm">Rp {Number(ticket.Price).toLocaleString('id-ID')}</p>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <p className="text-white font-bold">{ticket.Quota} <span className="text-gray-500 font-normal text-[10px]">Pax</span></p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {/* KONSISTENSI WARNA BADGE STATUS */}
                                                    {ticket.Status === 1 || ticket.Status === '1' ? (
                                                        <span className="px-2 py-1 bg-green-500/10 text-green-400 text-[9px] font-black rounded border border-green-500/20 uppercase">Active</span>
                                                    ) : (
                                                        <span className="px-2 py-1 bg-gray-500/10 text-gray-400 text-[9px] font-black rounded border border-gray-500/20 uppercase">Draft</span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-right flex gap-2 justify-end">
                                                    <button onClick={() => { 
                                                        setIsEditing(true); 
                                                        setEditId(ticket.ID); 
                                                        setData({
                                                            EventID: ticket.EventID,
                                                            CategoryName: ticket.CategoryName,
                                                            Price: ticket.Price,
                                                            Quota: ticket.Quota,
                                                            Status: ticket.Status,
                                                        });
                                                        setIsFixedEvent(false); 
                                                        setShowModal(true); 
                                                    }} className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></button>
                                                    
                                                    <button onClick={() => { 
                                                        Swal.fire({ 
                                                            title: 'Konfirmasi Penghapusan', 
                                                            text: 'Hapus kategori tiket ini? Tindakan ini tidak dapat dibatalkan.', 
                                                            icon: 'warning', 
                                                            showCancelButton: true, 
                                                            confirmButtonColor: '#d33', 
                                                            cancelButtonColor: '#4B5563',
                                                            confirmButtonText: 'Ya, Hapus Data',
                                                            cancelButtonText: 'Batal'
                                                        }).then((result) => { 
                                                            if (result.isConfirmed) router.delete(route('admin.tickets.destroy', ticket.ID)) 
                                                        });
                                                    }} className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan="5" className="px-6 py-8 text-center text-gray-500 text-[10px] uppercase font-bold tracking-widest">
                                                    Belum ada kategori tiket untuk acara ini
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        );
                    }) : (
                        <div className="p-12 text-center bg-[#0F131C] rounded-2xl border border-white/5">
                            <p className="text-gray-500 font-bold uppercase tracking-widest">Sistem belum mendeteksi adanya Event.</p>
                            <p className="text-gray-600 mt-2">Buat Event terlebih dahulu di menu Events Management.</p>
                        </div>
                    )}
                </div>

                {/* MODAL FORM TICKET */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090B10]/90 backdrop-blur-sm overflow-y-auto">
                        <div className="bg-[#0F131C] border border-white/10 rounded-2xl w-full max-w-xl my-auto shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                                <h2 className="text-lg font-black text-white uppercase tracking-widest">{isEditing ? 'Edit Ticket Category' : 'Create New Ticket'}</h2>
                                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-[#e8ff47] transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg></button>
                            </div>
                            
                            <form onSubmit={submit} className="p-8 grid grid-cols-2 gap-6">
                                <div className="col-span-2">
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Target Event</label>
                                    
                                    {/* LOGIKA PERUBAHAN TAMPILAN JADI INPUT MATI KETIKA DIKUNCI */}
                                    {isFixedEvent ? (
                                        <input 
                                            type="text" 
                                            value={events.find(ev => ev.ID === data.EventID)?.EventName || ''} 
                                            disabled 
                                            className="w-full bg-[#090B10]/50 border border-white/5 rounded-xl px-4 py-3 text-sm text-gray-500 cursor-not-allowed outline-none"
                                        />
                                    ) : (
                                        <select 
                                            value={data.EventID} 
                                            onChange={e => setData('EventID', e.target.value)} 
                                            className="w-full bg-[#090B10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#e8ff47] outline-none transition-all cursor-pointer appearance-none"
                                            required
                                        >
                                            <option value="">-- Pilih Event --</option>
                                            {events.map((ev) => (
                                                <option key={ev.ID} value={ev.ID}>{ev.EventName}</option>
                                            ))}
                                        </select>
                                    )}
                                    {errors.EventID && <p className="text-red-500 text-[10px] mt-1">{errors.EventID}</p>}
                                </div>
                                
                                <div className="col-span-2">
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Ticket Category Name</label>
                                    <select value={data.CategoryName} onChange={e => setData('CategoryName', e.target.value)} className="w-full bg-[#090B10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#e8ff47] outline-none transition-all appearance-none cursor-pointer" required>
                                        <option value="">-- Pilih Kategori Tiket --</option>
                                        <option value="VVIP">VVIP</option>
                                        <option value="VIP">VIP</option>
                                        <option value="Festival">Festival</option>
                                        <option value="Tribune">Tribune</option>
                                        <option value="Presale">Presale</option>
                                        <option value="Early Bird">Early Bird</option>
                                    </select>
                                </div>

                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Price (Rp)</label>
                                    <input type="number" value={data.Price} onChange={e => setData('Price', e.target.value)} className="w-full bg-[#090B10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#e8ff47] outline-none transition-all" placeholder="500000" required />
                                </div>
                                
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Quota (Pax)</label>
                                    <input type="number" value={data.Quota} onChange={e => setData('Quota', e.target.value)} className="w-full bg-[#090B10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#e8ff47] outline-none transition-all" placeholder="100" required />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Status</label>
                                    <select value={data.Status} onChange={e => setData('Status', e.target.value)} className="w-full bg-[#090B10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#e8ff47] outline-none transition-all appearance-none cursor-pointer" required>
                                        <option value="1">Active (Published)</option>
                                        <option value="0">Draft (Hidden)</option>
                                    </select>
                                </div>

                                <div className="col-span-2 pt-6 flex justify-end gap-3 border-t border-white/5 mt-2">
                                    <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 text-xs font-bold text-gray-500 hover:text-white transition-all uppercase tracking-widest">Batal</button>
                                    <button type="submit" disabled={processing} className="px-8 py-2.5 bg-[#e8ff47] hover:bg-[#d4ed36] text-black rounded-xl text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(232,255,71,0.3)] hover:shadow-[0_0_25px_rgba(232,255,71,0.5)] hover:-translate-y-0.5 transition-all">
                                        {processing ? 'Processing...' : 'Simpan Data'}
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