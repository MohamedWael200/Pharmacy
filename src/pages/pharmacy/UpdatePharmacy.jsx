import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import {
    getPharmacyProfile,
    updatePharmacyProfile,
} from "../../services/pharmacyService.js";
import Input from "../../components/Form/input/Input.jsx";

function UpdatePharmacy() {
    const [loading, setLoading] = useState(true);
    const [pageError, setPageError] = useState("");
    const [toast, setToast] = useState({ show: false, type: "", message: "" });

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
        async function fetchProfile() {
            try {
                const response = await getPharmacyProfile();
                const pharmacy = response.data.data;

                reset({
                    name: pharmacy.name,
                    address: pharmacy.address,
                    latitude: pharmacy.latitude,
                    longitude: pharmacy.longitude,
                    phone: pharmacy.phone,
                    sat_thu: pharmacy.opening_hours?.sat_thu || "",
                    fri: pharmacy.opening_hours?.fri || "",
                });
            } catch (error) {
                console.log(error);
                setPageError("Failed to load pharmacy profile.");
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, [reset]);

    const onSubmit = async (data) => {
        try {
            const response = await updatePharmacyProfile(data);

            console.log(response);

            if (response.data.success) {
                alert("Profile updated successfully");
            }
        } catch (error) {
            console.log(error);

            if (error.response?.data?.message) {
                alert(error.response.data.message);
            } else {
                alert("Failed to update profile");
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-slate-50/50">
                <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-sm font-semibold text-slate-500">Loading pharmacy details...</p>
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
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8 flex justify-center items-center relative">

            {/* Toast Notification */}
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

            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 sm:p-10 transition-all">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 mb-4 shadow-sm">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4m-4 0H9" />
                        </svg>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Update Pharmacy Profile
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Update pharmacy details, working hours, and logo shown to patients.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            label="Pharmacy Name"
                            type="text"
                            name="name"
                            register={register}
                            error={errors.name}
                        />

                        <Input
                            label="Phone Number"
                            type="text"
                            name="phone"
                            register={register}
                            error={errors.phone}
                        />
                    </div>

                    <Input
                        label="Address"
                        type="text"
                        name="address"
                        register={register}
                        error={errors.address}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Input
                            label="Latitude"
                            type="text"
                            name="latitude"
                            register={register}
                            error={errors.latitude}
                        />

                        <Input
                            label="Longitude"
                            type="text"
                            name="longitude"
                            register={register}
                            error={errors.longitude}
                        />
                    </div>

                    {/* Opening Hours Box */}
                    <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-4">
                        <span className="block text-xs font-bold uppercase tracking-wider text-teal-700">
                            Working Hours
                        </span>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Input
                                label="Sat - Thu (e.g. 9:00 AM - 11:00 PM)"
                                type="text"
                                name="sat_thu"
                                register={register}
                                error={errors.sat_thu}
                            />

                            <Input
                                label="Friday (e.g. 2:00 PM - 11:00 PM)"
                                type="text"
                                name="fri"
                                register={register}
                                error={errors.fri}
                            />
                        </div>
                    </div>

                    {/* Logo Upload Field */}
                    <div className="space-y-1.5">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                            Pharmacy Logo
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            {...register("logo")}
                            className="block w-full text-xs text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 border border-slate-200 rounded-xl p-2 bg-slate-50/50 cursor-pointer"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full py-3.5 px-6 rounded-2xl text-white font-semibold bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 focus:outline-none focus:ring-4 focus:ring-teal-500/20 shadow-lg shadow-teal-500/25 transition-all duration-200 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Updating...</span>
                                </>
                            ) : (
                                <span>Update Profile</span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UpdatePharmacy;