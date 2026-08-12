import {Link} from "react-router-dom";

function ReservationCard({ reservation }){
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
        <Link
            to={`/reservations/${reservation.id}`}
            className="group bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:border-teal-100 transition-all duration-300 flex flex-col justify-between"
        >
        <div
            key={reservation.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300"
        >
            {/* Reservation Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-5 border-b border-slate-100">
                <div>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-teal-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4m-4 0H9" />
                        </svg>
                        <h3 className="text-xl font-bold text-slate-900">
                            {reservation.pharmacy.name}
                        </h3>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                        Reservation ID: #{reservation.id}
                    </p>
                </div>

                {/* Status Badge */}
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusBadge(reservation.status)}`}>
                                        {reservation.status}
                                    </span>
            </div>

            {/* Timestamps & Total Summary */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-5 bg-slate-50/80 p-4 rounded-2xl border border-slate-100 text-xs">
                <div>
                    <span className="block text-slate-400 font-semibold mb-0.5">Reserved At</span>
                    <span className="font-bold text-slate-700">
                                            {new Date(reservation.reserved_at).toLocaleString()}
                                        </span>
                </div>
                <div>
                    <span className="block text-slate-400 font-semibold mb-0.5">Expires At</span>
                    <span className="font-bold text-slate-700">
                                            {new Date(reservation.expires_at).toLocaleString()}
                                        </span>
                </div>
                <div>
                    <span className="block text-slate-400 font-semibold mb-0.5">Total Amount</span>
                    <span className="text-base font-black text-teal-600">
                                            {reservation.total} EGP
                                        </span>
                </div>
            </div>

            {/* Reserved Items List */}
            <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Reserved Items ({reservation.items?.length || 0})
                </h4>

                <div className="divide-y divide-slate-100 rounded-2xl bg-slate-50/50 border border-slate-100 overflow-hidden">
                    {reservation.items.map((item) => (
                        <div
                            key={item.id}
                            className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 hover:bg-slate-100/50 transition-colors"
                        >
                            <div>
                                <p className="text-sm font-bold text-slate-800">
                                    {item.medicine.name}
                                </p>
                                <p className="text-xs text-slate-500 mt-0.5">
                                    Price: <span className="font-semibold text-slate-700">{item.price_at_reservation} EGP</span>
                                </p>
                            </div>

                            <div className="flex items-center gap-6 text-right w-full sm:w-auto justify-between sm:justify-end border-t sm:border-0 border-slate-200/60 pt-2 sm:pt-0">
                                <div className="text-left sm:text-right">
                                    <span className="block text-[10px] uppercase font-semibold text-slate-400">Qty</span>
                                    <span className="text-xs font-bold text-slate-800">x{item.quantity}</span>
                                </div>
                                <div>
                                    <span className="block text-[10px] uppercase font-semibold text-slate-400">Subtotal</span>
                                    <span className="text-sm font-bold text-teal-600">{item.subtotal} EGP</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
        </Link>

    )
}
export default ReservationCard;