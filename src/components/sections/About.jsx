import React from "react";
import { company, project } from "../../data/config";
import SectionTitle from "../common/SectionTitle";

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Tentang Kami"
          subtitle="Mengenal lebih dekat Sky Estate dan visi kami"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {company.name}
              </h3>
              <p className="text-gray-600 mb-4">{company.description}</p>
              <p className="text-sm text-gray-500">
                Berdiri sejak tahun {company.yearEstablished}
              </p>
            </div>

            {/* Vision & Mission */}
            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                Visi Kami
              </h4>
              <p className="text-gray-700">{company.vision}</p>
            </div>

            <div className="bg-indigo-50 rounded-lg p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                Misi Kami
              </h4>
              <ul className="space-y-2">
                {company.mission.map((item, index) => (
                  <li key={index} className="flex gap-3 text-gray-700">
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Project Info */}
          <div className="space-y-6">
            <div className="bg-linear-to-br from-blue-600 to-indigo-600 text-white rounded-lg p-8">
              <h3 className="text-3xl font-bold mb-4">{project.name}</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-blue-100 text-sm">LOKASI</p>
                  <p className="text-lg font-semibold">{project.location}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-blue-100 text-sm">LUAS AREA</p>
                    <p className="text-xl font-bold">{project.areaSize}</p>
                  </div>
                  <div>
                    <p className="text-blue-100 text-sm">TOTAL UNIT</p>
                    <p className="text-xl font-bold">{project.totalUnits}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Description */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-3">
                Tentang Proyek
              </h4>
              <p className="text-gray-700 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Landmarks */}
            <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
              <h4 className="text-lg font-bold text-gray-900 mb-4">
                Dekat Dengan
              </h4>
              <div className="space-y-3">
                {project.landmarks.map((landmark, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center"
                  >
                    <span className="text-gray-700">{landmark.name}</span>
                    <span className="font-semibold text-blue-600">
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
