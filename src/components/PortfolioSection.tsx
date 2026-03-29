"use client";

import { useState } from "react";
import { client } from "@/config/client";
import { X } from "@phosphor-icons/react";

interface PortfolioItem {
  src: string;
  alt: string;
  caption?: string;
}

const defaultPortfolio: PortfolioItem[] = [
  { src: "/images/before.jpg", alt: "Project 1", caption: "Full project transformation" },
  { src: "/images/after.jpg", alt: "Project 2", caption: "Completed work" },
  { src: "/images/patio-after.jpg", alt: "Project 3", caption: "Patio installation" },
  { src: "/images/front-before.jpg", alt: "Project 4", caption: "Front area" },
  { src: "/images/lawn-before.jpg", alt: "Project 5", caption: "Lawn project" },
  { src: "/images/deck-after.jpg", alt: "Project 6", caption: "Decking project" },
];

export default function PortfolioSection() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const c = client as Record<string, unknown>;
  const portfolio: PortfolioItem[] =
    (c.portfolio as PortfolioItem[] | undefined) || defaultPortfolio;

  if (portfolio.length === 0) return null;

  function prev() {
    setLightboxIndex((i) => (i !== null ? (i - 1 + portfolio.length) % portfolio.length : null));
  }
  function next() {
    setLightboxIndex((i) => (i !== null ? (i + 1) % portfolio.length : null));
  }

  return (
    <section id="portfolio" className="section-dark" style={{ padding: "100px 24px" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <span className="pill-badge pill-badge-accent">Our Work</span>
        <h2
          style={{
            color: "white",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 300,
            lineHeight: 1.2,
            marginBottom: "48px",
          }}
        >
          Portfolio
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {portfolio.map((item, i) => (
            <button
              key={i}
              onClick={() => setLightboxIndex(i)}
              style={{
                position: "relative",
                aspectRatio: "4/3",
                overflow: "hidden",
                borderRadius: "12px",
                border: "none",
                padding: 0,
                cursor: "pointer",
                background: "rgba(255,255,255,0.05)",
              }}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "transform 0.4s ease",
                }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.transform = "scale(1.05)"; }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.transform = "scale(1)"; }}
              />
              {item.caption && (
                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "24px 16px 12px",
                    background: "linear-gradient(transparent, rgba(0,0,0,0.7))",
                    color: "white",
                    fontSize: "0.85rem",
                    textAlign: "left",
                  }}
                >
                  {item.caption}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          role="dialog"
          aria-label="Image lightbox"
          onClick={() => setLightboxIndex(null)}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 10000,
            background: "rgba(0,0,0,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            animation: "fadeIn 0.2s ease",
          }}
        >
          <button
            onClick={(e) => { e.stopPropagation(); setLightboxIndex(null); }}
            aria-label="Close lightbox"
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
              zIndex: 2,
            }}
          >
            <X size={32} weight="bold" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous image"
            style={{
              position: "absolute",
              left: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "white",
              fontSize: "2rem",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              cursor: "pointer",
              zIndex: 2,
            }}
          >
            ‹
          </button>

          <img
            src={portfolio[lightboxIndex].src}
            alt={portfolio[lightboxIndex].alt}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "90vw",
              maxHeight: "85vh",
              objectFit: "contain",
              borderRadius: "8px",
            }}
          />

          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next image"
            style={{
              position: "absolute",
              right: "20px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.1)",
              border: "none",
              color: "white",
              fontSize: "2rem",
              width: "48px",
              height: "48px",
              borderRadius: "50%",
              cursor: "pointer",
              zIndex: 2,
            }}
          >
            ›
          </button>

          {portfolio[lightboxIndex].caption && (
            <div
              style={{
                position: "absolute",
                bottom: "24px",
                color: "white",
                fontSize: "0.95rem",
                textAlign: "center",
              }}
            >
              {portfolio[lightboxIndex].caption}
            </div>
          )}

          <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
        </div>
      )}
    </section>
  );
}
