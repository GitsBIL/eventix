import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ type = 'text', className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <input
            {...props}
            type={type}
            className={
                'border border-white/10 bg-white/5 text-white placeholder-gray-500 rounded-lg font-medium focus:border-[#e8ff47] focus:ring focus:ring-[#e8ff47]/20 transition-all duration-200 caret-[#e8ff47] shadow-sm ' +
                className
            }
            ref={input}
        />
    );
});