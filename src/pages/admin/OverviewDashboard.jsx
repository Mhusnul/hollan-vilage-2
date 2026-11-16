import React, { useState, useEffect } from "react";
import { fetchHouseTypes } from "../../utils/houseTypesService";
import { fetchUnitBlocks } from "../../utils/unitBlocksService";
import { fetchInquiries } from "../../utils/inquiriesService";
import { fetchPricingSettings } from "../../utils/pricingService";
import {
  fetchGalleryItems,
  fetchFacilities,
} from "../../utils/galleryFacilitiesService";
import { fetchMarketingSettings } from "../../utils/marketingService";
import {
  Building2,
  Users,
  Map,
  Image as ImageIcon,
  Tag,
  PhoneCall,
  ArrowRight,
  Loader2,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  X,
} from "lucide-react";

const STATUS_BADGE = {
  Baru: "bg-blue-50 text-blue-600",
  Dihubungi: "bg-amber-50 text-amber-600",
  Survey: "bg-purple-50 text-purple-600",
  Closing: "bg-emerald-50 text-emerald-600",
  Batal: "bg-slate-100 text-slate-500",
};

export default function OverviewDashboard({
  adminEmail = "Admin",
  onNavigateTab,
}) {
  const [loading, setLoading] = useState(true);
  const [showBanner, setShowBanner] = useState(true);
  const [data, setData] = useState({
    houseTypes: [],
    blocks: [],
    inquiries: [],
    pricing: null,
    galleryCount: 0,
    facilitiesCount: 0,
    marketing: null,
  });

  useEffect(() => {
    let mounted = true;
    async function loadSummary() {
      try {
        setLoading(true);
        const [
          houseTypes,
          blocks,
          inquiries,
          pricing,
          gallery,
          facilities,
          marketing,
        ] = await Promise.all([
          fetchHouseTypes().catch(() => []),
          fetchUnitBlocks().catch(() => []),
          fetchInquiries().catch(() => []),
          fetchPricingSettings().catch(() => null),
          fetchGalleryItems().catch(() => []),
          fetchFacilities().catch(() => []),
          fetchMarketingSettings().catch(() => null),
        ]);

        if (mounted) {
          setData({
            houseTypes,
            blocks,
            inquiries,
            pricing,
            galleryCount: gallery.length,
            facilitiesCount: facilities.length,
            marketing,
          });
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    loadSummary();
    return () => {
      mounted = false;
    };
  }, []);

  const adminName = adminEmail
    ? adminEmail.split("@")[0].replace(/[._-]/g, " ")
    : "Admin";

  const totalCapacity = data.blocks.reduce((sum, b) => sum + (b.unit || 0), 0);
  const totalAvailable = data.blocks.reduce(
    (sum, b) => sum + (b.availableUnits ?? b.unit ?? 0),
    0
  );
  const availPercent =
    totalCapacity > 0 ? Math.round((totalAvailable / totalCapacity) * 100) : 0;

  const newLeadsCount = data.inquiries.filter((i) => i.status === "Baru").length;
  const surveyLeadsCount = data.inquiries.filter(
    (i) => i.status === "Survey"
  ).length;
  const recentInquiries = data.inquiries.slice(0, 5);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-12 shadow-xs border border-slate-100 flex flex-col items-center justify-center gap-3">
        <Loader2 size={26} className="animate-spin text-blue-600" />
        <p className="text-xs text-slate-500">
          Memuat ringkasan keseluruhan dari Supabase...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Welcome Hero Banner */}
      {showBanner && (
        <div className="relative rounded-2xl bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#1D4ED8] text-white p-6 sm:p-7 shadow-lg shadow-blue-500/15 overflow-hidden">
          <div className="pointer-events-none absolute -right-12 -bottom-16 w-72 h-72 rounded-full bg-white/10 blur-xl" />
          <div className="pointer-events-none absolute right-24 -top-20 w-56 h-56 rounded-full bg-blue-400/25 blur-lg" />
          <svg
            className="pointer-events-none absolute bottom-0 right-0 w-full h-24 opacity-15"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              d="M0,192L80,176C160,160,320,128,480,138.7C640,149,800,203,960,208C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            />
          </svg>

          <button
            onClick={() => setShowBanner(false)}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Tutup banner"
          >
            <X size={16} />
          </button>

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-[11px] font-semibold text-blue-100">
                <Sparkles size={12} />
                <span>Ringkasan Keseluruhan CMS</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight capitalize font-sans">
                Hi, {adminName}
              </h2>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                Pantau stok unit blok A–L, pendaftar survey terbaru, promo aktif,
                serta seluruh konten website Holland Village Sukabumi dalam satu
                layar.
              </p>
            </div>

            <button
              onClick={() => onNavigateTab?.("leads")}
              className="self-start sm:self-end px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-semibold border border-white/25 transition-all cursor-pointer shrink-0 inline-flex items-center gap-2"
            >
              <span>Cek Leads Survey</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* 4 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onNavigateTab?.("masterplan")}
          className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Map size={18} />
            </div>
            <span className="text-[11px] font-bold text-blue-600">
              {availPercent}% Tersedia
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">Ketersediaan Unit</p>
          <p className="text-xl font-bold text-slate-800 mt-0.5">
            {totalAvailable}{" "}
            <span className="text-xs font-normal text-slate-400">
              / {totalCapacity} Unit
            </span>
          </p>
          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-3">
            <div
              className="h-full bg-blue-600 rounded-full"
              style={{ width: `${availPercent}%` }}
            />
          </div>
        </div>

        <div
          onClick={() => onNavigateTab?.("house-types")}
          className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Building2 size={18} />
            </div>
            <span className="text-[11px] font-bold text-emerald-600">
              Aktif
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">Tipe Rumah</p>
          <p className="text-xl font-bold text-slate-800 mt-0.5">
            {data.houseTypes.length} Tipe
          </p>
          <p className="text-[11px] text-slate-400 mt-2 truncate">
            Mulai {data.pricing?.startingPrice || "Rp 419.000.000"}
          </p>
        </div>

        <div
          onClick={() => onNavigateTab?.("leads")}
          className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Users size={18} />
            </div>
            {newLeadsCount > 0 && (
              <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-bold">
                {newLeadsCount} Baru
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 font-medium">
            Total Leads Survey
          </p>
          <p className="text-xl font-bold text-slate-800 mt-0.5">
            {data.inquiries.length} Prospek
          </p>
          <p className="text-[11px] text-slate-400 mt-2">
            {surveyLeadsCount} jadwal survey aktif
          </p>
        </div>

        <div
          onClick={() => onNavigateTab?.("gallery")}
          className="bg-white rounded-2xl p-5 shadow-xs border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between mb-3">
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <ImageIcon size={18} />
            </div>
            <span className="text-[11px] font-bold text-purple-600">
              Storage
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium">
            Galeri & Fasilitas
          </p>
          <p className="text-xl font-bold text-slate-800 mt-0.5">
            {data.galleryCount} Foto
          </p>
          <p className="text-[11px] text-slate-400 mt-2">
            {data.facilitiesCount} fasilitas kawasan
          </p>
        </div>
      </div>

      {/* Middle Section: Recent Leads & House Types Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads Card */}
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-800 font-sans">
                Leads Survey Terbaru
              </h3>
              <button
                onClick={() => onNavigateTab?.("leads")}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Lihat Semua</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {recentInquiries.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                Belum ada pendaftar survey yang masuk.
              </div>
            ) : (
              <div className="space-y-3">
                {recentInquiries.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#F5F7FB]/80"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">
                        {lead.name}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {lead.phone} • {lead.house_type || "Umum"}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-bold shrink-0 ${
                        STATUS_BADGE[lead.status] || STATUS_BADGE.Baru
                      }`}
                    >
                      {lead.status || "Baru"}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* House Types Summary Card */}
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-800 font-sans">
                Koleksi Tipe Rumah
              </h3>
              <button
                onClick={() => onNavigateTab?.("house-types")}
                className="text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>Kelola Unit</span>
                <ArrowRight size={13} />
              </button>
            </div>

            <div className="space-y-3">
              {data.houseTypes.map((unit) => (
                <div
                  key={unit.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl bg-[#F5F7FB]/80"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={unit.image}
                      alt={unit.name}
                      className="w-11 h-9 rounded-lg object-cover shrink-0 border border-slate-200/70"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-slate-800 truncate">
                        {unit.name}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        LB {unit.buildingArea} • LT {unit.landArea}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-blue-600 shrink-0">
                    {unit.priceStartFrom}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Promo Summary & Marketing Contact Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          onClick={() => onNavigateTab?.("pricing")}
          className="bg-white rounded-2xl p-6 shadow-xs border border-slate-100 hover:border-blue-200 transition-all cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <Tag size={17} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 font-sans">
                  Promo & Skema KPR Aktif
                </h4>
                <p className="text-[11px] text-slate-400">
                  Klik untuk ubah promo & bunga KPR
                </p>
              </div>
            </div>
            <ArrowRight size={16} className="text-slate-400" />
          </div>

          <div className="grid grid-cols-2 gap-2.5 pt-2 text-xs">
            <div className="p-3 rounded-xl bg-[#F5F7FB]">
              <span className="text-[10px] text-slate-400 block">
                Booking Fee Mulai
              </span>
              <strong className="text-slate-800">
                {data.pricing?.bookingFeeStart || "Rp 1.000.000"}
              </strong>
            </div>
            <div className="p-3 rounded-xl bg-[#F5F7FB]">
              <span className="text-[10px] text-slate-400 block">
                Suku Bunga KPR
              </span>
              <strong className="text-blue-600">
                {data.pricing?.kprInterestRate || "5.99% Fixed 1 Thn"}
              </strong>
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {(data.pricing?.promo || []).slice(0, 3).map((p, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 text-[11px] font-semibold"
              >
                <CheckCircle2 size={11} />
                {p}
              </span>
            ))}
          </div>
        </div>

        <div
          onClick={() => onNavigateTab?.("marketing")}
          className="bg-white rounded-2xl p-6 shadow-xs border border-slate-100 hover:border-blue-200 transition-all cursor-pointer space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <PhoneCall size={17} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-800 font-sans">
                  Kontak Marketing Resmi
                </h4>
                <p className="text-[11px] text-slate-400">
                  Klik untuk kelola agen & nomor WhatsApp
                </p>
              </div>
            </div>
            <ArrowRight size={16} className="text-slate-400" />
          </div>

          <div className="p-3.5 rounded-xl bg-[#F5F7FB] flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-800 truncate">
                {data.marketing?.agents?.[0]?.name || "Adiansyah Anwar"}
              </p>
              <p className="text-[11px] text-slate-500 truncate">
                {data.marketing?.agents?.[0]?.role || "Property Advisor Resmi"} •{" "}
                {data.marketing?.agents?.[0]?.phone || data.marketing?.phone}
              </p>
            </div>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-700 text-[10px] font-bold shrink-0">
              <MessageCircle size={12} />
              WA Aktif
            </span>
          </div>

          <p className="text-[11px] text-slate-400 truncate">
            {data.marketing?.email} • {data.marketing?.operationalHours}
          </p>
        </div>
      </div>
    </div>
  );
}
