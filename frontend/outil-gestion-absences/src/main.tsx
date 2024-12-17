import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import "./index.css";
import router from "./route/route";
import { AuthProvider } from "./auth/AuthContext";
import { AccueilServicesProvider } from "./Context/AccueilServicesContext";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <AccueilServicesProvider>
      <StrictMode>
        <RouterProvider router={router} />
      </StrictMode>
    </AccueilServicesProvider>
  </AuthProvider>
);
