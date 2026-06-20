import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

const projects = [
  {
    title: "Maison Overture",
    category: "E-Commerce / Art Direction",
    description: "A headless commerce experience for an avant-garde fashion house. Designed to feel like a high-end print editorial rather than a typical storefront.",
    image: "/images/project-1.png",
    year: "2024",
  },
  {
    title: "Obelisk",
    category: "Architecture Portfolio",
    description: "A brutalist digital environment for an award-winning architecture firm. Utilizes WebGL for spatial navigation and real-time lighting simulation.",
    image: "/images/project-2.png",
    year: "2023",
  }
];

export default function WorkSection() {
  return (
    <section id="work" className="py-32 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex justify-between items-end mb-24">
          <motion.h2 
            className="text-5xl md:text-7xl font-display uppercase tracking-tighter"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Selected <br/>
            <span className="text-primary italic font-serif lowercase tracking-normal">Works</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
            className="hidden md:block text-muted-foreground text-sm tracking-[0.2em] uppercase"
          >
            2021 — 2024
          </motion.div>
        </div>

        <div className="space-y-32">
          {projects.map((project, idx) => (
            <ProjectCard key={project.title} project={project} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <div ref={ref} className="group relative w-full flex flex-col md:flex-row gap-8 lg:gap-16 items-center">
      {/* Image Container */}
      <div className={`w-full md:w-3/5 overflow-hidden rounded-sm relative aspect-[4/3] ${index % 2 !== 0 ? 'md:order-2' : ''}`}>
        <motion.div className="w-full h-full" style={{ y }}>
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-[120%] object-cover object-center -mt-[10%] scale-105 group-hover:scale-100 transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
          />
        </motion.div>
        <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors duration-700"></div>
      </div>

      {/* Content Container */}
      <div className={`w-full md:w-2/5 flex flex-col ${index % 2 !== 0 ? 'md:order-1 items-start md:items-end md:text-right' : 'items-start'}`}>
        <motion.p 
          className="text-primary tracking-widest uppercase text-xs mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          {project.category} // {project.year}
        </motion.p>
        
        <motion.h3 
          className="text-4xl md:text-5xl font-display uppercase tracking-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          {project.title}
        </motion.h3>
        
        <motion.p 
          className="text-muted-foreground font-light leading-relaxed mb-10 max-w-md"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {project.description}
        </motion.p>

        <motion.button
          className="flex items-center gap-2 border-b border-border pb-2 text-sm uppercase tracking-widest hover:text-primary hover:border-primary transition-all hover-target"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          View Case Study <ArrowUpRight size={16} />
        </motion.button>
      </div>
    </div>
  );
}
