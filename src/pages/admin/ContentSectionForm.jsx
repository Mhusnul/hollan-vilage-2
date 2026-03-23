import React, { useState, useEffect } from "react";
import { useContentSections } from "../../hooks";
import Alert from "../../components/admin/Alert";
import { ArrowLeft } from "lucide-react";

const SECTION_KEYS = [
  { value: "company_info", label: "Informasi Perusahaan" },
  { value: "company_vision", label: "Visi Perusahaan" },
  { value: "company_mission", label: "Misi Perusahaan" },
  { value: "project_info", label: "Informasi Proyek" },
  { value: "building_specs", label: "Spesifikasi Bangunan" },
  { value: "advantages", label: "Keuntungan Lokasi" },
];

export default function ContentSectionForm({
  sectionId,
  sections,
  onClose,
  onSuccess,
}) {
  const { addSection, updateSection } = useContentSections();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    section_key: "",
    title: "",
    content: "",
    description: "",
    image_url: "",
    order: 0,
    meta_data: {},
  });

  useEffect(() => {
    if (sectionId) {
      const section = sections.find((s) => s.id === sectionId);
      if (section) {
        setFormData(section);
      }
    }
  }, [sectionId, sections]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? (value === "" ? 0 : parseInt(value)) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      if (sectionId) {
        await updateSection(sectionId, formData);
      } else {
        await addSection(formData);
      }

      onSuccess?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold text-black">
          {sectionId ? "Edit Bagian Konten" : "Tambah Bagian Konten Baru"}
        </h2>
      </div>

      {error && (
        <Alert
          type="error"
          title="Kesalahan"
          message={error}
          onClose={() => setError(null)}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Section Key *
          </label>
          <select
            name="section_key"
            value={formData.section_key}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Pilih Section Key</option>
            {SECTION_KEYS.map((key) => (
              <option key={key.value} value={key.value}>
                {key.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Judul *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="mis. PT. PUSPA AGRA PROPERTI"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Konten *
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
            rows="5"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Konten utama..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Deskripsi
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Deskripsi tambahan atau notes..."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              URL Gambar
            </label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Urutan Tampilan
            </label>
            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleInputChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <div className="flex gap-3 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading ? "Menyimpan..." : "Simpan Konten"}
          </button>
        </div>
      </form>
    </div>
  );
}
