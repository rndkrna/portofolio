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
  "Software Engineer",
  "★",
  "Web Security",
  "★",
  "Laravel",
  "★",
  "Technical Leader",
  "★",
  "Fullstack Dev",
  "★",
  "Cryptography",
  "★",
  "React",
  "★",
  "Docker",
  "★",
];

export default function HeroSection() {
  const [profile, setProfile] = useState<ProfileData>(fallbackProfile);

  useEffect(() => {
    fetch("/api/profile", { cache: "no-store" })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then((data) => setProfile(data))
      .catch(() => {});
  }, []);

  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacitySection = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100dvh] flex flex-col overflow-hidden"
    >
      {/* === BACKGROUND === */}
      {/* Deep gradient background */}
      <div className="absolute inset-0 z-0" style={{
        background: 'linear-gradient(160deg, hsl(270 50% 4%) 0%, hsl(285 55% 7%) 50%, hsl(270 50% 4%) 100%)',
      }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 z-0 grid-pattern opacity-40" />

      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: yBg, opacity: 0.08 }}
      >
        <img
          src="/images/hero-bg.png"
          alt="abstract background"
          className="w-full h-full object-cover object-center"
        />
      </motion.div>

      {/* Ambient glows */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-[15%] -left-[5%] w-[55vw] h-[55vw] rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(271 91% 65% / 0.18) 0%, transparent 70%)' }}
          animate={{ x: [0, 40, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-[30%] right-[-10%] w-[45vw] h-[45vw] rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(327 81% 62% / 0.12) 0%, transparent 70%)' }}
          animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
          transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[10%] left-[30%] w-[35vw] h-[35vw] rounded-full"
          style={{ background: 'radial-gradient(circle, hsl(43 96% 56% / 0.08) 0%, transparent 70%)' }}
          animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* === MAIN CONTENT === */}
      <motion.div
        className="relative z-10 flex-1 flex flex-col justify-center pt-24 pb-8"
        style={{ opacity: opacitySection }}
      >
        <div className="container mx-auto px-6 md:px-12">

          {/* Top label row */}
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[hsl(271,91%,65%)] animate-pulse" />
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-[hsl(271,91%,75%)]">
                {profile.role}
              </span>
            </div>
            <div className="flex-1 h-px" style={{
              background: 'linear-gradient(90deg, hsl(271 91% 65% / 0.5), transparent)',
            }} />
            <span className="font-mono text-xs text-foreground/30">2021 — 2026</span>
          </motion.div>

          {/* === GIANT HEADLINE === */}
          <div className="overflow-hidden mb-4">
            <motion.h1
              className="font-display uppercase leading-none"
              style={{ fontSize: 'clamp(4rem, 14vw, 16rem)', letterSpacing: '-0.03em' }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            >
              {/* Line 1: solid text */}
              <span className="block text-foreground">
                Crafting
              </span>
              {/* Line 2: stroke/outline text */}
              <span
                className="block"
                style={{
                  WebkitTextStroke: '3px hsl(271 91% 65%)',
                  color: 'transparent',
                }}
              >
                Secure
              </span>
              {/* Line 3: gradient fill */}
              <span
                className="block"
                style={{
                  background: 'linear-gradient(90deg, hsl(271,91%,75%) 0%, hsl(327,81%,70%) 50%, hsl(43,96%,65%) 100%)',
                  WebkitBackgroundClip: 'text',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Web Systems
              </span>
            </motion.h1>
          </div>

          {/* Bio row */}
          <motion.div
            className="max-w-xl mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="flex gap-4 items-start">
              <div className="w-1 flex-shrink-0 self-stretch" style={{
                background: 'linear-gradient(180deg, hsl(271,91%,65%), hsl(327,81%,62%))',
              }} />
              <p className="text-foreground/60 font-sans text-base md:text-lg leading-relaxed font-light">
                {profile.bio}
              </p>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <button
              onClick={() => document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative overflow-hidden flex items-center gap-3 font-sans font-bold uppercase tracking-[0.2em] text-sm py-4 px-8 transition-all duration-300 hover-target"
              style={{
                background: 'linear-gradient(90deg, hsl(271,91%,65%), hsl(327,81%,62%))',
                color: 'hsl(270,50%,5%)',
              }}
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-600"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)' }} />
              <span className="relative z-10">View My Work</span>
            </button>

            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="flex items-center gap-3 font-sans font-bold uppercase tracking-[0.2em] text-sm py-4 px-8 border-2 border-foreground/30 text-foreground hover:border-[hsl(271,91%,65%)] hover:text-[hsl(271,91%,75%)] transition-all duration-300 hover-target"
            >
              Hire Me
            </button>
          </motion.div>
        </div>
      </motion.div>

      {/* === MARQUEE STRIP === */}
      <div className="relative z-10 border-y-2 border-[hsl(271,91%,65%/0.4)] overflow-hidden py-3"
        style={{ background: 'hsl(271 91% 65% / 0.06)' }}
      >
        <div className="flex whitespace-nowrap animate-marquee">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className={`flex-shrink-0 font-display text-xl tracking-widest uppercase px-6 ${
                item === "★"
                  ? "text-[hsl(43,96%,56%)]"
                  : "text-foreground/50 hover:text-foreground transition-colors"
              }`}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10 cursor-pointer hover-target"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/40">Scroll</span>
        <div className="w-px h-10 overflow-hidden relative">
          <motion.div
            className="w-full absolute top-0"
            style={{ background: 'linear-gradient(180deg, hsl(271,91%,65%), transparent)', height: '100%' }}
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown size={16} style={{ color: 'hsl(271,91%,65%)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
