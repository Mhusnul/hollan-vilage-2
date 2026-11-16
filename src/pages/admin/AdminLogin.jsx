import React, { useState } from "react";
import { supabase } from "../../utils/supabase";
import { company } from "../../data/config";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function AdminLogin({ onNavigateHome }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email.trim() || !password) {
      setErrorMsg("Mohon isi email dan password terlebih dahulu.");
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          setErrorMsg("Email atau password yang Anda masukkan salah.");
        } else if (error.message.includes("Email not confirmed")) {
          setErrorMsg(
            "Email belum dikonfirmasi. Pastikan Auto Confirm User diaktifkan saat membuat akun di Supabase."
          );
        } else {
          setErrorMsg(error.message);
        }
      }
    } catch (err) {
      setErrorMsg("Terjadi kesalahan jaringan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-tropical-mesh flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Decorative Ambient Glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-emerald-900/10 blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#C58F4B]/15 blur-3xl" />
      </div>

      {/* Back to Website Button */}
      <div className="w-full max-w-md mb-6 relative z-10">
        <a
          href="/"
          onClick={(e) => {
            if (onNavigateHome) {
              e.preventDefault();
              onNavigateHome();
            }
          }}
          className="inline-flex items-center gap-2 text-sm font-medium text-emerald-950/75 hover:text-emerald-950 transition-colors group"
        >
          <ArrowLeft
            size={16}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          <span>Kembali ke Beranda Website</span>
        </a>
      </div>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-xl shadow-emerald-950/10 border border-emerald-900/10 overflow-hidden relative z-10 animate-fade-in">
        {/* Top Banner Header */}
        <div className="bg-forest-gradient px-8 pt-8 pb-7 text-white relative overflow-hidden">
          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-[#C58F4B]/15 blur-2xl pointer-events-none" />

          <div className="flex items-center gap-3.5 mb-4">
            <div className="p-1.5 rounded-xl bg-white shadow-md shrink-0">
              <img
                src={company.logo}
                alt={company.companyNameShort}
                className="h-10 w-10 object-contain rounded-lg"
              />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C58F4B] block">
                CMS Portal Admin
              </span>
              <h1 className="font-serif-display text-xl font-bold tracking-tight text-white leading-snug">
                Holland Village{" "}
                <span className="text-[#C58F4B] font-normal italic text-base">
                  Sukabumi
                </span>
              </h1>
            </div>
          </div>

          <p className="text-xs text-emerald-100/80 leading-relaxed">
            Masuk menggunakan akun administrator untuk mengelola konten properti,
            unit rumah, galeri, dan informasi harga.
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          {errorMsg && (
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs leading-relaxed">
              <AlertCircle size={17} className="shrink-0 mt-0.5 text-red-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Email Input */}
          <div className="space-y-1.5">
            <label
              htmlFor="admin-email"
              className="block text-xs font-semibold uppercase tracking-wider text-emerald-950/80"
            >
              Email Admin
            </label>
            <div className="relative">
              <Mail
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
              />
              <input
                id="admin-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@hollandvillage.id"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF8F5] border border-stone-200/90 text-sm text-[#1C2826] placeholder:text-stone-400 focus:outline-none focus:border-emerald-800 focus:bg-white focus:ring-3 focus:ring-emerald-900/10 transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1.5">
            <label
              htmlFor="admin-password"
              className="block text-xs font-semibold uppercase tracking-wider text-emerald-950/80"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
              />
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                className="w-full pl-10 pr-11 py-3 rounded-xl bg-[#FAF8F5] border border-stone-200/90 text-sm text-[#1C2826] placeholder:text-stone-400 focus:outline-none focus:border-emerald-800 focus:bg-white focus:ring-3 focus:ring-emerald-900/10 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-stone-400 hover:text-emerald-900 transition-colors cursor-pointer"
                aria-label={
                  showPassword ? "Sembunyikan password" : "Lihat password"
                }
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-5 rounded-xl bg-emerald-900 hover:bg-emerald-800 disabled:bg-emerald-900/60 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-950/15 transition-all cursor-pointer active:scale-[0.99]"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Memverifikasi...</span>
              </>
            ) : (
              <>
                <ShieldCheck size={18} />
                <span>Masuk ke Dashboard</span>
              </>
            )}
          </button>
        </form>

        {/* Footer Note */}
        <div className="px-8 py-4 bg-[#FAF8F5] border-t border-stone-200/70 flex items-center justify-between text-[11px] text-stone-500">
          <span>{company.name}</span>
          <span className="text-emerald-800 font-medium">Secured by Supabase</span>
        </div>
      </div>
    </div>
  );
}
