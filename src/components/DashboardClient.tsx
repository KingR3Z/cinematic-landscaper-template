"use client";

import { useState, useEffect } from "react";
import { client } from "@/config/client";
import Link from "next/link";
import {
  Lock,
  SignOut,
  Phone,
  Envelope,
  Globe,
  MapPin,
  Star,
  ChartBar,
  Clock,
  CheckCircle,
  Eye,
  ArrowRight,
  CaretDown,
  CaretUp,
} from "@phosphor-icons/react";

interface DashboardConfig {
  pin: string;
  welcomeMessage?: string;
  enquiries?: Enquiry[];
  stats?: {
    monthlyVisitors?: number;
    enquiriesThisMonth?: number;
    conversionRate?: number;
    avgResponseTime?: string;
  };
  quickLinks?: { label: string; url: string }[];
}

interface Enquiry {
  name: string;
  email: string;
  phone?: string;
  message: string;
  date: string;
  status: "new" | "contacted" | "quoted" | "won" | "lost";
}

const STATUS_COLORS: Record<string, string> = {
  new: "#3b82f6",
  contacted: "#f59e0b",
  quoted: "#8b5cf6",
  won: "#22c55e",
  lost: "#6b7280",
};

export default function DashboardClient() {
  const c = client as Record<string, unknown>;
  const dashboard = c.dashboard as DashboardConfig | undefined;

  if (!dashboard) {
    return (
      <main style={styles.emptyMain}>
        <div style={{ textAlign: "center", padding: "48px 24px" }}>
          <h1 style={styles.emptyTitle}>Dashboard not configured</h1>
          <Link href="/" style={styles.backLink}>
            &larr; Back to home
          </Link>
        </div>
      </main>
    );
  }

  return <DashboardGate dashboard={dashboard} />;
}

function DashboardGate({ dashboard }: { dashboard: DashboardConfig }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("dashboard_auth");
    if (stored === dashboard.pin) setAuthenticated(true);
  }, [dashboard.pin]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === dashboard.pin) {
      sessionStorage.setItem("dashboard_auth", pin);
      setAuthenticated(true);
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPin("");
    }
  };

  if (authenticated) {
    return <DashboardContent dashboard={dashboard} onLogout={() => {
      sessionStorage.removeItem("dashboard_auth");
      setAuthenticated(false);
      setPin("");
    }} />;
  }

  return (
    <main style={styles.loginMain}>
      <form
        onSubmit={handleSubmit}
        style={{
          ...styles.loginCard,
          animation: shake ? "shake 0.4s ease" : undefined,
        }}
      >
        <div style={styles.lockIcon}>
          <Lock size={32} weight="light" color="rgba(255,255,255,0.6)" />
        </div>
        <h1 style={styles.loginTitle}>{client.name}</h1>
        <p style={styles.loginSubtitle}>Enter your dashboard PIN</p>
        <input
          type="password"
          inputMode="numeric"
          maxLength={6}
          value={pin}
          onChange={(e) => {
            setPin(e.target.value);
            setError(false);
          }}
          placeholder="------"
          autoFocus
          style={{
            ...styles.pinInput,
            borderColor: error ? "#ef4444" : "rgba(255,255,255,0.1)",
          }}
        />
        {error && (
          <p style={styles.errorText}>Incorrect PIN. Please try again.</p>
        )}
        <button type="submit" style={styles.loginButton}>
          Access Dashboard
        </button>
        <Link href="/" style={styles.loginBack}>
          &larr; Back to site
        </Link>
      </form>
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }
      `}</style>
    </main>
  );
}

function DashboardContent({
  dashboard,
  onLogout,
}: {
  dashboard: DashboardConfig;
  onLogout: () => void;
}) {
  const [expandedEnquiry, setExpandedEnquiry] = useState<number | null>(null);
  const enquiries = dashboard.enquiries || [];
  const stats = dashboard.stats;
  const quickLinks = dashboard.quickLinks || [];
  const reviews = client.reviews || [];
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : client.googleRating;

  return (
    <main style={styles.dashboardMain}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <div>
            <h1 style={styles.headerTitle}>{client.name}</h1>
            <p style={styles.headerSubtitle}>
              {dashboard.welcomeMessage || "Client Dashboard"}
            </p>
          </div>
          <button onClick={onLogout} style={styles.logoutBtn} title="Log out">
            <SignOut size={18} weight="bold" />
          </button>
        </div>
      </header>

      <div style={styles.content}>
        {/* Stat Cards */}
        {stats && (
          <div style={styles.statGrid}>
            {stats.monthlyVisitors != null && (
              <StatCard
                icon={<Eye size={20} weight="light" />}
                label="Monthly Visitors"
                value={stats.monthlyVisitors.toLocaleString()}
              />
            )}
            {stats.enquiriesThisMonth != null && (
              <StatCard
                icon={<Envelope size={20} weight="light" />}
                label="Enquiries This Month"
                value={String(stats.enquiriesThisMonth)}
              />
            )}
            {stats.conversionRate != null && (
              <StatCard
                icon={<ChartBar size={20} weight="light" />}
                label="Conversion Rate"
                value={`${stats.conversionRate}%`}
              />
            )}
            {stats.avgResponseTime && (
              <StatCard
                icon={<Clock size={20} weight="light" />}
                label="Avg Response Time"
                value={stats.avgResponseTime}
              />
            )}
          </div>
        )}

        <div style={styles.twoCol}>
          {/* Business Info */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Business Details</h2>
            <div style={styles.infoList}>
              <InfoRow
                icon={<Phone size={16} weight="light" />}
                label="Phone"
                value={client.phone}
                href={`tel:${client.phone}`}
              />
              <InfoRow
                icon={<Envelope size={16} weight="light" />}
                label="Email"
                value={client.email}
                href={`mailto:${client.email}`}
              />
              <InfoRow
                icon={<Globe size={16} weight="light" />}
                label="Website"
                value={client.website.replace(/^https?:\/\//, "")}
                href={client.website}
              />
              <InfoRow
                icon={<MapPin size={16} weight="light" />}
                label="Location"
                value={`${client.city}, ${client.county} ${client.postcode}`}
              />
            </div>
          </div>

          {/* Reviews Summary */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Reviews Summary</h2>
            <div style={styles.reviewSummary}>
              <div style={styles.ratingBig}>
                <Star size={28} weight="fill" color="#f59e0b" />
                <span style={styles.ratingNumber}>{avgRating}</span>
              </div>
              <p style={styles.reviewCount}>
                {reviews.length || client.reviewCount} reviews on Google
              </p>
              <div style={styles.ratingBreakdown}>
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = reviews.filter((r) => r.rating === star).length;
                  const pct = reviews.length > 0 ? (count / reviews.length) * 100 : 0;
                  return (
                    <div key={star} style={styles.ratingRow}>
                      <span style={styles.ratingLabel}>{star}</span>
                      <div style={styles.ratingBar}>
                        <div
                          style={{
                            ...styles.ratingFill,
                            width: `${pct}%`,
                          }}
                        />
                      </div>
                      <span style={styles.ratingCount}>{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Enquiries */}
        {enquiries.length > 0 && (
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.cardTitle}>Recent Enquiries</h2>
              <span style={styles.badge}>
                {enquiries.filter((e) => e.status === "new").length} new
              </span>
            </div>
            <div style={styles.enquiryList}>
              {enquiries.map((enq, i) => (
                <div key={i} style={styles.enquiryItem}>
                  <button
                    onClick={() =>
                      setExpandedEnquiry(expandedEnquiry === i ? null : i)
                    }
                    style={styles.enquiryHeader}
                  >
                    <div style={styles.enquiryLeft}>
                      <span
                        style={{
                          ...styles.statusDot,
                          background: STATUS_COLORS[enq.status] || "#6b7280",
                        }}
                      />
                      <div>
                        <span style={styles.enquiryName}>{enq.name}</span>
                        <span style={styles.enquiryDate}>{enq.date}</span>
                      </div>
                    </div>
                    <div style={styles.enquiryRight}>
                      <span
                        style={{
                          ...styles.statusBadge,
                          color: STATUS_COLORS[enq.status] || "#6b7280",
                          background: `${STATUS_COLORS[enq.status] || "#6b7280"}15`,
                        }}
                      >
                        {enq.status}
                      </span>
                      {expandedEnquiry === i ? (
                        <CaretUp size={14} color="rgba(255,255,255,0.4)" />
                      ) : (
                        <CaretDown size={14} color="rgba(255,255,255,0.4)" />
                      )}
                    </div>
                  </button>
                  {expandedEnquiry === i && (
                    <div style={styles.enquiryBody}>
                      <p style={styles.enquiryMsg}>{enq.message}</p>
                      <div style={styles.enquiryContact}>
                        <a href={`mailto:${enq.email}`} style={styles.enquiryLink}>
                          {enq.email}
                        </a>
                        {enq.phone && (
                          <a href={`tel:${enq.phone}`} style={styles.enquiryLink}>
                            {enq.phone}
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Links */}
        {quickLinks.length > 0 && (
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Quick Links</h2>
            <div style={styles.linkGrid}>
              {quickLinks.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.quickLink}
                >
                  <span>{link.label}</span>
                  <ArrowRight size={14} color="rgba(255,255,255,0.4)" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Services */}
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Your Services</h2>
          <div style={styles.serviceGrid}>
            {client.services.map((svc, i) => (
              <div key={i} style={styles.serviceItem}>
                <CheckCircle
                  size={16}
                  weight="fill"
                  color="var(--color-accent)"
                />
                <div>
                  <span style={styles.serviceName}>{svc.title}</span>
                  <span style={styles.serviceDesc}>{svc.description}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer style={styles.footer}>
          <Link href="/" style={styles.footerLink}>
            View live site &rarr;
          </Link>
          <p style={styles.footerText}>
            Powered by{" "}
            <a
              href="https://olibuddy.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.footerBrand}
            >
              Olibuddy
            </a>
          </p>
        </footer>
      </div>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div style={styles.statCard}>
      <div style={styles.statIcon}>{icon}</div>
      <div>
        <p style={styles.statValue}>{value}</p>
        <p style={styles.statLabel}>{label}</p>
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div style={styles.infoRow}>
      <div style={styles.infoIcon}>{icon}</div>
      <div>
        <span style={styles.infoLabel}>{label}</span>
        {href ? (
          <a href={href} style={styles.infoValue} target="_blank" rel="noopener noreferrer">
            {value}
          </a>
        ) : (
          <span style={styles.infoValueText}>{value}</span>
        )}
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  // Empty state
  emptyMain: {
    minHeight: "100vh",
    background: "#0a0a0a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    color: "white",
    fontSize: "2rem",
    fontWeight: 300,
    fontFamily: "'Playfair Display', Georgia, serif",
    marginBottom: "16px",
  },
  backLink: {
    color: "var(--color-accent)",
    textDecoration: "none",
    fontSize: "0.9rem",
    fontFamily: "'Space Grotesk', sans-serif",
  },

  // Login
  loginMain: {
    minHeight: "100vh",
    background: "#0a0a0a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
  },
  loginCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    padding: "48px 40px",
    width: "100%",
    maxWidth: "380px",
    textAlign: "center" as const,
  },
  lockIcon: {
    width: "64px",
    height: "64px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.05)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto 24px",
  },
  loginTitle: {
    color: "white",
    fontSize: "1.4rem",
    fontWeight: 400,
    fontFamily: "'Playfair Display', Georgia, serif",
    marginBottom: "8px",
  },
  loginSubtitle: {
    color: "rgba(255,255,255,0.4)",
    fontSize: "0.85rem",
    fontFamily: "'Space Grotesk', sans-serif",
    marginBottom: "28px",
  },
  pinInput: {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "10px",
    padding: "14px 16px",
    color: "white",
    fontSize: "1.4rem",
    fontFamily: "'Space Grotesk', sans-serif",
    textAlign: "center" as const,
    letterSpacing: "0.3em",
    outline: "none",
    transition: "border-color 0.3s",
    boxSizing: "border-box" as const,
  },
  errorText: {
    color: "#ef4444",
    fontSize: "0.8rem",
    fontFamily: "'Space Grotesk', sans-serif",
    marginTop: "10px",
  },
  loginButton: {
    width: "100%",
    marginTop: "20px",
    padding: "14px",
    background: "var(--color-accent)",
    color: "#0a0a0a",
    border: "none",
    borderRadius: "10px",
    fontSize: "0.9rem",
    fontWeight: 600,
    fontFamily: "'Space Grotesk', sans-serif",
    cursor: "pointer",
    transition: "opacity 0.3s",
  },
  loginBack: {
    display: "inline-block",
    marginTop: "20px",
    color: "rgba(255,255,255,0.3)",
    textDecoration: "none",
    fontSize: "0.8rem",
    fontFamily: "'Space Grotesk', sans-serif",
  },

  // Dashboard
  dashboardMain: {
    minHeight: "100vh",
    background: "#0a0a0a",
  },
  header: {
    position: "sticky" as const,
    top: 0,
    background: "rgba(10,10,10,0.9)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    zIndex: 50,
  },
  headerInner: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "20px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    color: "white",
    fontSize: "1.15rem",
    fontWeight: 400,
    fontFamily: "'Playfair Display', Georgia, serif",
    margin: 0,
  },
  headerSubtitle: {
    color: "rgba(255,255,255,0.4)",
    fontSize: "0.75rem",
    fontFamily: "'Space Grotesk', sans-serif",
    margin: "4px 0 0",
  },
  logoutBtn: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "8px",
    padding: "8px 12px",
    color: "rgba(255,255,255,0.5)",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    transition: "background 0.3s",
  },
  content: {
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "32px 24px 80px",
    display: "flex",
    flexDirection: "column" as const,
    gap: "24px",
  },

  // Stat cards
  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
  },
  statCard: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "12px",
    padding: "24px 20px",
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  statIcon: {
    width: "44px",
    height: "44px",
    borderRadius: "10px",
    background: "rgba(255,255,255,0.05)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "var(--color-accent)",
  },
  statValue: {
    color: "white",
    fontSize: "1.5rem",
    fontWeight: 500,
    fontFamily: "'Space Grotesk', sans-serif",
    margin: 0,
    lineHeight: 1.2,
  },
  statLabel: {
    color: "rgba(255,255,255,0.4)",
    fontSize: "0.75rem",
    fontFamily: "'Space Grotesk', sans-serif",
    margin: "2px 0 0",
  },

  // Two column
  twoCol: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "24px",
  },

  // Cards
  card: {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "12px",
    padding: "28px 24px",
  },
  cardHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  cardTitle: {
    color: "white",
    fontSize: "1rem",
    fontWeight: 500,
    fontFamily: "'Space Grotesk', sans-serif",
    margin: "0 0 20px",
  },
  badge: {
    background: "rgba(59,130,246,0.15)",
    color: "#3b82f6",
    fontSize: "0.7rem",
    fontWeight: 600,
    fontFamily: "'Space Grotesk', sans-serif",
    padding: "4px 10px",
    borderRadius: "20px",
  },

  // Business info
  infoList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "16px",
  },
  infoRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "12px",
  },
  infoIcon: {
    color: "var(--color-accent)",
    marginTop: "2px",
    flexShrink: 0,
  },
  infoLabel: {
    display: "block",
    color: "rgba(255,255,255,0.35)",
    fontSize: "0.7rem",
    fontFamily: "'Space Grotesk', sans-serif",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    marginBottom: "2px",
  },
  infoValue: {
    color: "rgba(255,255,255,0.8)",
    fontSize: "0.9rem",
    fontFamily: "'Space Grotesk', sans-serif",
    textDecoration: "none",
    display: "block",
  },
  infoValueText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: "0.9rem",
    fontFamily: "'Space Grotesk', sans-serif",
    display: "block",
  },

  // Reviews summary
  reviewSummary: { textAlign: "center" as const },
  ratingBig: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "4px",
  },
  ratingNumber: {
    color: "white",
    fontSize: "2.4rem",
    fontWeight: 300,
    fontFamily: "'Playfair Display', Georgia, serif",
  },
  reviewCount: {
    color: "rgba(255,255,255,0.4)",
    fontSize: "0.8rem",
    fontFamily: "'Space Grotesk', sans-serif",
    marginBottom: "20px",
  },
  ratingBreakdown: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "6px",
    maxWidth: "260px",
    margin: "0 auto",
  },
  ratingRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  ratingLabel: {
    color: "rgba(255,255,255,0.5)",
    fontSize: "0.75rem",
    fontFamily: "'Space Grotesk', sans-serif",
    width: "14px",
    textAlign: "right" as const,
  },
  ratingBar: {
    flex: 1,
    height: "6px",
    background: "rgba(255,255,255,0.06)",
    borderRadius: "3px",
    overflow: "hidden",
  },
  ratingFill: {
    height: "100%",
    background: "#f59e0b",
    borderRadius: "3px",
    transition: "width 0.6s ease",
  },
  ratingCount: {
    color: "rgba(255,255,255,0.3)",
    fontSize: "0.7rem",
    fontFamily: "'Space Grotesk', sans-serif",
    width: "20px",
  },

  // Enquiries
  enquiryList: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "8px",
  },
  enquiryItem: {
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.05)",
    borderRadius: "8px",
    overflow: "hidden",
  },
  enquiryHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 16px",
    background: "none",
    border: "none",
    cursor: "pointer",
    textAlign: "left" as const,
  },
  enquiryLeft: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  statusDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    flexShrink: 0,
  },
  enquiryName: {
    color: "white",
    fontSize: "0.9rem",
    fontFamily: "'Space Grotesk', sans-serif",
    display: "block",
    lineHeight: 1.3,
  },
  enquiryDate: {
    color: "rgba(255,255,255,0.3)",
    fontSize: "0.7rem",
    fontFamily: "'Space Grotesk', sans-serif",
    display: "block",
  },
  enquiryRight: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  statusBadge: {
    fontSize: "0.65rem",
    fontWeight: 600,
    fontFamily: "'Space Grotesk', sans-serif",
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    padding: "3px 8px",
    borderRadius: "4px",
  },
  enquiryBody: {
    padding: "0 16px 16px",
    borderTop: "1px solid rgba(255,255,255,0.04)",
  },
  enquiryMsg: {
    color: "rgba(255,255,255,0.6)",
    fontSize: "0.85rem",
    lineHeight: 1.6,
    fontFamily: "'Space Grotesk', sans-serif",
    margin: "14px 0 12px",
  },
  enquiryContact: {
    display: "flex",
    gap: "16px",
    flexWrap: "wrap" as const,
  },
  enquiryLink: {
    color: "var(--color-accent)",
    fontSize: "0.8rem",
    fontFamily: "'Space Grotesk', sans-serif",
    textDecoration: "none",
  },

  // Quick links
  linkGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "10px",
  },
  quickLink: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "14px 16px",
    background: "rgba(255,255,255,0.02)",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "8px",
    color: "rgba(255,255,255,0.7)",
    textDecoration: "none",
    fontSize: "0.85rem",
    fontFamily: "'Space Grotesk', sans-serif",
    transition: "border-color 0.3s",
  },

  // Services
  serviceGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "12px",
  },
  serviceItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    padding: "4px 0",
  },
  serviceName: {
    color: "white",
    fontSize: "0.9rem",
    fontFamily: "'Space Grotesk', sans-serif",
    display: "block",
    lineHeight: 1.3,
  },
  serviceDesc: {
    color: "rgba(255,255,255,0.4)",
    fontSize: "0.78rem",
    fontFamily: "'Space Grotesk', sans-serif",
    display: "block",
    lineHeight: 1.5,
  },

  // Footer
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "24px 0 0",
    borderTop: "1px solid rgba(255,255,255,0.06)",
  },
  footerLink: {
    color: "var(--color-accent)",
    textDecoration: "none",
    fontSize: "0.85rem",
    fontFamily: "'Space Grotesk', sans-serif",
  },
  footerText: {
    color: "rgba(255,255,255,0.3)",
    fontSize: "0.75rem",
    fontFamily: "'Space Grotesk', sans-serif",
  },
  footerBrand: {
    color: "rgba(255,255,255,0.5)",
    textDecoration: "none",
  },
};
