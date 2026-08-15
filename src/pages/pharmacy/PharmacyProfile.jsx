import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { getPharmacyProfile } from "../../services/pharmacyService.js";

// Floating "badge" ring — this page is about identity/trust (a verified
// pharmacy profile), so the signature motif is soft concentric rings
// drifting behind the card, distinct from capsules/blobs/boxes elsewhere.
function FloatingRing({ className, delay = 0, duration = 16 }) {
    return (
        <motion.div
            className={`absolute rounded-full border ${className}`}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{
                opacity: 1,
                scale: [0.95, 1.05, 0.95],
                rotate: [0, 20, 0],
            }}
            transition={{
                opacity: { duration: 1, delay },
                scale: { duration, repeat: Infinity, ease: "easeInOut", delay },
                rotate: { duration: duration * 1.4, repeat: Infinity, ease: "easeInOut", delay },
            }}
        />
    );
}

const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

function PharmacyProfile() {
    const shouldReduceMotion = useReducedMotion();
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await getPharmacyProfile();
                setProfile(response.data.data);
            } catch (error) {
                console.log(error);
                setError("Failed to load pharmacy profile.");
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-slate-50/50">
                <motion.div
                    className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
                <p className="mt-4 text-sm font-semibold text-slate-500">Loading pharmacy profile...</p>
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
                    <div className="absolute -top-24 -left-20 w-96 h-96 rounded-full bg-teal-200/25 blur-3xl" />
                    <div className="absolute bottom-[-8rem] right-[-6rem] w-[26rem] h-[26rem] rounded-full bg-emerald-200/25 blur-3xl" />

                    <FloatingRing className="top-[14%] left-[10%] w-24 h-24 border-teal-300/30" delay={0} duration={14} />
                    <FloatingRing className="top-[26%] right-[14%] w-16 h-16 border-emerald-300/30" delay={1.2} duration={17} />
                    <FloatingRing className="bottom-[16%] left-[18%] w-20 h-20 border-cyan-300/25" delay={0.6} duration={12} />
                    <FloatingRing className="bottom-[10%] right-[22%] w-12 h-12 border-teal-200/30" delay={2} duration={15} />

                    <div
                        className="absolute inset-0 opacity-[0.1]"
                        style={{
                            backgroundImage: "radial-gradient(circle, #0d9488 1px, transparent 1px)",
                            backgroundSize: "36px 36px",
                        }}
                    />
                </div>
            )}

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="relative max-w-4xl mx-auto"
            >
                <motion.div
                    variants={itemVariants}
                    className="bg-white/95 backdrop-blur rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden"
                >

                    {/* Header Banner — slow animated gradient shift */}
                    <motion.div
                        className="h-36 relative"
                        style={{
                            backgroundImage: "linear-gradient(120deg, #14b8a6, #10b981, #14b8a6)",
                            backgroundSize: "200% 200%",
                        }}
                        animate={shouldReduceMotion ? {} : { backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute left-6 sm:left-8 bottom-0 translate-y-1/2"
                        >
                            {profile.logo ? (
                                <img
                                    src={profile.logo}
                                    alt={profile.name}
                                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white object-cover bg-white shadow-lg"
                                />
                            ) : (
                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white bg-teal-50 flex items-center justify-center text-4xl shadow-lg">
                                    🏥
                                </div>
                            )}
                        </motion.div>
                    </motion.div>

                    {/* Content Section */}
                    <div className="pt-16 sm:pt-18 px-6 sm:px-8 pb-8">

                        {/* Profile Name & Actions */}
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100"
                        >
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                    {profile.name}
                                </h1>
                                <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5 inline-flex items-center gap-1.5">
                                    <motion.svg
                                        className="w-4 h-4 text-teal-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.5, type: "spring", stiffness: 400, damping: 15 }}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </motion.svg>
                                    Verified Partner Pharmacy
                                </p>
                            </div>

                            {/* Update Button */}
                            <motion.div whileTap={{ scale: 0.96 }}>
                                <Link
                                    to="/dashboard/profile-update"
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 shadow-md shadow-teal-500/20 transition-colors duration-200"
                                >
                                    <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    <span>Update Profile</span>
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

                            <motion.div
                                variants={itemVariants}
                                whileHover={{ y: -3 }}
                                className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 space-y-1"
                            >
                                <span className="block text-xs font-semibold uppercase text-slate-400">
                                    Address
                                </span>
                                <p className="text-sm font-bold text-slate-800">
                                    {profile.address}
                                </p>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                whileHover={{ y: -3 }}
                                className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 space-y-1"
                            >
                                <span className="block text-xs font-semibold uppercase text-slate-400">
                                    Phone Number
                                </span>
                                <p className="text-sm font-bold text-slate-800">
                                    {profile.phone}
                                </p>
                            </motion.div>

                            <motion.div
                                variants={itemVariants}
                                whileHover={{ y: -3 }}
                                className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 space-y-1 font-mono text-xs sm:col-span-2"
                            >
                                <span className="block text-[10px] font-semibold uppercase text-slate-400 font-sans">
                                    Location Coordinates
                                </span>
                                <p className="text-slate-600">
                                    Latitude: <strong className="text-slate-800">{profile.latitude}</strong> | Longitude: <strong className="text-slate-800">{profile.longitude}</strong>
                                </p>
                            </motion.div>

                        </div>

                        {/* Opening Hours Box */}
                        {profile.opening_hours && (
                            <motion.div
                                variants={itemVariants}
                                className="mt-6 bg-slate-50/80 rounded-2xl p-6 border border-slate-100 space-y-4"
                            >
                                <div className="flex items-center gap-2 text-teal-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h2 className="text-base font-bold text-slate-900">
                                        Opening Hours
                                    </h2>
                                </div>

                                <div className="space-y-2 text-xs sm:text-sm divide-y divide-slate-200/60">
                                    {profile.opening_hours.sat_thu || profile.opening_hours.fri ? (
                                        <>
                                            {profile.opening_hours.sat_thu && (
                                                <div className="flex justify-between pt-2">
                                                    <span className="font-semibold text-slate-600">Saturday - Thursday</span>
                                                    <span className="font-bold text-teal-600">{profile.opening_hours.sat_thu}</span>
                                                </div>
                                            )}
                                            {profile.opening_hours.fri && (
                                                <div className="flex justify-between pt-2">
                                                    <span className="font-semibold text-slate-600">Friday</span>
                                                    <span className="font-bold text-teal-600">{profile.opening_hours.fri}</span>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        Object.entries(profile.opening_hours).map(([day, hours]) => (
                                            <div key={day} className="flex justify-between pt-2 capitalize">
                                                <span className="font-semibold text-slate-600">{day}</span>
                                                <span className="font-bold text-teal-600">{hours}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </motion.div>
                        )}

                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default PharmacyProfile;