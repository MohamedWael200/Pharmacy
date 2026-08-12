import { useParams } from "react-router-dom";
import { detailsMedicines } from "../services/medicineService.js";
import { useEffect, useState } from "react";
import PharmacyCard from "../components/PharmacyCard.jsx";

function MedicineDetails() {
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [medicineData, setMedicineData] = useState(null);

    useEffect(() => {
        async function fetchMedicineDetails() {
            try {
                const response = await detailsMedicines(id);
                setMedicineData(response.data.data);
            } catch (error) {
                console.log(error);
                setError("Failed to load medicine.");
            } finally {
                setLoading(false);
            }
        }

        fetchMedicineDetails();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-slate-50/50">
                <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-sm font-semibold text-slate-500">Loading medicine details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50/50 px-4">
                <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center max-w-md">
                    <p className="text-rose-600 font-semibold">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto space-y-8">

                {/* Medicine Hero Card */}
                <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/60 border border-slate-100">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-100">
                        <div>
                            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-teal-700 mb-2">
                                {medicineData.category?.name || "General"}
                            </span>
                            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                                {medicineData.name}
                            </h1>
                            <p className="text-sm italic text-slate-500 mt-1">
                                {medicineData.scientific_name}
                            </p>
                        </div>

                        <div className="bg-slate-50 border border-slate-200/80 px-4 py-2 rounded-xl text-right">
                            <span className="block text-[10px] uppercase font-bold text-slate-400">Barcode</span>
                            <span className="text-sm font-mono font-semibold text-slate-700">{medicineData.barcode}</span>
                        </div>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
                        <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                            <span className="block text-xs font-semibold uppercase text-slate-400 mb-1">Manufacturer</span>
                            <span className="text-sm font-bold text-slate-800">{medicineData.manufacturer}</span>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                            <span className="block text-xs font-semibold uppercase text-slate-400 mb-1">Dosage</span>
                            <span className="text-sm font-bold text-slate-800">{medicineData.dosage}</span>
                        </div>

                        <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100">
                            <span className="block text-xs font-semibold uppercase text-slate-400 mb-1">Type</span>
                            <span className="text-sm font-bold text-slate-800">{medicineData.type}</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Description</h3>
                        <p className="text-slate-600 text-sm leading-relaxed bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
                            {medicineData.description || "No description provided."}
                        </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                        <span className="text-xs text-slate-400">
                            Added on: {new Date(medicineData.created_at).toLocaleDateString()}
                        </span>
                    </div>
                </div>

                {/* Available Pharmacies Section */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-3 h-8 bg-teal-500 rounded-full"></div>
                        <h2 className="text-2xl font-bold text-slate-900">
                            Available Pharmacies ({medicineData.pharmacies?.length || 0})
                        </h2>
                    </div>

                    {medicineData.pharmacies.length === 0 ? (
                        <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center text-slate-400">
                            <p className="text-sm font-medium">No pharmacies currently have this medicine in stock.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {medicineData.pharmacies.map((pharmacy) => (
                                <PharmacyCard
                                    key={pharmacy.inventory_id}
                                    pharmacy={pharmacy}
                                />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

export default MedicineDetails;