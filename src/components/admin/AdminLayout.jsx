import React from "react";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar akan di-import di App.jsx sebagai route layout */}
      <main className="flex-1 pt-16 md:pt-0 px-4 py-6 md:px-8">
        <div className="max-w-7xl">{children}</div>
      </main>
    </div>
  );
}
