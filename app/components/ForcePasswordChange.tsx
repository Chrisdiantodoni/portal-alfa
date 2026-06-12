"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@iconify/react";
import { useAuth } from "@/lib/providers/AuthProvider";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { changePassword } from "@/lib/api/queries/login";
import { useToast } from "./Toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// 1. Definisikan Schema Validasi menggunakan Zod
const passwordSchema = z
  .object({
    password: z
      .string()
      .min(1, "Kata sandi baru wajib diisi.")
      .min(8, "Kata sandi minimal 8 karakter.")
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d).+$/,
        "Kata sandi harus merupakan kombinasi huruf dan angka.", // Pesan error custom untuk user
      ),
    password_confirmation: z
      .string()
      .min(1, "Konfirmasi kata sandi wajib diisi."),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Kata sandi tidak cocok.",
    path: ["password_confirmation"],
  });

// Infer tipe data dari Zod Schema untuk React Hook Form
type PasswordFormValues = z.infer<typeof passwordSchema>;

interface ForcePasswordChangeProps {
  onComplete?: () => void;
}

export default function ForcePasswordChange({
  onComplete,
}: ForcePasswordChangeProps) {
  const { refreshAuth } = useAuth();
  const { toast } = useToast();

  // 2. Hubungkan Zod Schema ke React Hook Form menggunakan zodResolver
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      password_confirmation: "",
    },
  });

  // 3. TanStack Mutation untuk Kirim Data ke API Laravel
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: PasswordFormValues) => {
      const res = await changePassword(values);
      return res;
    },
    onSuccess: () => {
      toast("Password changed successfully", "success");
      refreshAuth(); // Update session, matikan flag, modal hilang otomatis
      if (onComplete) onComplete();
    },
    onError: (err: any) => {
      toast(err?.message || "Failed to change password", "error");
    },
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-md mx-4 p-8 rounded-3xl bg-surface-container-high border border-white/5 shadow-2xl">
        <div className="flex flex-col items-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
            <Icon icon="mdi:shield-key" className="text-3xl text-primary" />
          </div>
          <h2 className="text-xl font-bold text-on-surface">
            Ganti Kata Sandi
          </h2>
          <p className="text-sm text-on-surface-variant mt-1 text-center">
            Demi keamanan, Anda wajib mengganti kata sandi sebelum melanjutkan.
          </p>
        </div>

        <form
          onSubmit={handleSubmit((values) => mutate(values))}
          className="space-y-4"
        >
          {/* INPUT KATA SANDI BARU */}
          <div>
            <label className="text-[11px] font-black text-on-surface-variant tracking-widest uppercase ml-1">
              Kata Sandi Baru
            </label>
            <div className="relative group mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors">
                <Icon
                  icon="mdi:lock-reset"
                  className="text-lg text-on-surface-variant/60 group-focus-within:text-primary"
                />
              </span>
              <input
                className="block w-full pl-12 pr-4 py-3.5 bg-surface-container-lowest border-none text-on-surface placeholder:text-outline/30 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 rounded-2xl"
                type="password"
                placeholder="Minimal 8 karakter"
                disabled={isPending}
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs font-medium flex items-center gap-1 mt-1.5 ml-1">
                <Icon icon="mdi:alert-circle" className="text-sm" />
                {errors.password.message}
              </p>
            )}
          </div>

          {/* INPUT KONFIRMASI KATA SANDI */}
          <div>
            <label className="text-[11px] font-black text-on-surface-variant tracking-widest uppercase ml-1">
              Konfirmasi Kata Sandi
            </label>
            <div className="relative group mt-2">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 transition-colors">
                <Icon
                  icon="mdi:lock-check"
                  className="text-lg text-on-surface-variant/60 group-focus-within:text-primary"
                />
              </span>
              <input
                className="block w-full pl-12 pr-4 py-3.5 bg-surface-container-lowest border-none text-on-surface placeholder:text-outline/30 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 rounded-2xl"
                type="password"
                placeholder="Ulangi kata sandi"
                disabled={isPending}
                {...register("password_confirmation")}
              />
            </div>
            {errors.password_confirmation && (
              <p className="text-red-400 text-xs font-medium flex items-center gap-1 mt-1.5 ml-1">
                <Icon icon="mdi:alert-circle" className="text-sm" />
                {errors.password_confirmation.message}
              </p>
            )}
          </div>

          {/* BUTTON UTAMA */}
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary font-black rounded-2xl shadow-lg shadow-primary/10 hover:shadow-primary/25 hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center space-x-2 uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <Icon
              icon={isPending ? "svg-spinners:180-ring" : "mdi:check-circle"}
              className="text-lg"
            />
            <span>{isPending ? "Menyimpan..." : "Simpan & Lanjutkan"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
