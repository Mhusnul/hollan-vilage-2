import React from "react";
import { useProperties, useFacilities, useGallery } from "../../hooks";
import AdminLayout from "../../components/admin/AdminLayout";
import { Home, Zap, Image, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const { properties } = useProperties();
  const { facilities } = useFacilities();
  const { gallery } = useGallery();

  const stats = [
    {
      title: "Total Properti",
      count: properties.length,
      icon: Home,
      link: "/admin/properties",
    },
    {
      title: "Total Fasilitas",
      count: facilities.length,
      icon: Zap,
      link: "/admin/facilities",
    },
    {
      title: "Foto Galeri",
      count: gallery.length,
      icon: Image,
      link: "/admin/gallery",
    },
  ];

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-black mb-8">Dasbor</h1>

        {/* Grid Statistik */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link
                key={stat.title}
                to={stat.link}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:border-black hover:shadow-md transition cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm mb-2">{stat.title}</p>
                    <p className="text-4xl font-bold text-black">
                      {stat.count}
                    </p>
                  </div>
                  <div className="bg-black text-white p-4 rounded-lg">
                    <Icon size={32} />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Aksi Cepat */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-black mb-4">Aksi Cepat</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              to="/admin/properties"
              className="p-4 border border-gray-200 rounded-lg hover:bg-black hover:text-white transition font-medium flex items-center justify-between group"
            >
              <span>Kelola Properti</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />
            </Link>
            <Link
              to="/admin/facilities"
              className="p-4 border border-gray-200 rounded-lg hover:bg-black hover:text-white transition font-medium flex items-center justify-between group"
            >
              <span>Kelola Fasilitas</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />
            </Link>
            <Link
              to="/admin/gallery"
              className="p-4 border border-gray-200 rounded-lg hover:bg-black hover:text-white transition font-medium flex items-center justify-between group"
            >
              <span>Kelola Galeri</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />
            </Link>
            <Link
              to="/"
              className="p-4 border border-gray-200 rounded-lg hover:bg-black hover:text-white transition font-medium flex items-center justify-between group"
            >
              <span>Lihat Website</span>
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition"
              />
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
