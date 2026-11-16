import React, { useState } from "react";
import { denahPerumahan } from "../../data/config";
import { useUnitBlocks } from "../../utils/unitBlocksService";
import SectionTitle from "../common/SectionTitle";
import {
  Map,
  Trees,
  ExternalLink,
  ZoomIn,
  X,
  Compass,
  Building,
} from "lucide-react";

export default function Denah() {
  const { unitBlocks } = useUnitBlocks();
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [selectedTypeFilter, setSelectedTypeFilter] = useState("ALL");

  const typeFilters = ["ALL", "60/116", "60/96", "45/72", "36/72"];

  const filteredUnits =
    selectedTypeFilter === "ALL"
      ? unitBlocks
      : unitBlocks.filter((u) => u.landArea === selectedTypeFilter);

  const totalCapacity = unitBlocks.reduce((sum, u) => sum + (u.unit || 0), 0);
  const totalAvailable = unitBlocks.reduce(
    (sum, u) => sum + (u.availableUnits ?? u.unit ?? 0),
    0
  );

  return (
    <section
      id="denah"
      className="py-20 md:py-28 bg-[#FAF8F5] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Masterplan & Siteplan"
          title="Tata Ruang Kawasan yang Terencana & Asri"
          subtitle="Dirancang secara proporsional di atas lahan seluas 21.638 m² untuk memaksimalkan sirkulasi udara, akses jalan lebar, dan ruang terbuka hijau."
        />

        {/* Top Masterplan Showcase */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
          {/* Masterplan Image Card */}
          <div className="lg:col-span-7">
            <div
              onClick={() => setIsZoomOpen(true)}
              className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white group cursor-pointer"
            >
              <img
                src={denahPerumahan.image}
                alt={denahPerumahan.title}
                className="w-full h-auto object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#07261C]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-6">
                <span className="text-white font-semibold text-sm">
                  Klik untuk memperbesar Siteplan
                </span>
              </div>
              <button
                type="button"
                className="absolute bottom-4 right-4 bg-[#07261C]/90 hover:bg-[#07261C] text-white px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-lg"
              >
                <ZoomIn size={15} className="text-[#E2B170]" />
                <span>Perbesar Siteplan</span>
              </button>
            </div>
          </div>

          {/* Masterplan Highlights */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-900/8 px-3.5 py-1.5 rounded-full">
              <Compass size={14} className="text-[#C58F4B]" />
              <span>Harmoni Tata Lahan</span>
            </div>

            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#0F291E]">
              {denahPerumahan.title}
            </h3>

            <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
              Masterplan Holland Village Sukabumi menempatkan kenyamanan warga
              sebagai prioritas utama. Setiap blok memiliki akses langsung ke
              jalan lingkungan yang lega, berpadu dengan area taman hijau dan
              fasilitas ibadah di jantung kawasan.
            </p>

            {/* Key Ratio Cards */}
            <div className="grid grid-cols-2 gap-3.5">
              <div className="bg-white p-4 rounded-2xl border border-emerald-900/10 shadow-sm">
                <p className="text-xs text-stone-500 font-medium">
                  Total Luas Kawasan
                </p>
                <p className="text-xl font-bold text-[#0F291E] mt-1">
                  21.638 m²
                </p>
                <p className="text-[11px] text-emerald-800 font-semibold mt-0.5">
                  100% Terintegrasi
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-emerald-900/10 shadow-sm">
                <p className="text-xs text-stone-500 font-medium">
                  Efektif Kaveling
                </p>
                <p className="text-xl font-bold text-[#0F291E] mt-1">54,88%</p>
                <p className="text-[11px] text-emerald-800 font-semibold mt-0.5">
                  11.876,30 m² Hunian
                </p>
              </div>

              <div className="bg-emerald-900 text-white p-4 rounded-2xl shadow-md">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-emerald-200 font-medium">
                    Ruang Terbuka Hijau
                  </p>
                  <Trees size={16} className="text-[#E2B170]" />
                </div>
                <p className="text-xl font-bold text-white mt-1">17,61%</p>
                <p className="text-[11px] text-emerald-100/80 mt-0.5">
                  3.810,41 m² Area Asri
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-emerald-900/10 shadow-sm">
                <p className="text-xs text-stone-500 font-medium">
                  Sirkulasi & Jalan
                </p>
                <p className="text-xl font-bold text-[#0F291E] mt-1">26,26%</p>
                <p className="text-[11px] text-emerald-800 font-semibold mt-0.5">
                  5.682,95 m² Akses
                </p>
              </div>
            </div>

            {/* High-Res Google Drive Link */}
            <div className="pt-2">
              <a
                href="https://drive.google.com/file/d/1HTeEKnbsQQy97vLdI-rp2kuPBURNv-vB/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto bg-[#C58F4B] hover:bg-[#B07B38] text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg text-sm"
              >
                <ExternalLink size={17} />
                <span>Unduh Denah Resolusi Tinggi (Google Drive)</span>
              </a>
            </div>
          </div>
        </div>

        {/* Two Column Detailed Tables */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left: Land Use Breakdown with Visual Progress Bars */}
          <div className="lg:col-span-5 bg-white rounded-3xl shadow-md border border-emerald-900/10 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <Map size={20} className="text-emerald-800" />
                <h3 className="font-serif-display text-2xl font-bold text-[#0F291E]">
                  Komposisi Lahan
                </h3>
              </div>
              <p className="text-xs text-stone-500 mb-6">
                Rincian alokasi penggunaan lahan perumahan secara transparan
              </p>

              <div className="space-y-4">
                {denahPerumahan.landUseBreakdown.map((item) => {
                  const pct = parseFloat(item.percentage);
                  return (
                    <div
                      key={item.no}
                      className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-stone-200/70"
                    >
                      <div className="flex justify-between items-center text-sm mb-1.5">
                        <span className="font-semibold text-[#0F291E]">
                          {item.no}. {item.name}
                        </span>
                        <span className="font-bold text-emerald-900">
                          {item.percentage}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-stone-200 rounded-full overflow-hidden mb-1.5">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-800 to-[#C58F4B] rounded-full"
                          style={{ width: `${Math.max(pct, 3)}%` }}
                        />
                      </div>
                      <p className="text-xs text-stone-500 text-right">
                        Luas: <strong>{item.area} m²</strong>
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between bg-emerald-950 text-white px-5 py-4 rounded-2xl">
              <div>
                <p className="text-xs text-emerald-200 uppercase tracking-wider">
                  Total Keseluruhan
                </p>
                <p className="text-lg font-bold">
                  {denahPerumahan.totalArea} m²
                </p>
              </div>
              <span className="text-xl font-bold text-[#E2B170]">
                {denahPerumahan.totalPercentage}%
              </span>
            </div>
          </div>

          {/* Right: Block & Unit Distribution Table */}
          <div className="lg:col-span-7 bg-white rounded-3xl shadow-md border border-emerald-900/10 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="flex items-center gap-2.5">
                    <Building size={20} className="text-emerald-800" />
                    <h3 className="font-serif-display text-2xl font-bold text-[#0F291E]">
                      Distribusi Blok & Unit
                    </h3>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    Sebaran tipe hunian dari Blok A hingga Blok L
                  </p>
                </div>

                {/* Filter Pills by Type */}
                <div className="flex flex-wrap gap-1.5">
                  {typeFilters.map((tf) => (
                    <button
                      key={tf}
                      onClick={() => setSelectedTypeFilter(tf)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                        selectedTypeFilter === tf
                          ? "bg-emerald-900 text-white"
                          : "bg-[#F3EFE6] text-stone-700 hover:bg-emerald-900/10"
                      }`}
                    >
                      {tf === "ALL" ? "Semua Tipe" : `Tipe ${tf}`}
                    </button>
                  ))}
                </div>
              </div>

              <div className="overflow-x-auto max-h-[420px] overflow-y-auto rounded-2xl border border-stone-200">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#07261C] text-white sticky top-0 z-10">
                      <th className="px-4 py-3.5 text-left font-semibold text-xs uppercase tracking-wider">
                        No
                      </th>
                      <th className="px-4 py-3.5 text-left font-semibold text-xs uppercase tracking-wider">
                        Blok
                      </th>
                      <th className="px-4 py-3.5 text-left font-semibold text-xs uppercase tracking-wider">
                        Tipe (LB/LT)
                      </th>
                      <th className="px-4 py-3.5 text-center font-semibold text-xs uppercase tracking-wider">
                        Tersedia / Total
                      </th>
                      <th className="px-4 py-3.5 text-right font-semibold text-xs uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200/80">
                    {filteredUnits.map((unit, idx) => (
                      <tr
                        key={unit.id || unit.no || idx}
                        className="hover:bg-emerald-900/4 transition-colors"
                      >
                        <td className="px-4 py-3 text-stone-500">
                          {idx + 1}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-emerald-900/10 text-emerald-950 font-bold text-xs">
                            {unit.block}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-semibold text-[#0F291E]">
                          Type {unit.landArea}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className="px-2.5 py-1 rounded-full bg-[#F3EFE6] text-stone-800 font-semibold text-xs">
                            {unit.availableUnits ?? unit.unit} / {unit.unit} Unit
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right font-medium">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold ${
                              unit.status === "Sold Out"
                                ? "bg-red-100 text-red-700"
                                : unit.status === "Terbatas"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-emerald-100 text-emerald-800"
                            }`}
                          >
                            {unit.status || "Tersedia"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-200 flex flex-wrap items-center justify-between gap-2 text-sm text-stone-600">
              <span>
                Menampilkan <strong>{filteredUnits.length}</strong> kelompok blok
              </span>
              <span className="font-bold text-emerald-950">
                Tersedia {totalAvailable} dari {totalCapacity} Unit Eksklusif
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Masterplan Lightbox Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
          onClick={() => setIsZoomOpen(false)}
        >
          <div
            className="relative max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 bg-[#07261C] text-white">
              <h4 className="font-serif-display text-lg font-semibold">
                {denahPerumahan.title}
              </h4>
              <button
                onClick={() => setIsZoomOpen(false)}
                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 bg-[#FAF8F5] max-h-[82vh] overflow-auto flex justify-center">
              <img
                src={denahPerumahan.image}
                alt={denahPerumahan.title}
                className="max-h-[75vh] w-auto object-contain rounded-xl"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
