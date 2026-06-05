import { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function AuthenticatedLayout({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const isAdmin = user && (user.Role === 'Admin' || user.Role === 'Super Admin');

    return (
        <div className="min-h-screen bg-[#050505] selection:bg-[#e8ff47] selection:text-black font-sans flex flex-col">
            
            {/* GLOBAL NAVIGATION BAR (Identik sama WelcomePublic.jsx) */}
            <nav className="fixed top-0 w-full z-50 bg-[#050505]/70 backdrop-blur-xl border-b border-white/5 transition-all duration-300">
                <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-20 flex items-center justify-between">
                    
                    {/* Brand & Main Links */}
                    <div className="flex items-center gap-12">
                        <Link href="/" className="flex items-center gap-3 group">
                            <img src="/images/logo.png" alt="Eventix Logo" className="h-8 w-auto group-hover:scale-105 transition duration-300" 
                                 onError={(e) => { e.target.style.display = 'none' }} 
                            />
                            <div className="text-2xl font-black tracking-tighter text-white flex items-center gap-2">
                                EVEN<span className="text-[#e8ff47]">TIX</span>
                                <span className="px-1.5 py-0.5 rounded text-[8px] font-black tracking-widest uppercase bg-[#e8ff47]/10 text-[#e8ff47] border border-[#e8ff47]/20 relative top-[-2px]">
                                    Live
                                </span>
                            </div>
                        </Link>

                        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                            <Link href="/#events" className="text-slate-400 hover:text-white transition-colors relative group">
                                Explore
                                <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-white rounded-full transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            <Link href="#" className="text-slate-400 hover:text-white transition-colors relative group">
                                Cities
                                <span className="absolute -bottom-1.5 left-0 w-0 h-[2px] bg-white rounded-full transition-all duration-300 group-hover:w-full"></span>
                            </Link>
                            {/* Menu My Tickets - Status Aktif */}
                            <Link href={route('customer.dashboard')} className="text-white relative group">
                                My Tickets
                                <span className="absolute -bottom-1.5 left-0 w-full h-[2px] bg-[#e8ff47] rounded-full"></span>
                            </Link>
                        </div>
                    </div>

                    {/* User Actions & Profile */}
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-5">
                            {isAdmin && (
                                <Link href={route('admin.dashboard')} className="hidden sm:block text-sm font-medium text-slate-300 hover:text-white transition">
                                    Admin Console
                                </Link>
                            )}

                            <div className="relative group cursor-pointer">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#e8ff47] to-[#b3c733] p-[1.5px] shadow-[0_0_15px_rgba(232,255,71,0.15)] group-hover:shadow-[0_0_20px_rgba(232,255,71,0.3)] transition-all">
                                    <div className="w-full h-full bg-[#111] rounded-full flex items-center justify-center text-sm font-bold text-white uppercase">
                                        {user?.FullName?.charAt(0) || 'U'}
                                    </div>
                                </div>
                                
                                <div className="absolute right-0 mt-2 w-56 bg-[#0a0a0a] border border-slate-800 rounded-2xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 overflow-hidden backdrop-blur-xl">
                                    <div className="p-2 flex flex-col">
                                        <div className="px-3 py-3 border-b border-slate-800/80 mb-1">
                                            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-1">Signed in as</p>
                                            <p className="text-sm text-white font-medium truncate">{user?.FullName || 'User'}</p>
                                        </div>
                                        <Link href={route('profile.edit')} className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                                            Profile Setup
                                        </Link>
                                        <Link href={route('logout')} method="post" as="button" className="mt-1 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition text-left flex items-center gap-2 w-full">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                                            Log Out
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)} className="md:hidden text-slate-300 hover:text-white transition">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                <path className={showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Karena Navbar fixed (mengambang), body konten harus dikasih padding-top biar gak ketutup navbar */}
            <main className="flex-1 pt-24">{children}</main>
        </div>
    );
}