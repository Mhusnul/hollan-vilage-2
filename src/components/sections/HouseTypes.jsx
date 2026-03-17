import React, { useState } from "react";
import { houseTypes } from "../../data/config";
import SectionTitle from "../common/SectionTitle";
import Card from "../common/Card";
import Button from "../common/Button";

export default function HouseTypes() {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <section id="houses" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Tipe Rumah Pilihan"
          subtitle="Berbagai pilihan tipe rumah dengan desain modern untuk setiap kebutuhan dan budget Anda"
        />

        {/* House Type Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {houseTypes.map((house) => (
            <Card
              key={house.id}
              image={house.image}
              title={house.name}
              price={house.priceStartFrom}
              specs={[
                `Tanah: ${house.landArea}`,
                `Bangunan: ${house.buildingArea}`,
                `${house.bedroom} Kamar Tidur`,
                `${house.bathroom} Kamar Mandi`,
              ]}
              onDetailsClick={() => setSelectedType(house)}
            />
          ))}
        </div>

        {/* Detail Modal */}
        {selectedType && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
              {/* Header */}
              <div className="sticky top-0 flex justify-between items-center p-6 border-b border-gray-200 bg-white rounded-t-2xl">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900">
                    {selectedType.name}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    Mulai dari {selectedType.priceStartFrom}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedType(null)}
                  className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center transition-smooth"
                  aria-label="Close"
                >
                  <svg
                    className="w-6 h-6 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* Left: Details */}
                  <div className="space-y-8">
                    {/* Price */}
                    <div className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6">
                      <p className="text-gray-700 text-sm font-semibold uppercase tracking-wider mb-2">
                        Harga Mulai Dari
                      </p>
                      <p className="text-4xl font-bold text-black">
                        {selectedType.priceStartFrom}
                      </p>
                    </div>

                    {/* Specs Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider mb-2">
                          Luas Tanah
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {selectedType.landArea}
                        </p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider mb-2">
                          Luas Bangunan
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {selectedType.buildingArea}
                        </p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider mb-2">
                          Kamar Tidur
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {selectedType.bedroom}
                        </p>
                      </div>
                      <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-gray-600 text-xs font-semibold uppercase tracking-wider mb-2">
                          Kamar Mandi
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {selectedType.bathroom}
                        </p>
                      </div>
                    </div>

                    {/* Specifications */}
                    <div>
                      <h4 className="text-lg font-bold text-gray-900 mb-4">
                        Spesifikasi
                      </h4>
                      <ul className="space-y-3">
                        {selectedType.specification.map((spec, index) => (
                          <li key={index} className="flex gap-3 text-gray-700">
                            <span className="text-black font-bold mt-0.5">
                              ✓
                            </span>
                            <span className="leading-relaxed">{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right: Images */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-3">
                        Foto Unit
                      </p>
                      <div className="rounded-xl overflow-hidden h-64 shadow-md">
                        <img
                          src={selectedType.image}
                          alt={selectedType.name}
                          className="w-full h-full object-cover hover:scale-105 transition-smooth"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 mb-3">
                        Denah Lantai
                      </p>
                      <div className="rounded-xl overflow-hidden h-64 shadow-md bg-slate-100">
                        <img
                          src={selectedType.floorPlan}
                          alt="Floor Plan"
                          className="w-full h-full object-cover hover:scale-105 transition-smooth"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 flex gap-3 p-6 border-t border-slate-200 bg-white rounded-b-2xl">
                <Button
                  onClick={() => setSelectedType(null)}
                  variant="secondary"
                  size="lg"
                  className="flex-1"
                >
                  Tutup
                </Button>
                <Button variant="primary" size="lg" className="flex-1">
                  Hubungi Agen
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
