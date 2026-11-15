import React from "react";
import { company, project, marketing, houseTypes } from "../../data/config";
import {
  Instagram,
  MessageCircle,
  ArrowUp,
  MapPin,
  Phone,
  Mail,
  Trees,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#051C14] text-emerald-100/80 border-t border-emerald-800/30 relative">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Developer Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="p-1 bg-white rounded-xl">
                <img
                  src={company.logo}
                  alt={company.companyNameShort}
                  className="h-11 w-11 object-contain rounded-lg"
                />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E2B170]">
                  {company.name}
                </p>
                <h3 className="font-serif-display text-white font-bold text-xl">
                  {company.companyNameShort}
                </h3>
              </div>
            </div>

            <p className="text-sm text-emerald-100/75 leading-relaxed">
              {company.description}
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/8 border border-white/10 text-xs text-[#E2B170]">
              <Trees size={14} />
              <span>Modern Tropical & Green Living • Sukabumi</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-[0.18em]">
              Navigasi
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href="#home"
                  className="hover:text-[#E2B170] transition-colors"
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-[#E2B170] transition-colors"
                >
                  Tentang Kami
                </a>
              </li>
              <li>
                <a
                  href="#denah"
                  className="hover:text-[#E2B170] transition-colors"
                >
                  Masterplan & Denah
                </a>
              </li>
              <li>
                <a
                  href="#advantages"
                  className="hover:text-[#E2B170] transition-colors"
                >
                  Keunggulan Lokasi
                </a>
              </li>
              <li>
                <a
                  href="#facilities"
                  className="hover:text-[#E2B170] transition-colors"
                >
                  Fasilitas Cluster
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="hover:text-[#E2B170] transition-colors"
                >
                  Galeri Foto
                </a>
              </li>
            </ul>
          </div>

          {/* House Types Links */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-[0.18em]">
              Pilihan Tipe Unit
            </h4>
            <ul className="space-y-2.5 text-sm">
              {houseTypes.map((unit) => (
                <li key={unit.id}>
                  <a
                    href="#houses"
                    className="hover:text-[#E2B170] transition-colors flex items-center justify-between"
                  >
                    <span>
                      {unit.name} (LB {unit.buildingArea})
                    </span>
                    <span className="text-xs font-semibold text-[#E2B170]">
                      {unit.priceStartFrom.replace(".000.000", " Jt")}
                    </span>
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="#pricing"
                  className="text-xs font-bold text-[#E2B170] hover:underline uppercase tracking-wider"
                >
                  Lihat Promo & Tabel Harga →
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold mb-4 text-xs uppercase tracking-[0.18em]">
              Kantor Pemasaran
            </h4>
            <div className="space-y-3.5 text-sm">
              <div className="flex items-start gap-3">
                <MapPin
                  size={17}
                  className="text-[#E2B170] shrink-0 mt-0.5"
                />
                <p className="text-xs leading-relaxed text-emerald-100/80">
                  {project.fullAddress}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={17} className="text-[#E2B170] shrink-0" />
                <a
                  href={`tel:${marketing.phone}`}
                  className="text-white font-semibold hover:text-[#E2B170] transition-colors text-xs sm:text-sm"
                >
                  {marketing.phone} (Adiansyah Anwar)
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={17} className="text-[#E2B170] shrink-0" />
                <a
                  href={`mailto:${marketing.email}`}
                  className="text-emerald-100/80 hover:text-[#E2B170] transition-colors text-xs break-all"
                >
                  {marketing.email}
                </a>
              </div>

              {/* Social Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <a
                  href={`https://instagram.com/${marketing.instagram.replace(
                    "@",
                    ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#C58F4B] flex items-center justify-center transition-colors text-white"
                  title="Instagram"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a
                  href={marketing.agents[0].whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-[#25D366] flex items-center justify-center transition-colors text-white"
                  title="WhatsApp"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-emerald-200/60">
          <p>
            © {currentYear} <strong>{company.companyNameShort}</strong> —{" "}
            {company.name}. Hak cipta dilindungi.
          </p>
          <div className="flex gap-6">
            <a href="#home" className="hover:text-white transition-colors">
              Beranda
            </a>
            <a href="#pricing" className="hover:text-white transition-colors">
              Syarat & Ketentuan Promo
            </a>
            <a href="#contact" className="hover:text-white transition-colors">
              Kontak Resmi
            </a>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons (WhatsApp + Scroll to Top) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-11 h-11 bg-[#07261C]/90 hover:bg-[#07261C] text-white border border-white/15 rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-105 cursor-pointer"
          aria-label="Scroll to top"
          title="Kembali ke atas"
        >
          <ArrowUp size={18} />
        </button>

        <a
          href={marketing.agents[0].whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#1EBE5B] text-white p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-2xl hover:scale-105 transition-all flex items-center gap-2.5 font-semibold text-sm"
          aria-label="Chat Marketing via WhatsApp"
        >
          <MessageCircle size={20} />
          <span className="hidden sm:inline">Chat Marketing</span>
        </a>
      </div>
    </footer>
  );
}
