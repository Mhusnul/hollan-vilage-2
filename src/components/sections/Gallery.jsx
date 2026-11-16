import React, { useState } from "react";
import { useGalleryItems } from "../../utils/galleryFacilitiesService";
import SectionTitle from "../common/SectionTitle";
import { X, ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";

export default function Gallery() {
  const { gallery } = useGalleryItems();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [filter, setFilter] = useState("all");
  const [showMore, setShowMore] = useState(false);

  const categories = [
    { value: "all", label: "Semua Koleksi" },
    { value: "house", label: "Fasad Rumah" },
    { value: "floorplan", label: "Denah Ruang" },
    { value: "facility", label: "Fasilitas Kawasan" },
  ];

  const categoryLabels = {
    house: "Fasad Rumah",
    floorplan: "Denah Ruang",
    facility: "Fasilitas Kawasan",
  };

  const filteredGallery =
    filter === "all"
      ? gallery
      : gallery.filter((item) => item.category === filter);

  const displayedGallery =
    filter === "all" && !showMore
      ? filteredGallery.slice(0, 6)
      : filteredGallery;

  const selectedImage =
    selectedIndex !== null ? displayedGallery[selectedIndex] : null;

  const handlePrev = (e) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex(
        (selectedIndex - 1 + displayedGallery.length) % displayedGallery.length
      );
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % displayedGallery.length);
    }
  };

  return (
    <section id="gallery" className="py-20 md:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Galeri Visual"
          title="Potret Keindahan & Tata Ruang Kawasan"
          subtitle="Jelajahi detail fasad arsitektur modern tropis, tata ruang yang fungsional, serta keasrian fasilitas di Holland Village Sukabumi."
        />

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => {
                setFilter(cat.value);
                setShowMore(false);
                setSelectedIndex(null);
              }}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                filter === cat.value
                  ? "bg-emerald-900 text-white shadow-md shadow-emerald-950/15"
                  : "bg-white text-stone-700 border border-stone-200 hover:border-emerald-800/40 hover:text-emerald-950"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {displayedGallery.map((item, idx) => (
            <div
              key={item.id}
              className="group relative h-72 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-emerald-900/10 bg-white"
              onClick={() => setSelectedIndex(idx)}
            >
              <img
                src={item.image}
                alt={item.title}
                className={`w-full h-full group-hover:scale-108 transition-transform duration-700 ${
                  item.category === "floorplan"
                    ? "object-contain p-4 bg-white"
                    : "object-cover"
                }`}
              />
              {/* Category Pill */}
              <div className="absolute top-4 left-4 bg-[#07261C]/80 backdrop-blur-md text-emerald-100 text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                {categoryLabels[item.category] || item.category}
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#051C14]/90 via-[#051C14]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <h3 className="font-serif-display text-white font-bold text-xl">
                      {item.title}
                    </h3>
                    {item.description && (
                      <p className="text-emerald-100/85 text-xs mt-1 line-clamp-2">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#C58F4B] text-white flex items-center justify-center shrink-0">
                    <ZoomIn size={18} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More / Less Button */}
        {filter === "all" && filteredGallery.length > 6 && (
          <div className="text-center">
            <button
              onClick={() => setShowMore(!showMore)}
              className="px-8 py-3.5 bg-white border-2 border-emerald-900 text-emerald-950 hover:bg-emerald-900 hover:text-white rounded-xl font-semibold text-sm transition-all cursor-pointer shadow-sm"
            >
              {showMore
                ? "Tampilkan Lebih Sedikit"
                : `Lihat Semua Foto (${filteredGallery.length})`}
            </button>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in"
            onClick={() => setSelectedIndex(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#07261C] text-white">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#E2B170] font-bold">
                    {categoryLabels[selectedImage.category] ||
                      selectedImage.category}
                  </span>
                  <h3 className="font-serif-display text-lg sm:text-xl font-bold">
                    {selectedImage.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedIndex(null)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Image Container with Prev/Next */}
              <div className="relative bg-[#FAF8F5] flex items-center justify-center p-4 min-h-[320px] max-h-[72vh]">
                <button
                  onClick={handlePrev}
                  className="absolute left-4 z-10 w-10 h-10 rounded-full bg-[#07261C]/80 hover:bg-[#07261C] text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
                  aria-label="Previous"
                >
                  <ChevronLeft size={22} />
                </button>

                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="max-h-[65vh] w-auto object-contain rounded-xl"
                />

                <button
                  onClick={handleNext}
                  className="absolute right-4 z-10 w-10 h-10 rounded-full bg-[#07261C]/80 hover:bg-[#07261C] text-white flex items-center justify-center shadow-lg transition-transform active:scale-95"
                  aria-label="Next"
                >
                  <ChevronRight size={22} />
                </button>
              </div>

              {/* Footer Caption */}
              {selectedImage.description && (
                <div className="px-6 py-4 bg-white border-t border-stone-200 text-sm text-stone-600">
                  {selectedImage.description}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
