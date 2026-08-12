import { useState } from "react";
import {createReservation} from "../services/reservationService.js";

function PharmacyCard({ pharmacy }) {
    const [showModal, setShowModal] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [toastMessage, setToastMessage] = useState("");

    function pharmacyDetails() {
        setShowModal(true);
    }

    async function handleConfirmReservation() {
        try {
            const payload = {
                pharmacy_id: pharmacy.pharmacy_id,
                items: [
                    {
                        medicine_pharmacy_id: pharmacy.inventory_id,
                        quantity: quantity,
                    },
                ],
            };

            const response = await createReservation(payload);

            console.log(response.data);

            setShowModal(false);

            setToastMessage(
                `Successfully reserved ${quantity} item(s) from ${pharmacy.pharmacy_name}!`
            );

            setQuantity(1);

            setTimeout(() => {
                setToastMessage("");
            }, 3000);

        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Failed to create reservation."
            );
        }
    }

    return (
        <>
            {/* Success Toast Notification */}
            {toastMessage && (
                <div className="fixed top-5 right-5 z-50 flex items-center gap-3 bg-emerald-600 text-white px-5 py-3.5 rounded-2xl shadow-xl shadow-emerald-600/20 border border-emerald-500/30 transition-all animate-bounce">
                    <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm font-semibold">{toastMessage}</span>
                    <button
                        onClick={() => setToastMessage("")}
                        className="ml-2 text-emerald-200 hover:text-white p-0.5 rounded-lg transition-colors"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-md hover:shadow-xl hover:border-teal-100 transition-all duration-300 flex flex-col justify-between gap-4">
                <div>
                    {/* Header & Price */}
                    <div className="flex justify-between items-start gap-4 mb-4">
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">{pharmacy.pharmacy_name}</h3>
                            <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                                <svg className="w-3.5 h-3.5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                {pharmacy.address}
                            </p>
                        </div>
                        <div className="text-right shrink-0">
                            <span className="text-xl font-black text-teal-600">{pharmacy.price}</span>
                            <span className="text-xs font-semibold text-slate-400 ml-1">EGP</span>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 text-xs">
                        <div className="bg-slate-50 p-2.5 rounded-xl">
                            <span className="block text-slate-400 font-semibold mb-0.5">Quantity</span>
                            <span className="font-bold text-slate-700">{pharmacy.quantity} available</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-xl">
                            <span className="block text-slate-400 font-semibold mb-0.5">Expires</span>
                            <span className="font-bold text-slate-700">{new Date(pharmacy.expiration_date).toLocaleDateString()}</span>
                        </div>
                        <div className="bg-slate-50 p-2.5 rounded-xl col-span-2">
                            <span className="block text-slate-400 font-semibold mb-0.5">Batch Number</span>
                            <span className="font-mono font-medium text-slate-600">{pharmacy.batch_number}</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Actions & Coordinates */}
                <div className="pt-3 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                        <span>Lat: {pharmacy.latitude}</span>
                        <span>Long: {pharmacy.longitude}</span>
                    </div>

                    {/* Reserve Button */}
                    <button
                        type="button"
                        onClick={pharmacyDetails}
                        className="w-full py-3 px-4 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 focus:outline-none focus:ring-4 focus:ring-teal-500/20 shadow-md shadow-teal-500/20 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Reserve
                    </button>
                </div>
            </div>

            {/* Modal Overlay */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-100 relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <div className="text-center mb-6">
                            <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Reserve Medicine</h3>
                            <p className="text-xs text-slate-500 mt-1">
                                {pharmacy.pharmacy_name}
                            </p>
                        </div>

                        {/* Quantity Input Section */}
                        <div className="space-y-4">
                            <div className="flex flex-col gap-1.5">
                                <label className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                                    Select Quantity (Max: {pharmacy.quantity})
                                </label>
                                <input
                                    type="number"
                                    min={1}
                                    max={pharmacy.quantity}
                                    value={quantity}
                                    onChange={(e) => setQuantity(Number(e.target.value))}
                                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-sm font-semibold focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all outline-none"
                                />
                            </div>

                            {/* Total Price Calculation */}
                            <div className="p-3 bg-slate-50 rounded-xl flex justify-between items-center text-sm font-medium text-slate-600">
                                <span>Total Price:</span>
                                <span className="font-bold text-teal-600 text-lg">
                                    {pharmacy.price * (quantity || 1)} EGP
                                </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 py-3 px-4 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleConfirmReservation}
                                    className="flex-1 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 shadow-md shadow-teal-600/20 transition-all active:scale-95"
                                >
                                    Confirm
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default PharmacyCard;