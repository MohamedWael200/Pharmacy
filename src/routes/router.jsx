import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layout/MainLayout.jsx";
import DashboardLayout from "../layout/DashboardLayout.jsx";

import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Medicines from "../pages/Medicines.jsx";
import MedicineDetails from "../pages/MedicineDetails.jsx";
import MyReservations from "../pages/MyReservations.jsx";
import PharmacyDashboard from "../pages/pharmacy/PharmacyDashboard.jsx";
import NotFound from "../pages/NotFound.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import ReservationsDetails from "../pages/ReservationsDetails.jsx";
import PatientProfile from "../pages/patient/PatientProfile.jsx";
import UpdatePatientProfile from "../pages/patient/UpdatePatientProfile.jsx";
import PharmacyProfile from "../pages/pharmacy/PharmacyProfile.jsx";
import UpdatePharmacy from "../pages/pharmacy/UpdatePharmacy.jsx";
import Inventory from "../pages/pharmacy/Inventory/Inventory.jsx";
import AddInventory from "../pages/pharmacy/Inventory/AddInventory.jsx";
import ImportLogs from "../pages/pharmacy/Inventory/ImportLogs.jsx";
import PharmacyReservations from "../pages/pharmacy/PharmacyReservations.jsx";

const router = createBrowserRouter([
    // Public Routes
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "medicines",
                element: <Medicines />,
            },
            {
                path: "medicines/:id",
                element: <MedicineDetails />,
            },
        ],
    },

    // Patient Protected Routes
    {
        path: "/patient",
        element: (
            <ProtectedRoute role="patient">
                <MainLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <PatientProfile />,
            },
            {
                path: "update",
                element: <UpdatePatientProfile />,
            },
        ],
    },

    // Patient Reservations
    {
        path: "/reservations",
        element: (
            <ProtectedRoute role="patient">
                <MainLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "my",
                element: <MyReservations />,
            },
            {
                path: ":id",
                element: <ReservationsDetails />,
            },
        ],
    },

    // Pharmacy Dashboard
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute role="pharmacy">
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                index: true,
                element: <PharmacyDashboard />,
            },
            {
                path: "profile",
                element: <PharmacyProfile />,
            },
            {
                path: "profile-update",
                element: <UpdatePharmacy />,
            },
            {
                path: "inventory",
                element: <Inventory />,
            },
            {
                path: "inventory-add",
                element: <AddInventory />,
            },
            {
                path: "inventory-logs",
                element: <ImportLogs />,
            },
            {
                path: "pharmacy-reservations",
                element: <PharmacyReservations />,
            },
        ],
    },

    // 404
    {
        path: "*",
        element: <NotFound />,
    },
]);

export default router;