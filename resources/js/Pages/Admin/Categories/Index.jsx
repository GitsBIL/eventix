import React, { useState, useMemo, useEffect } from 'react';
import { Head, usePage, useForm, router, Link } from '@inertiajs/react';
import Swal from 'sweetalert2';
import AdminSidebar from '@/Components/AdminSidebar';

export default function CategoryIndex({ categories = [], event = {}, stats = {} }) {
    const { auth } = usePage().props;
    const [showModal, setShowModal] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTabFilter, setActiveTabFilter] = useState('All');
    const [activeDropdown, setActiveDropdown] = useState(null); 

    // Mencegah error jika tanggal belum tersedia dari database
    const formattedDate = event?.EventDate 
        ? new Date(event.EventDate).toLocaleDateString('id-ID', { 
            weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' 
        }) 
        : 'Tanggal Belum Ditentukan';

    const { data, setData, post, put, processing, reset, errors, transform } = useForm({
        EventID: event?.ID || '', 
        CategoryName: '', Description: '', Price: '', Discount: 0,
        Quota: '', MaxPurchase: 5, EntryType: 'Festival Area', Benefits: '', Status: 1,
    });

    const openModal = (cat = null) => {
        reset();
        setActiveDropdown(null);
        if (cat) {
            setIsEditing(true); setEditId(cat.ID);
            setData({
                EventID: event?.ID, 
                CategoryName: cat.CategoryName, Description: cat.Description || '',
                Price: cat.Price, Discount: cat.Discount || 0, Quota: cat.Quota, MaxPurchase: cat.MaxPurchase || 5,
                EntryType: cat.EntryType || 'Festival Area', Benefits: cat.Benefits || '', Status: cat.Status,
            });
        } else { 
            setIsEditing(false); 
            setData('EventID', event?.ID); 
        }
        setShowModal(true);
    };

    const submit = (e) => {
        e.preventDefault();
        
        const config = { 
            onSuccess: () => { 
                setShowModal(false); 
                Swal.fire('Konfigurasi Tersimpan', 'Data kategori berhasil diperbarui.', 'success'); 
                setActiveDropdown(null); 
            },
            onError: () => {
                Swal.fire('Validasi Gagal', 'Silakan periksa kembali form isian Anda.', 'error');
            }
        };

        if (isEditing) {
            transform((currentData) => ({ ...currentData, _method: 'put' }));
            post(route('admin.categories.update', editId), config);
        } else {
            transform((currentData) => ({ ...currentData })); 
            post(route('admin.categories.store'), config);
        }
    };

    const filteredCats = useMemo(() => {
        return categories.filter(t => {
            const matchSearch = t.CategoryName.toLowerCase().includes(searchTerm.toLowerCase());
            if (!matchSearch) return false;
            if (activeTabFilter === 'Active') return t.Status === 1 && t.Progress < 100;
            if (activeTabFilter === 'Sold Out') return t.Progress >= 100;
            if (activeTabFilter === 'Hidden/Draft') return t.Status === 0;
            return true;
        });
    }, [categories, searchTerm, activeTabFilter]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                document.getElementById('realRealSearch').focus();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        const closeDropdown = () => setActiveDropdown(null);
        document.addEventListener('click', closeDropdown);
        return () => document.removeEventListener('click', closeDropdown);
    }, []);

    const topCategory = categories.length > 0 ? categories.reduce((prev, current) => (prev.Sold > current.Sold) ? prev : current) : null;

    return (
        <div className="flex h-screen bg-[#070B17] text-slate-300 font-sans overflow-hidden selection:bg-[#38BDF8]/30 selection:text-white">
            <Head title={`Kategori Tiket - ${event?.EventName || 'Memuat...'}`} />
            
            <AdminSidebar />

            <main className="flex-1 flex flex-col h-full overflow-hidden relative">
                
                <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#38BDF8]/[0.015] rounded-full blur-3xl pointer-events-none"></div>

                {/* WORKSPACE HEADER TERINTEGRASI */}
                <header className="px-8 pt-8 pb-0 bg-[#070B17]/95 backdrop-blur-sm shrink-0 border-b border-white/[0.04] z-20 flex flex-col">
                    
                    <div className="mb-4">
                        <p className="text-[10px] font-bold text-[#38BDF8] tracking-widest uppercase mb-3 flex items-center gap-2 drop-shadow-md">
                            <Link href={route('admin.dashboard')} className="hover:text-white transition-colors">Operations</Link> 
                            <span className="text-slate-500">/</span> 
                            <Link href={route('admin.events.index')} className="hover:text-white transition-colors">Event Management</Link> 
                            <span className="text-slate-500">/</span> 
                            <span className="text-white">{event?.EventName}</span>
                        </p>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-6">
                        <div className="flex items-center gap-5">
                            <div className="w-16 h-20 bg-[#0F172A] rounded-lg border border-white/[0.08] overflow-hidden shrink-0 shadow-lg">
                                {event?.BannerImage ? (
                                    <img src={`/storage/${event.BannerImage}`} alt={event.EventName} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-800 text-slate-600">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                    </div>
                                )}
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1.5">
                                    <h1 className="text-2xl font-bold text-white tracking-tight leading-none">{event?.EventName}</h1>
                                    {event?.Status === 1 ? (
                                        <span className="px-2.5 py-1 rounded bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm shadow-lg">Live</span>
                                    ) : (
                                        <span className="px-2.5 py-1 rounded bg-amber-500/20 border border-amber-500/30 text-amber-400 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm shadow-lg">Draft</span>
                                    )}
                                </div>
                                <p className="text-xs text-slate-400 font-medium flex items-center gap-3">
                                    <span className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg> {formattedDate}</span>
                                    <span className="text-slate-600">|</span>
                                    <span className="flex items-center gap-1.5"><svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg> {event?.Location || 'Lokasi Belum Ditentukan'}</span>
                                </p>
                            </div>
                        </div>
                        
                        <div className="flex gap-2">
                            <button onClick={() => openModal()} className="px-4 py-2 bg-[#A3C957] hover:bg-[#b5e05d] text-[#070B17] rounded-lg text-xs font-bold transition-all shadow-sm flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
                                Create Tier
                            </button>
                        </div>
                    </div>

                    {/* NAVIGASI TAB WORKSPACE - MENGGUNAKAN OPTIONAL CHAINING AGAR TIDAK CRASH */}
                    <div className="flex items-center gap-8">
                        <Link href={event?.ID ? route('admin.events.show', event.ID) : '#'} className="pb-4 text-xs font-semibold text-slate-500 hover:text-slate-300 transition-all">Dashboard Overview</Link>
                        <Link href={event?.ID ? route('admin.events.categories', event.ID) : '#'} className="pb-4 text-xs font-bold text-[#38BDF8] transition-all relative">
                            Ticket Inventory
                            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#38BDF8] rounded-t-full shadow-[0_-2px_10px_rgba(56,189,248,0.5)]"></div>
                        </Link>
                        <Link href={event?.ID ? route('admin.events.tickets', event.ID) : '#'} className="pb-4 text-xs font-semibold text-slate-500 hover:text-slate-300 transition-all">Attendees & Guests</Link>
                        <Link href="#" className="pb-4 text-xs font-semibold text-slate-500 hover:text-slate-300 transition-all">Transactions</Link>
                        <Link href="#" className="pb-4 text-xs font-semibold text-slate-500 hover:text-slate-300 transition-all">Analytics</Link>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 no-scrollbar scroll-smooth">
                    
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-6">
                            {['All', 'Active', 'Sold Out', 'Hidden/Draft'].map(tab => (
                                <button key={tab} onClick={() => setActiveTabFilter(tab)} className={`pb-2.5 text-xs font-semibold transition-all relative ${activeTabFilter === tab ? 'text-white' : 'text-slate-600 hover:text-slate-300'}`}>
                                    {tab}
                                    {activeTabFilter === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white shadow-[0_-2px_10px_rgba(255,255,255,0.3)]"></div>}
                                </button>
                            ))}
                        </div>
                        
                        <div className="relative group" onClick={(e) => e.stopPropagation()}>
                            <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-[#A3C957] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                            <input id="realRealSearch" type="text" placeholder="Search operational tiers..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-[#0F172A] border border-white/[0.05] focus:border-[#A3C957]/50 rounded-lg pl-9 pr-10 py-1.5 text-xs text-white outline-none transition-all w-64 shadow-inner" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 items-start mt-6">
                        <div className="xl:col-span-3 bg-[#0F172A] rounded-xl border border-white/[0.04] shadow-sm overflow-hidden flex flex-col relative">
                            <div className="overflow-x-auto">
                                {filteredCats.length > 0 ? (
                                    <table className="w-full text-left whitespace-nowrap">
                                        <thead className="bg-[#070B17]/40 border-b border-white/[0.06]">
                                            <tr>
                                                <th className="px-6 py-5 text-xs font-semibold text-slate-500">Tier Configuration</th>
                                                <th className="px-6 py-5 text-xs font-semibold text-slate-500">Commercial (BI)</th>
                                                <th className="px-6 py-5 text-xs font-semibold text-slate-500 w-48">Inventory Ops</th>
                                                <th className="px-6 py-5 text-xs font-semibold text-slate-500">State</th>
                                                <th className="px-6 py-5 text-right text-xs font-semibold text-slate-500">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/[0.08]">
                                            {filteredCats.map((cat, index) => {
                                                const isSoldOut = cat.Progress >= 100;
                                                const benefitsList = cat.Benefits ? cat.Benefits.split(',').slice(0, 2) : [];
                                                
                                                let opsWarning = "";
                                                if (cat.Progress > 90 && !isSoldOut) opsWarning = "High Demand 🔥";
                                                else if (cat.Progress > 50) opsWarning = "Steady conversion";

                                                return (
                                                    <tr key={cat.ID} className="transition-all duration-200 hover:bg-white/[0.03] even:bg-[#070B17]/30 border-l-2 border-l-transparent hover:border-l-[#A3C957] group">
                                                        <td className="px-6 py-5">
                                                            <p className="font-semibold text-sm text-white tracking-tight">{cat.CategoryName}</p>
                                                            <p className="text-[11px] text-slate-500 mt-1 font-normal truncate max-w-[200px]">{cat.Description || `Access tier for ${event?.EventName}`}</p>
                                                            <div className="flex gap-1.5 mt-2.5">
                                                                <span className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-slate-800 text-slate-300 border border-slate-700">{cat.EntryType || 'General'}</span>
                                                                {benefitsList.map((ben, i) => (<span key={i} className="px-1.5 py-0.5 rounded text-[9px] font-medium bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20">{ben.trim()}</span>))}
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <p className={`font-semibold text-sm font-mono ${isSoldOut ? 'text-slate-600' : 'text-white'}`}>Rp {Number(cat.Price).toLocaleString('id-ID')}</p>
                                                            {cat.Discount > 0 && <p className="text-[9px] text-[#A3C957] font-semibold mt-0.5 tracking-wide">-Rp {Number(cat.Discount).toLocaleString('id-ID')} discount</p>}
                                                            <p className="text-[9px] text-slate-600 mt-1.5 font-normal">Conversion: Rp {(cat.Sold * (cat.Price - cat.Discount)).toLocaleString('id-ID', {notation: 'compact'})}</p>
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            <div className="flex justify-between items-end mb-1.5">
                                                                <span className="text-[10px] text-slate-500 font-medium">{cat.Sold} / {cat.Quota} <span className="font-normal text-slate-600">sold</span></span>
                                                                <span className={`text-[10px] font-bold font-mono ${isSoldOut ? 'text-rose-500' : 'text-white'}`}>{cat.Progress}%</span>
                                                            </div>
                                                            <div className="w-full h-1 bg-[#070B17] rounded-full overflow-hidden border border-white/[0.02]">
                                                                <div className={`h-full rounded-full transition-all duration-500 ${isSoldOut ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.3)]' : cat.Progress > 90 ? 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.3)]' : 'bg-[#A3C957] shadow-[0_0_8px_rgba(163,201,87,0.3)]'}`} style={{ width: `${cat.Progress}%` }}></div>
                                                            </div>
                                                            {opsWarning && <p className={`text-[9px] mt-2 font-medium tracking-wide ${cat.Progress > 90 && !isSoldOut ? 'text-amber-400' : 'text-slate-600'}`}>{opsWarning}</p>}
                                                        </td>
                                                        <td className="px-6 py-5">
                                                            {isSoldOut ? (<span className="inline-flex px-2 py-0.5 bg-rose-500/10 text-rose-500 border border-rose-500/20 text-[10px] font-bold rounded">Sold Out</span>) : cat.Status === 1 ? (<span className="inline-flex px-2 py-0.5 bg-[#A3C957]/10 text-[#A3C957] border border-[#A3C957]/20 text-[10px] font-bold rounded">Active</span>) : (<span className="inline-flex px-2 py-0.5 bg-slate-800 text-slate-500 border border-slate-700 text-[10px] font-bold rounded">Draft</span>)}
                                                        </td>
                                                        <td className="px-6 py-5 text-right relative" onClick={(e) => e.stopPropagation()}>
                                                            <div className="inline-block relative">
                                                                <button onClick={(e) => { e.stopPropagation(); setActiveDropdown(activeDropdown === cat.ID ? null : cat.ID); }} className="p-2 text-slate-500 hover:text-white transition-colors bg-slate-800/20 rounded-md border border-white/[0.02] hover:border-white/[0.06]">
                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"></path></svg>
                                                                </button>
                                                                
                                                                {activeDropdown === cat.ID && (
                                                                    <div className="absolute right-0 mt-2 w-40 bg-[#0F172A] border border-white/[0.1] rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col py-1.5 animate-in fade-in slide-in-from-top-1">
                                                                        <button onClick={() => openModal(cat)} className="text-left px-4 py-2 text-xs font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">Edit Kategori</button>
                                                                        <div className="w-full h-px bg-white/[0.04] my-1"></div>
                                                                        <button onClick={() => { Swal.fire({ title: 'Arsipkan Kategori?', text: 'Menyembunyikan kategori dari katalog.', icon: 'warning', showCancelButton: true, confirmButtonColor: '#e11d48', background: '#0F172A', color: '#fff' }).then(r => { if(r.isConfirmed) { router.delete(route('admin.categories.destroy', cat.ID)); setActiveDropdown(null); } }) }} className="text-left px-4 py-2 text-xs font-medium text-rose-500 hover:bg-rose-500/10 transition-colors">Arsipkan</button>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                ) : (
                                    <div className="px-6 py-24 flex flex-col items-center justify-center text-center bg-[#070B17]/20">
                                        <div className="w-16 h-16 bg-[#0F172A] rounded-full flex items-center justify-center mb-5 border border-white/[0.04] text-slate-600 shadow-inner">
                                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path></svg>
                                        </div>
                                        <h3 className="text-base font-semibold text-white mb-2 leading-tight">Belum Ada Kategori Tiket</h3>
                                        <p className="text-xs text-slate-500 max-w-xs mb-8 leading-relaxed">Katalog tiket untuk acara ini masih kosong. Silakan buat kategori pertama Anda.</p>
                                        <button onClick={() => openModal()} className="px-5 py-2.5 bg-white text-[#070B17] rounded-lg text-xs font-bold hover:bg-slate-200 transition-colors shadow-sm flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                                            Buat Kategori
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="xl:col-span-1 space-y-6">
                            <div className="bg-[#0F172A] rounded-xl border border-white/[0.04] shadow-sm p-6">
                                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5">Insight Performa</h3>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-[10px] text-slate-500 mb-1">Total Kategori</p>
                                        <p className="text-xl font-bold text-white">{stats?.totalCategories || 0}</p>
                                    </div>
                                    <div className="pt-4 border-t border-white/[0.04]">
                                        <p className="text-[10px] text-slate-500 mb-1">Tier Terlaris</p>
                                        <p className="text-sm font-bold text-[#38BDF8]">{topCategory ? topCategory.CategoryName : 'Belum Ada'}</p>
                                    </div>
                                    <div className="pt-4 border-t border-white/[0.04]">
                                        <p className="text-[10px] text-slate-500 mb-1">Status Penjualan</p>
                                        <div className="flex gap-2 mt-1">
                                            <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">{stats?.activeCategories || 0} Aktif</span>
                                            <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-500 text-[10px] font-bold">{stats?.soldOutCategories || 0} Habis</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MODAL CONFIGURATION */}
                {showModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#070B17]/90 backdrop-blur-md overflow-y-auto" onClick={() => setShowModal(false)}>
                        <div className="bg-[#0F172A] border border-white/[0.07] rounded-xl w-full max-w-3xl my-auto shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-in fade-in slide-in-from-bottom-2" onClick={(e) => e.stopPropagation()}>
                            
                            <div className="p-5 border-b border-white/[0.04] flex justify-between items-center bg-[#070B17]/40 shrink-0">
                                <div>
                                    <h2 className="text-sm font-bold text-white tracking-tight">{isEditing ? 'Ubah Konfigurasi Tier' : 'Buat Kategori Tiket Baru'}</h2>
                                </div>
                                <button onClick={() => setShowModal(false)} className="text-slate-500 hover:text-white transition-colors p-1.5 hover:bg-slate-800 rounded-md"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth="2" strokeLinecap="round"></path></svg></button>
                            </div>
                            
                            <form onSubmit={submit} className="flex flex-col flex-1 overflow-hidden">
                                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-9">
                                    <section>
                                        <h4 className="text-xs font-semibold text-white mb-4 border-b border-white/[0.04] pb-2 flex items-center gap-2"><svg className="w-3.5 h-3.5 text-[#38BDF8]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Detail Operasional</h4>
                                        <div className="grid grid-cols-2 gap-5">
                                            
                                            <div className="col-span-2 md:col-span-1">
                                                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Acara Target (Terkunci)</label>
                                                <div className="w-full bg-[#070B17]/50 border border-white/[0.02] rounded-lg px-3 py-2.5 text-sm text-slate-500 cursor-not-allowed shadow-inner flex items-center">
                                                    <svg className="w-3.5 h-3.5 mr-2 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                                                    {event?.EventName}
                                                </div>
                                            </div>

                                            <div className="col-span-2 md:col-span-1">
                                                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Nama Tier / Kategori</label>
                                                <input type="text" value={data.CategoryName} onChange={e => setData('CategoryName', e.target.value)} className="w-full bg-[#070B17] border border-white/[0.05] focus:border-[#38BDF8] rounded-lg px-3 py-2.5 text-sm text-white outline-none transition-all placeholder-slate-700 shadow-inner" placeholder="Cth: VIP Backstage Pass" />
                                                {errors.CategoryName && <p className="text-rose-400 text-[11px] mt-1.5 font-medium animate-pulse">{errors.CategoryName}</p>}
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Catatan Internal (Opsional)</label>
                                                <textarea value={data.Description} onChange={e => setData('Description', e.target.value)} rows="2" className="w-full bg-[#070B17] border border-white/[0.05] focus:border-[#38BDF8] rounded-lg px-3 py-2.5 text-sm text-white outline-none transition-all resize-none shadow-inner" placeholder="Tulis rincian operasional di sini..."></textarea>
                                            </div>
                                        </div>
                                    </section>

                                    <section>
                                        <h4 className="text-xs font-semibold text-white mb-4 border-b border-white/[0.04] pb-2 flex items-center gap-2"><svg className="w-3.5 h-3.5 text-[#A3C957]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg> Harga & Inventaris</h4>
                                        <div className="grid grid-cols-2 gap-5">
                                            <div className="col-span-2 md:col-span-1">
                                                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Harga Dasar (Rp)</label>
                                                <input type="text" value={data.Price} onChange={e => setData('Price', e.target.value)} className="w-full bg-[#070B17] border border-white/[0.05] focus:border-[#A3C957] rounded-lg px-3 py-2.5 text-sm text-white outline-none transition-all shadow-inner" placeholder="750000" />
                                                {errors.Price && <p className="text-rose-400 text-[11px] mt-1.5 font-medium animate-pulse">{errors.Price}</p>}
                                            </div>
                                            <div className="col-span-2 md:col-span-1">
                                                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Potongan Diskon (Rp)</label>
                                                <input type="text" value={data.Discount} onChange={e => setData('Discount', e.target.value)} className="w-full bg-[#070B17] border border-white/[0.05] focus:border-[#A3C957] rounded-lg px-3 py-2.5 text-sm text-white outline-none transition-all shadow-inner" placeholder="0" />
                                                {errors.Discount && <p className="text-rose-400 text-[11px] mt-1.5 font-medium animate-pulse">{errors.Discount}</p>}
                                            </div>
                                            <div className="col-span-2 md:col-span-1">
                                                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Kuota Tersedia</label>
                                                <input type="text" value={data.Quota} onChange={e => setData('Quota', e.target.value)} className="w-full bg-[#070B17] border border-white/[0.05] focus:border-[#38BDF8] rounded-lg px-3 py-2.5 text-sm text-white outline-none transition-all shadow-inner" placeholder="100" />
                                                {errors.Quota && <p className="text-rose-400 text-[11px] mt-1.5 font-medium animate-pulse">{errors.Quota}</p>}
                                            </div>
                                            <div className="col-span-2 md:col-span-1">
                                                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Batas Beli per Transaksi</label>
                                                <input type="text" value={data.MaxPurchase} onChange={e => setData('MaxPurchase', e.target.value)} className="w-full bg-[#070B17] border border-white/[0.05] focus:border-[#38BDF8] rounded-lg px-3 py-2.5 text-sm text-white outline-none transition-all shadow-inner" placeholder="5" />
                                                {errors.MaxPurchase && <p className="text-rose-400 text-[11px] mt-1.5 font-medium animate-pulse">{errors.MaxPurchase}</p>}
                                            </div>
                                        </div>
                                    </section>

                                    <section>
                                        <h4 className="text-xs font-semibold text-white mb-4 border-b border-white/[0.04] pb-2 flex items-center gap-2"><svg className="w-3.5 h-3.5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path></svg> Akses & Visibilitas</h4>
                                        <div className="grid grid-cols-2 gap-5">
                                            <div className="col-span-2 md:col-span-1">
                                                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Tipe Area</label>
                                                <select value={data.EntryType} onChange={e => setData('EntryType', e.target.value)} className="w-full bg-[#070B17] border border-white/[0.05] focus:border-[#38BDF8] rounded-lg px-3 py-2.5 text-sm text-white outline-none transition-all cursor-pointer appearance-none shadow-inner">
                                                    <option value="Festival Area">Festival Area (Berdiri)</option>
                                                    <option value="Seated Tribune">Tribun Duduk</option>
                                                    <option value="VIP Access">Akses VIP</option>
                                                    <option value="Backstage Pass">Akses Belakang Panggung</option>
                                                </select>
                                            </div>
                                            <div className="col-span-2 md:col-span-1">
                                                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Visibilitas Katalog</label>
                                                <select value={data.Status} onChange={e => setData('Status', e.target.value)} className="w-full bg-[#070B17] border border-white/[0.05] focus:border-[#38BDF8] rounded-lg px-3 py-2.5 text-sm text-white outline-none transition-all cursor-pointer appearance-none shadow-inner">
                                                    <option value="1">Aktif & Dijual</option>
                                                    <option value="0">Disembunyikan (Draft)</option>
                                                </select>
                                            </div>
                                            <div className="col-span-2">
                                                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">Fasilitas Tambahan (Pisahkan dgn Koma)</label>
                                                <input type="text" value={data.Benefits} onChange={e => setData('Benefits', e.target.value)} className="w-full bg-[#070B17] border border-white/[0.05] focus:border-[#38BDF8] rounded-lg px-3 py-2.5 text-sm text-white outline-none transition-all placeholder-slate-700 shadow-inner" placeholder="Cth: Gratis Merchandise, Jalur Cepat" />
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                
                                <div className="p-5 border-t border-white/[0.04] flex justify-end gap-3 shrink-0 bg-[#0F172A]">
                                    <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors">Batal</button>
                                    <button type="submit" disabled={processing} className="px-6 py-2.5 bg-white text-[#070B17] rounded-lg text-xs font-bold hover:bg-slate-200 transition-all shadow-sm disabled:opacity-50">
                                        {processing ? 'Memproses...' : (isEditing ? 'Simpan Perubahan' : 'Terbitkan Kategori')}
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