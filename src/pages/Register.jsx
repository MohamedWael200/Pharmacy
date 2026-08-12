import { useState } from "react";
import PatientForm from "../components/Form/PatientForm.jsx";
import PharmacyForm from "../components/Form/PharmacyForm.jsx";

function Register() {
    const [role, setRole] = useState("");

    function PatientRegister() {
        setRole("patient");
    }

    function PharmacyRegister() {
        setRole("pharmacy");
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
            <div className="w-full max-w-2xl text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                    Get Started
                </h1>
                <p className="mt-2 text-slate-500 font-medium">
                    Choose your account type to continue registration
                </p>

                {/* Role Switcher Cards */}
                <div className="mt-8 grid grid-cols-2 gap-4 p-1.5 bg-slate-200/60 rounded-2xl max-w-md mx-auto">
                    <button
                        onClick={PatientRegister}
                        type="button"
                        className={`flex items-center justify-center cursor-pointer gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 ${
                            role === "patient"
                                ? "bg-white text-teal-600 shadow-md shadow-slate-200"
                                : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                        }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Patient
                    </button>

                    <button
                        onClick={PharmacyRegister}
                        type="button"
                        className={`flex items-center cursor-pointer justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 ${
                            role === "pharmacy"
                                ? "bg-white text-teal-600 shadow-md shadow-slate-200"
                                : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                        }`}
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h4m-4 0V11m0 0h4m-4 0H9" />
                        </svg>
                        Pharmacy
                    </button>
                </div>
            </div>

            {/* Forms Container */}
            <div className="w-full">
                {role === "patient" && <PatientForm />}
                {role === "pharmacy" && <PharmacyForm />}

                {!role && (
                    <div className="w-full max-w-2xl mx-auto bg-white border border-dashed border-slate-300 rounded-3xl p-12 text-center text-slate-400">
                        <svg className="w-12 h-12 mx-auto mb-3 stroke-current opacity-50" fill="none" viewBox="0 0 24 24" strokeWidth="1.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                        </svg>
                        <p className="text-sm font-medium">Please select an account type above to display the form.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Register;