import { client } from "@/config/client";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#0a0a0a",
        color: "rgba(255,255,255,0.4)",
        padding: "48px 24px",
        textAlign: "center",
        fontSize: "0.875rem",
      }}
    >
      <p style={{ marginBottom: "8px" }}>
        &copy; {new Date().getFullYear()} {client.name}. All rights reserved.
      </p>
      <p>
        {client.address}, {client.city}, {client.county} {client.postcode}
      </p>
      <p style={{ marginTop: "8px" }}>
        <a
          href="tel:+441233560871"
          style={{
            color: "rgba(255,255,255,0.6)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          Call us 24/7: 01233 560 871
        </a>
      </p>
      {(client.facebook || client.instagram || client.linkedin) && (
        <div
          style={{
            display: "flex",
            gap: "24px",
            justifyContent: "center",
            marginTop: "24px",
          }}
        >
          {client.facebook && (
            <a href={client.facebook} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.5)", padding: "12px 16px" }}>
              Facebook
            </a>
          )}
          {client.instagram && (
            <a href={client.instagram} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.5)", padding: "12px 16px" }}>
              Instagram
            </a>
          )}
          {client.linkedin && (
            <a href={client.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.5)", padding: "12px 16px" }}>
              LinkedIn
            </a>
          )}
        </div>
      )}
    </footer>
  );
}
