import React, { useState } from "react";
import { marketing, houseTypes, project } from "../../data/config";
import SectionTitle from "../common/SectionTitle";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
  UserCheck,
  Navigation,
} from "lucide-react";

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

    const message = `
*INQUIRY & JADWAL SURVEY HOLLAND VILLAGE SUKABUMI*

📝 *Data Calon Pembeli:*
• Nama: ${formData.name || "-"}
• No. HP/WhatsApp: ${formData.phone || "-"}
• Email: ${formData.email || "-"}
• Tipe Unit Diminati: ${formData.houseType || "Belum ditentukan"}

💬 *Pesan / Pertanyaan:*
${formData.message || "Mohon informasi brosur, pricelist terbaru, dan jadwal survey lokasi."}

---
Terima kasih! 🙏
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `${marketing.agents[0].whatsapp}?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");

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
    }, 4000);
  };

  return (
    <section
      id="contact"
      className="py-20 md:py-28 bg-[#FAF8F5] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Konsultasi & Kunjungan Lokasi"
          title="Jadwalkan Survey & Hubungi Marketing Resmi"
          subtitle="Tim Property Advisor kami siap membantu Anda memilih unit terbaik, menghitung simulasi KPR, dan mendampingi kunjungan survey ke lokasi."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 mb-16">
          {/* Left Column: Contact Info & Official Agent */}
          <div className="lg:col-span-5 space-y-6">
            {/* Main Contact Card */}
            <div className="bg-forest-gradient text-white rounded-3xl p-7 sm:p-8 shadow-xl relative overflow-hidden">
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-[#C58F4B]/20 rounded-full blur-2xl pointer-events-none" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#E2B170]">
                Kantor Pemasaran Resmi
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold mt-1 mb-6">
                {marketing.name}
              </h3>

              <div className="space-y-5 text-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                    <Phone size={18} className="text-[#E2B170]" />
                  </div>
                  <div>
                    <p className="text-emerald-200 text-xs font-semibold uppercase tracking-wider">
                      Telepon & WhatsApp
                    </p>
                    <a
                      href={`tel:${marketing.phone}`}
                      className="font-bold text-base text-white hover:text-[#E2B170] transition-colors mt-0.5 block"
                    >
                      {marketing.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                    <Mail size={18} className="text-[#E2B170]" />
                  </div>
                  <div>
                    <p className="text-emerald-200 text-xs font-semibold uppercase tracking-wider">
                      Email Resmi
                    </p>
                    <a
                      href={`mailto:${marketing.email}`}
                      className="font-semibold text-white hover:text-[#E2B170] transition-colors break-all mt-0.5 block"
                    >
                      {marketing.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                    <MapPin size={18} className="text-[#E2B170]" />
                  </div>
                  <div>
                    <p className="text-emerald-200 text-xs font-semibold uppercase tracking-wider">
                      Lokasi Proyek & Galeri Marketing
                    </p>
                    <p className="text-emerald-50/90 leading-relaxed mt-0.5">
                      {marketing.officeAddress}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0">
                    <Clock size={18} className="text-[#E2B170]" />
                  </div>
                  <div>
                    <p className="text-emerald-200 text-xs font-semibold uppercase tracking-wider">
                      Jam Operasional Kunjungan
                    </p>
                    <p className="text-white font-semibold mt-0.5">
                      {marketing.operationalHours}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Agent Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-emerald-900/10 shadow-md">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-800 mb-4">
                <UserCheck size={16} className="text-[#C58F4B]" />
                <span>Konsultan Properti Anda</span>
              </div>

              <div className="space-y-3">
                {marketing.agents.map((agent) => (
                  <div
                    key={agent.id}
                    className="p-4 bg-[#FAF8F5] rounded-2xl border border-stone-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div>
                      <p className="font-serif-display font-bold text-[#0F291E] text-lg">
                        {agent.name}
                      </p>
                      <p className="text-xs text-emerald-800 font-semibold">
                        {agent.role || "Marketing Executive"}
                      </p>
                      <p className="text-xs text-stone-500 mt-1">
                        {agent.phone}
                      </p>
                    </div>

                    <a
                      href={agent.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#1EBE5B] text-white font-bold text-xs sm:text-sm shadow-md transition-all shrink-0"
                    >
                      <MessageCircle size={17} />
                      <span>Chat WhatsApp</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry & Survey Booking Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-7 sm:p-10 border border-emerald-900/10 shadow-xl h-full flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#C58F4B] mb-1">
                Respon Cepat via WhatsApp
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#0F291E] mb-2">
                Formulir Permintaan Brosur & Survey
              </h3>
              <p className="text-sm text-stone-600 mb-7">
                Isi data singkat di bawah ini untuk terhubung langsung dengan
                tim pemasaran resmi kami melalui WhatsApp.
              </p>

              {isSubmitted ? (
                <div className="bg-emerald-900/5 border-2 border-emerald-800/20 rounded-2xl p-10 text-center animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-900 text-white flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} />
                  </div>
                  <h4 className="font-serif-display text-2xl font-bold text-[#0F291E] mb-2">
                    Terima Kasih Atas Minat Anda!
                  </h4>
                  <p className="text-stone-600 text-sm sm:text-base max-w-md mx-auto">
                    Anda telah diarahkan ke WhatsApp resmi Marketing Holland
                    Village Sukabumi. Tim kami siap melayani konsultasi Anda.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-[#0F291E] font-semibold mb-2 text-xs uppercase tracking-wider">
                        Nama Lengkap *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 bg-[#FAF8F5] border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:bg-white transition-all text-sm font-medium"
                        placeholder="Masukkan nama Anda"
                      />
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-[#0F291E] font-semibold mb-2 text-xs uppercase tracking-wider">
                        Nomor HP / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3.5 bg-[#FAF8F5] border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:bg-white transition-all text-sm font-medium"
                        placeholder="Contoh: 081234567890"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    {/* Email */}
                    <div>
                      <label className="block text-[#0F291E] font-semibold mb-2 text-xs uppercase tracking-wider">
                        Alamat Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-[#FAF8F5] border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:bg-white transition-all text-sm font-medium"
                        placeholder="nama@email.com (Opsional)"
                      />
                    </div>

                    {/* House Type */}
                    <div>
                      <label className="block text-[#0F291E] font-semibold mb-2 text-xs uppercase tracking-wider">
                        Tipe Unit yang Diminati
                      </label>
                      <select
                        name="houseType"
                        value={formData.houseType}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 bg-[#FAF8F5] border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:bg-white transition-all text-sm font-medium text-stone-800"
                      >
                        <option value="">-- Pilih Tipe Rumah --</option>
                        {houseTypes.map((house) => (
                          <option key={house.id} value={house.name}>
                            {house.name} — LB {house.buildingArea} / LT{" "}
                            {house.landArea} ({house.priceStartFrom})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-[#0F291E] font-semibold mb-2 text-xs uppercase tracking-wider">
                      Pesan / Jadwal Rencana Survey
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="4"
                      className="w-full px-4 py-3.5 bg-[#FAF8F5] border border-stone-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:bg-white transition-all text-sm font-medium resize-none"
                      placeholder="Tuliskan pertanyaan Anda atau jadwal hari kunjungan survey lokasi yang diinginkan..."
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 px-6 bg-emerald-900 hover:bg-emerald-800 text-white font-semibold rounded-xl shadow-lg shadow-emerald-950/15 transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-[0.99]"
                    >
                      <Send size={18} />
                      <span>Kirim Permintaan via WhatsApp</span>
                    </button>
                  </div>

                  <p className="text-xs text-stone-500 text-center">
                    Data Anda aman bersama kami dan hanya digunakan untuk
                    keperluan konsultasi properti Holland Village Sukabumi.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Google Maps Embed Frame */}
        <div className="bg-white p-3 sm:p-4 rounded-3xl shadow-lg border border-emerald-900/10">
          <div className="rounded-2xl overflow-hidden h-80 sm:h-96 relative">
            <iframe
              title="Peta Lokasi Holland Village Sukabumi"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7920.9408054047835!2d106.9490542!3d-6.9537054!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e684700175a0bbb%3A0xb1a96d1671970dce!2sHolland%20Village%20Sukabumi!5e0!3m2!1sid!2sid!4v1773720298285!5m2!1sid!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs sm:text-sm text-stone-600">
            <span className="font-medium text-[#0F291E]">
              📍 <strong>Holland Village Sukabumi</strong> — {project.fullAddress}
            </span>
            <a
              href={project.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-emerald-800 hover:underline"
            >
              <Navigation size={14} /> Petunjuk Arah Google Maps →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
