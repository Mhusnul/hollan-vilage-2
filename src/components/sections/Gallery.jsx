import React, { useState } from "react";
import { gallery } from "../../data/config";
import SectionTitle from "../common/SectionTitle";
import { X } from "lucide-react";

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [filter, setFilter] = useState("all");
  const [showMore, setShowMore] = useState(false);

  const categories = [
    { value: "all", label: "Semua" },
    { value: "house", label: "Tipe Rumah" },
    { value: "floorplan", label: "Denah" },
    { value: "facility", label: "Fasilitas" },
  ];

  const filteredGallery =
    filter === "all"
      ? gallery
      : gallery.filter((item) => item.category === filter);

  // Show only 6 items for "all" filter, show all for other filters
  const displayedGallery =
    filter === "all" && !showMore
      ? filteredGallery.slice(0, 6)
      : filteredGallery;

  return (
    <section id="gallery" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Galeri Foto"
          subtitle="Lihat keindahan dan fasilitas Holland Village melalui koleksi foto eksklusif kami"
        />

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setFilter(cat.value);
                setShowMore(false);
              }}
              className={`px-6 py-2 rounded-full font-semibold transition-smooth ${
                filter === cat.value
                  ? "bg-black text-white shadow-md"
                  : "bg-white text-gray-700 border border-gray-300 hover:border-gray-900 hover:text-black"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {displayedGallery.map((item) => (
            <div
              key={item.id}
              className="group relative h-64 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-smooth cursor-pointer border border-gray-300"
              onClick={() => setSelectedImage(item)}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-end p-4">
                <h3 className="text-white font-bold text-lg">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {filter === "all" && filteredGallery.length > 6 && !showMore && (
          <div className="text-center mb-8">
            <button
              onClick={() => setShowMore(true)}
              className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition-smooth"
            >
              Lihat Lebih Banyak
            </button>
          </div>
        )}

        {/* Empty State */}
        {filteredGallery.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Tidak ada foto dalam kategori ini
            </p>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-10 right-0 text-white hover:text-slate-300 transition-colors z-10"
                aria-label="Close"
              >
                <X size={32} />
              </button>

              {/* Image Container */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative bg-black">
                  <img
                    src={selectedImage.image}
                    alt={selectedImage.title}
                    className="w-full h-auto max-h-96 object-contain"
                  />
                </div>

                {/* Title & Description */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {selectedImage.title}
                  </h3>
                  {selectedImage.description && (
                    <p className="text-gray-600 leading-relaxed">
                      {selectedImage.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
