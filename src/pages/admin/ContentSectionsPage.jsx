import React, { useState } from "react";
import { useContentSections } from "../../hooks";
import AdminLayout from "../../components/admin/AdminLayout";
import PageHeader from "../../components/admin/PageHeader";
import DataTable from "../../components/admin/DataTable";
import Alert from "../../components/admin/Alert";
import ContentSectionForm from "./ContentSectionForm";
import { Plus } from "lucide-react";

export default function ContentSectionsPage() {
  const { sections, loading, error, addSection, updateSection, deleteSection } =
    useContentSections();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [formError, setFormError] = useState(null);

  const handleEdit = (section) => {
    setEditingId(section.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus bagian konten ini?")) {
      try {
        await deleteSection(id);
        setSuccessMessage("Konten berhasil dihapus");
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
    { key: "section_key", label: "Section Key" },
    { key: "title", label: "Judul" },
    {
      key: "content",
      label: "Konten",
      render: (value) => (value ? value.substring(0, 50) + "..." : "-"),
    },
    { key: "order", label: "Urutan" },
  ];

  return (
    <AdminLayout>
      <PageHeader
        title="Manajemen Bagian Konten"
        description="Kelola konten berita seperti tentang perusahaan, proyek, keuntungan, dll"
        action={
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <Plus size={20} />
            Tambah Konten
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

      {formError && (
        <Alert
          type="error"
          title="Kesalahan"
          message={formError}
          onClose={() => setFormError(null)}
        />
      )}

      {showForm ? (
        <ContentSectionForm
          sectionId={editingId}
          sections={sections}
          onClose={handleFormClose}
          onSuccess={() => {
            handleFormClose();
            setSuccessMessage("Konten berhasil disimpan");
            setTimeout(() => setSuccessMessage(null), 3000);
          }}
        />
      ) : (
        <DataTable
          columns={columns}
          data={sections}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </AdminLayout>
  );
}
