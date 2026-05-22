import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';

export default function AdminSidebar() {
    const { auth } = usePage().props;
    const [isCollapsed, setIsCollapsed] = useState(false);

    const isActive = (routeName) => {
        return route().current(routeName);
    };

    const MenuItem = ({ href, icon, label, active }) => (
        <li>
            <Link 
                href={href} 
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                    active 
                    ? 'bg-[#e8ff47]/10 text-white border border-[#e8ff47]/20 shadow-[0_0_15px_rgba(232,255,71,0.05)]' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
                title={isCollapsed ? label : ''}
            >
                <span className={`transition-colors duration-200 ${active ? 'text-[#e8ff47]' : 'text-slate-500'}`}>
                    {icon}
                </span>
                {!isCollapsed && <span className={`text-sm ${active ? 'font-bold' : 'font-medium'} whitespace-nowrap`}>{label}</span>}
            </Link>
        </li>
    );

    return (
        <aside className={`${isCollapsed ? 'w-20' : 'w-64'} bg-[#0f172a] border-r border-[#1e293b] flex flex-col justify-between h-full hidden md:flex shrink-0 shadow-2xl z-50 transition-all duration-500 ease-in-out relative`}>
            
            <div className="overflow-y-auto overflow-x-hidden no-scrollbar flex-1">
                <div className={`h-16 flex items-center border-b border-[#1e293b] sticky top-0 bg-[#0f172a]/95 backdrop-blur-md z-10 px-4 transition-all duration-300 ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
                    <div className="flex items-center gap-3 overflow-hidden">
                        <img src="/images/logo.png" alt="Eventix Logo" className="w-8 h-8 object-contain shrink-0 drop-shadow-[0_0_8px_rgba(232,255,71,0.3)]" />
                        {!isCollapsed && (
                            <span className="text-lg font-black text-white uppercase tracking-tighter animate-in fade-in slide-in-from-left-2 duration-500">
                                EVEN<span className="text-[#e8ff47]">TIX</span>
                            </span>
                        )}
                    </div>

                    {!isCollapsed && (
                        <button onClick={() => setIsCollapsed(true)} className="p-1.5 rounded-md text-slate-500 hover:text-[#e8ff47] hover:bg-slate-800 transition-all">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"></path></svg>
                        </button>
                    )}
                </div>

                {isCollapsed && (
                    <div className="flex justify-center py-4">
                        <button onClick={() => setIsCollapsed(false)} className="p-2 rounded-full bg-slate-800 text-[#e8ff47] border border-slate-700 hover:scale-110 transition-all shadow-lg">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path></svg>
                        </button>
                    </div>
                )}
                
                <div className="px-4 py-6 space-y-7">
                    <div className="space-y-2">
                        {!isCollapsed && <p className="px-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] opacity-60">Overview</p>}
                        <ul className="space-y-1">
                            <MenuItem href={route('admin.dashboard')} active={isActive('admin.dashboard')} label="Dashboard" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>} />
                            <MenuItem href={route('admin.analytics')} active={isActive('admin.analytics')} label="Analytics" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>} />
                        </ul>
                    </div>

                    <div className="space-y-2">
                        {!isCollapsed && <p className="px-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] opacity-60">Management</p>}
                        <ul className="space-y-1">
                            <MenuItem href={route('admin.events.index')} active={isActive('admin.events.*')} label="Events" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>} />
                        </ul>
                    </div>

                    <div className="space-y-2">
                        {!isCollapsed && <p className="px-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] opacity-60">Payment</p>}
                        <ul className="space-y-1">
                            <MenuItem href={route('admin.transactions.index')} active={isActive('admin.transactions.*')} label="Transactions" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>} />
                            <MenuItem href={route('admin.refunds.index')} active={isActive('admin.refunds.*')} label="Refund Requests" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"></path></svg>} />
                            <MenuItem href={route('admin.midtrans-logs.index')} active={isActive('admin.midtrans-logs.*')} label="Midtrans Logs" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>} />
                        </ul>
                    </div>

                    <div className="space-y-2">
                        {!isCollapsed && <p className="px-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] opacity-60">Reporting & Comm.</p>}
                        <ul className="space-y-1">
                            <MenuItem href="#" active={false} label="Sales Reports" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>} />
                            <MenuItem href="#" active={false} label="Export Data" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>} />
                            <MenuItem href="#" active={false} label="Email Broadcast" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>} />
                            <MenuItem href="#" active={false} label="WhatsApp Logs" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>} />
                        </ul>
                    </div>

                    <div className="space-y-2">
                        {!isCollapsed && <p className="px-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] opacity-60">System</p>}
                        <ul className="space-y-1">
                            <MenuItem href={route('admin.customers.index')} active={isActive('admin.customers.*')} label="Customers" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>} />
                            <MenuItem href="#" active={false} label="Staff & Roles" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.956 11.956 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>} />
                            <MenuItem href="#" active={false} label="Activity Logs" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>} />
                            <MenuItem href="#" active={false} label="Settings" icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>} />
                        </ul>
                    </div>
                </div>
            </div>

            <div className="p-4 border-t border-[#1e293b] bg-[#0f172a] shrink-0">
                <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'}`}>
                    <div className="relative shrink-0">
                        <div className="w-9 h-9 rounded-md bg-slate-800 flex items-center justify-center text-slate-300 font-bold border border-slate-700 text-xs shadow-inner uppercase">
                            {auth.user.FullName.charAt(0)}
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 border-2 border-[#0f172a] rounded-full"></div>
                    </div>
                    
                    {!isCollapsed && (
                        <>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-white truncate leading-tight">{auth.user.FullName}</p>
                                <p className="text-[10px] text-emerald-400 font-medium truncate mt-0.5">Online</p>
                            </div>
                            <button 
                                onClick={() => router.post(route('logout'))} 
                                className="text-slate-500 hover:text-rose-400 transition-colors p-1.5 hover:bg-rose-500/10 rounded-md shrink-0"
                                title="Logout"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                </svg>
                            </button>
                        </>
                    )}
                </div>
            </div>
        </aside>
    );
}