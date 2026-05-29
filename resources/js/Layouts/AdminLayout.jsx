import React from 'react';
import { Head } from '@inertiajs/react';
// Ini adalah Sidebar yang lu bikin kemaren
import AdminSidebar from '@/Components/AdminSidebar'; 

export default function AdminLayout({ user, header, children }) {
    return (
        <div className="flex h-screen bg-[#0a0f1d] overflow-hidden font-sans">
            
            {/* PANGGIL SIDEBAR LU DI SINI */}
            <AdminSidebar />

            {/* AREA KONTEN UTAMA */}
            <div className="flex-1 flex flex-col overflow-hidden relative">
                
                {/* Header Atas (Bisa diisi Title atau kosongin aja karena udah ada di konten) */}
                {header && (
                    <header className="bg-[#0f172a] shadow-md border-b border-[#1e293b] z-10 shrink-0 hidden md:block">
                        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                            {header}
                        </div>
                    </header>
                )}

                {/* Tempat di mana konten halaman (seperti Reports.jsx) akan dirender */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar bg-gradient-to-br from-[#0a0f1d] to-[#0f172a]">
                    <div className="h-full">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}