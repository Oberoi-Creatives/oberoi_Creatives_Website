import { motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";

// ─── Deliverable row ──────────────────────────────────────────────────────────

function DeliverableRow({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div
      className="flex items-start justify-between gap-4 border-b py-4"
      style={{ borderColor: "rgba(245,245,245,0.07)" }}
    >
      <span
        className="font-mono text-[11px] uppercase tracking-[0.16em] shrink-0 pt-0.5"
        style={{ color: "#555555" }}
      >
        {label}
      </span>
      <span
        className="font-mono text-[12px] text-right leading-relaxed"
        style={{ color: accent ? "#D4FF00" : "#F5F5F5" }}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Package card ─────────────────────────────────────────────────────────────

function PackageCard({
  tier,
  name,
  price,
  tagline,
  deliverables,
  highlight,
  badge,
}: {
  tier: string;
  name: string;
  price: string;
  tagline: string;
  deliverables: { label: string; value: string; accent?: boolean }[];
  highlight?: boolean;
  badge?: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 22 }}
      className="relative flex flex-col"
      style={{
        background: highlight ? "rgba(255,51,51,0.06)" : "#1a1a1a",
        border: highlight
          ? "1px solid rgba(255,51,51,0.45)"
          : "1px solid rgba(245,245,245,0.08)",
      }}
    >
      {badge && (
        <div
          className="absolute right-0 top-0 font-mono text-[9px] uppercase tracking-[0.22em] px-3 py-1"
          style={{ background: "#D4FF00", color: "#111111" }}
        >
          {badge}
        </div>
      )}

      <div className="p-9 pb-0">
        {/* Tier label */}
        <div className="mb-6 font-mono text-[10px] uppercase tracking-[0.26em]" style={{ color: "#888888" }}>
          {tier}
        </div>

        {/* Package name */}
        <h3
          className="uppercase leading-[1] mb-3"
          style={{
            fontFamily: "Impact, 'Haettenschweiler', 'Arial Narrow Bold', sans-serif",
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            letterSpacing: "-0.01em",
            color: "#F5F5F5",
          }}
        >
          {name}
        </h3>

        {/* Price */}
        <div className="mb-2">
          <span
            className="leading-none"
            style={{
              fontFamily: "Impact, 'Haettenschweiler', 'Arial Narrow Bold', sans-serif",
              fontSize: "clamp(3rem, 5vw, 4rem)",
              letterSpacing: "-0.02em",
              color: highlight ? "#FF3333" : "#F5F5F5",
            }}
          >
            {price}
          </span>
        </div>
        <div className="mb-8 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "#888888" }}>
          per month · 30-day rolling · no lock-in
        </div>

        {/* Tagline */}
        <p className="mb-8 font-mono text-[12px] leading-[1.9]" style={{ color: "#888888" }}>
          {tagline}
        </p>
      </div>

      {/* Deliverables */}
      <div className="px-9 pb-9">
        <div
          className="mb-3 font-mono text-[9px] uppercase tracking-[0.28em]"
          style={{ color: "#FF3333" }}
        >
          // What you actually get
        </div>
        {deliverables.map((d) => (
          <DeliverableRow key={d.label} label={d.label} value={d.value} accent={d.accent} />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Services Bento ───────────────────────────────────────────────────────────

const PACKAGE_15K = {
  tier: "01 · The Growth Engine",
  name: "2X GROWTH ENGINE",
  price: "Let's Discuss",
  tagline:
    "Built for retail shops, F&B brands, and service businesses ready to build a daily social presence. We come to your site every 4th day and capture everything worth showing.",
  highlight: false,
  deliverables: [
    { label: "Monthly Reels", value: "30 Reels — Edited, Captioned, Posted", accent: true },
    { label: "Static Posts", value: "7–8 Static / Carousel Posts" },
    { label: "Daily Stories", value: "1–2 Stories per day" },
    { label: "Shoot Cadence", value: "On-site 4K shoot every 4th day", accent: true },
    { label: "Platforms", value: "Instagram + YouTube Shorts" },
    { label: "Turnaround", value: "48-Hour rough-cut delivery", accent: true },
    { label: "Strategy", value: "Monthly content calendar included" },
    { label: "Reporting", value: "Weekly reach + engagement report" },
  ],
};

const PACKAGE_20K = {
  tier: "02 · The Premium Build",
  name: "5X PREMIUM BUILD",
  price: "Let's Discuss",
  tagline:
    "For brands where aesthetics are everything — fashion labels, F&B, real estate. Lower frequency, maximum production value. Every frame is art-directed.",
  highlight: true,
  badge: "FULL PRODUCTION",
  deliverables: [
    { label: "Better Props", value: "Use of Gimbal + Softbox Lights + Accent Lights" },
    { label: "Catalogue Shoots", value: "Full product + lifestyle catalogues", accent: true },
    { label: "Model Sourcing", value: "We handle casting + coordination" },
    { label: "Long-form Content", value: "Brand films, explainers, reels series", accent: true },
    { label: "Static Posts", value: "12–15 art-directed statics" },
    { label: "Shoot Cadence", value: "Bi-weekly concept shoots", accent: true },
    { label: "Production Value", value: "Styled sets, lighting design, props" },
    { label: "Turnaround", value: "48H rough-cut + revision cycle", accent: true }
  ],
};

export function ServicesBento() {
  return (
    <section id="services" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionLabel>Services / Packages</SectionLabel>

        {/* Section header */}
        <div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2
            className="uppercase"
            style={{
              fontFamily: "Impact, 'Haettenschweiler', 'Arial Narrow Bold', sans-serif",
              fontSize: "clamp(3.5rem, 9vw, 7rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.02em",
              color: "#F5F5F5",
            }}
          >
            THE
            <br />
            <span style={{ color: "#FF3333" }}>PLAYBOOK.</span>
          </h2>
          <p className="max-w-xs font-mono text-[12px] leading-[1.8]" style={{ color: "#888888" }}>
            Two offers. Two budgets. Zero vague promises. Pick your play — we
            deliver the exact line items listed below. Every month. On time.
          </p>
        </div>

        {/* Package grid */}
        <div
          className="mt-12 grid grid-cols-1 gap-px md:grid-cols-2"
          style={{ background: "rgba(245,245,245,0.06)" }}
        >
          <PackageCard {...PACKAGE_15K} />
          <PackageCard {...PACKAGE_20K} />
        </div>

        {/* Custom scope note */}
        <div
          className="mt-6 border-l-2 pl-5 py-3"
          style={{ borderColor: "#FF3333" }}
        >
          <p className="font-mono text-[12px] leading-[1.7]" style={{ color: "#888888" }}>
            <span style={{ color: "#D4FF00" }}>&gt;</span>{" "}
            Custom scopes available upon briefing. If your brand needs something
            that doesn't fit either box, tell us. We'll build the brief together.
          </p>
        </div>
      </div>
    </section>
  );
}
