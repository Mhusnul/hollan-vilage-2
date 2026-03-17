import React from "react";
import { company, project } from "../../data/config";
import SectionTitle from "../common/SectionTitle";

export default function About() {
  return (
    <section id="about" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Tentang Kami"
          subtitle="Mengenal lebih dekat Sky Estate dan visi kami dalam menghadirkan hunian berkualitas"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
          {/* Left: Company Info */}
          <div className="space-y-8">
            {/* Company Introduction */}
            <div className="space-y-4">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-3">
                  {company.name}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {company.description}
                </p>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="inline-block w-2 h-2 bg-gray-700 rounded-full" />
                Berdiri sejak tahun {company.yearEstablished}
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition-smooth">
              <div className="flex gap-3 mb-3">
                <div className="w-1 bg-black rounded-full" />
                <h4 className="text-lg font-bold text-gray-900">Visi Kami</h4>
              </div>
              <p className="text-gray-700 leading-relaxed">{company.vision}</p>
            </div>

            {/* Mission Card */}
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex gap-3 mb-4">
                <div className="w-1 bg-black rounded-full" />
                <h4 className="text-lg font-bold text-gray-900">Misi Kami</h4>
              </div>
              <ul className="space-y-3">
                {company.mission.map((item, index) => (
                  <li key={index} className="flex gap-3 text-gray-700">
                    <span className="text-black font-bold text-lg mt-0.5">
                      ✓
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right: Project Info */}
          <div className="space-y-6">
            {/* Project Highlight Card */}
            <div className="bg-black text-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-3xl font-bold mb-4">{project.name}</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-300 text-xs font-semibold uppercase tracking-wider mb-1">
                    Lokasi
                  </p>
                  <p className="text-base font-semibold">{project.location}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-gray-300 text-xs font-semibold uppercase tracking-wider mb-1">
                      Luas Area
                    </p>
                    <p className="text-xl font-bold">{project.areaSize}</p>
                  </div>
                  <div className="bg-white/10 rounded-lg p-3">
                    <p className="text-gray-300 text-xs font-semibold uppercase tracking-wider mb-1">
                      Total Unit
                    </p>
                    <p className="text-xl font-bold">{project.totalUnits}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Description */}
            <div className="bg-white border border-slate-200 rounded-xl p-8 hover:shadow-md transition-smooth">
              <h4 className="text-xl font-bold text-gray-900 mb-4">
                Tentang Proyek
              </h4>
              <p className="text-gray-600 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Nearby Landmarks */}
            <div className="bg-white border border-slate-200 rounded-xl p-8">
              <h4 className="text-xl font-bold text-gray-900 mb-6">
                Dekat Dengan
              </h4>
              <div className="space-y-4">
                {project.landmarks.map((landmark, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center pb-4 border-b border-slate-100 last:border-0"
                  >
                    <span className="text-gray-700 font-medium">
                      {landmark.name}
                    </span>
                    <span className="text-gray-700 font-semibold text-sm bg-gray-100 px-3 py-1 rounded-full">
                      {landmark.distance}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
