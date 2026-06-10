"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Icon } from "@iconify/react";

export default function LoginPage() {
  const [isShowButton, setIsShowButton] = useState(false);
  const route = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in...");
    route.replace("/portal");
  };

  return (
    <div className="font-manrope bg-surface text-on-surface selection:bg-primary selection:text-on-primary min-h-screen relative overflow-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-primary/5 blur-[150px] rounded-full" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/[0.03] blur-[130px] rounded-full" />
      </div>

      <main className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Branding */}
          <div className="flex flex-col items-center mb-10">
            <div className="mb-5 flex items-center justify-center space-x-4">
              <div className="p-3 bg-surface-container-high rounded-2xl border border-white/5">
                <Icon
                  icon="mdi:shield-star"
                  className="text-4xl text-primary"
                />
              </div>
              <h1 className="text-4xl font-extrabold tracking-tighter text-on-surface">
                Alfa <span className="text-primary">Scorpii</span>
              </h1>
            </div>
            <div className="h-[2px] w-8 bg-primary/30 mb-5 rounded-full" />
            <h2 className="text-on-surface-variant text-xs tracking-[0.3em] font-bold text-center uppercase opacity-80">
              Portal Terpusat
            </h2>
          </div>

          {/* Login Card */}
          <div className="bg-surface-container-low/80 backdrop-blur-xl rounded-3xl p-8 shadow-[0_0_80px_-20px] shadow-primary/10 border border-white/5 hover:border-primary/30 transition-all duration-500">
            {!isShowButton ? (
              <button
                className="w-full py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary font-black rounded-2xl shadow-lg shadow-primary/10 hover:shadow-primary/25 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center space-x-3 uppercase tracking-widest text-sm"
                onClick={() => setIsShowButton(true)}
              >
                <span>Masuk dengan akun Alfa Scorpii</span>
                <Icon icon="mdi:login" className="text-xl" />
              </button>
            ) : (
              <div className="flex flex-col">
                <form className="space-y-5" onSubmit={handleSubmit}>
                  <div className="space-y-2">
                    <label
                      className="text-[11px] font-black text-on-surface-variant tracking-widest uppercase ml-1"
                      htmlFor="username"
                    >
                      Username
                    </label>
                    <div className="relative group mt-2">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary group-focus-within:text-primary transition-colors">
                        <Icon
                          icon="mdi:account"
                          className="text-lg text-primary"
                        />
                      </span>
                      <input
                        className="block w-full pl-12 pr-4 py-4 bg-surface-container-lowest/80 backdrop-blur-sm border-none text-on-surface placeholder:text-outline/30 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 rounded-2xl"
                        id="username"
                        placeholder="Username"
                        type="text"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center px-1">
                      <label
                        className="text-[11px] font-black text-on-surface-variant tracking-widest uppercase"
                        htmlFor="password"
                      >
                        Kata Sandi
                      </label>
                    </div>
                    <div className="relative group">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant group-focus-within:text-primary transition-colors">
                        <Icon icon="mdi:lock" className="text-lg" />
                      </span>
                      <input
                        className="block w-full pl-12 pr-4 py-4 bg-surface-container-lowest/80 backdrop-blur-sm border-none text-on-surface placeholder:text-outline/30 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 rounded-2xl"
                        id="password"
                        placeholder="••••••••"
                        type="password"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary font-black rounded-2xl shadow-lg shadow-primary/10 hover:shadow-primary/25 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center space-x-3 uppercase tracking-widest text-sm"
                  >
                    <span>Masuk</span>
                    <Icon icon="mdi:login" className="text-xl" />
                  </button>

                  <button
                    type="button"
                    onClick={() => setIsShowButton(false)}
                    className="w-full text-[11px] text-on-surface-variant/50 font-bold uppercase tracking-widest hover:text-primary transition-colors mt-1"
                  >
                    Kembali
                  </button>
                </form>
              </div>
            )}
          </div>

          <p className="mt-10 text-center text-[9px] text-outline/30 uppercase tracking-[0.4em] font-bold">
            Authorized Personnel Only &bull; &copy; 2026 Alfa Scorpii
          </p>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  );
}
