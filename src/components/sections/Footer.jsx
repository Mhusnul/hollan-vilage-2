import React from "react";
import { company, project, marketing } from "../../data/config";
import {
  Facebook,
  Twitter,
  Instagram,
  MessageCircle,
  ArrowUp,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">{company.logo}</span>
              <div>
                <h3 className="text-white font-bold text-lg">{company.name}</h3>
                <p className="text-xs text-gray-400">{company.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-gray-400 mb-4">{company.description}</p>
            <p className="text-xs text-gray-500">
              Berdiri sejak tahun {company.yearEstablished}
            </p>
          </div>

          {/* Project & Location */}
          <div>
            <h4 className="text-white font-bold mb-4">Proyek Kami</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  {project.name}
                </a>
              </li>
              <li>
                <a
                  href="#houses"
                  className="hover:text-white transition-colors"
                >
                  Tipe Rumah
                </a>
              </li>
              <li>
                <a
                  href="#facilities"
                  className="hover:text-white transition-colors"
                >
                  Fasilitas
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="hover:text-white transition-colors"
                >
                  Galeri Foto
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Layanan</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  Hubungi Kami
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  Booking
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Kontak</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <p className="text-gray-400 mb-1">Telepon:</p>
                <a
                  href={`tel:${marketing.phone}`}
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  {marketing.phone}
                </a>
              </li>
              <li>
                <p className="text-gray-400 mb-1">Email:</p>
                <a
                  href={`mailto:${marketing.email}`}
                  className="text-white hover:text-blue-400 transition-colors"
                >
                  {marketing.email}
                </a>
              </li>
              <li>
                <p className="text-gray-400 mb-1">Alamat:</p>
                <p className="text-white text-xs">{marketing.officeAddress}</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
          <p>
            © {currentYear} {company.name}. All rights reserved. | PT. Sky
            Estate Indonesia
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Sitemap
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mt-6">
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-gray-700 hover:bg-blue-600 flex items-center justify-center transition-colors text-white"
            title="Facebook"
          >
            <Facebook size={20} />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-gray-700 hover:bg-blue-400 flex items-center justify-center transition-colors text-white"
            title="Twitter"
          >
            <Twitter size={20} />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-gray-700 hover:bg-pink-500 flex items-center justify-center transition-colors text-white"
            title="Instagram"
          >
            <Instagram size={20} />
          </a>
          <a
            href="#"
            className="w-10 h-10 rounded-full bg-gray-700 hover:bg-green-500 flex items-center justify-center transition-colors text-white"
            title="WhatsApp"
          >
            <MessageCircle size={20} />
          </a>
        </div>
      </div>

      {/* Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110 z-40"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
}
