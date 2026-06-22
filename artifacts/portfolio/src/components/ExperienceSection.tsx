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

export default function ExperienceSection() {
  const { data: dbExperiences } = useGetExperiences();
  const displayExperiences = dbExperiences === undefined ? fallbackExperiences : dbExperiences;

  return (
    <section id="experience" className="py-32 bg-card/30 relative border-t border-border/40">
      <div className="container mx-auto px-6 md:px-12">
        <motion.h2 
          className="text-4xl font-display uppercase tracking-widest text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Chronology
        </motion.h2>

        <div className="max-w-4xl mx-auto">
          {displayExperiences.map((exp, idx) => (
            <motion.div 
              key={idx}
              className="relative pl-8 md:pl-0 border-l border-border md:border-none mb-16 last:mb-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="md:grid md:grid-cols-4 md:gap-8 md:items-start group">
                
                {/* Timeline Dot (Mobile) & Date (Desktop) */}
                <div className="md:col-span-1 md:text-right md:pt-1">
                  <div className="absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-primary md:hidden"></div>
                  <span className="text-sm font-mono text-muted-foreground group-hover:text-primary transition-colors">
                    {exp.period}
                  </span>
                </div>

                {/* Content */}
                <div className="md:col-span-3 md:border-l md:border-border md:pl-8 md:relative">
                  <div className="hidden md:block absolute left-[-5px] top-2 w-2 h-2 rounded-full bg-border group-hover:bg-primary transition-colors"></div>
                  <h3 className="text-2xl font-display uppercase tracking-wide mb-1 text-foreground">
                    {exp.role}
                  </h3>
                  <p className="text-primary uppercase tracking-widest text-xs mb-4">
                    {exp.company}
                  </p>
                  <p className="text-muted-foreground font-light leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
