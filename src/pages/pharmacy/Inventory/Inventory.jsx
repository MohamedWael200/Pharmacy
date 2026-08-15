import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteInventory, getInventory } from "../../../services/pharmacyService.js";
import EditInventoryModal from "./EditInventoryModal.jsx";
import InventoryCard from "./InventoryCard.jsx";

function Inventory() {
    const [inventory, setInventory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [toast, setToast] = useState({ show: false, type: "", message: "" });

    const triggerToast = (type, message) => {
        setToast({ show: true, type, message });
        setTimeout(() => {
            setToast({ show: false, type: "", message: "" });
        }, 3500);
    };

    useEffect(() => {
        fetchInventory();
    }, []);

    async function handleDelete(id) {
        try {
            await deleteInventory(id);
            setInventory((prev) => prev.filter((item) => item.id !== id));
            triggerToast("success", "Item deleted successfully!");
        } catch (error) {
            console.log(error);
            triggerToast("error", "Failed to delete item.");
        }
    }

    async function fetchInventory() {
        try {
            const response = await getInventory();
            setInventory(response.data.data.data);
        } catch (error) {
            console.log(error);
            setError("Failed to load inventory.");
        } finally {
            setLoading(false);
        }
    }

    function handleEdit(item) {
        setSelectedItem(item);
        setShowModal(true);
    }

    function handleUpdated(updatedItem) {
        setInventory((prev) =>
            prev.map((item) =>
                item.id === updatedItem.id ? updatedItem : item
            )
        );
        triggerToast("success", "Inventory updated successfully!");
    }

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-slate-50/50">
                <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-sm font-semibold text-slate-500">Loading inventory...</p>
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
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8 relative">

            {/* Custom Toast Notification */}
            {toast.show && (
                <div
                    className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl shadow-xl border transition-all duration-300 animate-bounce ${
                        toast.type === "success"
                            ? "bg-emerald-600 text-white border-emerald-500/30 shadow-emerald-600/20"
                            : "bg-rose-600 text-white border-rose-500/30 shadow-rose-600/20"
                    }`}
                >
                    {toast.type === "success" ? (
                        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                    )}
                    <span className="text-sm font-semibold">{toast.message}</span>
                    <button
                        onClick={() => setToast({ show: false, type: "", message: "" })}
                        className="ml-2 opacity-80 hover:opacity-100 p-0.5 transition-opacity"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200/60 pb-6">
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                My Inventory
                            </h1>
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-700 border border-teal-100">
                                {inventory.length} Items
                            </span>
                        </div>
                        <p className="text-slate-500 font-medium text-sm">
                            Manage stock quantities, medicine prices, and batch details.
                        </p>
                    </div>

                    {/* Actions Group */}
                    <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap">
                        <Link
                            to="/dashboard/inventory-logs"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 shadow-sm transition-all duration-200 active:scale-[0.98]"
                        >
                            <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Import Logs
                        </Link>

                        <Link
                            to="/dashboard/inventory-add"
                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 shadow-md shadow-teal-500/20 transition-all duration-200 active:scale-[0.98]"
                        >
                            <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add Inventory
                        </Link>
                    </div>
                </div>

                {/* Grid */}
                {inventory.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center text-slate-400 shadow-sm">
                        <svg className="w-12 h-12 mx-auto mb-3 stroke-current opacity-40 text-slate-500" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                        </svg>
                        <p className="text-base font-semibold text-slate-600">No inventory items found.</p>
                        <Link
                            to="/dashboard/inventory-add"
                            className="inline-block mt-3 text-xs font-bold text-teal-600 hover:text-teal-700 hover:underline"
                        >
                            Click here to add your first item
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {inventory.map((item) => (
                            <InventoryCard
                                key={item.id}
                                item={item}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>

            <EditInventoryModal
                item={selectedItem}
                showModal={showModal}
                setShowModal={setShowModal}
                onUpdated={handleUpdated}
                triggerToast={triggerToast}
            />
        </div>
    );
}

export default Inventory;