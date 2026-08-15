import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { searchMedicines } from "../../../services/medicineService";
import { addInventory, importInventory } from "../../../services/pharmacyService";
import Input from "../../../components/Form/input/Input.jsx";

function AddInventory() {
    const [activeTab, setActiveTab] = useState("manual"); // 'manual' | 'import'
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageError, setPageError] = useState("");
    const [importErrors, setImportErrors] = useState("");
    const [toast, setToast] = useState({ show: false, type: "", message: "" });
    const [file, setFile] = useState(null);
    const [isImporting, setIsImporting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const triggerToast = (type, message) => {
        setToast({ show: true, type, message });
        setTimeout(() => {
            setToast({ show: false, type: "", message: "" });
        }, 3500);
    };

    useEffect(() => {
        async function loadMedicines() {
            try {
                const response = await searchMedicines();
                setMedicines(response.data.data.data);
            } catch (error) {
                console.log(error);
                setPageError("Failed to load medicines list.");
            } finally {
                setLoading(false);
            }
        }

        loadMedicines();
    }, []);

    async function handleImport() {
        if (!file) {
            triggerToast("error", "Please select an Excel file first.");
            return;
        }

        setIsImporting(true);
        setImportErrors("");

        try {
            const response = await importInventory(file);
            const result = response.data.data;

            triggerToast(
                "success",
                `${result.imported_rows} row(s) imported successfully.`
            );

            if (result.failed_rows > 0) {
                const messages = result.errors
                    .map(
                        (error) =>
                            `Row ${error.row}: ${error.errors.join(", ")}`
                    )
                    .join("\n");

                setImportErrors(messages);
            } else {
                setImportErrors("");
            }

            setFile(null);
            const fileInput = document.getElementById("inventory-file");
            if (fileInput) fileInput.value = "";
        } catch (error) {
            console.log(error);

            if (error.response?.data?.errors?.file) {
                triggerToast("error", error.response.data.errors.file[0]);
            } else if (error.response?.data?.message) {
                triggerToast("error", error.response.data.message);
            } else {
                triggerToast("error", "Failed to import inventory.");
            }
        } finally {
            setIsImporting(false);
        }
    }

    async function onSubmit(data) {
        try {
            await addInventory(data);
            triggerToast("success", "Inventory added successfully!");
            reset();
        } catch (error) {
            console.log(error);
            triggerToast("error", "Failed to add inventory. Please try again.");
        }
    }

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-slate-50/50">
                <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-sm font-semibold text-slate-500">Loading medicines list...</p>
            </div>
        );
    }

    if (pageError) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50/50 px-4">
                <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center max-w-md">
                    <p className="text-rose-600 font-semibold">{pageError}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8 flex items-center justify-center relative">

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

            <div className="w-full max-w-xl bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-10">

                {/* Header */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 mb-3 shadow-sm">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Inventory Management
                    </h1>
                    <p className="mt-1.5 text-sm text-slate-500 font-medium">
                        Add single items manually or bulk import via Excel.
                    </p>
                </div>

                {/* Navigation Tabs */}
                <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-8">
                    <button
                        type="button"
                        onClick={() => setActiveTab("manual")}
                        className={`flex-1 cursor-pointer py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                            activeTab === "manual"
                                ? "bg-white text-teal-700 shadow-sm"
                                : "text-slate-500 hover:text-slate-700"
                        }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                        </svg>
                        Manual Entry
                    </button>
                    <button
                        type="button"
                        onClick={() => setActiveTab("import")}
                        className={`flex-1 cursor-pointer py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                            activeTab === "import"
                                ? "bg-white text-teal-700 shadow-sm"
                                : "text-slate-500 hover:text-slate-700"
                        }`}
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                        Bulk Excel Import
                    </button>
                </div>

                {/* TAB 1: Manual Form */}
                {activeTab === "manual" && (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 animate-fade-in">
                        <div className="space-y-1.5">
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                                Medicine
                            </label>
                            <div className="relative">
                                <select
                                    {...register("medicine_id", {
                                        required: "Medicine is required",
                                    })}
                                    className={`w-full bg-slate-50/50 border rounded-xl px-4 py-3 text-sm font-medium text-slate-800 outline-none transition-all appearance-none cursor-pointer focus:bg-white focus:ring-4 focus:ring-teal-500/10 ${
                                        errors.medicine_id
                                            ? "border-rose-300 focus:border-rose-500"
                                            : "border-slate-200 focus:border-teal-500"
                                    }`}
                                >
                                    <option value="">Select Medicine</option>
                                    {medicines.map((medicine) => (
                                        <option key={medicine.id} value={medicine.id}>
                                            {medicine.name} {medicine.dosage ? `(${medicine.dosage})` : ""}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                            {errors.medicine_id && (
                                <p className="text-xs font-medium text-rose-500 mt-1">
                                    {errors.medicine_id.message}
                                </p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                label="Quantity"
                                type="number"
                                name="quantity"
                                register={register}
                                error={errors.quantity}
                                validate={{
                                    required: "Quantity is required",
                                    min: {
                                        value: 1,
                                        message: "Minimum quantity is 1",
                                    },
                                }}
                            />

                            <Input
                                label="Price (EGP)"
                                type="number"
                                name="price"
                                register={register}
                                error={errors.price}
                                validate={{
                                    required: "Price is required",
                                }}
                            />
                        </div>

                        <Input
                            label="Expiration Date"
                            type="date"
                            name="expiration_date"
                            register={register}
                            error={errors.expiration_date}
                            validate={{
                                required: "Expiration date is required",
                            }}
                        />

                        <Input
                            label="Batch Number"
                            type="text"
                            name="batch_number"
                            register={register}
                            error={errors.batch_number}
                            validate={{
                                required: "Batch number is required",
                            }}
                        />

                        <div className="pt-2">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full py-3.5 px-6 rounded-2xl text-white font-semibold bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 focus:outline-none focus:ring-4 focus:ring-teal-500/20 shadow-lg shadow-teal-500/25 transition-all duration-200 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        <span>Saving Item...</span>
                                    </>
                                ) : (
                                    <span>Add Item to Inventory</span>
                                )}
                            </button>
                        </div>
                    </form>
                )}

                {/* TAB 2: Excel Import */}
                {activeTab === "import" && (
                    <div className="space-y-6 animate-fade-in">
                        {/* Dropzone Container */}
                        <div className="border-2 border-dashed border-slate-200 rounded-3xl p-8 text-center bg-slate-50/50 hover:bg-slate-50 hover:border-teal-400 transition-all duration-200">
                            <div className="w-12 h-12 bg-white text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-sm border border-slate-100">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <p className="text-sm font-semibold text-slate-700">
                                {file ? file.name : "Select an Excel or CSV spreadsheet"}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                                Supported formats: .xlsx, .xls, .csv
                            </p>

                            <input
                                id="inventory-file"
                                type="file"
                                accept=".xlsx,.xls,.csv"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="hidden"
                            />

                            <label
                                htmlFor="inventory-file"
                                className="inline-block mt-4 px-4 py-2 rounded-xl text-xs font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 cursor-pointer border border-teal-100 transition-colors"
                            >
                                {file ? "Change File" : "Browse Computer"}
                            </label>
                        </div>

                        {/* Import Trigger Button */}
                        <button
                            type="button"
                            onClick={handleImport}
                            disabled={isImporting || !file}
                            className="w-full py-3.5 px-6 rounded-2xl text-white font-semibold bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 focus:outline-none focus:ring-4 focus:ring-teal-500/20 shadow-lg shadow-teal-500/25 transition-all duration-200 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isImporting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Processing Spreadsheet...</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                    </svg>
                                    <span>Upload & Import</span>
                                </>
                            )}
                        </button>

                        {/* Row Errors Box */}
                        {importErrors && (
                            <div className="rounded-2xl border border-rose-200 bg-rose-50/80 p-4 space-y-2">
                                <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Failed Rows Details
                                </div>
                                <pre className="text-xs text-rose-600 font-mono whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto pr-2">
                                    {importErrors}
                                </pre>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}

export default AddInventory;