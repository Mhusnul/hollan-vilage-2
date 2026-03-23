import React, { useState, useEffect } from "react";
import { useSalesContacts, useStorage } from "../../hooks";
import Alert from "../../components/admin/Alert";
import { ArrowLeft, Upload } from "lucide-react";

export default function SalesContactForm({
  contactId,
  contacts,
  onClose,
  onSuccess,
}) {
  const { addContact, updateContact } = useSalesContacts();
  const { uploading: imageUploading, uploadFile } =
    useStorage("contact-images");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    whatsapp_link: "",
    photo_url: "",
    position: "Sales Agent",
    active: true,
  });

  useEffect(() => {
    if (contactId) {
      const contact = contacts.find((c) => c.id === contactId);
      if (contact) {
        setFormData(contact);
        setImagePreview(contact.photo_url);
      }
    }
  }, [contactId, contacts]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
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
          `${contactId || "new"}-${Date.now()}.jpg`,
          selectedImageFile,
        );
        updatedFormData.photo_url = newImageUrl;
      }

      if (contactId) {
        await updateContact(contactId, updatedFormData);
      } else {
        await addContact(updatedFormData);
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
          {contactId ? "Edit Kontak Penjualan" : "Tambah Kontak Penjualan Baru"}
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
            Nama *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Nama agen"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Telepon *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="+62-897-6297-053"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="agent@holland.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Link WhatsApp
          </label>
          <input
            type="url"
            name="whatsapp_link"
            value={formData.whatsapp_link}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="https://wa.me/628976297053"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Posisi
            </label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="Sales Agent"
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="active"
                checked={formData.active}
                onChange={handleInputChange}
                className="w-4 h-4 text-black"
              />
              <span className="text-sm font-medium text-black">Aktif</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-black mb-1">
            Foto Profil
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            {imagePreview && (
              <img
                src={imagePreview}
                alt="preview"
                className="h-32 w-32 object-cover rounded mx-auto mb-3"
              />
            )}
            <label className="flex items-center justify-center gap-2 cursor-pointer text-black hover:text-gray-600">
              <Upload size={16} />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              <span>Unggah Foto</span>
            </label>
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
            disabled={loading || imageUploading}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition disabled:opacity-50"
          >
            {loading || imageUploading ? "Menyimpan..." : "Simpan Kontak"}
          </button>
        </div>
      </form>
    </div>
  );
}
