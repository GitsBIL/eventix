import React, { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage, Link } from '@inertiajs/react';
import TicketCard from './TicketCard';
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

export default function CustomerDashboard() {
    const { auth, tickets = [], recommendedEvents = [] } = usePage().props;

    const parseDate = (dateStr) => {
        if (!dateStr) return new Date('2000-01-01'); 
        return new Date(dateStr.replace(/-/g, '/')); 
    };

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const upcomingTickets = tickets.filter(t => parseDate(t.EventDate) >= today);
    const pastTickets = tickets.filter(t => parseDate(t.EventDate) < today);

    const getImageUrl = (rawPath) => {
        if (!rawPath) return 'https://images.unsplash.com/photo-1540039155733-d7696d4eb98e?w=1600';
        if (rawPath.startsWith('http')) return rawPath;
        if (rawPath.startsWith('/storage/')) return rawPath;
        if (rawPath.startsWith('storage/')) return `/${rawPath}`;
        return `/storage/${rawPath}`;
    };

    const startManualBookTour = () => {
        const driverObj = driver({
            showProgress: true,
            animate: true,
            doneBtnText: 'Selesai',
            nextBtnText: 'Lanjut →',
            prevBtnText: '← Kembali',
            steps: [
                {
                    popover: {
                        title: '👋 Selamat Datang di Manual Book Eventix!',
                        description: 'Ini adalah panduan interaktif. Mari kita lihat cara melakukan pembayaran dan melihat tiket kamu secara langsung.',
                    }
                },
                {
                    element: '.tour-pay-btn',
                    popover: {
                        title: '💳 Tombol Pembayaran',
                        description: 'Jika status tiket kamu <b>PENDING</b>, klik tombol ini untuk membuka pop-up sistem pembayaran aman dari Midtrans.',
                        side: "left", 
                        align: 'start'
                    }
                },
                {
                    element: '.tour-view-btn',
                    popover: {
                        title: '📱 E-Ticket & QR Code',
                        description: 'Jika sudah lunas, tombol akan berubah. Klik untuk melihat <b>QR Code</b> yang akan di-scan saat masuk ke acara.',
                        side: "left", 
                        align: 'start'
                    }
                }
            ]
        });
        driverObj.drive();
    };

    // MATIIN TOUR TOTAL DI AKHIR ESTAFET
    useEffect(() => {
        if (localStorage.getItem('tour_step') === 'dashboard') {
            localStorage.removeItem('tour_step'); 
            localStorage.removeItem('is_tour_active'); 
            
            setTimeout(() => {
                startManualBookTour();
            }, 1000); 
        }
    }, []);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="My Tickets | Eventix" />

            <div className="pb-12 bg-[#050505] min-h-screen">
                <div className="max-w-[900px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

                    <div className="text-center md:text-left border-b border-white/5 pb-8 pt-4">
                        <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">MY TICKETS</h1>
                        <p className="text-slate-400 text-sm font-medium">All your upcoming events and past memories in one place.</p>
                        
                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-6">
                            <span className="text-xs text-slate-300 font-bold px-3 py-1.5 bg-[#111] rounded-lg border border-[#222]">
                                <span className="text-[#e8ff47] mr-1.5">{upcomingTickets.length}</span> Upcoming Events
                            </span>
                            <span className="text-xs text-slate-300 font-bold px-3 py-1.5 bg-[#111] rounded-lg border border-[#222]">
                                <span className="text-white mr-1.5">{pastTickets.length}</span> Past Events
                            </span>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-xl font-bold text-white tracking-tight mb-6 flex items-center gap-2">
                            Upcoming Events <span className="w-2 h-2 rounded-full bg-[#e8ff47] animate-pulse"></span>
                        </h2>
                        {upcomingTickets.length > 0 ? (
                            <div className="space-y-4">
                                {upcomingTickets.map((ticket, index) => (
                                    <TicketCard key={index} ticket={ticket} customerName={auth.user?.FullName} isPast={false} />
                                ))}
                            </div>
                        ) : (
                            <div className="bg-[#0a0a0a] py-12 rounded-xl text-center border border-white/5">
                                <p className="text-sm text-slate-500 font-medium mb-4">No upcoming events right now.</p>
                                <Link href="/#events" className="text-xs font-bold bg-white text-black px-5 py-2.5 rounded-full hover:bg-[#e8ff47] transition">Find Events</Link>
                            </div>
                        )}
                    </div>

                    {pastTickets.length > 0 && (
                        <div className="pt-8">
                            <h2 className="text-xl font-bold text-white tracking-tight mb-6 text-opacity-70">Past Events</h2>
                            <div className="space-y-4 opacity-70 hover:opacity-100 transition-opacity duration-300">
                                {pastTickets.map((ticket, index) => (
                                    <TicketCard key={index} ticket={ticket} customerName={auth.user?.FullName} isPast={true} />
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="pt-12">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-lg font-bold text-white tracking-tight">Recommended for you</h4>
                            <Link href="/#events" className="text-sm text-slate-400 hover:text-white transition-colors">See all</Link>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {recommendedEvents.length > 0 ? recommendedEvents.map((event) => (
                                <Link key={event.ID} href={route('checkout.index', { event_id: event.ID })} className="bg-[#0a0a0a] border border-white/5 rounded-xl overflow-hidden hover:border-white/10 transition-colors group p-4 flex gap-4">
                                    <div className="w-16 h-16 rounded-lg bg-[#111] shrink-0 border border-white/5 overflow-hidden relative">
                                        <img src={getImageUrl(event.BannerImage)} alt={event.EventName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h5 className="font-bold text-sm text-white mb-1 line-clamp-1">{event.EventName}</h5>
                                        <p className="text-[10px] text-slate-500">{new Date(event.EventDate?.replace(/-/g, '/')).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {event.Location}</p>
                                    </div>
                                </Link>
                            )) : (
                                <p className="text-sm text-slate-500">More events coming soon!</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}