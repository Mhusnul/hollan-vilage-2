import React, { useState } from "react";
import { useProperties, useSalesContacts } from "../../hooks";
import { BedDouble, Home, Ruler } from "lucide-react";
import SectionTitle from "../common/SectionTitle";

export default function HouseTypes() {
  const { properties, loading } = useProperties();
  const { contacts } = useSalesContacts();
  const [activeType, setActiveType] = useState(null);

  // Set active type when properties load
  React.useEffect(() => {
    if (properties.length > 0 && !activeType) {
      setActiveType(properties[0]);
    }
  }, [properties, activeType]);

  const handleContactAgent = () => {
    if (contacts.length > 0) {
      window.open(contacts[0].whatsapp_link, "_blank");
    }
  };

  const handleScheduleSurvey = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <section id="houses" className="py-4 bg-gray-50">
        <div className="w-full px-4">
          <div className="text-center py-12">Loading...</div>
        </div>
      </section>
    );
  }

  if (!properties || properties.length === 0) {
    return (
      <section id="houses" className="py-4 bg-gray-50">
        <div className="w-full px-4">
          <div className="text-center py-12">Tidak ada data tipe rumah</div>
        </div>
      </section>
    );
  }

  return (
    <section id="houses" className="py-4 bg-gray-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Tipe Rumah"
          subtitle="Pilih tipe rumah yang sesuai dengan kebutuhan dan gaya hidup Anda"
        />

        {/* TYPE SELECTOR */}
        <div className="flex flex-wrap justify-center gap-3 mt-10 mb-16">
          {properties.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveType(type)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition ${
                activeType?.id === type.id
                  ? "bg-black text-white"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-100"
              }`}
            >
              {type.name}
            </button>
          ))}
        </div>

        {/* MAIN DISPLAY */}
        {activeType && (
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
                  src={activeType.floor_plan}
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
                Mulai dari {activeType.price_range_start}
              </p>

              {/* SPECS */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="flex flex-col items-center bg-white p-4 rounded-xl border">
                  <Home size={20} />
                  <p className="text-sm mt-2 text-gray-500">Bangunan</p>
                  <p className="font-semibold text-sm">
                    {activeType.land_area}
                  </p>
                </div>

                <div className="flex flex-col items-center bg-white p-4 rounded-xl border">
                  <Ruler size={20} />
                  <p className="text-sm mt-2 text-gray-500">Tanah</p>
                  <p className="font-semibold text-sm">
                    {activeType.building_area}
                  </p>
                </div>

                <div className="flex flex-col items-center bg-white p-4 rounded-xl border">
                  <BedDouble size={20} />
                  <p className="text-sm mt-2 text-gray-500">Kamar</p>
                  <p className="font-semibold text-sm">{activeType.bedrooms}</p>
                </div>
              </div>

              {/* DESCRIPTION */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold mb-3">Deskripsi</h4>
                <p className="text-gray-600">{activeType.description}</p>
              </div>

              {/* CTA */}
              <div className="flex gap-4">
                <button
                  onClick={handleContactAgent}
                  className="px-6 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
                >
                  Hubungi Agen
                </button>
                <button
                  onClick={handleScheduleSurvey}
                  className="px-6 py-3 border border-black rounded-lg font-semibold hover:bg-gray-50 transition"
                >
                  Lihat Lokasi
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
