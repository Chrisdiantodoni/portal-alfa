"use client";
import Cookies from "js-cookie";

import { useState, useEffect } from "react";
import ForcePasswordChange from "@/app/components/ForcePasswordChange";
import { useAuth } from "@/lib/providers/AuthProvider";

interface MustChangePasswordGateProps {
  children: React.ReactNode;
}

export default function MustChangePasswordGate({
  children,
}: MustChangePasswordGateProps) {
  const { mustChangePassword } = useAuth();

  return (
    <>
      {mustChangePassword && <ForcePasswordChange />}
      {children}
    </>
  );
}
