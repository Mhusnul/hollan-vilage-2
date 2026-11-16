import React, { useState, useEffect } from "react";
import { company } from "../../data/config";
import { useMarketingSettings } from "../../utils/marketingService";
import { Menu, X, PhoneCall } from "lucide-react";

export default function Header({ pathname = "/", onNavigate }) {
  const { marketing } = useMarketingSettings();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { label: "Beranda", path: "/" },
    { label: "Tipe Rumah", path: "/tipe-rumah" },
    { label: "Masterplan", path: "/masterplan" },
    { label: "Fasilitas", path: "/fasilitas" },
    { label: "Harga & Promo", path: "/harga-promo" },
    { label: "Survey & Kontak", path: "/survey" },
  ];

  const handleNavClick = (e, path) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      setIsMenuOpen(false);
    }
  };

  const handleContactClick = () => {
    window.open(marketing.agents[0].whatsapp, "_blank");
  };

  return (
    <header
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#FAF8F5]/95 backdrop-blur-xl shadow-md shadow-emerald-950/5 border-b border-emerald-900/10 py-2.5"
          : "bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/70 py-3.5"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center gap-4">
          {/* Logo & Brand Name */}
          <a
            href="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center gap-3 group shrink-0"
          >
            <div className="p-1 rounded-xl bg-white shadow-sm border border-emerald-900/10 overflow-hidden shrink-0">
              <img
                src={company.logo}
                alt={company.companyNameShort}
                className="h-9 w-9 sm:h-10 sm:w-10 object-contain group-hover:scale-105 transition-transform duration-300 rounded-lg"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-800 whitespace-nowrap">
                {company.name}
              </span>
              <span className="font-serif-display text-base sm:text-lg font-bold text-[#0F291E] tracking-tight leading-tight whitespace-nowrap">
                Holland Village{" "}
                <span className="text-[#C58F4B] font-normal italic text-sm sm:text-base">
                  Sukabumi
                </span>
              </span>
            </div>
          </a>

          {/* Desktop Menu - Ringkas & Rapi */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <a
                  key={item.label}
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                  className={`px-3.5 py-2 rounded-lg transition-all font-medium text-sm whitespace-nowrap ${
                    isActive
                      ? "text-emerald-950 bg-emerald-900/10 font-bold"
                      : "text-[#1C2826]/80 hover:text-emerald-900 hover:bg-emerald-900/6"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          {/* Single CTA Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleContactClick}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold bg-emerald-900 text-white hover:bg-emerald-800 shadow-sm shadow-emerald-950/15 transition-all cursor-pointer active:scale-95 whitespace-nowrap"
            >
              <PhoneCall size={15} />
              <span>Hubungi Kami</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-xl bg-emerald-950/5 hover:bg-emerald-950/10 flex items-center justify-center text-emerald-950 transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Drawer */}
        {isMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 pb-4 border-t border-emerald-900/10 space-y-1 animate-fade-in">
            {menuItems.map((item) => {
              const isActive = pathname === item.path;
              return (
                <a
                  key={item.label}
                  href={item.path}
                  onClick={(e) => handleNavClick(e, item.path)}
                  className={`block px-3.5 py-2.5 rounded-xl transition-colors font-medium text-sm ${
                    isActive
                      ? "bg-emerald-900/10 text-emerald-950 font-bold"
                      : "text-stone-700 hover:text-emerald-950 hover:bg-emerald-900/8"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
            <div className="pt-2 mt-2 border-t border-stone-200/80">
              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  handleContactClick();
                }}
                className="w-full py-3 px-4 rounded-xl bg-emerald-900 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md"
              >
                <PhoneCall size={16} />
                Konsultasi via WhatsApp
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
