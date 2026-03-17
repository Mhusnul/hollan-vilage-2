import React, { useState } from "react";
import { marketing, houseTypes } from "../../data/config";
import SectionTitle from "../common/SectionTitle";
import Button from "../common/Button";
import { Phone, Mail, MapPin, Clock, User } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    houseType: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        houseType: "",
        message: "",
      });
    }, 3000);
  };

  return (
    <section id="contact" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Hubungi Kami"
          subtitle="Konsultasikan kebutuhan properti Anda dengan tim profesional kami yang siap membantu"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Information */}
          <div className="space-y-6">
            {/* Main Contact Card */}
            <div className="bg-black text-white rounded-2xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold mb-8">Informasi Kontak</h3>

              <div className="space-y-6">
                {/* Name */}
                <div>
                  <p className="text-gray-300 text-xs font-semibold uppercase tracking-wider mb-2">
                    Marketing Manager
                  </p>
                  <p className="font-semibold text-lg">{marketing.name}</p>
                </div>

                {/* Phone */}
                <div className="flex gap-3">
                  <Phone size={20} className="text-gray-300 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-xs font-semibold uppercase tracking-wider mb-1">
                      Telepon
                    </p>
                    <a
                      href={`tel:${marketing.phone}`}
                      className="font-semibold text-lg hover:text-gray-300 transition-colors"
                    >
                      {marketing.phone}
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-3">
                  <Mail size={20} className="text-gray-300 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-xs font-semibold uppercase tracking-wider mb-1">
                      Email
                    </p>
                    <a
                      href={`mailto:${marketing.email}`}
                      className="font-semibold text-lg hover:text-gray-300 transition-colors break-all"
                    >
                      {marketing.email}
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex gap-3">
                  <MapPin
                    size={20}
                    className="text-gray-300 flex-shrink-0 mt-1"
                  />
                  <div>
                    <p className="text-gray-300 text-xs font-semibold uppercase tracking-wider mb-1">
                      Kantor
                    </p>
                    <p className="font-semibold text-sm leading-relaxed">
                      {marketing.officeAddress}
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-3">
                  <Clock size={20} className="text-gray-300 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300 text-xs font-semibold uppercase tracking-wider mb-1">
                      Jam Operasional
                    </p>
                    <p className="font-semibold text-sm">
                      {marketing.operationalHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Agent List */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm">
              <h4 className="text-lg font-bold text-gray-900 mb-4">
                Hubungi Agen Kami
              </h4>
              <div className="space-y-3">
                {marketing.agents.map((agent) => (
                  <a
                    key={agent.id}
                    href={agent.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 bg-gray-100 rounded-lg border border-gray-300 hover:bg-gray-200 transition-smooth hover:border-gray-400"
                  >
                    <p className="font-semibold text-gray-900 text-sm">
                      {agent.name}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">{agent.phone}</p>
                    <p className="text-xs text-gray-700 mt-2 font-medium">
                      💬 Chat via WhatsApp
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">
                Formulir Inquiry
              </h3>

              {isSubmitted ? (
                <div className="bg-gray-100 border-2 border-gray-300 rounded-xl p-12 text-center">
                  <div className="text-6xl mb-4">✓</div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">
                    Terima Kasih!
                  </h4>
                  <p className="text-gray-700 text-lg">
                    Kami telah menerima data Anda. Tim kami akan segera
                    menghubungi Anda untuk memberikan konsultasi lebih lanjut.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2 text-sm">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-smooth font-medium"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2 text-sm">
                      Nomor HP/WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-smooth font-medium"
                      placeholder="081234567890"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2 text-sm">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-smooth font-medium"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* House Type */}
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2 text-sm">
                      Tipe Rumah yang Diminati
                    </label>
                    <select
                      name="houseType"
                      value={formData.houseType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-smooth font-medium bg-white"
                    >
                      <option value="">-- Pilih Tipe Rumah --</option>
                      {houseTypes.map((house) => (
                        <option key={house.id} value={house.name}>
                          {house.name} ({house.priceStartFrom})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2 text-sm">
                      Pesan / Pertanyaan
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent transition-smooth font-medium resize-none"
                      placeholder="Tuliskan pertanyaan atau pesan Anda..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <Button
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                    >
                      Kirim Inquiry
                    </Button>
                  </div>

                  <p className="text-xs text-gray-500 text-center">
                    * Wajib diisi. Kami menjaga privasi data Anda dengan baik
                    sesuai kebijakan privasi kami.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="rounded-2xl overflow-hidden shadow-lg h-96 border border-slate-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7920.9408054047835!2d106.9490542!3d-6.9537054!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e684700175a0bbb%3A0xb1a96d1671970dce!2sHolland%20Village%20Sukabumi!5e0!3m2!1sid!2sid!4v1773720298285!5m2!1sid!2sid"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}
