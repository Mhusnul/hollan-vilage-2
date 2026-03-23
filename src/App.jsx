import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import AdminSidebar from "./components/admin/AdminSidebar";
import ProtectedRoute from "./components/ProtectedRoute";

// Public pages
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";

// Admin pages
import AdminDashboard from "./pages/admin/DashboardPage";
import PropertiesPage from "./pages/admin/PropertiesPage";
import FacilitiesPage from "./pages/admin/FacilitiesPage";
import GalleryPage from "./pages/admin/GalleryPage";
import ContentSectionsPage from "./pages/admin/ContentSectionsPage";
import PaymentPlansPage from "./pages/admin/PaymentPlansPage";
import SalesContactsPage from "./pages/admin/SalesContactsPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />

        {/* Admin routes with protection */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <div className="flex">
                <AdminSidebar />
                <div className="flex-1">
                  <Routes>
                    <Route path="/" element={<AdminDashboard />} />
                    <Route path="/properties" element={<PropertiesPage />} />
                    <Route path="/facilities" element={<FacilitiesPage />} />
                    <Route path="/gallery" element={<GalleryPage />} />
                    <Route
                      path="/content-sections"
                      element={<ContentSectionsPage />}
                    />
                    <Route
                      path="/payment-plans"
                      element={<PaymentPlansPage />}
                    />
                    <Route
                      path="/sales-contacts"
                      element={<SalesContactsPage />}
                    />
                  </Routes>
                </div>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
      <Analytics />
    </Router>
  );
}

export default App;
