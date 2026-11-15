import React from "react";
import { advantages, project } from "../../data/config";
import SectionTitle from "../common/SectionTitle";
import { getIconComponent } from "../../utils/iconUtils";
import { MapPin, Navigation, Clock } from "lucide-react";

export default function Advantages() {
  return (
    <section
      id="advantages"
      className="py-20 md:py-28 bg-forest-gradient text-white relative overflow-hidden"
    >
      {/* Decorative Ambient Glows */}
      <div className="absolute -top-24 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-10 w-96 h-96 bg-[#C58F4B]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionTitle
          light={true}
          badge="Lokasi & Konektivitas"
          title="Strategis di Koridor Berkembang Kota Sukabumi"
          subtitle="Kemudahan mobilitas harian keluarga Anda dengan akses cepat menuju pusat pendidikan, fasilitas kesehatan, perbelanjaan, dan transportasi publik."
        />

        {/* Address Banner */}
        <div className="mb-12 bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-[#C58F4B] text-white flex items-center justify-center shrink-0">
              <MapPin size={22} />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-emerald-200 font-semibold">
                Alamat Lokasi Kawasan
              </p>
              <p className="text-base sm:text-lg font-bold text-white mt-0.5">
                {project.fullAddress}
              </p>
            </div>
          </div>

          <a
            href={project.googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-[#0F291E] hover:bg-[#F3EFE6] font-semibold text-sm transition-all shrink-0 shadow-md"
          >
            <Navigation size={16} className="text-emerald-800" />
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
                className="group bg-white/8 hover:bg-white/14 backdrop-blur-md rounded-2xl p-6 border border-white/12 hover:border-[#E2B170]/50 transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-13 h-13 rounded-2xl bg-emerald-950/80 border border-emerald-400/25 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {IconComponent && (
                        <IconComponent size={24} className="text-[#E2B170]" />
                      )}
                    </div>

                    <span className="inline-flex items-center gap-1.5 bg-[#C58F4B]/20 border border-[#E2B170]/40 text-[#E2B170] px-3.5 py-1 rounded-full text-xs font-bold tracking-wide">
                      <Clock size={12} />
                      {advantage.distance}
                    </span>
                  </div>

                  <h3 className="font-serif-display text-xl font-bold text-white mb-2 group-hover:text-[#E2B170] transition-colors">
                    {advantage.title}
                  </h3>
                  <p className="text-emerald-100/80 text-sm leading-relaxed">
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
