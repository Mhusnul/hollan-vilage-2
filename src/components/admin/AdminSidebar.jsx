import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks";
import {
  LayoutDashboard,
  Home,
  Zap,
  Image,
  Menu,
  X,
  LogOut,
  FileText,
  CreditCard,
  Users,
} from "lucide-react";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const location = useLocation();
  const { logout } = useAuth();
  const [loggingOut, setLoggingOut] = useState(false);

  const menuItems = [
    {
      label: "Dasbor",
      icon: LayoutDashboard,
      path: "/admin",
    },
    {
      label: "Properti",
      icon: Home,
      path: "/admin/properties",
    },
    {
      label: "Fasilitas",
      icon: Zap,
      path: "/admin/facilities",
    },
    {
      label: "Galeri",
      icon: Image,
      path: "/admin/gallery",
    },
    {
      label: "Konten",
      icon: FileText,
      path: "/admin/content-sections",
    },
    {
      label: "Rencana Pembayaran",
      icon: CreditCard,
      path: "/admin/payment-plans",
    },
    {
      label: "Kontak Penjualan",
      icon: Users,
      path: "/admin/sales-contacts",
    },
  ];

  const isActive = (path) => location.pathname === path;

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await logout();
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout error:", err);
      setLoggingOut(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-black text-white p-2 rounded-md hover:bg-gray-800 transition"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 transition-transform duration-300 ${
          isOpen ? "translate-x-0 w-64" : "-translate-x-full"
        } md:translate-x-0 md:w-64 z-40 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-black">Holland</h1>
          <p className="text-xs text-gray-600 mt-1">Admin Dashboard</p>
        </div>

        {/* Menu Items */}
        <nav className="mt-4 flex-1 space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-md transition ${
                  isActive(item.path)
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 space-y-3">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm text-gray-700 hover:text-black transition px-4 py-2"
          >
            ← Kembali ke Website
          </Link>
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition text-sm font-medium disabled:opacity-50"
          >
            <LogOut size={18} />
            {loggingOut ? "Keluar..." : "Keluar"}
          </button>
        </div>
      </div>

      {/* Main content spacer */}
      <div className="hidden md:block md:w-64" />
    </>
  );
}
