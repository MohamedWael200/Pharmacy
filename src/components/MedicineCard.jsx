import { Link } from "react-router-dom";
function MedicineCard({ medicine }) {
    return (
        <Link
            to={`/medicines/${medicine.id}`}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-300 flex flex-col justify-between"
        >
            <div>
                {/* Image Box */}
                <div className="relative w-full h-52 bg-slate-100 overflow-hidden">
                    <img
                        src={
                            medicine.image ||
                            "https://placehold.co/400x250?text=No+Image"
                        }
                        alt={medicine.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-teal-700 shadow-sm">
                        {medicine.category?.name || "General"}
                    </span>
                </div>

                {/* Details */}
                <div className="p-6 space-y-3">
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                            {medicine.name}
                        </h2>
                        <p className="text-xs italic text-slate-400 mt-0.5">
                            {medicine.scientific_name}
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-xs">
                        <div className="bg-slate-50 p-2.5 rounded-xl">
                            <span className="block text-slate-400 font-semibold mb-0.5">Dosage</span>
                            <span className="font-bold text-slate-700">{medicine.dosage}</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-xl">
                            <span className="block text-slate-400 font-semibold mb-0.5">Type</span>
                            <span className="font-bold text-slate-700">{medicine.type}</span>
                        </div>
                    </div>

                    <p className="text-xs text-slate-500 pt-1">
                        <strong className="text-slate-700 font-semibold">Manufacturer:</strong> {medicine.manufacturer}
                    </p>
                </div>
            </div>

            {/* View Details Action Bar */}
            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-600 group-hover:text-teal-700">
                <span>View Availability</span>
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
            </div>
        </Link>
    );
}

export default MedicineCard;