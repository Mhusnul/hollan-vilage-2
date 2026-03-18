import React from "react";
import { company, project, marketing } from "../../data/config";
import {
  Facebook,
  Twitter,
  Instagram,
  MessageCircle,
  ArrowUp,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Main Footer Content */}
      <div className="w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src={company.logo}
                alt="Logo"
                className="h-12 w-12 object-contain rounded-lg"
              />
              <div>
                <h3 className="text-white font-bold text-lg">
                  {company.companyNameShort}
                </h3>
                <p className="text-xs text-slate-400">{company.tagline}</p>
              </div>
            </div>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">
              {company.description}
            </p>
            <p className="text-xs text-slate-500">
              Berdiri sejak tahun {company.yearEstablished}
            </p>
          </div>

          {/* Project Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Proyek Kami</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#about"
                  className="text-slate-400 hover:text-gray-200 transition-colors font-medium"
                >
                  {project.name}
                </a>
              </li>
              <li>
                <a
                  href="#houses"
                  className="text-slate-400 hover:text-gray-200 transition-colors font-medium"
                >
                  Tipe Rumah
                </a>
              </li>
              <li>
                <a
                  href="#facilities"
                  className="text-slate-400 hover:text-gray-200 transition-colors font-medium"
                >
                  Fasilitas
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-slate-400 hover:text-gray-200 transition-colors font-medium"
                >
                  Galeri Foto
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  className="text-slate-400 hover:text-gray-200 transition-colors font-medium"
                >
                  Harga & Promosi
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Menu Utama</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#home"
                  className="text-slate-400 hover:text-gray-200 transition-colors font-medium"
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="text-slate-400 hover:text-gray-300 transition-colors font-medium"
                >
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="#advantages"
                  className="text-slate-400 hover:text-gray-300 transition-colors font-medium"
                >
                  Keunggulan Lokasi
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-slate-400 hover:text-gray-300 transition-colors font-medium"
                >
                  Hubungi Kami
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Kontak</h4>
            <div className="space-y-4 text-sm">
              <div className="flex gap-3">
                <Phone
                  size={18}
                  className="text-gray-300 flex-shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-slate-400 text-xs mb-1">Telepon</p>
                  <a
                    href={`tel:${marketing.phone}`}
                    className="text-white font-medium hover:text-gray-300 transition-colors break-all"
                  >
                    {marketing.phone}
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail
                  size={18}
                  className="text-gray-300 flex-shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-slate-400 text-xs mb-1">Email</p>
                  <a
                    href={`mailto:${marketing.email}`}
                    className="text-white font-medium hover:text-gray-300 transition-colors break-all"
                  >
                    {marketing.email}
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin
                  size={18}
                  className="text-gray-300 flex-shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-slate-400 text-xs mb-1">Alamat</p>
                  <p className="text-white font-medium text-xs leading-relaxed">
                    {marketing.officeAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-700 my-12" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-400 mb-8">
          <p className="mb-4 md:mb-0">
            © {currentYear} {company.companyNameShort}. Semua hak dilindungi. |{" "}
            {company.name}
          </p>
          <div className="flex gap-6">
            <a
              href="#"
              className="hover:text-gray-300 transition-colors font-medium"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-gray-300 transition-colors font-medium"
            >
              Syarat & Ketentuan
            </a>
            <a
              href="#"
              className="hover:text-gray-300 transition-colors font-medium"
            >
              Peta Situs
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-slate-800 hover:bg-gray-700 flex items-center justify-center transition-smooth text-white shadow-md"
            title="Facebook"
            aria-label="Facebook"
          >
            <Facebook size={20} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-slate-800 hover:bg-gray-700 flex items-center justify-center transition-smooth text-white shadow-md"
            title="Twitter"
            aria-label="Twitter"
          >
            <Twitter size={20} />
          </a>
          <a
            href={`https://instagram.com/${marketing.instagram.replace("@", "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-slate-800 hover:bg-gray-700 flex items-center justify-center transition-smooth text-white shadow-md"
            title="Instagram"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
          <a
            href={marketing.agents[0].whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full bg-slate-800 hover:bg-gray-700 flex items-center justify-center transition-smooth text-white shadow-md"
            title="WhatsApp"
            aria-label="WhatsApp"
          >
            <MessageCircle size={20} />
          </a>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-black transition-smooth hover:scale-110 z-40"
        aria-label="Scroll to top"
      >
        <ArrowUp size={20} />
      </button>
    </footer>
  );
}
