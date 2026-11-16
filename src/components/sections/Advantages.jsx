import React from "react";
import { advantages, project } from "../../data/config";
import SectionTitle from "../common/SectionTitle";
import { getIconComponent } from "../../utils/iconUtils";
import { MapPin, Navigation, Clock } from "lucide-react";

export default function Advantages() {
  return (
    <section
      id="advantages"
      className="py-20 md:py-28 bg-[#F3EFE6]/70 text-[#1C2826] relative overflow-hidden"
    >
      {/* Subtle Warm Ambient Accents */}
      <div className="absolute -top-24 right-10 w-96 h-96 bg-[#C58F4B]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-10 w-96 h-96 bg-stone-300/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          badge="Lokasi & Konektivitas"
          title="Strategis di Koridor Berkembang Kota Sukabumi"
          subtitle="Kemudahan mobilitas harian keluarga Anda dengan akses cepat menuju pusat pendidikan, fasilitas kesehatan, perbelanjaan, dan transportasi publik."
        />

        {/* Address Banner */}
        <div className="mb-12 bg-white border border-stone-200/80 shadow-md rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#C58F4B] text-white flex items-center justify-center shrink-0 shadow-sm">
              <MapPin size={22} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-[#9A6B2F] font-bold">
                Alamat Lokasi Kawasan
              </p>
              <p className="text-base sm:text-lg font-bold text-[#0F291E] mt-0.5">
                {project.fullAddress}
              </p>
            </div>
          </div>

          <a
            href={project.googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0F291E] text-white hover:bg-[#193E2F] font-semibold text-sm transition-all shrink-0 shadow-md"
          >
            <Navigation size={16} className="text-[#E2B170]" />
            <span>Buka di Google Maps</span>
          </a>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage) => {
            const IconComponent = getIconComponent(advantage.icon);
            return (
              <div
                key={advantage.id}
                className="group bg-white hover:bg-[#FAF8F5] rounded-2xl p-6 border border-stone-200/80 hover:border-[#C58F4B]/50 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-13 h-13 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {IconComponent && (
                        <IconComponent size={24} className="text-[#C58F4B]" />
                      )}
                    </div>

                    <span className="inline-flex items-center gap-1.5 bg-[#C58F4B]/12 border border-[#C58F4B]/30 text-[#9A6B2F] px-3.5 py-1 rounded-full text-xs font-bold tracking-wide">
                      <Clock size={12} />
                      {advantage.distance}
                    </span>
                  </div>

                  <h3 className="font-serif-display text-xl font-bold text-[#0F291E] mb-2 group-hover:text-[#9A6B2F] transition-colors">
                    {advantage.title}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
