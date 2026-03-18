import React from "react";
import { denahPerumahan } from "../../data/config";
import SectionTitle from "../common/SectionTitle";

export default function Denah() {
  return (
    <section id="denah" className="py-12 bg-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Denah Perumahan"
          subtitle="Visualisasi layout dan spesifikasi penggunaan lahan Holland Village Sukabumi"
        />

        {/* Denah Image */}
        <div className="mb-12">
          <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-200">
            <img
              src={denahPerumahan.image}
              alt={denahPerumahan.title}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Land Use Breakdown */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Penggunaan Lahan
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300 bg-gray-50">
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">
                      No.
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-gray-900">
                      Penggunaan Lahan
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-900">
                      Luas (m²)
                    </th>
                    <th className="px-4 py-3 text-right font-semibold text-gray-900">
                      %
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {denahPerumahan.landUseBreakdown.map((item, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-4 py-3 text-gray-700">{item.no}</td>
                      <td className="px-4 py-3 text-gray-700 font-medium">
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-700">
                        {item.area}
                      </td>
                      <td className="px-4 py-3 text-right text-gray-700">
                        {item.percentage}
                      </td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-gray-300 bg-gray-100 font-bold">
                    <td colSpan="2" className="px-4 py-3 text-gray-900">
                      Jumlah Total
                    </td>
                    <td className="px-4 py-3 text-right text-gray-900">
                      {denahPerumahan.totalArea}
                    </td>
                    <td className="px-4 py-3 text-right text-gray-900">
                      {denahPerumahan.totalPercentage}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Unit Details */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Rincian Unit Rumah
            </h3>

            <div className="overflow-x-auto max-h-96 overflow-y-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300 bg-gray-50 sticky top-0">
                    <th className="px-3 py-3 text-left font-semibold text-gray-900">
                      No
                    </th>
                    <th className="px-3 py-3 text-left font-semibold text-gray-900">
                      Blok
                    </th>
                    <th className="px-3 py-3 text-left font-semibold text-gray-900">
                      Type
                    </th>
                    <th className="px-3 py-3 text-center font-semibold text-gray-900">
                      Unit
                    </th>
                    <th className="px-3 py-3 text-right font-semibold text-gray-900">
                      Luas (m²)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {denahPerumahan.unitDetails.map((unit, index) => (
                    <tr
                      key={index}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-3 py-3 text-gray-700">{unit.no}</td>
                      <td className="px-3 py-3 text-gray-700 font-semibold">
                        {unit.block}
                      </td>
                      <td className="px-3 py-3 text-gray-700">
                        {unit.landArea}
                      </td>
                      <td className="px-3 py-3 text-center text-gray-700">
                        {unit.unit}
                      </td>
                      <td className="px-3 py-3 text-right text-gray-700">
                        {unit.luasUnit}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Total Unit:</span> 128 unit
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
