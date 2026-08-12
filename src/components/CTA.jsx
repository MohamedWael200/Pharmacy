import { Link } from "react-router-dom";

function CTA() {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-500 p-8 sm:p-14 text-white shadow-2xl shadow-teal-500/20 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-8">

                    {/* Background Light Decorative Circles */}
                    <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-teal-800/20 rounded-full blur-2xl pointer-events-none" />

                    {/* Text Content */}
                    <div className="space-y-3 max-w-2xl relative z-10">
                        <span className="inline-block px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/20">
                            Quick & Convenient
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-tight">
                            Ready to reserve your medicine?
                        </h2>
                        <p className="text-teal-50 text-sm sm:text-base font-medium leading-relaxed opacity-90">
                            Find available stock at nearby pharmacies and book your prescriptions in just a few clicks.
                        </p>
                    </div>

                    {/* Action Button */}
                    <div className="relative z-10 shrink-0 w-full sm:w-auto">
                        <Link
                            to="/medicines"
                            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-4 rounded-2xl text-base font-bold text-teal-800 bg-white hover:bg-slate-50 shadow-xl shadow-slate-900/10 transition-all duration-200 active:scale-95 group"
                        >
                            <span>Explore Medicines</span>
                            <svg className="w-5 h-5 stroke-current transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default CTA;