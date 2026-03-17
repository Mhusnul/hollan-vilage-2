import React from "react";
import { facilities } from "../../data/config";
import SectionTitle from "../common/SectionTitle";
import { getIconComponent } from "../../utils/iconUtils";

export default function Facilities() {
  const mainFacilities = facilities.slice(0, 3);
  const otherFacilities = facilities.slice(3);

  return (
    <section id="facilities" className="py-4 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Fasilitas"
          subtitle="Dirancang untuk kenyamanan, keamanan, dan kualitas hidup terbaik"
        />
        {/* SECONDARY LIST (MINIMAL) */}
        <div className="mt-5">
          <div className="flex flex-wrap justify-center gap-3">
            {otherFacilities.map((facility) => {
              const Icon = getIconComponent(facility.icon);

              return (
                <div
                  key={facility.id}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-gray-100 transition"
                >
                  {Icon && <Icon size={16} />}
                  {facility.name}
                </div>
              );
            })}
          </div>
        </div>
        {/* MAIN HIGHLIGHT (BIG IMAGE) */}
        <div className="grid lg:grid-cols-3 gap-6 mt-16">
          {mainFacilities.map((facility) => {
            const Icon = getIconComponent(facility.icon);

            return (
              <div
                key={facility.id}
                className="relative group rounded-2xl overflow-hidden h-[300px]"
              >
                <img
                  src={facility.image}
                  alt={facility.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />

                {/* Content */}
                <div className="absolute bottom-0 p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    {Icon && <Icon size={20} />}
                    <h3 className="text-lg font-semibold">{facility.name}</h3>
                  </div>
                  <p className="text-sm text-gray-200 line-clamp-2">
                    {facility.description}
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
