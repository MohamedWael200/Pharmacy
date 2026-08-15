import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPharmacyReservations } from "../../services/pharmacyService.js";
import { motion, AnimatePresence } from "framer-motion";

// مكون عدّاد الأرقام التفاعلي
function AnimatedCounter({ value, duration = 1.5, suffix = "" }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = parseInt(value, 10);
        if (start === end) {
            setCount(end);
            return;
        }
        const totalMiliseconds = duration * 1000;
        const incrementTime = 20;
        const steps = totalMiliseconds / incrementTime;
        const increment = (end - start) / steps;

        const timer = setInterval(() => {
            start += increment;
            if ((increment > 0 && start >= end) || (increment < 0 && start <= end)) {
                setCount(end);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, incrementTime);

        return () => clearInterval(timer);
    }, [value, duration]);

    return (
        <span>
            {count.toLocaleString()}
            {suffix}
        </span>
    );
}

function PharmacyDashboard() {
    const [stats, setStats] = useState({
        totalReservations: 0,
        pending: 0,
        confirmed: 0,
        completed: 0,
        totalRevenue: 0,
    });
    const [recentReservations, setRecentReservations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchDashboardData() {
            try {
                setLoading(true);
                const response = await getPharmacyReservations("");
                const reservations = response?.data?.data?.data || [];

                setRecentReservations(reservations.slice(0, 5));

                let pendingCount = 0;
                let confirmedCount = 0;
                let completedCount = 0;
                let revenue = 0;

                reservations.forEach((item) => {
                    const status = item.status?.toLowerCase();
                    if (status === "pending") pendingCount++;
                    if (status === "confirmed") confirmedCount++;
                    if (status === "completed") {
                        completedCount++;
                        revenue += Number(item.total || 0);
                    }
                });

                setStats({
                    totalReservations: reservations.length,
                    pending: pendingCount,
                    confirmed: confirmedCount,
                    completed: completedCount,
                    totalRevenue: revenue,
                });
            } catch (err) {
                console.error("Failed to load dashboard stats", err);
            } finally {
                setLoading(false);
            }
        }

        fetchDashboardData();
    }, []);

    const weeklyAnalytics = [
        { day: "Mon", count: 12, revenue: 450 },
        { day: "Tue", count: 19, revenue: 820 },
        { day: "Wed", count: 15, revenue: 600 },
        { day: "Thu", count: 25, revenue: 1100 },
        { day: "Fri", count: 22, revenue: 950 },
        { day: "Sat", count: 30, revenue: 1400 },
        { day: "Sun", count: 18, revenue: 750 },
    ];

    const maxChartValue = Math.max(...weeklyAnalytics.map((d) => d.revenue));

    // Variants للحركات المتتابعة
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-slate-50/50">
                <motion.div
                    animate={{ rotate: 360, scale: [1, 1.15, 1] }}
                    transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                    className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full shadow-lg"
                />
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
                    className="mt-4 text-sm font-semibold text-slate-500"
                >
                    Loading Pharmacy Dashboard...
                </motion.p>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 py-8 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            {/* Background Light Glows */}
            <div className="absolute top-10 left-10 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none"></div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-7xl mx-auto space-y-8 relative z-10"
            >
                {/* Header */}
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-6"
                >
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                            Pharmacy Dashboard
                            <motion.span
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500"
                            ></motion.span>
                        </h1>
                        <p className="text-slate-500 font-medium text-sm mt-1">
                            Welcome back! Here's an overview of your pharmacy's performance and orders.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                            <Link
                                to="/dashboard/inventory"
                                className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-sm shadow-sm transition-all block"
                            >
                                Manage Inventory
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                            <Link
                                to="/dashboard/pharmacy-reservations"
                                className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm shadow-md shadow-teal-600/20 transition-all block"
                            >
                                View Reservations
                            </Link>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Stat Cards Grid */}
                <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                    {/* Revenue Card */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -6, boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.08)" }}
                        className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group transition-all"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Revenue</p>
                                <h3 className="text-2xl font-black text-slate-900 mt-2">
                                    <AnimatedCounter value={stats.totalRevenue} />{" "}
                                    <span className="text-sm font-bold text-teal-600">EGP</span>
                                </h3>
                            </div>
                            <motion.div
                                whileHover={{ rotate: 12, scale: 1.1 }}
                                className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </motion.div>
                        </div>
                        <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-600 font-semibold">
                            <span>▲ +12%</span>
                            <span className="text-slate-400 font-normal">from last week</span>
                        </div>
                    </motion.div>

                    {/* Pending Orders */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -6, boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.08)" }}
                        className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 group transition-all"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Pending Actions</p>
                                <h3 className="text-2xl font-black text-slate-900 mt-2">
                                    <AnimatedCounter value={stats.pending} />
                                </h3>
                            </div>
                            <motion.div
                                whileHover={{ rotate: 12, scale: 1.1 }}
                                className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </motion.div>
                        </div>
                        <p className="mt-4 text-xs text-slate-400">Requires immediate confirmation</p>
                    </motion.div>

                    {/* Active/Confirmed */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -6, boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.08)" }}
                        className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 group transition-all"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Confirmed Orders</p>
                                <h3 className="text-2xl font-black text-slate-900 mt-2">
                                    <AnimatedCounter value={stats.confirmed} />
                                </h3>
                            </div>
                            <motion.div
                                whileHover={{ rotate: 12, scale: 1.1 }}
                                className="w-12 h-12 rounded-2xl bg-sky-50 flex items-center justify-center text-sky-600 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </motion.div>
                        </div>
                        <p className="mt-4 text-xs text-slate-400">Ready for pickup by patients</p>
                    </motion.div>

                    {/* Total Reservations */}
                    <motion.div
                        variants={itemVariants}
                        whileHover={{ y: -6, boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.08)" }}
                        className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 group transition-all"
                    >
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Reservations</p>
                                <h3 className="text-2xl font-black text-slate-900 mt-2">
                                    <AnimatedCounter value={stats.totalReservations} />
                                </h3>
                            </div>
                            <motion.div
                                whileHover={{ rotate: 12, scale: 1.1 }}
                                className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </motion.div>
                        </div>
                        <p className="mt-4 text-xs text-slate-400">Across all statuses</p>
                    </motion.div>
                </motion.div>

                {/* Analytics Section & Conversion Rates */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Custom Visual Bar Chart */}
                    <motion.div
                        variants={itemVariants}
                        className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900">Weekly Revenue & Volume</h2>
                                    <p className="text-xs text-slate-400">Sales performance over the last 7 days</p>
                                </div>
                                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                                    This Week
                                </span>
                            </div>

                            {/* Chart Bars */}
                            <div className="h-56 flex items-end justify-between gap-3 pt-6 border-b border-slate-100">
                                {weeklyAnalytics.map((item, index) => {
                                    const heightPercentage = Math.round((item.revenue / maxChartValue) * 100);
                                    return (
                                        <div key={index} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                                            {/* Animated Tooltip on hover */}
                                            <motion.div
                                                initial={{ opacity: 0, y: 5 }}
                                                whileHover={{ opacity: 1, y: 0 }}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded-lg mb-1 shadow-md pointer-events-none"
                                            >
                                                {item.revenue} EGP
                                            </motion.div>

                                            <div className="w-full bg-slate-100 rounded-t-xl h-full flex items-end overflow-hidden">
                                                <motion.div
                                                    initial={{ height: "0%" }}
                                                    whileInView={{ height: `${heightPercentage}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
                                                    className="w-full bg-gradient-to-t from-teal-600 to-emerald-400 rounded-t-xl group-hover:brightness-110"
                                                ></motion.div>
                                            </div>

                                            <span className="text-xs font-semibold text-slate-500 mt-2">{item.day}</span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="flex justify-between items-center mt-6 text-xs text-slate-500 font-medium">
                            <div className="flex items-center gap-2">
                                <span className="w-3 h-3 rounded-full bg-teal-500 animate-ping"></span>
                                <span>Revenue Volume</span>
                            </div>
                            <span>Peak Day: <strong className="text-slate-800">Saturday (1,400 EGP)</strong></span>
                        </div>
                    </motion.div>

                    {/* Progress Metrics / Completion Meter */}
                    <motion.div
                        variants={itemVariants}
                        className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 flex flex-col justify-between"
                    >
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 mb-1">Order Fulfillment</h2>
                            <p className="text-xs text-slate-400 mb-6">Reservation status distribution ratio</p>

                            <div className="space-y-5">
                                {/* Completed */}
                                <div>
                                    <div className="flex justify-between text-xs font-semibold mb-1">
                                        <span className="text-slate-600">Completed Rate</span>
                                        <span className="text-teal-600">
                                            {stats.totalReservations ? Math.round((stats.completed / stats.totalReservations) * 100) : 0}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: "0%" }}
                                            whileInView={{
                                                width: `${stats.totalReservations ? (stats.completed / stats.totalReservations) * 100 : 0}%`
                                            }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, ease: "easeOut" }}
                                            className="bg-teal-500 h-full rounded-full"
                                        />
                                    </div>
                                </div>

                                {/* Pending */}
                                <div>
                                    <div className="flex justify-between text-xs font-semibold mb-1">
                                        <span className="text-slate-600">Pending Review</span>
                                        <span className="text-amber-600">
                                            {stats.totalReservations ? Math.round((stats.pending / stats.totalReservations) * 100) : 0}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: "0%" }}
                                            whileInView={{
                                                width: `${stats.totalReservations ? (stats.pending / stats.totalReservations) * 100 : 0}%`
                                            }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                                            className="bg-amber-500 h-full rounded-full"
                                        />
                                    </div>
                                </div>

                                {/* Confirmed */}
                                <div>
                                    <div className="flex justify-between text-xs font-semibold mb-1">
                                        <span className="text-slate-600">Confirmed (Awaiting Pickup)</span>
                                        <span className="text-sky-600">
                                            {stats.totalReservations ? Math.round((stats.confirmed / stats.totalReservations) * 100) : 0}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: "0%" }}
                                            whileInView={{
                                                width: `${stats.totalReservations ? (stats.confirmed / stats.totalReservations) * 100 : 0}%`
                                            }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                                            className="bg-sky-500 h-full rounded-full"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="mt-8 p-4 bg-teal-50/60 rounded-2xl border border-teal-100 cursor-pointer"
                        >
                            <p className="text-xs text-teal-800 font-semibold flex items-center gap-1">
                                💡 Quick Tip
                            </p>
                            <p className="text-[11px] text-teal-600 mt-0.5">
                                Responding to pending reservations under 10 minutes increases patient retention by 40%.
                            </p>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Recent Reservations Table */}
                <motion.div
                    variants={itemVariants}
                    className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40 p-6 sm:p-8"
                >
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-slate-900">Recent Reservations</h2>
                            <p className="text-xs text-slate-400">Latest incoming patient orders</p>
                        </div>
                        <Link
                            to="/dashboard/pharmacy-reservations"
                            className="text-xs font-bold text-teal-600 hover:text-teal-700 hover:underline"
                        >
                            View All →
                        </Link>
                    </div>

                    {recentReservations.length === 0 ? (
                        <p className="text-sm text-slate-400 text-center py-6">No recent reservations found.</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                <tr className="border-b border-slate-100 text-xs font-bold uppercase tracking-wider text-slate-400">
                                    <th className="pb-3">Order ID</th>
                                    <th className="pb-3">Patient</th>
                                    <th className="pb-3">Date</th>
                                    <th className="pb-3">Status</th>
                                    <th className="pb-3 text-right">Total</th>
                                </tr>
                                </thead>
                                <motion.tbody
                                    variants={containerVariants}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="divide-y divide-slate-50 text-sm font-medium"
                                >
                                    {recentReservations.map((order) => (
                                        <motion.tr
                                            key={order.id}
                                            variants={itemVariants}
                                            whileHover={{ backgroundColor: "rgba(241, 245, 249, 0.6)" }}
                                            className="transition-colors"
                                        >
                                            <td className="py-4 font-bold text-slate-800">#{order.id}</td>
                                            <td className="py-4 text-slate-600">
                                                {order.patient?.name || order.patient?.phone || "Patient"}
                                            </td>
                                            <td className="py-4 text-slate-400 text-xs">
                                                {new Date(order.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase border ${
                                                    order.status === "pending" ? "bg-amber-50 text-amber-700 border-amber-200" :
                                                        order.status === "confirmed" ? "bg-teal-50 text-teal-700 border-teal-200" :
                                                            order.status === "completed" ? "bg-emerald-50 text-emerald-700 border-emerald-200" :
                                                                "bg-slate-50 text-slate-600 border-slate-200"
                                                }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-4 text-right font-black text-teal-700">
                                                {order.total} EGP
                                            </td>
                                        </motion.tr>
                                    ))}
                                </motion.tbody>
                            </table>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
}

export default PharmacyDashboard;