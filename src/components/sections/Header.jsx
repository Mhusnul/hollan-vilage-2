import React, { useState } from "react";
import { company } from "../../data/config";
import Button from "../common/Button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "#home" },
    { label: "Tentang Kami", href: "#about" },
    { label: "Tipe Rumah", href: "#houses" },
    { label: "Fasilitas", href: "#facilities" },
    { label: "Galeri", href: "#gallery" },
    { label: "Kontak", href: "#contact" },
  ];

  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-3xl">{company.logo}</span>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {company.name}
              </h1>
              <p className="text-xs text-gray-600">{company.tagline}</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Button size="sm" className="hidden sm:block">
              Hubungi Kami
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden px-3 py-2 rounded-md text-gray-700"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block py-2 text-gray-700 hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Button variant="primary" className="w-full mt-4">
              Hubungi Kami
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
