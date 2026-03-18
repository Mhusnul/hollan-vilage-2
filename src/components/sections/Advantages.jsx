import React from "react";
import { advantages } from "../../data/config";
import SectionTitle from "../common/SectionTitle";
import { getIconComponent } from "../../utils/iconUtils";

export default function Advantages() {
  return (
    <section id="advantages" className="py-12 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Keunggulan Lokasi"
          subtitle="Lokasi strategis dengan akses mudah ke berbagai fasilitas penting di sekitar perumahan"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage) => {
            const IconComponent = getIconComponent(advantage.icon);
            return (
              <div
                key={advantage.id}
                className="group bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-smooth border border-gray-300 hover:border-gray-900"
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="shrink-0 w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-smooth">
                    {IconComponent && (
                      <IconComponent size={28} className="text-black" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-black transition-colors">
                      {advantage.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                      {advantage.description}
                    </p>
                    <div className="inline-block bg-gray-100 text-gray-900 px-3 py-1 rounded-full text-xs font-semibold border border-gray-300">
                      {advantage.distance}
                    </div>
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
