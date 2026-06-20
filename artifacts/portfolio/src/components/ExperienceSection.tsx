import { motion } from 'framer-motion';

const experiences = [
  {
    role: "Design Director",
    company: "Studio Null",
    period: "2021 — Present",
    description: "Leading a boutique agency focused on immersive web experiences. Directing visual output and technical architecture for high-profile cultural clients."
  },
  {
    role: "Senior Creative Developer",
    company: "Monolith Interactive",
    period: "2018 — 2021",
    description: "Architected real-time 3D web applications and interactive campaigns. Bridged the gap between the design department and engineering teams."
  },
  {
    role: "Digital Designer",
    company: "Vanguard Media",
    period: "2015 — 2018",
    description: "Designed responsive digital products and brand identities. Established the agency's motion design guidelines."
  }
];

export default function ExperienceSection() {
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
          {experiences.map((exp, idx) => (
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
