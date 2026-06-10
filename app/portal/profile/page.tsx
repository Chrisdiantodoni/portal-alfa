"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function ProfilePage() {
  const [name, setName] = useState("Doni");
  const [email, setEmail] = useState("doni@alfascorpii.id");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saved, setSaved] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile saved:", { name, email });
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handlePasswordSave = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    if (newPassword.length < 8) {
      setPasswordError("Kata sandi baru minimal 8 karakter.");
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("Konfirmasi kata sandi tidak cocok.");
      return;
    }
    console.log("Password changed");
    setPasswordSaved(true);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setPasswordSaved(false), 3000);
  };

  return (
    <div className="font-manrope bg-surface-dim text-on-surface min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/5">
        <div className="flex justify-between items-center h-16 px-6 md:px-8 w-full max-w-screen-2xl mx-auto">
          <Link href="/portal" className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors">
            <Icon icon="mdi:arrow-left" className="text-xl" />
            <span className="text-sm font-medium">Kembali</span>
          </Link>
          <div className="text-lg font-black tracking-tighter text-primary">
            Pengaturan Profil
          </div>
          <div className="w-20" />
        </div>
      </nav>

      <main className="flex-grow pt-28 pb-20 px-6 max-w-2xl mx-auto w-full space-y-8">
        {/* Edit Profile */}
        <div className="rounded-3xl bg-surface-container-low/70 backdrop-blur-md border border-white/5 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon icon="mdi:account-edit" className="text-xl text-primary" />
            </div>
            <h2 className="text-lg font-bold text-on-surface">Edit Profil</h2>
          </div>

          <form onSubmit={handleProfileSave} className="space-y-4">
            <div>
              <label className="text-[11px] font-black text-on-surface-variant tracking-widest uppercase ml-1">
                Nama
              </label>
              <input
                className="mt-2 block w-full px-4 py-3.5 bg-surface-container-lowest border-none text-on-surface placeholder:text-outline/30 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 rounded-2xl"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-[11px] font-black text-on-surface-variant tracking-widest uppercase ml-1">
                Email
              </label>
              <input
                className="mt-2 block w-full px-4 py-3.5 bg-surface-container-lowest border-none text-on-surface placeholder:text-outline/30 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 rounded-2xl"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary font-black rounded-2xl shadow-lg shadow-primary/10 hover:shadow-primary/25 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2 uppercase tracking-widest text-sm"
            >
              <Icon icon="mdi:content-save" className="text-lg" />
              <span>Simpan</span>
            </button>
            {saved && (
              <p className="text-primary text-xs font-bold text-center flex items-center justify-center gap-1">
                <Icon icon="mdi:check-circle" className="text-sm" />
                Profil berhasil disimpan
              </p>
            )}
          </form>
        </div>

        {/* Change Password */}
        <div className="rounded-3xl bg-surface-container-low/70 backdrop-blur-md border border-white/5 p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Icon icon="mdi:lock-reset" className="text-xl text-primary" />
            </div>
            <h2 className="text-lg font-bold text-on-surface">Ganti Kata Sandi</h2>
          </div>

          <form onSubmit={handlePasswordSave} className="space-y-4">
            <div>
              <label className="text-[11px] font-black text-on-surface-variant tracking-widest uppercase ml-1">
                Kata Sandi Saat Ini
              </label>
              <div className="relative group mt-2">
                <span className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Icon icon="mdi:lock" className="text-lg text-on-surface-variant/60 group-focus-within:text-primary transition-colors" />
                </span>
                <input
                  className="block w-full pl-12 pr-4 py-3.5 bg-surface-container-lowest border-none text-on-surface placeholder:text-outline/30 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 rounded-2xl"
                  type="password"
                  placeholder="Kata sandi saat ini"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-black text-on-surface-variant tracking-widest uppercase ml-1">
                  Kata Sandi Baru
                </label>
                <input
                  className="mt-2 block w-full px-4 py-3.5 bg-surface-container-lowest border-none text-on-surface placeholder:text-outline/30 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 rounded-2xl"
                  type="password"
                  placeholder="Minimal 8 karakter"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div>
                <label className="text-[11px] font-black text-on-surface-variant tracking-widest uppercase ml-1">
                  Konfirmasi
                </label>
                <input
                  className="mt-2 block w-full px-4 py-3.5 bg-surface-container-lowest border-none text-on-surface placeholder:text-outline/30 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 rounded-2xl"
                  type="password"
                  placeholder="Ulangi kata sandi"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            {passwordError && (
              <p className="text-red-400 text-xs font-medium flex items-center gap-1">
                <Icon icon="mdi:alert-circle" className="text-sm" />
                {passwordError}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary font-black rounded-2xl shadow-lg shadow-primary/10 hover:shadow-primary/25 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2 uppercase tracking-widest text-sm"
            >
              <Icon icon="mdi:shield-check" className="text-lg" />
              <span>Perbarui Kata Sandi</span>
            </button>
            {passwordSaved && (
              <p className="text-primary text-xs font-bold text-center flex items-center justify-center gap-1">
                <Icon icon="mdi:check-circle" className="text-sm" />
                Kata sandi berhasil diperbarui
              </p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}
