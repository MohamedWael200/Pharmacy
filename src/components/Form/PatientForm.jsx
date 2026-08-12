import { useForm } from "react-hook-form";
import Input from "./input/Input.jsx";
import { emailValidation, passwordConfirmationValidation, passwordValidation } from "../../validation/loginValidation.js";
import {
    addressValidation,
    latitudeValidation, longitudeValidation,
    nameValidation,
    phoneValidation
} from "../../validation/registerValidation.js";
import { registerPatient } from "../../services/authService.js";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext.jsx";

function PatientForm() {
    const { setUser } = useContext(AuthContext);
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
    } = useForm({ mode: "onBlur" });

    async function handleOnSubmit(data) {
        try {
            const response = await registerPatient(data);
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Create Patient Account
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Join our healthcare network to manage your prescriptions and orders seamlessly.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div className="md:col-span-2">
                            <Input label="Full Name" type="text" register={register} error={errors.name} name="name" validate={nameValidation} />
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
                            <Input label="Street Address" type="text" register={register} error={errors.address} name="address" validate={addressValidation} />
                        </div>

                        <div className="md:col-span-1">
                            <Input label="Latitude" type="text" register={register} error={errors.latitude} name="latitude" validate={latitudeValidation} />
                        </div>

                        <div className="md:col-span-1">
                            <Input label="Longitude" type="text" register={register} error={errors.longitude} name="longitude" validate={longitudeValidation} />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            className="w-full py-3.5 px-6 rounded-2xl text-white font-semibold bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 focus:outline-none focus:ring-4 focus:ring-teal-500/20 shadow-lg shadow-teal-500/25 transition-all duration-200 active:scale-[0.99]"
                        >
                            Register Patient
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PatientForm;