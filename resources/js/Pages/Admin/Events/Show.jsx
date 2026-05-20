import React, { useState } from 'react';
import { Head, Link, useForm, router } from '@inertiajs/react';
import Swal from 'sweetalert2';
import AdminSidebar from '@/Components/AdminSidebar';

export default function EventShow({ event, stats }) {
    // State untuk mengontrol visibilitas modal ubah data acara
    const [showEditModal, setShowEditModal] = useState(false);
    
    // Pemformatan tanggal ke format lokal Indonesia
    const formattedDate = event.EventDate 
        ? new Date(event.EventDate).toLocaleDateString('id-ID', { 
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
        }) 
        : 'Tanggal Belum Ditetapkan';

    // Inisialisasi form operasional dengan data entitas acara saat ini
    const { data, setData, processing, errors } = useForm({
        EventName: event.EventName || '',
        EventDate: event.EventDate ? event.EventDate.split(' ')[0] : '', // Mengambil format YYYY-MM-DD
        Location: event.Location || '',
        Description: event.Description || '',
        BannerImage: null, // Default null untuk mencegah pengiriman ulang file lama secara mentah
        Status: event.Status ?? 1,
    });

    // Menangani proses pengiriman pembaruan data ke server (Backend)
    const submitEdit = (e) => {
        e.preventDefault();
        router.post(route('admin.events.update', event.ID), {
            ...data,
            _method: 'PUT', // Spoofing metode HTTP PUT untuk nanganin upload file di Laravel
        }, {
            onSuccess: () => {
                setShowEditModal(false);
                Swal.fire('Pembaruan Berhasil', 'Data acara telah sukses diperbarui di dalam sistem.', 'success');
            },
            onError: () => {
                Swal.fire('Gagal', 'Silakan periksa kembali isian form Anda.', 'error');
            }
        });
    };

    const handleEmailBroadcast = () => {
        Swal.fire({
            title: 'Siaran Email (Broadcast)',
            text: 'Fitur untuk mengirim instruksi massal ke seluruh pembeli tiket (misal: info penukaran gelang, rundown acara).',
            icon: 'info',
            background: '#0F172A',
            color: '#fff',
            confirmButtonColor: '#38BDF8'
        });
    };

    return (
        <div className="flex h-screen bg-[#070B17] text-slate-300 font-sans overflow-hidden selection:bg-[#38BDF8]/30 selection:text-white">
            <Head title={`${event.EventName} - Command Center`} />
            
            <AdminSidebar />

            <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#070B17]">
                
                {/* 1. HERO EVENT BANNER & HEADER */}
                <div className="relative h-72 shrink-0 bg-slate-900 border-b border-[#1e293b] flex flex-col">
                    {event.BannerImage ? (
                        <img src={`/storage/${event.BannerImage}`} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay" alt={event.EventName} />
                    ) : (
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-[#0f172a] to-[#070B17]"></div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070B17] via-[#070B17]/80 to-transparent"></div>
                    
                    {/* Tombol Navigasi Kembali */}
                    <div className="relative z-10 p-6">
                        <Link href={route('admin.events.index')} className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-all text-xs font-bold bg-[#0F172A]/80 hover:bg-slate-800 px-3 py-2 rounded-lg border border-white/[0.05] w-fit backdrop-blur-md shadow-lg group">
                            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
                            Kembali ke Daftar Acara
                        </Link>
                    </div>

                    <div className="relative z-10 px-8 pb-6 mt-auto">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                            <div>
                                <p className="text-[10px] font-bold text-[#38BDF8] tracking-widest uppercase mb-3 flex items-center gap-2 drop-shadow-md">
                                    <span className="text-slate-500">OPERATIONS / EVENT MANAGEMENT /</span> 
                                    <span className="text-white">{event.EventName}</span>
                                </p>
                                
                                <div className="flex items-center gap-4 mb-2">
                                    <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight drop-shadow-lg">{event.EventName}</h1>
                                    {event.Status === 1 ? (
                                        <span className="px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm shadow-lg">Live</span>
                                    ) : (
                                        <span className="px-2.5 py-1 rounded bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm shadow-lg">Draft</span>
                                    )}
                                </div>
                                
                                <p className="text-sm text-slate-300 font-medium flex items-center gap-3 drop-shadow-md">
                                    <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-[#A3C957]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> {event.Location || 'TBA'}</span>
                                    <span className="text-slate-500">|</span>
                                    <span className="flex items-center gap-1.5"><svg className="w-4 h-4 text-[#A3C957]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> {formattedDate}</span>
                                </p>
                            </div>
                            
                            <div className="flex items-center gap-3 relative z-10">
                                {/* Memicu pembukaan modal edit */}
                                <button onClick={() => setShowEditModal(true)} className="px-4 py-2 bg-[#0F172A]/80 backdrop-blur-md border border-white/[0.1] hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all shadow-lg cursor-pointer">
                                    Ubah Detail Acara
                                </button>
                                <button className="px-5 py-2 bg-[#38BDF8] hover:bg-[#7dd3fc] text-[#070B17] rounded-lg text-xs font-bold transition-all shadow-[0_0_15px_rgba(56,189,248,0.3)] flex items-center gap-2">
                                    Publikasikan Portal
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. TAB NAVIGASI */}
                <div className="px-8 flex items-center gap-8 border-b border-[#1e293b] bg-[#070B17] shrink-0 sticky top-0 z-10">
                    <Link href={route('admin.events.show', event.ID)} className="py-4 text-xs font-bold text-[#38BDF8] border-b-2 border-[#38BDF8] transition-all">Dashboard Overview</Link>
                    <Link href={route('admin.events.categories', event.ID)} className="py-4 text-xs font-semibold text-slate-500 hover:text-slate-300 transition-all">Ticket Inventory</Link>
                    <Link href={route('admin.events.tickets', event.ID)} className="py-4 text-xs font-semibold text-slate-500 hover:text-slate-300 transition-all">Attendees & Guests</Link>
                    <Link href="#" className="py-4 text-xs font-semibold text-slate-500 hover:text-slate-300 transition-all">Transactions</Link>
                    <Link href="#" className="py-4 text-xs font-semibold text-slate-500 hover:text-slate-300 transition-all">Analytics</Link>
                </div>

                {/* 3. LAYOUT GRID METRIK UTAMA */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                        
                        <div className="lg:col-span-2 space-y-8">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#0f172a] p-5 rounded-xl border border-[#1e293b] shadow-sm relative overflow-hidden">
                                    <p className="text-[10px] font-bold text-[#A3C957] uppercase tracking-widest mb-2">Total Pendapatan</p>
                                    <h3 className="text-2xl font-black text-white">{stats.revenue}</h3>
                                    <p className="text-[10px] text-slate-500 mt-2 font-medium">Berdasarkan tiket tervalidasi</p>
                                </div>
                                <div className="bg-[#0f172a] p-5 rounded-xl border border-[#1e293b] shadow-sm">
                                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Tiket Terjual</p>
                                    <div className="flex items-end gap-2">
                                        <h3 className="text-2xl font-black text-white">{stats.tickets_sold}</h3>
                                        <span className="text-xs text-slate-500 font-mono mb-1">/ {stats.total_capacity}</span>
                                    </div>
                                    <div className="w-full h-1.5 bg-[#070B17] rounded-full mt-3 overflow-hidden border border-white/[0.02]">
                                        <div className="h-full bg-[#38BDF8] rounded-full" style={{ width: stats.total_capacity > 0 ? `${(stats.tickets_sold / stats.total_capacity) * 100}%` : '0%' }}></div>
                                    </div>
                                </div>
                                <div className="bg-[#0f172a] p-5 rounded-xl border border-[#1e293b] shadow-sm">
                                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Tingkat Kehadiran (Gate)</p>
                                    <h3 className="text-2xl font-black text-white">{stats.attendance_rate}%</h3>
                                    <p className="text-[10px] text-amber-400 mt-2 font-medium flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse"></span> Belum dimulai</p>
                                </div>
                                <div className="bg-[#0f172a] p-5 rounded-xl border border-[#1e293b] shadow-sm">
                                    <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-2">Tertunda (Pending)</p>
                                    <h3 className="text-2xl font-black text-white">{stats.pending_tx} <span className="text-sm font-normal text-slate-500">transaksi</span></h3>
                                    <p className="text-[10px] text-slate-500 mt-2 font-medium">Menunggu pelunasan gateway</p>
                                </div>
                            </div>

                            {/* Grafik Garis Chart Penjualan */}
                            <div className="bg-[#0f172a] rounded-xl border border-[#1e293b] shadow-sm p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-xs font-bold text-white uppercase tracking-wider">Tren Penjualan (7 Hari Terakhir)</h3>
                                    <button className="text-[10px] font-bold text-[#38BDF8] hover:text-white transition-colors">Lihat Laporan Penuh</button>
                                </div>
                                <div className="h-48 flex items-end justify-between gap-2 px-2 border-b border-[#1e293b] pb-2 relative">
                                    <div className="w-full flex justify-between items-end h-full">
                                        {[20, 35, 25, 60, 45, 80, 95].map((val, i) => (
                                            <div key={i} className="w-[10%] bg-gradient-to-t from-[#38BDF8]/20 to-[#38BDF8] rounded-t-sm group relative cursor-pointer transition-all hover:opacity-80" style={{ height: `${val}%` }}>
                                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-[9px] font-bold text-white bg-slate-800 px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity">{val}</div>
                                            </div>
                                        ))}
                                    </div>
                               }
                                </div>
                                <div className="flex justify-between mt-3 px-4">
                                    <span className="text-[9px] font-medium text-slate-500">Senin</span>
                                    <span className="text-[9px] font-medium text-slate-500">Selasa</span>
                                    <span className="text-[9px] font-medium text-slate-500">Rabu</span>
                                    <span className="text-[9px] font-medium text-slate-500">Kamis</span>
                                    <span className="text-[9px] font-medium text-slate-500">Jumat</span>
                                    <span className="text-[9px] font-medium text-slate-500">Sabtu</span>
                                    <span className="text-[9px] font-medium text-slate-500">Minggu</span>
                                </div>
                            </div>
                        </div>

                        {/* PANEL OPERASIONAL SISI KANAN */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-[#0f172a] rounded-xl border border-[#1e293b] shadow-sm p-6">
                                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-5">Status Operasional Acara</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                        </div>
                                        <p className="text-xs font-medium text-slate-300">Inventaris Tiket Siap</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                        </div>
                                        <p className="text-xs font-medium text-slate-300">Gateway Midtrans Terhubung</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                        </div>
                                        <p className="text-xs font-medium text-slate-300">Notifikasi Email Aktif</p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                                            <span className="text-[10px] font-black">!</span>
                                        </div>
                                        <p className="text-xs font-medium text-slate-400">Integrasi WhatsApp API (Ditunda)</p>
                                    </div>
                                </div>
                            </div>

                            {/* Grid Tombol Pintas Operasional */}
                            <div className="grid grid-cols-2 gap-3">
                                <Link href={route('admin.events.categories', event.ID)} className="p-4 bg-slate-800/50 hover:bg-slate-800 border border-[#1e293b] hover:border-slate-600 rounded-xl flex flex-col items-center justify-center text-center transition-all group">
                                    <svg className="w-5 h-5 text-slate-400 group-hover:text-[#e8ff47] mb-2 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                    <span className="text-[10px] font-bold text-slate-300">Buat Tier Baru</span>
                                </Link>
                                <Link href={route('admin.events.tickets', event.ID)} className="p-4 bg-slate-800/50 hover:bg-slate-800 border border-[#1e293b] hover:border-slate-600 rounded-xl flex flex-col items-center justify-center text-center transition-all group">
                                    <svg className="w-5 h-5 text-slate-400 group-hover:text-[#38BDF8] mb-2 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                                    <span className="text-[10px] font-bold text-slate-300">Daftar Tamu</span>
                                </Link>
                                <button onClick={handleEmailBroadcast} className="p-4 bg-slate-800/50 hover:bg-slate-800 border border-[#1e293b] hover:border-slate-600 rounded-xl flex flex-col items-center justify-center text-center transition-all group">
                                    <svg className="w-5 h-5 text-slate-400 group-hover:text-white mb-2 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                                    <span className="text-[10px] font-bold text-slate-300">Siaran Email</span>
                                </button>
                                <button className="p-4 bg-slate-800/50 hover:bg-slate-800 border border-[#1e293b] hover:border-slate-600 rounded-xl flex flex-col items-center justify-center text-center transition-all group">
                                    <svg className="w-5 h-5 text-slate-400 group-hover:text-emerald-400 mb-2 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                                    <span className="text-[10px] font-bold text-slate-300">Log Transaksi</span>
                                </button>
                            </div>

                            <div className="bg-[#0f172a] rounded-xl border border-[#1e293b] shadow-sm p-6">
                                <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-5">Aktivitas Terkini</h3>
                                <div className="space-y-5 relative before:absolute before:inset-y-0 before:left-[9px] before:w-px before:bg-[#1e293b]">
                                    <div className="relative flex gap-4">
                                        <div className="w-5 h-5 rounded-full bg-slate-800 border border-slate-700 flex shrink-0 items-center justify-center relative z-10 text-[8px]">🎟️</div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[11px] font-medium text-slate-300 leading-snug">Sistem siap menerima pesanan.</p>
                                            <p className="text-[9px] text-slate-500 mt-1 font-mono">Just now</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* MODAL POP-UP EDIT DETAIL ACARA (SUDAH AKTIF & TERINTEGRASI) */}
                {showEditModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#060816]/90 backdrop-blur-sm overflow-y-auto" onClick={() => setShowEditModal(false)}>
                        <div className="bg-[#0f172a] border border-[#1e293b] rounded-xl w-full max-w-xl my-auto shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                            <div className="p-5 border-b border-[#1e293b] flex justify-between items-center bg-slate-800/20 rounded-t-xl">
                                <h2 className="text-sm font-bold text-white">Ubah Konfigurasi Detail Acara</h2>
                                <button onClick={() => setShowEditModal(false)} className="text-slate-500 hover:text-white transition-colors p-1 hover:bg-slate-800 rounded">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round"></path></svg>
                                </button>
                            </div>
                            
                            <form onSubmit={submitEdit} className="p-6 grid grid-cols-2 gap-5">
                                <div className="col-span-2">
                                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Nama Acara</label>
                                    <input type="text" value={data.EventName} onChange={e => setData('EventName', e.target.value)} className="w-full bg-[#060816] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-white focus:border-slate-400 outline-none transition-all placeholder-slate-600" required />
                                </div>
                                
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Tanggal Pelaksanaan</label>
                                    <input type="date" value={data.EventDate} onChange={e => setData('EventDate', e.target.value)} className="w-full bg-[#060816] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-white focus:border-slate-400 outline-none transition-all [color-scheme:dark]" />
                                </div>
                                
                                <div className="col-span-2 md:col-span-1">
                                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Lokasi / Venue</label>
                                    <input type="text" value={data.Location} onChange={e => setData('Location', e.target.value)} className="w-full bg-[#060816] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-white focus:border-slate-400 outline-none transition-all placeholder-slate-600" />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Ganti Poster Acara (Aspek 4:5)</label>
                                    <div className="relative">
                                        <input type="file" onChange={e => setData('BannerImage', e.target.files[0])} className="w-full bg-[#060816] border border-dashed border-[#1e293b] rounded-lg px-3 py-4 text-xs text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-slate-800 file:text-white hover:border-slate-500 transition-all cursor-pointer" accept="image/*" />
                                    </div>
                                    {errors.BannerImage && <p className="text-red-400 text-[10px] mt-1.5 font-medium">{errors.BannerImage}</p>}
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Deskripsi / Rincian Acara</label>
                                    <textarea value={data.Description} onChange={e => setData('Description', e.target.value)} rows="3" className="w-full bg-[#060816] border border-[#1e293b] rounded-lg px-3 py-2 text-sm text-white focus:border-slate-400 outline-none transition-all resize-none placeholder-slate-600"></textarea>
                                </div>

                                <div className="col-span-2 pt-4 flex justify-end gap-3 border-t border-[#1e293b] mt-2">
                                    <button type="button" onClick={() => setShowEditModal(false)} className="px-5 py-2 text-xs font-semibold text-slate-400 hover:text-white transition-all">Batal</button>
                                    <button type="submit" disabled={processing} className="px-6 py-2 bg-white text-slate-900 hover:bg-slate-200 rounded-lg text-xs font-bold transition-all shadow-sm disabled:opacity-50">
                                        {processing ? 'Menyimpan...' : 'Simpan Perubahan'}
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