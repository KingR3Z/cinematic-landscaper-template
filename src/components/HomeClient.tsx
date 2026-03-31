"use client";

import { useState, useCallback, useEffect } from "react";
import CinematicCanvas from "@/components/CinematicCanvas";
import CanvasErrorBoundary from "@/components/CanvasErrorBoundary";
import HeroOverlay from "@/components/HeroOverlay";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import { client } from "@/config/client";
import FireflyParticles from "@/components/FireflyParticles";
import TransformationGrid from "@/components/TransformationGrid";
import ReviewsSection from "@/components/ReviewsSection";
import ScrollReveal from "@/components/ScrollReveal";
import Header from "@/components/Header";
import CinematicCaptions from "@/components/CinematicCaptions";
import CookieConsent from "@/components/CookieConsent";
import FAQSection from "@/components/FAQSection";
import PortfolioSection from "@/components/PortfolioSection";
import BlogSection from "@/components/BlogSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ABTestProvider from "@/components/ABTestProvider";
import HeroSwitch from "@/components/HeroSwitch";
import WhatsAppButton from "@/components/WhatsAppButton";

const abConfig = (client as Record<string, unknown>).abTest as
  | { experimentId: string; variants: string[] }
  | undefined;

export default function HomeClient() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleProgress = useCallback((progress: number) => {
    setLoadProgress(progress);
  }, []);

  const handleLoaded = useCallback(() => {
    setTimeout(() => setIsLoaded(true), 300);
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      document.documentElement.classList.add("is-loading");
    } else {
      document.documentElement.classList.remove("is-loading");

      // Auto-scroll hint — gentle nudge after 2.5s to show the page is interactive
      const timer = setTimeout(() => {
        // Only auto-scroll if user hasn't scrolled yet
        if (window.scrollY < 10) {
          window.scrollTo({ top: 80, behavior: "smooth" });
        }
      }, 2500);
      return () => clearTimeout(timer);
    }
    return () => document.documentElement.classList.remove("is-loading");
  }, [isLoaded]);

  const content = (
    <>
      {/* Sticky header nav */}
      <Header />

      {/* Subtle grain texture for premium depth */}
      <div className="grain-overlay" />

      {/* Floating firefly particles */}
      <FireflyParticles />

      {/* Loading screen */}
      <div
        role="status"
        aria-live="polite"
        className={`loading-screen ${isLoaded ? "loaded" : ""}`}
      >
        <p
          style={{
            color: "var(--color-accent)",
            fontSize: "0.75rem",
            fontWeight: 600,
            letterSpacing: "0.25em",
            textTransform: "uppercase",
          }}
        >
          {client.name}
        </p>
        <div className="loading-bar-track" aria-label="Loading progress">
          <div
            className="loading-bar-fill"
            style={{
              transform: `scaleX(${loadProgress})`,
              transformOrigin: "left",
            }}
          />
        </div>
        <p
          style={{
            color: "rgba(255,255,255,0.3)",
            fontSize: "0.7rem",
            marginTop: "12px",
          }}
        >
          Loading cinematic experience...
        </p>
      </div>

      {/* Fixed hero overlay — A/B tested if abTest config exists, otherwise default */}
      {abConfig ? <HeroSwitch /> : <HeroOverlay />}

      {/* Scroll progress bar */}
      <div className="scroll-progress" />

      {/* Cinematic scroll captions — fade in/out tied to scroll position */}
      <CinematicCaptions />

      {/* Cinematic scroll section */}
      <CanvasErrorBoundary onFallback={handleLoaded}>
        <CinematicCanvas
          onLoadProgress={handleProgress}
          onLoaded={handleLoaded}
        />
      </CanvasErrorBoundary>

      {/* Smooth fade from cinematic into content */}
      <div className="cinematic-end-fade" />

      {/* Who We Are */}
      <ScrollReveal>
        <AboutSection />
      </ScrollReveal>

      {/* What We Do — services */}
      <ScrollReveal>
        <ServicesSection />
      </ScrollReveal>

      {/* Our Transformations */}
      <ScrollReveal>
        <TransformationGrid />
      </ScrollReveal>

      {/* Google Reviews */}
      <ScrollReveal>
        <ReviewsSection />
      </ScrollReveal>

      {/* Testimonials / case studies (renders only if testimonials data exists in client.ts) */}
      {(client as Record<string, unknown>).testimonials && (
        <ScrollReveal>
          <TestimonialsSection />
        </ScrollReveal>
      )}

      {/* Portfolio gallery (renders only if portfolio data exists in client.ts) */}
      {(client as Record<string, unknown>).portfolio && (
        <ScrollReveal>
          <PortfolioSection />
        </ScrollReveal>
      )}

      {/* Blog articles (renders only if blog data exists in client.ts) */}
      {(client as Record<string, unknown>).blog && (
        <ScrollReveal>
          <BlogSection />
        </ScrollReveal>
      )}

      {/* FAQ — with JSON-LD structured data */}
      <ScrollReveal>
        <FAQSection />
      </ScrollReveal>

      {/* Contact form */}
      <ScrollReveal>
        <ContactSection />
      </ScrollReveal>

      {/* Footer */}
      <Footer />

      {/* WhatsApp click-to-chat (renders only if whatsapp number in client.ts) */}
      <WhatsAppButton />

      {/* GDPR cookie consent */}
      <CookieConsent />
    </>
  );

  if (abConfig) {
    return (
      <ABTestProvider experimentId={abConfig.experimentId} variants={abConfig.variants}>
        {content}
      </ABTestProvider>
    );
  }

  return content;
}
