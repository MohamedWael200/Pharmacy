import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../context/AuthContext.jsx";

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    async function handleLogout() {
        await logout();
        navigate("/login");
    }

    // Helper function to handle active link states
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 transition-all">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">

                    {/* Logo / Brand */}
                    <Link to="/" className="flex items-center gap-2.5 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform">
                            +
                        </div>
                        <span className="text-xl font-extrabold bg-gradient-to-r from-slate-900 via-slate-800 to-teal-700 bg-clip-text text-transparent">
                            PharmaCare
                        </span>
                    </Link>

                    {/* Navigation Links & Actions */}
                    <div className="flex items-center gap-1 sm:gap-2">

                        <Link
                            to="/"
                            className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                                isActive("/")
                                    ? "text-teal-600 bg-teal-50/80"
                                    : "text-slate-600 hover:text-teal-600 hover:bg-slate-50"
                            }`}
                        >
                            Home
                        </Link>

                        <Link
                            to="/medicines"
                            className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                                isActive("/medicines")
                                    ? "text-teal-600 bg-teal-50/80"
                                    : "text-slate-600 hover:text-teal-600 hover:bg-slate-50"
                            }`}
                        >
                            Medicines
                        </Link>

                        {/* Guest Links */}
                        {!user && (
                            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-slate-200">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-700 hover:text-teal-600 hover:bg-slate-50 transition-all"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="px-4 py-2 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 shadow-md shadow-teal-500/20 transition-all active:scale-95"
                                >
                                    Register
                                </Link>
                            </div>
                        )}

                        {/* Patient Links */}
                        {user?.role === "patient" && (
                            <>
                                <Link
                                    to="/reservations/my"
                                    className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                                        isActive("/reservations/my")
                                            ? "text-teal-600 bg-teal-50/80"
                                            : "text-slate-600 hover:text-teal-600 hover:bg-slate-50"
                                    }`}
                                >
                                    My Reservations
                                </Link>

                                <Link
                                    to="/patient"
                                    className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                                        isActive("/patient")
                                            ? "text-teal-600 bg-teal-50/80"
                                            : "text-slate-600 hover:text-teal-600 hover:bg-slate-50"
                                    }`}
                                >
                                    Profile
                                </Link>

                                <div className="ml-2 pl-2 border-l border-slate-200">
                                    <button
                                        onClick={handleLogout}
                                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-slate-600 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 border border-slate-200/80 hover:border-rose-200 rounded-xl transition-all duration-200 active:scale-95 shadow-sm"
                                    >
                                        <svg className="w-4 h-4 mr-1.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Logout
                                    </button>
                                </div>
                            </>
                        )}

                        {/* Pharmacy Links */}
                        {user?.role === "pharmacy" && (
                            <>
                                <Link
                                    to="/dashboard"
                                    className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                                        isActive("/dashboard")
                                            ? "text-teal-600 bg-teal-50/80"
                                            : "text-slate-600 hover:text-teal-600 hover:bg-slate-50"
                                    }`}
                                >
                                    Dashboard
                                </Link>

                                <Link
                                    to="/dashboard/inventory"
                                    className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                                        isActive("/dashboard/inventory")
                                            ? "text-teal-600 bg-teal-50/80"
                                            : "text-slate-600 hover:text-teal-600 hover:bg-slate-50"
                                    }`}
                                >
                                    Inventory
                                </Link>

                                <Link
                                    to="/dashboard/pharmacy-reservations"
                                    className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                                        isActive("/dashboard/pharmacy-reservations")
                                            ? "text-teal-600 bg-teal-50/80"
                                            : "text-slate-600 hover:text-teal-600 hover:bg-slate-50"
                                    }`}
                                >
                                    Reservations
                                </Link>

                                <Link
                                    to="/dashboard/profile"
                                    className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${
                                        isActive("/dashboard/profile")
                                            ? "text-teal-600 bg-teal-50/80"
                                            : "text-slate-600 hover:text-teal-600 hover:bg-slate-50"
                                    }`}
                                >
                                    Profile
                                </Link>

                                <div className="ml-2 pl-2 border-l border-slate-200">
                                    <button
                                        onClick={handleLogout}
                                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-slate-600 hover:text-rose-600 bg-slate-50 hover:bg-rose-50 border border-slate-200/80 hover:border-rose-200 rounded-xl transition-all duration-200 active:scale-95 shadow-sm"
                                    >
                                        <svg className="w-4 h-4 mr-1.5 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        Logout
                                    </button>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;