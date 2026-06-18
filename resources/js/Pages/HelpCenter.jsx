import React, { useState } from 'react';
import { Head, Link, router, usePage } from '@inertiajs/react';

export default function HelpCenter() {
    const { auth } = usePage().props;
    const isAdmin = auth.user && (auth.user.Role === 'Admin' || auth.user.Role === 'Super Admin');

    const [searchQuery, setSearchQuery] = useState('');
    const [openFaq, setOpenFaq] = useState(null); 
    const [activeGuide, setActiveGuide] = useState(null); 

    const tutorials = [
        { 
            id: 1, 
            title: 'Tutorial Login & Registrasi', 
            url: 'https://drive.google.com/file/d/1wjUfNrFTwdROkXDMzqfMTV8wljaYv73U/preview', 
            duration: '2 min', 
            level: 'Beginner' 
        },
        { 
            id: 2, 
            title: 'Panduan Pembayaran (Midtrans)', 
            url: 'https://drive.google.com/file/d/1rropWiuAzLw6CcLvyZKmrNGC1HRkPuUL/preview', 
            duration: '3 min', 
            level: 'Beginner' 
        },
        { 
            id: 3, 
            title: 'Manajemen Dashboard Admin', 
            url: 'https://drive.google.com/file/d/1vREnr9X21YQHlRZlTjpi9hjRGICNH9uC/preview', 
            duration: '5 min', 
            level: 'Organizer' 
        },
    ];

    // --- STEP-BY-STEP VISUAL GUIDES DATA
    const visualGuides = [
        {
            id: 1,
            title: 'Cara Login & Pendaftaran',
            stepsCount: 2,
            time: '1 Menit',
            icon: '👋',
            steps: [
                { desc: 'Klik tombol "Log In" atau "Sign Up" di pojok kanan atas pada menu navigasi.', img: '/images/guide-login-1.png' },
                { desc: 'Pilih metode "Continue with Google" untuk pendaftaran cepat tanpa perlu menghafal password.', img: '/images/guide-login-2.png' }
            ]
        },
        {
            id: 2,
            title: 'Cara Membeli Tiket Event',
            stepsCount: 3,
            time: '2 Menit',
            icon: '🎟️',
            steps: [
                { desc: 'Pilih event yang ingin dihadiri (contoh: Prambanan Jazz Festival) lalu klik "Get Tickets".', img: '/images/guide-buy-1.png' },
                { desc: 'Pilih kategori tiket yang tersedia (contoh: Early Bird) dan atur kuantitas (Quantity) tiket.', img: '/images/guide-buy-2.png' },
                { desc: 'Periksa total harga tiket dan klik tombol "Proceed to Payment" untuk melanjutkan.', img: '/images/guide-buy-3.png' }
            ]
        },
        {
            id: 3,
            title: 'Cara Pembayaran (Midtrans)',
            stepsCount: 4,
            time: '3 Menit',
            icon: '💳',
            steps: [
                { desc: 'Pada halaman Upcoming Events, pastikan status tiket "PENDING", lalu klik tombol "Pay Now".', img: '/images/guide-pay-1.png' },
                { desc: 'Sistem Midtrans akan muncul. Pilih metode pembayaran yang Anda inginkan (Virtual Account, QRIS, dll).', img: '/images/guide-pay-2.png' },
                { desc: 'Salin nomor Virtual Account yang tertera dan selesaikan pembayaran melalui m-Banking/ATM.', img: '/images/guide-pay-3.png' },
                { desc: 'Tunggu hingga muncul layar konfirmasi "Payment successful" berwarna hijau.', img: '/images/guide-pay-4.png' }
            ]
        },
        {
            id: 4,
            title: 'Lihat QR E-Ticket',
            stepsCount: 2,
            time: '1 Menit',
            icon: '📱',
            steps: [
                { desc: 'Setelah pembayaran berhasil, klik menu "My Tickets" pada bagian atas website.', img: '/images/guide-qr-1.png' },
                { desc: 'Cari tiket Anda. Jika pembayaran telah terverifikasi, tombol akan berubah menjadi "View Ticket" untuk melihat QR Code.', img: '/images/guide-qr-2.png' }
            ]
        },
        {
            id: 5,
            title: 'Kelola Event (Organizer)',
            stepsCount: 2,
            time: '3 Menit',
            icon: '📊',
            steps: [
                { desc: 'Masuk ke Dashboard Admin, pilih menu Events, lalu klik tombol "Manage" pada event yang ingin dikelola.', img: '/images/guide-admin-1.png' },
                { desc: 'Di dalam menu Manage, Anda dapat mengawasi penjualan tiket atau menekan tombol "+ Create Tier" untuk menambah kategori.', img: '/images/guide-admin-2.png' }
            ]
        }
    ];

    // --- FAQ DATA ---
    const faqs = [
        { q: 'Bagaimana cara membeli tiket?', a: 'Klik Explore → Pilih Event → Get Tickets → Pilih Kategori → Checkout.' },
        { q: 'Di mana saya bisa melihat QR Ticket saya?', a: 'Pastikan Anda sudah login, lalu pilih menu My Tickets di pojok kanan atas → klik tombol View Ticket pada tiket berstatus PAID.' },
        { q: 'Metode pembayaran apa saja yang didukung?', a: 'Sistem kami terintegrasi dengan Midtrans yang menerima berbagai pembayaran instan termasuk QRIS (GoPay, ShopeePay), Virtual Account Bank, dan Kartu Kredit.' },
        { q: 'Apakah tiket yang sudah dibeli bisa direfund?', a: 'Secara umum tiket bersifat Non-Refundable. Pengembalian dana hanya dilakukan mengikuti kebijakan dan syarat dari masing-masing penyelenggara acara.' },
    ];

    // Filter Visual Guides berdasarkan Search
    const filteredGuides = visualGuides.filter(guide => 
        guide.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleStartTour = () => {
        localStorage.setItem('start_tour_from_help', '1');
        router.visit('/');
    };

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-[#e8ff47] selection:text-black relative">
            <Head title="Help Center | Eventix" />

            {/* NAVBAR */}
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
                            <Link href="/#events" className="text-slate-400 hover:text-white transition-colors relative group">Explore</Link>
                            <a href="#" className="text-slate-400 hover:text-white transition-colors relative group">Cities</a>
                            <Link href={route('help-center')} className="text-white relative group">Help Center<span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-[#e8ff47] rounded-full"></span></Link>
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
                                            <Link href={route('profile.edit')} className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition">Profile Setup</Link>
                                            <Link href={route('logout')} method="post" as="button" className="mt-1 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition text-left">Log Out</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex gap-4 items-center">
                                <Link href={route('login')} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Log In</Link>
                                <Link href={route('register')} className="px-5 py-2.5 bg-white text-black text-sm font-bold rounded-lg hover:bg-[#e8ff47] transition hidden sm:block">Sign Up</Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* HEADER */}
            <header className="pt-36 pb-8 px-6 border-b border-white/5 bg-[#0a0a0a]">
                <div className="max-w-3xl mx-auto text-center">
                    <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Help Center</h1>
                    <p className="text-sm text-slate-400 mb-6">Find guides, tutorials, and platform documentation.</p>
                    
                    <div className="relative max-w-xl mx-auto">
                        <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                        <input 
                            type="text" 
                            placeholder="Search guides (e.g., 'pembayaran' atau 'tiket')..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-[#111] border border-slate-800 rounded-xl py-3 pl-11 pr-4 text-sm text-white focus:outline-none focus:border-[#e8ff47]/50 transition shadow-inner"
                        />
                    </div>
                </div>
            </header>

            <div className="max-w-[1100px] mx-auto px-6 py-12 space-y-16">

                {/* QUICK ACTIONS */}
                <section>
                    <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div onClick={handleStartTour} className="relative bg-[#0d0d0d] border border-slate-800/80 p-5 rounded-xl hover:border-[#e8ff47]/40 cursor-pointer transition flex items-center gap-4 group">
                            <span className="absolute -top-2.5 right-4 px-2 py-0.5 text-[9px] font-black bg-[#e8ff47] text-black uppercase tracking-widest rounded-sm shadow-md">Most Popular</span>
                            <div className="text-white group-hover:text-[#e8ff47] transition">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white mb-0.5">Start Interactive Tour</h3>
                                <p className="text-xs text-slate-500">Live platform walkthrough.</p>
                            </div>
                        </div>

                        <div onClick={() => scrollToSection('videos')} className="bg-[#0d0d0d] border border-slate-800/80 p-5 rounded-xl hover:border-slate-600 cursor-pointer transition flex items-center gap-4 group">
                            <div className="text-white group-hover:text-white transition">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white mb-0.5">Watch Tutorials</h3>
                                <p className="text-xs text-slate-500">Video panduan penggunaan.</p>
                            </div>
                        </div>

                        <div onClick={() => scrollToSection('guides')} className="bg-[#0d0d0d] border border-slate-800/80 p-5 rounded-xl hover:border-slate-600 cursor-pointer transition flex items-center gap-4 group">
                            <div className="text-white group-hover:text-white transition">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                            </div>
                            <div>
                                <h3 className="text-sm font-bold text-white mb-0.5">Visual Guides</h3>
                                <p className="text-xs text-slate-500">Panduan step-by-step.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* VIDEO TUTORIALS */}
                <section id="videos">
                    <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Video Tutorials</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {tutorials.map(tut => (
                            <div key={tut.id} className="bg-[#0d0d0d] border border-slate-800/80 rounded-xl overflow-hidden shadow-lg group">
                                
                                {/* IFRAME GOOGLE DRIVE POLOS BIAR BISA DI-KLIK */}
                                <div className="aspect-video bg-[#111] relative overflow-hidden">
                                    <iframe 
                                        className="w-full h-full absolute inset-0" 
                                        src={tut.url} 
                                        title={tut.title} 
                                        frameBorder="0" 
                                        allow="autoplay" 
                                        allowFullScreen>
                                    </iframe>
                                </div>

                                <div className="p-4 flex flex-col justify-between border-t border-slate-800/50">
                                    <h3 className="text-sm font-bold text-white mb-2">{tut.title}</h3>
                                    <div className="flex items-center gap-2">
                                        <span className="text-[10px] font-bold text-slate-300 bg-white/5 px-2 py-0.5 rounded">{tut.duration}</span>
                                        <span className="text-[10px] text-slate-500">•</span>
                                        <span className="text-[10px] font-medium text-slate-500">{tut.level}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* STEP-BY-STEP VISUAL GUIDES */}
                <section id="guides">
                    <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Step-by-Step Visual Guides</h2>
                    {filteredGuides.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredGuides.map(guide => (
                                <div key={guide.id} onClick={() => setActiveGuide(guide)} className="bg-[#0a0a0a] border border-slate-800/80 p-5 rounded-xl hover:border-slate-600 cursor-pointer transition flex items-center gap-4 group">
                                    <div className="text-2xl">{guide.icon}</div>
                                    <div>
                                        <h3 className="text-sm font-bold text-white mb-0.5 group-hover:text-[#e8ff47] transition">{guide.title}</h3>
                                        <p className="text-xs text-slate-500">{guide.stepsCount} Langkah Lengkap</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-sm text-slate-500 text-center py-8 border border-dashed border-slate-800 rounded-xl">Panduan "{searchQuery}" tidak ditemukan.</p>
                    )}
                </section>

                {/* FAQ */}
                <section>
                    <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Frequently Asked Questions</h2>
                    <div className="border-t border-slate-800">
                        {faqs.map((faq, index) => (
                            <div key={index} className="border-b border-slate-800">
                                <button 
                                    onClick={() => toggleFaq(index)}
                                    className="w-full text-left py-4 flex items-center justify-between hover:text-white transition group"
                                >
                                    <span className="text-sm font-medium text-slate-300 group-hover:text-white">{faq.q}</span>
                                    <svg className={`w-4 h-4 text-slate-500 transition-transform duration-200 ${openFaq === index ? 'rotate-180 text-[#e8ff47]' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 max-h-0 ${openFaq === index ? 'max-h-40 pb-4' : ''}`}>
                                    <p className="text-sm text-slate-500 leading-relaxed pr-8">{faq.a}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* OFFICIAL DOCUMENTATION */}
                <section id="download-pdf" className="bg-[#0a0a0a] border border-slate-800/80 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
                    <div className="text-left">
                        <h3 className="text-lg font-bold text-white mb-1">Official Documentation</h3>
                        <p className="text-sm text-slate-500">Download our complete system documentation and guidelines.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <a href="/Manual-Book-Eventix.pdf" download className="px-6 py-3 bg-white text-black text-sm font-bold rounded-xl hover:bg-[#e8ff47] transition">
                            Download User Guide
                        </a>
                    </div>
                </section>

            </div>

            <footer className="border-t border-white/5 bg-[#020202] py-8 text-center text-xs text-slate-500 font-medium">
                <p>© 2026 Eventix Live. Documentation & Support Center.</p>
            </footer>

            {/* MODAL UNTUK VISUAL GUIDES */}
            {activeGuide && (
                <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm overflow-y-auto p-4 md:p-10 flex justify-center items-start animate-in fade-in duration-200">
                    <div className="bg-[#0a0a0a] border border-slate-800 rounded-2xl w-full max-w-3xl relative mt-10 mb-10 shadow-2xl">
                        <button onClick={() => setActiveGuide(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white bg-[#111] hover:bg-slate-800 rounded-full w-8 h-8 flex items-center justify-center transition z-50">✕</button>
                        
                        <div className="p-6 md:p-8 border-b border-slate-800">
                            <h2 className="text-2xl font-black text-white">{activeGuide.title}</h2>
                            <p className="text-sm text-slate-400 mt-2">Estimated Time: {activeGuide.time}</p>
                        </div>
                        
                        <div className="p-6 md:p-8 space-y-12">
                            {activeGuide.steps.map((step, idx) => (
                                <div key={idx} className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-[#e8ff47] text-black text-xs font-bold flex items-center justify-center shrink-0">
                                            {idx + 1}
                                        </div>
                                        <h3 className="text-base font-bold text-white uppercase tracking-wider">Langkah {idx + 1}</h3>
                                    </div>
                                    <div className="bg-[#111] border border-slate-800 rounded-xl overflow-hidden relative">
                                        <img src={step.img} alt={`Step ${idx + 1}`} className="w-full h-auto object-contain opacity-90" onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80'; }} />
                                    </div>
                                    <p className="text-sm text-slate-300 leading-relaxed border-l-2 border-[#e8ff47]/50 pl-4">{step.desc}</p>
                                </div>
                            ))}
                        </div>
                        
                        <div className="p-6 border-t border-slate-800 text-center">
                            <button onClick={() => setActiveGuide(null)} className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-[#e8ff47] transition">Tutup Panduan</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}