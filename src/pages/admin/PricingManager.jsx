import React, { useState, useEffect } from "react";
import {
  fetchPricingSettings,
  updatePricingSettings,
} from "../../utils/pricingService";
import {
  Tag,
  CreditCard,
  FileCheck2,
  Landmark,
  Save,
  Plus,
  Trash2,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from "lucide-react";

const TABS = [
  { id: "promo", label: "1. Highlight & Promo", icon: Tag },
  { id: "schemes", label: "2. Skema Pembayaran", icon: CreditCard },
  { id: "docs", label: "3. Syarat KPR & Rekening", icon: Landmark },
];

export default function PricingManager() {
  const [activeTab, setActiveTab] = useState("promo");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [form, setForm] = useState({
    startingPrice: "",
    minimalDP: "",
    bookingFeeStart: "",
    allInStart: "",
    kprInterestRate: "",
    promo: [],
    paymentScheme: [],
    persyaratanText: "",
    warningPembatalan: "",
    bankTransfer: {
      bank: "",
      accountNumber: "",
      accountName: "",
    },
  });

  const [newPromoText, setNewPromoText] = useState("");

  const loadSettings = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const data = await fetchPricingSettings();
      setForm({
        startingPrice: data.startingPrice || "",
        minimalDP: data.minimalDP || "",
        bookingFeeStart: data.bookingFeeStart || "",
        allInStart: data.allInStart || "",
        kprInterestRate: data.kprInterestRate || "",
        promo: Array.isArray(data.promo) ? data.promo : [],
        paymentScheme: Array.isArray(data.paymentScheme)
          ? data.paymentScheme
          : [],
        persyaratanText: (data.persyaratanKaryawan || []).join("\n"),
        warningPembatalan: data.warningPembatalan || "",
        bankTransfer: {
          bank: data.bankTransfer?.bank || "",
          accountNumber: data.bankTransfer?.accountNumber || "",
          accountName: data.bankTransfer?.accountName || "",
        },
      });
    } catch (err) {
      setErrorMsg(err.message || "Gagal memuat pengaturan Harga & Promo.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBankChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      bankTransfer: {
        ...prev.bankTransfer,
        [name]: value,
      },
    }));
  };

  // Promo array helpers
  const handlePromoItemChange = (index, value) => {
    setForm((prev) => {
      const updated = [...prev.promo];
      updated[index] = value;
      return { ...prev, promo: updated };
    });
  };

  const handleAddPromoItem = () => {
    if (!newPromoText.trim()) return;
    setForm((prev) => ({
      ...prev,
      promo: [...prev.promo, newPromoText.trim()],
    }));
    setNewPromoText("");
  };

  const handleRemovePromoItem = (index) => {
    setForm((prev) => ({
      ...prev,
      promo: prev.promo.filter((_, i) => i !== index),
    }));
  };

  // Payment Scheme helpers
  const handleSchemeChange = (index, field, value) => {
    setForm((prev) => {
      const updated = prev.paymentScheme.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      );
      return { ...prev, paymentScheme: updated };
    });
  };

  const handleAddScheme = () => {
    setForm((prev) => ({
      ...prev,
      paymentScheme: [
        ...prev.paymentScheme,
        {
          type: "Skema Baru",
          discount: "Promo Spesial",
          description: "Deskripsi kemudahan pembayaran...",
        },
      ],
    }));
  };

  const handleRemoveScheme = (index) => {
    setForm((prev) => ({
      ...prev,
      paymentScheme: prev.paymentScheme.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      setSaving(true);
      await updatePricingSettings({
        ...form,
        persyaratanKaryawan: form.persyaratanText
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
      });
      setSuccessMsg(
        "Pengaturan Harga, Promo & Skema Pembayaran berhasil disimpan!"
      );
      setTimeout(() => setSuccessMsg(""), 3500);
    } catch (err) {
      setErrorMsg(err.message || "Gagal menyimpan pengaturan.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-12 shadow-xs border border-slate-100 flex flex-col items-center justify-center gap-3">
        <Loader2 size={26} className="animate-spin text-blue-600" />
        <p className="text-xs text-slate-500">
          Memuat data Harga & Promo dari Supabase...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Top Banner (Sinau Style) */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#1D4ED8] text-white p-6 sm:p-7 shadow-lg shadow-blue-500/15 overflow-hidden">
        <div className="pointer-events-none absolute -right-12 -bottom-16 w-72 h-72 rounded-full bg-white/10 blur-xl" />
        <div className="pointer-events-none absolute right-24 -top-20 w-56 h-56 rounded-full bg-blue-400/25 blur-lg" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-[11px] font-semibold text-blue-100">
              <Sparkles size={12} />
              <span>Modul 2 • Penawaran & KPR</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight font-sans">
              Manajemen Harga, Promo & Skema Bayar
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Kelola penawaran utama, daftar promo aktif, suku bunga KPR, syarat
              dokumen, dan rekening resmi developer.
            </p>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="self-start sm:self-center inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white text-blue-600 hover:bg-blue-50 disabled:opacity-70 text-xs font-bold shadow-md transition-all cursor-pointer shrink-0 active:scale-95"
          >
            {saving ? (
              <>
                <Loader2 size={15} className="animate-spin" />
                <span>Menyimpan...</span>
              </>
            ) : (
              <>
                <Save size={15} />
                <span>Simpan Semua Perubahan</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Feedback Alerts */}
      {successMsg && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-medium animate-fade-in">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium">
          <AlertCircle size={18} className="text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Segmented Navigation Tabs */}
      <div className="bg-white rounded-2xl p-2 shadow-xs border border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-1.5">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                active
                  ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              <Icon size={15} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ================= TAB 1: HIGHLIGHT HARGA & DAFTAR PROMO ================= */}
      {activeTab === "promo" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Card: Highlight Angka Utama (Symmetrical 2-Column Grid) */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 shadow-xs border border-slate-100 space-y-5">
            <div>
              <h3 className="text-base font-bold text-slate-800 font-sans">
                Highlight Penawaran Utama
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Angka utama yang tampil pada banner Harga & Promo di halaman
                depan.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Harga Perdana Mulai Dari
                </label>
                <input
                  type="text"
                  name="startingPrice"
                  value={form.startingPrice}
                  onChange={handleFieldChange}
                  placeholder="Contoh: Rp 419.000.000"
                  className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Booking Fee Mulai Dari
                  </label>
                  <input
                    type="text"
                    name="bookingFeeStart"
                    value={form.bookingFeeStart}
                    onChange={handleFieldChange}
                    placeholder="Contoh: Rp 1.000.000"
                    className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Biaya All-In Mulai Dari
                  </label>
                  <input
                    type="text"
                    name="allInStart"
                    value={form.allInStart}
                    onChange={handleFieldChange}
                    placeholder="Contoh: Rp 2.500.000"
                    className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    DP KPR Minimal
                  </label>
                  <input
                    type="text"
                    name="minimalDP"
                    value={form.minimalDP}
                    onChange={handleFieldChange}
                    placeholder="Contoh: 10% (Mulai Rp 41,9 Juta)"
                    className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Suku Bunga KPR
                  </label>
                  <input
                    type="text"
                    name="kprInterestRate"
                    value={form.kprInterestRate}
                    onChange={handleFieldChange}
                    placeholder="Contoh: 5.99% Fixed 1 Tahun"
                    className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Card: Daftar Poin Promo Spesial */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 shadow-xs border border-slate-100 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-800 font-sans">
                  Daftar Poin Promo Aktif
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Item promo yang ditampilkan dengan ikon centang di banner
                  Promo Spesial.
                </p>
              </div>

              {/* List of Promo Items */}
              <div className="space-y-2.5">
                {form.promo.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handlePromoItemChange(idx, e.target.value)
                      }
                      className="flex-1 h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemovePromoItem(idx)}
                      className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Hapus promo"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Add New Promo Input */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-2">
              <input
                type="text"
                value={newPromoText}
                onChange={(e) => setNewPromoText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleAddPromoItem();
                  }
                }}
                placeholder="Tambah promo baru (misal: FREE KANOPY)..."
                className="flex-1 h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
              <button
                type="button"
                onClick={handleAddPromoItem}
                className="h-10 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shrink-0"
              >
                <Plus size={14} />
                <span>Tambah</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: 3 SKEMA PEMBAYARAN ================= */}
      {activeTab === "schemes" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-800 font-sans">
                Kartu Skema Pembayaran
              </h3>
              <p className="text-xs text-slate-400">
                Pilihan metode bayar yang tampil di bawah banner promo (KPR
                Bank, Cash Keras, Cash Bertahap).
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddScheme}
              className="px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
            >
              <Plus size={14} />
              <span>Tambah Skema</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {form.paymentScheme.map((scheme, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-xs border border-slate-100 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-600 font-bold text-xs">
                      Skema #{idx + 1}
                    </span>
                    {form.paymentScheme.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveScheme(idx)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                        title="Hapus Skema"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Nama Skema Pembayaran
                    </label>
                    <input
                      type="text"
                      value={scheme.type}
                      onChange={(e) =>
                        handleSchemeChange(idx, "type", e.target.value)
                      }
                      placeholder="Contoh: KPR Bank"
                      className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Badge Keunggulan / Diskon
                    </label>
                    <input
                      type="text"
                      value={scheme.discount}
                      onChange={(e) =>
                        handleSchemeChange(idx, "discount", e.target.value)
                      }
                      placeholder="Contoh: Bunga 5.99% Fixed 1 Thn"
                      className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-medium text-blue-600 focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Deskripsi Penjelasan
                    </label>
                    <textarea
                      rows={3}
                      value={scheme.description}
                      onChange={(e) =>
                        handleSchemeChange(idx, "description", e.target.value)
                      }
                      className="w-full p-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs text-slate-700 leading-relaxed focus:outline-none focus:border-blue-500 focus:bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 3: SYARAT KPR & REKENING RESMI ================= */}
      {activeTab === "docs" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Card: Rekening Resmi & Ketentuan Pembatalan */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 shadow-xs border border-slate-100 space-y-5">
            <div>
              <h3 className="text-base font-bold text-slate-800 font-sans">
                Rekening Resmi Developer & Ketentuan
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Informasi tujuan transfer Booking Fee / DP dan catatan
                pembatalan.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Nama Bank Mitra
                  </label>
                  <input
                    type="text"
                    name="bank"
                    value={form.bankTransfer.bank}
                    onChange={handleBankChange}
                    placeholder="Contoh: Bank BTN"
                    className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Atas Nama Rekening
                  </label>
                  <input
                    type="text"
                    name="accountName"
                    value={form.bankTransfer.accountName}
                    onChange={handleBankChange}
                    placeholder="PT. PUSPA AGRA PROPERTI"
                    className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Nomor Rekening Resmi
                </label>
                <input
                  type="text"
                  name="accountNumber"
                  value={form.bankTransfer.accountNumber}
                  onChange={handleBankChange}
                  placeholder="000-000-000-000-000-000"
                  className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-bold text-slate-800 tracking-wide focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Ketentuan Booking & Peringatan Pembatalan
                </label>
                <textarea
                  name="warningPembatalan"
                  rows={4}
                  value={form.warningPembatalan}
                  onChange={handleFieldChange}
                  className="w-full p-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs text-slate-700 leading-relaxed focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Right Card: Persyaratan Dokumen KPR */}
          <div className="lg:col-span-6 bg-white rounded-2xl p-6 shadow-xs border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-800 font-sans">
                  Persyaratan Dokumen Pengajuan KPR
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Tulis satu dokumen persyaratan per baris.
                </p>
              </div>
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <FileCheck2 size={18} />
              </div>
            </div>

            <textarea
              name="persyaratanText"
              rows={10}
              value={form.persyaratanText}
              onChange={handleFieldChange}
              placeholder="KTP Suami & Istri&#10;Kartu Keluarga (KK)&#10;NPWP Pribadi..."
              className="w-full p-4 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-medium text-slate-800 leading-relaxed focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>
        </div>
      )}

      {/* Bottom Sticky Action Bar */}
      <div className="bg-white rounded-2xl px-6 py-4 shadow-xs border border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          Perubahan akan langsung tampil di bagian Harga & Promo halaman utama.
        </span>
        <button
          type="submit"
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-semibold shadow-sm shadow-blue-600/20 transition-all cursor-pointer"
        >
          {saving ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              <span>Menyimpan...</span>
            </>
          ) : (
            <>
              <Save size={15} />
              <span>Simpan Perubahan</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
