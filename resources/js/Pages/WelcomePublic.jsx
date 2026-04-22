import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import Swal from 'sweetalert2';

export default function WelcomePublic() {
    const { auth } = usePage().props;

    const categories = ['All Events', 'Music Festival', 'International Artist', 'Local Artist', 'Theater & Arts'];

    const featuredEvents = [
        { id: 1, title: 'Coldplay - Music of the Spheres', date: '15 Nov 2026', venue: 'Gelora Bung Karno', image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80', price: 'Rp 1.500.000', tag: 'International Artist' },
        { id: 2, title: 'We The Fest 2026', date: '20-22 Jul 2026', venue: 'JIExpo Kemayoran', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80', price: 'Rp 1.200.000', tag: 'Music Festival' },
        { id: 3, title: 'Dewa 19 All Stars Tour', date: '10 Des 2026', venue: 'Stadion Madya', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80', price: 'Rp 500.000', tag: 'Local Artist' },
        { id: 4, title: 'Arctic Monkeys - Asia Tour', date: '25 Jan 2027', venue: 'Beach City', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80', price: 'Rp 1.200.000', tag: 'International Artist' },
    ];

    const handleComingSoon = (e) => {
        e.preventDefault();
        Swal.fire({
            title: '🚀 Coming Soon!',
            text: 'Fitur Checkout & Transaksi sedang dalam tahap pengembangan.',
            icon: 'info',
            background: '#111111',
            color: '#ffffff',
            confirmButtonColor: '#e8ff47',
            confirmButtonText: '<span style="color:black; font-weight:bold;">Tungguin Ya!</span>',
            backdrop: `rgba(0,0,0,0.85)`
        });
    };

    return (
        <div className="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-[#e8ff47] selection:text-black">
            <Head title="EVENTIX - Premium Concert Ticketing Platform" />

            {/* 1. STICKY NAVBAR */}
            <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    {/* Logo (Kembali ke Neon Yellow) */}
                    <div className="flex items-center gap-2">
                        <img src="/images/logo.png" alt="Eventix Logo" className="h-6 object-contain grayscale opacity-80" onError={(e) => e.target.style.display='none'} />
                        <span className="text-xl font-black tracking-tighter text-white uppercase flex items-center gap-1">
                            EVEN<span className="text-[#e8ff47]">TIX</span>
                        </span>
                    </div>

                    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
                        <a href="#" className="text-white">Home</a>
                        <a href="#events" className="hover:text-[#e8ff47] transition-colors">Events</a>
                        <a href="#" onClick={handleComingSoon} className="hover:text-[#e8ff47] transition-colors">My Tickets</a>
                    </div>

                    <div className="flex items-center gap-4">
                        {auth.user ? (
                            <div className="flex items-center gap-4">
                                {auth.user.Role === 'Admin' || auth.user.Role === 'Super Admin' ? (
                                    <Link href={route('admin.dashboard')} className="text-xs font-bold text-gray-400 hover:text-white transition-colors">Admin Console</Link>
                                ) : null}
                                <Link href={route('customer.dashboard')} className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#e8ff47] to-[#b3c733] p-[1px] shadow-[0_0_10px_rgba(232,255,71,0.2)]">
                                        <div className="w-full h-full bg-[#111] rounded-full flex items-center justify-center text-xs font-bold text-white">
                                            {auth.user.FullName.charAt(0)}
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ) : (
                            <>
                                <Link href={route('login')} className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Log In</Link>
                                <Link href={route('register')} className="px-4 py-2 bg-[#e8ff47] text-black text-sm font-bold rounded-lg hover:bg-[#d4ed35] transition-colors hidden sm:block shadow-[0_0_15px_rgba(232,255,71,0.2)]">Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* 2. HERO SECTION */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden flex items-center justify-center min-h-[85vh]">
                <div className="absolute inset-0 z-0">
                    <img src="https://images.unsplash.com/photo-1533174000220-1110a30b42f1?q=80&w=2000" alt="Concert Crowd" className="w-full h-full object-cover opacity-20 mix-blend-luminosity" />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/60 via-[#050505]/90 to-[#050505]"></div>
                </div>
                
                {/* Neon Glow Orbs (Kuning/Hijau khas Eventix) */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#e8ff47]/10 blur-[120px] rounded-full pointer-events-none z-0"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#b3c733]/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
                        <span className="w-2 h-2 rounded-full bg-[#e8ff47] animate-pulse"></span>
                        <span className="text-xs font-medium text-gray-300">Live Ticketing Platform</span>
                    </div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-[1.1] mb-6">
                        Experience Concerts <br />
                        <span className="text-[#e8ff47]">Like Never Before.</span>
                    </h1>
                    
                    <p className="text-lg text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
                        Seamlessly browse, book, and access your favorite live events. Fast checkout, secure payments, and instant QR-code e-tickets directly to your phone.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="#events" className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-[#e8ff47] text-black font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-[0_0_20px_rgba(232,255,71,0.2)]">
                            Explore Events
                        </a>
                        <button onClick={handleComingSoon} className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors backdrop-blur-sm">
                            My Tickets
                        </button>
                    </div>
                </div>
            </section>

            {/* 4. CATEGORY HIGHLIGHT */}
            <section className="max-w-7xl mx-auto px-6 py-8 border-y border-white/5 bg-[#050505]">
                <div className="flex items-center justify-start gap-4 overflow-x-auto no-scrollbar pb-2">
                    {categories.map((cat, index) => (
                        <button key={index} className={`shrink-0 px-5 py-2 rounded-full text-sm font-medium transition-all ${index === 0 ? 'bg-white text-black font-bold' : 'bg-[#111] text-gray-400 hover:text-white border border-white/5 hover:border-white/20'}`}>
                            {cat}
                        </button>
                    ))}
                </div>
            </section>

            {/* 3. FEATURED EVENTS SECTION */}
            <section id="events" className="max-w-7xl mx-auto px-6 py-24 relative">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#e8ff47]/5 blur-[150px] rounded-full pointer-events-none -z-10"></div>

                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tight mb-2">Trending Concerts 🔥</h2>
                        <p className="text-gray-500 text-sm font-medium">Secure your spot at the most anticipated events.</p>
                    </div>
                    <a href="#" className="hidden sm:block text-sm font-bold text-[#e8ff47] hover:underline transition-colors">View all events &rarr;</a>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuredEvents.map((event) => (
                        <div key={event.id} className="group relative bg-[#111] rounded-2xl border border-white/5 overflow-hidden hover:border-[#e8ff47]/30 hover:-translate-y-1 transition-all duration-300 shadow-xl">
                            <div className="aspect-[4/3] relative overflow-hidden bg-[#0a0a0a]">
                                <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent z-10"></div>
                                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100" />
                                <span className="absolute top-3 left-3 z-20 px-2.5 py-1 bg-[#111]/80 backdrop-blur-md border border-white/10 rounded-md text-[9px] uppercase font-black text-[#e8ff47] tracking-widest">
                                    {event.tag}
                                </span>
                            </div>
                            
                            <div className="p-5 relative z-20 flex flex-col h-[180px]">
                                <h3 className="text-base font-bold text-white leading-snug mb-1 line-clamp-2">{event.title}</h3>
                                <p className="text-xs text-gray-500 mb-4 font-medium">{event.date} • {event.venue}</p>
                                
                                <div className="mt-auto flex items-end justify-between">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">Starting from</p>
                                        <p className="text-sm font-black text-white">{event.price}</p>
                                    </div>
                                    <button 
                                        onClick={handleComingSoon}
                                        className="px-4 py-2.5 bg-white/5 hover:bg-[#e8ff47] border border-white/10 hover:border-[#e8ff47] rounded-lg text-xs font-black text-white hover:text-black transition-all uppercase tracking-widest"
                                    >
                                        Buy Ticket
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* 5. WHY CHOOSE EVENTIX */}
            <section className="border-t border-white/5 bg-[#0a0a0a] py-24 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-black text-white tracking-tight mb-4">Built for a Seamless Experience</h2>
                        <p className="text-gray-500 text-sm font-medium">Everything you need to buy and manage your concert tickets without the hassle.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Features dengan icon warna seragam neon Eventix */}
                        {[
                            { title: 'Fast Checkout', desc: 'Book your tickets in seconds with our optimized flow designed to handle high-traffic ticket wars.', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                            { title: 'Secure Payment', desc: 'Integrated with Midtrans for enterprise-grade security on all your credit card and e-wallet transactions.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                            { title: 'QR Code E-Ticket', desc: 'No need to print. Your e-ticket with a unique QR code is safely stored in your dashboard.', icon: 'M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z' },
                            { title: 'Real-Time Sync', desc: 'Ticket availability is synced in real-time across all servers to prevent double bookings.', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' }
                        ].map((feat, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[#111] border border-white/5 hover:border-[#e8ff47]/20 transition-colors">
                                <div className="w-12 h-12 rounded-xl bg-[#e8ff47]/10 border border-[#e8ff47]/20 flex items-center justify-center text-[#e8ff47] mb-6 shadow-inner">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={feat.icon}></path></svg>
                                </div>
                                <h4 className="text-base font-bold text-white mb-2">{feat.title}</h4>
                                <p className="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. CLEAN FOOTER */}
            <footer className="border-t border-white/5 bg-[#050505] pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
                        <div className="flex items-center gap-2">
                            <span className="text-xl font-black tracking-tighter text-white uppercase">
                                EVEN<span className="text-[#e8ff47]">TIX</span>
                            </span>
                        </div>
                        <div className="flex gap-6 text-sm font-medium text-gray-500">
                            <a href="#" className="hover:text-[#e8ff47] transition-colors">About</a>
                            <a href="#" className="hover:text-[#e8ff47] transition-colors">Contact</a>
                            <a href="#" className="hover:text-[#e8ff47] transition-colors">Privacy Policy</a>
                            <a href="#" className="hover:text-[#e8ff47] transition-colors">Terms of Service</a>
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-600 font-bold uppercase tracking-widest">
                        <p>&copy; 2026 EVENTIX Technologies.</p>
                        <div className="flex gap-4">
                            <a href="#" className="hover:text-white transition-colors">Twitter</a>
                            <a href="#" className="hover:text-white transition-colors">Instagram</a>
                            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}