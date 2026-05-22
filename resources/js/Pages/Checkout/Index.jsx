import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import axios from 'axios';

export default function Checkout({ event, tickets }) {
    const [isProcessing, setIsProcessing] = useState(false);
    
    // STATE BARU: Objek untuk nyimpen quantity per tiket secara independen
    // Contoh bentuk datanya: { 1: 2, 2: 0, 3: 1 } (ID Tiket: Jumlah)
    const [quantities, setQuantities] = useState({});

    // Fungsi pintar buat benerin format tanggal database jadi tanggal manusia
    const formatDateTime = (dbDate) => {
        if (!dbDate) return 'TBA';
        try {
            const dateObj = new Date(dbDate);
            if (isNaN(dateObj.getTime())) return dbDate;
            
            const options = { day: '2-digit', month: 'short', year: 'numeric' };
            const datePart = dateObj.toLocaleDateString('en-GB', options);
            
            const hours = String(dateObj.getHours()).padStart(2, '0');
            const minutes = String(dateObj.getMinutes()).padStart(2, '0');
            
            return `${datePart} • ${hours}:${minutes} WIB`;
        } catch (e) {
            return dbDate;
        }
    };

    // Auto-fix Path ke Folder Storage Laravel
    const rawImage = event.image || event.BannerImage;
    let bannerImage = 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1600'; 
    if (rawImage) {
        if (rawImage.startsWith('http')) bannerImage = rawImage;
        else if (rawImage.startsWith('/storage/')) bannerImage = rawImage;
        else if (rawImage.startsWith('storage/')) bannerImage = `/${rawImage}`;
        else bannerImage = `/storage/${rawImage}`; 
    }

    // Fungsi nambah/ngurangin jumlah per spesifik tiket
    const updateQuantity = (ticketId, delta) => {
        setQuantities(prev => {
            const currentQty = prev[ticketId] || 0;
            const newQty = Math.max(0, Math.min(5, currentQty + delta));
            return { ...prev, [ticketId]: newQty };
        });
    };

    // Kalau judul card di klik, paksa jadi 1 kalau tadinya 0
    const handleTicketSelect = (ticketId) => {
        setQuantities(prev => {
            // Kalau tiket lain yang diklik, reset yang lama, aktifin yang baru jadi 1
            return { [ticketId]: prev[ticketId] > 0 ? prev[ticketId] : 1 };
        });
    };

    // Hitung tiket mana yang lagi aktif (yang quantity-nya > 0)
    // Di sistem ini kita asumsikan user cuma bisa beli 1 JENIS kategori dalam 1 transaksi
    const activeTicketId = Object.keys(quantities).find(id => quantities[id] > 0);
    const activeTicket = tickets.find(t => (t.id || t.ID).toString() === activeTicketId);
    const activeQuantity = activeTicket ? quantities[activeTicketId] : 0;
    const totalPrice = activeTicket ? Number(activeTicket.Price) * activeQuantity : 0;

    const handlePayment = async () => {
        if (!activeTicket || activeQuantity <= 0) {
            alert("Please choose a ticket category and quantity first!");
            return;
        }

        setIsProcessing(true);
        try {
            const response = await axios.post(route('checkout.store', { event_id: event.id || event.ID }), {
                ticket_id: activeTicket.id || activeTicket.ID,
                quantity: activeQuantity
            });

            if (response.data.status === 'success') {
                window.snap.pay(response.data.snap_token, {
                    onSuccess: function(result){
                        alert("Payment Successful!");
                        router.visit(route('customer.dashboard'));
                    },
                    onPending: function(result){
                        alert("Awaiting Payment!");
                        router.visit(route('customer.dashboard'));
                    },
                    onError: function(result){
                        alert("Payment Failed!");
                        setIsProcessing(false);
                    },
                    onClose: function(){
                        alert('You closed the popup before finishing the payment.');
                        setIsProcessing(false);
                    }
                });
            }
        } catch (error) {
            console.error("Error Detail:", error.response);
            const errorMsg = error.response?.data?.message || 'Failed connecting to Midtrans.';
            alert('SYSTEM ERROR: ' + errorMsg);
            setIsProcessing(false);
        }
    };

    // Helper fungsi buat bedain style & teks tiap tiket
    const getTicketStyle = (ticketName) => {
        const name = ticketName.toLowerCase();
        if (name.includes('vvip')) return { badge: 'MOST POPULAR', badgeColor: 'bg-amber-500 text-black', quota: 'Only 4 tickets left', subtext: 'Best View Access' };
        if (name.includes('vip')) return { badge: 'PREMIUM', badgeColor: 'bg-purple-500 text-white', quota: 'Selling Fast', subtext: 'Front Row Access' };
        if (name.includes('early')) return { badge: 'LIMITED', badgeColor: 'bg-emerald-500 text-black', quota: 'Almost Sold Out', subtext: 'Special Promo Price' };
        return { badge: '', badgeColor: '', quota: 'Available', subtext: 'General Admission' };
    };

    return (
        <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-[#e8ff47] selection:text-black pb-24">
            <Head title={`Secure Checkout - ${event.title || event.EventName}`} />

            <nav className="fixed top-0 w-full z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="text-xl font-black tracking-tighter text-white uppercase">
                        EVEN<span className="text-[#e8ff47]">TIX</span>
                    </Link>
                    <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest transition">Cancel Order</Link>
                </div>
            </nav>

            <main className="max-w-[1200px] mx-auto px-6 pt-32">
                <div className="flex flex-col lg:flex-row gap-12">
                    
                    {/* LEFT PANEL: EVENT DETAILS */}
                    <div className="w-full lg:w-[60%] space-y-8">
                        <div className="relative aspect-[16/9] md:aspect-[21/9] lg:aspect-video rounded-3xl overflow-hidden border border-slate-800/80 shadow-2xl bg-[#111]">
                            <img 
                                src={bannerImage} 
                                alt={event.title || event.EventName} 
                                className="w-full h-full object-cover" 
                                onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1600'; }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/80 to-transparent"></div>
                            
                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-2.5 py-1 text-[9px] font-black bg-red-600 text-white rounded uppercase tracking-widest animate-pulse">Live Event</span>
                                    <span className="px-2.5 py-1 text-[9px] font-black bg-white/10 backdrop-blur-md border border-white/20 text-white rounded uppercase tracking-widest">18+</span>
                                    <span className="px-2.5 py-1 text-[9px] font-black bg-white/10 backdrop-blur-md border border-white/20 text-white rounded uppercase tracking-widest">{event.tag || 'Music Festival'}</span>
                                </div>
                                <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-2">{event.title || event.EventName}</h1>
                                <p className="text-slate-300 font-medium flex items-center gap-2">
                                    <svg className="w-4 h-4 text-[#e8ff47]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path></svg>
                                    {event.Location || event.venue}
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-slate-800/50">
                            <div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Date & Time</p>
                                {/* Implementasi Format Tanggal Profesional */}
                                <p className="text-sm text-white font-medium">{formatDateTime(event.date || event.EventDate)}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Gate Open</p>
                                <p className="text-sm text-white font-medium">15:00 WIB</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Organizer</p>
                                <p className="text-sm text-white font-medium flex items-center gap-1">
                                    Prambanan Creative
                                    <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                                </p>
                            </div>
                            <div>
                                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Refund Policy</p>
                                <p className="text-sm text-red-400 font-medium">Non-refundable</p>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANEL: STICKY CHECKOUT */}
                    <div className="w-full lg:w-[40%]">
                        <div className="sticky top-24 bg-[#0a0a0a] border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl flex flex-col">
                            
                            <div className="mb-6 border-b border-slate-800/80 pb-4">
                                <h3 className="text-lg font-bold text-white tracking-tight">Choose Your Ticket</h3>
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Maximum 5 tickets per transaction</p>
                            </div>
                            
                            {/* TICKET SELECTION LIST DENGAN LOGIKA INDEPENDEN */}
                            <div className="space-y-4 mb-8">
                                {tickets.length > 0 ? tickets.map((t) => {
                                    const ticketId = (t.id || t.ID).toString();
                                    const qty = quantities[ticketId] || 0;
                                    const isSelected = qty > 0;
                                    const style = getTicketStyle(t.CategoryName);
                                    
                                    return (
                                        <div 
                                            key={ticketId}
                                            // Klik box-nya buat ngeset quantity jadi 1 (kalau sebelumnya 0)
                                            onClick={() => !isSelected && handleTicketSelect(ticketId)}
                                            className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-300 border overflow-hidden ${
                                                isSelected 
                                                ? 'border-[#e8ff47] bg-[#111] shadow-[0_0_20px_rgba(232,255,71,0.08)] scale-[1.01]' 
                                                : 'border-slate-800/60 bg-[#0a0a0a] hover:border-slate-700 hover:bg-[#0f0f0f]'
                                            }`}
                                        >
                                            {/* CHECK ICON HANYA DI TIKET AKTIF */}
                                            {isSelected && (
                                                <div className="absolute top-0 right-0 w-8 h-8 bg-[#e8ff47] rounded-bl-xl flex items-center justify-center shadow-lg">
                                                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                                </div>
                                            )}

                                            <div className="flex justify-between items-start mb-1">
                                                <div>
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <p className={`font-bold text-lg leading-none ${isSelected ? 'text-[#e8ff47]' : 'text-slate-200'}`}>
                                                            {t.CategoryName}
                                                        </p>
                                                        {style.badge && (
                                                            <span className={`px-1.5 py-0.5 text-[8px] font-black uppercase tracking-widest rounded ${style.badgeColor}`}>
                                                                {style.badge}
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className={`text-xs ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>{style.subtext}</p>
                                                    <p className="text-[10px] text-emerald-500 mt-1">{style.quota}</p>
                                                </div>
                                                <div className="text-right pr-4">
                                                    <p className={`font-mono font-bold ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                                                        Rp {Number(t.Price).toLocaleString('id-ID')}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* QUANTITY SELECTOR (COMPACT MODE) */}
                                            {isSelected && (
                                                <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center animate-fade-in-up" onClick={(e) => e.stopPropagation()}>
                                                    <p className="text-xs font-bold text-slate-400">Quantity</p>
                                                    
                                                    {/* Custom Compact Counter ala Loket.com */}
                                                    <div className="flex items-center bg-[#050505] border border-slate-700 rounded-lg overflow-hidden h-8">
                                                        <button 
                                                            onClick={() => updateQuantity(ticketId, -1)} 
                                                            className="w-8 h-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition disabled:opacity-30"
                                                            disabled={qty <= 1}
                                                        >
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 12H4"></path></svg>
                                                        </button>
                                                        <div className="w-8 h-full flex items-center justify-center bg-[#0a0a0a] border-x border-slate-700">
                                                            <span className="font-mono text-sm font-bold text-[#e8ff47]">{qty}</span>
                                                        </div>
                                                        <button 
                                                            onClick={() => updateQuantity(ticketId, 1)} 
                                                            className="w-8 h-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 transition disabled:opacity-30"
                                                            disabled={qty >= 5}
                                                        >
                                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 4v16m8-8H4"></path></svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                }) : (
                                    <div className="p-4 border border-dashed border-red-500/50 rounded-xl bg-red-500/5 text-center">
                                        <p className="text-sm text-red-400 font-bold">Tickets Unavailable</p>
                                    </div>
                                )}
                            </div>

                            {/* ORDER BREAKDOWN REALISTIS */}
                            <div className="bg-[#050505] p-5 rounded-2xl border border-slate-800 mb-6 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <p className="text-slate-400">Ticket Price {activeQuantity > 0 ? `(${activeQuantity}x)` : ''}</p>
                                    <p className="text-white font-mono">Rp {activeTicket ? (Number(activeTicket.Price) * activeQuantity).toLocaleString('id-ID') : '0'}</p>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <p className="text-slate-400">Platform Fee</p>
                                    <p className="text-emerald-400 font-mono">Free</p>
                                </div>
                                <div className="flex justify-between items-end pt-4 mt-2 border-t border-slate-800/50">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Payment</p>
                                    <p className="text-2xl font-black text-[#e8ff47] font-mono tracking-tight">
                                        Rp {totalPrice.toLocaleString('id-ID')}
                                    </p>
                                </div>
                            </div>

                            {/* PROFESSIONAL CTA */}
                            <button 
                                onClick={handlePayment} 
                                disabled={isProcessing || totalPrice === 0}
                                className={`w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all mb-5 ${
                                    isProcessing || totalPrice === 0
                                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed' 
                                    : 'bg-[#e8ff47] text-black hover:bg-white hover:scale-[1.02] shadow-[0_0_20px_rgba(232,255,71,0.2)]'
                                }`}
                            >
                                {isProcessing ? 'Processing...' : 'Proceed to Payment'}
                            </button>

                            {/* TRUST ELEMENTS */}
                            <div className="flex justify-center items-center gap-6 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                                <span className="flex items-center gap-1.5"><svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg> Secure</span>
                                <span className="flex items-center gap-1.5"><svg className="w-3 h-3 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg> Official</span>
                            </div>

                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}