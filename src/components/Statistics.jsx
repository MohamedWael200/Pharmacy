function Statistics() {
    const stats = [
        {
            value: "500+",
            label: "Medicines",
            description: "Available in our comprehensive database",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.59 15.11a2 2 0 01-1.183-1.845V5.082a2 2 0 01.786-1.59 6 6 0 013.758-1.28l.228.015a6 6 0 003.758-.517l.318-.158a6 6 0 013.86-.517l2.128.426a2 2 0 011.537 1.95v11.457a2 2 0 01-.368 1.15z" />
                </svg>
            ),
        },
        {
            value: "30+",
            label: "Pharmacies",
            description: "Trusted partners providing healthcare near you",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4m-4 0H9" />
                </svg>
            ),
        },
        {
            value: "1000+",
            label: "Reservations",
            description: "Successfully fulfilled prescription bookings",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
    ];

    return (
        <section className="py-16 bg-slate-50/70 border-y border-slate-100 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-300 flex items-center gap-6 group"
                        >
                            {/* Icon Box */}
                            <div className="w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 group-hover:bg-gradient-to-tr group-hover:from-teal-500 group-hover:to-emerald-400 group-hover:text-white transition-all duration-300 flex items-center justify-center shrink-0 shadow-sm">
                                {stat.icon}
                            </div>

                            {/* Stat Content */}
                            <div>
                                <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight group-hover:text-teal-600 transition-colors">
                                    {stat.value}
                                </span>
                                <h3 className="text-base font-bold text-slate-800 mt-0.5">
                                    {stat.label}
                                </h3>
                                <p className="text-xs text-slate-500 mt-1 font-medium leading-relaxed">
                                    {stat.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Statistics;