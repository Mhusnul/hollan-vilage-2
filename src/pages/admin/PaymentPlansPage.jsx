import React, { useState } from "react";
import { usePaymentPlans } from "../../hooks";
import AdminLayout from "../../components/admin/AdminLayout";
import PageHeader from "../../components/admin/PageHeader";
import DataTable from "../../components/admin/DataTable";
import Alert from "../../components/admin/Alert";
import PaymentPlanForm from "./PaymentPlanForm";
import { Plus } from "lucide-react";

export default function PaymentPlansPage() {
  const { plans, loading, error, addPlan, updatePlan, deletePlan } =
    usePaymentPlans();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [formError, setFormError] = useState(null);

  const handleEdit = (plan) => {
    setEditingId(plan.id);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Apakah Anda yakin ingin menghapus skema pembayaran ini?")) {
      try {
        await deletePlan(id);
        setSuccessMessage("Skema pembayaran berhasil dihapus");
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
    { key: "title", label: "Jenis Pembayaran" },
    { key: "down_payment_percent", label: "DP %" },
    { key: "interest_rate", label: "Bunga %" },
    { key: "installation_period", label: "Periode (Bulan)" },
    {
      key: "description",
      label: "Deskripsi",
      render: (value) => (value ? value.substring(0, 40) + "..." : "-"),
    },
  ];

  return (
    <AdminLayout>
      <PageHeader
        title="Manajemen Skema Pembayaran"
        description="Kelola tipe dan skema pembayaran untuk properti"
        action={
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
          >
            <Plus size={20} />
            Tambah Skema
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
        <PaymentPlanForm
          planId={editingId}
          plans={plans}
          onClose={handleFormClose}
          onSuccess={() => {
            handleFormClose();
            setSuccessMessage("Skema pembayaran berhasil disimpan");
            setTimeout(() => setSuccessMessage(null), 3000);
          }}
        />
      ) : (
        <DataTable
          columns={columns}
          data={plans}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </AdminLayout>
  );
}
