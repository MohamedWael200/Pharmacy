import { useForm } from "react-hook-form";
import Input from "../components/Form/input/Input.jsx";
import { login } from "../services/authService.js";
import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext.jsx";
import { motion, AnimatePresence } from "framer-motion";

function Login() {
    const { setUser } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [apiError, setApiError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: "onBlur" });

    async function handleOnSubmit(data) {
        setLoading(true);
        setApiError("");
        try {
            const response = await login(data);
            const { token, user } = response.data.data;
            localStorage.setItem("token", token);
            setUser(user);
        } catch (error) {
            console.error(error);
            setApiError(error?.response?.data?.message || "Failed to sign in. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    }

    // Variantes لضبط تتابع الحركة (Staggering)
    const containerVariants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 15 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
        }
    };

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center relative overflow-hidden">
            {/* Soft Ambient Glow Effect */}
            <div className="absolute w-96 h-96 bg-teal-400/10 rounded-full blur-3xl -top-20 -left-20 pointer-events-none"></div>
            <div className="absolute w-96 h-96 bg-emerald-400/10 rounded-full blur-3xl -bottom-20 -right-20 pointer-events-none"></div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-slate-200/70 border border-slate-100 p-8 sm:p-10 relative z-10"
            >
                {/* Header Section */}
                <motion.div variants={itemVariants} className="text-center mb-8">
                    <motion.div
                        whileHover={{ scale: 1.08, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-teal-50 text-teal-600 mb-4 shadow-sm border border-teal-100/50 cursor-pointer"
                    >
                        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                    </motion.div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Please enter your details to sign in to your account.
                    </p>
                </motion.div>

                {/* API Error Message */}
                <AnimatePresence>
                    {apiError && (
                        <motion.div
                            initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                            animate={{ opacity: 1, height: "auto", marginBottom: 20 }}
                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                            className="bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold p-3.5 rounded-2xl text-center overflow-hidden"
                        >
                            {apiError}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Form */}
                <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-5">
                    <motion.div variants={itemVariants}>
                        <Input
                            label="Email Address"
                            type="email"
                            register={register}
                            error={errors.email}
                            name="email"
                        />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                        <Input
                            label="Password"
                            type="password"
                            register={register}
                            error={errors.password}
                            name="password"
                        />
                    </motion.div>

                    <motion.div variants={itemVariants} className="pt-2">
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={{ scale: 1.015, boxShadow: "0px 10px 25px rgba(20, 184, 166, 0.35)" }}
                            whileTap={{ scale: 0.985 }}
                            className="w-full py-3.5 px-6 rounded-2xl text-white font-semibold bg-gradient-to-r from-teal-500 via-teal-600 to-emerald-500 focus:outline-none focus:ring-4 focus:ring-teal-500/20 shadow-lg shadow-teal-500/20 transition-all duration-200 flex justify-center items-center gap-2 disabled:opacity-70"
                        >
                            {loading ? (
                                <>
                                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    <span>Signing In...</span>
                                </>
                            ) : (
                                "Sign In"
                            )}
                        </motion.button>
                    </motion.div>
                </form>
            </motion.div>
        </div>
    );
}

export default Login;