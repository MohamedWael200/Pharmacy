import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { cancelReservation, getReservation } from "../services/reservationService.js";

function ReservationsDetails() {
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [myReservation, setMyReservation] = useState(null);
    const [toastMessage, setToastMessage] = useState("");

    async function handleCancelReservation() {
        try {
            await cancelReservation(id);

            setMyReservation((prev) => ({
                ...prev,
                status: "cancelled",
            }));

            // Show custom cancellation toast message
            setToastMessage("Reservation has been successfully cancelled.");

            // Hide toast automatically after 3 seconds
            setTimeout(() => {
                setToastMessage("");
            }, 3000);
        } catch (error) {
            console.log(error);
            setError("Failed to cancel reservation.");
        }
    }

    useEffect(() => {
        async function fetchReservation() {
            try {
                const response = await getReservation(id);
                setMyReservation(response.data.data);
            } catch (error) {
                console.log(error);
                setError("Failed to load reservation.");
            } finally {
                setLoading(false);
            }
        }

        fetchReservation();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-slate-50/50">
                <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-sm font-semibold text-slate-500">Loading reservation details...</p>
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

    const getStatusBadge = (status) => {
        const normalized = status?.toLowerCase() || "";
        if (normalized === "completed" || normalized === "confirmed") {
            return "bg-emerald-50 text-emerald-700 border-emerald-200";
        }
        if (normalized === "pending") {
            return "bg-amber-50 text-amber-700 border-amber-200";
        }
        if (normalized === "cancelled" || normalized === "expired") {
            return "bg-rose-50 text-rose-700 border-rose-200";
        }
        return "bg-slate-100 text-slate-700 border-slate-200";
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8 relative">

            {/* Cancellation Toast Notification */}
            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-rose-600 text-white px-5 py-3.5 rounded-2xl shadow-xl shadow-rose-600/20 border border-rose-500/30 transition-all">
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span className="text-sm font-semibold">{toastMessage}</span>
                    <button
                        onClick={() => setToastMessage("")}
                        className="ml-2 text-rose-200 hover:text-white p-0.5 rounded-lg transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            <div className="max-w-4xl mx-auto space-y-8">

                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-10">

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100">
                        <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                Reservation Invoice
                            </span>
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                #{myReservation.id}
                            </h1>
                        </div>

                        {/* Status Badge & Cancel Action Button */}
                        <div className="flex flex-wrap items-center gap-3">
                            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusBadge(myReservation.status)}`}>
                                {myReservation.status}
                            </span>

                            {myReservation.status.toLowerCase() === "pending" && (
                                <button
                                    onClick={handleCancelReservation}
                                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-200 transition-all duration-200 active:scale-95 shadow-sm">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Cancel Reservation
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Reservation Summary Bar */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 text-xs">
                        <div>
                            <span className="block text-slate-400 font-semibold mb-0.5">Reserved At</span>
                            <span className="font-bold text-slate-700">
                                {new Date(myReservation.reserved_at).toLocaleString()}
                            </span>
                        </div>
                        <div>
                            <span className="block text-slate-400 font-semibold mb-0.5">Expires At</span>
                            <span className="font-bold text-slate-700">
                                {new Date(myReservation.expires_at).toLocaleString()}
                            </span>
                        </div>
                        <div>
                            <span className="block text-slate-400 font-semibold mb-0.5">Total Amount</span>
                            <span className="text-lg font-black text-teal-600">
                                {myReservation.total} EGP
                            </span>
                        </div>
                    </div>

                    {/* Parties Info Grid (Pharmacy & Patient) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">

                        {/* Pharmacy Box */}
                        <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-3">
                            <div className="flex items-center gap-2 text-teal-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4m-4 0H9" />
                                </svg>
                                <h2 className="text-base font-bold text-slate-900">Pharmacy Details</h2>
                            </div>
                            <div className="text-xs space-y-1.5 text-slate-600">
                                <p><strong className="text-slate-800">Name:</strong> {myReservation.pharmacy.name}</p>
                                <p><strong className="text-slate-800">Phone:</strong> {myReservation.pharmacy.phone}</p>
                                <p><strong className="text-slate-800">Address:</strong> {myReservation.pharmacy.address}</p>
                                <p className="font-mono text-[11px] text-slate-400 pt-1">
                                    Coordinates: {myReservation.pharmacy.latitude}, {myReservation.pharmacy.longitude}
                                </p>
                            </div>

                            {/* Opening Hours */}
                            {myReservation.pharmacy.opening_hours && (
                                <div className="pt-2 border-t border-slate-200/60 text-xs">
                                    <strong className="block text-slate-700 mb-1">Opening Hours:</strong>
                                    <ul className="space-y-0.5 text-slate-500">
                                        {Object.entries(myReservation.pharmacy.opening_hours).map(([day, hours]) => (
                                            <li key={day} className="flex justify-between">
                                                <span className="capitalize">{day}:</span>
                                                <span className="font-semibold text-slate-700">{hours}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Patient Box */}
                        <div className="p-6 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-3">
                            <div className="flex items-center gap-2 text-teal-600">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <h2 className="text-base font-bold text-slate-900">Patient Info</h2>
                            </div>
                            <div className="text-xs space-y-1.5 text-slate-600">
                                <p><strong className="text-slate-800">Phone:</strong> {myReservation.patient.phone}</p>
                                <p><strong className="text-slate-800">Address:</strong> {myReservation.patient.address}</p>
                                <p className="font-mono text-[11px] text-slate-400 pt-1">
                                    Coordinates: {myReservation.patient.latitude}, {myReservation.patient.longitude}
                                </p>
                            </div>
                        </div>

                    </div>

                    {/* Medicines List Section */}
                    <div className="space-y-4">
                        <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                            Reserved Medicines ({myReservation.items?.length || 0})
                        </h2>

                        <div className="space-y-4">
                            {myReservation.items.map((item) => (
                                <div
                                    key={item.id}
                                    className="p-5 rounded-2xl bg-white border border-slate-200/80 hover:border-teal-200 transition-all shadow-sm space-y-3"
                                >
                                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                        <div>
                                            <h3 className="text-base font-bold text-slate-900">
                                                {item.medicine.name}
                                            </h3>
                                            <p className="text-xs italic text-slate-500">
                                                {item.medicine.scientific_name}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-xs text-slate-400 block">Subtotal</span>
                                            <span className="text-lg font-bold text-teal-600">{item.subtotal} EGP</span>
                                        </div>
                                    </div>

                                    {/* Medicine Details Grid */}
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                                        <div>
                                            <span className="block text-slate-400">Manufacturer</span>
                                            <span className="font-semibold text-slate-700">{item.medicine.manufacturer}</span>
                                        </div>
                                        <div>
                                            <span className="block text-slate-400">Dosage</span>
                                            <span className="font-semibold text-slate-700">{item.medicine.dosage}</span>
                                        </div>
                                        <div>
                                            <span className="block text-slate-400">Quantity</span>
                                            <span className="font-bold text-slate-800">x{item.quantity}</span>
                                        </div>
                                        <div>
                                            <span className="block text-slate-400">Price / Item</span>
                                            <span className="font-semibold text-slate-700">{item.price_at_reservation} EGP</span>
                                        </div>
                                    </div>

                                    {item.medicine.description && (
                                        <p className="text-xs text-slate-500 bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">
                                            {item.medicine.description}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Footer Timestamps */}
                    <div className="mt-8 pt-4 border-t border-slate-100 text-right text-xs text-slate-400">
                        Created On: {new Date(myReservation.created_at).toLocaleString()}
                    </div>

                </div>

            </div>
        </div>
    );
}

export default ReservationsDetails;