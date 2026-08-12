import { useEffect, useState } from "react";
import {
    getCategories,
    searchMedicines,
} from "../services/medicineService";
import { Link } from "react-router-dom";
import MedicineCard from "../components/MedicineCard.jsx";

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

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center max-w-2xl mx-auto">
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                        Explore Medicines
                    </h1>
                    <p className="mt-2 text-slate-500 font-medium text-sm sm:text-base">
                        Search and filter through available pharmaceuticals, dosages, and categories.
                    </p>
                </div>

                {/* Filter and Search Bar Container */}
                <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-lg shadow-slate-200/50 border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">

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
                            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm font-medium focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all duration-200 focus:outline-none"
                        />
                    </div>

                    {/* Category Dropdown */}
                    <div className="w-full md:w-64">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all duration-200 focus:outline-none cursor-pointer"
                        >
                            <option value="">All Categories</option>
                            {categories.map((categoryItem) => (
                                <option key={categoryItem.id} value={categoryItem.id}>
                                    {categoryItem.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Loading State */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
                        <p className="mt-4 text-sm font-semibold text-slate-500">Searching medicines...</p>
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center max-w-md mx-auto">
                        <p className="text-rose-600 font-semibold">{error}</p>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && medicines.length === 0 && (
                    <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center text-slate-400 max-w-lg mx-auto">
                        <p className="text-base font-medium">No medicines found matching your criteria.</p>
                    </div>
                )}

                {/* Medicines Grid */}
                {!loading && !error && medicines.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {medicines.map((medicine) => (
                            <MedicineCard key={medicine.id} medicine={medicine} />
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}

export default Medicines;