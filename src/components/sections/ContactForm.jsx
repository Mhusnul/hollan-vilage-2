import React, { useState } from "react";
import { marketing, houseTypes } from "../../data/config";
import SectionTitle from "../common/SectionTitle";
import Button from "../common/Button";

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
    // Simulate form submission
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
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Hubungi Kami"
          subtitle="Jadilah bagian dari komunitas Holland Village kami"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-linear-to-br from-blue-600 to-indigo-600 text-white rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6">Informasi Kontak</h3>

              <div className="space-y-6">
                <div>
                  <p className="text-blue-100 text-sm mb-1">
                    MARKETING MANAGER
                  </p>
                  <p className="font-bold text-lg">{marketing.name}</p>
                </div>

                <div>
                  <p className="text-blue-100 text-sm mb-1">TELEPON</p>
                  <a
                    href={`tel:${marketing.phone}`}
                    className="font-bold text-lg hover:text-blue-200 transition-colors"
                  >
                    {marketing.phone}
                  </a>
                </div>

                <div>
                  <p className="text-blue-100 text-sm mb-1">EMAIL</p>
                  <a
                    href={`mailto:${marketing.email}`}
                    className="font-bold text-lg hover:text-blue-200 transition-colors"
                  >
                    {marketing.email}
                  </a>
                </div>

                <div>
                  <p className="text-blue-100 text-sm mb-1">KANTOR</p>
                  <p className="font-bold text-lg">{marketing.officeAddress}</p>
                </div>

                <div>
                  <p className="text-blue-100 text-sm mb-1">JAM OPERASIONAL</p>
                  <p className="font-bold text-sm">
                    {marketing.operationalHours}
                  </p>
                </div>
              </div>
            </div>

            {/* Agents */}
            <div className="bg-gray-50 rounded-lg p-6 border-2 border-gray-200">
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
                    className="block p-3 bg-white rounded-lg border border-green-200 hover:bg-green-50 transition-colors"
                  >
                    <p className="font-bold text-gray-900">{agent.name}</p>
                    <p className="text-sm text-gray-600">{agent.phone}</p>
                    <p className="text-xs text-green-600 mt-1">
                      💬 Chat WhatsApp
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-50 rounded-lg p-8 border-2 border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Formulir Inquiry
              </h3>

              {isSubmitted ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center">
                  <div className="text-5xl mb-4">✓</div>
                  <h4 className="text-xl font-bold text-green-700 mb-2">
                    Terima Kasih!
                  </h4>
                  <p className="text-green-600">
                    Kami telah menerima data Anda. Tim kami akan segera
                    menghubungi Anda.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      Nama Lengkap *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      Nomor HP/WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      placeholder="081234567890"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* House Type */}
                  <div>
                    <label className="block text-gray-900 font-semibold mb-2">
                      Tipe Rumah yang Diminati
                    </label>
                    <select
                      name="houseType"
                      value={formData.houseType}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
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
                    <label className="block text-gray-900 font-semibold mb-2">
                      Pesan / Pertanyaan
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                      placeholder="Tuliskan pertanyaan atau pesan Anda..."
                    ></textarea>
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

                  <p className="text-xs text-gray-500">
                    * Wajib diisi. Kami menjaga privasi data Anda dengan baik.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12 rounded-lg overflow-hidden shadow-lg h-96">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.4265789282756!2d106.78920932342168!3d-6.370718393607155!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1sHolland%20Village!2sJl.%20Raya%20Sudirman%2C%20Depok%2C%20Jawa%20Barat"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
