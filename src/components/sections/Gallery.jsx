import React, { useState } from "react";
import { gallery } from "../../data/config";
import SectionTitle from "../common/SectionTitle";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState("all");

  const categories = [
    { value: "all", label: "Semua" },
    { value: "area", label: "Kawasan" },
    { value: "house", label: "Rumah" },
    { value: "facility", label: "Fasilitas" },
  ];

  const filteredGallery =
    filter === "all"
      ? gallery
      : gallery.filter((item) => item.category === filter);

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Galeri Foto"
          subtitle="Lihat keindahan dan fasilitas Holland Village melalui galeri foto kami"
        />

        {/* Filter */}
        <div className="flex justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                filter === cat.value
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="group relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedImage(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
                <h3 className="text-white font-bold text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-white text-2xl hover:scale-125 transition-transform"
              >
                ✕
              </button>
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto rounded-lg"
              />
              <p className="text-white text-center mt-4">
                {selectedImage.title}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
