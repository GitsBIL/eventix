import { Link } from '@inertiajs/react';

export default function Guest({ children }) {
    return (
        // Background utama
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#0a0a0a] selection:bg-[#e8ff47] selection:text-black">
            
            {/* Logo + Subtitle */}
            <div className="text-center flex flex-col items-center">
                <Link href="/">
                    <img 
                        src="/images/logo.png" 
                        alt="Eventix Logo" 
                        className="w-48 h-auto drop-shadow-[0_0_20px_rgba(232,255,71,0.15)] transition-transform duration-300 hover:scale-105" 
                    />
                </Link>
                <p className="mt-4 text-sm text-gray-400 font-medium tracking-wide">
                    Access your tickets
                </p>
            </div>

            {/* Card Form - Glassmorphism */}
            <div className="w-full sm:max-w-md mt-8 px-8 py-10 bg-[#111111]/80 backdrop-blur-xl shadow-2xl overflow-hidden sm:rounded-2xl border border-white/10">
                {children}
            </div>
            
        </div>
    );
}