import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPharmacyProfile } from "../../services/pharmacyService.js";

function PharmacyProfile() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await getPharmacyProfile();
                setProfile(response.data.data);
            } catch (error) {
                console.log(error);
                setError("Failed to load pharmacy profile.");
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-slate-50/50">
                <div className="w-10 h-10 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
                <p className="mt-4 text-sm font-semibold text-slate-500">Loading pharmacy profile...</p>
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
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">

                    {/* Header Banner */}
                    <div className="bg-gradient-to-r from-teal-500 to-emerald-500 h-36 relative">
                        <div className="absolute left-6 sm:left-8 bottom-0 translate-y-1/2">
                            {profile.logo ? (
                                <img
                                    src={profile.logo}
                                    alt={profile.name}
                                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white object-cover bg-white shadow-lg"
                                />
                            ) : (
                                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-4 border-white bg-teal-50 flex items-center justify-center text-4xl shadow-lg">
                                    🏥
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="pt-16 sm:pt-18 px-6 sm:px-8 pb-8">

                        {/* Profile Name & Actions */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-slate-100">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                                    {profile.name}
                                </h1>
                                <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
                                    Verified Partner Pharmacy
                                </p>
                            </div>

                            {/* Update Button */}
                            <Link
                                to="/dashboard/profile-update"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 shadow-md shadow-teal-500/20 transition-all duration-200 active:scale-95"
                            >
                                <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                <span>Update Profile</span>
                            </Link>
                        </div>

                        {/* Details Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">

                            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 space-y-1">
                                <span className="block text-xs font-semibold uppercase text-slate-400">
                                    Address
                                </span>
                                <p className="text-sm font-bold text-slate-800">
                                    {profile.address}
                                </p>
                            </div>

                            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 space-y-1">
                                <span className="block text-xs font-semibold uppercase text-slate-400">
                                    Phone Number
                                </span>
                                <p className="text-sm font-bold text-slate-800">
                                    {profile.phone}
                                </p>
                            </div>

                            <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-100 space-y-1 font-mono text-xs sm:col-span-2">
                                <span className="block text-[10px] font-semibold uppercase text-slate-400 font-sans">
                                    Location Coordinates
                                </span>
                                <p className="text-slate-600">
                                    Latitude: <strong className="text-slate-800">{profile.latitude}</strong> | Longitude: <strong className="text-slate-800">{profile.longitude}</strong>
                                </p>
                            </div>

                        </div>

                        {/* Opening Hours Box */}
                        {profile.opening_hours && (
                            <div className="mt-6 bg-slate-50/80 rounded-2xl p-6 border border-slate-100 space-y-4">
                                <div className="flex items-center gap-2 text-teal-600">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <h2 className="text-base font-bold text-slate-900">
                                        Opening Hours
                                    </h2>
                                </div>

                                <div className="space-y-2 text-xs sm:text-sm divide-y divide-slate-200/60">
                                    {profile.opening_hours.sat_thu || profile.opening_hours.fri ? (
                                        <>
                                            {profile.opening_hours.sat_thu && (
                                                <div className="flex justify-between pt-2">
                                                    <span className="font-semibold text-slate-600">Saturday - Thursday</span>
                                                    <span className="font-bold text-teal-600">{profile.opening_hours.sat_thu}</span>
                                                </div>
                                            )}
                                            {profile.opening_hours.fri && (
                                                <div className="flex justify-between pt-2">
                                                    <span className="font-semibold text-slate-600">Friday</span>
                                                    <span className="font-bold text-teal-600">{profile.opening_hours.fri}</span>
                                                </div>
                                            )}
                                        </>
                                    ) : (
                                        Object.entries(profile.opening_hours).map(([day, hours]) => (
                                            <div key={day} className="flex justify-between pt-2 capitalize">
                                                <span className="font-semibold text-slate-600">{day}</span>
                                                <span className="font-bold text-teal-600">{hours}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}

export default PharmacyProfile;