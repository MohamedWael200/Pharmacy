function Footer() {
    return (
        <footer className="bg-white border-t border-slate-100 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Brand */}
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                            +
                        </div>
                        <span className="font-bold text-slate-800 text-base">
                            PharmaCare
                        </span>
                    </div>

                    {/* Copyright & Info */}
                    <p className="text-xs text-slate-400 text-center md:text-right">
                        &copy; {new Date().getFullYear()} PharmaCare. All rights reserved. Providing trusted healthcare solutions.
                    </p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;