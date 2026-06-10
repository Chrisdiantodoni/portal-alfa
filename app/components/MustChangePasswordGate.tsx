"use client";

import { useState, useEffect } from "react";
import ForcePasswordChange from "@/app/components/ForcePasswordChange";

interface MustChangePasswordGateProps {
  children: React.ReactNode;
}

export default function MustChangePasswordGate({ children }: MustChangePasswordGateProps) {
  const [mustChange, setMustChange] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const flag = sessionStorage.getItem("must_change_password");
    if (flag === "true" && !sessionStorage.getItem("password_changed")) {
      setMustChange(true);
    }
    setChecked(true);
  }, []);

  if (!checked) return null;

  return (
    <>
      {mustChange && (
        <ForcePasswordChange
          onComplete={() => {
            sessionStorage.setItem("password_changed", "true");
            setMustChange(false);
          }}
        />
      )}
      {children}
    </>
  );
}
