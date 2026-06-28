import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Layers, Award } from "lucide-react";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [avatar, setAvatar] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/profile", { cache: "no-store" })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then((data) => {
        if (data.avatar) {
          setAvatar(data.avatar);
        }
      })
      .catch(() => {});
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
    exit: {
      y: "-100%",
      transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] as const },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const highlights = [
    { icon: Shield, label: "Cryptographic Systems", sub: "AES-256-GCM · HKDF · Scrypt", color: "hsl(271,91%,65%)" },
    { icon: Layers, label: "Fullstack Dev", sub: "Laravel · Docker · PostgreSQL", color: "hsl(327,81%,62%)" },
    { icon: Award, label: "Leadership Role", sub: "BEM Research · PMII Kadrisasi", color: "hsl(43,96%,56%)" },
  ];

  return (
    <motion.div
      className="fixed inset-0 z-[9999] overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* === MAXIMALIST BACKGROUND === */}
      <div className="absolute inset-0" style={{
        background: 'linear-gradient(135deg, hsl(270 50% 4%) 0%, hsl(290 60% 7%) 40%, hsl(270 50% 4%) 100%)',
      }} />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-60" />

      {/* Giant backdrop text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span
          className="font-display leading-none text-center select-none"
          style={{
            fontSize: 'clamp(8rem, 22vw, 28rem)',
            WebkitTextStroke: '2px hsl(271 91% 65% / 0.07)',
            color: 'transparent',
            letterSpacing: '-0.02em',
          }}
        >
          PORTFOLIO
        </span>
      </div>

      {/* Ambient glows */}
      <div className="absolute -top-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(271 91% 65% / 0.15) 0%, transparent 70%)' }} />
      <div className="absolute -bottom-[20%] -right-[10%] w-[50vw] h-[50vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, hsl(327 81% 62% / 0.12) 0%, transparent 70%)' }} />

      {/* === CONTENT === */}
      <div className="relative z-10 h-full flex items-center overflow-y-auto">
        <div className="container mx-auto px-6 md:px-12 py-12 max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">

            {/* === LEFT: Portrait Card === */}
            <motion.div className="lg:col-span-4 flex justify-center lg:justify-start" variants={itemVariants}>
              <div className="relative w-full max-w-[260px] sm:max-w-[300px]">
                {/* Decorative corner accent */}
                <div className="absolute -top-3 -left-3 w-12 h-12 border-t-4 border-l-4 border-[hsl(271,91%,65%)] z-20" />
                <div className="absolute -bottom-3 -right-3 w-12 h-12 border-b-4 border-r-4 border-[hsl(327,81%,62%)] z-20" />

                {/* Image frame */}
                <motion.div
                  className="relative aspect-[3/4] overflow-hidden border-2 border-[hsl(271,91%,65%/0.4)]"
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                >
                  {/* Gradient fill when no avatar */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(160deg, hsl(271 91% 25%) 0%, hsl(290 60% 10%) 100%)',
                  }} />

                  {avatar && (
                    <img
                      src={avatar}
                      alt="Renda Kurnia Manik Portrait"
                      className="absolute inset-0 w-full h-full object-cover grayscale contrast-110 mix-blend-luminosity"
                    />
                  )}

                  {/* Color overlay */}
                  <div className="absolute inset-0" style={{
                    background: 'linear-gradient(180deg, transparent 30%, hsl(270 50% 4% / 0.85) 100%)',
                  }} />

                  {/* Label */}
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <div className="w-full h-[2px] mb-3" style={{
                      background: 'linear-gradient(90deg, hsl(271,91%,65%), hsl(327,81%,62%))',
                    }} />
                    <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-[hsl(271,91%,75%)] mb-1">
                      Verified Portfolio
                    </p>
                    <p className="font-display text-base tracking-widest uppercase text-foreground">
                      Cover // 2026
                    </p>
                  </div>
                </motion.div>

                {/* Floating badge */}
                <motion.div
                  className="absolute -right-6 top-8 z-20 px-3 py-2 text-[10px] font-sans font-bold uppercase tracking-widest border-2"
                  style={{
                    background: 'hsl(43,96%,56%)',
                    color: 'hsl(270,50%,5%)',
                    borderColor: 'hsl(43,96%,56%)',
                  }}
                  animate={{ rotate: [3, 3] }}
                >
                  2026
                </motion.div>
              </div>
            </motion.div>

            {/* === RIGHT: Info === */}
            <div className="lg:col-span-8 flex flex-col items-start">

              {/* Top badge */}
              <motion.div variants={itemVariants} className="mb-5">
                <span className="inline-flex items-center gap-2 border-2 border-[hsl(271,91%,65%)] px-4 py-1.5 font-mono text-[11px] tracking-[0.3em] uppercase text-[hsl(271,91%,75%)]">
                  <span className="w-2 h-2 rounded-full bg-[hsl(271,91%,65%)] animate-pulse" />
                  Introduction · Software Engineer
                </span>
              </motion.div>

              {/* Giant Name */}
              <motion.div variants={itemVariants} className="mb-4 overflow-hidden">
                <h1 className="font-display uppercase leading-none" style={{ fontSize: 'clamp(3.5rem, 9vw, 8rem)', letterSpacing: '-0.02em' }}>
                  <span className="block text-foreground">Renda</span>
                  <span className="block" style={{
                    WebkitTextStroke: '2px hsl(271 91% 65%)',
                    color: 'transparent',
                  }}>
                    Kurnia
                  </span>
                  <span className="block text-gradient-gold">Manik</span>
                </h1>
              </motion.div>

              {/* Tagline */}
              <motion.p
                variants={itemVariants}
                className="text-foreground/60 font-sans font-light text-base sm:text-lg max-w-lg mb-8 leading-relaxed border-l-4 border-[hsl(271,91%,65%)] pl-4"
              >
                Software Engineer & Technical Leader yang memadukan keahlian
                kriptografi modern dengan rekayasa sistem web terdistribusi.
              </motion.p>

              {/* Highlights Grid */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-8"
              >
                {highlights.map((hl, i) => (
                  <div
                    key={hl.label}
                    className="group/hl border-2 p-4 transition-all duration-300 hover:scale-[1.02] cursor-default"
                    style={{ borderColor: hl.color + '50' }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 flex items-center justify-center" style={{ background: hl.color + '20' }}>
                        <hl.icon size={16} style={{ color: hl.color }} />
                      </div>
                      <div className="w-full h-px" style={{ background: hl.color + '40' }} />
                    </div>
                    <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-foreground mb-1" style={{ color: hl.color }}>
                      {hl.label}
                    </h4>
                    <p className="text-[11px] font-sans text-foreground/50 leading-snug font-mono">
                      {hl.sub}
                    </p>
                  </div>
                ))}
              </motion.div>

              {/* Enter Button */}
              <motion.div variants={itemVariants}>
                <button
                  onClick={onComplete}
                  className="group relative overflow-hidden flex items-center gap-3 font-sans font-bold uppercase tracking-[0.25em] text-sm py-4 px-10 hover-target transition-all duration-300"
                  style={{
                    background: 'linear-gradient(90deg, hsl(271,91%,65%), hsl(327,81%,62%))',
                    color: 'hsl(270,50%,5%)',
                  }}
                >
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)' }} />
                  <span className="relative z-10">Enter Portfolio</span>
                  <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}
