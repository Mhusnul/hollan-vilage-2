import React from "react";
import Header from "../components/sections/Header";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import HouseTypes from "../components/sections/HouseTypes";
import Denah from "../components/sections/Denah";
import Advantages from "../components/sections/Advantages";
import Facilities from "../components/sections/Facilities";
import Gallery from "../components/sections/Gallery";
import Pricing from "../components/sections/Pricing";
import ContactForm from "../components/sections/ContactForm";
import Footer from "../components/sections/Footer";

export default function Home({ pathname = "/", onNavigate }) {
  const renderPageContent = () => {
    switch (pathname) {
      case "/tipe-rumah":
        return <HouseTypes onNavigate={onNavigate} />;
      case "/masterplan":
        return <Denah />;
      case "/fasilitas":
        return (
          <>
            <Facilities />
            <Gallery />
          </>
        );
      case "/harga-promo":
        return <Pricing />;
      case "/survey":
        return <ContactForm />;
      case "/":
      default:
        return (
          <>
            <Hero onNavigate={onNavigate} />
            <About />
            <Advantages />
            <Pricing />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1C2826] flex flex-col">
      <Header pathname={pathname} onNavigate={onNavigate} />
      <main className="pt-16 flex-1">{renderPageContent()}</main>
      <Footer onNavigate={onNavigate} />
    </div>
  );
}
