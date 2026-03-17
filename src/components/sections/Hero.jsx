import React from "react";
import { ArrowRight } from "lucide-react";
import heroImg from "../../assets/background3.jpg";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center text-white text-center">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Luxury House"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <span className="inline-block px-4 py-1 mb-4 text-sm bg-white/10 backdrop-blur rounded-full">
          #1 Platform Properti Indonesia
        </span>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
          Temukan Hunian
          <br />
          <span className="text-gray-300">Impian Anda</span>
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-200 mb-8">
          Kami membantu Anda menemukan properti terbaik dengan lokasi strategis,
          harga kompetitif, dan proses yang mudah serta aman.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
          <button className="px-6 py-3 bg-white text-black rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-200 transition">
            Jelajahi Properti
            <ArrowRight size={18} />
          </button>

          <button className="px-6 py-3 border border-white rounded-lg font-semibold hover:bg-white hover:text-black transition">
            Hubungi Kami
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-6">
          <div>
            <p className="text-3xl font-bold">1200+</p>
            <p className="text-gray-300 text-sm">Properti</p>
          </div>
          <div>
            <p className="text-3xl font-bold">4500+</p>
            <p className="text-gray-300 text-sm">Pelanggan</p>
          </div>
          <div>
            <p className="text-3xl font-bold">100+</p>
            <p className="text-gray-300 text-sm">Penghargaan</p>
          </div>
        </div>
      </div>
    </section>
  );
}
