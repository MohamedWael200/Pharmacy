function Input({ type, name, register, error, label, validate }) {
    return (
        <div className="flex flex-col gap-1.5 w-full">
            {/* Label */}
            <label className="text-xs font-semibold text-slate-700 tracking-wide uppercase">
                {label}
            </label>

            {/* Input Field */}
            <input
                type={type}
                {...register(name, validate)}
                className={`w-full px-4 py-3 rounded-xl bg-slate-50/80 border text-slate-900 placeholder-slate-400 text-sm font-medium transition-all duration-200 focus:bg-white focus:outline-none ${
                    error
                        ? "border-rose-300 focus:border-rose-500 focus:ring-4 focus:ring-rose-500/10"
                        : "border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10"
                }`}
            />

            {/* Error Message */}
            {error?.message && (
                <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-0.5">
                    <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{error.message}</span>
                </p>
            )}
        </div>
    );
}

export default Input;