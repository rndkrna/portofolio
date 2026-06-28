import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Layers, Award } from "lucide-react";

interface PreloaderProps {
  onComplete: () => void;
}

const highlights = [
  {
    icon: Shield,
    label: "Cryptographic Systems",
    sub: "AES-256-GCM · HKDF · Scrypt",
    color: "#a855f7",      // bright purple
    border: "#a855f7",
  },
  {
    icon: Layers,
    label: "Fullstack Dev",
    sub: "Laravel · Docker · PostgreSQL",
    color: "#f43f8a",      // bright pink
    border: "#f43f8a",
  },
  {
    icon: Award,
    label: "Leadership",
    sub: "BEM Research · PMII Kadrisasi",
    color: "#f0a500",      // vivid gold
    border: "#f0a500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
  exit: {
    y: "-100%",
    transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] as const },
  },
};

const itemUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Preloader({ onComplete }: PreloaderProps) {
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/profile", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => d.avatar && setAvatar(d.avatar))
      .catch(() => {});
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] overflow-hidden flex items-center"
      style={{ background: "hsl(230 18% 8%)" }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* ── Background layers ───────────────────────────── */}

      {/* Dot grid */}
      <div className="absolute inset-0 dot-pattern opacity-60 pointer-events-none" />

      {/* Top-left diagonal accent stripe block */}
      <div
        className="absolute -top-20 -left-20 w-[420px] h-[420px] opacity-[0.07] pointer-events-none"
        style={{ background: "conic-gradient(from 0deg, #a855f7, #f43f8a, #f0a500, #a855f7)" }}
      />

      {/* Ambient glows */}
      <div
        className="absolute top-[-10%] left-[5%] w-[45vw] h-[45vw] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.22) 0%, transparent 70%)" }}
      />
      <div
        className="absolute bottom-[-15%] right-[0%] w-[40vw] h-[40vw] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(244,63,138,0.18) 0%, transparent 70%)" }}
      />
      <div
        className="absolute top-[35%] right-[20%] w-[25vw] h-[25vw] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(240,165,0,0.10) 0%, transparent 70%)" }}
      />

      {/* Backdrop giant text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="font-display select-none"
          style={{
            fontSize: "clamp(6rem, 20vw, 26rem)",
            WebkitTextStroke: "2px rgba(168,85,247,0.06)",
            color: "transparent",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          PORTFOLIO
        </span>
      </div>

      {/* ── Content ─────────────────────────────────────── */}
      <div className="relative z-10 w-full container mx-auto px-6 md:px-12 max-w-7xl overflow-y-auto py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

          {/* ═══ LEFT: Portrait Card ═══ */}
          <motion.div className="lg:col-span-4 flex justify-center" variants={itemUp}>
            <div className="relative w-full max-w-[260px] sm:max-w-[300px]">

              {/* Corner brackets */}
              <div className="absolute -top-3 -left-3 w-10 h-10 border-t-[3px] border-l-[3px] border-[#a855f7] z-20 pointer-events-none" />
              <div className="absolute -bottom-3 -right-3 w-10 h-10 border-b-[3px] border-r-[3px] border-[#f43f8a] z-20 pointer-events-none" />

              {/* Card */}
              <motion.div
                className="relative aspect-[3/4] overflow-hidden border-2 border-[rgba(168,85,247,0.45)]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Base fill */}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(155deg, hsl(262 50% 18%) 0%, hsl(230 18% 10%) 100%)" }}
                />

                {/* Avatar — shown clearly, minimal overlay */}
                {avatar && (
                  <img
                    src={avatar}
                    alt="Renda Kurnia Manik"
                    className="absolute inset-0 w-full h-full object-cover object-center"
                    style={{ filter: "contrast(1.05) brightness(0.92) saturate(0.85)" }}
                  />
                )}

                {/* Very light bottom fade — not covering the face */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "linear-gradient(to top, rgba(16,14,24,0.88) 0%, rgba(16,14,24,0.15) 40%, transparent 65%)",
                  }}
                />

                {/* Bottom label */}
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div
                    className="w-full h-[2px] mb-3"
                    style={{ background: "linear-gradient(90deg, #a855f7, #f43f8a)" }}
                  />
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[#a855f7] mb-0.5">
                    Verified Portfolio
                  </p>
                  <p className="font-display text-sm tracking-widest uppercase text-white/80">
                    Cover // 2026
                  </p>
                </div>
              </motion.div>

              {/* Year badge */}
              <motion.div
                className="absolute -right-5 top-6 z-20 px-3 py-1.5 font-display text-sm tracking-widest"
                style={{
                  background: "#f0a500",
                  color: "hsl(230 18% 8%)",
                  transform: "rotate(3deg)",
                }}
                animate={{ rotate: [3, 3] }}
              >
                2026
              </motion.div>

              {/* Floating tag bottom-left */}
              <motion.div
                className="absolute -left-5 -bottom-5 z-20 px-2.5 py-1 font-mono text-[10px] tracking-widest uppercase border-2 border-[#f43f8a]"
                style={{ background: "hsl(230 18% 8%)", color: "#f43f8a" }}
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              >
                Full-Stack
              </motion.div>
            </div>
          </motion.div>

          {/* ═══ RIGHT: Info Panel ═══ */}
          <div className="lg:col-span-8 flex flex-col items-start">

            {/* Status badge */}
            <motion.div variants={itemUp} className="mb-5">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 border-2 font-mono text-[11px] tracking-[0.28em] uppercase"
                style={{ borderColor: "#a855f7", color: "#a855f7" }}
              >
                <span className="w-2 h-2 rounded-full bg-[#a855f7] animate-pulse" />
                Introduction · Software Engineer
              </span>
            </motion.div>

            {/* Giant name — 3 rows, 3 different treatments */}
            <motion.div variants={itemUp} className="mb-5 leading-none overflow-hidden">
              <h1
                className="font-display uppercase"
                style={{ fontSize: "clamp(3.8rem, 9.5vw, 9rem)", letterSpacing: "-0.025em", lineHeight: 0.92 }}
              >
                {/* Solid white */}
                <span className="block text-white">Renda</span>
                {/* Stroke / outline */}
                <span
                  className="block"
                  style={{ WebkitTextStroke: "2.5px #a855f7", color: "transparent" }}
                >
                  Kurnia
                </span>
                {/* Gradient gold fill */}
                <span
                  className="block"
                  style={{
                    background: "linear-gradient(90deg, #f0a500 0%, #f43f8a 100%)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Manik
                </span>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={itemUp}
              className="font-sans font-light text-base sm:text-lg leading-relaxed mb-7 max-w-lg border-l-4 border-[#a855f7] pl-4"
              style={{ color: "hsl(220 15% 65%)" }}
            >
              Software Engineer & Technical Leader yang memadukan keahlian
              kriptografi modern dengan rekayasa sistem web terdistribusi.
            </motion.p>

            {/* Highlights — 3 colorful cards */}
            <motion.div
              variants={itemUp}
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full mb-8"
            >
              {highlights.map((hl) => (
                <div
                  key={hl.label}
                  className="border-2 p-4 hover-glow transition-all duration-300 cursor-default"
                  style={{ borderColor: hl.border + "40" }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div
                      className="w-8 h-8 flex items-center justify-center"
                      style={{ background: hl.color + "18" }}
                    >
                      <hl.icon size={15} style={{ color: hl.color }} />
                    </div>
                    <div className="flex-1 h-px" style={{ background: hl.color + "30" }} />
                  </div>
                  <h4
                    className="font-sans font-bold text-[11px] uppercase tracking-wider mb-1"
                    style={{ color: hl.color }}
                  >
                    {hl.label}
                  </h4>
                  <p className="font-mono text-[10px] leading-snug" style={{ color: "hsl(220 15% 50%)" }}>
                    {hl.sub}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Enter button */}
            <motion.div variants={itemUp}>
              <button
                onClick={onComplete}
                className="group relative overflow-hidden flex items-center gap-3 font-sans font-bold uppercase tracking-[0.22em] text-sm py-4 px-10 hover-target transition-all duration-300"
                style={{
                  background: "linear-gradient(90deg, #a855f7 0%, #f43f8a 100%)",
                  color: "hsl(230 18% 8%)",
                }}
              >
                {/* Shimmer sweep */}
                <div
                  className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)" }}
                />
                <span className="relative z-10">Enter Portfolio</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
