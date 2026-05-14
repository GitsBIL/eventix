import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';

export default function AuthenticatedLayout({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-[#0a0a0a]">
            <nav className="bg-[#111111] border-b border-white/10 selection:bg-[#e8ff47] selection:text-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex">
                        <div className="shrink-0 flex items-center">
                            {/* JALAN PULANG KE MAIN MENU (Home) */}
                            <Link href={route('home')} className="flex items-center gap-2 group">
                                <img src="/images/logo.png" className="h-7 w-auto transition-transform group-hover:scale-110" alt="Logo" onError={(e) => e.target.style.display='none'} />
                                <span className="text-white font-black text-sm tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">HOME</span>
                            </Link>
                        </div>

                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            {/* MENU HOME */}
                            <NavLink href={route('home')} active={route().current('home')} className="text-gray-400 hover:text-[#e8ff47]">
                                Home
                            </NavLink>
                            {/* MENU MY TICKETS */}
                            <NavLink href={route('customer.dashboard')} active={route().current('customer.dashboard')} className="text-gray-400 hover:text-[#e8ff47]">
                                My Tickets
                            </NavLink>
                            {/* MENU CONSOLE (ADMIN/SYSTEM) */}
                            <NavLink href={route('dashboard')} active={route().current('dashboard')} className="text-gray-400 hover:text-[#e8ff47]">
                                Console
                            </NavLink>
                        </div>
                    </div>

                    <div className="hidden sm:flex sm:items-center sm:ms-6">
                        <div className="ms-3 relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-4 py-2 border border-white/5 text-xs font-bold rounded-lg text-gray-400 bg-[#161B22] hover:text-[#e8ff47] focus:outline-none transition ease-in-out duration-150"
                                        >
                                            {user?.FullName || 'Identity'}

                                            <svg className="ms-2 -me-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content contentClasses="py-1 bg-[#161B22] border border-white/10 shadow-2xl">
                                    <Dropdown.Link href={route('profile.edit')} className="text-gray-400 hover:text-[#e8ff47]">Profile Settings</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button" className="text-gray-400 hover:text-red-400">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    {/* Hamburger untuk Mobile */}
                    <div className="-me-2 flex items-center sm:hidden">
                        <button
                            onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:text-gray-400 hover:bg-gray-900 focus:outline-none focus:bg-gray-900 focus:text-gray-400 transition duration-150 ease-in-out"
                        >
                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                <path className={showingNavigationDropdown ? 'inline-flex' : 'hidden'} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>
                    <div className="pt-2 pb-3 space-y-1">
                        <ResponsiveNavLink href={route('home')} active={route().current('home')} className="text-gray-300">
                            Home
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('customer.dashboard')} active={route().current('customer.dashboard')} className="text-gray-300">
                            My Tickets
                        </ResponsiveNavLink>
                        <ResponsiveNavLink href={route('dashboard')} active={route().current('dashboard')} className="text-gray-300">
                            Console
                        </ResponsiveNavLink>
                    </div>

                    <div className="pt-4 pb-1 border-t border-white/10">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-200">{user?.FullName || 'Guest'}</div>
                            <div className="font-medium text-sm text-gray-500">{user?.email || ''}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')} className="text-gray-300">Profile</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button" className="text-gray-300">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-[#0C0F16]/50 border-b border-white/5 backdrop-blur-xl selection:bg-[#e8ff47] selection:text-black">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 text-[#e8ff47] font-black uppercase tracking-[0.2em] text-[10px] drop-shadow-[0_0_10px_rgba(232,255,71,0.2)]">{header}</div>
                </header>
            )}

            <main className="selection:bg-[#e8ff47] selection:text-black">{children}</main>
        </div>
    );
}