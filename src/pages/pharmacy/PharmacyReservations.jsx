import { useEffect, useState } from "react";
import {
    acceptReservation,
    getPharmacyReservations,
    rejectReservation
} from "../../services/pharmacyService.js";

function PharmacyReservations() {
    const statuses = [
        { label: "All", value: "" },
        { label: "Pending", value: "pending" },
        { label: "Confirmed", value: "confirmed" },
        { label: "Completed", value: "completed" },
        { label: "Cancelled", value: "cancelled" },
        { label: "Expired", value: "expired" },
    ];

    const [pharmacyReservations, setPharmacyReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [status, setStatus] = useState("");
    const [message, setMessage] = useState({ text: "", type: "" });
    const [actionLoadingId, setActionLoadingId] = useState(null);

    useEffect(() => {
        fetchReservations();
    }, [status]);

    async function fetchReservations() {
        try {
            setLoading(true);
            const response = await getPharmacyReservations(status);
            setPharmacyReservations(response.data.data.data);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Failed to load reservations list.");
        } finally {
            setLoading(false);
        }
    }

    const showToast = (text, type = "success") => {
        setMessage({ text, type });
        setTimeout(() => setMessage({ text: "", type: "" }), 3000);
    };

    async function handleAccept(id) {
        try {
            setActionLoadingId(id);
            await acceptReservation(id);

            setPharmacyReservations((prev) =>
                prev.map((reservation) =>
                    reservation.id === id
                        ? { ...reservation, status: "confirmed" }
                        : reservation
                )
            );

            showToast("Reservation accepted successfully.", "success");
        } catch (error) {
            console.error(error);
            showToast("Failed to accept reservation.", "error");
        } finally {
            setActionLoadingId(null);
        }
    }

    async function handleReject(id) {
        try {
            setActionLoadingId(id);
            await rejectReservation(id);

            setPharmacyReservations((prev) =>
                prev.map((reservation) =>
                    reservation.id === id
                        ? { ...reservation, status: "cancelled" }
                        : reservation
                )
            );

            showToast("Reservation rejected successfully.", "error");
        } catch (error) {
            console.error(error);
            showToast("Failed to reject reservation.", "error");
        } finally {
            setActionLoadingId(null);
        }
    }

    const getStatusBadgeClass = (status) => {
        switch (status?.toLowerCase()) {
            case "completed":
                return "bg-emerald-50 text-emerald-700 border-emerald-200";
            case "confirmed":
                return "bg-teal-50 text-teal-700 border-teal-200";
            case "pending":
                return "bg-amber-50 text-amber-700 border-amber-200";
            case "cancelled":
                return "bg-rose-50 text-rose-700 border-rose-200";
            case "expired":
                return "bg-slate-100 text-slate-600 border-slate-200";
            default:
                return "bg-slate-50 text-slate-700 border-slate-200";
        }
    };

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-slate-50/50">
                <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-sm font-semibold text-slate-500">Loading reservations...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50/50 px-4">
                <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center max-w-md shadow-sm">
                    <p className="text-rose-600 font-semibold">{error}</p>
                    <button
                        onClick={fetchReservations}
                        className="mt-4 px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-700 transition-colors"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8 relative">
            {/* Toast Notifications */}
            {message.text && (
                <div
                    className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-xl font-semibold text-sm transition-all duration-300 animate-bounce ${
                        message.type === "error"
                            ? "bg-rose-600 text-white"
                            : "bg-teal-600 text-white"
                    }`}
                >
                    {message.text}
                </div>
            )}

            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header & Title */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/60 pb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                Pharmacy Reservations
                            </h1>
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-100">
                                {pharmacyReservations.length} Items
                            </span>
                        </div>
                        <p className="text-slate-500 font-medium text-sm">
                            Monitor and manage patient reservations and order statuses.
                        </p>
                    </div>
                </div>

                {/* Status Filter Tabs */}
                <div className="flex flex-wrap gap-2 sm:gap-3">
                    {statuses.map((item) => (
                        <button
                            key={item.value}
                            onClick={() => setStatus(item.value)}
                            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200 border ${
                                status === item.value
                                    ? "bg-teal-600 text-white border-teal-600 shadow-md shadow-teal-600/20"
                                    : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Reservations List / Empty State */}
                {pharmacyReservations.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center text-slate-400 shadow-sm">
                        <svg className="w-12 h-12 mx-auto mb-3 stroke-current opacity-40 text-slate-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <p className="text-base font-semibold text-slate-600">No reservations found.</p>
                        <p className="text-xs text-slate-400 mt-1">Try switching to a different status filter.</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {pharmacyReservations.map((reservation) => (
                            <div
                                key={reservation.id}
                                className="bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 p-6 sm:p-8 transition-all duration-200 hover:border-teal-100"
                            >
                                {/* Reservation Card Header */}
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100">
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                                                Reservation #{reservation.id}
                                            </h2>
                                            <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase border ${getStatusBadgeClass(reservation.status)}`}>
                                                {reservation.status}
                                            </span>
                                        </div>
                                        <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs text-slate-500 font-medium mt-2">
                                            <span>Reserved: <strong className="text-slate-700">{new Date(reservation.reserved_at).toLocaleString()}</strong></span>
                                            <span>Expires: <strong className="text-slate-700">{new Date(reservation.expires_at).toLocaleString()}</strong></span>
                                        </div>
                                    </div>
                                </div>

                                {/* Patient Details Box */}
                                <div className="mt-6 bg-slate-50/70 border border-slate-100 rounded-2xl p-4 sm:p-5">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                                        <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                        Patient Information
                                    </h3>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                                        <div>
                                            <span className="text-slate-400 text-xs block">Patient Name</span>
                                            <span className="font-semibold text-slate-800">{reservation.patient?.name || reservation.patient?.user?.name || "N/A"}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 text-xs block">Phone</span>
                                            <span className="font-semibold text-slate-800">{reservation.patient?.phone || "N/A"}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 text-xs block">Address</span>
                                            <span className="font-semibold text-slate-800">{reservation.patient?.address || "N/A"}</span>
                                        </div>
                                        <div>
                                            <span className="text-slate-400 text-xs block">Location</span>
                                            {reservation.patient?.latitude && reservation.patient?.longitude ? (
                                                <a
                                                    href={`https://maps.google.com/?q=${reservation.patient.latitude},${reservation.patient.longitude}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-700 font-semibold underline text-xs mt-0.5"
                                                >
                                                    📍 Open in Maps
                                                </a>
                                            ) : (
                                                <span className="font-semibold text-slate-800">N/A</span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Reserved Items List */}
                                <div className="mt-6">
                                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                                        Reserved Medicines
                                    </h3>

                                    <div className="space-y-3">
                                        {reservation.items?.map((item) => (
                                            <div
                                                key={item.id}
                                                className="border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white hover:bg-slate-50/50 transition-colors"
                                            >
                                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 flex items-center justify-center border border-slate-200/60">
                                                    {item.medicine?.image ? (
                                                        <img
                                                            src={item.medicine.image}
                                                            alt={item.medicine.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <span className="text-2xl">💊</span>
                                                    )}
                                                </div>

                                                <div className="flex-1 w-full">
                                                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                                                        <h4 className="font-bold text-base text-slate-900">
                                                            {item.medicine?.name}
                                                        </h4>
                                                        {item.medicine?.dosage && (
                                                            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-600 rounded-lg w-max">
                                                                {item.medicine.dosage}
                                                            </span>
                                                        )}
                                                    </div>

                                                    {item.medicine?.scientific_name && (
                                                        <p className="text-xs text-slate-400 italic mt-0.5">
                                                            {item.medicine.scientific_name}
                                                        </p>
                                                    )}

                                                    <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 text-xs sm:text-sm">
                                                        <div>
                                                            <span className="text-slate-400 block text-xs">Qty</span>
                                                            <span className="font-bold text-slate-800">{item.quantity}</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-slate-400 block text-xs">Unit Price</span>
                                                            <span className="font-bold text-slate-800">{item.price_at_reservation} EGP</span>
                                                        </div>
                                                        <div>
                                                            <span className="text-slate-400 block text-xs">Subtotal</span>
                                                            <span className="font-bold text-teal-700">{item.subtotal} EGP</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Footer Summary & Actions */}
                                <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div>
                                        <p className="text-xs text-slate-400">Created At</p>
                                        <p className="text-xs font-semibold text-slate-700 mt-0.5">
                                            {new Date(reservation.created_at).toLocaleString()}
                                        </p>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                                        <div className="text-left sm:text-right">
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Amount</p>
                                            <p className="text-2xl sm:text-3xl font-black text-teal-600">
                                                {reservation.total} <span className="text-base font-bold">EGP</span>
                                            </p>
                                        </div>

                                        {reservation.status === "pending" && (
                                            <div className="flex gap-3 w-full sm:w-auto mt-2 sm:mt-0">
                                                <button
                                                    onClick={() => handleReject(reservation.id)}
                                                    disabled={actionLoadingId === reservation.id}
                                                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 font-semibold transition-all text-sm active:scale-95 disabled:opacity-50"
                                                >
                                                    {actionLoadingId === reservation.id ? "Processing..." : "Reject"}
                                                </button>

                                                <button
                                                    onClick={() => handleAccept(reservation.id)}
                                                    disabled={actionLoadingId === reservation.id}
                                                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-teal-600 text-white hover:bg-teal-700 font-semibold shadow-md shadow-teal-600/20 transition-all text-sm active:scale-95 disabled:opacity-50"
                                                >
                                                    {actionLoadingId === reservation.id ? "Processing..." : "Accept"}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PharmacyReservations;