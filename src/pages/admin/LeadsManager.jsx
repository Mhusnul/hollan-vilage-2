import React, { useState, useEffect } from "react";
import {
  fetchInquiries,
  updateInquiry,
  deleteInquiry,
  INQUIRY_STATUSES,
} from "../../utils/inquiriesService";
import {
  Users,
  RefreshCw,
  MessageCircle,
  Eye,
  Trash2,
  X,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  Home,
  Calendar,
} from "lucide-react";

const STATUS_BADGE = {
  Baru: "bg-blue-50 text-blue-600 border-blue-200",
  Dihubungi: "bg-amber-50 text-amber-600 border-amber-200",
  Survey: "bg-purple-50 text-purple-600 border-purple-200",
  Closing: "bg-emerald-50 text-emerald-600 border-emerald-200",
  Batal: "bg-slate-100 text-slate-500 border-slate-200",
};

function formatWaNumber(phone) {
  const digits = (phone || "").replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("0")) return "62" + digits.slice(1);
  if (digits.startsWith("8")) return "62" + digits;
  return digits;
}

function formatDateTime(iso) {
  if (!iso) return "-";
  try {
    return new Date(iso).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function LeadsManager({ searchQuery = "" }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [detailLead, setDetailLead] = useState(null);
  const [notesInput, setNotesInput] = useState("");
  const [statusInput, setStatusInput] = useState("Baru");
  const [savingDetail, setSavingDetail] = useState(false);

  const [deleteConfirmLead, setDeleteConfirmLead] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const data = await fetchInquiries();
      setItems(data);
    } catch (err) {
      setErrorMsg(err.message || "Gagal memuat data leads dari Supabase.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const showSuccess = (msg) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3500);
  };

  const handleQuickStatusChange = async (lead, newStatus) => {
    try {
      setErrorMsg("");
      const updated = await updateInquiry(lead.id, { status: newStatus });
      setItems((prev) =>
        prev.map((item) => (item.id === lead.id ? updated : item))
      );
      showSuccess(`Status "${lead.name}" diubah ke ${newStatus}.`);
    } catch (err) {
      setErrorMsg(err.message || "Gagal mengubah status lead.");
    }
  };

  const openDetailModal = (lead) => {
    setDetailLead(lead);
    setNotesInput(lead.notes || "");
    setStatusInput(lead.status || "Baru");
  };

  const handleSaveDetail = async (e) => {
    e.preventDefault();
    if (!detailLead) return;

    try {
      setSavingDetail(true);
      setErrorMsg("");
      const updated = await updateInquiry(detailLead.id, {
        status: statusInput,
        notes: notesInput,
      });
      setItems((prev) =>
        prev.map((item) => (item.id === detailLead.id ? updated : item))
      );
      setDetailLead(null);
      showSuccess(`Data follow-up "${detailLead.name}" berhasil disimpan.`);
    } catch (err) {
      setErrorMsg(err.message || "Gagal menyimpan catatan.");
    } finally {
      setSavingDetail(false);
    }
  };

  const handleDelete = async (lead) => {
    try {
      setErrorMsg("");
      await deleteInquiry(lead.id);
      setItems((prev) => prev.filter((item) => item.id !== lead.id));
      setDeleteConfirmLead(null);
      showSuccess(`Lead "${lead.name}" berhasil dihapus.`);
    } catch (err) {
      setErrorMsg(err.message || "Gagal menghapus lead.");
    }
  };

  const openWhatsAppFollowUp = (lead) => {
    const waNum = formatWaNumber(lead.phone);
    if (!waNum) return;
    const text = encodeURIComponent(
      `Halo Bapak/Ibu ${lead.name}, kami dari tim Marketing Holland Village Sukabumi menindaklanjuti permintaan informasi${
        lead.house_type ? ` untuk unit ${lead.house_type}` : ""
      }. Kapan Bapak/Ibu berkenan untuk jadwalkan survey lokasi?`
    );
    window.open(`https://wa.me/${waNum}?text=${text}`, "_blank");
  };

  const filteredItems = items.filter((item) => {
    const matchStatus =
      statusFilter === "Semua" || item.status === statusFilter;
    if (!matchStatus) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.name?.toLowerCase().includes(q) ||
      item.phone?.toLowerCase().includes(q) ||
      item.email?.toLowerCase().includes(q) ||
      item.house_type?.toLowerCase().includes(q) ||
      item.message?.toLowerCase().includes(q)
    );
  });

  const countByStatus = (status) =>
    items.filter((i) => i.status === status).length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#1D4ED8] text-white p-6 sm:p-7 shadow-lg shadow-blue-500/15 overflow-hidden">
        <div className="pointer-events-none absolute -right-12 -bottom-16 w-72 h-72 rounded-full bg-white/10 blur-xl" />
        <div className="pointer-events-none absolute right-24 -top-20 w-56 h-56 rounded-full bg-blue-400/25 blur-lg" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-[11px] font-semibold text-blue-100">
              <Users size={12} />
              <span>Modul 3 • Leads & Jadwal Survey</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight font-sans">
              Daftar Calon Pembeli (Inquiries)
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Setiap pengunjung yang mengisi formulir Jadwalkan Survey di
              halaman depan otomatis tersimpan di sini untuk di-follow up.
            </p>
          </div>

          <button
            onClick={loadData}
            className="self-start sm:self-center inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-semibold border border-white/25 transition-all cursor-pointer shrink-0"
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
            <span>Muat Ulang</span>
          </button>
        </div>

        {/* Quick Stats Row */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5 pt-5 border-t border-white/15">
          <div className="bg-white/10 backdrop-blur-xs rounded-xl px-4 py-2.5">
            <span className="text-[11px] text-blue-100 block">Total Leads</span>
            <strong className="text-lg font-bold">{items.length}</strong>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-xl px-4 py-2.5">
            <span className="text-[11px] text-blue-100 block">Leads Baru</span>
            <strong className="text-lg font-bold">
              {countByStatus("Baru")}
            </strong>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-xl px-4 py-2.5">
            <span className="text-[11px] text-blue-100 block">
              Jadwal Survey
            </span>
            <strong className="text-lg font-bold">
              {countByStatus("Survey")}
            </strong>
          </div>
          <div className="bg-white/10 backdrop-blur-xs rounded-xl px-4 py-2.5">
            <span className="text-[11px] text-blue-100 block">Closing</span>
            <strong className="text-lg font-bold">
              {countByStatus("Closing")}
            </strong>
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

      {errorMsg && (
        <div className="flex items-center gap-3 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-medium">
          <AlertCircle size={18} className="text-red-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Filter Pills */}
      <div className="bg-white rounded-2xl p-2 shadow-xs border border-slate-100 flex flex-wrap gap-1.5">
        {["Semua", ...INQUIRY_STATUSES].map((status) => {
          const active = statusFilter === status;
          const count =
            status === "Semua" ? items.length : countByStatus(status);
          return (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-2 transition-all cursor-pointer ${
                active
                  ? "bg-blue-600 text-white shadow-xs"
                  : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
              }`}
            >
              <span>{status}</span>
              <span
                className={`px-1.5 py-0.5 rounded-md text-[10px] ${
                  active
                    ? "bg-white/20 text-white"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-100">
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3">
            <Loader2 size={26} className="animate-spin text-blue-600" />
            <p className="text-xs text-slate-500">
              Memuat data leads dari Supabase...
            </p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
              <Users size={22} />
            </div>
            <p className="text-sm font-bold text-slate-700">
              Belum ada data calon pembeli
            </p>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Saat pengunjung website mengirim formulir Jadwalkan Survey di
              halaman utama, data mereka akan otomatis muncul di tabel ini.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3 pr-3">Calon Pembeli</th>
                  <th className="pb-3 px-3">Kontak</th>
                  <th className="pb-3 px-3">Tipe Diminati</th>
                  <th className="pb-3 px-3">Tanggal</th>
                  <th className="pb-3 px-3">Status</th>
                  <th className="pb-3 pl-3 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {filteredItems.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-slate-50/80 transition-colors"
                  >
                    <td className="py-3.5 pr-3">
                      <p className="font-bold text-slate-800">{lead.name}</p>
                      {lead.message && (
                        <p className="text-[11px] text-slate-400 truncate max-w-[200px]">
                          {lead.message}
                        </p>
                      )}
                    </td>

                    <td className="py-3.5 px-3">
                      <p className="font-semibold text-slate-700 whitespace-nowrap">
                        {lead.phone}
                      </p>
                      {lead.email && (
                        <p className="text-[11px] text-slate-400 truncate max-w-[160px]">
                          {lead.email}
                        </p>
                      )}
                    </td>

                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <span className="px-2.5 py-1 rounded-lg bg-[#F5F7FB] text-slate-700 font-semibold text-[11px]">
                        {lead.house_type || "Belum ditentukan"}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-[11px] text-slate-500 whitespace-nowrap">
                      {formatDateTime(lead.created_at)}
                    </td>

                    <td className="py-3.5 px-3 whitespace-nowrap">
                      <select
                        value={lead.status || "Baru"}
                        onChange={(e) =>
                          handleQuickStatusChange(lead, e.target.value)
                        }
                        className={`px-2.5 py-1 rounded-lg border text-[11px] font-bold cursor-pointer focus:outline-none ${
                          STATUS_BADGE[lead.status] || STATUS_BADGE.Baru
                        }`}
                      >
                        {INQUIRY_STATUSES.map((st) => (
                          <option key={st} value={st} className="bg-white text-slate-800">
                            {st}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="py-3.5 pl-3 text-right whitespace-nowrap">
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => openWhatsAppFollowUp(lead)}
                          className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                          title="Follow-up via WhatsApp"
                        >
                          <MessageCircle size={15} />
                        </button>
                        <button
                          onClick={() => openDetailModal(lead)}
                          className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                          title="Detail & Catatan Admin"
                        >
                          <Eye size={15} />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmLead(lead)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Hapus Lead"
                        >
                          <Trash2 size={15} />
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

      {/* DETAIL & FOLLOW-UP NOTES MODAL */}
      {detailLead && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setDetailLead(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block">
                  Detail Calon Pembeli
                </span>
                <h3 className="text-base font-bold text-slate-800 font-sans">
                  {detailLead.name}
                </h3>
              </div>
              <button
                onClick={() => setDetailLead(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:bg-slate-100 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveDetail} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#F5F7FB] flex items-center gap-2.5">
                  <Phone size={15} className="text-blue-600 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 block">
                      No. WhatsApp
                    </span>
                    <strong className="text-slate-800 truncate block">
                      {detailLead.phone}
                    </strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#F5F7FB] flex items-center gap-2.5">
                  <Mail size={15} className="text-blue-600 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 block">
                      Email
                    </span>
                    <strong className="text-slate-800 truncate block">
                      {detailLead.email || "-"}
                    </strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#F5F7FB] flex items-center gap-2.5">
                  <Home size={15} className="text-blue-600 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 block">
                      Tipe Diminati
                    </span>
                    <strong className="text-slate-800 truncate block">
                      {detailLead.house_type || "Belum ditentukan"}
                    </strong>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-[#F5F7FB] flex items-center gap-2.5">
                  <Calendar size={15} className="text-blue-600 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-[10px] text-slate-400 block">
                      Waktu Masuk
                    </span>
                    <strong className="text-slate-800 truncate block">
                      {formatDateTime(detailLead.created_at)}
                    </strong>
                  </div>
                </div>
              </div>

              {detailLead.message && (
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Pesan Pengunjung
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {detailLead.message}
                  </p>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Status Follow-up
                </label>
                <select
                  value={statusInput}
                  onChange={(e) => setStatusInput(e.target.value)}
                  className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  {INQUIRY_STATUSES.map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Catatan Admin / Hasil Follow-up
                </label>
                <textarea
                  rows={3}
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="Misal: Sudah janji survey hari Sabtu jam 10.00 WIB..."
                  className="w-full p-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => openWhatsAppFollowUp(detailLead)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-semibold cursor-pointer"
                >
                  <MessageCircle size={14} />
                  <span>Chat WhatsApp</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDetailLead(null)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
                  >
                    Tutup
                  </button>
                  <button
                    type="submit"
                    disabled={savingDetail}
                    className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold cursor-pointer"
                  >
                    {savingDetail ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Save size={14} />
                    )}
                    <span>Simpan</span>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmLead && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 space-y-4 animate-fade-in">
            <div className="w-11 h-11 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
              <Trash2 size={20} />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-800 font-sans">
                Hapus Lead {deleteConfirmLead.name}?
              </h4>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Data calon pembeli ini akan dihapus permanen dari database
                Supabase.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setDeleteConfirmLead(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-semibold hover:bg-slate-50 cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmLead)}
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
