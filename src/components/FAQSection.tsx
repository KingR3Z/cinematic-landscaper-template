"use client";

import { useState } from "react";
import { client } from "@/config/client";

interface FAQItem {
  question: string;
  answer: string;
}

const defaultFAQs: FAQItem[] = [
  {
    question: `What areas do you cover?`,
    answer: `We primarily serve ${client.city} and the surrounding areas. Contact us to check if we cover your location.`,
  },
  {
    question: `Do you offer free quotes?`,
    answer: `Yes — we offer completely free, no-obligation quotes. Get in touch and we'll arrange a convenient time to visit your property.`,
  },
  {
    question: `Are you fully insured?`,
    answer: `Yes, we carry full public liability insurance for all work we undertake. We're happy to provide proof of insurance on request.`,
  },
  {
    question: `How long does a typical project take?`,
    answer: `Project timelines vary depending on scope. A small job might take a day, while a larger project could take 1-3 weeks. We'll give you a clear timeline with your quote.`,
  },
  {
    question: `Do you remove all waste?`,
    answer: `Yes, we remove all waste and leave your property clean and tidy at the end of every job. Waste disposal is included in our quotes.`,
  },
];

function FAQItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        style={{
          width: "100%",
          padding: "20px 0",
          background: "none",
          border: "none",
          color: "white",
          fontSize: "1.05rem",
          fontWeight: 400,
          textAlign: "left",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "16px",
          transition: "color 0.2s",
        }}
      >
        <span>{item.question}</span>
        <span
          style={{
            color: "var(--color-accent)",
            fontSize: "1.4rem",
            fontWeight: 300,
            flexShrink: 0,
            transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
            transition: "transform 0.3s ease",
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: isOpen ? "200px" : "0",
          overflow: "hidden",
          transition: "max-height 0.3s ease",
        }}
      >
        <p
          style={{
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.7,
            paddingBottom: "20px",
            fontSize: "0.95rem",
          }}
        >
          {item.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] =
    (client as Record<string, unknown>).faqs as FAQItem[] | undefined || defaultFAQs;

  // JSON-LD structured data for Google
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faq" className="section-dark" style={{ padding: "100px 24px" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <span className="pill-badge pill-badge-accent">FAQ</span>
        <h2
          style={{
            color: "white",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 300,
            lineHeight: 1.2,
            marginBottom: "48px",
          }}
        >
          Frequently Asked Questions
        </h2>
        <div>
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              item={faq}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
