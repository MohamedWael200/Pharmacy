import { useEffect, useState } from "react";
import {
    getCategories,
    searchMedicines,
} from "../services/medicineService";
import { Link } from "react-router-dom";
import MedicineCard from "../components/MedicineCard.jsx";
import { motion, AnimatePresence } from "framer-motion";

function Medicines() {
    const [medicines, setMedicines] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Load Categories Once
    useEffect(() => {
        fetchCategories();
    }, []);

    // Search Medicines
    useEffect(() => {
        fetchMedicines();
    }, [search, category]);

    async function fetchCategories() {
        try {
            const response = await getCategories();
            setCategories(response.data.data);
        } catch (error) {
            console.log(error);
            setError("Failed to load categories.");
        }
    }

    async function fetchMedicines() {
        try {
            setLoading(true);

            const response = await searchMedicines(search.trim(), category);

            setMedicines(response.data.data.data);
            setError("");
        } catch (error) {
            console.log(error);
            setError("Failed to load medicines.");
        } finally {
            setLoading(false);
        }
    }

    // Framer Motion Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
            },
        },
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.4, ease: "easeOut" },
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            transition: { duration: 0.2 },
        },
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50/70 py-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-teal-500 selection:text-white">

            {/* ==================== 🌟 ANIMATED BACKGROUND LAYER 🌟 ==================== */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                {/* Glowing Mesh Orbs */}
                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, -30, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 16,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -top-20 -left-20 w-[500px] h-[500px] bg-gradient-to-br from-teal-300/25 via-emerald-200/20 to-transparent rounded-full blur-3xl"
                />

                <motion.div
                    animate={{
                        x: [0, -40, 0],
                        y: [0, 60, 0],
                        scale: [1, 1.15, 1],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-1/2 -right-20 w-[550px] h-[550px] bg-gradient-to-tl from-cyan-300/20 via-teal-200/25 to-transparent rounded-full blur-3xl"
                />

                <motion.div
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -bottom-30 left-1/3 w-[450px] h-[450px] bg-gradient-to-tr from-emerald-300/20 via-teal-100/30 to-transparent rounded-full blur-3xl"
                />

                {/* Animated Medical Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f766e08_1px,transparent_1px),linear-gradient(to_bottom,#0f766e08_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_10%,#000_70%,transparent_100%)]"></div>

                {/* Floating Medical Badges */}
                <motion.div
                    animate={{ y: [0, -15, 0], rotate: [0, 8, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-28 left-10 hidden xl:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/70 backdrop-blur-md border border-white/60 shadow-lg shadow-teal-500/5 text-xs font-bold text-teal-700"
                >
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                    🧪 Verified Quality
                </motion.div>

                <motion.div
                    animate={{ y: [0, 18, 0], rotate: [0, -6, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-1/2 right-12 hidden xl:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/70 backdrop-blur-md border border-white/60 shadow-lg shadow-emerald-500/5 text-xs font-bold text-slate-700"
                >
                    <span className="text-teal-600 font-black">💊 100%</span> Authentic Formulas
                </motion.div>

                {/* Floating Plus Accent Shapes */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute top-40 right-1/4 opacity-15 text-teal-600"
                >
                    <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 11h-6V5a1 1 0 00-2 0v6H5a1 1 0 000 2h6v6a1 1 0 002 0v-6h6a1 1 0 000-2z"/>
                    </svg>
                </motion.div>
            </div>

            {/* ==================== 🚀 MAIN CONTENT 🚀 ==================== */}
            <div className="max-w-7xl mx-auto space-y-8 relative z-10">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center max-w-2xl mx-auto"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-bold mb-3 shadow-xs"
                    >
                        <span>🔍 Smart Search Engine</span>
                    </motion.div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Explore Medicines
                    </h1>
                    <p className="mt-2 text-slate-500 font-medium text-sm sm:text-base">
                        Search and filter through available pharmaceuticals, dosages, and categories.
                    </p>
                </motion.div>

                {/* Filter and Search Bar Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                    className="bg-white/80 backdrop-blur-xl p-4 sm:p-6 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between"
                >

                    {/* Search Input */}
                    <div className="relative w-full md:flex-1">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search medicine name, manufacturer..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-slate-900 placeholder-slate-400 text-sm font-medium focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all duration-200 focus:outline-none"
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div className="w-full md:w-64">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/80 text-slate-800 text-sm font-medium focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all duration-200 focus:outline-none cursor-pointer"
                        >
                            <option value="">All Categories</option>
                            {categories.map((categoryItem) => (
                                <option key={categoryItem.id} value={categoryItem.id}>
                                    {categoryItem.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center justify-center py-20"
                    >
                        <motion.div
                            animate={{ rotate: 360, scale: [1, 1.15, 1] }}
                            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                            className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full shadow-lg shadow-teal-500/10"
                        />
                        <motion.p
                            animate={{ opacity: [0.4, 1, 0.4] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                            className="mt-4 text-sm font-semibold text-slate-500"
                        >
                            Searching medicines...
                        </motion.p>
                    </motion.div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="p-6 bg-rose-50 border border-rose-200 rounded-3xl text-center max-w-md mx-auto shadow-sm"
                    >
                        <p className="text-rose-600 font-semibold">{error}</p>
                    </motion.div>
                )}

                {/* Empty State */}
                {!loading && !error && medicines.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4 }}
                        className="bg-white/80 backdrop-blur-md rounded-3xl border border-dashed border-slate-300 p-12 text-center text-slate-400 max-w-lg mx-auto shadow-sm"
                    >
                        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-base font-medium text-slate-600">No medicines found matching your criteria.</p>
                        <p className="text-xs text-slate-400 mt-1">Try resetting the search filter or checking for typos.</p>
                    </motion.div>
                )}

                {/* Medicines Grid */}
                {!loading && !error && medicines.length > 0 && (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <AnimatePresence>
                            {medicines.map((medicine) => (
                                <motion.div
                                    key={medicine.id}
                                    variants={cardVariants}
                                    layout
                                    whileHover={{ y: -6, transition: { duration: 0.2 } }}
                                >
                                    <MedicineCard medicine={medicine} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}

            </div>
        </div>
    );
}

export default Medicines;