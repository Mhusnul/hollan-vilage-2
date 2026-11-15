import React from "react";
import { facilities } from "../../data/config";
import SectionTitle from "../common/SectionTitle";
import { getIconComponent } from "../../utils/iconUtils";

export default function Facilities() {
  return (
    <section
      id="facilities"
      className="py-20 md:py-28 bg-[#F3EFE6]/60 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Fasilitas Internal Cluster"
          title="Kenyamanan Hidup Modern di Lingkungan Hijau"
          subtitle="Beragam fasilitas penunjang gaya hidup sehat, aman, dan harmonis yang dirancang eksklusif bagi seluruh penghuni Holland Village."
        />

        {/* All 6 Facilities Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {facilities.map((facility) => {
            const Icon = getIconComponent(facility.icon);

            return (
              <div
                key={facility.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-emerald-900/10 transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
              >
                {/* Image Wrapper */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07261C]/75 via-transparent to-transparent" />

                  {/* Floating Icon Badge */}
                  <div className="absolute bottom-4 left-5 flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-[#C58F4B] text-white flex items-center justify-center shadow-lg">
                      {Icon && <Icon size={20} />}
                    </div>
                    <h3 className="font-serif-display text-xl font-bold text-white drop-shadow">
                      {facility.name}
                    </h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {facility.description}
                  </p>
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-800">
                    <span>Fasilitas Penghuni</span>
                    <span className="text-[#C58F4B]">Eksklusif • 24/7</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
