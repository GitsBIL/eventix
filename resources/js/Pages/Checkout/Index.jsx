import React, { useState, useEffect } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import axios from 'axios';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export default function Checkout({ event, tickets }) {
    const [isProcessing, setIsProcessing] = useState(false);
    const [quantities, setQuantities] = useState({});

    // TANGKEP TONGKAT ESTAFET DARI HOMEPAGE
    useEffect(() => {
        if (localStorage.getItem('tour_step') === 'checkout') {
            localStorage.removeItem('tour_step'); 

            setTimeout(() => {
                const driverObj = driver({
                    showProgress: true,
                    animate: true,
                    doneBtnText: 'Siap Bayar!',
                    nextBtnText: 'Lanjut →',
                    prevBtnText: '← Kembali',
                    steps: [
                        { popover: { title: '🛒 Halaman Checkout', description: 'Sekarang kamu di halaman checkout. Ikuti petunjuk untuk pilih tiketnya.' } },
                        { element: '.tour-ticket-box', popover: { title: '1️⃣ Pilih Tiket', description: 'Klik kotak ini untuk memilih kategori tiket, lalu atur jumlah tiket yang mau dibeli.' } },
                        { element: '.tour-total-price', popover: { title: '2️⃣ Cek Total Harga', description: 'Sistem akan menghitung otomatis total belanjaan tiket kamu.' } },
                        { element: '.tour-proceed-btn', popover: { title: '3️⃣ Lanjut Bayar', description: 'Kalau sudah siap, klik tombol ini untuk membuka sistem pembayaran Midtrans. Sampai jumpa di Dashboard!' } }
                    ],
                    onDestroyStarted: () => {
                        // Taruh tongkat estafet terakhir cuma kalau tour-nya emang aktif
                        if (localStorage.getItem('is_tour_active') === '1') {
                            localStorage.setItem('tour_step', 'dashboard');
                        }
                        driverObj.destroy();
                    }
                });
                driverObj.drive();
            }, 800);
        }
    }, []);

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

    const rawImage = event.image || event.BannerImage;
    let bannerImage = 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1600'; 
    if (rawImage) {
        if (rawImage.startsWith('http')) bannerImage = rawImage;
        else if (rawImage.startsWith('/storage/')) bannerImage = rawImage;
        else if (rawImage.startsWith('storage/')) bannerImage = `/${rawImage}`;
        else bannerImage = `/storage/${rawImage}`; 
    }

    const updateQuantity = (ticketId, delta) => {
        setQuantities(prev => {
            const currentQty = prev[ticketId] || 0;
            const newQty = Math.max(0, Math.min(5, currentQty + delta));
            return { ...prev, [ticketId]: newQty };
        });
    };

    const handleTicketSelect = (ticketId) => {
        setQuantities(prev => {
            return { [ticketId]: prev[ticketId] > 0 ? prev[ticketId] : 1 };
        });
    };

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
                    <Link href="/" className="text-xl font-black tracking-tighter text-white uppercase">EVEN<span className="text-[#e8ff47]">TIX</span></Link>
                    <Link href="/" className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest transition">Cancel Order</Link>
                </div>
            </nav>

            <main className="max-w-[1200px] mx-auto px-6 pt-32">
                <div className="flex flex-col lg:flex-row gap-12">
                    
                    <div className="w-full lg:w-[60%] space-y-8">
                        <div className="relative aspect-[16/9] md:aspect-[21/9] lg:aspect-video rounded-3xl overflow-hidden border border-slate-800/80 shadow-2xl bg-[#111]">
                            <img src={bannerImage} alt={event.title || event.EventName} className="w-full h-full object-cover" 
                                 onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?q=80&w=1600'; }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent"></div>
                            
                            <div className="absolute bottom-0 left-0 p-8 w-full">
                                <h1 className="text-4xl lg:text-5xl font-black text-white leading-tight mb-2">{event.title || event.EventName}</h1>
                                <p className="text-slate-300 font-medium">{event.Location || event.venue}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-slate-800/50">
                            <div><p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Date & Time</p><p className="text-sm text-white font-medium">{formatDateTime(event.date || event.EventDate)}</p></div>
                            <div><p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Gate Open</p><p className="text-sm text-white font-medium">15:00 WIB</p></div>
                            <div><p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Organizer</p><p className="text-sm text-white font-medium">Prambanan Creative</p></div>
                            <div><p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Refund Policy</p><p className="text-sm text-red-400 font-medium">Non-refundable</p></div>
                        </div>
                    </div>

                    <div className="w-full lg:w-[40%]">
                        <div className="sticky top-24 bg-[#0a0a0a] border border-slate-800/80 rounded-3xl p-6 lg:p-8 shadow-2xl flex flex-col">
                            
                            <div className="mb-6 border-b border-slate-800/80 pb-4">
                                <h3 className="text-lg font-bold text-white tracking-tight">Choose Your Ticket</h3>
                                <p className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Maximum 5 tickets per transaction</p>
                            </div>
                            
                            <div className="space-y-4 mb-8">
                                {tickets.length > 0 ? tickets.map((t, index) => {
                                    const ticketId = (t.id || t.ID).toString();
                                    const qty = quantities[ticketId] || 0;
                                    const isSelected = qty > 0;
                                    const style = getTicketStyle(t.CategoryName);
                                    
                                    return (
                                        <div 
                                            key={ticketId}
                                            onClick={() => !isSelected && handleTicketSelect(ticketId)}
                                            className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-300 border overflow-hidden ${index === 0 ? 'tour-ticket-box' : ''} ${
                                                isSelected ? 'border-[#e8ff47] bg-[#111] shadow-[0_0_20px_rgba(232,255,71,0.08)] scale-[1.01]' : 'border-slate-800/60 bg-[#0a0a0a] hover:border-slate-700 hover:bg-[#0f0f0f]'
                                            }`}
                                        >
                                            {isSelected && (
                                                <div className="absolute top-0 right-0 w-8 h-8 bg-[#e8ff47] rounded-bl-xl flex items-center justify-center shadow-lg">
                                                    <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                                </div>
                                            )}

                                            <div className="flex justify-between items-start mb-1">
                                                <div>
                                                    <p className={`font-bold text-lg leading-none ${isSelected ? 'text-[#e8ff47]' : 'text-slate-200'}`}>{t.CategoryName}</p>
                                                    <p className={`text-xs mt-1 ${isSelected ? 'text-slate-400' : 'text-slate-500'}`}>{style.subtext}</p>
                                                </div>
                                                <div className="text-right pr-4">
                                                    <p className={`font-mono font-bold ${isSelected ? 'text-white' : 'text-slate-400'}`}>Rp {Number(t.Price).toLocaleString('id-ID')}</p>
                                                </div>
                                            </div>

                                            {isSelected && (
                                                <div className="mt-4 pt-4 border-t border-slate-800 flex justify-between items-center" onClick={(e) => e.stopPropagation()}>
                                                    <p className="text-xs font-bold text-slate-400">Quantity</p>
                                                    <div className="flex items-center bg-[#050505] border border-slate-700 rounded-lg overflow-hidden h-8">
                                                        <button onClick={() => updateQuantity(ticketId, -1)} className="w-8 h-full flex items-center justify-center text-slate-400" disabled={qty <= 1}>-</button>
                                                        <div className="w-8 h-full flex items-center justify-center bg-[#0a0a0a] border-x border-slate-700"><span className="font-mono text-sm font-bold text-[#e8ff47]">{qty}</span></div>
                                                        <button onClick={() => updateQuantity(ticketId, 1)} className="w-8 h-full flex items-center justify-center text-slate-400" disabled={qty >= 5}>+</button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                }) : (
                                    <div className="p-4 text-center"><p className="text-sm text-red-400 font-bold">Tickets Unavailable</p></div>
                                )}
                            </div>

                            <div className="bg-[#050505] p-5 rounded-2xl border border-slate-800 mb-6 space-y-3">
                                <div className="flex justify-between text-sm"><p className="text-slate-400">Ticket Price</p><p className="text-white font-mono">Rp {activeTicket ? (Number(activeTicket.Price) * activeQuantity).toLocaleString('id-ID') : '0'}</p></div>
                                <div className="flex justify-between items-end pt-4 mt-2 border-t border-slate-800/50 tour-total-price">
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Payment</p>
                                    <p className="text-2xl font-black text-[#e8ff47] font-mono tracking-tight">Rp {totalPrice.toLocaleString('id-ID')}</p>
                                </div>
                            </div>

                            <button 
                                onClick={handlePayment} 
                                disabled={isProcessing || totalPrice === 0}
                                className={`tour-proceed-btn w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all mb-5 ${
                                    isProcessing || totalPrice === 0 ? 'bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-[#e8ff47] text-black hover:bg-white shadow-[0_0_20px_rgba(232,255,71,0.2)]'
                                }`}
                            >
                                {isProcessing ? 'Processing...' : 'Proceed to Payment'}
                            </button>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}