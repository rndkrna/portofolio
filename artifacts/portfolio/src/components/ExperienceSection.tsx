import { motion } from 'framer-motion';
import { useGetExperiences } from '@workspace/api-client-react';

const fallbackExperiences = [
  {
    role: "Freelance Web Developer",
    company: "Detik1Aceh.com",
    period: "Apr 2026 — Present",
    description: "Membangun platform media berita digital secara end-to-end. Merancang skema basis data relasional serta mengamankan situs dari serangan brute force pada halaman login admin."
  },
  {
    role: "Freelance Front-End Developer",
    company: "CV Master Teknik Sinar Bintan",
    period: "Mar 2026",
    description: "Merancang website profil perusahaan responsif (Mobile & Desktop), melakukan manajemen aset visual untuk optimasi loading time, dan menerapkan SEO dasar."
  },
  {
    role: "Ketua Divisi Kajian & Penelitian",
    company: "BEM FTTK UMRAH",
    period: "Des 2025 — Present",
    description: "Memimpin tim dalam merancang metodologi penelitian dan analisis data untuk merumuskan rekomendasi kebijakan organisasi berbasis data."
  },
  {
    role: "Tim Peneliti Keamanan Sistem",
    company: "Universitas Maritim Raja Ali Haji",
    period: "2025",
    description: "Mengembangkan sistem beasiswa terenkripsi dengan kriptografi modern (Scrypt, HKDF, AES-256-GCM) serta melakukan pengujian skenario kerentanan siber."
  },
  {
    role: "Ketua Bidang Kaderisasi & Advokasi",
    company: "PMII",
    period: "2023 — 2024",
    description: "Merancang kurikulum kepemimpinan tingkat organisasi dan mengelola tim pendampingan advokasi anggota secara terstruktur."
  }
];

const EXP_COLORS = ["#a855f7", "#f43f8a", "#f0a500", "#22d3ee", "#4ade80"];

export default function ExperienceSection() {
  const { data: dbExperiences } = useGetExperiences();
  const displayExperiences = dbExperiences === undefined ? fallbackExperiences : dbExperiences;

  return (
    <section id="experience" className="relative overflow-hidden">

      {/* ── Header ─────────────────────────────────────── */}
      <div
        className="relative py-20 overflow-hidden border-y-4"
        style={{ borderColor: "#22d3ee", background: "linear-gradient(135deg, hsl(195 50% 7%) 0%, hsl(230 18% 8%) 100%)" }}
      >
        <div className="dot-pattern absolute inset-0 opacity-45" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex items-start gap-5">
            <span
              className="font-display leading-none"
              style={{
                fontSize: "clamp(7rem, 18vw, 14rem)",
                WebkitTextStroke: "2px rgba(34,211,238,0.25)",
                color: "transparent",
              }}
            >
              04
            </span>
            <div className="pt-4 md:pt-8">
              <p className="font-mono text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "#22d3ee" }}>
                My Journey
              </p>
              <h2
                className="font-display uppercase leading-none"
                style={{ fontSize: "clamp(3.5rem, 8vw, 7.5rem)" }}
              >
                <span className="block text-white">Chrono</span>
                <span className="block" style={{ color: "#22d3ee" }}>-logy</span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* ── Timeline ───────────────────────────────────── */}
      <div className="py-6" style={{ background: "hsl(230 18% 8%)" }}>
        {displayExperiences.map((exp, idx) => {
          const color = EXP_COLORS[idx % EXP_COLORS.length];
          return (
            <motion.div
              key={idx}
              className="relative border-b-2 group/exp transition-colors duration-400"
              style={{ borderColor: color + "1a" }}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.07 }}
            >
              {/* Hover fill */}
              <div
                className="absolute inset-0 opacity-0 group-hover/exp:opacity-100 transition-opacity duration-400 pointer-events-none"
                style={{ background: color + "08" }}
              />
              {/* Left border accent */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[3px] opacity-0 group-hover/exp:opacity-100 transition-opacity duration-300"
                style={{ background: color }}
              />

              <div className="container mx-auto px-6 md:px-12 py-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8 items-start">

                  {/* Giant backdrop number */}
                  <div className="md:col-span-2 flex items-start justify-start md:justify-end pt-1">
                    <span
                      className="font-display leading-none select-none transition-opacity duration-300"
                      style={{
                        fontSize: "clamp(4rem, 7vw, 7rem)",
                        WebkitTextStroke: `2px ${color}`,
                        color: "transparent",
                        opacity: 0.25,
                      }}
                    >
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="md:col-span-10">
                    <div className="flex gap-5 items-start">
                      {/* Vertical accent bar */}
                      <div
                        className="hidden md:block w-[3px] self-stretch flex-shrink-0 rounded-full"
                        style={{ background: color, minHeight: "3rem" }}
                      />

                      <div className="flex-1">
                        {/* Period badge */}
                        <div className="mb-3">
                          <span
                            className="inline-flex font-mono text-[11px] tracking-[0.22em] uppercase px-3 py-1 border-2"
                            style={{ borderColor: color + "50", color }}
                          >
                            {exp.period}
                          </span>
                        </div>

                        {/* Role */}
                        <h3
                          className="font-display uppercase leading-tight mb-1.5 text-white"
                          style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)", letterSpacing: "-0.01em" }}
                        >
                          {exp.role}
                        </h3>

                        {/* Company */}
                        <p className="font-sans font-bold text-sm uppercase tracking-[0.18em] mb-4" style={{ color }}>
                          @ {exp.company}
                        </p>

                        {/* Description */}
                        <p className="font-sans font-light leading-relaxed max-w-2xl" style={{ color: "hsl(220 15% 58%)" }}>
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
