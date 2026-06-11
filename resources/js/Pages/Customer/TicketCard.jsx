import React, { useState } from 'react';

export default function TicketCard({ ticket, customerName, isPast }) {
    const [showQR, setShowQR] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(number);
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'TBA';
        const d = new Date(dateString.replace(/-/g, '/'));
        if (isNaN(d)) return 'TBA';
        return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const getCountdown = (dateString) => {
        if (!dateString) return '';
        const eventDate = new Date(dateString.replace(/-/g, '/'));
        if (isNaN(eventDate)) return '';
        
        eventDate.setHours(0, 0, 0, 0);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const diffDays = Math.round((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)); 
        
        if (diffDays > 0) return `Starts in ${diffDays} Days`;
        if (diffDays === 0) return 'Starts Today!';
        return '';
    };

    const getImageUrl = (rawPath) => {
        if (!rawPath) return null;
        if (rawPath.startsWith('http')) return rawPath;
        if (rawPath.startsWith('/storage/')) return rawPath;
        if (rawPath.startsWith('storage/')) return `/${rawPath}`;
        return `/storage/${rawPath}`;
    };

    const ticketImage = getImageUrl(ticket.BannerImage);

    let badgeText = 'ACTIVE';
    let badgeColor = 'bg-[#a3e635]/10 text-[#d9f99d] border-[#a3e635]/20'; 
    const rawStatus = ticket.PaymentStatus ? ticket.PaymentStatus.toLowerCase() : 'paid';

    if (rawStatus === 'pending' || rawStatus === 'pending_payment') {
        badgeText = 'PENDING';
        badgeColor = 'bg-orange-500/10 text-orange-300 border-orange-500/20'; 
    } else if (rawStatus === 'cancelled' || rawStatus === 'failed') {
        badgeText = 'CANCELLED';
        badgeColor = 'bg-red-500/10 text-red-300 border-red-500/20'; 
    } else if (isPast) {
        badgeText = 'USED';
        badgeColor = 'bg-slate-500/10 text-slate-300 border-slate-500/20'; 
    } else if (getCountdown(ticket.EventDate).includes('Days')) {
        badgeText = 'UPCOMING';
        badgeColor = 'bg-blue-500/10 text-blue-300 border-blue-500/20'; 
    }

    const countdownText = getCountdown(ticket.EventDate);

    // =========================================================
    // FUNGSI SAKTI: MANGGIL SNAP MIDTRANS TANPA REFRESH PAGE!
    // =========================================================
    const handlePayNow = async () => {
        setIsProcessing(true);
        try {
            const res = await fetch(`/checkout/repay/${ticket.OrderNo}`);
            const data = await res.json();
            
            if (data.status === 'success') {
                const scriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
                
                const loadMidtrans = new Promise((resolve) => {
                    if (document.querySelector(`script[src="${scriptUrl}"]`)) {
                        resolve();
                    } else {
                        const scriptTag = document.createElement('script');
                        scriptTag.src = scriptUrl;
                        scriptTag.setAttribute('data-client-key', data.client_key || '');
                        scriptTag.onload = () => resolve();
                        document.head.appendChild(scriptTag);
                    }
                });

                await loadMidtrans;
                
                window.snap.pay(data.snap_token, {
                    onSuccess: function(result){ window.location.reload(); },
                    onPending: function(result){ window.location.reload(); },
                    onError: function(result){ alert("Pembayaran Gagal!"); window.location.reload(); },
                    onClose: function(){ setIsProcessing(false); }
                });
            } else {
                alert("Error: " + data.message);
                setIsProcessing(false);
            }
        } catch (error) {
            console.error(error);
            alert("Gagal memuat sistem pembayaran.");
            setIsProcessing(false);
        }
    };

    return (
        <>
            <div className="bg-[#0a0a0a] border border-white/5 rounded-xl flex flex-col md:flex-row items-stretch transition-colors hover:border-white/10 relative overflow-hidden group">
                
                <div 
                    className="w-full md:w-40 h-32 md:h-auto bg-[#111] shrink-0 border-b md:border-b-0 md:border-r border-white/5 relative flex items-center justify-center overflow-hidden"
                    style={ticketImage ? { backgroundImage: `url(${ticketImage})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
                >
                    {!ticketImage && (
                        <span className="text-xl font-black text-white/10 uppercase tracking-widest text-center px-4 leading-none">
                            {ticket.EventName?.substring(0, 15) || 'EVENT'}
                        </span>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent"></div>
                </div>

                <div className="flex-1 p-5 md:p-6 flex flex-col justify-center bg-[#0d0d0d] relative">
                    <div className="flex items-center gap-3 mb-2">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest border ${badgeColor}`}>
                            {badgeText}
                        </span>
                        {!isPast && countdownText && rawStatus === 'paid' && (
                            <span className="text-[10px] text-[#e8ff47] font-bold tracking-wider animate-pulse">
                                • {countdownText}
                            </span>
                        )}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-0.5 truncate pr-4">{ticket.EventName || 'Event Title'}</h3>
                    <p className="text-xs text-slate-400 mb-3 truncate">
                        {formatDate(ticket.EventDate)} <span className="mx-1.5">•</span> {ticket.Location || 'Venue TBA'}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-auto pt-4 border-t border-white/5">
                        <div>
                            <p className="text-[9px] text-slate-500 uppercase tracking-widest">Ticket Type</p>
                            <p className="text-xs font-bold text-slate-200">{ticket.CategoryName || 'VIP PASS'} <span className="text-slate-500 font-normal ml-1">x{ticket.Qty || 1}</span></p>
                        </div>
                        <div>
                            <p className="text-[9px] text-slate-500 uppercase tracking-widest">Order ID</p>
                            <p className="text-xs font-mono font-medium text-slate-400">{ticket.OrderNo}</p>
                        </div>
                    </div>
                    <div className="hidden md:block absolute -right-3 top-[-10px] w-5 h-5 bg-[#050505] rounded-full border-b border-white/5 z-10"></div>
                    <div className="hidden md:block absolute -right-3 bottom-[-10px] w-5 h-5 bg-[#050505] rounded-full border-t border-white/5 z-10"></div>
                </div>

                <div className="w-full md:w-48 p-5 md:p-6 border-t md:border-t-0 md:border-l border-dashed border-white/10 bg-[#0d0d0d] flex flex-row md:flex-col items-center justify-between md:justify-center shrink-0">
                    <div className="text-left md:text-center mb-0 md:mb-4">
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest mb-0.5">Total Amount</p>
                        <p className="text-sm font-bold text-white">{formatRupiah(ticket.TotalAmount)}</p>
                    </div>

                    {rawStatus === 'paid' ? (
                        <button onClick={() => setShowQR(true)} className="tour-view-btn px-5 py-2 w-auto md:w-full bg-transparent border border-white/20 hover:border-white text-white text-[11px] font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5">
                            View Ticket <span className="text-[#e8ff47]">&rarr;</span>
                        </button>
                    ) : (
                        <button 
                            onClick={handlePayNow}
                            disabled={isProcessing}
                            className="tour-pay-btn px-5 py-2 w-auto md:w-full bg-[#e8ff47] hover:bg-white text-black text-[11px] font-bold rounded-lg transition-colors text-center inline-block disabled:opacity-50"
                        >
                            {isProcessing ? 'Processing...' : 'Pay Now'}
                        </button>
                    )}
                </div>
            </div>

            {/* MODAL VIEW QR */}
            {showQR && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="p-5 border-b border-gray-100 flex justify-between items-start bg-gray-50">
                            <div>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">E-Ticket Access</p>
                                <h3 className="text-lg font-bold text-gray-900 leading-tight">{ticket.EventName}</h3>
                            </div>
                            <button onClick={() => setShowQR(false)} className="text-gray-400 hover:text-gray-900 bg-white shadow-sm border border-gray-200 rounded-full p-1.5">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                        <div className="p-8 text-center bg-white flex flex-col items-center">
                            <div className="bg-gray-50 p-4 rounded-xl inline-block mb-6 border border-gray-100">
                                <svg className="w-48 h-48 text-black" viewBox="0 0 24 24" fill="currentColor"><path d="M3 3h8v8H3zM5 5v4h4V5zM13 3h8v8h-8zM15 5v4h4V5zM3 13h8v8H3zM5 15v4h4v-4zM18 13h3v3h-3zM13 13h3v3h-3zM16 16h5v5h-5zM13 18h2v3h-2z"/></svg>
                            </div>
                            <p className="text-xs text-gray-500 mb-1">Booking Reference</p>
                            <p className="text-lg font-mono font-bold text-black tracking-widest mb-4">{ticket.OrderNo}</p>
                            <div className="w-full text-left bg-gray-50 p-4 rounded-lg border border-gray-100 space-y-2">
                                <div className="flex justify-between"><span className="text-xs text-gray-500">Name</span><span className="text-xs font-bold text-gray-900">{customerName || 'Customer'}</span></div>
                                <div className="flex justify-between"><span className="text-xs text-gray-500">Ticket Type</span><span className="text-xs font-bold text-gray-900">{ticket.CategoryName || 'General'}</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}