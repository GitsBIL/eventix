export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `inline-flex w-full justify-center items-center px-4 py-3 bg-[#e8ff47] border border-transparent rounded-lg font-bold text-[#0a0a0a] tracking-wide hover:bg-[#d4eb33] hover:opacity-90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#e8ff47] focus:ring-offset-2 focus:ring-offset-[#111] transition-all duration-200 shadow-[0_4px_14px_rgba(232,255,71,0.2)] ${
                    disabled && 'opacity-50 cursor-not-allowed'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}