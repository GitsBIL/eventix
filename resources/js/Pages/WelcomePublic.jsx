import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

export default function WelcomePublic() {
    // Tarik data auth dari sistem secara global
    const { auth } = usePage().props;

    // Data Dummy Event Konser
    const featuredEvents = [
        { id: 1, title: 'Coldplay - Music of the Spheres', date: '15 Nov 2026', venue: 'Gelora Bung Karno', image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=600', price: 'Rp 1.500.000' },
        { id: 2, title: 'Bruno Mars: 24K Magic Live', date: '01 Des 2026', venue: 'JIS, Jakarta', image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600', price: 'Rp 2.100.000' },
        { id: 3, title: 'Dewa 19 All Stars Tour', date: '10 Des 2026', venue: 'Stadion Madya', image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600', price: 'Rp 500.000' },
        { id: 4, title: 'Arctic Monkeys - Asia Tour', date: '25 Jan 2027', venue: 'Beach City International', image: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5f9af?w=600', price: 'Rp 1.200.000' },
    ];

    return (
        <div className="min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-[#e8ff47] selection:text-black">
            <Head title="Eventix - Official Ticketing Platform" />

            {/* 🌟 NAVBAR CLEAN & PROFESSIONAL */}
            <nav className="sticky top-0 w-full z-50 bg-[#050505]/95 backdrop-blur-md border-b border-white/5 px-4 md:px-8 h-16 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <img src="/images/logo.png" alt="Eventix Logo" className="h-6 object-contain" onError={(e) => e.target.style.display='none'} />
                    <span className="text-lg font-black tracking-tighter text-white uppercase">
                        EVEN<span className="text-[#e8ff47]">TIX</span>
                    </span>
                </div>
                
                <div className="flex items-center gap-4">
                    {auth.user ? (
                        <div className="flex items-center gap-3">
                            <div className="hidden md:block text-xs font-bold text-gray-400">
                                Hi, {auth.user.FullName}
                            </div>
                            
                            {/* Tombol Khusus Admin */}
                            {auth.user.Role === 'Admin' || auth.user.Role === 'Super Admin' ? (
                                <Link href={route('admin.dashboard')} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white hover:bg-white hover:text-black transition-all">
                                    Admin Panel
                                </Link>
                            ) : null}

                            {/* Tombol My Tickets buat user */}
                            <Link href={route('customer.dashboard')} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white hover:bg-white hover:text-black transition-all">
                                My Tickets
                            </Link>

                            <Link href={route('logout')} method="post" as="button" className="px-4 py-1.5 bg-red-500/10 border border-red-500/20 rounded-full text-[10px] font-bold text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                Log Out
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            {/* Tombol Log In Normal */}
                            <Link href={route('login')} className="px-6 py-2 font-black text-black bg-[#e8ff47] hover:bg-[#d4ed35] rounded-full text-[11px] uppercase tracking-wider transition-colors shadow-lg">
                                Log In
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            <main className="max-w-md md:max-w-5xl mx-auto px-4 mt-8 pb-16">
                
                {/* 🔍 SEARCH BAR COMPACT */}
                <div className="w-full bg-[#111111] border border-white/10 rounded-2xl p-1.5 flex items-center shadow-lg mb-10 focus-within:border-[#e8ff47]/50 transition-colors">
                    <span className="pl-4 pr-2 text-gray-500">🔍</span>
                    <input type="text" placeholder="Cari konser atau artis..." className="flex-1 bg-transparent border-none text-white text-sm focus:ring-0 px-2 placeholder-gray-600" />
                    <button className="bg-[#e8ff47] text-black px-6 py-2.5 rounded-xl font-bold text-xs hover:bg-[#d4ed35] transition-colors uppercase tracking-wider">
                        Cari
                    </button>
                </div>

                {/* 🎟️ PROMO BANNER */}
                <div className="w-full h-32 md:h-48 rounded-3xl bg-gradient-to-r from-[#1a1a2e] to-[#16213e] mb-12 overflow-hidden relative flex items-center px-6 md:px-12 border border-white/5 shadow-2xl">
                    <div className="relative z-10">
                        <span className="bg-[#e8ff47] text-black text-[9px] font-black px-3 py-1 rounded-md mb-3 inline-block uppercase tracking-widest shadow-lg">Promo Spesial</span>
                        <h2 className="text-white font-black text-2xl md:text-4xl max-w-[200px] md:max-w-md leading-tight">Diskon 20% BCA Mastercard</h2>
                    </div>
                    {/* Hiasan Efek Cahaya */}
                    <div className="absolute right-0 top-0 w-1/2 h-full bg-white/5 blur-2xl transform skew-x-12"></div>
                </div>

                {/* 📋 LIST EVENT KONSER */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-xl font-black text-white tracking-tight">Konser Trending 🔥</h3>
                        <a href="#" className="text-[#e8ff47] text-xs font-bold hover:underline">Lihat Semua</a>
                    </div>

                    {/* Container Scroll */}
                    <div className="flex overflow-x-auto snap-x snap-mandatory gap-5 pb-6 no-scrollbar md:grid md:grid-cols-4">
                        {featuredEvents.map((event) => (
                            <div key={event.id} className="min-w-[260px] md:min-w-0 bg-[#0C0F16] border border-white/5 rounded-3xl overflow-hidden snap-start flex flex-col shadow-xl hover:border-white/20 transition-all">
                                <div className="h-36 bg-[#111] relative">
                                    <img src={event.image} alt={event.title} className="w-full h-full object-cover opacity-80" />
                                </div>
                                <div className="p-5 flex flex-col flex-1">
                                    <h4 className="text-white font-bold text-sm mb-1 leading-snug line-clamp-2">{event.title}</h4>
                                    <p className="text-gray-500 text-[10px] font-medium mb-4">{event.date} • {event.venue}</p>
                                    
                                    <div className="mt-auto flex items-end justify-between">
                                        <div>
                                            <p className="text-gray-600 text-[9px] uppercase tracking-widest font-bold">Mulai dari</p>
                                            <p className="text-[#e8ff47] font-black text-base">{event.price}</p>
                                        </div>
                                    </div>
                                    <Link href={auth.user ? route('customer.dashboard') : route('login')} className="mt-5 w-full block text-center bg-white text-black font-black py-2.5 rounded-xl text-xs hover:bg-gray-200 transition-colors uppercase tracking-widest shadow-md">
                                        Pesan Tiket
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </main>

            {/* 🧾 FOOTER PROFESSIONAL */}
            <footer className="bg-[#050505] border-t border-white/5 pt-16 pb-8 mt-10">
                <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                    
                    {/* Kolom 1: Brand Info */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <img src="/images/logo.png" alt="Eventix Logo" className="h-6 object-contain grayscale opacity-80" onError={(e) => e.target.style.display='none'} />
                            <span className="text-xl font-black tracking-tighter text-white uppercase opacity-90">
                                EVEN<span className="text-[#e8ff47]">TIX</span>
                            </span>
                        </div>
                        <p className="text-gray-500 text-xs leading-relaxed max-w-sm font-medium">
                            Platform war tiket konser tercepat, transparan, dan paling aman di Indonesia. Dapatkan akses ke berbagai acara eksklusif tanpa ribet dan antrean panjang.
                        </p>
                    </div>

                    {/* Kolom 2: Perusahaan */}
                    <div>
                        <h4 className="text-white font-bold text-xs mb-5 uppercase tracking-widest">Perusahaan</h4>
                        <ul className="space-y-3 text-xs text-gray-500 font-medium">
                            <li><a href="#" className="hover:text-[#e8ff47] transition-colors">Tentang Kami</a></li>
                            <li><a href="#" className="hover:text-[#e8ff47] transition-colors">Karir</a></li>
                            <li><a href="#" className="hover:text-[#e8ff47] transition-colors">Hubungi Kami</a></li>
                            <li><a href="#" className="hover:text-[#e8ff47] transition-colors">Blog</a></li>
                        </ul>
                    </div>

                    {/* Kolom 3: Dukungan */}
                    <div>
                        <h4 className="text-white font-bold text-xs mb-5 uppercase tracking-widest">Dukungan</h4>
                        <ul className="space-y-3 text-xs text-gray-500 font-medium">
                            <li><a href="#" className="hover:text-[#e8ff47] transition-colors">Pusat Bantuan</a></li>
                            <li><a href="#" className="hover:text-[#e8ff47] transition-colors">Syarat & Ketentuan</a></li>
                            <li><a href="#" className="hover:text-[#e8ff47] transition-colors">Kebijakan Privasi</a></li>
                            <li><a href="#" className="hover:text-[#e8ff47] transition-colors">Cara Pembelian</a></li>
                        </ul>
                    </div>

                </div>

                {/* Garis Bawah & Copyright */}
                <div className="max-w-5xl mx-auto px-4 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[9px] text-gray-600 tracking-[0.2em] font-bold uppercase">
                        &copy; 2026 EVENTIX TECHNOLOGIES. ALL RIGHTS RESERVED.
                    </p>
                    
                    {/* Social Media Links (Teks Simple) */}
                    <div className="flex gap-4 text-xs font-bold text-gray-500 uppercase tracking-widest">
                        <a href="#" className="hover:text-[#e8ff47] transition-colors">IG</a>
                        <a href="#" className="hover:text-[#e8ff47] transition-colors">TW</a>
                        <a href="#" className="hover:text-[#e8ff47] transition-colors">FB</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}