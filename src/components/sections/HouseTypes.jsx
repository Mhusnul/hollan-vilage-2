import React, { useState } from "react";
import { houseTypes, marketing } from "../../data/config";
import { BedDouble, Home, Ruler } from "lucide-react";
import SectionTitle from "../common/SectionTitle";

export default function HouseTypes() {
  const [activeType, setActiveType] = useState(houseTypes[0]);

  const handleContactAgent = () => {
    window.open(marketing.agents[0].whatsapp, "_blank");
  };

  const handleScheduleSurvey = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="houses" className="py-4 bg-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Tipe Rumah"
          subtitle="Pilih tipe rumah yang sesuai dengan kebutuhan dan gaya hidup Anda"
        />

        {/* TYPE SELECTOR */}
        <div className="flex flex-wrap justify-center gap-3 mt-10 mb-16">
          {houseTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveType(type)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                activeType.id === type.id
                  ? "bg-black text-white"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>

        {/* MAIN DISPLAY */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* IMAGE */}
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <img
                src={activeType.image}
                alt={activeType.name}
                className="w-full h-[400px] object-cover"
              />
            </div>

            <div className="rounded-2xl overflow-hidden border bg-white">
              <img
                src={activeType.floorPlan}
                alt="Denah"
                className="w-full h-[200px] object-cover"
              />
            </div>
          </div>

          {/* DETAILS */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">
              {activeType.name}
            </h3>

            <p className="text-2xl font-semibold text-black mb-6">
              Mulai dari {activeType.priceStartFrom}
            </p>

            {/* SPECS */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="flex flex-col items-center bg-white p-4 rounded-xl border">
                <Home size={20} />
                <p className="text-sm mt-2 text-gray-500">Bangunan</p>
                <p className="font-semibold">{activeType.landArea}</p>
              </div>

              <div className="flex flex-col items-center bg-white p-4 rounded-xl border">
                <Ruler size={20} />
                <p className="text-sm mt-2 text-gray-500">Tanah</p>
                <p className="font-semibold">{activeType.buildingArea}</p>
              </div>

              <div className="flex flex-col items-center bg-white p-4 rounded-xl border">
                <BedDouble size={20} />
                <p className="text-sm mt-2 text-gray-500">Kamar</p>
                <p className="font-semibold">{activeType.bedroom}</p>
              </div>
            </div>

            {/* DESCRIPTION / SPECS */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold mb-3">Spesifikasi</h4>

              <ul className="space-y-2">
                {activeType.specification.map((spec, i) => (
                  <li key={i} className="text-gray-600 flex gap-2">
                    <span>•</span>
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div className="flex gap-4">
              <button
                onClick={handleContactAgent}
                className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800"
              >
                Hubungi Agen
              </button>

              <button
                onClick={handleScheduleSurvey}
                className="px-6 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-100"
              >
                Jadwalkan Survey
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
