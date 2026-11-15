import React, { useState } from "react";
import {
  houseTypes,
  buildingSpecifications,
  marketing,
} from "../../data/config";
import {
  BedDouble,
  Bath,
  Home,
  Ruler,
  CheckCircle2,
  PhoneCall,
  Calendar,
  ZoomIn,
  X,
  Layers,
  Sparkles,
} from "lucide-react";
import SectionTitle from "../common/SectionTitle";

export default function HouseTypes() {
  const [activeType, setActiveType] = useState(houseTypes[0]);
  const [viewMode, setViewMode] = useState("exterior"); // "exterior" | "floorplan"
  const [zoomImage, setZoomImage] = useState(null);

  const handleContactAgent = (unit) => {
    const text = encodeURIComponent(
      `Halo Marketing Holland Village Sukabumi, saya tertarik dengan unit *${unit.name}* (LB ${unit.buildingArea} / LT ${unit.landArea}) dengan harga mulai ${unit.priceStartFrom}. Mohon info detail dan ketersediaan unitnya.`
    );
    window.open(`${marketing.agents[0].whatsapp}?text=${text}`, "_blank");
  };

  const handleScheduleSurvey = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const highlightMaterials = [
    { label: "Pondasi", value: buildingSpecifications.foundation },
    { label: "Struktur", value: buildingSpecifications.structure },
    { label: "Dinding", value: buildingSpecifications.walls },
    { label: "Lantai Utama", value: buildingSpecifications.flooring },
    { label: "Atap", value: buildingSpecifications.roof },
    { label: "Rangka Atap", value: buildingSpecifications.roofFrame },
    { label: "Carport", value: buildingSpecifications.carport },
    { label: "Air & Listrik", value: `${buildingSpecifications.waterSupply} • ${buildingSpecifications.electricity}` },
  ];

  return (
    <section
      id="houses"
      className="py-20 md:py-28 bg-[#F3EFE6]/70 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Koleksi Unit Eksklusif"
          title="Pilihan Tipe Hunian Modern Tropis"
          subtitle="Setiap unit dirancang dengan sirkulasi udara silang, pencahayaan alami maksimal, dan tata ruang yang fungsional bagi keluarga Anda."
        />

        {/* UNIT SELECTOR CARDS */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-12">
          {houseTypes.map((type) => {
            const isSelected = activeType.id === type.id;
            return (
              <button
                key={type.id}
                onClick={() => {
                  setActiveType(type);
                  setViewMode("exterior");
                }}
                className={`text-left p-4 sm:p-5 rounded-2xl transition-all duration-300 border cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? "bg-[#07261C] text-white border-emerald-800 shadow-xl shadow-emerald-950/15 -translate-y-1"
                    : "bg-white text-stone-800 border-stone-200/90 hover:border-emerald-800/40 hover:bg-[#FAF8F5]"
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${
                      isSelected
                        ? "bg-[#C58F4B] text-white"
                        : "bg-emerald-900/8 text-emerald-900"
                    }`}
                  >
                    {type.badge}
                  </span>
                </div>

                <h3
                  className={`font-serif-display text-lg sm:text-xl font-bold ${
                    isSelected ? "text-white" : "text-[#0F291E]"
                  }`}
                >
                  {type.name}
                </h3>

                <p
                  className={`text-xs mt-1 ${
                    isSelected ? "text-emerald-100/80" : "text-stone-500"
                  }`}
                >
                  LB {type.buildingArea} • LT {type.landArea}
                </p>

                <p
                  className={`text-sm sm:text-base font-bold mt-3 pt-2.5 border-t ${
                    isSelected
                      ? "text-[#E2B170] border-white/15"
                      : "text-emerald-900 border-stone-100"
                  }`}
                >
                  {type.priceStartFrom}
                </p>
              </button>
            );
          })}
        </div>

        {/* MAIN ACTIVE UNIT SHOWCASE */}
        <div className="bg-white rounded-3xl shadow-xl shadow-emerald-950/5 border border-emerald-900/10 p-6 sm:p-8 lg:p-10">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            {/* LEFT: VISUAL & FLOORPLAN VIEWER */}
            <div className="lg:col-span-6 space-y-4">
              {/* Toggle Tabs: Fasad vs Denah */}
              <div className="flex items-center justify-between bg-[#F3EFE6] p-1.5 rounded-xl">
                <div className="grid grid-cols-2 gap-1.5 w-full">
                  <button
                    onClick={() => setViewMode("exterior")}
                    className={`py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      viewMode === "exterior"
                        ? "bg-emerald-900 text-white shadow-sm"
                        : "text-stone-600 hover:text-emerald-950"
                    }`}
                  >
                    Fasad Eksterior
                  </button>
                  <button
                    onClick={() => setViewMode("floorplan")}
                    className={`py-2.5 px-4 rounded-lg text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      viewMode === "floorplan"
                        ? "bg-emerald-900 text-white shadow-sm"
                        : "text-stone-600 hover:text-emerald-950"
                    }`}
                  >
                    Denah Tata Ruang
                  </button>
                </div>
              </div>

              {/* Main Image Display */}
              <div
                className="relative rounded-2xl overflow-hidden border border-stone-200 bg-[#FAF8F5] group cursor-pointer h-[320px] sm:h-[400px]"
                onClick={() =>
                  setZoomImage({
                    src:
                      viewMode === "exterior"
                        ? activeType.image
                        : activeType.floorPlan,
                    title: `${activeType.name} — ${
                      viewMode === "exterior" ? "Fasad Rumah" : "Denah Unit"
                    }`,
                  })
                }
              >
                <img
                  src={
                    viewMode === "exterior"
                      ? activeType.image
                      : activeType.floorPlan
                  }
                  alt={activeType.name}
                  className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
                    viewMode === "floorplan"
                      ? "object-contain p-3 bg-white"
                      : "object-cover"
                  }`}
                />
                <div className="absolute top-4 left-4 bg-[#07261C]/85 backdrop-blur-md text-white px-3.5 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5">
                  <Sparkles size={13} className="text-[#E2B170]" />
                  <span>{activeType.name}</span>
                </div>
                <button
                  type="button"
                  className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-[#0F291E] px-3.5 py-2 rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
                >
                  <ZoomIn size={15} />
                  <span>Perbesar Gambar</span>
                </button>
              </div>

              {/* Dual Thumbnail Preview Strip */}
              <div className="grid grid-cols-2 gap-4">
                <div
                  onClick={() => setViewMode("exterior")}
                  className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-all ${
                    viewMode === "exterior"
                      ? "border-emerald-800 bg-emerald-900/5"
                      : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <img
                    src={activeType.image}
                    alt="Fasad"
                    className="w-16 h-14 rounded-lg object-cover shrink-0"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#0F291E]">
                      Tampak Fasad
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Desain Modern Tropis
                    </p>
                  </div>
                </div>

                <div
                  onClick={() => setViewMode("floorplan")}
                  className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-all ${
                    viewMode === "floorplan"
                      ? "border-emerald-800 bg-emerald-900/5"
                      : "border-stone-200 hover:border-stone-300"
                  }`}
                >
                  <img
                    src={activeType.floorPlan}
                    alt="Denah"
                    className="w-16 h-14 rounded-lg object-cover shrink-0 bg-white border border-stone-100"
                  />
                  <div>
                    <p className="text-xs font-bold text-[#0F291E]">
                      Denah Unit
                    </p>
                    <p className="text-[11px] text-stone-500">
                      Layout {activeType.buildingArea} / {activeType.landArea}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: UNIT SPECIFICATIONS & PRICING DETAILS */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex flex-wrap items-start justify-between gap-4 pb-5 border-b border-stone-200">
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-widest text-emerald-800 mb-1">
                    {activeType.badge}
                  </span>
                  <h3 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#0F291E]">
                    {activeType.name}
                  </h3>
                  <p className="text-sm text-stone-600 mt-1">
                    {activeType.roomDetails}
                  </p>
                </div>

                <div className="bg-[#FAF8F5] border border-emerald-900/15 px-5 py-3 rounded-2xl text-left sm:text-right">
                  <p className="text-xs text-stone-500 font-medium uppercase tracking-wider">
                    Harga Mulai Dari
                  </p>
                  <p className="font-serif-display text-2xl sm:text-3xl font-bold text-emerald-900">
                    {activeType.priceStartFrom}
                  </p>
                </div>
              </div>

              {/* 4 ACCURATE SPECS CARDS (Fixed Building Area vs Land Area) */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200/80 flex flex-col items-center text-center">
                  <div className="w-9 h-9 rounded-xl bg-emerald-900/10 text-emerald-900 flex items-center justify-center mb-2">
                    <Home size={18} />
                  </div>
                  <p className="text-xs text-stone-500">Luas Bangunan</p>
                  <p className="text-base font-bold text-[#0F291E] mt-0.5">
                    {activeType.buildingArea}
                  </p>
                </div>

                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200/80 flex flex-col items-center text-center">
                  <div className="w-9 h-9 rounded-xl bg-emerald-900/10 text-emerald-900 flex items-center justify-center mb-2">
                    <Ruler size={18} />
                  </div>
                  <p className="text-xs text-stone-500">Luas Tanah</p>
                  <p className="text-base font-bold text-[#0F291E] mt-0.5">
                    {activeType.landArea}
                  </p>
                </div>

                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200/80 flex flex-col items-center text-center">
                  <div className="w-9 h-9 rounded-xl bg-emerald-900/10 text-emerald-900 flex items-center justify-center mb-2">
                    <BedDouble size={18} />
                  </div>
                  <p className="text-xs text-stone-500">Kamar Tidur</p>
                  <p className="text-base font-bold text-[#0F291E] mt-0.5">
                    {activeType.bedroom} Kamar
                  </p>
                </div>

                <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200/80 flex flex-col items-center text-center">
                  <div className="w-9 h-9 rounded-xl bg-emerald-900/10 text-emerald-900 flex items-center justify-center mb-2">
                    <Bath size={18} />
                  </div>
                  <p className="text-xs text-stone-500">Kamar Mandi</p>
                  <p className="text-base font-bold text-[#0F291E] mt-0.5">
                    {activeType.bathroom} Ruang
                  </p>
                </div>
              </div>

              {/* Payment Highlights Strip for Active Unit */}
              <div className="grid grid-cols-3 gap-3 bg-emerald-950/4 p-4 rounded-2xl border border-emerald-900/10">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">
                    Booking Fee
                  </p>
                  <p className="text-sm sm:text-base font-bold text-emerald-950 mt-0.5">
                    {activeType.bookingFee}
                  </p>
                </div>
                <div className="border-x border-stone-200/80 px-3">
                  <p className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">
                    Biaya All-In
                  </p>
                  <p className="text-sm sm:text-base font-bold text-[#B07B38] mt-0.5">
                    {activeType.allInPrice}
                  </p>
                </div>
                <div className="pl-1">
                  <p className="text-[11px] uppercase tracking-wider text-stone-500 font-semibold">
                    Plafon KPR
                  </p>
                  <p className="text-sm sm:text-base font-bold text-emerald-950 mt-0.5">
                    {activeType.kprAmount}
                  </p>
                </div>
              </div>

              {/* Detailed Specifications List */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-emerald-900 mb-3 flex items-center gap-2">
                  <Layers size={15} className="text-[#C58F4B]" />
                  <span>Spesifikasi & Keunggulan Unit</span>
                </h4>

                <div className="grid sm:grid-cols-2 gap-2.5">
                  {activeType.specification.map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 text-sm text-stone-700"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-emerald-700 shrink-0 mt-0.5"
                      />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 pt-2">
                <button
                  onClick={() => handleContactAgent(activeType)}
                  className="flex-1 px-6 py-3.5 bg-emerald-900 hover:bg-emerald-800 text-white rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md shadow-emerald-950/15 transition-all cursor-pointer active:scale-95"
                >
                  <PhoneCall size={17} />
                  <span>Tanya {activeType.name} via WhatsApp</span>
                </button>

                <button
                  onClick={handleScheduleSurvey}
                  className="px-6 py-3.5 border-2 border-emerald-900/20 hover:border-emerald-900 text-emerald-950 hover:bg-emerald-900/5 rounded-xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Calendar size={17} />
                  <span>Jadwalkan Survey</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ARCHITECTURAL MATERIAL SPECIFICATIONS BANNER */}
        <div className="mt-12 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-sm">
          <div className="text-center mb-6">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C58F4B]">
              Standar Mutu Bangunan
            </span>
            <h4 className="font-serif-display text-xl sm:text-2xl font-bold text-[#0F291E] mt-1">
              Spesifikasi Material Teknis Pilihan
            </h4>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {highlightMaterials.map((mat, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200/70"
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                  {mat.label}
                </p>
                <p className="text-sm font-bold text-stone-800 mt-1">
                  {mat.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* IMAGE ZOOM MODAL */}
      {zoomImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setZoomImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 bg-[#07261C] text-white">
              <h4 className="font-serif-display text-lg font-semibold">
                {zoomImage.title}
              </h4>
              <button
                onClick={() => setZoomImage(null)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 bg-[#FAF8F5] flex items-center justify-center max-h-[80vh] overflow-auto">
              <img
                src={zoomImage.src}
                alt={zoomImage.title}
                className="max-h-[72vh] w-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
