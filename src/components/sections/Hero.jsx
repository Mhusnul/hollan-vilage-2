import React from "react";
import {
  ArrowRight,
  ShieldCheck,
  Trees,
  MapPin,
  Sparkles,
  CheckCircle2,
  PhoneCall,
} from "lucide-react";
import heroImg from "../../assets/bg1.jpeg";
import { company, project, marketing } from "../../data/config";

export default function Hero() {
  const handleExploreProperties = () => {
    const element = document.getElementById("houses");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactUs = () => {
    window.open(marketing.agents[0].whatsapp, "_blank");
  };

  const highlights = [
    "FREE Biaya BPHTB, AJB & KPR",
    "Booking Fee Mulai Rp 1 Juta",
    "Bunga KPR 5.99% Fixed 1 Tahun",
  ];

  return (
    <section
      id="home"
      className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#07261C] text-white pt-12 pb-16 lg:py-20"
    >
      {/* Background Image & Tropical Forest Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Holland Village Sukabumi"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
        />
        {/* Multi-layered rich emerald & warm dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#051C14]/95 via-[#07261C]/80 to-[#07261C]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#051C14] via-transparent to-[#051C14]/40" />
      </div>

      {/* Decorative organic glow */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-12 right-12 w-80 h-80 bg-[#C58F4B]/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto pt-8 pb-12">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Headline & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Location & Concept Badge */}
            <div className="inline-flex flex-wrap items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs sm:text-sm font-medium text-emerald-100">
              <Trees size={16} className="text-[#E2B170]" />
              <span>Modern Tropical Living</span>
              <span className="opacity-40">•</span>
              <span className="inline-flex items-center gap-1 text-[#E2B170] font-semibold">
                <MapPin size={14} /> Sindangpalay, Kota Sukabumi
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-serif-display text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-bold leading-[1.12] tracking-tight text-white">
              Harmoni Hunian Modern &{" "}
              <span className="italic font-normal text-[#E2B170]">
                Keasrian Alam
              </span>{" "}
              Sukabumi
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-emerald-50/85 max-w-2xl leading-relaxed font-normal">
              Dikembangkan oleh{" "}
              <strong className="text-white font-semibold">
                {company.name}
              </strong>
              , {project.name} menghadirkan cluster eksklusif dengan 17,6% ruang
              terbuka hijau, sistem keamanan satu gerbang 24 jam, dan nilai
              investasi terbaik untuk masa depan keluarga Anda.
            </p>

            {/* Promo Highlights Pills */}
            <div className="flex flex-wrap gap-2.5 pt-1">
              {highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-emerald-950/70 border border-emerald-400/25 text-xs sm:text-sm text-emerald-100"
                >
                  <CheckCircle2 size={15} className="text-[#E2B170] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleExploreProperties}
                className="px-7 py-4 bg-[#C58F4B] hover:bg-[#B37D39] text-white rounded-xl font-semibold text-base flex items-center justify-center gap-2.5 shadow-lg shadow-black/25 transition-all cursor-pointer active:scale-95"
              >
                <span>Jelajahi Tipe Rumah</span>
                <ArrowRight size={19} />
              </button>

              <button
                onClick={handleContactUs}
                className="px-7 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/25 text-white rounded-xl font-semibold text-base flex items-center justify-center gap-2.5 transition-all cursor-pointer active:scale-95"
              >
                <PhoneCall size={18} className="text-[#E2B170]" />
                <span>Konsultasi & Jadwal Survey</span>
              </button>
            </div>
          </div>

          {/* Right Column: Featured Luxury Price & Quick Info Card */}
          <div className="lg:col-span-5">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#C58F4B] text-white text-[11px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl flex items-center gap-1.5">
                <Sparkles size={13} /> Penawaran Perdana
              </div>

              <p className="text-xs uppercase tracking-[0.2em] text-emerald-200 font-semibold mb-1">
                Harga Perdana Mulai Dari
              </p>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="font-serif-display text-4xl sm:text-5xl font-bold text-white">
                  Rp 419 Juta
                </span>
                <span className="text-xs text-emerald-200/80">
                  (Type 36/72)
                </span>
              </div>

              <p className="text-sm text-emerald-100/85 mb-6 pb-6 border-b border-white/15">
                Miliki rumah impian dengan lingkungan sejuk, jalan kawasan lebar,
                dan kemudahan skema bayar Cash Keras, Cash Bertahap, maupun KPR.
              </p>

              {/* 4 Key Stats Grid inside Card */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-emerald-950/50 border border-white/10 rounded-2xl p-4">
                  <p className="text-2xl font-bold text-[#E2B170]">21.638 m²</p>
                  <p className="text-xs text-emerald-100/80 mt-0.5">
                    Total Luas Kawasan
                  </p>
                </div>
                <div className="bg-emerald-950/50 border border-white/10 rounded-2xl p-4">
                  <p className="text-2xl font-bold text-[#E2B170]">135 Unit</p>
                  <p className="text-xs text-emerald-100/80 mt-0.5">
                    Hunian Eksklusif
                  </p>
                </div>
                <div className="bg-emerald-950/50 border border-white/10 rounded-2xl p-4">
                  <p className="text-2xl font-bold text-[#E2B170]">17,61%</p>
                  <p className="text-xs text-emerald-100/80 mt-0.5">
                    Ruang Terbuka Hijau
                  </p>
                </div>
                <div className="bg-emerald-950/50 border border-white/10 rounded-2xl p-4">
                  <p className="text-2xl font-bold text-[#E2B170]">All-In</p>
                  <p className="text-xs text-emerald-100/80 mt-0.5">
                    Mulai Rp 2,5 Juta
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-emerald-100/90 bg-emerald-900/60 px-4 py-3 rounded-xl border border-emerald-400/20">
                <span className="flex items-center gap-2">
                  <ShieldCheck size={16} className="text-[#E2B170]" />
                  Legalitas Terjamin & Bebas Banjir
                </span>
                <a
                  href="#pricing"
                  className="font-bold text-[#E2B170] hover:underline"
                >
                  Lihat Detail →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
