import Navbar from "../components/Navbar.jsx";
import {Outlet} from "react-router-dom";

function DashboardLayout() {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}
export default DashboardLayout;