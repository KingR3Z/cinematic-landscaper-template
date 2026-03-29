import { client } from "@/config/client";
import Link from "next/link";
import type { Metadata } from "next";

interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
}

export const metadata: Metadata = {
  title: `Blog | ${client.name}`,
  description: `Tips, guides, and insights from ${client.name} in ${client.city}.`,
};

export default function BlogListPage() {
  const c = client as Record<string, unknown>;
  const posts = (c.blog as BlogPost[] | undefined) || [];

  if (posts.length === 0) {
    return (
      <main
        style={{
          minHeight: "100vh",
          background: "#0a0a0a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center", padding: "48px 24px" }}>
          <h1
            style={{
              color: "white",
              fontSize: "2rem",
              fontWeight: 300,
              fontFamily: "'Playfair Display', Georgia, serif",
              marginBottom: "16px",
            }}
          >
            No articles yet
          </h1>
          <Link
            href="/"
            style={{
              color: "var(--color-accent)",
              textDecoration: "none",
              fontSize: "0.9rem",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            &larr; Back to home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a" }}>
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "120px 24px 80px",
        }}
      >
        <Link
          href="/"
          style={{
            color: "rgba(255,255,255,0.4)",
            textDecoration: "none",
            fontSize: "0.8rem",
            fontFamily: "'Space Grotesk', sans-serif",
            display: "inline-block",
            marginBottom: "32px",
          }}
        >
          &larr; {client.name}
        </Link>
        <h1
          style={{
            color: "white",
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 300,
            fontFamily: "'Playfair Display', Georgia, serif",
            marginBottom: "16px",
          }}
        >
          Blog
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.5)",
            fontSize: "1.05rem",
            lineHeight: 1.6,
            marginBottom: "56px",
            fontFamily: "'Space Grotesk', sans-serif",
          }}
        >
          Tips, guides, and insights from {client.name}.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              style={{
                textDecoration: "none",
                display: "block",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "12px",
                padding: "32px 28px",
                transition: "border-color 0.3s, transform 0.3s",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "12px",
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
                <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.7rem" }}>|</span>
                <span
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "0.7rem",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {post.readTime}
                </span>
                <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "0.7rem" }}>|</span>
                <span
                  style={{
                    color: "rgba(255,255,255,0.3)",
                    fontSize: "0.7rem",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  {post.date}
                </span>
              </div>
              <h2
                style={{
                  color: "white",
                  fontSize: "1.25rem",
                  fontWeight: 400,
                  lineHeight: 1.4,
                  marginBottom: "8px",
                  fontFamily: "'Playfair Display', Georgia, serif",
                }}
              >
                {post.title}
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.5)",
                  fontSize: "0.9rem",
                  lineHeight: 1.6,
                }}
              >
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
