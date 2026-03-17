import React from "react";
import { pricing } from "../../data/config";
import SectionTitle from "../common/SectionTitle";
import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <section className="py-20 bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Harga & Promosi"
          subtitle="Penawaran terbaik dengan skema pembayaran yang fleksibel"
        />

        {/* Main Price */}
        <div className="bg-white rounded-lg shadow-lg p-12 mb-12 text-center">
          <p className="text-gray-600 text-lg mb-2">Harga Mulai Dari</p>
          <p className="text-5xl font-bold text-blue-600 mb-4">
            {pricing.startingPrice}
          </p>
          <p className="text-gray-600">DP Minimal: {pricing.minimalDP}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Payment Schemes */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Skema Pembayaran
            </h3>
            <div className="space-y-4">
              {pricing.paymentScheme.map((scheme, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-600 flex justify-between items-center hover:shadow-lg transition-shadow"
                >
                  <div>
                    <p className="font-bold text-gray-900 text-lg">
                      {scheme.type}
                    </p>
                    <p className="text-gray-600 text-sm">
                      Diskon hingga {scheme.discount}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-bold">
                      {scheme.discount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Promos */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Promosi Saat Ini
            </h3>
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <ul className="space-y-4">
                {pricing.promo.map((promo, index) => (
                  <li key={index} className="flex gap-4 items-start">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5">
                      <Check size={16} className="text-white" />
                    </div>
                    <span className="text-gray-800 font-medium">{promo}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button className="w-full mt-8 bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-colors">
                Hubungi Kami Untuk Promo Menarik
              </button>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="mt-12 bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-gray-100 px-6 py-4">
            <h3 className="text-xl font-bold text-gray-900">
              Perbandingan Tipe Rumah
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="px-6 py-4 text-left font-bold text-gray-900">
                    Tipe
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">
                    Luas Tanah
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">
                    Luas Bangunan
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-gray-900">
                    Kamar Tidur
                  </th>
                  <th className="px-6 py-4 text-left font-bold text-blue-600">
                    Harga
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">Tipe A</td>
                  <td className="px-6 py-4">60 m²</td>
                  <td className="px-6 py-4">45 m²</td>
                  <td className="px-6 py-4">2</td>
                  <td className="px-6 py-4 font-bold text-blue-600">
                    Rp 395.000.000
                  </td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">Tipe B</td>
                  <td className="px-6 py-4">75 m²</td>
                  <td className="px-6 py-4">60 m²</td>
                  <td className="px-6 py-4">3</td>
                  <td className="px-6 py-4 font-bold text-blue-600">
                    Rp 595.000.000
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-semibold">Tipe C</td>
                  <td className="px-6 py-4">100 m²</td>
                  <td className="px-6 py-4">85 m²</td>
                  <td className="px-6 py-4">3</td>
                  <td className="px-6 py-4 font-bold text-blue-600">
                    Rp 895.000.000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
