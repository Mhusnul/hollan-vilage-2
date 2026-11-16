import React, { useState, useEffect } from "react";
import {
  fetchGalleryItems,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  fetchFacilities,
  createFacility,
  updateFacility,
  deleteFacility,
  MEDIA_PRESETS,
  resolveMediaUrl,
} from "../../utils/galleryFacilitiesService";
import { uploadPropertyImage } from "../../utils/houseTypesService";
import {
  Image as ImageIcon,
  Trees,
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  Upload,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

const GALLERY_CATEGORIES = [
  { value: "house", label: "Fasad Rumah" },
  { value: "floorplan", label: "Denah Ruang" },
  { value: "facility", label: "Fasilitas Kawasan" },
];

const FACILITY_ICONS = [
  { value: "lock", label: "Keamanan (Lock)" },
  { value: "door", label: "Gerbang (Door)" },
  { value: "building", label: "Bangunan / Masjid" },
  { value: "zap", label: "Taman & RTH" },
  { value: "run", label: "Jogging Track" },
  { value: "shopping", label: "Area Komersial" },
];

export default function GalleryFacilitiesManager({ searchQuery = "" }) {
  const [subTab, setSubTab] = useState("gallery"); // "gallery" | "facilities"
  const [galleryItems, setGalleryItems] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [catFilter, setCatFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Modal state
  const [modalMode, setModalMode] = useState(null); // "gallery" | "facility" | null
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({});
  const [deleteTarget, setDeleteTarget] = useState(null); // { type, item }

  const loadAll = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const [gData, fData] = await Promise.all([
        fetchGalleryItems(),
        fetchFacilities(),
      ]);
      setGalleryItems(gData);
      setFacilities(fData);
    } catch (err) {
      setErrorMsg(
        err.message || "Gagal memuat data Galeri & Fasilitas dari Supabase."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3500);
  };

  const openGalleryModal = (item = null) => {
    setErrorMsg("");
    if (item) {
      setEditingId(item.id);
      setForm({
        sortOrder: item.sortOrder ?? 1,
        title: item.title || "",
        category: item.category || "house",
        description: item.description || "",
        imageUrlRaw: item.imageUrlRaw || "preset:galeri-type60",
      });
    } else {
      setEditingId(null);
      setForm({
        sortOrder: galleryItems.length + 1,
        title: "",
        category: "house",
        description: "",
        imageUrlRaw: "preset:galeri-type60",
      });
    }
    setModalMode("gallery");
  };

  const openFacilityModal = (item = null) => {
    setErrorMsg("");
    if (item) {
      setEditingId(item.id);
      setForm({
        sortOrder: item.sortOrder ?? 1,
        name: item.name || "",
        icon: item.icon || "building",
        description: item.description || "",
        imageUrlRaw: item.imageUrlRaw || "preset:fasilitas-security",
      });
    } else {
      setEditingId(null);
      setForm({
        sortOrder: facilities.length + 1,
        name: "",
        icon: "building",
        description: "",
        imageUrlRaw: "preset:fasilitas-security",
      });
    }
    setModalMode("facility");
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      setErrorMsg("");
      const folder = modalMode === "facility" ? "facilities" : "gallery";
      const publicUrl = await uploadPropertyImage(file, folder);
      setForm((prev) => ({ ...prev, imageUrlRaw: publicUrl }));
    } catch (err) {
      setErrorMsg(err.message || "Gagal mengunggah gambar.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      setSaving(true);
      if (modalMode === "gallery") {
        if (!form.title?.trim()) {
          setErrorMsg("Judul foto galeri wajib diisi.");
          return;
        }
        if (editingId) {
          await updateGalleryItem(editingId, form);
          showSuccess(`Foto "${form.title}" berhasil diperbarui.`);
        } else {
          await createGalleryItem(form);
          showSuccess(`Foto "${form.title}" berhasil ditambahkan.`);
        }
      } else if (modalMode === "facility") {
        if (!form.name?.trim()) {
          setErrorMsg("Nama fasilitas wajib diisi.");
          return;
        }
        if (editingId) {
          await updateFacility(editingId, form);
          showSuccess(`Fasilitas "${form.name}" berhasil diperbarui.`);
        } else {
          await createFacility(form);
          showSuccess(`Fasilitas "${form.name}" berhasil ditambahkan.`);
        }
      }
      setModalMode(null);
      await loadAll();
    } catch (err) {
      setErrorMsg(err.message || "Gagal menyimpan data.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      setErrorMsg("");
      if (deleteTarget.type === "gallery") {
        await deleteGalleryItem(deleteTarget.item.id);
        showSuccess(`Foto "${deleteTarget.item.title}" berhasil dihapus.`);
      } else {
        await deleteFacility(deleteTarget.item.id);
        showSuccess(`Fasilitas "${deleteTarget.item.name}" berhasil dihapus.`);
      }
      setDeleteTarget(null);
      await loadAll();
    } catch (err) {
      setErrorMsg(err.message || "Gagal menghapus item.");
    }
  };

  const q = searchQuery.toLowerCase().trim();

  const filteredGallery = galleryItems.filter((item) => {
    if (catFilter !== "all" && item.category !== catFilter) return false;
    if (!q) return true;
    return (
      item.title?.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q)
    );
  });

  const filteredFacilities = facilities.filter((item) => {
    if (!q) return true;
    return (
      item.name?.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q)
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
              <ImageIcon size={12} />
              <span>Modul 5 • Galeri & Fasilitas Kawasan</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight font-sans">
              Manajemen Galeri & Fasilitas
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Unggah foto progres pembangunan, fasad rumah, denah, dan kelola
              daftar fasilitas internal Holland Village Sukabumi.
            </p>
          </div>

          <button
            onClick={() =>
              subTab === "gallery" ? openGalleryModal() : openFacilityModal()
            }
            className="self-start sm:self-center inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-blue-600 hover:bg-blue-50 text-xs font-bold shadow-md transition-all cursor-pointer shrink-0 active:scale-95"
          >
            <Plus size={15} />
            <span>
              {subTab === "gallery" ? "Tambah Foto Galeri" : "Tambah Fasilitas"}
            </span>
          </button>
        </div>
      </div>

      {/* Alerts */}
      {successMsg && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-medium animate-fade-in">
          <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      {errorMsg && !modalMode && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium">
          <AlertCircle size={18} className="text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Sub-navigation Tabs */}
      <div className="bg-white rounded-2xl p-2 shadow-xs border border-slate-100 grid grid-cols-2 gap-1.5">
        <button
          onClick={() => setSubTab("gallery")}
          className={`py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            subTab === "gallery"
              ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <ImageIcon size={15} />
          <span>Galeri Visual ({galleryItems.length})</span>
        </button>

        <button
          onClick={() => setSubTab("facilities")}
          className={`py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
            subTab === "facilities"
              ? "bg-blue-600 text-white shadow-sm shadow-blue-600/20"
              : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
          }`}
        >
          <Trees size={15} />
          <span>Fasilitas Cluster ({facilities.length})</span>
        </button>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl p-12 shadow-xs border border-slate-100 flex flex-col items-center justify-center gap-3">
          <Loader2 size={26} className="animate-spin text-blue-600" />
          <p className="text-xs text-slate-500">
            Memuat data galeri & fasilitas...
          </p>
        </div>
      ) : subTab === "gallery" ? (
        <div className="space-y-4">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {[
              { value: "all", label: "Semua Kategori" },
              ...GALLERY_CATEGORIES,
            ].map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCatFilter(cat.value)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  catFilter === cat.value
                    ? "bg-slate-800 text-white"
                    : "bg-white text-slate-500 border border-slate-200 hover:text-slate-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Gallery Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden shadow-xs border border-slate-100 flex flex-col justify-between group hover:shadow-md transition-all"
              >
                <div>
                  <div className="relative h-44 bg-slate-50 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`w-full h-full ${
                        item.category === "floorplan"
                          ? "object-contain p-2 bg-white"
                          : "object-cover"
                      }`}
                    />
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-slate-900/75 text-white text-[10px] font-semibold backdrop-blur-xs">
                      {GALLERY_CATEGORIES.find((c) => c.value === item.category)
                        ?.label || item.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h4 className="text-sm font-bold text-slate-800 font-sans truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="px-4 py-3 bg-[#F5F7FB] border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    Urutan #{item.sortOrder}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openGalleryModal(item)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:border-blue-200 cursor-pointer"
                    >
                      <Pencil size={12} />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() =>
                        setDeleteTarget({ type: "gallery", item })
                      }
                      className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* FACILITIES GRID */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredFacilities.map((fac) => (
            <div
              key={fac.id}
              className="bg-white rounded-2xl overflow-hidden shadow-xs border border-slate-100 flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div>
                <div className="relative h-44 bg-slate-50 overflow-hidden">
                  <img
                    src={fac.image}
                    alt={fac.name}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-blue-600/90 text-white text-[10px] font-semibold">
                    Ikon: {fac.icon}
                  </span>
                </div>
                <div className="p-4">
                  <h4 className="text-sm font-bold text-slate-800 font-sans">
                    {fac.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-3">
                    {fac.description}
                  </p>
                </div>
              </div>

              <div className="px-4 py-3 bg-[#F5F7FB] border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  Urutan #{fac.sortOrder}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => openFacilityModal(fac)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:text-blue-600 hover:border-blue-200 cursor-pointer"
                  >
                    <Pencil size={12} />
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={() =>
                      setDeleteTarget({ type: "facility", item: fac })
                    }
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 cursor-pointer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {modalMode && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setModalMode(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  {modalMode === "gallery" ? (
                    <ImageIcon size={18} />
                  ) : (
                    <Trees size={18} />
                  )}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-800 font-sans">
                    {modalMode === "gallery"
                      ? editingId
                        ? "Edit Foto Galeri"
                        : "Tambah Foto Galeri"
                      : editingId
                      ? "Edit Fasilitas"
                      : "Tambah Fasilitas"}
                  </h3>
                  <p className="text-xs text-slate-400">
                    Upload gambar baru atau pilih preset yang tersedia.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setModalMode(null)}
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

              {/* Image Upload & Preview */}
              <div className="p-3.5 rounded-2xl bg-[#F5F7FB] border border-slate-200/70 space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-700">
                    Preview Gambar
                  </span>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-semibold cursor-pointer">
                    {uploading ? (
                      <Loader2 size={12} className="animate-spin" />
                    ) : (
                      <Upload size={12} />
                    )}
                    <span>Upload Foto Baru</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleUpload}
                    />
                  </label>
                </div>

                <div className="h-36 rounded-xl overflow-hidden bg-white border border-slate-200">
                  <img
                    src={resolveMediaUrl(form.imageUrlRaw)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>

                <select
                  value={
                    MEDIA_PRESETS[form.imageUrlRaw] ? form.imageUrlRaw : "custom"
                  }
                  onChange={(e) => {
                    if (e.target.value !== "custom") {
                      setForm((p) => ({ ...p, imageUrlRaw: e.target.value }));
                    }
                  }}
                  className="w-full h-9 px-3 rounded-lg bg-white border border-slate-200 text-xs text-slate-700"
                >
                  {Object.entries(MEDIA_PRESETS).map(([key, info]) => (
                    <option key={key} value={key}>
                      Preset: {info.label}
                    </option>
                  ))}
                  {!MEDIA_PRESETS[form.imageUrlRaw] && (
                    <option value="custom">Gambar Custom (Terupload)</option>
                  )}
                </select>
              </div>

              {modalMode === "gallery" ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Judul Foto *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.title || ""}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, title: e.target.value }))
                        }
                        className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Kategori
                      </label>
                      <select
                        value={form.category || "house"}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, category: e.target.value }))
                        }
                        className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-semibold text-slate-800"
                      >
                        {GALLERY_CATEGORIES.map((c) => (
                          <option key={c.value} value={c.value}>
                            {c.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Nama Fasilitas *
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name || ""}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, name: e.target.value }))
                        }
                        className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Ikon Fasilitas
                      </label>
                      <select
                        value={form.icon || "building"}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, icon: e.target.value }))
                        }
                        className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-semibold text-slate-800"
                      >
                        {FACILITY_ICONS.map((ic) => (
                          <option key={ic.value} value={ic.value}>
                            {ic.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Deskripsi Singkat
                  </label>
                  <input
                    type="text"
                    value={form.description || ""}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, description: e.target.value }))
                    }
                    className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Urutan
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={form.sortOrder ?? 1}
                    onChange={(e) =>
                      setForm((p) => ({
                        ...p,
                        sortOrder: Number(e.target.value),
                      }))
                    }
                    className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setModalMode(null)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer"
                >
                  {saving ? (
                    <Loader2 size={14} className="animate-spin" />
                  ) : (
                    <Save size={14} />
                  )}
                  <span>Simpan</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-fade-in">
            <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
              <Trash2 size={20} />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-800 font-sans">
                Hapus{" "}
                {deleteTarget.type === "gallery"
                  ? deleteTarget.item.title
                  : deleteTarget.item.name}
                ?
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Item ini akan dihapus permanen dari database Supabase dan
                halaman depan website.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={handleDelete}
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
