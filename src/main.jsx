import { createRoot } from 'react-dom/client'
import AuthProvider from "./context/AuthProvider.jsx";
import {RouterProvider} from "react-router-dom";
import router from "./routes/router.jsx";
import './index.css'

createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>,
)
