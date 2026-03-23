import React, { useState, useEffect } from "react";
import { useProperties, useStorage } from "../../hooks";
import Alert from "../../components/admin/Alert";
import { ArrowLeft, Upload, X } from "lucide-react";

export default function PropertyForm({
  propertyId,
  properties,
  onClose,
  onSuccess,
}) {
  const { addProperty, updateProperty, fetchPropertyById } = useProperties();
  const { uploading: imageUploading, uploadFile } = useStorage("house-images");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [floorPlanPreview, setFloorPlanPreview] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [selectedFloorPlanFile, setSelectedFloorPlanFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    land_area: "",
    building_area: "",
    bedroom: 0,
    floor: 0,
    price_start_from: 0,
    dp_amount: 0,
    kpr_amount: 0,
    room_details: "",
    specification: [],
    image_url: "",
    floor_plan_url: "",
  });

  // Load property if editing
  useEffect(() => {
    if (propertyId) {
      const property = properties.find((p) => p.id === propertyId);
      if (property) {
        setFormData(property);
        setImagePreview(property.image_url);
        setFloorPlanPreview(property.floor_plan_url);
      }
    }
  }, [propertyId, properties]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number" ? (value === "" ? 0 : parseFloat(value)) : value,
    }));
  };

  const handleSpecificationChange = (index, value) => {
    const newSpec = [...formData.specification];
    newSpec[index] = value;
    setFormData((prev) => ({
      ...prev,
      specification: newSpec,
    }));
  };

  const addSpecification = () => {
    setFormData((prev) => ({
      ...prev,
      specification: [...prev.specification, ""],
    }));
  };

  const removeSpecification = (index) => {
    setFormData((prev) => ({
      ...prev,
      specification: prev.specification.filter((_, i) => i !== index),
    }));
  };

  const handleImageSelect = (e, type) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (type === "image") {
          setImagePreview(event.target?.result);
          setSelectedImageFile(file);
        } else {
          setFloorPlanPreview(event.target?.result);
          setSelectedFloorPlanFile(file);
        }
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

      // Upload image jika ada file baru
      if (selectedImageFile) {
        const newImageUrl = await uploadFile(
          `${propertyId || "new"}-${Date.now()}.jpg`,
          selectedImageFile,
        );
        updatedFormData.image_url = newImageUrl;
      }

      // Upload floor plan jika ada file baru
      if (selectedFloorPlanFile) {
        const newFloorPlanUrl = await uploadFile(
          `floorplan-${propertyId || "new"}-${Date.now()}.jpg`,
          selectedFloorPlanFile,
        );
        updatedFormData.floor_plan_url = newFloorPlanUrl;
      }

      // Filter kosong specification
      updatedFormData.specification = updatedFormData.specification.filter(
        (s) => s.trim() !== "",
      );

      // Save to database
      if (propertyId) {
        await updateProperty(propertyId, updatedFormData);
      } else {
        await addProperty(updatedFormData);
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
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-6 border-b">
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-2xl font-bold">
          {propertyId ? "Edit Properti" : "Tambah Properti Baru"}
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

      <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">
        {/* Basic Info */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Properti *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="mis. Tipe 60/96"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Detail Ruangan *
            </label>
            <input
              type="text"
              name="room_details"
              value={formData.room_details}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="3 Kamar Tidur, 2 Kamar Mandi..."
            />
          </div>
        </div>

        {/* Luas Area */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Luas Tanah *
            </label>
            <input
              type="text"
              name="land_area"
              value={formData.land_area}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="60 m²"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Luas Bangunan *
            </label>
            <input
              type="text"
              name="building_area"
              value={formData.building_area}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="96 m²"
            />
          </div>
        </div>

        {/* Kamar & Lantai */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jumlah Kamar Tidur *
            </label>
            <input
              type="number"
              name="bedroom"
              value={formData.bedroom}
              onChange={handleInputChange}
              required
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jumlah Lantai *
            </label>
            <input
              type="number"
              name="floor"
              value={formData.floor}
              onChange={handleInputChange}
              required
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Harga */}
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Harga Mulai Dari *
            </label>
            <input
              type="number"
              name="price_start_from"
              value={formData.price_start_from}
              onChange={handleInputChange}
              required
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jumlah DP *
            </label>
            <input
              type="number"
              name="dp_amount"
              value={formData.dp_amount}
              onChange={handleInputChange}
              required
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Jumlah KPR *
            </label>
            <input
              type="number"
              name="kpr_amount"
              value={formData.kpr_amount}
              onChange={handleInputChange}
              required
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Gambar */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gambar Properti
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
                  onChange={(e) => handleImageSelect(e, "image")}
                  className="hidden"
                />
                <span>Unggah Gambar</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Gambar Denah
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              {floorPlanPreview && (
                <img
                  src={floorPlanPreview}
                  alt="preview"
                  className="h-32 w-full object-cover rounded mb-3"
                />
              )}
              <label className="flex items-center justify-center gap-2 cursor-pointer text-blue-600 hover:text-blue-800">
                <Upload size={16} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageSelect(e, "floorplan")}
                  className="hidden"
                />
                <span>Unggah Denah</span>
              </label>
            </div>
          </div>
        </div>

        {/* Spesifikasi */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Spesifikasi
          </label>
          <div className="space-y-2">
            {formData.specification.map((spec, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="text"
                  value={spec}
                  onChange={(e) =>
                    handleSpecificationChange(idx, e.target.value)
                  }
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder={`Spesifikasi ${idx + 1}`}
                />
                <button
                  type="button"
                  onClick={() => removeSpecification(idx)}
                  className="text-red-600 hover:text-red-800 p-2"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addSpecification}
            className="mt-3 text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            + Tambah Spesifikasi
          </button>
        </div>

        {/* Tombol */}
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
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading || imageUploading ? "Menyimpan..." : "Simpan Properti"}
          </button>
        </div>
      </form>
    </div>
  );
}
