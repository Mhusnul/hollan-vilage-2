import React, { useState, useEffect } from "react";
import { useGallery, useStorage } from "../../hooks";
import Alert from "../../components/admin/Alert";
import { ArrowLeft, Upload } from "lucide-react";

const CATEGORIES = [
  { value: "house", label: "Rumah" },
  { value: "floorplan", label: "Denah" },
  { value: "facility", label: "Fasilitas" },
];

export default function GalleryForm({
  galleryId,
  gallery,
  onClose,
  onSuccess,
}) {
  const { addGalleryItem, updateGalleryItem } = useGallery();
  const { uploading: imageUploading, uploadFile } = useStorage("gallery");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "house",
    display_order: 0,
    image_url: "",
  });

  useEffect(() => {
    if (galleryId) {
      const item = gallery.find((g) => g.id === galleryId);
      if (item) {
        setFormData(item);
        setImagePreview(item.image_url);
      }
    }
  }, [galleryId, gallery]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) : value,
    }));
  };

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result);
        setSelectedImageFile(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);
      let updatedFormData = { ...formData };

      if (selectedImageFile) {
        const newImageUrl = await uploadFile(
          `${galleryId || "new"}-${Date.now()}.jpg`,
          selectedImageFile,
        );
        updatedFormData.image_url = newImageUrl;
      }

      if (galleryId) {
        await updateGalleryItem(galleryId, updatedFormData);
      } else {
        await addGalleryItem(updatedFormData);
      }

      onSuccess?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-3 mb-6 pb-6 border-b">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold">
          {galleryId ? "Edit Item Galeri" : "Tambah Item Galeri Baru"}
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
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Judul Foto *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="mis. Ruang Tamu Tipe 60/96"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Deskripsi
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Deskripsi opsional..."
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kategori *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Urutan Tampilan
            </label>
            <input
              type="number"
              name="display_order"
              value={formData.display_order}
              onChange={handleInputChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Gambar Galeri *
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                className="h-32 w-full object-cover rounded mb-3"
              />
            )}
            <label className="flex items-center justify-center gap-2 cursor-pointer text-blue-600 hover:text-blue-800">
              <Upload size={16} />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                required={!formData.image_url}
                className="hidden"
              />
              <span>Unggah Gambar</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-6 border-t">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading || imageUploading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            {loading || imageUploading ? "Menyimpan..." : "Simpan Item Galeri"}
          </button>
        </div>
      </form>
    </div>
  );
}

