import React from "react";
import {
  Building2,
  MapPin,
  CheckCircle2,
  Trees,
  Home,
  Compass,
  Award,
} from "lucide-react";
import { company, project } from "../../data/config";
import SectionTitle from "../common/SectionTitle";
import aboutImg1 from "../../assets/bg2.jpeg";
import aboutImg2 from "../../assets/fasilitas_taman.jpg";

export default function About() {
  return (
    <section
      id="about"
      className="py-20 md:py-28 bg-[#FAF8F5] relative overflow-hidden"
    >
      {/* Subtle Decorative Background Elements */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          badge="Tentang Pengembang & Kawasan"
          title="Menghadirkan Kehidupan Tropis yang Asri & Berkelas"
          subtitle="Komitmen PT. Puspa Agra Properti dalam merancang lingkungan hunian modern yang menyatu dengan kesejukan alam Kota Sukabumi."
        />

        {/* Editorial Split Layout */}
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center mt-12">
          {/* Left: Layered Visual Collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
              <img
                src={aboutImg1}
                alt={project.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07261C]/70 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="inline-block px-3 py-1 rounded-full bg-[#C58F4B] text-white text-xs font-bold uppercase tracking-wider mb-2">
                  Masterpiece Sukabumi
                </span>
                <p className="font-serif-display text-xl sm:text-2xl font-semibold">
                  {project.name}
                </p>
              </div>
            </div>

            {/* Secondary Floating Image & Badge */}
            <div className="hidden sm:flex items-center gap-4 bg-white p-4 rounded-2xl shadow-xl border border-emerald-900/10 max-w-xs absolute -bottom-8 right-6">
              <img
                src={aboutImg2}
                alt="Taman Hijau"
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Green Living Concept
                </p>
                <p className="text-sm font-semibold text-stone-800 leading-snug mt-0.5">
                  3.810 m² Area Taman & Ruang Terbuka Hijau
                </p>
              </div>
            </div>
          </div>

          {/* Right: Developer Story, Vision & Mission */}
          <div className="lg:col-span-6 space-y-8 pt-4 sm:pt-6 lg:pt-0">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-xl bg-[#F3EFE6] border border-stone-300/70">
              <Building2 size={20} className="text-emerald-800" />
              <div>
                <p className="text-xs text-stone-500 font-medium">
                  Dikembangkan Oleh
                </p>
                <p className="text-sm font-bold text-[#0F291E] tracking-wide">
                  {company.name}
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#0F291E] mb-4">
                Hunian Ideal untuk Kenyamanan Keluarga & Investasi Masa Depan
              </h3>
              <p className="text-stone-600 leading-relaxed mb-4">
                {company.description}
              </p>
              <p className="text-stone-600 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Vision & Mission Card */}
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-emerald-900/10 shadow-sm space-y-5">
              <div>
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-widest mb-2">
                  <Award size={16} className="text-[#C58F4B]" />
                  <span>Visi Kami</span>
                </div>
                <p className="text-[#0F291E] font-medium italic">
                  "{company.vision}"
                </p>
              </div>

              <div className="border-t border-stone-200/80 pt-4">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-800 mb-3">
                  Misi Utama
                </p>
                <div className="grid sm:grid-cols-2 gap-3">
                  {company.mission.map((item, index) => (
                    <div key={index} className="flex items-start gap-2.5">
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 text-emerald-700 shrink-0"
                      />
                      <span className="text-sm text-stone-700 leading-snug">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Project Overview Bento Strip */}
        <div className="mt-20 bg-forest-gradient text-white rounded-3xl p-8 sm:p-10 lg:p-12 shadow-xl relative overflow-hidden">
          <div className="absolute -right-16 -bottom-16 w-72 h-72 bg-[#C58F4B]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-4 space-y-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E2B170]">
                Profil Kawasan
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-white">
                {project.name}
              </h3>
              <p className="text-sm text-emerald-100/80">
                Dirancang dengan tata ruang terpadu yang menyeimbangkan privasi,
                keamanan, dan ruang hijau terbuka.
              </p>
            </div>

            <div className="lg:col-span-8 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5">
                <Compass size={22} className="text-[#E2B170] mb-3" />
                <p className="text-xs text-emerald-200 uppercase tracking-wider">
                  Luas Lahan
                </p>
                <p className="text-xl font-bold text-white mt-1">
                  {project.areaSize}
                </p>
                <p className="text-xs text-emerald-100/70 mt-1">
                  Kawasan Terpadu
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5">
                <Home size={22} className="text-[#E2B170] mb-3" />
                <p className="text-xs text-emerald-200 uppercase tracking-wider">
                  Total Hunian
                </p>
                <p className="text-xl font-bold text-white mt-1">
                  {project.totalUnits} Unit
                </p>
                <p className="text-xs text-emerald-100/70 mt-1">
                  Blok A s/d Blok L
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5">
                <Trees size={22} className="text-[#E2B170] mb-3" />
                <p className="text-xs text-emerald-200 uppercase tracking-wider">
                  Area Hijau (RTH)
                </p>
                <p className="text-xl font-bold text-white mt-1">17,61%</p>
                <p className="text-xs text-emerald-100/70 mt-1">
                  3.810,41 m² Taman
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-5">
                <MapPin size={22} className="text-[#E2B170] mb-3" />
                <p className="text-xs text-emerald-200 uppercase tracking-wider">
                  Lokasi Utama
                </p>
                <p className="text-base font-bold text-white mt-1 leading-snug">
                  Sindangpalay
                </p>
                <p className="text-xs text-emerald-100/70 mt-1">
                  Cibeureum, Kota Sukabumi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
