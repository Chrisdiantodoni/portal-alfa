"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

interface ForcePasswordChangeProps {
  onComplete: () => void;
}

export default function ForcePasswordChange({ onComplete }: ForcePasswordChangeProps) {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 8) {
      setError("Kata sandi minimal 8 karakter.");
      return;
    }
    if (password !== confirm) {
      setError("Kata sandi tidak cocok.");
      return;
    }
    setError("");
    console.log("Password changed successfully");
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md mx-4 p-8 rounded-3xl bg-surface-container-high border border-white/5 shadow-2xl">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <Icon icon="mdi:shield-key" className="text-3xl text-primary" />
          </div>
          <h2 className="text-xl font-bold text-on-surface">Ganti Kata Sandi</h2>
          <p className="text-sm text-on-surface-variant mt-1 text-center">
            Demi keamanan, Anda wajib mengganti kata sandi sebelum melanjutkan.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-black text-on-surface-variant tracking-widest uppercase ml-1">
              Kata Sandi Baru
            </label>
            <div className="relative group mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors">
                <Icon icon="mdi:lock-reset" className="text-lg text-on-surface-variant/60 group-focus-within:text-primary" />
              </span>
              <input
                className="block w-full pl-12 pr-4 py-3.5 bg-surface-container-lowest border-none text-on-surface placeholder:text-outline/30 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 rounded-2xl"
                type="password"
                placeholder="Minimal 8 karakter"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-black text-on-surface-variant tracking-widest uppercase ml-1">
              Konfirmasi Kata Sandi
            </label>
            <div className="relative group mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors">
                <Icon icon="mdi:lock-check" className="text-lg text-on-surface-variant/60 group-focus-within:text-primary" />
              </span>
              <input
                className="block w-full pl-12 pr-4 py-3.5 bg-surface-container-lowest border-none text-on-surface placeholder:text-outline/30 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 rounded-2xl"
                type="password"
                placeholder="Ulangi kata sandi"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <p className="text-red-400 text-xs font-medium flex items-center gap-1">
              <Icon icon="mdi:alert-circle" className="text-sm" />
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary font-black rounded-2xl shadow-lg shadow-primary/10 hover:shadow-primary/25 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2 uppercase tracking-widest text-sm"
          >
            <Icon icon="mdi:check-circle" className="text-lg" />
            <span>Simpan &amp; Lanjutkan</span>
          </button>
        </form>
      </div>
    </div>
  );
}
