import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function WelcomePublic({ publicEvents = [] }) {
    const { auth } = usePage().props;

    // Logika cek apakah user adalah Admin
    const isAdmin = auth.user && (auth.user.Role === 'Admin' || auth.user.Role === 'Super Admin');

    return (
        <div className="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-[#e8ff47] selection:text-black">
            <Head title="EVENTIX - Premium Concert Ticketing Platform" />

            {/* Navigation Bar */}
            <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-black tracking-tighter text-white uppercase flex items-center gap-1">
                            EVEN<span className="text-[#e8ff47]">TIX</span>
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                        <Link href="/" className="text-white">Home</Link>
                        <a href="#events" className="hover:text-[#e8ff47] transition-colors">Events</a>
                        <Link href={route('customer.dashboard')} className="hover:text-[#e8ff47] transition-colors">My Tickets</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <div className="flex items-center gap-4">
                                {isAdmin && (
                                    <Link href={route('admin.dashboard')} className="text-xs font-bold text-gray-400 hover:text-white transition-colors">Admin Console</Link>
                                )}
                                <Link href={isAdmin ? route('admin.dashboard') : route('customer.dashboard')} className="flex items-center gap-2 hover:scale-105 transition-transform">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#e8ff47] to-[#b3c733] p-[1px] shadow-[0_0_10px_rgba(232,255,71,0.2)]">
                                        <div className="w-full h-full bg-[#111] rounded-full flex items-center justify-center text-xs font-bold text-white uppercase">
                                            {auth.user.FullName.charAt(0)}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Link href={route('login')} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Log In</Link>
                                <Link href={route('register')} className="px-4 py-2 bg-[#e8ff47] text-black text-sm font-bold rounded-lg hover:bg-[#d4ed35] transition-colors hidden sm:block">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex items-center justify-center min-h-[80vh]">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1533174000220-1110a30b42f1?q=80&w=2000" alt="Concert" className="w-full h-full object-cover opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 to-[#050505]"></div>
                </div>
                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-6">
                        Experience Concerts <br />
                        <span className="text-[#e8ff47]">Like Never Before.</span>
                    </h1>
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 font-medium">Platform reservasi tiket konser terpercaya dengan sistem pembayaran instan.</p>
                    <div className="flex justify-center gap-4">
                        <a href="#events" className="px-8 py-3.5 rounded-xl bg-[#e8ff47] text-black font-black uppercase tracking-widest text-xs hover:scale-105 transition-all shadow-[0_0_20px_rgba(232,255,71,0.2)]">Explore Events</a>
                    </div>
                </div>
            </section>

            {/* EVENTS SECTION */}
            <section id="events" className="max-w-7xl mx-auto px-6 py-24">
                <h2 className="text-3xl font-black text-white tracking-tight mb-12 uppercase flex items-center gap-3">
                    Trending Concerts <span className="animate-bounce">🔥</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {publicEvents.map((event) => (
                        <div key={event.id} className="group relative bg-[#111] rounded-2xl border border-white/5 overflow-hidden hover:border-[#e8ff47]/30 transition-all flex flex-col h-full shadow-2xl">
                            {/* Image Container */}
                            <div className="aspect-[4/3] relative overflow-hidden bg-[#0a0a0a]">
                                <img 
                                    src={event.image} 
                                    alt={event.title} 
                                    className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:opacity-100 transition-all duration-500" 
                                />
                                <span className="absolute top-3 left-3 px-2 py-1 bg-[#050505]/90 backdrop-blur-md rounded text-[9px] font-black text-[#e8ff47] uppercase tracking-widest border border-[#e8ff47]/20">
                                    {event.tag}
                                </span>
                            </div>

                            {/* Content Container */}
                            <div className="p-5 flex flex-col flex-1 justify-between gap-4">
                                <div>
                                    <h3 className="text-sm font-bold text-white mb-2 line-clamp-2 group-hover:text-[#e8ff47] transition-colors">{event.title}</h3>
                                    <div className="flex flex-col gap-1">
                                        <p className="text-[10px] text-gray-500 uppercase flex items-center gap-1 font-bold">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                                            {event.date}
                                        </p>
                                        <p className="text-[10px] text-gray-500 uppercase flex items-center gap-1">
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                            {event.venue}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                                    <div>
                                        <p className="text-[9px] text-gray-500 uppercase font-black">Price</p>
                                        <p className="text-sm font-black text-white">{event.price}</p>
                                    </div>
                                    
                                    {/* TOMBOL DINAMIS */}
                                    <Link 
                                        href={isAdmin ? route('admin.dashboard') : route('checkout.index', event.id)}
                                        className={`px-4 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                                            isAdmin 
                                            ? 'bg-white/5 text-gray-400 border border-white/10 hover:text-[#e8ff47] hover:border-[#e8ff47] hover:bg-[#e8ff47]/10' 
                                            : 'bg-[#e8ff47] text-black hover:bg-white hover:scale-105 shadow-[0_0_15px_rgba(232,255,71,0.2)]'
                                        }`}
                                    >
                                        {isAdmin ? 'Manage' : 'Get Tickets'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}