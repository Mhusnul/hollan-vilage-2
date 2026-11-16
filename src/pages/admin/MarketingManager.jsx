import React, { useState, useEffect } from "react";
import {
  fetchMarketingSettings,
  updateMarketingSettings,
  buildWhatsappUrl,
} from "../../utils/marketingService";
import {
  MessageCircle,
  Save,
  Plus,
  Trash2,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Building,
  UserCheck,
} from "lucide-react";

const TABS = [
  { id: "agents", label: "1. Daftar Agen & WhatsApp", icon: UserCheck },
  { id: "office", label: "2. Informasi Kantor Pemasaran", icon: Building },
];

export default function MarketingManager() {
  const [activeTab, setActiveTab] = useState("agents");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    officeAddress: "",
    operationalHours: "",
    website: "",
    instagram: "",
    agents: [],
  });

  const loadData = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const data = await fetchMarketingSettings();
      setForm({
        name: data.name || "",
        phone: data.phone || "",
        email: data.email || "",
        officeAddress: data.officeAddress || "",
        operationalHours: data.operationalHours || "",
        website: data.website || "",
        instagram: data.instagram || "",
        agents: Array.isArray(data.agents) ? data.agents : [],
      });
    } catch (err) {
      setErrorMsg(
        err.message || "Gagal memuat pengaturan Kontak Marketing."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAgentChange = (index, field, value) => {
    setForm((prev) => {
      const updated = prev.agents.map((agent, i) => {
        if (i !== index) return agent;
        const next = { ...agent, [field]: value };
        if (
          field === "phone" &&
          (!agent.whatsapp || agent.whatsapp.startsWith("https://wa.me/"))
        ) {
          next.whatsapp = buildWhatsappUrl(value);
        }
        return next;
      });
      return { ...prev, agents: updated };
    });
  };

  const handleAddAgent = () => {
    setForm((prev) => ({
      ...prev,
      agents: [
        ...prev.agents,
        {
          id: Date.now(),
          name: "",
          role: "Property Advisor Resmi",
          phone: "",
          whatsapp: "",
        },
      ],
    }));
  };

  const handleRemoveAgent = (index) => {
    setForm((prev) => ({
      ...prev,
      agents: prev.agents.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    try {
      setSaving(true);
      const saved = await updateMarketingSettings(form);
      setForm({
        name: saved.name,
        phone: saved.phone,
        email: saved.email,
        officeAddress: saved.officeAddress,
        operationalHours: saved.operationalHours,
        website: saved.website,
        instagram: saved.instagram,
        agents: saved.agents,
      });
      setSuccessMsg(
        "Pengaturan Kontak Marketing & WhatsApp berhasil disimpan!"
      );
      setTimeout(() => setSuccessMsg(""), 3500);
    } catch (err) {
      setErrorMsg(err.message || "Gagal menyimpan Kontak Marketing.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-12 shadow-xs border border-slate-100 flex flex-col items-center justify-center gap-3">
        <Loader2 size={26} className="animate-spin text-blue-600" />
        <p className="text-xs text-slate-500">
          Memuat pengaturan Kontak Marketing dari Supabase...
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Top Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-[#2563EB] via-[#3B82F6] to-[#1D4ED8] text-white p-6 sm:p-7 shadow-lg shadow-blue-500/15 overflow-hidden">
        <div className="pointer-events-none absolute -right-12 -bottom-16 w-72 h-72 rounded-full bg-white/10 blur-xl" />
        <div className="pointer-events-none absolute right-24 -top-20 w-56 h-56 rounded-full bg-blue-400/25 blur-lg" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-[11px] font-semibold text-blue-100">
              <MessageCircle size={12} />
              <span>Kontak Resmi & WhatsApp Marketing</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight font-sans">
              Kontak Marketing & Tujuan WhatsApp
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              Atur daftar Property Advisor, nomor WhatsApp untuk tombol Hubungi
              Kami, serta informasi kantor pemasaran resmi.
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
                <span>Simpan Perubahan</span>
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

      {/* Segmented Tabs */}
      <div className="bg-white rounded-2xl p-2 shadow-xs border border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
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

      {/* ================= TAB 1: DAFTAR AGEN & WHATSAPP ================= */}
      {activeTab === "agents" && (
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-100 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-800 font-sans">
                Daftar Property Advisor & WhatsApp
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Agen #1 menjadi tujuan utama tombol Chat WhatsApp & Hubungi Kami
                di website.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAddAgent}
              className="self-start sm:self-auto px-4 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <Plus size={14} />
              <span>Tambah Agen Baru</span>
            </button>
          </div>

          <div className="space-y-4">
            {form.agents.map((agent, idx) => {
              const initial = (agent.name || "A").trim().charAt(0).toUpperCase();
              return (
                <div
                  key={agent.id || idx}
                  className="p-5 rounded-2xl bg-[#F5F7FB] border border-slate-200/70 space-y-4"
                >
                  {/* Agent Card Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        {initial}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-800">
                          {agent.name || `Agen Marketing #${idx + 1}`}
                        </p>
                        <span className="inline-block text-[10px] font-semibold px-2 py-0.5 rounded-md bg-blue-100/80 text-blue-700 mt-0.5">
                          {idx === 0 ? "Agen Utama (Default WA)" : `Agen #${idx + 1}`}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={buildWhatsappUrl(agent.whatsapp || agent.phone)}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200/70 text-[11px] font-semibold transition-colors"
                      >
                        <MessageCircle size={13} />
                        <span>Tes WhatsApp</span>
                        <ExternalLink size={11} />
                      </a>
                      {form.agents.length > 1 && (
                        <button
                          type="button"
                          onClick={() => handleRemoveAgent(idx)}
                          className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                          title="Hapus Agen"
                        >
                          <Trash2 size={15} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Symmetrical 2-Column Inputs */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        Nama Lengkap Agen
                      </label>
                      <input
                        type="text"
                        value={agent.name}
                        onChange={(e) =>
                          handleAgentChange(idx, "name", e.target.value)
                        }
                        placeholder="Contoh: Adiansyah Anwar"
                        className="w-full h-10 px-3.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        Jabatan / Role
                      </label>
                      <input
                        type="text"
                        value={agent.role}
                        onChange={(e) =>
                          handleAgentChange(idx, "role", e.target.value)
                        }
                        placeholder="Contoh: Property Advisor Resmi"
                        className="w-full h-10 px-3.5 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        Nomor HP Tampil
                      </label>
                      <input
                        type="text"
                        value={agent.phone}
                        onChange={(e) =>
                          handleAgentChange(idx, "phone", e.target.value)
                        }
                        placeholder="Contoh: +62 897-6297-053"
                        className="w-full h-10 px-3.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-800 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                        Link WhatsApp (Otomatis dari No. HP)
                      </label>
                      <input
                        type="text"
                        value={agent.whatsapp}
                        onChange={(e) =>
                          handleAgentChange(idx, "whatsapp", e.target.value)
                        }
                        placeholder="https://wa.me/628976297053"
                        className="w-full h-10 px-3.5 rounded-xl bg-white border border-slate-200 text-xs font-medium text-emerald-700 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 2: INFORMASI KANTOR PEMASARAN ================= */}
      {activeTab === "office" && (
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-slate-100 space-y-5">
          <div className="pb-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-800 font-sans">
              Informasi Kantor Pemasaran Resmi
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Ditampilkan pada kartu Kantor Pemasaran Resmi dan bagian Footer
              website.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Nama Kantor / Proyek
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Telepon & WhatsApp Kantor
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs font-semibold text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Resmi
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Jam Operasional Kunjungan
              </label>
              <input
                type="text"
                name="operationalHours"
                value={form.operationalHours}
                onChange={handleChange}
                className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Instagram
              </label>
              <input
                type="text"
                name="instagram"
                value={form.instagram}
                onChange={handleChange}
                placeholder="@hollandvillagesukabumi"
                className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Website
              </label>
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={handleChange}
                className="w-full h-10 px-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs text-slate-800 focus:outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Alamat Kantor & Lokasi Proyek
            </label>
            <textarea
              name="officeAddress"
              rows={3}
              value={form.officeAddress}
              onChange={handleChange}
              className="w-full p-3.5 rounded-xl bg-[#F5F7FB] border border-slate-200/80 text-xs text-slate-800 leading-relaxed focus:outline-none focus:border-blue-500 focus:bg-white"
            />
          </div>
        </div>
      )}

      {/* Bottom Sticky Action Bar */}
      <div className="bg-white rounded-2xl px-6 py-4 shadow-xs border border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          Perubahan otomatis tersinkron ke seluruh tombol kontak di halaman
          utama.
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
