import { useParams } from "react-router-dom";
import { detailsMedicines } from "../services/medicineService.js";
import { useEffect, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import PharmacyCard from "../components/PharmacyCard.jsx";

// Decorative floating capsule/pill shape used in the background.
// Kept as a tiny inline component so the page stays self-contained.
function FloatingCapsule({ className, delay = 0, duration = 14, rotate = 25 }) {
    return (
        <motion.div
            className={`absolute rounded-full ${className}`}
            initial={{ y: 0, rotate: 0, opacity: 0 }}
            animate={{
                y: [0, -22, 0],
                rotate: [0, rotate, 0],
                opacity: 1,
            }}
            transition={{
                y: { duration, repeat: Infinity, ease: "easeInOut", delay },
                rotate: { duration: duration * 1.3, repeat: Infinity, ease: "easeInOut", delay },
                opacity: { duration: 1.2, delay },
            }}
        />
    );
}

const containerVariants = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.05,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
};

function MedicineDetails() {
    const { id } = useParams();
    const shouldReduceMotion = useReducedMotion();

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
                <motion.div
                    className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
                <p className="mt-4 text-sm font-semibold text-slate-500">Loading medicine details...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50/50 px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center max-w-md"
                >
                    <p className="text-rose-600 font-semibold">{error}</p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="relative min-h-[calc(100vh-4rem)] bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">

            {/* ---- Decorative background layer ---- */}
            {!shouldReduceMotion && (
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                    {/* soft blurred color fields */}
                    <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-teal-200/30 blur-3xl" />
                    <div className="absolute top-1/3 -right-24 w-[28rem] h-[28rem] rounded-full bg-emerald-200/30 blur-3xl" />
                    <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-cyan-100/40 blur-3xl" />

                    {/* drifting capsule / pill shapes, echoing the "medicine" subject */}
                    <FloatingCapsule
                        className="top-[8%] left-[6%] w-16 h-8 bg-gradient-to-r from-teal-400/40 to-emerald-300/40"
                        delay={0}
                        duration={12}
                    />
                    <FloatingCapsule
                        className="top-[20%] right-[10%] w-10 h-24 bg-gradient-to-b from-emerald-400/30 to-teal-200/30"
                        delay={1.2}
                        duration={16}
                        rotate={-20}
                    />
                    <FloatingCapsule
                        className="bottom-[18%] left-[12%] w-20 h-10 bg-gradient-to-r from-cyan-300/30 to-teal-400/30"
                        delay={0.6}
                        duration={18}
                        rotate={15}
                    />
                    <FloatingCapsule
                        className="bottom-[10%] right-[18%] w-8 h-8 bg-teal-300/40"
                        delay={2}
                        duration={10}
                    />

                    {/* faint scattered dots, molecule-style */}
                    <div className="absolute inset-0 opacity-[0.15]" style={{
                        backgroundImage: "radial-gradient(circle, #0d9488 1px, transparent 1px)",
                        backgroundSize: "34px 34px",
                    }} />
                </div>
            )}

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="relative max-w-5xl mx-auto space-y-8"
            >

                {/* Medicine Hero Card */}
                <motion.div
                    variants={itemVariants}
                    className="bg-white/90 backdrop-blur rounded-3xl p-8 sm:p-10 shadow-xl shadow-slate-200/60 border border-slate-100"
                >
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-100">
                        <div>
                            <motion.span
                                initial={{ opacity: 0, x: -12 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.15, duration: 0.4 }}
                                className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-teal-700 mb-2"
                            >
                                {medicineData.category?.name || "General"}
                            </motion.span>
                            <motion.h1
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.22, duration: 0.5 }}
                                className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight"
                            >
                                {medicineData.name}
                            </motion.h1>
                            <p className="text-sm italic text-slate-500 mt-1">
                                {medicineData.scientific_name}
                            </p>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.4 }}
                            className="bg-slate-50 border border-slate-200/80 px-4 py-2 rounded-xl text-right"
                        >
                            <span className="block text-[10px] uppercase font-bold text-slate-400">Barcode</span>
                            <span className="text-sm font-mono font-semibold text-slate-700">{medicineData.barcode}</span>
                        </motion.div>
                    </div>

                    {/* Metadata Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
                        {[
                            { label: "Manufacturer", value: medicineData.manufacturer },
                            { label: "Dosage", value: medicineData.dosage },
                            { label: "Type", value: medicineData.type },
                        ].map((field, i) => (
                            <motion.div
                                key={field.label}
                                initial={{ opacity: 0, y: 14 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.35 + i * 0.08, duration: 0.4 }}
                                whileHover={{ y: -3 }}
                                className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100"
                            >
                                <span className="block text-xs font-semibold uppercase text-slate-400 mb-1">{field.label}</span>
                                <span className="text-sm font-bold text-slate-800">{field.value}</span>
                            </motion.div>
                        ))}
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
                </motion.div>

                {/* Available Pharmacies Section */}
                <motion.div variants={itemVariants}>
                    <div className="flex items-center gap-3 mb-6">
                        <motion.div
                            className="w-3 h-8 bg-teal-500 rounded-full"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: 1 }}
                            transition={{ delay: 0.4, duration: 0.4 }}
                            style={{ originY: 0 }}
                        />
                        <h2 className="text-2xl font-bold text-slate-900">
                            Available Pharmacies ({medicineData.pharmacies?.length || 0})
                        </h2>
                    </div>

                    <AnimatePresence>
                        {medicineData.pharmacies.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center text-slate-400"
                            >
                                <p className="text-sm font-medium">No pharmacies currently have this medicine in stock.</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            >
                                {medicineData.pharmacies.map((pharmacy) => (
                                    <motion.div key={pharmacy.inventory_id} variants={itemVariants}>
                                        <PharmacyCard pharmacy={pharmacy} />
                                    </motion.div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

            </motion.div>
        </div>
    );
}

export default MedicineDetails;