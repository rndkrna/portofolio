import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface ProfileData {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

const fallbackProfile: ProfileData = {
  name: "Renda Kurnia Manik",
  role: "Software Engineer & Technical Leader",
  bio: "I bridge the gap between business needs and technological solutions, building robust, secure web applications and driving collaborative research.",
  avatar: "/images/profile-avatar.png",
};

const marqueeItems = [
  "Software Engineer", "✦", "Web Security", "✦", "Laravel", "✦",
  "Technical Leader", "✦", "Fullstack Dev", "✦", "Cryptography", "✦",
  "React", "✦", "Docker", "✦",
];

export default function HeroSection() {
  const [profile, setProfile] = useState<ProfileData>(fallbackProfile);

  useEffect(() => {
    fetch("/api/profile", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setProfile(d))
      .catch(() => {});
  }, []);

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={containerRef} id="hero" className="relative min-h-[100dvh] flex flex-col overflow-hidden">

      {/* ── Background ───────────────────────── */}
      <div className="absolute inset-0 z-0" style={{ background: "hsl(230 18% 8%)" }} />
      <div className="absolute inset-0 z-0 dot-pattern opacity-50" />

      {/* Hero bg image – subtle */}
      <motion.div className="absolute inset-0 z-0" style={{ y: yBg, opacity: 0.07 }}>
        <img src="/images/hero-bg.png" alt="" className="w-full h-full object-cover object-center" />
      </motion.div>

      {/* Ambient blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-[20%] -left-[5%] w-[55vw] h-[55vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.2) 0%, transparent 68%)" }}
          animate={{ x: [0, 35, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[35%] right-[-8%] w-[42vw] h-[42vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(244,63,138,0.14) 0%, transparent 70%)" }}
          animate={{ x: [0, -45, 0], y: [0, 28, 0] }}
          transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[5%] left-[25%] w-[30vw] h-[30vw] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(240,165,0,0.09) 0%, transparent 70%)" }}
          animate={{ x: [0, 18, 0], y: [0, -14, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* ── Main Content ─────────────────────── */}
      <motion.div className="relative z-10 flex-1 flex flex-col justify-center pt-28 pb-10" style={{ opacity: fade }}>
        <div className="container mx-auto px-6 md:px-12">

          {/* Top label */}
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <span className="w-2 h-2 rounded-full bg-[#a855f7] animate-pulse" />
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-[#a855f7]">{profile.role}</span>
            <div className="flex-1 h-px" style={{ background: "linear-gradient(90deg, rgba(168,85,247,0.55), transparent)" }} />
            <span className="font-mono text-xs" style={{ color: "hsl(220 15% 35%)" }}>2021 — 2026</span>
          </motion.div>

          {/* ── Giant Headline ── */}
          <div className="overflow-hidden mb-6">
            <motion.h1
              className="font-display uppercase leading-none"
              style={{ fontSize: "clamp(4.5rem, 13vw, 15rem)", letterSpacing: "-0.03em" }}
              initial={{ y: "105%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              {/* Row 1: solid */}
              <span className="block text-white">Crafting</span>
              {/* Row 2: outline purple */}
              <span
                className="block"
                style={{ WebkitTextStroke: "3px #a855f7", color: "transparent" }}
              >
                Secure
              </span>
              {/* Row 3: gradient gold→pink */}
              <span
                className="block"
                style={{
                  background: "linear-gradient(90deg, #f0a500 0%, #f43f8a 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Web Systems
              </span>
            </motion.h1>
          </div>

          {/* Bio */}
          <motion.div
            className="max-w-xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex gap-4 items-start">
              <div className="w-1 flex-shrink-0 self-stretch" style={{ background: "linear-gradient(180deg, #a855f7, #f43f8a)" }} />
              <p className="font-sans text-base md:text-lg font-light leading-relaxed" style={{ color: "hsl(220 15% 62%)" }}>
                {profile.bio}
              </p>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button
              onClick={() => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" })}
              className="group relative overflow-hidden flex items-center gap-3 font-sans font-bold uppercase tracking-[0.2em] text-sm py-4 px-8 transition-all duration-300 hover-target"
              style={{ background: "linear-gradient(90deg, #a855f7 0%, #f43f8a 100%)", color: "hsl(230 18% 8%)" }}
            >
              <div
                className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }}
              />
              <span className="relative z-10">View My Work</span>
            </button>

            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="flex items-center gap-3 font-sans font-bold uppercase tracking-[0.2em] text-sm py-4 px-8 border-2 transition-all duration-300 hover-target hover-glow"
              style={{ borderColor: "rgba(168,85,247,0.45)", color: "#a855f7" }}
            >
              Hire Me
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Marquee Strip ────────────────────── */}
      <div
        className="relative z-10 overflow-hidden py-3 border-y-2"
        style={{
          borderColor: "rgba(168,85,247,0.35)",
          background: "rgba(168,85,247,0.05)",
        }}
      >
        <div className="flex whitespace-nowrap animate-marquee">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="flex-shrink-0 font-display text-xl tracking-widest uppercase px-6"
              style={{
                color: item === "✦" ? "#f0a500" : "rgba(255,255,255,0.38)",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 cursor-pointer hover-target"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: "hsl(220 15% 38%)" }}>Scroll</span>
        <div className="w-px h-10 overflow-hidden relative">
          <motion.div
            className="w-full absolute top-0 h-full"
            style={{ background: "linear-gradient(180deg, #a855f7, transparent)" }}
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <motion.div animate={{ y: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ArrowDown size={15} style={{ color: "#a855f7" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
