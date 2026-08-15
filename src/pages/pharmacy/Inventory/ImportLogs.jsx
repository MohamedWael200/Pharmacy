import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion, animate } from "framer-motion";
import { getImportLogs } from "../../../services/pharmacyService.js";

// Floating "document" shape — this page is about import records/reports,
// so the signature motif is soft rounded rectangles (papers) drifting
// behind the list, distinct from the motifs used on the other pages.
function FloatingDocument({ className, delay = 0, duration = 15, rotate = 8 }) {
    return (
        <motion.div
            className={`absolute rounded-xl ${className}`}
            initial={{ opacity: 0, y: 0, rotate: 0 }}
            animate={{
                opacity: 1,
                y: [0, -16, 0],
                rotate: [0, rotate, 0],
            }}
            transition={{
                opacity: { duration: 1.2, delay },
                y: { duration, repeat: Infinity, ease: "easeInOut", delay },
                rotate: { duration: duration * 1.3, repeat: Infinity, ease: "easeInOut", delay },
            }}
        />
    );
}

// Animates a number counting up from 0 to `value` whenever `value` changes.
function AnimatedNumber({ value, className }) {
    const [display, setDisplay] = useState(0);
    const shouldReduceMotion = useReducedMotion();

    useEffect(() => {
        if (shouldReduceMotion) {
            setDisplay(value);
            return;
        }

        const controls = animate(0, value, {
            duration: 0.9,
            ease: [0.22, 1, 0.36, 1],
            onUpdate: (v) => setDisplay(Math.round(v)),
        });

        return () => controls.stop();
    }, [value, shouldReduceMotion]);

    return <span className={className}>{display}</span>;
}

const listVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

function ImportLogs() {
    const shouldReduceMotion = useReducedMotion();
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchLogs() {
            try {
                const response = await getImportLogs();

                setLogs(response.data.data.data);
            } catch (error) {
                console.log(error);
                setError("Failed to load import logs.");
            } finally {
                setLoading(false);
            }
        }

        fetchLogs();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-slate-50/50">
                <motion.div
                    className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
                <p className="mt-4 text-sm font-semibold text-slate-500">Loading import logs...</p>
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
                    <div className="absolute -top-24 right-[-6rem] w-96 h-96 rounded-full bg-teal-200/25 blur-3xl" />
                    <div className="absolute bottom-[-8rem] -left-24 w-[26rem] h-[26rem] rounded-full bg-emerald-200/25 blur-3xl" />

                    <FloatingDocument className="top-[10%] left-[8%] w-10 h-14 bg-teal-300/25 border border-teal-400/20" delay={0} duration={14} />
                    <FloatingDocument className="top-[24%] right-[12%] w-12 h-16 bg-emerald-300/20 border border-emerald-400/20" delay={1.3} duration={17} rotate={-10} />
                    <FloatingDocument className="bottom-[18%] left-[16%] w-9 h-12 bg-cyan-300/20 border border-cyan-400/20" delay={0.7} duration={12} rotate={12} />
                    <FloatingDocument className="bottom-[10%] right-[18%] w-11 h-14 bg-teal-200/25 border border-teal-300/20" delay={2} duration={16} rotate={-8} />

                    <div
                        className="absolute inset-0 opacity-[0.1]"
                        style={{
                            backgroundImage: "radial-gradient(circle, #0d9488 1px, transparent 1px)",
                            backgroundSize: "36px 36px",
                        }}
                    />
                </div>
            )}

            <div className="relative max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="flex items-center gap-3 mb-8 border-b border-slate-200/60 pb-6"
                >
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Import Logs
                    </h1>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-100">
                        {logs.length} Run{logs.length === 1 ? "" : "s"}
                    </span>
                </motion.div>

                {logs.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center text-slate-400 shadow-sm"
                    >
                        <svg className="w-12 h-12 mx-auto mb-3 stroke-current opacity-40 text-slate-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-base font-semibold text-slate-600">No import logs found.</p>
                        <p className="text-xs text-slate-400 mt-1">Excel import runs will show up here.</p>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={listVariants}
                        initial="hidden"
                        animate="show"
                        className="grid gap-5"
                    >
                        <AnimatePresence>
                            {logs.map((log) => (
                                <motion.div
                                    key={log.id}
                                    variants={cardVariants}
                                    layout
                                    className="bg-white/95 backdrop-blur rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 p-6 hover:border-teal-100 transition-colors duration-200"
                                >
                                    <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                                        <div>
                                            <h2 className="text-lg font-bold text-slate-900">
                                                {log.file_name}
                                            </h2>

                                            <p className="text-sm text-slate-500 mt-1">
                                                Imported on{" "}
                                                {new Date(log.created_at).toLocaleString()}
                                            </p>
                                        </div>

                                        <motion.span
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: 0.15, duration: 0.3 }}
                                            className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 ${
                                                log.failed_rows === 0
                                                    ? "bg-emerald-100 text-emerald-700"
                                                    : "bg-amber-100 text-amber-700"
                                            }`}
                                        >
                                            {log.failed_rows === 0
                                                ? "Success"
                                                : "Completed with Errors"}
                                        </motion.span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-4 mt-6">
                                        <div className="bg-slate-50 rounded-xl p-4">
                                            <p className="text-xs text-slate-500">
                                                Total Rows
                                            </p>

                                            <p className="text-2xl font-bold text-slate-800">
                                                <AnimatedNumber value={log.total_rows} />
                                            </p>
                                        </div>

                                        <div className="bg-emerald-50 rounded-xl p-4">
                                            <p className="text-xs text-emerald-600">
                                                Imported
                                            </p>

                                            <p className="text-2xl font-bold text-emerald-700">
                                                <AnimatedNumber value={log.imported_rows} />
                                            </p>
                                        </div>

                                        <div className="bg-rose-50 rounded-xl p-4">
                                            <p className="text-xs text-rose-600">
                                                Failed
                                            </p>

                                            <p className="text-2xl font-bold text-rose-700">
                                                <AnimatedNumber value={log.failed_rows} />
                                            </p>
                                        </div>
                                    </div>

                                    {log.errors?.length > 0 && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: "auto" }}
                                            transition={{ delay: 0.2, duration: 0.4 }}
                                            className="mt-6 overflow-hidden"
                                        >
                                            <h3 className="font-semibold text-rose-600 mb-3">
                                                Errors
                                            </h3>

                                            <div className="space-y-3">
                                                {log.errors.map((error, index) => (
                                                    <motion.div
                                                        key={index}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.25 + index * 0.05, duration: 0.3 }}
                                                        className="bg-rose-50 border border-rose-200 rounded-xl p-4"
                                                    >
                                                        <p className="font-semibold mb-2">
                                                            Row {error.row}
                                                        </p>

                                                        <ul className="list-disc list-inside text-sm text-rose-700">
                                                            {error.errors.map((message, i) => (
                                                                <li key={i}>
                                                                    {message}
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
}

export default ImportLogs;