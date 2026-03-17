import React from "react";
import Header from "../components/sections/Header";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import HouseTypes from "../components/sections/HouseTypes";
import Advantages from "../components/sections/Advantages";
import Facilities from "../components/sections/Facilities";
import Gallery from "../components/sections/Gallery";
import Pricing from "../components/sections/Pricing";
import ContactForm from "../components/sections/ContactForm";
import Footer from "../components/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <Hero />
        <About />
        <HouseTypes />
        <Advantages />
        <Facilities />
        <Gallery />
        <Pricing />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
