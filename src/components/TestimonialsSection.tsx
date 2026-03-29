"use client";

import { client } from "@/config/client";
import { Quotes } from "@phosphor-icons/react";

interface Testimonial {
  name: string;
  role?: string;
  photo?: string;
  quote: string;
  project?: string;
  result?: string;
}

export default function TestimonialsSection() {
  const c = client as Record<string, unknown>;
  const testimonials = c.testimonials as Testimonial[] | undefined;

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="section-dark" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <span className="pill-badge pill-badge-accent">Success Stories</span>
        <h2
          style={{
            color: "white",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 300,
            lineHeight: 1.2,
            marginBottom: "48px",
          }}
        >
          What Our Clients Say
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "24px",
          }}
        >
          {testimonials.map((t, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "16px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <Quotes
                size={32}
                weight="fill"
                style={{ color: "var(--color-accent)", opacity: 0.6 }}
              />

              <p
                style={{
                  color: "rgba(255,255,255,0.85)",
                  fontSize: "0.95rem",
                  lineHeight: 1.7,
                  fontStyle: "italic",
                  flex: 1,
                }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>

              {t.result && (
                <div
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    borderLeft: "3px solid var(--color-accent)",
                  }}
                >
                  <span
                    style={{
                      color: "var(--color-accent)",
                      fontSize: "0.7rem",
                      fontWeight: 600,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    }}
                  >
                    Result
                  </span>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.75)",
                      fontSize: "0.85rem",
                      lineHeight: 1.5,
                      marginTop: "4px",
                    }}
                  >
                    {t.result}
                  </p>
                </div>
              )}

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                {t.photo && (
                  <img
                    src={t.photo}
                    alt={t.name}
                    style={{
                      width: "44px",
                      height: "44px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                )}
                <div>
                  <p
                    style={{
                      color: "white",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                    }}
                  >
                    {t.name}
                  </p>
                  {(t.role || t.project) && (
                    <p
                      style={{
                        color: "rgba(255,255,255,0.4)",
                        fontSize: "0.8rem",
                      }}
                    >
                      {t.role}
                      {t.role && t.project ? " — " : ""}
                      {t.project}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
