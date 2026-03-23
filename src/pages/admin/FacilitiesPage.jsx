import React, { useState } from "react";
import { useFacilities, useStorage } from "../../hooks";
import AdminLayout from "../../components/admin/AdminLayout";
import PageHeader from "../../components/admin/PageHeader";
import DataTable from "../../components/admin/DataTable";
import Alert from "../../components/admin/Alert";
import FacilityForm from "./FacilityForm";
import { Plus } from "lucide-react";

export default function FacilitiesPage() {
  const {
    facilities,
    loading,
    error: dbError,
    addFacility,
    updateFacility,
    deleteFacility,
  } = useFacilities();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleEdit = (facility) => {
    setEditingId(facility.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus fasilitas ini?")) {
      try {
        await deleteFacility(id);
        setSuccessMessage("Fasilitas berhasil dihapus");
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
    { key: "name", label: "Nama" },
    { key: "icon", label: "Ikon" },
    { key: "display_order", label: "Urutan" },
    {
      key: "image_url",
      label: "Gambar",
      render: (value) =>
        value ? (
          <img
            src={value}
            alt="facility"
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
        title="Manajemen Fasilitas"
        description="Kelola fasilitas dan amenities"
        action={
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <Plus size={20} />
            Tambah Fasilitas
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
        <FacilityForm
          facilityId={editingId}
          facilities={facilities}
          onClose={handleFormClose}
          onSuccess={() => {
            handleFormClose();
            setSuccessMessage("Fasilitas berhasil disimpan");
            setTimeout(() => setSuccessMessage(null), 3000);
          }}
        />
      ) : (
        <DataTable
          columns={columns}
          data={facilities}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </AdminLayout>
  );
}
