import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import { useGetProjects } from '@workspace/api-client-react';

const fallbackProjects = [
  {
    title: "Detik1Aceh",
    category: "Media News Platform",
    type: "Fullstack",
    description: "Membangun platform media berita digital secara end-to-end dengan skema basis data relasional yang efisien untuk mengelola artikel, multimedia, dan proteksi admin dari serangan brute force.",
    image: "/images/project-1.png",
    year: "2026",
    color: "#a855f7",
    colorBg: "rgba(168,85,247,0.07)",
  },
  {
    title: "CV Master Teknik Sinar Bintan",
    category: "Company Profile",
    type: "Frontend",
    description: "Merancang website profil perusahaan responsif dengan optimasi loading time melalui manajemen aset visual dan penerapan SEO dasar.",
    image: "/images/project-2.png",
    year: "2026",
    color: "#f43f8a",
    colorBg: "rgba(244,63,138,0.07)",
  },
  {
    title: "KIP Scholarship Security",
    category: "Research & Security",
    type: "Fullstack",
    description: "Mengembangkan sistem informasi beasiswa terenkripsi dengan algoritma Scrypt, HKDF, dan AES-256-GCM guna menjamin keamanan data sensitif mahasiswa.",
    image: "/images/hero-bg.png",
    year: "2025",
    color: "#f0a500",
    colorBg: "rgba(240,165,0,0.07)",
  },
];

const COLORS = ["#a855f7", "#f43f8a", "#f0a500"];
const BGAS   = ["rgba(168,85,247,0.07)", "rgba(244,63,138,0.07)", "rgba(240,165,0,0.07)"];

export default function WorkSection() {
  const { data: dbProjects } = useGetProjects();
  const raw = dbProjects === undefined ? fallbackProjects : dbProjects;
  const displayProjects = raw.map((p: any, i: number) => ({
    ...p,
    color:   p.color   ?? COLORS[i % COLORS.length],
    colorBg: p.colorBg ?? BGAS[i % BGAS.length],
    type:    p.type    ?? "Project",
  }));

  return (
    <section id="work" className="relative overflow-hidden">

      {/* ── Header ──────────────────────────────────────── */}
      <div
        className="relative py-20 overflow-hidden border-y-4"
        style={{ borderColor: "#f43f8a", background: "linear-gradient(135deg, hsl(325 35% 9%) 0%, hsl(230 18% 8%) 100%)" }}
      >
        <div className="grid-pattern absolute inset-0 opacity-50" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

            <div className="flex items-start gap-5">
              <span
                className="font-display leading-none"
                style={{
                  fontSize: "clamp(7rem, 18vw, 14rem)",
                  WebkitTextStroke: "2px rgba(244,63,138,0.28)",
                  color: "transparent",
                }}
              >
                03
              </span>
              <div className="pt-4 md:pt-8">
                <p className="font-mono text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "#f43f8a" }}>
                  What I've Built
                </p>
                <h2
                  className="font-display uppercase leading-none"
                  style={{ fontSize: "clamp(3.5rem, 8vw, 7.5rem)" }}
                >
                  <span className="block text-white">Selected</span>
                  <span className="block" style={{ color: "#f43f8a" }}>Works</span>
                </h2>
              </div>
            </div>

            <div
              className="hidden md:flex items-center gap-3 border-2 px-5 py-3"
              style={{ borderColor: "rgba(244,63,138,0.4)" }}
            >
              <span className="font-display text-3xl" style={{ color: "#f43f8a" }}>{displayProjects.length}</span>
              <div>
                <p className="font-mono text-[10px] tracking-widest uppercase" style={{ color: "hsl(220 15% 35%)" }}>Projects</p>
                <p className="font-mono text-xs" style={{ color: "hsl(220 15% 45%)" }}>2021 — 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Projects ────────────────────────────────────── */}
      <div className="py-6" style={{ background: "hsl(230 18% 8%)" }}>
        {displayProjects.map((project: any, idx: number) => (
          <ProjectCard key={project.title} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [55, -55]);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className="group relative border-b-2"
      style={{ borderColor: project.color + "22" }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Hover fill */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: project.colorBg }}
      />

      <div className="container mx-auto px-6 md:px-12 py-12 md:py-16 relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center`}>

          {/* Number */}
          <div className={`lg:col-span-1 hidden lg:flex items-center justify-center ${!isEven ? "lg:order-3" : ""}`}>
            <span
              className="font-display text-8xl leading-none select-none"
              style={{ WebkitTextStroke: `2px ${project.color}`, color: "transparent" }}
            >
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Image */}
          <div className={`lg:col-span-6 overflow-hidden relative aspect-[16/10] ${!isEven ? "lg:order-2" : ""}`}>
            <div
              className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pointer-events-none border-4"
              style={{ borderColor: project.color }}
            />
            <motion.div className="w-full h-full" style={{ y }}>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[120%] object-cover object-center -mt-[10%] group-hover:scale-105 transition-transform duration-1000 ease-out"
                style={{ filter: "grayscale(20%) brightness(0.88)" }}
              />
            </motion.div>
            {/* Subtle color tint gone on hover */}
            <div
              className="absolute inset-0 opacity-30 group-hover:opacity-0 transition-opacity duration-500 pointer-events-none"
              style={{ background: `linear-gradient(135deg, ${project.color}55, transparent)` }}
            />
          </div>

          {/* Content */}
          <div className={`lg:col-span-5 flex flex-col ${!isEven ? "lg:order-1 lg:items-end lg:text-right" : ""}`}>
            <div className={`flex items-center gap-3 mb-4 ${!isEven ? "lg:justify-end" : ""}`}>
              <span
                className="font-sans font-bold text-xs uppercase tracking-widest px-3 py-1 border-2"
                style={{ color: project.color, borderColor: project.color + "55" }}
              >
                {project.type}
              </span>
              <span className="font-mono text-xs" style={{ color: "hsl(220 15% 40%)" }}>{project.year}</span>
            </div>

            <h3
              className="font-display uppercase leading-none mb-3"
              style={{ fontSize: "clamp(2.5rem, 4.5vw, 5.5rem)", letterSpacing: "-0.02em" }}
            >
              {project.title}
            </h3>

            <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color: project.color }}>
              {project.category}
            </p>

            <p className="font-sans text-base font-light leading-relaxed mb-7 max-w-sm" style={{ color: "hsl(220 15% 60%)" }}>
              {project.description}
            </p>

            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 font-sans font-bold text-xs uppercase tracking-widest py-3 px-6 border-2 transition-all duration-300 hover-target ${!isEven ? "lg:self-end" : ""}`}
                style={{ borderColor: project.color, color: project.color }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = project.color;
                  (e.currentTarget as HTMLElement).style.color = "hsl(230 18% 8%)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.color = project.color;
                }}
              >
                View Case Study <ArrowUpRight size={14} />
              </a>
            ) : (
              <span
                className={`inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest py-3 px-6 border-2 opacity-25 cursor-not-allowed select-none ${!isEven ? "lg:self-end" : ""}`}
                style={{ borderColor: project.color, color: project.color }}
              >
                View Case Study <ExternalLink size={14} />
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
