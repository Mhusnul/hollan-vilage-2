import React from "react";
import { useHouseTypes } from "../../utils/houseTypesService";
import { usePricingSettings } from "../../utils/pricingService";
import { useMarketingSettings } from "../../utils/marketingService";
import SectionTitle from "../common/SectionTitle";
import {
  CheckCircle2,
  Sparkles,
  FileCheck2,
  CreditCard,
  PhoneCall,
  AlertCircle,
  Landmark,
} from "lucide-react";

export default function Pricing() {
  const { houseTypes } = useHouseTypes();
  const { pricingSettings: pricing } = usePricingSettings();
  const { marketing } = useMarketingSettings();

  const handleContactForPromo = () => {
    const text = encodeURIComponent(
      "Halo Marketing Holland Village Sukabumi, saya ingin menanyakan detail Promo Free Biaya BPHTB/AJB/KPR dan simulasi cicilan KPR."
    );
    window.open(`${marketing.agents[0].whatsapp}?text=${text}`, "_blank");
  };

  return (
    <section
      id="pricing"
      className="py-20 md:py-28 bg-[#F3EFE6]/70 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Penawaran & Skema Pembayaran"
          title="Investasi Cerdas dengan Kemudahan Kepemilikan"
          subtitle="Nikmati penawaran spesial dengan bebas biaya surat-surat utama dan pilihan skema pembayaran yang fleksibel sesuai kebutuhan Anda."
        />

        {/* Hero Promo & Starting Price Banner */}
        <div className="bg-forest-gradient text-white rounded-3xl shadow-xl p-8 sm:p-10 lg:p-12 mb-12 relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-[#C58F4B]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#C58F4B] text-white text-xs font-bold uppercase tracking-widest">
                <Sparkles size={14} /> Promo Spesial Terbatas
              </div>

              <h3 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                Wujudkan Rumah Impian Mulai{" "}
                <span className="text-[#E2B170]">{pricing.startingPrice}</span>
              </h3>

              <p className="text-emerald-100/85 text-sm sm:text-base max-w-xl">
                Cukup dengan Booking Fee mulai{" "}
                <strong className="text-white">{pricing.bookingFeeStart}</strong>{" "}
                dan Biaya All-In mulai{" "}
                <strong className="text-white">{pricing.allInStart}</strong>,
                Anda sudah bebas dari berbagai biaya administrasi utama!
              </p>

              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {pricing.promo.map((promoItem, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2.5 bg-white/10 backdrop-blur-sm border border-white/15 px-4 py-3 rounded-xl"
                  >
                    <CheckCircle2
                      size={18}
                      className="text-[#E2B170] shrink-0"
                    />
                    <span className="text-sm font-bold text-white">
                      {promoItem}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-7 space-y-5">
              <div>
                <p className="text-xs uppercase tracking-widest text-emerald-200 font-semibold">
                  Ringkasan Kemudahan
                </p>
                <h4 className="font-serif-display text-2xl font-bold text-white mt-1">
                  Keuntungan Beli Sekarang
                </h4>
              </div>

              <div className="space-y-3 text-sm border-y border-white/15 py-4">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-100/80">Booking Fee</span>
                  <span className="font-bold text-[#E2B170]">
                    Mulai {pricing.bookingFeeStart}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-100/80">Biaya All-In</span>
                  <span className="font-bold text-[#E2B170]">
                    Mulai {pricing.allInStart}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-100/80">DP KPR Minimal</span>
                  <span className="font-bold text-white">
                    {pricing.minimalDP}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-100/80">Suku Bunga KPR</span>
                  <span className="font-bold text-white">
                    {pricing.kprInterestRate}
                  </span>
                </div>
              </div>

              <button
                onClick={handleContactForPromo}
                className="w-full py-4 px-6 rounded-xl bg-[#C58F4B] hover:bg-[#B07B38] text-white font-semibold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-95"
              >
                <PhoneCall size={18} />
                <span>Klaim Promo & Hitung Simulasi KPR</span>
              </button>
            </div>
          </div>
        </div>

        {/* 3 Payment Schemes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {pricing.paymentScheme.map((scheme, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-md border border-emerald-900/10 flex flex-col justify-between hover:shadow-lg transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-900/10 text-emerald-900 flex items-center justify-center">
                    <CreditCard size={20} />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#F3EFE6] text-emerald-950 font-bold text-xs">
                    {scheme.discount}
                  </span>
                </div>
                <h3 className="font-serif-display text-xl font-bold text-[#0F291E] mb-2">
                  Skema {scheme.type}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed">
                  {scheme.description}
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500">
                <span>Proses Mudah & Transparan</span>
                <span className="font-bold text-emerald-800">Tersedia ✓</span>
              </div>
            </div>
          ))}
        </div>

        {/* Complete Comparison Table (Fixed Luas Bangunan & Luas Tanah!) */}
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden border border-emerald-900/10 mb-12">
          <div className="bg-[#07261C] text-white px-6 sm:px-8 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#E2B170] font-bold">
                Tabel Perbandingan Resmi
              </span>
              <h3 className="font-serif-display text-xl sm:text-2xl font-bold mt-0.5">
                Perbandingan Spesifikasi & Harga Tipe Unit
              </h3>
            </div>
            <span className="text-xs text-emerald-100/80">
              *Harga sudah termasuk promo Free BPHTB, AJB & Biaya KPR
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200 bg-[#FAF8F5] text-[#0F291E]">
                  <th className="px-5 py-4 text-left font-bold">Tipe Unit</th>
                  <th className="px-5 py-4 text-center font-bold">
                    Luas Bangunan (LB)
                  </th>
                  <th className="px-5 py-4 text-center font-bold">
                    Luas Tanah (LT)
                  </th>
                  <th className="px-5 py-4 text-center font-bold">
                    Kamar Tidur / Mandi
                  </th>
                  <th className="px-5 py-4 text-right font-bold">
                    Booking Fee
                  </th>
                  <th className="px-5 py-4 text-right font-bold">
                    Biaya All-In
                  </th>
                  <th className="px-5 py-4 text-right font-bold">
                    Harga Mulai
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200/80">
                {houseTypes.map((house) => (
                  <tr
                    key={house.id}
                    className="hover:bg-emerald-900/4 transition-colors"
                  >
                    <td className="px-5 py-4">
                      <p className="font-bold text-[#0F291E] text-base">
                        {house.name}
                      </p>
                      <span className="text-xs text-stone-500">
                        {house.badge}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center font-semibold text-stone-800">
                      {house.buildingArea}
                    </td>
                    <td className="px-5 py-4 text-center font-semibold text-stone-800">
                      {house.landArea}
                    </td>
                    <td className="px-5 py-4 text-center text-stone-700">
                      {house.bedroom} KT • {house.bathroom} KM
                    </td>
                    <td className="px-5 py-4 text-right font-medium text-stone-700">
                      {house.bookingFee}
                    </td>
                    <td className="px-5 py-4 text-right font-semibold text-[#B07B38]">
                      {house.allInPrice}
                    </td>
                    <td className="px-5 py-4 text-right font-bold text-emerald-900 text-base">
                      {house.priceStartFrom}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* KPR Requirements & Official Bank Account Info */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Persyaratan KPR */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-sm">
            <div className="flex items-center gap-2.5 mb-4">
              <FileCheck2 size={22} className="text-emerald-800" />
              <h4 className="font-serif-display text-xl sm:text-2xl font-bold text-[#0F291E]">
                Persyaratan Dokumen Pengajuan KPR
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-stone-600 mb-5">
              Siapkan dokumen berikut untuk mempercepat proses persetujuan KPR
              Bank mitra kami:
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {pricing.persyaratanKaryawan.map((req, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 p-3 rounded-xl bg-[#FAF8F5] border border-stone-200/70 text-xs sm:text-sm text-stone-800 font-medium"
                >
                  <CheckCircle2
                    size={16}
                    className="text-emerald-700 shrink-0"
                  />
                  <span>{req}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Rekening Resmi Developer & Ketentuan */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-emerald-900/10 shadow-sm">
              <div className="flex items-center gap-2.5 mb-3">
                <Landmark size={20} className="text-[#C58F4B]" />
                <h4 className="font-serif-display text-xl font-bold text-[#0F291E]">
                  Rekening Resmi Developer
                </h4>
              </div>
              <p className="text-xs text-stone-500 mb-4">
                Demi keamanan transaksi, seluruh pembayaran Booking Fee & DP
                hanya ditujukan ke rekening resmi perusahaan:
              </p>
              <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-emerald-900/15 space-y-1">
                <p className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  {pricing.bankTransfer?.bank || marketing.bankTransfer.bank}
                </p>
                <p className="text-lg font-bold text-[#0F291E] tracking-wide">
                  {pricing.bankTransfer?.accountNumber ||
                    marketing.bankTransfer.accountNumber}
                </p>
                <p className="text-xs font-semibold text-stone-700">
                  a.n.{" "}
                  {pricing.bankTransfer?.accountName ||
                    marketing.bankTransfer.accountName}
                </p>
              </div>
            </div>

            <div className="bg-amber-50/90 border border-amber-300/70 rounded-2xl p-5 flex items-start gap-3">
              <AlertCircle
                size={20}
                className="text-amber-800 shrink-0 mt-0.5"
              />
              <div className="text-xs text-amber-950 leading-relaxed">
                <strong className="font-bold block mb-1">
                  Ketentuan Booking & Pembatalan:
                </strong>
                {pricing.warningPembatalan}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
