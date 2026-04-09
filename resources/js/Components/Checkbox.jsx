export default function Checkbox({ className = '', ...props }) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'rounded border-white/20 bg-white/5 text-[#e8ff47] shadow-sm focus:ring-[#e8ff47] focus:ring-offset-[#111] transition-colors cursor-pointer ' +
                className
            }
        />
    );
}