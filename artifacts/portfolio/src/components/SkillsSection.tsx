import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: "Engineering",
    skills: ["React / Next.js", "WebGL / Three.js", "TypeScript", "Node / Edge Edge", "Creative Coding"]
  },
  {
    title: "Design",
    skills: ["Art Direction", "Interaction Design", "Typography", "Motion Graphics", "3D Visualization"]
  },
  {
    title: "Philosophy",
    skills: ["Radical Subtraction", "Performance First", "Accessible by Default", "Systemic Thinking"]
  }
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-32 bg-card/30 border-y border-border/40 relative">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div 
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-display uppercase tracking-[0.2em] text-primary">Capabilities</h2>
          <div className="w-px h-16 bg-primary/50 mx-auto mt-8"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={category.title}
              className="flex flex-col items-center md:items-start"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
            >
              <h3 className="text-xl font-display uppercase tracking-widest text-foreground mb-8 border-b border-border/50 pb-4 w-full text-center md:text-left">
                {category.title}
              </h3>
              <ul className="space-y-4 text-center md:text-left w-full">
                {category.skills.map((skill, sIdx) => (
                  <motion.li 
                    key={skill}
                    className="text-muted-foreground tracking-wide font-light hover:text-primary transition-colors cursor-default hover-target"
                    whileHover={{ x: 5 }}
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
