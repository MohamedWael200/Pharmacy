function Features() {
    const featuresList = [
        {
            title: "Search Medicines",
            description: "Search by medicine name or category.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L5.59 15.11a2 2 0 01-1.183-1.845V5.082a2 2 0 01.786-1.59 6 6 0 013.758-1.28l.228.015a6 6 0 003.758-.517l.318-.158a6 6 0 013.86-.517l2.128.426a2 2 0 011.537 1.95v11.457a2 2 0 01-.368 1.15z" />
                </svg>
            ),
        },
        {
            title: "Compare Pharmacies",
            description: "Compare prices and available quantities.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4m-4 0H9" />
                </svg>
            ),
        },
        {
            title: "Online Reservations",
            description: "Reserve medicines before visiting the pharmacy.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            title: "Manage Profile",
            description: "Update your profile and view reservations.",
            icon: (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            ),
        },
    ];

    return (
        <section className="py-20 bg-slate-50/50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-12">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
                        Core Services
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Why Use PharmaCare?
                    </h2>
                    <p className="text-slate-500 text-sm sm:text-base font-medium">
                        Everything you need to locate, compare, and secure your essential medications.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {featuresList.map((feature) => (
                        <div
                            key={feature.title}
                            className="bg-white rounded-3xl p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-300 flex flex-col justify-between group"
                        >
                            <div className="space-y-4">
                                {/* Icon Badge */}
                                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 group-hover:bg-gradient-to-tr group-hover:from-teal-500 group-hover:to-emerald-400 group-hover:text-white transition-all duration-300 flex items-center justify-center shadow-sm">
                                    {feature.icon}
                                </div>

                                {/* Title & Description */}
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-teal-600 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-slate-500 text-xs leading-relaxed font-medium">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}

export default Features;