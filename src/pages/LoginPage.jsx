import React, { useState } from "react";
import { useAuth } from "../hooks";
import { Mail, Lock, LogIn } from "lucide-react";
import Alert from "../components/admin/Alert";

export default function LoginPage() {
  const { login, loading, error: authError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
      window.location.href = "/admin";
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-black mb-2">Holland Admin</h1>
          <p className="text-gray-600">Masuk ke dashboard manajemen</p>
        </div>

        {/* Alert */}
        {(error || authError) && (
          <Alert
            type="error"
            title="Kesalahan Login"
            message={error || authError}
            onClose={() => setError(null)}
          />
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@holland.com"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white text-black placeholder-gray-400"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-medium text-black mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent bg-white text-black placeholder-gray-400"
              />
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition font-medium flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <LogIn size={20} />
            {loading ? "Memuat..." : "Masuk"}
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>© 2026 Holland Village. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
