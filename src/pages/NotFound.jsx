import { Link } from "react-router-dom"; // إذا كنت بتستخدم React Router للتنقل

function NotFound() {
    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full text-center">
                {/* 404 Visual Icon */}
                <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6 rounded-3xl bg-teal-50 text-teal-600 shadow-xl shadow-teal-500/10 border border-teal-100">
                    <span className="text-4xl font-black">404</span>
                </div>

                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight sm:text-4xl">
                    Page Not Found
                </h1>

                <p className="mt-3 text-base text-slate-500">
                    Sorry, the page or medical record you are looking for doesn't exist or has been moved.
                </p>

                <div className="mt-8 flex justify-center gap-4">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 rounded-xl shadow-lg shadow-teal-500/20 transition-all duration-200 active:scale-95"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;