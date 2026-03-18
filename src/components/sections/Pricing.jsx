import React from "react";
import { pricing, houseTypes, marketing } from "../../data/config";
import SectionTitle from "../common/SectionTitle";
import { Check } from "lucide-react";
import Button from "../common/Button";

export default function Pricing() {
  const handleContactForPromo = () => {
    window.open(marketing.agents[0].whatsapp, "_blank");
  };
  return (
    <section id="pricing" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Harga & Promosi"
          subtitle="Penawaran spesial dengan skema pembayaran yang fleksibel untuk kemudahan Anda"
        />

        {/* Main Price Card */}
        <div className="bg-black text-white rounded-2xl shadow-lg p-8 mb-12 text-center">
          <p className="text-gray-300 text-base font-semibold uppercase tracking-wider mb-2">
            Harga Mulai Dari
          </p>
          <p className="text-5xl font-bold mb-3">{pricing.startingPrice}</p>
          <p className="text-gray-300 text-base">
            DP Minimal: {pricing.minimalDP}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Payment Schemes */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              Skema Pembayaran
            </h3>
            <div className="space-y-4">
              {pricing.paymentScheme.map((scheme, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-300 hover:shadow-md hover:border-gray-900 transition-smooth"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-gray-900 text-lg mb-1">
                        {scheme.type}
                      </p>
                      <p className="text-gray-600 text-sm">
                        Cicilan hingga {scheme.discount}
                      </p>
                    </div>
                    <div className="bg-gray-100 text-gray-900 px-4 py-2 rounded-lg font-bold text-sm">
                      {scheme.discount}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Promos */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Promosi Saat Ini
            </h3>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
              <ul className="space-y-4 mb-8">
                {pricing.promo.map((promo, index) => (
                  <li key={index} className="flex gap-3 items-start">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check size={16} className="text-white" />
                    </div>
                    <span className="text-gray-800 font-medium leading-relaxed">
                      {promo}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Button
                variant="primary"
                size="lg"
                className="w-full"
                onClick={handleContactForPromo}
              >
                Hubungi Kami Untuk Promo Menarik
              </Button>
            </div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-200">
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b border-gray-200">
            <h3 className="text-xl font-bold text-gray-900">
              Perbandingan Tipe Rumah
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200 bg-gray-50">
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">
                    Tipe
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">
                    Luas Bangunan
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">
                    Luas Tanah
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">
                    Kamar Tidur
                  </th>
                  <th className="px-6 py-4 text-left font-semibold text-black">
                    Harga
                  </th>
                </tr>
              </thead>
              <tbody>
                {houseTypes.map((house) => (
                  <tr
                    key={house.id}
                    className="border-b border-slate-200 hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {house.name}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {house.landArea}
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      {house.buildingArea}
                    </td>
                    <td className="px-6 py-4 text-gray-700">{house.bedroom}</td>
                    <td className="px-6 py-4 font-bold text-black">
                      {house.priceStartFrom}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
