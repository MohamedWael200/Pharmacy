function HowItWorks() {
    const steps = [
        {
            number: "01",
            title: "Search Medicine",
            description: "Find the exact pharmaceutical products, dosages, or brands you need in seconds.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
        },
        {
            number: "02",
            title: "Choose Pharmacy",
            description: "Compare prices, distances, and real-time availability across nearby pharmacies.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4m-4 0H9" />
                </svg>
            ),
        },
        {
            number: "03",
            title: "Reserve Online",
            description: "Lock in your items instantly and pick them up safely whenever you are ready.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
            ),
        },
    ];

    return (
        <section className="py-20 bg-white px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-16">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                        Simple Process
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        How It Works
                    </h2>
                    <p className="text-slate-500 text-sm sm:text-base font-medium">
                        Get your required medications in just three simple steps.
                    </p>
                </div>

                {/* Steps Cards Container */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {steps.map((step, idx) => (
                        <div
                            key={step.number}
                            className="relative bg-slate-50/70 hover:bg-white rounded-3xl p-8 border border-slate-100 hover:border-teal-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                        >
                            <div className="space-y-6">
                                {/* Number & Icon Header */}
                                <div className="flex justify-between items-center">
                                    <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 group-hover:bg-gradient-to-tr group-hover:from-teal-500 group-hover:to-emerald-400 group-hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm">
                                        {step.icon}
                                    </div>
                                    <span className="text-3xl font-black text-slate-200 group-hover:text-teal-200 transition-colors">
                                        {step.number}
                                    </span>
                                </div>

                                {/* Step Title & Description */}
                                <div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="text-slate-500 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>

                            {/* Mobile Connecting Arrow (Except Last Step) */}
                            {idx < steps.length - 1 && (
                                <div className="md:hidden flex justify-center pt-6 text-slate-300">
                                    <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                    </svg>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default HowItWorks;