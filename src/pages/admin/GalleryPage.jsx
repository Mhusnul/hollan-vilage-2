import React, { useState } from "react";
import { useGallery, useStorage } from "../../hooks";
import AdminLayout from "../../components/admin/AdminLayout";
import PageHeader from "../../components/admin/PageHeader";
import DataTable from "../../components/admin/DataTable";
import Alert from "../../components/admin/Alert";
import GalleryForm from "./GalleryForm";
import { Plus } from "lucide-react";

const CATEGORIES = [
  { value: "house", label: "Rumah" },
  { value: "floorplan", label: "Denah" },
  { value: "facility", label: "Fasilitas" },
];

export default function GalleryPage() {
  const {
    gallery,
    loading,
    error: dbError,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem,
  } = useGallery();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleEdit = (item) => {
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus foto galeri ini?")) {
      try {
        await deleteGalleryItem(id);
        setSuccessMessage("Foto galeri berhasil dihapus");
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const columns = [
    { key: "title", label: "Judul" },
    {
      key: "category",
      label: "Kategori",
      render: (value) =>
        CATEGORIES.find((c) => c.value === value)?.label || value,
    },
    { key: "display_order", label: "Urutan" },
    {
      key: "image_url",
      label: "Gambar",
      render: (value) =>
        value ? (
          <img
            src={value}
            alt="gallery"
            className="h-10 w-10 object-cover rounded"
          />
        ) : (
          "Tidak ada gambar"
        ),
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        title="Manajemen Galeri"
        description="Kelola foto galeri"
        action={
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <Plus size={20} />
            Tambah Foto
          </button>
        }
      />

      {successMessage && (
        <Alert
          type="success"
          title="Sukses"
          message={successMessage}
          onClose={() => setSuccessMessage(null)}
        />
      )}

      {(error || dbError) && (
        <Alert
          type="error"
          title="Kesalahan"
          message={error || dbError}
          onClose={() => setError(null)}
        />
      )}

      {showForm ? (
        <GalleryForm
          galleryId={editingId}
          gallery={gallery}
          onClose={handleFormClose}
          onSuccess={() => {
            handleFormClose();
            setSuccessMessage("Foto galeri berhasil disimpan");
            setTimeout(() => setSuccessMessage(null), 3000);
          }}
        />
      ) : (
        <DataTable
          columns={columns}
          data={gallery}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </AdminLayout>
  );
}
