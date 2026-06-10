import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { ProfileDropdown } from "@/app/components/ProfileDropdown";
import MustChangePasswordGate from "@/app/components/MustChangePasswordGate";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PortalCard from "../components/PortalCard";

const PORTALS = [
  {
    id: 1,
    nama: "Aplikasi SPK",
    kode: "SPK",
    url: "https://spk.alfascorpii.id",
    icon: "mdi:clipboard-text",
  },
  {
    id: 2,
    nama: "Sistem HRIS",
    kode: "HRIS",
    url: "https://hris.alfascorpii.id",
    icon: "mdi:account-group",
  },
  {
    id: 3,
    nama: "Laporan Keuangan",
    kode: "FIN",
    url: "https://finance.alfascorpii.id",
    icon: "mdi:finance",
  },
  {
    id: 4,
    nama: "Chat Tim",
    kode: "CHAT",
    url: "https://chat.alfascorpii.id",
    icon: "mdi:forum",
  },
  {
    id: 5,
    nama: "Aset Pemasaran",
    kode: "MKT",
    url: "https://assets.alfascorpii.id",
    icon: "mdi:package-variant-closed",
  },
  {
    id: 6,
    nama: "Pusat Belajar",
    kode: "LRN",
    url: "https://learn.alfascorpii.id",
    icon: "mdi:school",
  },
];

export default function PortalPage() {
  return (
    <MustChangePasswordGate>
      <div className="font-manrope bg-surface-dim text-on-surface min-h-screen flex flex-col">
        {/* --- Navigation --- */}
        <Header />
        {/* --- Main Content --- */}
        <main className="flex-grow pt-28 pb-20 px-6 max-w-7xl mx-auto w-full">
          {/* Hero */}
          <header className="mb-16 text-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
            <h1 className="relative text-4xl md:text-5xl font-extrabold tracking-tighter mb-4">
              Selamat datang, <span className="text-primary">Doni!</span>
            </h1>
            <p className="relative text-lg text-on-surface-variant max-w-xl mx-auto font-light tracking-wide">
              Pilih portal untuk mulai bekerja dan kelola produktivitas Anda
              hari ini.
            </p>
          </header>

          {/* Portal Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTALS.map((portal) => (
              <PortalCard key={portal.id} portal={portal} />
            ))}
          </section>
        </main>

        {/* --- Footer --- */}
        <Footer />
      </div>
    </MustChangePasswordGate>
  );
}
