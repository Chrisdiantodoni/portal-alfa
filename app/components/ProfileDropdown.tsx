"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";

export function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative pl-3 ml-1 border-l border-white/10">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 hover:bg-surface-container-high py-1 pl-2 pr-1 rounded-lg transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuATEvN0g-DIAXM_KPURb43Z-UDaYbANOSCgRpNP1PEF2WU8GGOTJQDJdLJB7-wzhpYk7I8DTzDMxK8otEk4jzkhEEOMVTXhaF5jNfR8jeY1tY2UGpliWVZ3FlvP2vx8XhXKHp123KlkLDDdwnDDoH5YFlHI-VfDEGMQWOYd20T9hye6EeZoF1MmfBkpHGqVlb3fialdcgizje_436o8d3c2oIvCXHzniWmmXB08xteJrbsmbFN1Fwbzt8iguA4RbAdX5wv8H6tvc2E"
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
        <Icon
          icon="mdi:chevron-down"
          className="text-on-surface-variant text-xl transition-transform duration-200"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-surface-container-high border border-white/5 shadow-2xl shadow-black/30 overflow-hidden origin-top-right animate-in fade-in zoom-in-95">
          <div className="px-4 py-3 border-b border-white/5">
            <p className="text-sm font-bold text-on-surface">Doni</p>
            <p className="text-[11px] text-on-surface-variant">
              doni@alfascorpii.id
            </p>
          </div>
          <div className="py-1">
            <button
              onClick={() => {
                setOpen(false);
                router.push("/portal/profile");
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:text-on-surface hover:bg-surface-container-lowest transition-colors"
            >
              <Icon icon="mdi:account-cog" className="text-lg" />
              Profil
            </button>
            <button
              onClick={() => {
                setOpen(false);
                router.replace("/login");
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-on-surface-variant hover:text-red-400 hover:bg-surface-container-lowest transition-colors"
            >
              <Icon icon="mdi:logout" className="text-lg" />
              Keluar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
