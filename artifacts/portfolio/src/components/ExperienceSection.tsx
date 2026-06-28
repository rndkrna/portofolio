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

const EXP_COLORS = [
  "hsl(271,91%,65%)",
  "hsl(327,81%,62%)",
  "hsl(43,96%,56%)",
  "hsl(188,92%,42%)",
  "hsl(84,81%,44%)",
];

export default function ExperienceSection() {
  const { data: dbExperiences } = useGetExperiences();
  const displayExperiences = dbExperiences === undefined ? fallbackExperiences : dbExperiences;

  return (
    <section id="experience" className="relative overflow-hidden">

      {/* === SECTION HEADER === */}
      <div className="relative py-20 border-y-4 overflow-hidden" style={{
        borderColor: 'hsl(188,92%,42%)',
        background: 'linear-gradient(135deg, hsl(200 60% 6%) 0%, hsl(270 50% 5%) 60%)',
      }}>
        <div className="dot-pattern absolute inset-0 opacity-30" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex items-start gap-6">
            <span
              className="font-display text-[8rem] md:text-[12rem] leading-none"
              style={{
                WebkitTextStroke: '2px hsl(188 92% 42% / 0.3)',
                color: 'transparent',
              }}
            >
              04
            </span>
            <div className="pt-4 md:pt-8">
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-[hsl(188,92%,55%)] mb-2">
                My Journey
              </p>
              <h2 className="font-display uppercase leading-none">
                <span className="block text-7xl md:text-9xl text-foreground">Chrono</span>
                <span
                  className="block text-7xl md:text-9xl"
                  style={{ color: 'hsl(188,92%,42%)' }}
                >
                  -logy
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* === TIMELINE === */}
      <div className="py-8 relative" style={{ background: 'hsl(270 50% 4%)' }}>
        {displayExperiences.map((exp, idx) => {
          const color = EXP_COLORS[idx % EXP_COLORS.length];
          const isLast = idx === displayExperiences.length - 1;
          return (
            <motion.div
              key={idx}
              className={`relative border-b-2 group/exp transition-all duration-500`}
              style={{ borderColor: color + '20' }}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
            >
              {/* Hover fill */}
              <div
                className="absolute inset-0 opacity-0 group-hover/exp:opacity-100 transition-opacity duration-500"
                style={{ background: color.replace(')', '/0.05)').replace('hsl(', 'hsl(') }}
              />

              <div className="container mx-auto px-6 md:px-12 py-10 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">

                  {/* Giant backdrop number */}
                  <div className="md:col-span-2 flex items-start justify-start md:justify-end pt-1">
                    <span
                      className="font-display text-7xl md:text-8xl leading-none select-none group-hover/exp:opacity-100 transition-opacity duration-300"
                      style={{
                        WebkitTextStroke: `2px ${color}`,
                        color: 'transparent',
                        opacity: 0.3,
                      }}
                    >
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Left accent bar */}
                  <div className="md:col-span-10">
                    <div className="flex gap-6 items-start">
                      {/* Thick vertical accent line */}
                      <div
                        className="hidden md:block w-1 self-stretch flex-shrink-0 rounded-full group-hover/exp:w-1.5 transition-all duration-300"
                        style={{ background: color, minHeight: '3rem' }}
                      />

                      <div className="flex-1">
                        {/* Period badge */}
                        <div className="mb-3">
                          <span
                            className="inline-flex font-mono text-[11px] tracking-[0.25em] uppercase px-3 py-1 border-2"
                            style={{ borderColor: color + '50', color }}
                          >
                            {exp.period}
                          </span>
                        </div>

                        {/* Role */}
                        <h3
                          className="font-display uppercase text-3xl md:text-4xl leading-tight mb-2 text-foreground group-hover/exp:transition-colors duration-300"
                          style={{ letterSpacing: '-0.01em' }}
                        >
                          {exp.role}
                        </h3>

                        {/* Company */}
                        <p
                          className="font-sans font-bold text-sm uppercase tracking-[0.2em] mb-4"
                          style={{ color }}
                        >
                          @ {exp.company}
                        </p>

                        {/* Description */}
                        <p className="font-sans text-foreground/55 font-light leading-relaxed max-w-2xl">
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
