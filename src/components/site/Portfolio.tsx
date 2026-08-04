import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SectionLabel } from "./SectionLabel";
import { MagneticCarousel, type CarouselItem } from "./MagneticCarousel";

// ─── Genre data ───────────────────────────────────────────────────────────────
// Add real IG embed URLs or YouTube Short embed URLs to each item's embedUrl.
// Instagram reel embed format: https://www.instagram.com/reel/{SHORTCODE}/embed/
// YouTube Short embed format:  https://www.youtube.com/embed/{VIDEO_ID}

interface Genre {
  id: string;
  label: string;
  description: string;
  count: string;
  items: CarouselItem[];
}

const GENRES: Genre[] = [
  {
    id: "promo",
    label: "[STORE PROMO]",
    description: "Shop aesthetics, collection overview, shop walkthroughs, architectural B-roll.",
    count: "10 reels",
    items: [
      { id: "promo-1", title: "Store Promo Reel 1", embedUrl: "https://www.youtube.com/embed/lRiYojq7fN4" },
      { id: "promo-2", title: "Store Promo Reel 2", embedUrl: "https://www.youtube.com/embed/EE8iAAUzkD0" },
      { id: "promo-3", title: "Store Promo Reel 3", embedUrl: "https://www.youtube.com/embed/ebjeZun4Muo" },
      { id: "promo-4", title: "Store Promo Reel 4", embedUrl: "https://www.youtube.com/embed/Y9WrR1YvMDo" },
      { id: "promo-5", title: "Store Promo Reel 5", embedUrl: "https://www.youtube.com/embed/r4eklMSSlmo" },
      { id: "promo-6", title: "Store Promo Reel 6", embedUrl: "https://www.youtube.com/embed/IRnvhAsKBAE" },
      { id: "promo-7", title: "Store Promo Reel 7", embedUrl: "https://www.youtube.com/embed/DqmfWDnjw4E" },
      { id: "promo-8", title: "Store Promo Reel 8", embedUrl: "https://www.youtube.com/embed/HCjJS8NbIKU" },
      { id: "promo-9", title: "Store Promo Reel 9", embedUrl: "https://www.youtube.com/embed/qTT7lduFkYg" },
      { id: "promo-10", title: "Store Promo Reel 10", embedUrl: "https://www.youtube.com/embed/FE9H1tcPE1k" }
    ],
  },
  {
    id: "productPromot",
    label: "[PRODUCT PROMOTION]",
    description: "Product reveals, macro B-roll, feature highlights, unboxings, voice-over explainers.",
    count: "10 reels",
    items: [
      { id: "product-1", title: "Product Reel 1", embedUrl: "https://www.youtube.com/embed/HhksAb9rd3E" },
      { id: "product-2", title: "Product Reel 2", embedUrl: "https://www.youtube.com/embed/2GoUcknTmT4" },
      { id: "product-3", title: "Product Reel 3", embedUrl: "https://www.youtube.com/embed/sD2reDAnZK8" },
      { id: "product-4", title: "Product Reel 4", embedUrl: "https://www.youtube.com/embed/t-KCBXLUa0U" },
      { id: "product-5", title: "Product Reel 5", embedUrl: "https://www.youtube.com/embed/yUs5LrWpqH0" },
      { id: "product-6", title: "Product Reel 6", embedUrl: "https://www.youtube.com/embed/OLsMlajcmC4" },
      { id: "product-7", title: "Product Reel 7", embedUrl: "https://www.youtube.com/embed/qyFlfF_eFbU" },
      { id: "product-8", title: "Product Reel 8", embedUrl: "https://www.youtube.com/embed/kc8ev0v6MaE" },
      { id: "product-9", title: "Product Reel 9", embedUrl: "https://www.youtube.com/embed/12jLVCO9i0Y" },
      { id: "product-10", title: "Product Reel 10", embedUrl: "https://www.youtube.com/embed/GRs2Wa6jOZY" }
    ],
  },
  {
    id: "mensFashion",
    label: "[MEN'S FASHION]",
    description: "Catalogue stills, lookbooks, new arrivals, B-roll, product reveals.",
    count: "6 reels",
    items: [
      { id: "mensFashion-1", title: "Men's Fashion Reel 1", embedUrl: "https://www.youtube.com/embed/sseXhDWZLxM" },
      { id: "mensFashion-2", title: "Men's Fashion Reel 2", embedUrl: "https://www.youtube.com/embed/yUs5LrWpqH0" },
      { id: "mensFashion-3", title: "Men's Fashion Reel 3", embedUrl: "https://www.youtube.com/embed/2GoUcknTmT4" },
      { id: "mensFashion-4", title: "Men's Fashion Reel 4", embedUrl: "https://www.youtube.com/embed/ebjeZun4Muo" },
      { id: "mensFashion-5", title: "Men's Fashion Reel 5", embedUrl: "https://www.youtube.com/embed/DqmfWDnjw4E" },
      { id: "mensFashion-6", title: "Men's Fashion Reel 6", embedUrl: "https://www.youtube.com/embed/GRs2Wa6jOZY" }
      // { id: "mensFashion-6", title: "Men's Fashion Reel 6", embedUrl: "https://www.instagram.com/reel/Da5N8NwyPGe/embed/" },
    ],
  },
  {
    id: "ladiesFashion",
    label: "[WOMEN'S FASHION]",
    description: "Model Shoots, lookbooks, new arrivals, B-roll, product reveals.",
    count: "8 reels",
    items: [
      { id: "ladiesFashion-1", title: "Women's Fashion Reel 1", embedUrl: "https://www.youtube.com/embed/sD2reDAnZK8" },
      { id: "ladiesFashion-2", title: "Women's Fashion Reel 2", embedUrl: "https://www.youtube.com/embed/OLsMlajcmC4" },
      { id: "ladiesFashion-3", title: "Women's Fashion Reel 3", embedUrl: "https://www.youtube.com/embed/t-KCBXLUa0U" },
      { id: "ladiesFashion-4", title: "Women's Fashion Reel 4", embedUrl: "https://www.youtube.com/embed/kc8ev0v6MaE" },
      { id: "ladiesFashion-5", title: "Women's Fashion Reel 5", embedUrl: "https://www.youtube.com/embed/12jLVCO9i0Y" },
      { id: "ladiesFashion-6", title: "Women's Fashion Reel 6", embedUrl: "https://www.youtube.com/embed/lRiYojq7fN4" },
      { id: "ladiesFashion-7", title: "Women's Fashion Reel 7", embedUrl: "https://www.youtube.com/embed/r4eklMSSlmo" },
      { id: "ladiesFashion-8", title: "Women's Fashion Reel 8", embedUrl: "https://www.youtube.com/embed/IRnvhAsKBAE" }
    ],
  }
];

// ─── Genre block ──────────────────────────────────────────────────────────────

function GenreBlock({
  genre,
  onOpen,
}: {
  genre: Genre;
  onOpen: (genre: Genre) => void;
}) {
  return (
    <motion.div
      className="group relative overflow-hidden"
      style={{
        background: "#1a1a1a",
        border: "1px solid rgba(245,245,245,0.08)",
        cursor: "pointer",
      }}
      whileHover={{ borderColor: "rgba(255,51,51,0.4)" }}
      transition={{ duration: 0.2 }}
      onClick={() => onOpen(genre)}
    >
      {/* Big genre label */}
      <div className="p-7 pb-4">
        <h3
          className="uppercase"
          style={{
            fontFamily: "Impact, 'Haettenschweiler', 'Arial Narrow Bold', sans-serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.01em",
            color: "#F5F5F5",
            transition: "color 0.2s",
          }}
        >
          {genre.label}
        </h3>
        <p
          className="mt-3 font-mono text-[11px] leading-[1.7]"
          style={{ color: "#888888" }}
        >
          {genre.description}
        </p>
      </div>

      {/* Bottom bar */}
      <div
        className="flex items-center justify-between px-7 py-4 border-t"
        style={{ borderColor: "rgba(245,245,245,0.08)" }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "#888888" }}>
          {genre.count}
        </span>
        <div
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] transition-colors"
          style={{ color: "#FF3333" }}
        >
          <span className="opacity-0 group-hover:opacity-100 transition-opacity">
            Click to expand
          </span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="translate-x-0 group-hover:translate-x-1 transition-transform"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Hover red underline */}
      <div
        className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-300"
        style={{ background: "#FF3333" }}
        aria-hidden
      />
    </motion.div>
  );
}

// ─── Portfolio section ────────────────────────────────────────────────────────

export function Portfolio() {
  const [openGenre, setOpenGenre] = useState<Genre | null>(null);

  return (
    <section id="work" className="relative py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <SectionLabel>Selected Work</SectionLabel>

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
            FRAMES THAT
            <br />
            <span style={{ color: "#FF3333" }}>PAID RENT.</span>
          </h2>
          <p className="max-w-xs font-mono text-[12px] leading-[1.8]" style={{ color: "#888888" }}>
            Click any genre block to expand the full reel library for that
            category. Drag to navigate. Snap to view.
          </p>
        </div>

        {/* Genre blocks */}
        <div
          className="mt-12 grid grid-cols-1 gap-px sm:grid-cols-2"
          style={{ background: "rgba(245,245,245,0.06)" }}
        >
          {GENRES.map((genre) => (
            <GenreBlock key={genre.id} genre={genre} onOpen={setOpenGenre} />
          ))}
        </div>

        {/* Instruction note */}
        <div
          className="mt-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em]"
          style={{ color: "#888888" }}
        >
          {/* <span style={{ color: "#FF3333" }}>//</span>
          <span>
            Replace embed URLs in{" "}
            <code style={{ color: "#D4FF00" }}>Portfolio.tsx</code> with your
            actual IG reel or YouTube Short URLs to populate the carousel.
          </span> */}
        </div>
      </div>

      {/* Magnetic Carousel overlay */}
      <AnimatePresence>
        {openGenre && (
          <MagneticCarousel
            key={openGenre.id}
            items={openGenre.items}
            onClose={() => setOpenGenre(null)}
            initialIndex={0}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
