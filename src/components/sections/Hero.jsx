import React from "react";
import { project } from "../../data/config";
import Button from "../common/Button";

export default function Hero() {
  return (
    <section
      id="home"
      className="pt-32 pb-20 bg-linear-to-br from-blue-50 to-indigo-100 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-4">
                Cari Rumah Impian Anda
              </h1>
              <p className="text-xl text-gray-700 mb-6">
                {project.description}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-gray-300">
              <div>
                <p className="text-3xl font-bold text-blue-600">8K+</p>
                <p className="text-gray-600 text-sm">Penghuni Puas</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">5K+</p>
                <p className="text-gray-600 text-sm">Rumah Tersedia</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-blue-600">58+</p>
                <p className="text-gray-600 text-sm">Area Amenities</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" variant="primary">
                Jelajahi Sekarang
              </Button>
              <Button size="lg" variant="outline">
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative h-96 rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1570129477492-45f003313e78?w=600&h=500&fit=crop"
                alt="Hero Property"
                className="w-full h-full object-cover"
              />
              {/* Overlay badge */}
              <div className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold">
                {project.status}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
