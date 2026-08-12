import { useForm } from "react-hook-form";
import Input from "./input/Input.jsx";
import { emailValidation, passwordConfirmationValidation, passwordValidation } from "../../validation/loginValidation.js";
import {
    addressValidation,
    latitudeValidation, longitudeValidation,
    nameValidation, pharmacyNameValidation,
    phoneValidation
} from "../../validation/registerValidation.js";
import { registerPharmacy } from "../../services/authService.js";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext.jsx";

function PharmacyForm() {
    const { setUser } = useContext(AuthContext);

    const { register,
        handleSubmit,
        watch,
        formState: { errors } }
        = useForm({ mode: "onBlur" });

    async function handleOnSubmit(data) {
        try {
            const formData = new FormData();

            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("password", data.password);
            formData.append("password_confirmation", data.password_confirmation);
            formData.append("pharmacy_name", data.pharmacy_name);
            formData.append("phone", data.phone);
            formData.append("address", data.address);
            formData.append("latitude", data.latitude);
            formData.append("longitude", data.longitude);
            if (data.opening_hours) {
                formData.append("opening_hours[general]", data.opening_hours);
            }
            if (data.logo?.length > 0) {
                formData.append("logo", data.logo[0]);
            }

            const response = await registerPharmacy(formData);

            const { token, user } = response.data.data;

            localStorage.setItem("token", token);
            setUser(user);

            console.log(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
            <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 sm:p-10 transition-all">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 mb-4">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4m-4 0H9" />
                        </svg>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Register Your Pharmacy
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Join our network to reach more patients and streamline your operations.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-1">
                            <Input label="Owner / Manager Name" type="text" register={register} error={errors.name} name="name" validate={nameValidation} />
                        </div>

                        <div className="md:col-span-1">
                            <Input label="Pharmacy Name" type="text" register={register} error={errors.pharmacy_name} name="pharmacy_name" validate={pharmacyNameValidation} />
                        </div>

                        <div className="md:col-span-1">
                            <Input label="Email Address" type="email" register={register} error={errors.email} name="email" validate={emailValidation} />
                        </div>

                        <div className="md:col-span-1">
                            <Input label="Phone Number" type="number" register={register} error={errors.phone} name="phone" validate={phoneValidation} />
                        </div>

                        <div className="md:col-span-1">
                            <Input label="Password" type="password" register={register} error={errors.password} name="password" validate={passwordValidation} />
                        </div>

                        <div className="md:col-span-1">
                            <Input
                                label="Confirm Password"
                                type="password"
                                register={register}
                                error={errors.password_confirmation}
                                name="password_confirmation"
                                validate={passwordConfirmationValidation(watch)}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <Input label="Pharmacy Address" type="text" register={register} error={errors.address} name="address" validate={addressValidation} />
                        </div>

                        <div className="md:col-span-1">
                            <Input label="Latitude" type="text" register={register} error={errors.latitude} name="latitude" validate={latitudeValidation} />
                        </div>

                        <div className="md:col-span-1">
                            <Input label="Longitude" type="text" register={register} error={errors.longitude} name="longitude" validate={longitudeValidation} />
                        </div>

                        <div className="md:col-span-2">
                            <Input
                                label="Opening Hours"
                                type="text"
                                register={register}
                                error={errors.opening_hours}
                                name="opening_hours"
                                placeholder="e.g. Sat-Thu 9am-11pm, Fri 2pm-11pm"
                            />
                        </div>

                        {/* File Upload / Logo */}
                        <div className="md:col-span-2 flex flex-col gap-1.5">
                            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                                Pharmacy Logo
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("logo", {
                                    required: "Logo is required",
                                })}
                                className="w-full text-sm text-slate-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100 cursor-pointer border border-slate-200 rounded-xl bg-slate-50/80 p-1.5 transition-all focus:outline-none"
                            />
                            {errors.logo?.message && (
                                <p className="text-xs text-rose-500 font-medium flex items-center gap-1 mt-0.5">
                                    <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <span>{errors.logo?.message}</span>
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full py-3.5 px-6 rounded-2xl text-white font-semibold bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 focus:outline-none focus:ring-4 focus:ring-teal-500/20 shadow-lg shadow-teal-500/25 transition-all duration-200 active:scale-[0.99]"
                        >
                            Register Pharmacy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PharmacyForm;