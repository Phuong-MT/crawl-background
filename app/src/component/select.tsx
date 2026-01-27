type SelectOption = {
    label: string;
    value: string;
};

type SelectProps = {
    id: string; // 🔥 thêm id để gắn với label
    label?: string;
    list: SelectOption[];
    value: string;
    setValue: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    error?: string;
    className?: string;
};

export default function Select({
    id,
    label,
    list,
    value,
    setValue,
    placeholder = "Chọn giá trị",
    disabled = false,
    required = false,
    error,
    className = "",
}: SelectProps) {
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-700">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <select
                id={id}
                value={value}
                disabled={disabled}
                required={required}
                onChange={(e) => setValue(e.target.value)}
                className={`
                    w-full
                    rounded-md
                    border
                    ${error ? "border-red-500" : "border-gray-300"}
                    bg-white
                    px-3
                    py-2
                    text-sm
                    text-gray-700
                    shadow-sm
                    focus:border-blue-500
                    focus:outline-none
                    focus:ring-1
                    focus:ring-blue-500
                    disabled:cursor-not-allowed
                    disabled:bg-gray-100
                    ${className}
                `}
            >
                {placeholder && (
                    <option value="" disabled hidden>
                        {placeholder}
                    </option>
                )}

                {list.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>

            {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
    );
}
