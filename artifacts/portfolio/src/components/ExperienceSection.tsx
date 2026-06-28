import { motion } from 'framer-motion';
import { useGetExperiences } from '@workspace/api-client-react';
import { Briefcase, GraduationCap, Users2, Calendar } from 'lucide-react';

const fallbackExperiences = [
  { role: "Freelance Web Developer", company: "Detik1Aceh.com", period: "Apr 2026 — Present", description: "Membangun platform media berita digital secara end-to-end. Merancang skema basis data relasional serta mengamankan situs dari serangan brute force pada halaman login admin." },
  { role: "Freelance Front-End Developer", company: "CV Master Teknik Sinar Bintan", period: "Mar 2026", description: "Merancang website profil perusahaan responsif (Mobile & Desktop), melakukan manajemen aset visual untuk optimasi loading time, dan menerapkan SEO dasar." },
  { role: "Ketua Divisi Kajian & Penelitian", company: "BEM FTTK UMRAH", period: "Des 2025 — Present", description: "Memimpin tim dalam merancang membuat rekomendasi kebijakan organisasi berbasis data." },
  { role: "Tim Peneliti Keamanan Sistem", company: "Universitas Maritim Raja Ali Haji", period: "2025", description: "Mengembangkan sistem beasiswa terenkripsi dengan kriptografi modern (Scrypt, HKDF, AES-256-GCM) serta melakukan pengujian skenario kerentanan siber." },
  { role: "Ketua Bidang Kaderisasi & Advokasi", company: "PMII", period: "2023 — 2024", description: "Merancang kurikulum kepemimpinan tingkat organisasi dan mengelola tim pendampingan advokasi anggota secara terstruktur." },
];

const EXP_COLORS = ["#c4b5fd", "#f9a8d4", "#fde68a", "#67e8f9", "#86efac"];
const GLASS_CLASSES = ["glass-violet", "glass-pink", "glass-gold", "glass-cyan", "glass-green"];
const ICONS = [Briefcase, Briefcase, Users2, GraduationCap, Users2];

export default function ExperienceSection() {
  const { data: dbExperiences } = useGetExperiences();
  const displayExperiences = dbExperiences === undefined ? fallbackExperiences : dbExperiences;

  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[10%] right-[5%] w-[45vw] h-[45vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(103,232,249,0.15) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[10%] left-[5%] w-[45vw] h-[45vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 70%)' }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Label */}
        <motion.div 
          className="flex items-center gap-4 mb-6" 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-xs tracking-[0.35em] uppercase" style={{ color: '#67e8f9' }}>04 — Experience</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(103,232,249,0.4), transparent)' }} />
        </motion.div>

        {/* Heading */}
        <motion.div 
          className="mb-20" 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display uppercase leading-none" style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)' }}>
            <span className="block text-white">Chrono-</span>
            <span className="block" style={{ background: 'linear-gradient(90deg, #67e8f9, #818cf8)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              logy
            </span>
          </h2>
        </motion.div>

        {/* ── ALTERNATING TIMELINE LAYOUT ── */}
        <div className="relative">
          {/* Centered Vertical Line on Desktop, Left Line on Mobile */}
          <div 
            className="absolute left-4 md:left-1/2 top-4 bottom-4 w-px -translate-x-1/2"
            style={{ background: 'linear-gradient(180deg, rgba(167,139,250,0.4) 0%, rgba(219,39,119,0.3) 40%, rgba(6,182,212,0.2) 70%, rgba(34,211,238,0.1) 100%)' }}
          />

          <div className="space-y-12">
            {displayExperiences.map((exp, idx) => {
              const color = EXP_COLORS[idx % EXP_COLORS.length];
              const glassClass = GLASS_CLASSES[idx % GLASS_CLASSES.length];
              const ItemIcon = ICONS[idx % ICONS.length];
              const isEven = idx % 2 === 0;

              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-stretch md:justify-between">
                  
                  {/* Glowing Node Point */}
                  <div 
                    className="absolute left-4 md:left-1/2 w-6 h-6 rounded-full -translate-x-1/2 z-10 flex items-center justify-center top-6"
                    style={{ 
                      background: '#1e0030',
                      border: `2px solid ${color}`,
                      boxShadow: `0 0 15px ${color}80`
                    }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ background: color }} />
                  </div>

                  {/* Left Side Content Card (Visible on even index desktop, empty on odd) */}
                  <div className={`w-full md:w-[45%] pl-10 md:pl-0 flex flex-col items-stretch ${isEven ? 'md:order-1' : 'md:order-3 md:invisible h-0 md:h-auto overflow-hidden md:overflow-visible'}`}>
                    <motion.div 
                      className={`${glassClass} p-6 border border-white/10 rounded-3xl relative overflow-hidden`}
                      initial={{ opacity: 0, x: isEven ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.6 }}
                    >
                      {/* Period Pill */}
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar size={12} style={{ color }} />
                        <span className="font-mono text-[10px] tracking-wider uppercase font-bold" style={{ color }}>
                          {exp.period}
                        </span>
                      </div>
                      
                      {/* Title & Organization */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: color + '15', border: `1px solid ${color}30`, color }}>
                          <ItemIcon size={16} />
                        </div>
                        <div>
                          <h3 className="font-display uppercase text-xl text-white tracking-wide leading-tight">{exp.role}</h3>
                          <p className="font-sans font-bold text-xs uppercase tracking-wider mt-0.5" style={{ color }}>@ {exp.company}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="font-sans text-sm font-light leading-relaxed text-white/60">
                        {exp.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* Spacer Center Column (Desktop Only) */}
                  <div className="hidden md:block w-[5%] md:order-2" />

                  {/* Right Side Content Card (Visible on odd index desktop, empty on even) */}
                  <div className={`w-full md:w-[45%] pl-10 md:pl-0 flex flex-col items-stretch ${!isEven ? 'md:order-3' : 'md:order-1 md:invisible md:h-0 md:overflow-hidden'}`}>
                    <motion.div 
                      className={`${glassClass} p-6 border border-white/10 rounded-3xl relative overflow-hidden`}
                      initial={{ opacity: 0, x: !isEven ? 40 : -40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.6 }}
                    >
                      {/* Period Pill */}
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar size={12} style={{ color }} />
                        <span className="font-mono text-[10px] tracking-wider uppercase font-bold" style={{ color }}>
                          {exp.period}
                        </span>
                      </div>

                      {/* Title & Organization */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{ background: color + '15', border: `1px solid ${color}30`, color }}>
                          <ItemIcon size={16} />
                        </div>
                        <div>
                          <h3 className="font-display uppercase text-xl text-white tracking-wide leading-tight">{exp.role}</h3>
                          <p className="font-sans font-bold text-xs uppercase tracking-wider mt-0.5" style={{ color }}>@ {exp.company}</p>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="font-sans text-sm font-light leading-relaxed text-white/60">
                        {exp.description}
                      </p>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
