import { useContext } from "react";
import AuthContext from "../../context/AuthContext.jsx";

function PatientProfile() {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-slate-50/50">
                <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-sm font-semibold text-slate-500">Loading profile...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-slate-50/50 px-4">
                <div className="p-6 bg-rose-50 border border-rose-200 rounded-2xl text-center max-w-md">
                    <p className="text-rose-600 font-semibold">Profile not found.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-8">

                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-6 sm:p-10 space-y-8">

                    {/* User Header Info */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pb-6 border-b border-slate-100 text-center sm:text-left">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white font-extrabold text-3xl shadow-lg shadow-teal-500/20 shrink-0">
                            {user.name ? user.name.charAt(0).toUpperCase() : "P"}
                        </div>
                        <div className="space-y-1">
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                    {user.name}
                                </h1>
                                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-teal-50 text-teal-700 border border-teal-100">
                                    {user.role}
                                </span>
                            </div>
                            <p className="text-sm font-medium text-slate-500">{user.email}</p>
                            <p className="text-xs text-slate-400 font-mono">
                                Patient ID: #{user.patient?.id}
                            </p>
                        </div>
                    </div>

                    {/* Patient Information Section */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 text-teal-600">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <h2 className="text-lg font-bold text-slate-900">
                                Patient Details
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-1">
                                <span className="block text-xs font-semibold uppercase text-slate-400">Phone Number</span>
                                <span className="text-sm font-bold text-slate-800">{user.patient?.phone}</span>
                            </div>

                            <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-1">
                                <span className="block text-xs font-semibold uppercase text-slate-400">Account Created</span>
                                <span className="text-sm font-bold text-slate-800">
                                    {new Date(user.created_at).toLocaleDateString()}
                                </span>
                            </div>

                            <div className="sm:col-span-2 p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-1">
                                <span className="block text-xs font-semibold uppercase text-slate-400">Address</span>
                                <span className="text-sm font-bold text-slate-800">{user.patient?.address}</span>
                            </div>

                            <div className="sm:col-span-2 p-4 rounded-2xl bg-slate-50/80 border border-slate-100 space-y-1 font-mono text-xs">
                                <span className="block text-[10px] font-semibold uppercase text-slate-400 font-sans">Coordinates</span>
                                <span className="text-slate-600">
                                    Latitude: <strong className="text-slate-800">{user.patient?.latitude}</strong> | Longitude: <strong className="text-slate-800">{user.patient?.longitude}</strong>
                                </span>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default PatientProfile;