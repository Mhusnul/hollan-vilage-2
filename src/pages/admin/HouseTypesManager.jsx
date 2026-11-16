import React, { useState, useEffect } from "react";
import {
  fetchHouseTypes,
  createHouseType,
  updateHouseType,
  deleteHouseType,
  uploadPropertyImage,
  PRESET_IMAGES,
  resolveImageUrl,
} from "../../utils/houseTypesService";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Upload,
  Eye,
  MoreHorizontal,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Home,
  CreditCard,
  Image as ImageIcon,
  ListChecks,
} from "lucide-react";

const EMPTY_FORM = {
  sortOrder: 1,
  name: "",
  badge: "",
  buildingArea: "",
  landArea: "",
  bedroom: 2,
  bathroom: 1,
  floor: 1,
  carport: 1,
  priceStartFrom: "",
  dpAmount: "",
  kprAmount: "",
  bookingFee: "",
  allInPrice: "",
  roomDetails: "",
  specificationText: "",
  imageUrlRaw: "preset:type-60-96",
  floorPlanUrlRaw: "preset:denah-60-96",
};

const BADGE_COLORS = [
  {
    bg: "bg-blue-50 text-blue-600",
    bar: "bg-blue-500",
    score: "text-blue-600",
  },
  {
    bg: "bg-emerald-50 text-emerald-600",
    bar: "bg-emerald-500",
    score: "text-emerald-600",
  },
  {
    bg: "bg-amber-50 text-amber-600",
    bar: "bg-amber-500",
    score: "text-amber-600",
  },
  {
    bg: "bg-purple-50 text-purple-600",
    bar: "bg-purple-500",
    score: "text-purple-600",
  },
];

const MODAL_TABS = [
  { id: "basic", label: "1. Info & Dimensi", icon: Home },
  { id: "pricing", label: "2. Harga & KPR", icon: CreditCard },
  { id: "media", label: "3. Visual & Spesifikasi", icon: ImageIcon },
];

export default function HouseTypesManager({
  searchQuery = "",
  triggerNewModal = 0,
  adminEmail = "Admin",
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showBanner, setShowBanner] = useState(true);

  // Dropdown menu state
  const [openMenuId, setOpenMenuId] = useState(null);

  // Detail preview modal
  const [detailUnit, setDetailUnit] = useState(null);

  // Add/Edit modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTab, setModalTab] = useState("basic");
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteConfirmUnit, setDeleteConfirmUnit] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const data = await fetchHouseTypes();
      setItems(data);
    } catch (err) {
      setErrorMsg(err.message || "Gagal memuat data tipe rumah dari Supabase.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (triggerNewModal > 0) {
      openCreateModal();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [triggerNewModal]);

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3500);
  };

  const openCreateModal = () => {
    setOpenMenuId(null);
    setEditingId(null);
    setErrorMsg("");
    setModalTab("basic");
    setForm({
      ...EMPTY_FORM,
      sortOrder: items.length + 1,
      specificationText:
        "Desain modern tropis 1 lantai\nGarasi 1 mobil dengan carport grass block\nPondasi: Tapak - Cakar Ayam\nStruktur: Beton Bertulang\nDinding: Bata Ringan, Plester & Cat\nLantai Utama: Granit 60x60\nAir Bersih: Sumur Bor & Listrik 1300 Watt",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setOpenMenuId(null);
    setEditingId(item.id);
    setErrorMsg("");
    setModalTab("basic");
    setForm({
      sortOrder: item.sortOrder ?? 1,
      name: item.name || "",
      badge: item.badge || "",
      buildingArea: item.buildingArea || "",
      landArea: item.landArea || "",
      bedroom: item.bedroom ?? 2,
      bathroom: item.bathroom ?? 1,
      floor: item.floor ?? 1,
      carport: item.carport ?? 1,
      priceStartFrom: item.priceStartFrom || "",
      dpAmount: item.dpAmount || "",
      kprAmount: item.kprAmount || "",
      bookingFee: item.bookingFee || "",
      allInPrice: item.allInPrice || "",
      roomDetails: item.roomDetails || "",
      specificationText: (item.specification || []).join("\n"),
      imageUrlRaw: item.imageUrlRaw || "preset:type-60-96",
      floorPlanUrlRaw: item.floorPlanUrlRaw || "preset:denah-60-96",
    });
    setIsModalOpen(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = async (e, targetField) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingField(targetField);
      setErrorMsg("");
      const publicUrl = await uploadPropertyImage(file, "house-types");
      setForm((prev) => ({
        ...prev,
        [targetField]: publicUrl,
      }));
    } catch (err) {
      setErrorMsg(
        `Gagal mengunggah gambar: ${err.message || "Terjadi kesalahan"}`
      );
    } finally {
      setUploadingField(null);
      e.target.value = "";
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!form.name.trim()) {
      setErrorMsg("Nama Tipe Rumah wajib diisi.");
      setModalTab("basic");
      return;
    }
    if (!form.buildingArea.trim() || !form.landArea.trim()) {
      setErrorMsg("Luas Bangunan (LB) dan Luas Tanah (LT) wajib diisi.");
      setModalTab("basic");
      return;
    }
    if (!form.priceStartFrom.trim()) {
      setErrorMsg("Harga Mulai Dari wajib diisi.");
      setModalTab("pricing");
      return;
    }

    const payload = {
      ...form,
      specification: form.specificationText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      setSaving(true);
      if (editingId) {
        await updateHouseType(editingId, payload);
        showSuccess(`Tipe rumah "${form.name}" berhasil diperbarui.`);
      } else {
        await createHouseType(payload);
        showSuccess(`Tipe rumah baru "${form.name}" berhasil ditambahkan.`);
      }
      setIsModalOpen(false);
      await loadData();
    } catch (err) {
      setErrorMsg(err.message || "Gagal menyimpan perubahan.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (unit) => {
    try {
      setErrorMsg("");
      await deleteHouseType(unit.id);
      setDeleteConfirmUnit(null);
      showSuccess(`Tipe rumah "${unit.name}" berhasil dihapus.`);
      await loadData();
    } catch (err) {
      setErrorMsg(err.message || "Gagal menghapus tipe rumah.");
    }
  };

  const filteredItems = items.filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.name?.toLowerCase().includes(q) ||
      item.badge?.toLowerCase().includes(q) ||
      item.priceStartFrom?.toLowerCase().includes(q) ||
      item.buildingArea?.toLowerCase().includes(q) ||
      item.landArea?.toLowerCase().includes(q)
    );
  });

  const adminName = adminEmail
    ? adminEmail.split("@")[0].replace(/[._-]/g, " ")
    : "Admin";

  return (
    <div
      className="space-y-6"
      onClick={() => {
        if (openMenuId !== null) setOpenMenuId(null);
      }}
    >
      {/* Top Welcome Hero Banner (Sinau Style) */}
      {showBanner && (
        <div className="relative rounded-2xl bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#1D4ED8] text-white p-6 sm:p-7 shadow-lg shadow-blue-500/15 overflow-hidden">
          <div className="pointer-events-none absolute -right-12 -bottom-16 w-72 h-72 rounded-full bg-white/10 blur-xl" />
          <div className="pointer-events-none absolute right-24 -top-20 w-56 h-56 rounded-full bg-blue-400/25 blur-lg" />
          <svg
            className="pointer-events-none absolute bottom-0 right-0 w-full h-24 opacity-15"
            viewBox="0 0 1440 320"
            preserveAspectRatio="none"
          >
            <path
              fill="#ffffff"
              d="M0,192L80,176C160,160,320,128,480,138.7C640,149,800,203,960,208C1120,213,1280,171,1360,149.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
            />
          </svg>

          <button
            onClick={() => setShowBanner(false)}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Tutup banner"
          >
            <X size={16} />
          </button>

          <div className="relative z-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-2 max-w-lg">
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight capitalize font-sans">
                Hi, {adminName}
              </h2>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                Holland Village CMS adalah panel kendali terpusat untuk
                mengelola tipe rumah, skema harga, spesifikasi unit, dan visual
                properti secara real-time.
              </p>
              <p className="text-[11px] text-blue-200 pt-1">
                *Terhubung langsung ke Supabase Database •{" "}
                <strong className="text-white">
                  {items.length} Tipe Hunian Aktif
                </strong>
              </p>
            </div>

            <button
              onClick={openCreateModal}
              className="self-start sm:self-end px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-semibold border border-white/25 transition-all cursor-pointer shrink-0 active:scale-95"
            >
              + Tambah Tipe Baru
            </button>
          </div>
        </div>
      )}

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

      {/* Middle 2-Column Widgets */}
      {loading ? (
        <div className="bg-white rounded-2xl p-12 shadow-xs border border-slate-100 flex flex-col items-center justify-center gap-3">
          <Loader2 size={26} className="animate-spin text-blue-600" />
          <p className="text-xs text-slate-500">
            Memuat data unit dari Supabase...
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {/* CARD 1: Tabel Ringkasan Tipe Rumah (Full Width) */}
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-100 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-base font-bold text-slate-800 font-sans">
                      Daftar Tipe & Harga Unit
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Kelola harga jual, dimensi bangunan/tanah, dan spesifikasi
                      unit.
                    </p>
                  </div>
                  <button
                    onClick={openCreateModal}
                    className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-xs font-semibold text-blue-600 inline-flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Plus size={14} />
                    <span>Tambah Unit</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        <th className="pb-3.5 pr-4">Tipe Unit</th>
                        <th className="pb-3.5 px-4">LB / LT</th>
                        <th className="pb-3.5 px-4">Kamar</th>
                        <th className="pb-3.5 px-4 text-right">Booking Fee</th>
                        <th className="pb-3.5 px-4 text-right">Harga Mulai</th>
                        <th className="pb-3.5 pl-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {filteredItems.map((unit) => (
                        <tr
                          key={unit.id}
                          className="group hover:bg-slate-50/80 transition-colors"
                        >
                          <td className="py-4 pr-4">
                            <p className="font-bold text-slate-800 text-sm">
                              {unit.name}
                            </p>
                            <span className="text-[11px] text-slate-400">
                              {unit.badge}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-slate-600 font-medium whitespace-nowrap">
                            {unit.buildingArea} / {unit.landArea}
                          </td>
                          <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                            {unit.bedroom} KT • {unit.bathroom} KM
                          </td>
                          <td className="py-4 px-4 text-right text-slate-600 font-medium whitespace-nowrap">
                            {unit.bookingFee || "-"}
                          </td>
                          <td className="py-4 px-4 text-right font-bold text-slate-800 whitespace-nowrap">
                            {unit.priceStartFrom}
                          </td>
                          <td className="py-4 pl-4 text-right whitespace-nowrap">
                            <div className="inline-flex items-center gap-1">
                              <button
                                onClick={() => setDetailUnit(unit)}
                                className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                                title="Lihat Detail"
                              >
                                <Eye size={15} />
                              </button>
                              <button
                                onClick={() => openEditModal(unit)}
                                className="p-2 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                                title="Edit Unit"
                              >
                                <Pencil size={15} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                <span>Menampilkan {filteredItems.length} tipe rumah</span>
                <span>Klik ikon pensil untuk mengubah data & harga</span>
              </div>
            </div>

            {/* CARD 2: Rincian KPR & All-In (Spacious 2-Column Grid) */}
            <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-100">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="text-base font-bold text-slate-800 font-sans">
                    Skema Biaya & KPR per Tipe
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Ringkasan biaya All-In, Booking Fee, dan estimasi DP setiap
                    unit.
                  </p>
                </div>
                <span className="text-[11px] font-medium text-slate-400">
                  All-In & DP 10%
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredItems.map((unit, idx) => {
                  const palette = BADGE_COLORS[idx % BADGE_COLORS.length];
                  const codeLabel =
                    unit.name.replace(/[^0-9]/g, "").slice(0, 2) || "H";
                  const specCount = unit.specification?.length || 0;
                  const progressWidth = Math.min(
                    100,
                    Math.max(45, specCount * 8)
                  );

                  return (
                    <div
                      key={unit.id}
                      className="flex items-center justify-between gap-3 p-3.5 rounded-xl bg-[#F5F7FB]/70 border border-slate-100 hover:bg-slate-50 transition-colors relative"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div
                          className={`w-10 h-10 rounded-xl font-bold text-xs flex items-center justify-center shrink-0 ${palette.bg}`}
                        >
                          {codeLabel}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-800 truncate">
                            {unit.name}
                          </p>
                          <p className="text-[11px] text-slate-400 truncate">
                            All-In: {unit.allInPrice || "-"} • BF:{" "}
                            {unit.bookingFee || "-"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <div className="text-right w-24">
                          <span
                            className={`text-xs font-bold block ${palette.score}`}
                          >
                            {unit.dpAmount || unit.priceStartFrom}
                          </span>
                          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mt-1">
                            <div
                              className={`h-full rounded-full ${palette.bar}`}
                              style={{ width: `${progressWidth}%` }}
                            />
                          </div>
                        </div>

                        {/* 3-Dot Action Menu Trigger */}
                        <div
                          className="relative"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            onClick={() =>
                              setOpenMenuId(
                                openMenuId === unit.id ? null : unit.id
                              )
                            }
                            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                          >
                            <MoreHorizontal size={16} />
                          </button>

                          {openMenuId === unit.id && (
                            <div className="absolute right-0 top-8 w-40 bg-white rounded-xl shadow-xl border border-slate-100 py-1.5 z-30 animate-fade-in">
                              <button
                                onClick={() => {
                                  setDetailUnit(unit);
                                  setOpenMenuId(null);
                                }}
                                className="w-full px-3.5 py-2 text-left text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2.5 cursor-pointer"
                              >
                                <Eye size={14} className="text-blue-600" />
                                <span>Show Detail</span>
                              </button>
                              <button
                                onClick={() => openEditModal(unit)}
                                className="w-full px-3.5 py-2 text-left text-xs font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-2.5 cursor-pointer"
                              >
                                <Pencil size={14} className="text-slate-400" />
                                <span>Edit Data Unit</span>
                              </button>
                              <button
                                onClick={() => {
                                  setDeleteConfirmUnit(unit);
                                  setOpenMenuId(null);
                                }}
                                className="w-full px-3.5 py-2 text-left text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2.5 cursor-pointer"
                              >
                                <Trash2 size={14} className="text-red-500" />
                                <span>Hapus Unit</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom Cards Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Visual Fasad Eksterior */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800 font-sans">
                  Katalog Fasad Unit
                </h3>
                <span className="text-[11px] text-slate-400">
                  Klik kartu untuk edit foto & spesifikasi
                </span>
              </div>

              <div className="space-y-3">
                {filteredItems.map((unit) => (
                  <div
                    key={`fasad-${unit.id}`}
                    onClick={() => openEditModal(unit)}
                    className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all flex items-center justify-between gap-4 cursor-pointer group"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <img
                        src={unit.image}
                        alt={unit.name}
                        className="w-14 h-12 rounded-xl object-cover border border-slate-100 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                          {unit.name} — {unit.priceStartFrom}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          LB {unit.buildingArea} • LT {unit.landArea} •{" "}
                          {unit.specification?.length || 0} Spesifikasi
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(unit);
                      }}
                      className="p-2 rounded-lg text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Visual Denah Tata Ruang */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800 font-sans">
                  Dokumen Denah Tata Ruang
                </h3>
                <span className="text-[11px] text-slate-400">
                  Floorplan & Dimensi Kaveling
                </span>
              </div>

              <div className="space-y-3">
                {filteredItems.map((unit) => (
                  <div
                    key={`denah-${unit.id}`}
                    onClick={() => setDetailUnit(unit)}
                    className="bg-white rounded-2xl p-4 shadow-xs border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all flex items-center justify-between gap-4 cursor-pointer group"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-14 h-12 rounded-xl bg-amber-50/70 border border-amber-100 p-1 flex items-center justify-center shrink-0">
                        <img
                          src={unit.floorPlan}
                          alt={`Denah ${unit.name}`}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-800 group-hover:text-blue-600 transition-colors truncate">
                          Denah {unit.name}
                        </p>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {unit.roomDetails ||
                            `${unit.bedroom} Kamar Tidur, ${unit.bathroom} Kamar Mandi`}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDetailUnit(unit);
                      }}
                      className="p-2 rounded-lg text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 transition-colors"
                    >
                      <Eye size={15} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}

      {/* DETAIL MODAL */}
      {detailUnit && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setDetailUnit(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-100 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 font-bold text-xs flex items-center justify-center">
                  <Home size={18} />
                </div>
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-blue-600 font-bold block">
                    {detailUnit.badge}
                  </span>
                  <h3 className="text-base font-bold text-slate-800 font-sans">
                    {detailUnit.name} — {detailUnit.priceStartFrom}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setDetailUnit(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl overflow-hidden border border-slate-100 bg-slate-50 h-44">
                  <img
                    src={detailUnit.image}
                    alt={detailUnit.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="rounded-2xl overflow-hidden border border-slate-100 bg-white h-44 p-2">
                  <img
                    src={detailUnit.floorPlan}
                    alt={`Denah ${detailUnit.name}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-3 text-center">
                <div className="p-3 rounded-xl bg-[#F5F7FB]">
                  <span className="text-[10px] text-slate-400 block">
                    Bangunan
                  </span>
                  <strong className="text-xs text-slate-800">
                    {detailUnit.buildingArea}
                  </strong>
                </div>
                <div className="p-3 rounded-xl bg-[#F5F7FB]">
                  <span className="text-[10px] text-slate-400 block">
                    Tanah
                  </span>
                  <strong className="text-xs text-slate-800">
                    {detailUnit.landArea}
                  </strong>
                </div>
                <div className="p-3 rounded-xl bg-[#F5F7FB]">
                  <span className="text-[10px] text-slate-400 block">
                    Booking Fee
                  </span>
                  <strong className="text-xs text-blue-600">
                    {detailUnit.bookingFee}
                  </strong>
                </div>
                <div className="p-3 rounded-xl bg-[#F5F7FB]">
                  <span className="text-[10px] text-slate-400 block">
                    Biaya All-In
                  </span>
                  <strong className="text-xs text-emerald-600">
                    {detailUnit.allInPrice}
                  </strong>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Spesifikasi Unit
                </h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {(detailUnit.specification || []).map((spec, i) => (
                    <div
                      key={i}
                      className="text-xs text-slate-600 flex items-start gap-2 bg-[#F5F7FB] px-3 py-2 rounded-lg"
                    >
                      <CheckCircle2
                        size={14}
                        className="text-blue-600 shrink-0 mt-0.5"
                      />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  onClick={() => {
                    const unit = detailUnit;
                    setDetailUnit(null);
                    openEditModal(unit);
                  }}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
                >
                  <Pencil size={14} />
                  <span>Edit Tipe Ini</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmUnit && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-fade-in">
            <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
              <Trash2 size={20} />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-800 font-sans">
                Hapus {deleteConfirmUnit.name}?
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Data tipe rumah ini akan dihapus permanen dari database Supabase
                dan halaman depan website.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setDeleteConfirmUnit(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmUnit)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold cursor-pointer"
              >
                Ya, Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= CLEAN REDESIGNED ADD / EDIT MODAL ================= */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-100 overflow-hidden animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Clean White Top Header */}
            <div className="px-6 pt-6 pb-4 bg-white border-b border-slate-100">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Home size={20} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-800 font-sans">
                      {editingId
                        ? `Edit Unit — ${form.name}`
                        : "Tambah Tipe Rumah Baru"}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Lengkapi informasi unit di bawah ini, lalu klik Simpan.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Clean Segmented Tab Bar */}
              <div className="grid grid-cols-3 gap-1.5 p-1 bg-[#F5F7FB] rounded-xl mt-5">
                {MODAL_TABS.map((tab) => {
                  const Icon = tab.icon;
                  const active = modalTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setModalTab(tab.id)}
                      className={`py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        active
                          ? "bg-white text-blue-600 shadow-xs"
                          : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      <Icon size={14} />
                      <span className="truncate">{tab.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Form Body (Symmetrical 2-Column Grids) */}
            <form
              onSubmit={handleSave}
              className="flex-1 overflow-y-auto flex flex-col justify-between"
            >
              <div className="p-6 space-y-5">
                {errorMsg && (
                  <div className="flex items-center gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium">
                    <AlertCircle size={16} className="shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                {/* TAB 1: INFO & DIMENSI */}
                {modalTab === "basic" && (
                  <div className="space-y-4">
                    {/* Row 1: Nama Tipe & Badge (2 Equal Columns) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Nama Tipe Rumah{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Contoh: Type 60/116"
                          className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Label Highlight / Badge
                        </label>
                        <input
                          type="text"
                          name="badge"
                          value={form.badge}
                          onChange={handleChange}
                          placeholder="Contoh: Favorit Keluarga"
                          className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 2: Luas Bangunan & Luas Tanah (2 Equal Columns) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Luas Bangunan (LB){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="buildingArea"
                          value={form.buildingArea}
                          onChange={handleChange}
                          placeholder="Contoh: 60 m²"
                          className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Luas Tanah (LT){" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          name="landArea"
                          value={form.landArea}
                          onChange={handleChange}
                          placeholder="Contoh: 96 m²"
                          className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 3: Kamar Tidur, Kamar Mandi, Urutan (3 Equal Columns) */}
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Kamar Tidur
                        </label>
                        <input
                          type="number"
                          name="bedroom"
                          min="1"
                          value={form.bedroom}
                          onChange={handleChange}
                          className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Kamar Mandi
                        </label>
                        <input
                          type="number"
                          name="bathroom"
                          min="1"
                          value={form.bathroom}
                          onChange={handleChange}
                          className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Urutan Tampil
                        </label>
                        <input
                          type="number"
                          name="sortOrder"
                          min="1"
                          value={form.sortOrder}
                          onChange={handleChange}
                          className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        />
                      </div>
                    </div>

                    {/* Row 4: Ringkasan Ruangan (Full Width) */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Deskripsi Singkat Tata Ruang
                      </label>
                      <input
                        type="text"
                        name="roomDetails"
                        value={form.roomDetails}
                        onChange={handleChange}
                        placeholder="Contoh: 3 Kamar Tidur, 2 Kamar Mandi, 1 Ruang Tamu, 1 Dapur"
                        className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                      />
                    </div>
                  </div>
                )}

                {/* TAB 2: HARGA & SKEMA KPR */}
                {modalTab === "pricing" && (
                  <div className="space-y-4">
                    {/* Highlighted Main Price Field */}
                    <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-100">
                      <label className="block text-xs font-bold text-blue-900 mb-1.5">
                        Harga Jual Mulai Dari{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="priceStartFrom"
                        value={form.priceStartFrom}
                        onChange={handleChange}
                        placeholder="Contoh: Rp 659.000.000"
                        className="w-full h-11 px-4 rounded-xl bg-white border border-blue-200 text-sm font-bold text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 transition-all"
                      />
                      <p className="text-[11px] text-slate-400 mt-1.5">
                        Ditampilkan sebagai harga utama pada kartu unit dan
                        tabel perbandingan.
                      </p>
                    </div>

                    {/* 2x2 Symmetrical Grid for Booking Fee, All-In, DP, KPR */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Nominal Booking Fee
                        </label>
                        <input
                          type="text"
                          name="bookingFee"
                          value={form.bookingFee}
                          onChange={handleChange}
                          placeholder="Contoh: Rp 2.500.000"
                          className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Biaya All-In (Sampai Terima Kunci)
                        </label>
                        <input
                          type="text"
                          name="allInPrice"
                          value={form.allInPrice}
                          onChange={handleChange}
                          placeholder="Contoh: Rp 5.000.000"
                          className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Estimasi DP (10%)
                        </label>
                        <input
                          type="text"
                          name="dpAmount"
                          value={form.dpAmount}
                          onChange={handleChange}
                          placeholder="Contoh: Rp 65.900.000"
                          className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                          Estimasi Plafon KPR
                        </label>
                        <input
                          type="text"
                          name="kprAmount"
                          value={form.kprAmount}
                          onChange={handleChange}
                          placeholder="Contoh: Rp 588.100.000"
                          className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* TAB 3: VISUAL & SPESIFIKASI */}
                {modalTab === "media" && (
                  <div className="space-y-4">
                    {/* 2 Equal Columns for Fasad & Denah */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Fasad Card */}
                      <div className="p-3.5 rounded-2xl bg-[#F5F7FB] border border-slate-200/70 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-700">
                            Foto Fasad Rumah
                          </span>
                          <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold cursor-pointer transition-colors">
                            {uploadingField === "imageUrlRaw" ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : (
                              <Upload size={12} />
                            )}
                            <span>Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(e, "imageUrlRaw")
                              }
                            />
                          </label>
                        </div>

                        <div className="h-32 rounded-xl overflow-hidden bg-white border border-slate-200/80">
                          <img
                            src={resolveImageUrl(form.imageUrlRaw)}
                            alt="Preview Fasad"
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <select
                          value={
                            PRESET_IMAGES[form.imageUrlRaw]
                              ? form.imageUrlRaw
                              : "custom"
                          }
                          onChange={(e) => {
                            if (e.target.value !== "custom") {
                              setForm((p) => ({
                                ...p,
                                imageUrlRaw: e.target.value,
                              }));
                            }
                          }}
                          className="w-full h-9 px-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
                        >
                          <option value="preset:type-60-96">
                            Default Fasad Type 60
                          </option>
                          <option value="preset:type-45-72">
                            Default Fasad Type 45/72
                          </option>
                          <option value="preset:type-36-72">
                            Default Fasad Type 36/72
                          </option>
                          {!PRESET_IMAGES[form.imageUrlRaw] && (
                            <option value="custom">
                              Foto Custom (Terupload)
                            </option>
                          )}
                        </select>
                      </div>

                      {/* Denah Card */}
                      <div className="p-3.5 rounded-2xl bg-[#F5F7FB] border border-slate-200/70 space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-700">
                            Gambar Denah Unit
                          </span>
                          <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold cursor-pointer transition-colors">
                            {uploadingField === "floorPlanUrlRaw" ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : (
                              <Upload size={12} />
                            )}
                            <span>Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(e, "floorPlanUrlRaw")
                              }
                            />
                          </label>
                        </div>

                        <div className="h-32 rounded-xl overflow-hidden bg-white border border-slate-200/80">
                          <img
                            src={resolveImageUrl(form.floorPlanUrlRaw)}
                            alt="Preview Denah"
                            className="w-full h-full object-contain p-1.5"
                          />
                        </div>

                        <select
                          value={
                            PRESET_IMAGES[form.floorPlanUrlRaw]
                              ? form.floorPlanUrlRaw
                              : "custom"
                          }
                          onChange={(e) => {
                            if (e.target.value !== "custom") {
                              setForm((p) => ({
                                ...p,
                                floorPlanUrlRaw: e.target.value,
                              }));
                            }
                          }}
                          className="w-full h-9 px-2.5 rounded-lg bg-white border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
                        >
                          <option value="preset:denah-60-116">
                            Default Denah Type 60/116
                          </option>
                          <option value="preset:denah-60-96">
                            Default Denah Type 60/96
                          </option>
                          <option value="preset:denah-45-72">
                            Default Denah Type 45/72
                          </option>
                          <option value="preset:denah-36-72">
                            Default Denah Type 36/72
                          </option>
                          {!PRESET_IMAGES[form.floorPlanUrlRaw] && (
                            <option value="custom">
                              Denah Custom (Terupload)
                            </option>
                          )}
                        </select>
                      </div>
                    </div>

                    {/* Specification List */}
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                          <ListChecks size={14} className="text-blue-600" />
                          <span>Daftar Spesifikasi & Keunggulan</span>
                        </label>
                        <span className="text-[11px] text-slate-400">
                          1 baris = 1 poin spesifikasi
                        </span>
                      </div>
                      <textarea
                        name="specificationText"
                        rows={4}
                        value={form.specificationText}
                        onChange={handleChange}
                        placeholder="Tulis satu poin spesifikasi per baris..."
                        className="w-full p-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white leading-relaxed transition-all"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Clean Sticky Footer */}
              <div className="px-6 py-4 bg-[#F5F7FB] border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  {modalTab !== "basic" && (
                    <button
                      type="button"
                      onClick={() =>
                        setModalTab(modalTab === "media" ? "pricing" : "basic")
                      }
                      className="px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                    >
                      ← Sebelumnya
                    </button>
                  )}
                  {modalTab !== "media" && (
                    <button
                      type="button"
                      onClick={() =>
                        setModalTab(modalTab === "basic" ? "pricing" : "media")
                      }
                      className="px-3.5 py-2 rounded-xl bg-blue-50 text-blue-600 text-xs font-semibold hover:bg-blue-100 cursor-pointer"
                    >
                      Selanjutnya →
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    disabled={saving || Boolean(uploadingField)}
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white text-xs font-semibold shadow-sm shadow-blue-600/20 transition-all cursor-pointer"
                  >
                    {saving ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        <span>Menyimpan...</span>
                      </>
                    ) : (
                      <>
                        <Save size={14} />
                        <span>Simpan Unit</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
