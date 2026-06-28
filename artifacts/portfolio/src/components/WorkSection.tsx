import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, ShieldAlert, Newspaper, Building2 } from 'lucide-react';
import { useGetProjects } from '@workspace/api-client-react';

const fallbackProjects = [
  {
    title: "Detik1Aceh",
    category: "Media News Platform",
    type: "Fullstack",
    description: "Membangun platform media berita digital secara end-to-end dengan skema basis data relasional yang efisien untuk mengelola artikel, multimedia, dan proteksi admin dari serangan brute force.",
    image: "/images/project-1.png",
    year: "2026",
    color: "#c4b5fd",
    icon: Newspaper,
    glassClass: "glass-violet",
    size: "large" // Takes 2 cols
  },
  {
    title: "CV Master Teknik Sinar Bintan",
    category: "Company Profile",
    type: "Frontend",
    description: "Merancang website profil perusahaan responsif dengan optimasi loading time melalui manajemen aset visual dan penerapan SEO dasar.",
    image: "/images/project-2.png",
    year: "2026",
    color: "#f9a8d4",
    icon: Building2,
    glassClass: "glass-pink",
    size: "small" // Takes 1 col
  },
  {
    title: "KIP Scholarship Security",
    category: "Research & Security",
    type: "Fullstack",
    description: "Mengembangkan sistem informasi beasiswa terenkripsi dengan algoritma Scrypt, HKDF, dan AES-256-GCM guna menjamin keamanan data sensitif mahasiswa.",
    image: "/images/hero-bg.png",
    year: "2025",
    color: "#fde68a",
    icon: ShieldAlert,
    glassClass: "glass-gold",
    size: "full" // Takes full width below
  },
];

const COLORS = ["#c4b5fd", "#f9a8d4", "#fde68a"];
const ICONS = [Newspaper, Building2, ShieldAlert];
const GLASSES = ["glass-violet", "glass-pink", "glass-gold"];

export default function WorkSection() {
  const { data: dbProjects } = useGetProjects();
  const raw = dbProjects === undefined ? fallbackProjects : dbProjects;
  
  const displayProjects = raw.map((p: any, i: number) => ({
    ...p,
    color: p.color ?? COLORS[i % COLORS.length],
    icon: p.icon ?? ICONS[i % ICONS.length],
    glassClass: p.glassClass ?? GLASSES[i % GLASSES.length],
    size: p.size ?? (i === 0 ? "large" : i === 1 ? "small" : "full"),
    type: p.type ?? "Project",
  }));

  return (
    <section id="work" className="relative py-32 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-[-10%] w-[50vw] h-[50vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(219,39,119,0.2) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-[-10%] w-[45vw] h-[45vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.2) 0%, transparent 70%)' }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Label */}
        <motion.div 
          className="flex items-center gap-4 mb-6" 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.7 }}
        >
          <span className="font-mono text-xs tracking-[0.35em] uppercase" style={{ color: '#f9a8d4' }}>03 — Works</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(249,168,212,0.4), transparent)' }} />
          <span className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.25)' }}>Selected Projects</span>
        </motion.div>

        {/* Heading */}
        <motion.div 
          className="mb-16" 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }} 
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-display uppercase leading-none" style={{ fontSize: 'clamp(3.5rem, 7vw, 6.5rem)' }}>
            <span className="block text-white">Selected</span>
            <span className="block animate-pulse-glow" style={{ background: 'linear-gradient(90deg, #f9a8d4, #c4b5fd)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
              Works
            </span>
          </h2>
        </motion.div>

        {/* ── ASYMMETRIC PROJECTS GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {displayProjects.map((project: any, idx: number) => {
            const ProjectIcon = project.icon;
            
            // Grid spanning behavior based on 'size'
            let gridSpanClass = "lg:col-span-1";
            if (project.size === "large") gridSpanClass = "lg:col-span-2";
            if (project.size === "full") gridSpanClass = "lg:col-span-3";

            return (
              <motion.div
                key={project.title}
                className={`${gridSpanClass} ${project.glassClass} rounded-3xl overflow-hidden border border-white/10 flex flex-col justify-between group transition-all duration-500 hover:scale-[1.01]`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                style={{
                  boxShadow: `0 20px 50px ${project.color}08`,
                }}
              >
                {/* Top/Inner Content */}
                <div className="relative">
                  
                  {/* Image container with glass overlay */}
                  <div className="relative overflow-hidden aspect-[16/9] w-full border-b border-white/10">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      style={{ filter: 'brightness(0.85)' }}
                    />
                    
                    {/* Badge top left */}
                    <div className="absolute top-4 left-4 z-20 flex gap-2">
                      <span className="font-mono text-[9px] tracking-wider bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-white/80 border border-white/10">
                        {project.year}
                      </span>
                      <span 
                        className="font-mono text-[9px] tracking-wider px-3 py-1 rounded-full border"
                        style={{ background: project.color + '20', borderColor: project.color + '40', color: project.color }}
                      >
                        {project.type}
                      </span>
                    </div>
                  </div>

                  {/* Body text area */}
                  <div className="p-8 space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" 
                        style={{ background: project.color + '15', border: `1px solid ${project.color}30`, color: project.color }}>
                        <ProjectIcon size={18} />
                      </div>
                      <div>
                        <h3 className="font-display uppercase text-2xl tracking-wide text-white">
                          {project.title}
                        </h3>
                        <p className="font-mono text-[10px] tracking-widest uppercase text-white/40">
                          {project.category}
                        </p>
                      </div>
                    </div>

                    <p className="font-sans text-sm font-light leading-relaxed text-white/60">
                      {project.description}
                    </p>
                  </div>

                </div>

                {/* Bottom action bar */}
                <div className="p-8 pt-0 mt-auto">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 font-sans font-semibold text-xs uppercase tracking-widest py-3 px-6 rounded-full w-full transition-all duration-300 hover-target"
                      style={{
                        background: project.color + '18',
                        border: `1px solid ${project.color}45`,
                        color: project.color,
                      }}
                      onMouseEnter={e => {
                        (e.currentTarget as HTMLElement).style.background = project.color;
                        (e.currentTarget as HTMLElement).style.color = '#0f0c24';
                        (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
                      }}
                      onMouseLeave={e => {
                        (e.currentTarget as HTMLElement).style.background = project.color + '18';
                        (e.currentTarget as HTMLElement).style.color = project.color;
                        (e.currentTarget as HTMLElement).style.borderColor = project.color + '45';
                      }}
                    >
                      View Case Study <ArrowUpRight size={14} />
                    </a>
                  ) : (
                    <span className="inline-flex items-center justify-center gap-2 font-sans text-xs uppercase tracking-widest py-3 px-6 rounded-full border border-white/10 text-white/30 cursor-not-allowed select-none w-full bg-white/2">
                      View Case Study <ExternalLink size={14} />
                    </span>
                  )}
                </div>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
