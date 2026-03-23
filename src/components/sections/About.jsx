import React from "react";
import { Building2, MapPin, CheckCircle } from "lucide-react";
import { useContentSections } from "../../hooks";
import SectionTitle from "../common/SectionTitle";
import aboutImg from "../../assets/background2.jpg";

export default function About() {
  const { getSectionByKey, loading } = useContentSections();

  if (loading) {
    return (
      <section id="about" className="py-5 bg-white">
        <div className="w-full px-4">
          <div className="text-center py-12">Loading...</div>
        </div>
      </section>
    );
  }

  const companyInfo = getSectionByKey("company_info");
  const projectInfo = getSectionByKey("project_info");

  return (
    <section id="about" className="py-5 bg-white">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <SectionTitle
          title="Tentang Kami"
          subtitle="Komitmen kami menghadirkan hunian berkualitas untuk masa depan Anda"
        />

        {/* SECTION 1 - IMAGE LEFT */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mt-16">
          {/* IMAGE */}
          <div className="relative">
            <img
              src={companyInfo?.image_url || aboutImg}
              alt="About"
              className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
            />
          </div>

          {/* TEXT */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Building2 />
              <h3 className="text-2xl font-bold text-gray-900">
                {companyInfo?.title || "PT. PUSPA AGRA PROPERTI"}
              </h3>
            </div>

            <p className="text-gray-600 leading-relaxed mb-6">
              {companyInfo?.content ||
                "Kami berkomitmen menghadirkan hunian berkualitas tinggi dengan harga terjangkau untuk masa depan Anda yang lebih baik."}
            </p>

            <p className="text-sm text-gray-500">
              {companyInfo?.description ||
                "Berdiri dengan visi membangun perumahan impian keluarga Indonesia"}
            </p>
          </div>
        </div>

        {/* SECTION 2 - REVERSE */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mt-20">
          {/* TEXT */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              About Holland Village
            </h3>

            <p className="text-gray-600 mb-6">
              {projectInfo?.content ||
                "Holland Village adalah perumahan modern yang dirancang dengan konsep hunian lengkap, nyaman, dan berkelanjutan untuk keluarga Indonesia."}
            </p>

            <div className="space-y-3">
              <div className="flex gap-3">
                <CheckCircle size={18} className="mt-1 text-black" />
                <p className="text-gray-600">
                  Lokasi strategis di Kota Sukabumi
                </p>
              </div>
              <div className="flex gap-3">
                <CheckCircle size={18} className="mt-1 text-black" />
                <p className="text-gray-600">
                  Fasilitas lengkap untuk keluarga
                </p>
              </div>
              <div className="flex gap-3">
                <CheckCircle size={18} className="mt-1 text-black" />
                <p className="text-gray-600">
                  Cicilan ringan dengan sistem pembayaran fleksibel
                </p>
              </div>
            </div>
          </div>

          {/* IMAGE */}
          <div className="relative">
            <img
              src={aboutImg}
              alt="Vision"
              className="rounded-2xl shadow-xl w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
