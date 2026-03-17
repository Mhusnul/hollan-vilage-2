import React from "react";
import { facilities } from "../../data/config";
import SectionTitle from "../common/SectionTitle";
import { getIconComponent } from "../../utils/iconUtils";

export default function Facilities() {
  return (
    <section id="facilities" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Fasilitas Lengkap"
          subtitle="Kami menyediakan semua fasilitas yang Anda butuhkan untuk kenyamanan dan kesejahteraan hidup"
        />

        {/* Facilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {facilities.map((facility) => {
            const IconComponent = getIconComponent(facility.icon);
            return (
              <div
                key={facility.id}
                className="group bg-white border border-gray-300 rounded-xl overflow-hidden hover:shadow-lg hover:border-gray-900 transition-smooth"
              >
                {/* Image Section */}
                <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center overflow-hidden relative">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/40 transition-smooth" />
                </div>

                {/* Content Section */}
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-gray-100">
                      {IconComponent && (
                        <IconComponent size={20} className="text-black" />
                      )}
                    </div>
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-black transition-colors">
                      {facility.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {facility.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlights Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Security */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-smooth">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
              <span className="text-2xl">🔒</span>
            </div>
            <h4 className="text-base font-bold text-gray-900 mb-2">
              Keamanan Terbaik
            </h4>
            <p className="text-gray-700 leading-relaxed text-sm">
              Tim security profesional bertugas 24/7 menjaga keamanan dan
              kenyamanan seluruh penghuni dengan teknologi terkini
            </p>
          </div>

          {/* Green Space */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-smooth">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
              <span className="text-2xl">🌳</span>
            </div>
            <h4 className="text-base font-bold text-gray-900 mb-2">
              Lingkungan Hijau
            </h4>
            <p className="text-gray-700 leading-relaxed text-sm">
              Area hijau yang luas dengan taman-taman indah untuk kesehatan,
              relaksasi, dan keseimbangan hidup
            </p>
          </div>

          {/* Community */}
          <div className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-smooth">
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
              <span className="text-2xl">👥</span>
            </div>
            <h4 className="text-base font-bold text-gray-900 mb-2">
              Komunitas Aktif
            </h4>
            <p className="text-gray-700 leading-relaxed text-sm">
              Berbagai kegiatan komunitas dan acara sosial untuk membangun
              hubungan yang harmonis antar penghuni
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
