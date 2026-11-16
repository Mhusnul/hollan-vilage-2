import React, { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { marketing } from "../../data/config";
import AdminLogin from "./AdminLogin";
import OverviewDashboard from "./OverviewDashboard";
import HouseTypesManager from "./HouseTypesManager";
import PricingManager from "./PricingManager";
import LeadsManager from "./LeadsManager";
import MarketingManager from "./MarketingManager";
import MasterplanManager from "./MasterplanManager";
import GalleryFacilitiesManager from "./GalleryFacilitiesManager";
import {
  LogOut,
  Compass,
  Building2,
  Tag,
  Users,
  Map,
  Image as ImageIcon,
  PhoneCall,
  Plus,
  Search,
  UploadCloud,
  Bell,
  Settings,
  Database,
  Globe,
  MessageCircle,
  Loader2,
  Menu,
  X,
} from "lucide-react";

const MENU_ITEMS = [
  { id: "overview", label: "Overview", icon: Compass, ready: true },
  { id: "house-types", label: "Tipe Rumah", icon: Building2, ready: true },
  { id: "pricing", label: "Harga & Promo", icon: Tag, ready: true },
  { id: "leads", label: "Leads Survey", icon: Users, ready: true },
  { id: "masterplan", label: "Masterplan", icon: Map, ready: true },
  { id: "gallery", label: "Galeri & Fasilitas", icon: ImageIcon, ready: true },
  { id: "marketing", label: "Kontak Marketing", icon: PhoneCall, ready: true },
];

export default function AdminPortal({ onNavigateHome }) {
  const [session, setSession] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [triggerNewModal, setTriggerNewModal] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      if (mounted) {
        setSession(currentSession);
        setCheckingAuth(false);
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, updatedSession) => {
      setSession(updatedSession);
      setCheckingAuth(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 15000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#F5F7FB] flex flex-col items-center justify-center gap-3 text-slate-800">
        <Loader2 size={28} className="animate-spin text-blue-600" />
        <p className="text-xs font-medium text-slate-500">
          Memeriksa sesi admin...
        </p>
      </div>
    );
  }

  if (!session) {
    return <AdminLogin onNavigateHome={onNavigateHome} />;
  }

  const adminEmail = session.user?.email || "admin@hollandvillage.id";

  return (
    <div className="h-screen bg-[#EEF2F8] text-slate-800 flex flex-col font-sans overflow-hidden">
      <div className="flex-1 flex h-full min-h-0 max-w-[1600px] w-full mx-auto bg-white shadow-xl overflow-hidden">
        {/* ================= LEFT SIDEBAR ================= */}
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-60 bg-white border-r border-slate-100 flex flex-col justify-between overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0 ${
            mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            {/* Brand Header */}
            <div className="h-20 px-6 flex items-center justify-between border-b border-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 font-extrabold text-sm flex items-center justify-center shadow-2xs">
                  H
                </div>
                <span className="font-bold text-lg text-slate-800 tracking-tight">
                  Holland<span className="text-blue-600">CMS</span>
                </span>
              </div>

              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            {/* Main Menu */}
            <div className="py-6">
              <p className="px-6 text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-3">
                Main Menu
              </p>
              <nav className="space-y-1">
                {MENU_ITEMS.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id);
                        setMobileSidebarOpen(false);
                      }}
                      className={`w-full relative flex items-center justify-between px-6 py-2.5 text-xs font-semibold transition-all cursor-pointer ${
                        isActive
                          ? "text-blue-600 bg-blue-50/40"
                          : "text-slate-400 hover:text-slate-700 hover:bg-slate-50/60"
                      }`}
                    >
                      {/* Left Active Blue Indicator Bar */}
                      {isActive && (
                        <span className="absolute left-0 top-1.5 bottom-1.5 w-1 rounded-r-full bg-blue-600" />
                      )}
                      <div className="flex items-center gap-3.5">
                        <Icon
                          size={17}
                          className={
                            isActive ? "text-blue-600" : "text-slate-400"
                          }
                        />
                        <span>{item.label}</span>
                      </div>
                      {!item.ready && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-400 font-medium">
                          Soon
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Connected App Section */}
            <div className="py-4 border-t border-slate-100">
              <div className="px-6 flex items-center justify-between mb-3">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Connected App
                </p>
                <span className="w-5 h-5 rounded-full border border-slate-200 text-slate-400 flex items-center justify-center">
                  <Plus size={11} />
                </span>
              </div>

              <div className="space-y-1 px-3">
                <a
                  href="/"
                  onClick={(e) => {
                    if (onNavigateHome) {
                      e.preventDefault();
                      onNavigateHome();
                    }
                  }}
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-6 h-6 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Globe size={14} />
                  </div>
                  <span>Website Utama</span>
                </a>

                <div className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600">
                  <div className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Database size={14} />
                  </div>
                  <span>Supabase Cloud</span>
                </div>

                <a
                  href={marketing.agents[0].whatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
                >
                  <div className="w-6 h-6 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <MessageCircle size={14} />
                  </div>
                  <span>WhatsApp Agen</span>
                </a>
              </div>
            </div>
          </div>

          {/* Logout Button at Bottom */}
          <div className="p-5">
            <button
              onClick={handleLogout}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100/90 hover:bg-red-50 text-slate-500 hover:text-red-600 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Logout</span>
              <LogOut size={14} />
            </button>
          </div>
        </aside>

        {/* Mobile Overlay */}
        {mobileSidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* ================= CENTER + RIGHT AREA ================= */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0">
          {/* TOP HEADER BAR */}
          <header className="h-20 bg-white border-b border-slate-100 px-4 sm:px-8 flex items-center justify-between gap-4 shrink-0">
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <button
                onClick={() => setMobileSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-600"
              >
                <Menu size={18} />
              </button>

              {/* Search Bar */}
              <div className="relative w-full">
                <Search
                  size={15}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari tipe rumah, harga, spesifikasi..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#F5F7FB] text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white border border-transparent focus:border-blue-200 transition-all"
                />
              </div>
            </div>

            {/* Right Header Controls */}
            <div className="flex items-center gap-3 sm:gap-5">
              <button
                onClick={() => {
                  setActiveTab("house-types");
                  setTriggerNewModal((n) => n + 1);
                }}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold transition-colors cursor-pointer"
              >
                <UploadCloud size={15} />
                <span className="hidden sm:inline">Tambah Unit</span>
              </button>

              <div className="flex items-center gap-2 text-slate-400">
                <button
                  onClick={() => setActiveTab("overview")}
                  className="relative p-2 rounded-xl hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
                  title="Notifikasi"
                >
                  <Bell size={17} />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
                </button>
                <button
                  onClick={() => setActiveTab("house-types")}
                  className="p-2 rounded-xl hover:bg-slate-100 hover:text-slate-600 transition-colors cursor-pointer"
                  title="Pengaturan Unit"
                >
                  <Settings size={17} />
                </button>
              </div>

              <div className="hidden sm:block pl-2 border-l border-slate-100 text-xs font-bold text-slate-700 whitespace-nowrap">
                {currentTime || "08:10 AM"}
              </div>
            </div>
          </header>

          {/* BODY: CENTER CANVAS + RIGHT SIDEBAR */}
          <div className="flex-1 flex min-h-0 overflow-hidden">
            {/* CENTER WORKSPACE */}
            <main className="flex-1 bg-[#F5F7FB] p-4 sm:p-7 overflow-y-auto">
              {activeTab === "overview" ? (
                <OverviewDashboard
                  adminEmail={adminEmail}
                  onNavigateTab={setActiveTab}
                />
              ) : activeTab === "house-types" ? (
                <HouseTypesManager
                  searchQuery={searchQuery}
                  triggerNewModal={triggerNewModal}
                  adminEmail={adminEmail}
                />
              ) : activeTab === "pricing" ? (
                <PricingManager />
              ) : activeTab === "leads" ? (
                <LeadsManager searchQuery={searchQuery} />
              ) : activeTab === "masterplan" ? (
                <MasterplanManager searchQuery={searchQuery} />
              ) : activeTab === "gallery" ? (
                <GalleryFacilitiesManager searchQuery={searchQuery} />
              ) : activeTab === "marketing" ? (
                <MarketingManager />
              ) : (
                <div className="bg-white rounded-2xl p-10 shadow-xs border border-slate-100 text-center space-y-3 max-w-lg mx-auto my-8">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
                    <Settings size={22} />
                  </div>
                  <h3 className="text-base font-bold text-slate-800 font-sans">
                    Modul{" "}
                    {MENU_ITEMS.find((m) => m.id === activeTab)?.label || "CMS"}{" "}
                    Siap Dibangun Berikutnya
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Saat ini kita sedang berada di tahap{" "}
                    <strong>Modul 1 (Tipe Rumah & Harga Unit)</strong>. Beritahu
                    di chat jika kamu siap lanjut ke modul ini!
                  </p>
                  <button
                    onClick={() => setActiveTab("overview")}
                    className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold cursor-pointer"
                  >
                    Kembali ke Tipe Rumah
                  </button>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
