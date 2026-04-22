import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import { Head } from '@inertiajs/react';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<span className="text-[#e8ff47] font-black uppercase tracking-[0.2em] text-xs">Profile Settings</span>}
        >
            <Head title="Profile - Eventix" />

            {/* 🔥 Ganti Background jadi Hitam Pekat */}
            <div className="py-12 bg-[#050505] min-h-screen selection:bg-[#e8ff47] selection:text-black">
                <div className="max-w-4xl mx-auto sm:px-6 lg:px-8 space-y-8">
                    
                    {/* Bungkus Form dengan warna gelap dan border neon tipis */}
                    <div className="p-8 sm:p-10 bg-[#111111] shadow-2xl sm:rounded-3xl border border-white/5">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                        />
                    </div>

                    <div className="p-8 sm:p-10 bg-[#111111] shadow-2xl sm:rounded-3xl border border-white/5">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="p-8 sm:p-10 bg-[#111111] shadow-2xl sm:rounded-3xl border border-red-500/10">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}