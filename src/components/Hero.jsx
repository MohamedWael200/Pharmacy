import { Link } from "react-router-dom";

function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/60 via-slate-50/30 to-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8">
            {/* Background Decorative Blur Blobs */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-teal-200/40 to-emerald-200/40 rounded-full blur-3xl -z-10 pointer-events-none" />

            <div className="max-w-4xl mx-auto text-center space-y-8">

                {/* Decorative Pill Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 shadow-sm">
                    <span className="flex h-2 w-2 rounded-full bg-teal-500 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-700">
                        Smart Healthcare Search
                    </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl sm:text-6xl font-black text-slate-900 tracking-tight leading-tight sm:leading-none">
                    Find Your Medicine{" "}
                    <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">
                        Easily
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto font-medium leading-relaxed">
                    Search for your medicine and find pharmacies that have it available near you.
                </p>

                {/* CTA Action Button */}
                <div className="pt-2 flex justify-center">
                    <Link
                        to="/medicines"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-bold text-white bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 shadow-xl shadow-teal-500/25 transition-all duration-200 active:scale-95 group"
                    >
                        <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                        <span>Search Medicines</span>
                        <svg className="w-4 h-4 stroke-current transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </Link>
                </div>

            </div>
        </section>
    );
}

export default Hero;