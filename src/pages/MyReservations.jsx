import { useEffect, useState } from "react";
import { getMyReservations } from "../services/reservationService.js";
import ReservationCard from "../components/ReservationCard.jsx";

function MyReservations() {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchMyReservations();
    }, []);

    async function fetchMyReservations() {
        try {
            const response = await getMyReservations();

            setReservations(response.data.data.data);
            setError("");
        } catch (error) {
            console.log(error);
            setError("Failed to load reservations.");
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-slate-50/50">
                <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-sm font-semibold text-slate-500">Loading your reservations...</p>
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

    // Dynamic styling for reservation status

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto space-y-8">

                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-200/60 pb-6">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                            My Reservations
                        </h1>
                        <p className="mt-1 text-slate-500 font-medium text-sm">
                            Manage and track your reserved prescriptions across pharmacies.
                        </p>
                    </div>
                    <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-100">
                        Total Orders: {reservations.length}
                    </span>
                </div>

                {/* Empty State */}
                {reservations.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center text-slate-400">
                        <svg className="w-12 h-12 mx-auto mb-3 stroke-current opacity-40" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <p className="text-base font-semibold text-slate-600">No active reservations found.</p>
                        <p className="text-xs text-slate-400 mt-1">Explore available medicines and reserve them directly.</p>
                    </div>
                ) : (
                    /* Reservations List */
                    <div className="space-y-6">
                        {reservations.map((reservation) => (
                            <ReservationCard reservation={reservation}/>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
}

export default MyReservations;