import { client } from "@/config/client";
import Link from "next/link";
import { notFound } from "next/navigation";
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

function getPosts(): BlogPost[] {
  const c = client as Record<string, unknown>;
  return (c.blog as BlogPost[] | undefined) || [];
}

export function generateStaticParams() {
  return getPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPosts().find((p) => p.slug === slug);
  if (!post) return { title: "Not Found" };

  return {
    title: `${post.title} | ${client.name}`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [client.name],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPosts().find((p) => p.slug === slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: {
      "@type": "Organization",
      name: client.name,
    },
    publisher: {
      "@type": "Organization",
      name: client.name,
    },
  };

  return (
    <main style={{ minHeight: "100vh", background: "#0a0a0a" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article
        style={{
          maxWidth: "720px",
          margin: "0 auto",
          padding: "120px 24px 80px",
        }}
      >
        <Link
          href="/blog"
          style={{
            color: "rgba(255,255,255,0.4)",
            textDecoration: "none",
            fontSize: "0.8rem",
            fontFamily: "'Space Grotesk', sans-serif",
            display: "inline-block",
            marginBottom: "32px",
          }}
        >
          &larr; All articles
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "20px",
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

        <h1
          style={{
            color: "white",
            fontSize: "clamp(1.75rem, 5vw, 2.75rem)",
            fontWeight: 300,
            lineHeight: 1.25,
            fontFamily: "'Playfair Display', Georgia, serif",
            marginBottom: "40px",
          }}
        >
          {post.title}
        </h1>

        <div
          className="blog-content"
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: "1.05rem",
            lineHeight: 1.8,
            fontFamily: "'Space Grotesk', sans-serif",
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div
          style={{
            marginTop: "64px",
            paddingTop: "32px",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <Link
            href="/blog"
            style={{
              color: "var(--color-accent)",
              textDecoration: "none",
              fontSize: "0.85rem",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            &larr; All articles
          </Link>
          <Link
            href="/#contact"
            style={{
              padding: "10px 24px",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "50px",
              color: "white",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Get a Free Quote
          </Link>
        </div>
      </article>
    </main>
  );
}
