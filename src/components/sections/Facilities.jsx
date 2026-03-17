import React from "react";
import { facilities } from "../../data/config";
import SectionTitle from "../common/SectionTitle";
import { getIconComponent } from "../../utils/iconUtils";

export default function Facilities() {
  return (
    <section id="facilities" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Fasilitas Lengkap"
          subtitle="Kami menyediakan semua fasilitas yang Anda butuhkan untuk kenyamanan hidup"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {facilities.map((facility) => {
            const IconComponent = getIconComponent(facility.icon);
            return (
              <div
                key={facility.id}
                className="group bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                {/* Icon/Image */}
                <div className="h-32 bg-linear-to-br from-blue-400 to-indigo-600 flex items-center justify-center overflow-hidden relative">
                  <img
                    src={facility.image}
                    alt={facility.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"></div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-7 h-7 flex items-center justify-center">
                      {IconComponent && (
                        <IconComponent size={24} className="text-blue-600" />
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">
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

        {/* Highlights */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-linear-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
            <h4 className="text-xl font-bold text-gray-900 mb-2">
              Keamanan Terbaik
            </h4>
            <p className="text-gray-700">
              Tim security profesional bertugas 24/7 menjaga keamanan dan
              kenyamanan seluruh penghuni
            </p>
          </div>

          <div className="bg-linear-to-br from-green-50 to-green-100 rounded-lg p-6 border border-green-200">
            <h4 className="text-xl font-bold text-gray-900 mb-2">
              Lingkungan Hijau
            </h4>
            <p className="text-gray-700">
              Area hijau yang luas dengan taman-taman indah untuk kesehatan dan
              keseimbangan hidup
            </p>
          </div>

          <div className="bg-linear-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
            <h4 className="text-xl font-bold text-gray-900 mb-2">
              Komunitas Aktif
            </h4>
            <p className="text-gray-700">
              Berbagai kegiatan komunitas dan acara sosial untuk membangun
              hubungan antar penghuni
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
