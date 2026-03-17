import React, { useState } from "react";
import Button from "../common/Button";
import { MapPin, Home, DollarSign, Search } from "lucide-react";
import heroImg from "../../assets/background3.jpg";

export default function Hero() {
  const [searchData, setSearchData] = useState({
    location: "",
    propertyType: "",
    budget: "",
  });

  return (
    <section
      id="home"
      className="relative min-h-screen bg-white pt-20 pb-0 flex flex-col justify-center overflow-hidden"
    >
      {/* Main Content */}
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
          {/* Left Content */}
          <div className="space-y-6 py-8 lg:py-0">
            {/* Main heading */}
            <div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 leading-tight mb-4">
                Temukan Rumah
                <br />
                Impian Anda
              </h1>
              <p className="text-lg text-gray-700 leading-relaxed max-w-md">
                Ingin menemukan rumah yang sempurna? Kami siap membantu Anda
                menemukan rumah yang sesuai dengan gaya hidup dan kebutuhan Anda
              </p>
            </div>

            {/* CTA Button */}
            <div>
              <Button
                size="lg"
                variant="primary"
                className="bg-black hover:bg-gray-900 text-white"
              >
                Mulai Cari
              </Button>
            </div>

            {/* Stats Grid - Horizontal */}
            <div className="grid grid-cols-3 gap-6 pt-2">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                  1200 +
                </p>
                <p className="text-gray-700 text-sm font-medium">
                  Properti Tersedia
                </p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                  4500 +
                </p>
                <p className="text-gray-700 text-sm font-medium">
                  Pelanggan Puas
                </p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                  100 +
                </p>
                <p className="text-gray-700 text-sm font-medium">Penghargaan</p>
              </div>
            </div>
          </div>

          {/* Right Image Section */}
          <div className="relative h-80 lg:h-[450px] -mx-4 sm:mx-0 lg:mx-0">
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImg}
                alt="Holland Village"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="relative mt-4 bg-white py-8 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-gray-700 font-medium mb-4">
            Cari properti yang tersedia
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-end">
            {/* Location */}
            <div className="relative">
              <input
                type="text"
                placeholder="Location"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 bg-white"
                value={searchData.location}
                onChange={(e) =>
                  setSearchData({ ...searchData, location: e.target.value })
                }
              />
              <MapPin
                size={20}
                className="absolute right-4 top-3.5 text-gray-400"
              />
            </div>

            {/* Property Type */}
            <div className="relative">
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 bg-white appearance-none"
                value={searchData.propertyType}
                onChange={(e) =>
                  setSearchData({ ...searchData, propertyType: e.target.value })
                }
              >
                <option value="">Tipe Properti</option>
                <option value="house">Rumah</option>
                <option value="apartment">Apartemen</option>
                <option value="condo">Condo</option>
              </select>
              <Home
                size={20}
                className="absolute right-4 top-3.5 text-gray-400 pointer-events-none"
              />
            </div>

            {/* Budget */}
            <div className="relative">
              <select
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-gray-900 bg-white appearance-none"
                value={searchData.budget}
                onChange={(e) =>
                  setSearchData({ ...searchData, budget: e.target.value })
                }
              >
                <option value="">Anggaran</option>
                <option value="0-500m">Rp 0 - 500 Juta</option>
                <option value="500m-1b">Rp 500 Juta - 1 Miliar</option>
                <option value="1b+">Rp 1 Miliar+</option>
              </select>
              <DollarSign
                size={20}
                className="absolute right-4 top-3.5 text-gray-400 pointer-events-none"
              />
            </div>

            {/* Search Button */}
            <button className="w-full md:w-auto px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
              <Search size={20} />
              Cari
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
