import React, { useState } from "react";
import { houseTypes } from "../../data/config";
import SectionTitle from "../common/SectionTitle";
import Card from "../common/Card";

export default function HouseTypes() {
  const [selectedType, setSelectedType] = useState(null);

  return (
    <section id="houses" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Tipe Rumah Pilihan"
          subtitle="Berbagai pilihan tipe rumah dengan desain modern untuk kebutuhan Anda"
        />

        {/* House Type Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
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

        {/* Detail View */}
        {selectedType && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-3xl w-full max-h-96 overflow-y-auto">
              <div className="sticky top-0 flex justify-between items-center p-6 border-b bg-white">
                <h3 className="text-2xl font-bold text-gray-900">
                  {selectedType.name}
                </h3>
                <button
                  onClick={() => setSelectedType(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Info */}
                  <div className="space-y-4">
                    <div>
                      <p className="text-gray-600 text-sm">HARGA MULAI DARI</p>
                      <p className="text-3xl font-bold text-blue-600">
                        {selectedType.priceStartFrom}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-gray-600 text-sm">LUAS TANAH</p>
                        <p className="font-bold text-gray-900">
                          {selectedType.landArea}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">LUAS BANGUNAN</p>
                        <p className="font-bold text-gray-900">
                          {selectedType.buildingArea}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">KAMAR TIDUR</p>
                        <p className="font-bold text-gray-900">
                          {selectedType.bedroom}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600 text-sm">KAMAR MANDI</p>
                        <p className="font-bold text-gray-900">
                          {selectedType.bathroom}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-gray-600 text-sm mb-2">SPESIFIKASI</p>
                      <ul className="space-y-2">
                        {selectedType.specification.map((spec, index) => (
                          <li
                            key={index}
                            className="flex gap-2 text-gray-700 text-sm"
                          >
                            <span className="text-blue-600">✓</span>
                            <span>{spec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Images */}
                  <div className="space-y-4">
                    <div className="rounded-lg overflow-hidden h-48">
                      <img
                        src={selectedType.image}
                        alt={selectedType.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="rounded-lg overflow-hidden h-48">
                      <img
                        src={selectedType.floorPlan}
                        alt="Floor Plan"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 flex gap-4 p-6 border-t bg-white">
                <button
                  onClick={() => setSelectedType(null)}
                  className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-900 rounded-lg font-semibold hover:bg-gray-50"
                >
                  Tutup
                </button>
                <button className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700">
                  Hubungi Agen
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
