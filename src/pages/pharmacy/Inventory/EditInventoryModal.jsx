import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { updateInventory } from "../../../services/pharmacyService.js";
import Input from "../../../components/Form/input/Input.jsx";

function EditInventoryModal({
                                item,
                                showModal,
                                setShowModal,
                                onUpdated,
                                triggerToast,
                            }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        if (item) {
            reset({
                quantity: item.quantity,
                price: item.price,
                expiration_date: item.expiration_date,
                batch_number: item.batch_number,
            });
        }
    }, [item, reset]);

    async function onSubmit(data) {
        try {
            const response = await updateInventory(item.id, data);
            onUpdated(response.data.data);
            setShowModal(false);
        } catch (error) {
            console.log(error);
            if (triggerToast) {
                triggerToast("error", "Failed to update item. Please try again.");
            }
        }
    }

    if (!showModal || !item) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-100 relative">
                {/* Close Button */}
                <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                {/* Modal Title */}
                <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-3">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900">
                        Edit Inventory
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5 font-medium">
                        {item.medicine?.name}
                    </p>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            label="Quantity"
                            type="number"
                            name="quantity"
                            register={register}
                            error={errors.quantity}
                        />

                        <Input
                            label="Price (EGP)"
                            type="number"
                            name="price"
                            register={register}
                            error={errors.price}
                        />
                    </div>

                    <Input
                        label="Expiration Date"
                        type="date"
                        name="expiration_date"
                        register={register}
                        error={errors.expiration_date}
                    />

                    <Input
                        label="Batch Number"
                        type="text"
                        name="batch_number"
                        register={register}
                        error={errors.batch_number}
                    />

                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setShowModal(false)}
                            className="flex-1 py-3 px-4 rounded-xl text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex-1 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 shadow-md shadow-teal-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Saving...</span>
                                </>
                            ) : (
                                <span>Save Changes</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditInventoryModal;