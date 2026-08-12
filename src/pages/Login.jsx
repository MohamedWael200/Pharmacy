import { useForm } from "react-hook-form";
import Input from "../components/Form/input/Input.jsx";
import { login } from "../services/authService.js";
import { useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";

function Login() {
    const { setUser } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ mode: "onBlur" });

    async function handleOnSubmit(data) {
        try {
            const response = await login(data);
            const { token, user } = response.data.data;
            localStorage.setItem("token", token);
            setUser(user);
        } catch (error) {
            console.log(error);
        }
        console.log(data);
    }

    return (
        <div className="min-h-[calc(100vh-4rem)] bg-slate-50/50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
            <div className="w-full max-w-md bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8 sm:p-10 transition-all">

                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 mb-4 shadow-sm">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                        Welcome Back
                    </h1>
                    <p className="mt-2 text-sm text-slate-500">
                        Please enter your details to sign in to your account.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(handleOnSubmit)} className="space-y-5">
                    <div>
                        <Input
                            label="Email Address"
                            type="email"
                            register={register}
                            error={errors.email}
                            name="email"
                        />
                    </div>

                    <div>
                        <Input
                            label="Password"
                            type="password"
                            register={register}
                            error={errors.password}
                            name="password"
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full py-3.5 px-6 rounded-2xl text-white font-semibold bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 focus:outline-none focus:ring-4 focus:ring-teal-500/20 shadow-lg shadow-teal-500/25 transition-all duration-200 active:scale-[0.99]"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;