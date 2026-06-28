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
    color: "hsl(271,91%,65%)",
    colorBg: "hsl(271,91%,65%/0.08)",
  },
  {
    title: "CV Master Teknik Sinar Bintan",
    category: "Company Profile",
    type: "Frontend",
    description: "Merancang website profil perusahaan responsif dengan optimasi loading time melalui manajemen aset visual dan penerapan SEO dasar.",
    image: "/images/project-2.png",
    year: "2026",
    color: "hsl(327,81%,62%)",
    colorBg: "hsl(327,81%,62%/0.08)",
  },
  {
    title: "KIP Scholarship Security",
    category: "Research & Security",
    type: "Fullstack",
    description: "Mengembangkan sistem informasi beasiswa terenkripsi dengan algoritma Scrypt, HKDF, dan AES-256-GCM guna menjamin keamanan data sensitif mahasiswa.",
    image: "/images/hero-bg.png",
    year: "2025",
    color: "hsl(43,96%,56%)",
    colorBg: "hsl(43,96%,56%/0.08)",
  }
];

const COLORS = ["hsl(271,91%,65%)", "hsl(327,81%,62%)", "hsl(43,96%,56%)"];

export default function WorkSection() {
  const { data: dbProjects } = useGetProjects();
  const rawProjects = dbProjects === undefined ? fallbackProjects : dbProjects;
  const displayProjects = rawProjects.map((p: any, i: number) => ({
    ...p,
    color: p.color ?? COLORS[i % COLORS.length],
    colorBg: p.colorBg ?? COLORS[i % COLORS.length].replace(')', '/0.08)').replace('hsl(', 'hsl('),
    type: p.type ?? "Project",
  }));

  return (
    <section id="work" className="relative overflow-hidden">

      {/* === SECTION HEADER === */}
      <div className="relative py-20 border-y-4 overflow-hidden" style={{
        borderColor: 'hsl(327,81%,62%)',
        background: 'linear-gradient(135deg, hsl(327 50% 8%) 0%, hsl(270 50% 5%) 60%)',
      }}>
        <div className="grid-pattern absolute inset-0 opacity-40" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex items-start gap-6">
              <span
                className="font-display text-[8rem] md:text-[12rem] leading-none"
                style={{
                  WebkitTextStroke: '2px hsl(327 81% 62% / 0.3)',
                  color: 'transparent',
                }}
              >
                03
              </span>
              <div className="pt-4 md:pt-8">
                <p className="font-mono text-xs tracking-[0.3em] uppercase text-[hsl(327,81%,70%)] mb-2">
                  What I've Built
                </p>
                <h2 className="font-display uppercase leading-none">
                  <span className="block text-7xl md:text-9xl text-foreground">Selected</span>
                  <span
                    className="block text-7xl md:text-9xl"
                    style={{ color: 'hsl(327,81%,62%)' }}
                  >
                    Works
                  </span>
                </h2>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-3 border-2 border-[hsl(327,81%,62%/0.4)] px-5 py-3">
              <span className="font-display text-3xl text-[hsl(327,81%,62%)]">
                {displayProjects.length}
              </span>
              <div>
                <p className="font-mono text-[10px] tracking-widest uppercase text-foreground/30">Projects</p>
                <p className="font-mono text-xs tracking-widest text-foreground/50">2021 — 2026</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* === PROJECTS LIST === */}
      <div className="py-8" style={{ background: 'hsl(270 50% 4%)' }}>
        {displayProjects.map((project: any, idx: number) => (
          <ProjectCard key={project.title} project={project} index={idx} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className="group relative border-b-2"
      style={{ borderColor: project.color + '20' }}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Hover background fill */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: project.colorBg }}
      />

      <div className="container mx-auto px-6 md:px-12 py-12 md:py-16 relative z-10">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>

          {/* Giant number */}
          <div className={`lg:col-span-1 hidden lg:flex items-center justify-center ${!isEven ? 'lg:order-3' : ''}`}>
            <span
              className="font-display text-8xl leading-none select-none"
              style={{
                WebkitTextStroke: `2px ${project.color}`,
                color: 'transparent',
              }}
            >
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>

          {/* Image */}
          <div className={`lg:col-span-6 overflow-hidden relative aspect-[16/10] ${!isEven ? 'lg:order-2' : ''}`}>
            {/* Thick color border on hover */}
            <div
              className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none border-4"
              style={{ borderColor: project.color }}
            />
            <motion.div className="w-full h-full" style={{ y }}>
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[120%] object-cover object-center -mt-[10%] group-hover:scale-105 transition-transform duration-1000 ease-out grayscale-[30%] group-hover:grayscale-0"
              />
            </motion.div>
            {/* Color overlay */}
            <div
              className="absolute inset-0 opacity-20 group-hover:opacity-0 transition-opacity duration-500"
              style={{ background: `linear-gradient(135deg, ${project.color}, transparent)` }}
            />
          </div>

          {/* Content */}
          <div className={`lg:col-span-5 flex flex-col ${!isEven ? 'lg:order-1 lg:items-end lg:text-right' : ''}`}>
            {/* Category + Year */}
            <div className={`flex items-center gap-3 mb-4 ${!isEven ? 'lg:justify-end' : ''}`}>
              <span
                className="font-sans font-bold text-xs uppercase tracking-widest px-3 py-1 border-2"
                style={{ color: project.color, borderColor: project.color + '60' }}
              >
                {project.type}
              </span>
              <span className="font-mono text-xs text-foreground/40">{project.year}</span>
            </div>

            {/* Title */}
            <h3 className="font-display uppercase text-4xl md:text-5xl lg:text-6xl leading-none mb-4" style={{
              letterSpacing: '-0.02em',
            }}>
              {project.title}
            </h3>

            {/* Category tag */}
            <p className="font-mono text-xs tracking-[0.2em] uppercase mb-4" style={{ color: project.color }}>
              {project.category}
            </p>

            {/* Description */}
            <p className="font-sans text-foreground/60 font-light leading-relaxed mb-6 max-w-sm">
              {project.description}
            </p>

            {/* CTA */}
            {project.link ? (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 font-sans font-bold text-xs uppercase tracking-widest py-3 px-6 border-2 transition-all duration-300 hover-target ${!isEven ? 'lg:self-end' : ''}`}
                style={{ borderColor: project.color, color: project.color }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = project.color;
                  (e.currentTarget as HTMLElement).style.color = 'hsl(270,50%,5%)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = project.color;
                }}
              >
                View Case Study <ArrowUpRight size={14} />
              </a>
            ) : (
              <span
                className={`inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest py-3 px-6 border-2 opacity-30 cursor-not-allowed select-none ${!isEven ? 'lg:self-end' : ''}`}
                style={{ borderColor: project.color + '40', color: project.color }}
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
