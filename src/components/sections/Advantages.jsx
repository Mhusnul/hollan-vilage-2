import React from "react";
import { advantages } from "../../data/config";
import SectionTitle from "../common/SectionTitle";
import { getIconComponent } from "../../utils/iconUtils";

export default function Advantages() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Keunggulan Lokasi"
          subtitle="Lokasi strategis dengan akses mudah ke berbagai fasilitas penting"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advantages.map((advantage) => {
            const IconComponent = getIconComponent(advantage.icon);
            return (
              <div
                key={advantage.id}
                className="bg-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-600"
              >
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    {IconComponent && (
                      <IconComponent size={24} className="text-blue-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {advantage.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {advantage.description}
                    </p>
                    <div className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
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
