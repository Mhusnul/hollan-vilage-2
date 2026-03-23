import React, { useState } from "react";
import { useProperties, useStorage } from "../../hooks";
import AdminLayout from "../../components/admin/AdminLayout";
import PageHeader from "../../components/admin/PageHeader";
import DataTable from "../../components/admin/DataTable";
import Alert from "../../components/admin/Alert";
import PropertyForm from "./PropertyForm";
import { Plus } from "lucide-react";

export default function PropertiesPage() {
  const {
    properties,
    loading,
    error,
    addProperty,
    updateProperty,
    deleteProperty,
  } = useProperties();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [formError, setFormError] = useState(null);

  const handleEdit = (property) => {
    setEditingId(property.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus properti ini?")) {
      try {
        await deleteProperty(id);
        setSuccessMessage("Properti berhasil dihapus");
        setTimeout(() => setSuccessMessage(null), 3000);
      } catch (err) {
        setFormError(err.message);
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingId(null);
    setFormError(null);
  };

  const columns = [
    { key: "name", label: "Nama" },
    { key: "price_start_from", label: "Harga" },
    {
      key: "bedroom",
      label: "Kamar Tidur",
      render: (value) => `${value}`,
    },
    { key: "building_area", label: "Luas Bangunan" },
    {
      key: "image_url",
      label: "Gambar",
      render: (value) =>
        value ? (
          <img
            src={value}
            alt="property"
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
        title="Manajemen Properti"
        description="Kelola tipe rumah dan properti"
        action={
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <Plus size={20} />
            Tambah Properti
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

      {error && (
        <Alert
          type="error"
          title="Kesalahan"
          message={error}
          onClose={() => setFormError(null)}
        />
      )}

      {showForm ? (
        <PropertyForm
          propertyId={editingId}
          properties={properties}
          onClose={handleFormClose}
          onSuccess={() => {
            handleFormClose();
            setSuccessMessage("Properti berhasil disimpan");
            setTimeout(() => setSuccessMessage(null), 3000);
          }}
        />
      ) : (
        <DataTable
          columns={columns}
          data={properties}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </AdminLayout>
  );
}
