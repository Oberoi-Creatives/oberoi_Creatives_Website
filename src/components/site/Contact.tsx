import { useState, type FormEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionLabel } from "./SectionLabel";

// ─────────────────────────────────────────────────────────────
// Web3Forms — free static form backend, no server required.
//   1. Grab your access key at https://web3forms.com (free)
//   2. Replace the string below.
// ─────────────────────────────────────────────────────────────
const WEB3FORMS_ACCESS_KEY = "9f82bdde-d09a-44e7-9fd1-6cbe2fd30e43";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

type Play = "" | "2X" | "5X" | "custom";

const PLAY_OPTIONS: { value: Play; label: string; price: string }[] = [
  { value: "2X",    label: "2X Growth Engine",  price: "Let's Discuss" },
  { value: "5X",    label: "5X Premium Build",  price: "Let's Discuss" },
  { value: "custom", label: "Custom Build",        price: "Let's talk" },
];

// ─── Ticket field ─────────────────────────────────────────────────────────────

function TicketField({
  id,
  label,
  sublabel,
  type = "text",
  required = true,
  placeholder = "",
  value,
  onChange,
}: {
  id: string;
  label: string;
  sublabel?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="border-b" style={{ borderColor: "rgba(245,245,245,0.08)" }}>
      {/* Stack vertically on mobile, side-by-side on sm+ */}
      <div className="flex flex-col gap-1 px-4 py-4 sm:flex-row sm:items-start sm:gap-4 sm:px-6">
        {/* Label */}
        <div className="sm:w-44 sm:shrink-0 sm:pt-0.5">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "#FF3333" }}>
            {label}
          </div>
          {sublabel && (
            <div className="mt-0.5 font-mono text-[9px] leading-relaxed" style={{ color: "#555555" }}>
              {sublabel}
            </div>
          )}
        </div>
        {/* Input */}
        <input
          id={id}
          name={id}
          type={type}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-transparent font-mono text-[13px] outline-none placeholder:text-[#333333] transition-colors"
          style={{ color: "#F5F5F5" }}
          onFocus={(e) => {
            const row = e.currentTarget.closest("div.border-b") as HTMLElement | null;
            if (row) row.style.borderColor = "rgba(255,51,51,0.4)";
          }}
          onBlur={(e) => {
            const row = e.currentTarget.closest("div.border-b") as HTMLElement | null;
            if (row) row.style.borderColor = "rgba(245,245,245,0.08)";
          }}
        />
      </div>
    </div>
  );
}

// ─── Play selector (dropdown replacement) ────────────────────────────────────

function PlaySelector({
  value,
  onChange,
}: {
  value: Play;
  onChange: (v: Play) => void;
}) {
  return (
    <div className="border-b" style={{ borderColor: "rgba(245,245,245,0.08)" }}>
      <div className="px-4 py-4 sm:px-6">
        <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "#FF3333" }}>
          Select Your Play
          <span className="ml-2 font-mono text-[9px]" style={{ color: "#555555" }}>
            (required)
          </span>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          {PLAY_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className="flex items-center justify-between px-4 py-3 transition-all sm:flex-col sm:items-start"
              style={{
                background: value === opt.value ? "rgba(255,51,51,0.12)" : "transparent",
                border: value === opt.value
                  ? "1px solid #FF3333"
                  : "1px solid rgba(245,245,245,0.12)",
                width: "100%",
              }}
            >
              <span
                className="font-mono text-[11px] uppercase tracking-[0.16em]"
                style={{ color: value === opt.value ? "#F5F5F5" : "#888888" }}
              >
                {opt.label}
              </span>
              <span
                className="font-mono text-[10px] sm:mt-1"
                style={{ color: value === opt.value ? "#FF3333" : "#444444" }}
              >
                {opt.price}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Bottleneck field ─────────────────────────────────────────────────────────

function BottleneckField({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="border-b" style={{ borderColor: "rgba(245,245,245,0.08)" }}>
      <div className="px-4 py-4 sm:px-6">
        <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "#FF3333" }}>
          Biggest bottleneck right now?
        </div>
        <div className="mb-2 font-mono text-[9px]" style={{ color: "#555555" }}>
          No views? No time to shoot? No strategy? Tell us in one line.
        </div>
        <input
          id="bottleneck"
          name="bottleneck"
          type="text"
          required
          placeholder="e.g. We post but nothing gets views..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent font-mono text-[13px] outline-none placeholder:text-[#333333]"
          style={{ color: "#F5F5F5" }}
        />
      </div>
    </div>
  );
}

// ─── Contact section ──────────────────────────────────────────────────────────

export function Contact() {
  const [name, setName] = useState("");
  const [instagram, setInstagram] = useState("");
  const [play, setPlay] = useState<Play>("");
  const [bottleneck, setBottleneck] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [error, setError] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!play) return;
    setState("sending");
    setError("");

    // Capture the form element NOW — before any await, because React nullifies
    // e.currentTarget after the event handler yields to the microtask queue.
    const formEl = e.currentTarget;

    const selectedPlay = PLAY_OPTIONS.find((p) => p.value === play);
    const fd = new FormData(formEl);
    fd.append("access_key", WEB3FORMS_ACCESS_KEY);
    fd.append(
      "subject",
      `New booking [${selectedPlay?.label}] — Sam Creattive`
    );
    fd.append("from_name", "Sam Creattive Site");
    fd.append("play", selectedPlay?.label ?? play);

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, { method: "POST", body: fd });
      const json = await res.json();
      if (json.success) {
        setState("ok");
        formEl.reset();
        setName(""); setInstagram(""); setPlay(""); setBottleneck("");
      } else {
        setState("err");
        setError(json.message ?? "Something went wrong.");
      }
    } catch (err) {
      setState("err");
      setError(err instanceof Error ? err.message : "Network error");
    }
  };

  const selectedPlay = PLAY_OPTIONS.find((p) => p.value === play);

  return (
    <section id="contact" className="relative py-16 sm:py-24">
      {/* Red gradient rule */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, #FF3333, transparent)" }}
      />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-8">
        <SectionLabel>Book Your Slot</SectionLabel>

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
            READY TO
            <br />
            <span style={{ color: "#FF3333" }}>SHOOT?</span>
          </h2>
          <p className="max-w-xs font-mono text-[12px] leading-[1.8]" style={{ color: "#888888" }}>
            4 client max. 2 slots currently open. Fill the order ticket — we'll
            audit your Instagram before the call so we hit the ground running.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr]">

          {/* Left: contact info */}
          <div className="space-y-8">
            <a
              href="mailto:oberoicreatives@gmail.com"
              className="group inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em] transition-colors"
              style={{ color: "#888888" }}
            >
              <span className="group-hover:text-[#FF3333] transition-colors">oberoicreatives@gmail.com</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>

            <dl
              className="grid grid-cols-2 gap-6 border-t pt-8"
              style={{ borderColor: "rgba(245,245,245,0.08)" }}
            >
              {[
                { k: "Location",    v: "Delhi NCR. Onsite" },
                { k: "Response",    v: "Within 24 hours" },
                { k: "Contracts",   v: "30-day rolling" },
                { k: "Slots Left",  v: "2 of 4 open", accent: true },
              ].map((item) => (
                <div key={item.k}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "#888888" }}>
                    {item.k}
                  </dt>
                  <dd className="mt-1.5 font-mono text-[12px]" style={{ color: (item as any).accent ? "#FF3333" : "#F5F5F5" }}>
                    {item.v}
                  </dd>
                </div>
              ))}
            </dl>

            {/* IG link */}
            <a
              href="https://instagram.com/sam.creattive"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors"
              style={{ color: "#888888" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F5F5")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#888888")}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
              </svg>
              @sam.creattive
            </a>
          </div>

          {/* Right: order ticket */}
          <div>
            {/* Ticket header */}
            <div
              className="flex items-center justify-between px-4 py-3 sm:px-6"
              style={{ background: "#FF3333" }}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: "#F5F5F5" }}>
                // ORDER TICKET
              </span>
              <span className="font-mono text-[10px]" style={{ color: "rgba(245,245,245,0.7)" }}>
                {selectedPlay ? selectedPlay.price : "Pick your play below ↓"}
              </span>
            </div>

            <form
              onSubmit={onSubmit}
              style={{
                background: "#1a1a1a",
                border: "1px solid rgba(245,245,245,0.08)",
                borderTop: "none",
              }}
            >
              {/* Honeypot */}
              <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

              {/* Fields */}
              <TicketField
                id="name"
                label="Name / Shop Name"
                sublabel="Your name or your business name"
                placeholder="e.g. Rahul / The Denim Co."
                value={name}
                onChange={setName}
              />
              <TicketField
                id="instagram"
                label="Instagram Handle"
                sublabel="We audit your profile before the call"
                placeholder="@yourhandle"
                value={instagram}
                onChange={setInstagram}
              />
              <PlaySelector value={play} onChange={setPlay} />
              <BottleneckField value={bottleneck} onChange={setBottleneck} />

              {/* Submit row */}
              <div
                className="flex flex-col gap-3 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6"
                style={{ borderTop: "1px solid rgba(245,245,245,0.08)" }}
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: "#444444" }}>
                  No lock-in · 30-day rolling
                </span>
                <button
                  type="submit"
                  disabled={state === "sending" || !play}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 font-mono text-[11px] uppercase tracking-[0.22em] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ background: "#FF3333", color: "#F5F5F5", border: "1px solid #FF3333" }}
                  onMouseEnter={(e) => {
                    if (state !== "sending" && play) {
                      (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                      (e.currentTarget as HTMLButtonElement).style.color = "#FF3333";
                    }
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.background = "#FF3333";
                    (e.currentTarget as HTMLButtonElement).style.color = "#F5F5F5";
                  }}
                >
                  {state === "sending" ? "Sending…" : "Book Call →"}
                </button>
              </div>

              <AnimatePresence>
                {state === "ok" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mx-6 mb-5 font-mono text-[12px] p-4"
                    style={{ border: "1px solid rgba(212,255,0,0.4)", background: "rgba(212,255,0,0.06)", color: "#D4FF00" }}
                  >
                    ✓ Order placed. We'll audit your IG and DM you within 24 hours.
                  </motion.div>
                )}
                {state === "err" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mx-6 mb-5 font-mono text-[12px] p-4"
                    style={{ border: "1px solid rgba(255,51,51,0.4)", background: "rgba(255,51,51,0.06)", color: "#FF3333" }}
                  >
                    ✗ {error || "Couldn't send — please email us directly."}
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
