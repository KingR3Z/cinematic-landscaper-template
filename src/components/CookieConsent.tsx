"use client";

import { useState, useEffect } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  function decline() {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: "16px 24px",
        background: "rgba(10, 10, 10, 0.95)",
        backdropFilter: "blur(12px)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        flexWrap: "wrap",
        animation: "slideUp 0.4s ease-out",
      }}
    >
      <p
        style={{
          color: "rgba(255,255,255,0.7)",
          fontSize: "0.85rem",
          margin: 0,
          maxWidth: "600px",
          lineHeight: 1.5,
        }}
      >
        We use cookies to improve your experience. By continuing to browse, you
        agree to our use of cookies.
      </p>
      <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
        <button
          onClick={accept}
          style={{
            padding: "8px 20px",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "#000",
            background: "var(--color-accent, #4ade80)",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
        >
          Accept
        </button>
        <button
          onClick={decline}
          style={{
            padding: "8px 20px",
            fontSize: "0.8rem",
            fontWeight: 600,
            color: "rgba(255,255,255,0.6)",
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "6px",
            cursor: "pointer",
            transition: "opacity 0.2s",
          }}
        >
          Decline
        </button>
      </div>
      <style>{`@keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
    </div>
  );
}
