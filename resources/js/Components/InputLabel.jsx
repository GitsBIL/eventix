export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`block font-normal text-sm text-gray-400 tracking-wide ` + className}>
            {value ? value : children}
        </label>
    );
}