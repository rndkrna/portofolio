import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: "Programming & Web",
    skills: ["PHP", "JavaScript", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS"]
  },
  {
    title: "Backend & Systems",
    skills: ["Laravel", "Docker", "MySQL", "PostgreSQL", "Git / GitHub", "Linux Command-Line"]
  },
  {
    title: "Leadership & Methods",
    skills: ["Team Leadership", "Analytical Thinking", "Negotiation", "Public Communication", "Research Methodology", "UML Modeling"]
  }
];

export default function SkillsSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as const,
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.4 } 
    }
  };

  return (
    <section id="skills" className="py-32 bg-card/10 border-y border-border/40 relative overflow-hidden">
      {/* Decorative blurred background aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[30vw] rounded-full bg-primary/5 blur-[120px] pointer-events-none z-0" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div 
          className="mb-24 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary tracking-[0.3em] uppercase text-xs mb-3 font-semibold">Expertise</p>
          <h2 className="text-4xl md:text-5xl font-display uppercase tracking-wider text-foreground">Capabilities</h2>
          <div className="w-16 h-px bg-primary/70 mx-auto mt-6"></div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={category.title}
              variants={cardVariants}
              className="flex flex-col bg-card/25 backdrop-blur-sm border border-border/50 hover:border-primary/40 p-8 rounded-md transition-all duration-500 hover:shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-primary/5 group"
              whileHover={{ y: -6 }}
            >
              <h3 className="text-lg font-display uppercase tracking-widest text-foreground mb-8 border-b border-border/60 pb-4 w-full text-center md:text-left group-hover:text-primary transition-colors duration-300">
                {category.title}
              </h3>
              <ul className="space-y-4 text-center md:text-left w-full flex-grow">
                {category.skills.map((skill, sIdx) => (
                  <motion.li 
                    key={skill}
                    variants={itemVariants}
                    className="text-muted-foreground tracking-wide font-light hover:text-foreground transition-colors cursor-default hover-target flex items-center justify-center md:justify-start gap-3 group/item py-1"
                    whileHover={{ x: 8 }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-border group-hover/item:bg-primary transition-colors duration-300" />
                    <span>{skill}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
