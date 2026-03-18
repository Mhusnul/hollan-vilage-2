import React from "react";
import { Building2, MapPin, CheckCircle } from "lucide-react";
import { company, project } from "../../data/config";
import SectionTitle from "../common/SectionTitle";
import aboutImg from "../../assets/background2.jpg"; // pakai salah satu image kamu

export default function About() {
  return (
    <section id="about" className="py-5 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Tentang Kami"
          subtitle="Komitmen kami menghadirkan hunian berkualitas untuk masa depan Anda"
        />

        {/* SECTION 1 - IMAGE LEFT */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mt-16">
          {/* IMAGE */}
          <div className="relative">
            <img
              src={aboutImg}
              alt="About"
              className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
            />
          </div>

          {/* TEXT */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Building2 />
              <h3 className="text-2xl font-bold text-gray-900">
                {company.name}
              </h3>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              {company.description}
            </p>

            <p className="text-sm text-gray-500">
              Berdiri sejak {company.yearEstablished}
            </p>
          </div>
        </div>

        {/* SECTION 2 - REVERSE */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mt-20">
          {/* TEXT */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Visi & Misi
            </h3>

            <p className="text-gray-600 mb-6">{company.vision}</p>

            <div className="space-y-3">
              {company.mission.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <CheckCircle size={18} className="mt-1 text-black" />
                  <p className="text-gray-600">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative">
            <img
              src={aboutImg}
              alt="Vision"
              className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
            />
          </div>
        </div>

        {/* SECTION 3 - PROJECT HIGHLIGHT */}
        <div className="mt-24 bg-gray-900 text-white rounded-3xl p-10 lg:p-16">
          <h3 className="text-3xl font-bold mb-8 text-center">
            {project.name}
          </h3>

          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <MapPin className="mx-auto" />
              <p className="text-gray-300 text-sm">Lokasi</p>
              <p className="font-semibold">{project.location}</p>
            </div>

            <div className="space-y-2">
              <p className="text-gray-300 text-sm">Luas Area</p>
              <p className="text-2xl font-bold">{project.areaSize}</p>
            </div>

            <div className="space-y-2">
              <p className="text-gray-300 text-sm">Total Unit</p>
              <p className="text-2xl font-bold">{project.totalUnits}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
