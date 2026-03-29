"use client";

import { client } from "@/config/client";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

export default function BlogSection() {
  const c = client as Record<string, unknown>;
  const posts = c.blog as BlogPost[] | undefined;

  if (!posts || posts.length === 0) return null;

  const latest = posts.slice(0, 3);

  return (
    <section
      id="blog"
      className="section-dark"
      style={{ padding: "100px 24px" }}
    >
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <span className="pill-badge pill-badge-accent">Blog</span>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "48px",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <h2
            style={{
              color: "white",
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              fontWeight: 300,
              lineHeight: 1.2,
            }}
          >
            Latest Articles
          </h2>
          <a
            href="/blog"
            style={{
              color: "var(--color-accent)",
              fontSize: "0.85rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
              textDecoration: "none",
              fontFamily: "'Space Grotesk', sans-serif",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            View all articles &rarr;
          </a>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "24px",
          }}
        >
          {latest.map((post) => (
            <a
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{
                textDecoration: "none",
                display: "block",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "12px",
                padding: "32px 28px",
                transition: "all 0.3s var(--ease-smooth)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "16px",
                }}
              >
                <span
                  style={{
                    color: "var(--color-accent)",
                    fontSize: "0.7rem",
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {post.category}
                </span>
                <span
                  style={{
                    color: "rgba(255,255,255,0.25)",
                    fontSize: "0.7rem",
                  }}
                >
                  |
                </span>
                <span
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "0.7rem",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {post.readTime}
                </span>
              </div>
              <h3
                style={{
                  color: "white",
                  fontSize: "1.15rem",
                  fontWeight: 400,
                  lineHeight: 1.4,
                  marginBottom: "12px",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                {post.title}
              </h3>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.88rem",
                  lineHeight: 1.6,
                  marginBottom: "16px",
                }}
              >
                {post.excerpt}
              </p>
              <span
                style={{
                  color: "rgba(255,255,255,0.3)",
                  fontSize: "0.75rem",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                {post.date}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
