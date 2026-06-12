"use client";
import React from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { ProfileDropdown } from "@/app/components/ProfileDropdown";
import MustChangePasswordGate from "@/app/components/MustChangePasswordGate";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PortalCard from "../components/PortalCard";
import { useAuth } from "@/lib/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { getPortal } from "@/lib/api/queries/portal";
import { AccessibleApp } from "@/lib/types/user";

export default function PortalPage() {
  const { user } = useAuth();

  const portals = user?.staff?.accessible_apps ?? [];

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
              Selamat datang,{" "}
              <span className="text-primary">
                {user?.staff.details?.fullname}!
              </span>
            </h1>
            <p className="relative text-lg text-on-surface-variant max-w-xl mx-auto font-light tracking-wide">
              Pilih portal untuk mulai bekerja dan kelola produktivitas Anda
              hari ini.
            </p>
          </header>
          {/* Portal Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {portals.map((portal: AccessibleApp) => (
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
