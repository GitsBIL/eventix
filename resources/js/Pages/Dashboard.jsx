import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, usePage } from '@inertiajs/react';
import AdminSidebar from '@/Components/AdminSidebar';

export default function Dashboard() {
    // Ini kuncinya cuy! Kita tarik data auth dari props global Inertia
    const { auth } = usePage().props;

    return (
        <AuthenticatedLayout
            user={auth.user} 
            header={<h2 className="font-semibold text-xl text-[#e8ff47] leading-tight">Motto</h2>}
        >
            <Head title="System Console" />

            <div className="py-12 bg-[#0a0a0a] min-h-screen">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-[#111111] overflow-hidden shadow-2xl sm:rounded-lg border border-white/5">
                        <div className="p-8 text-gray-300">
                            Halo, <span className="text-[#e8ff47] font-bold">{auth.user?.FullName || 'User'}</span>! 👋<br/>
                            Selamat datang di system console <span className="text-white font-bold">EVENTIX</span>. Keamanan 2FA kamu sudah aktif.
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}