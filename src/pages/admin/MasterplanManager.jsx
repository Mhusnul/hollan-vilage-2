import React, { useState, useEffect } from "react";
import {
  fetchUnitBlocks,
  createUnitBlock,
  updateUnitBlock,
  deleteUnitBlock,
  BLOCK_STATUSES,
} from "../../utils/unitBlocksService";
import {
  Map,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Minus,
} from "lucide-react";

const STATUS_STYLE = {
  Tersedia: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Terbatas: "bg-amber-50 text-amber-700 border-amber-200",
  "Sold Out": "bg-red-50 text-red-600 border-red-200",
};

const EMPTY_FORM = {
  sortOrder: 1,
  block: "",
  landArea: "60/96",
  unit: 1,
  availableUnits: 1,
  luasUnit: "",
  status: "Tersedia",
};

export default function MasterplanManager({ searchQuery = "" }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const data = await fetchUnitBlocks();
      setItems(data);
    } catch (err) {
      setErrorMsg(
        err.message || "Gagal memuat data blok masterplan dari Supabase."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const openCreateModal = () => {
    setEditingId(null);
    setErrorMsg("");
    setForm({
      ...EMPTY_FORM,
      sortOrder: items.length + 1,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingId(item.id);
    setErrorMsg("");
    setForm({
      sortOrder: item.sortOrder ?? 1,
      block: item.block || "",
      landArea: item.landArea || "60/96",
      unit: item.unit ?? 0,
      availableUnits: item.availableUnits ?? 0,
      luasUnit: item.luasUnit || "",
      status: item.status || "Tersedia",
    });
    setIsModalOpen(true);
  };

  const handleQuickAdjust = async (item, delta) => {
    const nextAvail = Math.max(
      0,
      Math.min(item.unit, (item.availableUnits ?? 0) + delta)
    );
    const nextStatus =
      nextAvail === 0
        ? "Sold Out"
        : nextAvail <= Math.max(2, Math.floor(item.unit * 0.25))
        ? "Terbatas"
        : "Tersedia";

    try {
      setErrorMsg("");
      const updated = await updateUnitBlock(item.id, {
        ...item,
        availableUnits: nextAvail,
        status: nextStatus,
      });
      setItems((prev) => prev.map((b) => (b.id === item.id ? updated : b)));
      showSuccess(
        `Stok Blok ${item.block} (${item.landArea}) diperbarui: ${nextAvail} unit tersedia.`
      );
    } catch (err) {
      setErrorMsg(err.message || "Gagal memperbarui ketersediaan unit.");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!form.block.trim() || !form.landArea.trim()) {
      setErrorMsg("Nama Blok dan Tipe (LB/LT) wajib diisi.");
      return;
    }

    try {
      setSaving(true);
      if (editingId) {
        await updateUnitBlock(editingId, form);
        showSuccess(`Blok ${form.block} berhasil diperbarui.`);
      } else {
        await createUnitBlock(form);
        showSuccess(`Blok ${form.block} berhasil ditambahkan.`);
      }
      setIsModalOpen(false);
      await loadData();
    } catch (err) {
      setErrorMsg(err.message || "Gagal menyimpan data blok.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (item) => {
    try {
      setErrorMsg("");
      await deleteUnitBlock(item.id);
      setDeleteConfirm(null);
      showSuccess(`Blok ${item.block} (${item.landArea}) berhasil dihapus.`);
      await loadData();
    } catch (err) {
      setErrorMsg(err.message || "Gagal menghapus blok.");
    }
  };

  const totalUnits = items.reduce((sum, i) => sum + (i.unit || 0), 0);
  const totalAvailable = items.reduce(
    (sum, i) => sum + (i.availableUnits || 0),
    0
  );
  const totalSold = Math.max(0, totalUnits - totalAvailable);

  const uniqueTypes = ["ALL", ...new Set(items.map((i) => i.landArea))];

  const filteredItems = items.filter((item) => {
    if (typeFilter !== "ALL" && item.landArea !== typeFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.block?.toLowerCase().includes(q) ||
      item.landArea?.toLowerCase().includes(q) ||
      item.status?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#1D4ED8] text-white p-6 sm:p-7 shadow-lg shadow-blue-500/15 overflow-hidden">
        <div className="pointer-events-none absolute -right-12 -bottom-16 w-72 h-72 rounded-full bg-white/10 blur-xl" />
        <div className="pointer-events-none absolute right-24 -top-20 w-56 h-56 rounded-full bg-blue-400/25 blur-lg" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-[11px] font-semibold text-blue-100">
              <Map size={12} />
              <span>Modul 4 • Masterplan & Ketersediaan Blok</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight font-sans">
              Distribusi Blok A–L & Stok Unit
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Kelola jumlah unit tersedia di setiap blok dan sinkronkan langsung
              dengan tabel Masterplan pada halaman depan website.
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="self-start sm:self-center inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-blue-600 hover:bg-blue-50 text-xs font-bold shadow-md transition-all cursor-pointer shrink-0 active:scale-95"
          >
            <Plus size={15} />
            <span>Tambah Blok</span>
          </button>
        </div>

        {/* Summary Stats */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-white/15">
          <div className="bg-white/10 backdrop-blur-xs rounded-xl px-4 py-2.5">
            <span className="text-[11px] text-blue-100 block">
              Total Kapasitas
            </span>
            <strong className="text-lg font-bold">{totalUnits} Unit</strong>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-xl px-4 py-2.5">
            <span className="text-[11px] text-blue-100 block">
              Unit Tersedia
            </span>
            <strong className="text-lg font-bold">{totalAvailable} Unit</strong>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-xl px-4 py-2.5">
            <span className="text-[11px] text-blue-100 block">
              Terjual / Booking
            </span>
            <strong className="text-lg font-bold">{totalSold} Unit</strong>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-xl px-4 py-2.5">
            <span className="text-[11px] text-blue-100 block">
              Kelompok Blok
            </span>
            <strong className="text-lg font-bold">{items.length} Baris</strong>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {successMsg && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-medium animate-fade-in">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && !isModalOpen && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium">
          <AlertCircle size={18} className="text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Filter Pills */}
      <div className="bg-white rounded-2xl p-2 shadow-xs border border-slate-100 flex flex-wrap gap-1.5">
        {uniqueTypes.map((tf) => {
          const active = typeFilter === tf;
          return (
            <button
              key={tf}
              onClick={() => setTypeFilter(tf)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                active
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              {tf === "ALL" ? "Semua Tipe" : `Tipe ${tf}`}
            </button>
          );
        })}
      </div>

      {/* Blocks Table */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-100">
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3">
            <Loader2 size={26} className="animate-spin text-blue-600" />
            <p className="text-xs text-slate-500">
              Memuat data masterplan dari Supabase...
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 pr-2">Blok</th>
                  <th className="pb-3 px-2">Tipe (LB/LT)</th>
                  <th className="pb-3 px-2 text-center">Kapasitas</th>
                  <th className="pb-3 px-2 text-center">Unit Tersedia</th>
                  <th className="pb-3 px-2 text-right">Luas Total</th>
                  <th className="pb-3 px-2 text-center">Status</th>
                  <th className="pb-3 pl-2 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredItems.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3 pr-2">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-blue-50 text-blue-600 font-bold">
                        {item.block}
                      </span>
                    </td>
                    <td className="py-3 px-2 font-bold text-slate-800 whitespace-nowrap">
                      Type {item.landArea}
                    </td>
                    <td className="py-3 px-2 text-center text-slate-500 font-semibold whitespace-nowrap">
                      {item.unit} Unit
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleQuickAdjust(item, -1)}
                          disabled={item.availableUnits <= 0}
                          className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 flex items-center justify-center cursor-pointer"
                          title="Kurangi unit tersedia"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="font-bold text-slate-800 w-10 text-center">
                          {item.availableUnits}
                        </span>
                        <button
                          onClick={() => handleQuickAdjust(item, 1)}
                          disabled={item.availableUnits >= item.unit}
                          className="w-6 h-6 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40 text-slate-700 flex items-center justify-center cursor-pointer"
                          title="Tambah unit tersedia"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-right text-slate-500 whitespace-nowrap">
                      {item.luasUnit} m²
                    </td>
                    <td className="py-3 px-2 text-center whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold ${
                          STATUS_STYLE[item.status] || STATUS_STYLE.Tersedia
                        }`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 pl-2 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                          title="Edit Blok"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(item)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Hapus Blok"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD / EDIT MODAL */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Map size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800 font-sans">
                    {editingId
                      ? `Edit Blok ${form.block}`
                      : "Tambah Kelompok Blok Baru"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Atur detail blok, kapasitas, dan stok tersedia.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                  {errorMsg}
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Kode Blok *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.block}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, block: e.target.value }))
                    }
                    placeholder="Contoh: A"
                    className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-bold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Tipe (LB/LT) *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.landArea}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, landArea: e.target.value }))
                    }
                    placeholder="Contoh: 60/96"
                    className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Total Kapasitas Unit
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.unit}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, unit: Number(e.target.value) }))
                    }
                    className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Unit Tersedia
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.availableUnits}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        availableUnits: Number(e.target.value),
                      }))
                    }
                    className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Total Luas (m²)
                  </label>
                  <input
                    type="text"
                    value={form.luasUnit}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, luasUnit: e.target.value }))
                    }
                    placeholder="Contoh: 1.920,00"
                    className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Status Ketersediaan
                  </label>
                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, status: e.target.value }))
                    }
                    className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                  >
                    {BLOCK_STATUSES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer"
                >
                  {saving ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Save size={14} />
                  )}
                  <span>Simpan Blok</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-fade-in">
            <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
              <Trash2 size={20} />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-800 font-sans">
                Hapus Blok {deleteConfirm.block} ({deleteConfirm.landArea})?
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Data blok ini akan dihapus dari database Supabase dan tabel
                Masterplan.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold cursor-pointer"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
