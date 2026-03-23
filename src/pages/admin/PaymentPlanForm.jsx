import React, { useState, useEffect } from "react";
import { usePaymentPlans } from "../../hooks";
import Alert from "../../components/admin/Alert";
import { ArrowLeft } from "lucide-react";

export default function PaymentPlanForm({ planId, plans, onClose, onSuccess }) {
  const { addPlan, updatePlan } = usePaymentPlans();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    down_payment_percent: 0,
    interest_rate: 0,
    installation_period: 0,
    benefits: [],
  });

  const [benefitInput, setBenefitInput] = useState("");

  useEffect(() => {
    if (planId) {
      const plan = plans.find((p) => p.id === planId);
      if (plan) {
        setFormData(plan);
      }
    }
  }, [planId, plans]);

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "number" ? (value === "" ? 0 : parseFloat(value)) : value,
    }));
  };

  const addBenefit = () => {
    if (benefitInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        benefits: [...prev.benefits, benefitInput],
      }));
      setBenefitInput("");
    }
  };

  const removeBenefit = (index) => {
    setFormData((prev) => ({
      ...prev,
      benefits: prev.benefits.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      setLoading(true);

      if (planId) {
        await updatePlan(planId, formData);
      } else {
        await addPlan(formData);
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
          {planId ? "Edit Skema Pembayaran" : "Tambah Skema Pembayaran Baru"}
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
            Jenis Pembayaran *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="mis. KPR, Cash, Transfer"
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
            placeholder="Deskripsi skema pembayaran..."
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-black mb-1">
              DP (%)
            </label>
            <input
              type="number"
              name="down_payment_percent"
              value={formData.down_payment_percent}
              onChange={handleInputChange}
              min="0"
              max="100"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Bunga (%)
            </label>
            <input
              type="number"
              name="interest_rate"
              value={formData.interest_rate}
              onChange={handleInputChange}
              min="0"
              max="100"
              step="0.1"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black mb-1">
              Periode (Bulan)
            </label>
            <input
              type="number"
              name="installation_period"
              value={formData.installation_period}
              onChange={handleInputChange}
              min="0"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Benefits List */}
        <div>
          <label className="block text-sm font-medium text-black mb-2">
            Keuntungan
          </label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={benefitInput}
              onChange={(e) => setBenefitInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addBenefit()}
              placeholder="Tambah keuntungan..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              type="button"
              onClick={addBenefit}
              className="px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300 transition"
            >
              Tambah
            </button>
          </div>

          <div className="space-y-2">
            {formData.benefits && formData.benefits.length > 0 ? (
              formData.benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 border border-gray-200 rounded"
                >
                  <span className="text-sm text-black">{benefit}</span>
                  <button
                    type="button"
                    onClick={() => removeBenefit(index)}
                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                  >
                    Hapus
                  </button>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">Belum ada keuntungan</p>
            )}
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
            {loading ? "Menyimpan..." : "Simpan Skema"}
          </button>
        </div>
      </form>
    </div>
  );
}
