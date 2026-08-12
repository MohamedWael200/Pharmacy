import AuthContext from "./AuthContext.jsx";
import {useEffect, useState} from "react";
import {getUser , logout as logoutService } from "../services/authService.js";

function AuthProvider({ children}) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    async function logout() {
        try {
            await logoutService()

        } catch (error) {
            console.log(error);
        } finally {
            localStorage.removeItem("token");
            setUser(null);
        }
    }

    useEffect(() => {
        async function checkUser() {
            const token = localStorage.getItem("token");
            console.log("TOKEN:", token);
            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await getUser();
                setUser(response.data.data);
                console.log(response.data)
            } catch (error) {
                console.log(error);

                // لاحقًا ممكن نمسح الـ token هنا
                // localStorage.removeItem("token");
            } finally {
                setLoading(false);
            }
        }

        checkUser();
    }, []);

    return (
        <AuthContext.Provider value={ {user , setUser , loading , logout} }>
            {children}
        </AuthContext.Provider>
    )
}
export default AuthProvider