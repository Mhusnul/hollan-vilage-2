import React, { useState } from "react";
import { company } from "../../data/config";
import Button from "../common/Button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Beranda", href: "#home" },
    { label: "Tentang Kami", href: "#about" },
    { label: "Tipe Rumah", href: "#houses" },
    { label: "Fasilitas", href: "#facilities" },
    { label: "Galeri", href: "#gallery" },
    { label: "Kontak", href: "#contact" },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-white border-b border-gray-200 shadow-sm\">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo & Company Name */}
          <a href="#home" className="flex items-center gap-3 group">
            <img
              src={company.logo}
              alt="Logo"
              className="h-12 w-12 object-contain group-hover:scale-110 transition-smooth rounded-lg"
            />
            <div>
              <h1 className="text-lg font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                {company.name}
              </h1>
              <p className="text-xs text-gray-600">{company.tagline}</p>
            </div>
          </a>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="px-3 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-smooth font-medium text-sm"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="primary"
              className="hidden sm:inline-flex bg-gray-900 hover:bg-gray-800 text-white"
            >
              Find A House
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 rounded-lg hover:bg-gray-100 flex items-center justify-center transition-smooth"
              aria-label="Toggle menu"
            >
              <svg
                className={`w-6 h-6 text-gray-700 transition-transform duration-300 ${
                  isMenuOpen ? "rotate-90" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pb-4 border-t border-gray-200 space-y-2 animate-fade-in">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-smooth font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <button className="w-full mt-4 px-4 py-2 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-lg transition-smooth">
              Find A House
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}
