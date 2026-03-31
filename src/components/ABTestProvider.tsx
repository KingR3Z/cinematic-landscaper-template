"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface ABTestContext {
  variant: string;
  experimentId: string;
}

const ABContext = createContext<ABTestContext>({ variant: "A", experimentId: "" });

export function useABTest() {
  return useContext(ABContext);
}

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, days: number) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires};path=/;SameSite=Lax`;
}

interface Props {
  experimentId: string;
  variants: string[];
  children: React.ReactNode;
}

export default function ABTestProvider({ experimentId, variants, children }: Props) {
  const [variant, setVariant] = useState(variants[0]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const cookieKey = `ab_${experimentId}`;
    const existing = getCookie(cookieKey);

    if (existing && variants.includes(existing)) {
      setVariant(existing);
    } else {
      const assigned = variants[Math.floor(Math.random() * variants.length)];
      setCookie(cookieKey, assigned, 30);
      setVariant(assigned);

      // Record assignment
      fetch("/api/ab", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "assign",
          experimentId,
          variant: assigned,
        }),
      }).catch(() => {});
    }
    setReady(true);
  }, [experimentId, variants]);

  if (!ready) return <>{children}</>;

  return (
    <ABContext.Provider value={{ variant, experimentId }}>
      {children}
    </ABContext.Provider>
  );
}
