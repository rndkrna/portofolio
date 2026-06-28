import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Layers, Award, Code2 } from "lucide-react";

interface PreloaderProps { onComplete: () => void; }

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.5 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } },
};

export default function Preloader({ onComplete }: PreloaderProps) {
  const [avatar, setAvatar] = useState<string | null>(null);
  useEffect(() => {
    fetch("/api/profile", { cache: "no-store" })
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(d => d.avatar && setAvatar(d.avatar))
      .catch(() => {});
  }, []);

  return (
    <motion.div className="fixed inset-0 z-[9999] overflow-hidden" variants={container} initial="hidden" animate="visible" exit="exit">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: 'hsl(248 35% 8%)' }} />
      {/* Strong orbs */}
      <div className="absolute -top-[30%] -left-[15%] w-[70vw] h-[70vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.80) 0%, rgba(124,58,237,0.30) 40%, transparent 70%)' }} />
      <div className="absolute -bottom-[30%] -right-[15%] w-[65vw] h-[65vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(219,39,119,0.70) 0%, rgba(219,39,119,0.25) 40%, transparent 70%)' }} />
      <div className="absolute top-[20%] right-[25%] w-[30vw] h-[30vw] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.45) 0%, transparent 70%)' }} />

      {/* ── FULL SCREEN LAYOUT ── */}
      <div className="relative z-10 h-full grid grid-cols-1 lg:grid-cols-2">

        {/* ═══ LEFT: Dark glass panel with text ═══ */}
        <div className="flex flex-col justify-between p-10 lg:p-14 order-2 lg:order-1"
          style={{
            background: 'rgba(10,6,30,0.55)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            borderRight: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Top: logo / brand */}
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-display text-sm"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.5), rgba(219,39,119,0.35))', border: '1px solid rgba(255,255,255,0.18)', color: '#c4b5fd' }}>
              RK
            </div>
            <span className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>Portfolio · 2026</span>
          </motion.div>

          {/* Middle: name + role */}
          <div className="space-y-6">
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-[10px] tracking-[0.28em] uppercase glass-violet mb-5 block w-fit" style={{ color: '#c4b5fd' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                Software Engineer
              </span>
              <h1 className="font-display uppercase leading-none" style={{ fontSize: 'clamp(4rem, 8vw, 7rem)', letterSpacing: '-0.03em' }}>
                <span className="block text-white">Renda</span>
                <span className="block text-stroke-violet">Kurnia</span>
                <span className="block" style={{ background: 'linear-gradient(90deg, #fde68a, #f9a8d4)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                  Manik
                </span>
              </h1>
            </motion.div>

            <motion.p variants={fadeUp} className="font-sans font-light text-base leading-relaxed max-w-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
              Memadukan keahlian kriptografi modern dengan rekayasa sistem web terdistribusi.
            </motion.p>

            {/* Mini stat pills */}
            <motion.div variants={fadeUp} className="flex gap-3 flex-wrap">
              {[
                { val: "3+", label: "Projects", color: "#c4b5fd" },
                { val: "5+", label: "Roles", color: "#f9a8d4" },
                { val: "2+", label: "Years", color: "#fde68a" },
              ].map(s => (
                <div key={s.label} className="glass rounded-xl px-4 py-2 text-center min-w-[72px]">
                  <div className="font-display text-2xl" style={{ color: s.color }}>{s.val}</div>
                  <div className="font-mono text-[9px] tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.35)' }}>{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Skills quick row */}
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              {["Laravel","Docker","AES-256","React","PostgreSQL"].map(s => (
                <span key={s} className="font-mono text-[10px] tracking-widest uppercase px-3 py-1 rounded-full glass" style={{ color: 'rgba(255,255,255,0.45)' }}>{s}</span>
              ))}
            </motion.div>
          </div>

          {/* Bottom: enter button */}
          <motion.div variants={fadeUp}>
            <button
              onClick={onComplete}
              className="group relative overflow-hidden w-full flex items-center justify-between font-sans font-bold uppercase tracking-[0.22em] text-sm py-4 px-8 rounded-2xl transition-all duration-300 hover-target"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)', color: '#fff', boxShadow: '0 4px 30px rgba(124,58,237,0.5)' }}
            >
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 rounded-2xl pointer-events-none"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)' }} />
              <span className="relative z-10">Enter Portfolio</span>
              <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* ═══ RIGHT: Portrait + floating cards ═══ */}
        <div className="relative flex items-center justify-center p-10 order-1 lg:order-2 overflow-hidden min-h-[50vh] lg:min-h-0">
          {/* Portrait */}
          <motion.div
            variants={fadeUp}
            className="relative w-full max-w-[320px] lg:max-w-[380px]"
          >
            {/* Glow behind portrait */}
            <div className="absolute inset-0 rounded-3xl pointer-events-none"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.55), rgba(219,39,119,0.45))', filter: 'blur(30px)', transform: 'scale(1.12)' }} />

            {/* Portrait card */}
            <motion.div
              className="relative aspect-[3/4] rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.09)',
                backdropFilter: 'blur(20px) saturate(180%)',
                WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                border: '1px solid rgba(255,255,255,0.18)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2)',
              }}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Color wash */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(155deg, rgba(124,58,237,0.5) 0%, rgba(219,39,119,0.35) 50%, rgba(6,182,212,0.25) 100%)' }} />
              {avatar && (
                <img src={avatar} alt="Renda Kurnia Manik"
                  className="absolute inset-0 w-full h-full object-cover object-top"
                  style={{ filter: 'brightness(0.88) contrast(1.05)', mixBlendMode: 'luminosity', opacity: 0.82 }} />
              )}
              {/* Bottom glass label */}
              <div className="absolute bottom-0 left-0 right-0 p-5"
                style={{ background: 'linear-gradient(to top, rgba(10,6,30,0.85) 0%, transparent 100%)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
              >
                <p className="font-mono text-[9px] tracking-[0.35em] uppercase mb-1" style={{ color: '#c4b5fd' }}>Verified Portfolio</p>
                <p className="font-display text-xs tracking-widest uppercase" style={{ color: 'rgba(255,255,255,0.65)' }}>Cover // 2026</p>
              </div>
              {/* Top inner glow */}
              <div className="absolute top-0 inset-x-0 h-1/3 pointer-events-none"
                style={{ background: 'linear-gradient(180deg, rgba(124,58,237,0.3), transparent)' }} />
            </motion.div>

            {/* Floating badge: 2026 */}
            <motion.div
              className="absolute -right-5 top-8 z-20 px-4 py-2 rounded-2xl font-sans font-black text-sm"
              style={{ background: 'linear-gradient(135deg, #fbbf24, #f97316)', color: '#1e0030', boxShadow: '0 8px 24px rgba(251,191,36,0.5)' }}
              animate={{ y: [0, -6, 0], rotate: [3, 3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              2026
            </motion.div>

            {/* Floating card: full-stack */}
            <motion.div
              className="absolute -left-6 bottom-20 z-20 glass-pink rounded-xl px-4 py-3"
              style={{ boxShadow: '0 8px 24px rgba(219,39,119,0.35)' }}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            >
              <div className="flex items-center gap-2">
                <Code2 size={14} color="#f9a8d4" />
                <span className="font-sans font-bold text-[11px] uppercase tracking-wider" style={{ color: '#f9a8d4' }}>Full-Stack Dev</span>
              </div>
            </motion.div>

            {/* Floating card: cryptography */}
            <motion.div
              className="absolute -right-6 bottom-1/3 z-20 glass-violet rounded-xl px-4 py-3"
              style={{ boxShadow: '0 8px 24px rgba(124,58,237,0.35)' }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            >
              <div className="flex items-center gap-2">
                <Shield size={14} color="#c4b5fd" />
                <span className="font-sans font-bold text-[11px] uppercase tracking-wider" style={{ color: '#c4b5fd' }}>AES-256</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}
