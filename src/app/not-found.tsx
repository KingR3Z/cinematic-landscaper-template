import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "400px" }}>
        <h1
          style={{
            color: "white",
            fontSize: "4rem",
            fontWeight: 200,
            fontFamily: "'Playfair Display', Georgia, serif",
            marginBottom: "8px",
            letterSpacing: "-0.02em",
          }}
        >
          404
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "1rem",
            marginBottom: "32px",
            lineHeight: 1.6,
          }}
        >
          Page not found.
        </p>
        <Link
          href="/"
          style={{
            display: "inline-block",
            padding: "12px 24px",
            background: "rgba(200,169,126,0.15)",
            border: "1px solid rgba(200,169,126,0.3)",
            borderRadius: "8px",
            color: "#c8a97e",
            textDecoration: "none",
            fontSize: "0.9rem",
          }}
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
