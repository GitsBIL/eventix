import React, { useState } from 'react';
import { Head, Link, usePage, useForm, router } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function EventIndex({ events = [] }) {
    const { auth } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);

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
                    Swal.fire('Penambahan Berhasil', 'Data acara baru telah sukses direkam ke dalam basis data.', 'success');
                } 
            });
        }
    };

    return (
        <div className="flex h-screen bg-[#090B10] text-gray-300 font-sans overflow-hidden selection:bg-[#e8ff47] selection:text-black">
            <Head title="Events Management - Eventix" />

            {/* SIDEBAR CORPORATE */}
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
                                <li>
                                    <Link href="#" className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                                        <span className="text-sm font-medium">Analytics</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-3">Event Management</p>
                            <ul className="space-y-1">
                                <li>
                                    <Link href={route('admin.events.index')} className="flex items-center gap-3 px-4 py-2.5 bg-gradient-to-r from-[#e8ff47]/10 to-transparent text-white rounded-xl border-l-2 border-[#e8ff47] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition-all">
                                        <svg className="w-4 h-4 text-[#e8ff47]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                        <span className="text-sm font-bold">Events</span>
                                    </Link>
                                </li>
                                <li><Link href={route('admin.tickets.index')} className="flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg><span className="text-sm font-medium">Tickets</span></Link></li>
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

                {/* PROFILE ADMIN AREA */}
                <div className="p-4 border-t border-white/5 bg-[#0A0D14]/80 backdrop-blur-xl">
                    <Link href={route('logout')} method="post" as="button" className="w-full flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#e8ff47]/30 hover:bg-[#e8ff47]/5 transition-all group relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#e8ff47]/0 via-[#e8ff47]/10 to-[#e8ff47]/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
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
                    <h1 className="text-xl font-bold text-white uppercase tracking-widest">Events Management</h1>
                    <button onClick={() => { setIsEditing(false); reset(); setShowModal(true); }} className="px-5 py-2.5 bg-[#e8ff47] hover:bg-[#d4ed36] text-black rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(232,255,71,0.2)] hover:shadow-[0_0_25px_rgba(232,255,71,0.4)] hover:-translate-y-0.5">
                        + New Event
                    </button>
                </header>

                <div className="flex-1 overflow-y-auto p-8 text-xs no-scrollbar">
                    <div className="bg-[#0F131C] rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
                        <table className="w-full text-left">
                            <thead className="bg-[#0A0D14] text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-white/5">
                                <tr>
                                    <th className="px-6 py-5">Event Name</th>
                                    <th className="px-6 py-5">Location & Date</th>
                                    <th className="px-6 py-5">Image</th>
                                    <th className="px-6 py-5">Status</th>
                                    <th className="px-6 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {events.map((event) => {
                                    const formattedDate = event.EventDate 
                                        ? new Date(event.EventDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
                                        : 'TBA';

                                    return (
                                        <tr key={event.ID} className="hover:bg-white/[0.02] transition-colors group">
                                            <td className="px-6 py-4">
                                                <p className="font-bold text-white text-sm">{event.EventName}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-gray-300">{event.Location || 'TBA'}</p>
                                                <p className="text-[10px] text-gray-500">{formattedDate}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                {event.BannerImage ? (
                                                    <span className="text-green-400 text-[10px] font-bold border border-green-500/20 bg-green-500/10 px-2 py-1 rounded">Uploaded</span>
                                                ) : (
                                                    <span className="text-gray-500 text-[10px]">No Image</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4">
                                                {event.Status === 1 || event.Status === '1' ? (
                                                    <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-[9px] font-black rounded border border-blue-500/20 uppercase">Active</span>
                                                ) : (
                                                    <span className="px-2 py-1 bg-red-500/10 text-red-400 text-[9px] font-black rounded border border-red-500/20 uppercase">Draft</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right flex gap-2 justify-end">
                                                <button onClick={() => { 
                                                    setIsEditing(true); 
                                                    setEditId(event.ID); 
                                                    setData({
                                                        EventName: event.EventName,
                                                        EventDate: event.EventDate ? event.EventDate.split(' ')[0] : '', 
                                                        Location: event.Location || '',
                                                        Description: event.Description || '',
                                                        Status: event.Status,
                                                        BannerImage: null 
                                                    }); 
                                                    setShowModal(true); 
                                                }} className="p-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg></button>
                                                
                                                <button onClick={() => { 
                                                    Swal.fire({ 
                                                        title: 'Konfirmasi Penghapusan', 
                                                        text: 'Apakah Anda yakin ingin menghapus data acara ini? Tindakan ini bersifat permanen dan tidak dapat dibatalkan.', 
                                                        icon: 'warning', 
                                                        showCancelButton: true, 
                                                        confirmButtonColor: '#d33', 
                                                        cancelButtonColor: '#4B5563',
                                                        confirmButtonText: 'Ya, Hapus Data',
                                                        cancelButtonText: 'Batal'
                                                    })
                                                    .then((result) => { 
                                                        if (result.isConfirmed) router.delete(route('admin.events.destroy', event.ID)) 
                                                    });
                                                }} className="p-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* MODAL FORM UPLOAD FILE */}
                {showModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#090B10]/90 backdrop-blur-sm overflow-y-auto">
                        <div className="bg-[#0F131C] border border-white/10 rounded-2xl w-full max-w-xl my-auto shadow-[0_0_50px_rgba(0,0,0,0.8)]">
                            <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                                <h2 className="text-lg font-black text-white uppercase tracking-widest">{isEditing ? 'Edit Event' : 'Create New Event'}</h2>
                                <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-[#e8ff47] transition-colors"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12"></path></svg></button>
                            </div>
                            
                            <form onSubmit={submit} className="p-8 grid grid-cols-2 gap-5">
                                <div className="col-span-2">
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Event Name</label>
                                    <input type="text" value={data.EventName} onChange={e => setData('EventName', e.target.value)} className="w-full bg-[#090B10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#e8ff47] outline-none transition-all" placeholder="Nama Konser" required />
                                </div>
                                
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Event Date</label>
                                    <input type="date" value={data.EventDate} onChange={e => setData('EventDate', e.target.value)} className="w-full bg-[#090B10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#e8ff47] outline-none transition-all [color-scheme:dark]" />
                                </div>
                                
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Location</label>
                                    <input type="text" value={data.Location} onChange={e => setData('Location', e.target.value)} className="w-full bg-[#090B10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#e8ff47] outline-none transition-all" placeholder="Venue Lokasi" />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Upload Banner (JPG/PNG, Max 2MB)</label>
                                    <input 
                                        type="file" 
                                        onChange={e => setData('BannerImage', e.target.files[0])} 
                                        className="w-full bg-[#090B10] border border-dashed border-white/20 rounded-xl px-4 py-6 text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#e8ff47] file:text-black hover:border-[#e8ff47] transition-all cursor-pointer" 
                                        accept="image/*"
                                    />
                                    {errors.BannerImage && <p className="text-red-500 text-[10px] mt-1 uppercase font-bold">{errors.BannerImage}</p>}
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">Description</label>
                                    <textarea value={data.Description} onChange={e => setData('Description', e.target.value)} rows="3" className="w-full bg-[#090B10] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#e8ff47] outline-none transition-all resize-none shadow-inner" placeholder="Detail event..."></textarea>
                                </div>

                                <div className="col-span-2 pt-4 flex justify-end gap-3 border-t border-white/5 mt-4">
                                    <button type="button" onClick={() => setShowModal(false)} className="px-6 py-2.5 text-xs font-bold text-gray-500 hover:text-white transition-all uppercase tracking-widest">Batal</button>
                                    <button type="submit" disabled={processing} className="px-8 py-2.5 bg-[#e8ff47] hover:bg-[#d4ed36] text-black rounded-xl text-xs font-black uppercase tracking-widest shadow-[0_0_20px_rgba(232,255,71,0.3)] hover:shadow-[0_0_25px_rgba(232,255,71,0.4)] hover:-translate-y-0.5 transition-all">
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