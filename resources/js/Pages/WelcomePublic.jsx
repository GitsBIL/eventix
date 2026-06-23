import React, { useState, useEffect } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export default function WelcomePublic({ publicEvents = [] }) {
    const { auth } = usePage().props;
    
    const isAdmin = auth.user && (auth.user.Role === 'Admin' || auth.user.Role === 'Super Admin');
    const [activeCategory, setActiveCategory] = useState('All');
    const categories = ['All', 'Music Festival', 'Jazz', 'Indie', 'Pop', 'EDM', 'Comedy'];

    const getImageUrl = (rawPath) => {
        if (!rawPath) return 'https://images.unsplash.com/photo-1540039155733-d7696d4eb98e?w=1600';
        if (rawPath.startsWith('http')) return rawPath;
        if (rawPath.startsWith('/storage/')) return rawPath;
        if (rawPath.startsWith('storage/')) return `/${rawPath}`;
        return `/storage/${rawPath}`;
    };

    const startTour = () => {
        localStorage.setItem('is_tour_active', '1'); 
        
        const driverObj = driver({
            showProgress: true,
            animate: true,
            doneBtnText: 'Selesai',
            nextBtnText: 'Lanjut →',
            prevBtnText: '← Kembali',
            steps: [
                {
                    popover: {
                        title: '👋 Welcome to Eventix!',
                        description: 'Ini adalah panduan interaktif. Yuk kita keliling sebentar buat liat cara pesan tiket dari awal sampai akhir!'
                    }
                },
                {
                    element: '.tour-search',
                    popover: {
                        title: '🔍 Cari Event Favorit',
                        description: 'Kamu bisa mencari konser, festival, atau artis favorit kamu di kolom pencarian ini.'
                    }
                },
                {
                    element: '.tour-get-tickets',
                    popover: {
                        title: '🎟️ Beli Tiket',
                        description: 'Kalau udah nemu eventnya, klik tombol ini. Nanti panduan akan otomatis lanjut di halaman selanjutnya! Coba klik ya sekarang.',
                        side: 'top'
                    }
                }
            ]
        });
        driverObj.drive();
    };

    useEffect(() => {
        if (localStorage.getItem('start_tour_from_help') === '1') {
            localStorage.removeItem('start_tour_from_help');
            setTimeout(() => {
                startTour();
            }, 500);
        }
    }, []);

    return (
        <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-[#e8ff47] selection:text-black">
            <Head title="EVENTIX LIVE - Official Ticketing Platform" />

            <nav className="fixed top-0 w-full z-50 bg-[#050505]/70 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
                <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-12">
                        <Link href="/" className="flex items-center gap-3 group">
                            <img src="/images/logo.png" alt="Eventix Logo" className="h-8 w-auto group-hover:scale-105 transition duration-300" 
                                 onError={(e) => { e.target.style.display = 'none' }} 
                            />
                            <div className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
                                EVEN<span className="text-[#e8ff47]">TIX</span>
                                <span className="px-1.5 py-0.5 rounded text-[8px] font-black tracking-widest uppercase bg-[#e8ff47]/10 text-[#e8ff47] border border-[#e8ff47]/20 relative top-[-2px]">Live</span>
                            </div>
                        </Link>
                        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                            <a href="#events" className="text-white relative group">Explore<span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-[#e8ff47] rounded-full"></span></a>
                            <Link href={route('help-center')} className="text-slate-400 hover:text-white transition-colors relative group">Help Center<span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-white rounded-full transition-all duration-300 group-hover:w-full"></span></Link>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {auth.user ? (
                            <div className="flex items-center gap-5">
                                <Link href={isAdmin ? route('admin.dashboard') : route('customer.dashboard')} className="hidden sm:block text-sm font-medium text-slate-300 hover:text-white transition">
                                    {isAdmin ? 'Admin Console' : 'My Tickets'}
                                </Link>

                                <div className="relative group cursor-pointer">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#e8ff47] to-[#b3c733] p-[1.5px] shadow-[0_0_15px_rgba(232,255,71,0.15)] group-hover:shadow-[0_0_20px_rgba(232,255,71,0.3)] transition-all">
                                        <div className="w-full h-full bg-[#111] rounded-full flex items-center justify-center text-sm font-bold text-white uppercase">
                                            {auth.user.FullName.charAt(0)}
                                        </div>
                                    </div>
                                    <div className="absolute right-0 mt-2 w-56 bg-[#0a0a0a] border border-slate-800 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 overflow-hidden backdrop-blur-xl">
                                        <div className="p-2 flex flex-col">
                                            <div className="px-3 py-3 border-b border-slate-800/80 mb-1">
                                                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Signed in as</p>
                                                <p className="text-sm text-white font-medium truncate">{auth.user.FullName}</p>
                                            </div>
                                            <Link href={route('profile.edit')} className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                                Profile Setup
                                            </Link>
                                            <Link href={route('logout')} method="post" as="button" className="mt-1 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition text-left flex items-center gap-2">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                                                Log Out
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex gap-4 items-center">
                                <Link href={route('login')} className="px-6 py-2.5 bg-white text-black text-sm font-bold rounded-lg hover:bg-[#e8ff47] transition shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_20px_rgba(232,255,71,0.2)]">
                                    Log In
                                </Link>
                            </div>
                        )}
                        <button className="md:hidden text-slate-300 hover:text-white transition"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg></button>
                    </div>
                </div>
            </nav>

            <section className="pt-36 pb-16 px-6 max-w-[1200px] mx-auto flex flex-col items-center text-center">
                <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-6 max-w-4xl">
                    Official Ticketing Platform for Music & Live Events.
                </h1>
                <p className="text-slate-400 text-lg max-w-2xl mb-12 font-medium">Discover live music experiences, secure your spots, and enjoy seamless instant payments across Indonesia.</p>

                <div className="tour-search w-full max-w-3xl bg-[#0a0a0a]/80 backdrop-blur-md p-2 rounded-2xl flex flex-col md:flex-row gap-2 border border-slate-800 shadow-2xl">
                    <div className="flex-1 flex items-center bg-[#111] rounded-xl px-5 py-4 border border-white/5 focus-within:border-[#e8ff47]/50 transition">
                        <svg className="w-5 h-5 text-slate-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <input type="text" placeholder="Search events, artists, or venues..." className="w-full bg-transparent text-white text-sm outline-none placeholder:text-slate-500" />
                    </div>
                    <div className="md:w-48 flex items-center bg-[#111] rounded-xl px-5 py-4 border border-white/5 cursor-pointer hover:bg-[#151515] transition">
                        <span className="text-sm text-slate-400 w-full text-left">All Cities</span>
                        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </div>
                    <button className="bg-[#e8ff47] text-black px-8 py-4 rounded-xl font-bold text-sm hover:bg-white transition-all shadow-[0_0_20px_rgba(232,255,71,0.15)]">Find Events</button>
                </div>
            </section>

            <section className="py-10 border-y border-white/5 bg-[#080808]">
                <div className="max-w-[1200px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 opacity-60 hover:opacity-100 grayscale hover:grayscale-0 transition duration-500">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 whitespace-nowrap">Trusted Event Partners</p>
                    <div className="flex flex-wrap justify-center md:justify-end gap-8 md:gap-16 font-black text-xl md:text-2xl tracking-tighter text-slate-600">
                        <span className="hover:text-white transition cursor-default">SYNCHRONIZE</span>
                        <span className="hover:text-white transition cursor-default">PESTAPORA</span>
                        <span className="hover:text-white transition cursor-default">JOYLAND</span>
                        <span className="hidden sm:block hover:text-white transition cursor-default">HAMMERSONIC</span>
                    </div>
                </div>
            </section>

            <main id="events" className="max-w-[1200px] mx-auto px-6 py-20">
                <div className="mb-20">
                    <div className="flex justify-between items-end mb-8">
                        <h2 className="text-2xl font-black text-white tracking-tight">Featured Experience</h2>
                    </div>
                    
                    {publicEvents.length > 0 ? (
                        <div className="relative aspect-[21/9] md:aspect-[21/7] rounded-[2rem] overflow-hidden group border border-slate-800/80 shadow-2xl">
                            <img src={getImageUrl(publicEvents[0].image || publicEvents[0].BannerImage)} alt={publicEvents[0].title} className="w-full h-full object-cover opacity-70 group-hover:scale-105 transition duration-700" 
                                 onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1540039155733-d7696d4eb98e?w=1600'; }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 to-transparent"></div>
                            
                            <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full flex flex-col md:flex-row justify-between md:items-end gap-8 pointer-events-none">
                                <div className="pointer-events-auto max-w-2xl">
                                    <span className="px-3 py-1.5 text-[10px] font-bold bg-white text-black rounded uppercase tracking-widest mb-5 inline-block shadow-lg">Trending Now</span>
                                    <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4 group-hover:text-[#e8ff47] transition">{publicEvents[0].title}</h3>
                                </div>
                                <div className="pointer-events-auto shrink-0">
                                    <Link 
                                        href={isAdmin ? route('admin.dashboard') : route('checkout.index', { event_id: publicEvents[0].id })}
                                        onClick={() => { if(localStorage.getItem('is_tour_active') === '1') localStorage.setItem('tour_step', 'checkout'); }}
                                        className="tour-get-tickets relative z-20 bg-[#e8ff47] text-black px-10 py-4 rounded-xl font-bold text-sm hover:bg-white transition-all shadow-[0_0_30px_rgba(232,255,71,0.2)] text-center block"
                                    >
                                        {isAdmin ? 'Manage Event' : 'Buy Tickets'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="h-64 rounded-[2rem] border border-dashed border-slate-800 flex items-center justify-center text-slate-500 font-bold uppercase tracking-widest text-sm">
                            No Featured Event Available
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-4 mb-10 overflow-x-auto pb-4 scrollbar-hide">
                    {categories.map((cat) => (
                        <button key={cat} onClick={() => setActiveCategory(cat)} className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition border ${activeCategory === cat ? 'bg-white text-black border-white' : 'bg-transparent text-slate-400 border-slate-800 hover:border-slate-600 hover:text-white'}`}>
                            {cat}
                        </button>
                    ))}
                </div>

                <h2 className="text-2xl font-black text-white tracking-tight mb-8">Upcoming Near You</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {publicEvents.map((event) => (
                        <div key={event.id} className="bg-[#0a0a0a] rounded-2xl overflow-hidden border border-slate-800/80 hover:border-slate-600 transition-all duration-300 flex flex-col shadow-lg">
                            <div className="relative aspect-[4/3] overflow-hidden bg-[#111]">
                                <img src={getImageUrl(event.image || event.BannerImage)} alt={event.title} className="w-full h-full object-cover opacity-80" 
                                     onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800'; }}
                                />
                                <div className="absolute top-4 left-4"><span className="px-3 py-1.5 text-[10px] font-bold bg-black/60 backdrop-blur-md border border-white/10 text-white rounded uppercase tracking-widest">{event.tag || 'Music'}</span></div>
                            </div>
                            <div className="p-6 flex-1 flex flex-col justify-between">
                                <div>
                                    <h3 className="text-xl font-bold text-white leading-tight mb-4 line-clamp-2">{event.title}</h3>
                                    <div className="space-y-3 mb-6">
                                        <p className="text-sm text-slate-400 flex items-center gap-2.5 font-medium">{new Date(event.date || event.EventDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                        <p className="text-sm text-slate-400 flex items-center gap-2.5 font-medium">{event.venue}</p>
                                    </div>
                                </div>
                                <div className="border-t border-slate-800/80 pt-5 flex items-center justify-between mt-auto">
                                    <div>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Price</p>
                                        <p className="text-[#e8ff47] font-mono font-bold text-sm">{event.price || event.Price || 'Check Detail'}</p>
                                    </div>
                                    <Link 
                                        href={isAdmin ? route('admin.dashboard') : route('checkout.index', { event_id: event.id || event.ID })}
                                        onClick={() => { if(localStorage.getItem('is_tour_active') === '1') localStorage.setItem('tour_step', 'checkout'); }}
                                        className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${isAdmin ? 'bg-[#151515] text-slate-300 border border-slate-700' : 'bg-white/5 text-white border border-white/10'}`}
                                    >
                                        {isAdmin ? 'Manage' : 'Get Tickets'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <footer className="border-t border-white/5 bg-[#020202] pt-20 pb-10 px-6 mt-12">
                <div className="max-w-[1200px] mx-auto border-t border-slate-800/80 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-slate-500">
                    <p>© 2026 Eventix Live. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}