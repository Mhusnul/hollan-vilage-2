import React, { useState, useEffect } from "react";
import Home from "./pages/Home";
import AdminPortal from "./pages/admin/AdminPortal";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setPathname(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (to) => {
    window.history.pushState({}, "", to);
    setPathname(to);
    window.scrollTo(0, 0);
  };

  const isAdminRoute =
    pathname === "/admin" || pathname.startsWith("/admin/");

  return (
    <>
      {isAdminRoute ? (
        <AdminPortal onNavigateHome={() => navigate("/")} />
      ) : (
        <Home pathname={pathname} onNavigate={navigate} />
      )}
      <Analytics />
    </>
  );
}

export default App;
