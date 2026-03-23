import React, { useState } from "react";
import { useSalesContacts } from "../../hooks";
import AdminLayout from "../../components/admin/AdminLayout";
import PageHeader from "../../components/admin/PageHeader";
import DataTable from "../../components/admin/DataTable";
import Alert from "../../components/admin/Alert";
import SalesContactForm from "./SalesContactForm";
import { Plus } from "lucide-react";

export default function SalesContactsPage() {
  const { contacts, loading, error, addContact, updateContact, deleteContact } =
    useSalesContacts();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [formError, setFormError] = useState(null);

  const handleEdit = (contact) => {
    setEditingId(contact.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus kontak penjualan ini?")) {
      try {
        await deleteContact(id);
        setSuccessMessage("Kontak penjualan berhasil dihapus");
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
    { key: "phone", label: "Telepon" },
    { key: "email", label: "Email" },
    { key: "position", label: "Posisi" },
    {
      key: "active",
      label: "Aktif",
      render: (value) => (value ? "Ya" : "Tidak"),
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        title="Manajemen Kontak Penjualan"
        description="Kelola agen dan contact penjualan"
        action={
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <Plus size={20} />
            Tambah Kontak
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
        <SalesContactForm
          contactId={editingId}
          contacts={contacts}
          onClose={handleFormClose}
          onSuccess={() => {
            handleFormClose();
            setSuccessMessage("Kontak penjualan berhasil disimpan");
            setTimeout(() => setSuccessMessage(null), 3000);
          }}
        />
      ) : (
        <DataTable
          columns={columns}
          data={contacts}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </AdminLayout>
  );
}
