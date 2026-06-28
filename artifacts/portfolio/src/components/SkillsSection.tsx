import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: "Programming & Web",
    emoji: "⌨️",
    color: "hsl(271,91%,65%)",
    bg: "hsl(271,91%,65%/0.08)",
    border: "hsl(271,91%,65%/0.4)",
    skills: ["PHP", "JavaScript", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS"]
  },
  {
    title: "Backend & Systems",
    emoji: "⚙️",
    color: "hsl(327,81%,62%)",
    bg: "hsl(327,81%,62%/0.08)",
    border: "hsl(327,81%,62%/0.4)",
    skills: ["Laravel", "Docker", "MySQL", "PostgreSQL", "Git / GitHub", "Linux CLI"]
  },
  {
    title: "Leadership & Methods",
    emoji: "🎯",
    color: "hsl(43,96%,56%)",
    bg: "hsl(43,96%,56%/0.08)",
    border: "hsl(43,96%,56%/0.4)",
    skills: ["Team Leadership", "Analytical Thinking", "Negotiation", "Public Speaking", "Research Methodology", "UML Modeling"]
  }
];

// All skills flattened for marquee
const allSkills = skillCategories.flatMap(c => c.skills.map(s => ({ skill: s, color: c.color })));

export default function SkillsSection() {
  return (
    <section id="skills" className="relative overflow-hidden">

      {/* === SECTION HEADER === */}
      <div className="relative py-20 border-y-4 overflow-hidden" style={{
        borderColor: 'hsl(43,96%,56%)',
        background: 'linear-gradient(135deg, hsl(43 60% 8%) 0%, hsl(270 50% 5%) 60%)',
      }}>
        <div className="dot-pattern absolute inset-0 opacity-30" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="flex items-start gap-6">
              <span
                className="font-display text-[8rem] md:text-[12rem] leading-none"
                style={{
                  WebkitTextStroke: '2px hsl(43 96% 56% / 0.3)',
                  color: 'transparent',
                }}
              >
                02
              </span>
              <div className="pt-4 md:pt-8">
                <p className="font-mono text-xs tracking-[0.3em] uppercase text-[hsl(43,96%,65%)] mb-2">
                  What I Know
                </p>
                <h2 className="font-display uppercase leading-none">
                  <span
                    className="block text-7xl md:text-9xl"
                    style={{
                      WebkitTextStroke: '2px hsl(43,96%,56%)',
                      color: 'transparent',
                    }}
                  >
                    Capa-
                  </span>
                  <span className="block text-7xl md:text-9xl text-[hsl(43,96%,56%)]">
                    bilities
                  </span>
                </h2>
              </div>
            </div>

            {/* Expertise label */}
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="border-2 border-[hsl(43,96%,56%/0.4)] p-4 text-right">
                <p className="font-mono text-xs tracking-widest uppercase text-foreground/40">Expertise</p>
                <p className="font-display text-2xl text-[hsl(43,96%,56%)] mt-1">3 Domains</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* === CARDS GRID === */}
      <div className="py-20" style={{ background: 'hsl(270 50% 4%)' }}>
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-2" style={{ borderColor: 'hsl(271,91%,65%/0.2)' }}>
            {skillCategories.map((category, idx) => (
              <motion.div
                key={category.title}
                className={`p-8 relative overflow-hidden group/card transition-all duration-500 ${idx < 2 ? 'md:border-r-2' : ''}`}
                style={{ borderColor: 'hsl(271,91%,65%/0.2)' }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
              >
                {/* Hover background */}
                <div
                  className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500"
                  style={{ background: category.bg }}
                />

                {/* Corner accent */}
                <div
                  className="absolute top-0 right-0 w-16 h-1 transition-all duration-300"
                  style={{ background: category.color }}
                />

                <div className="relative z-10">
                  {/* Card Header */}
                  <div className="flex items-center gap-3 mb-6 pb-5 border-b-2" style={{ borderColor: category.border }}>
                    <div
                      className="w-10 h-10 flex items-center justify-center text-xl border-2 flex-shrink-0"
                      style={{ borderColor: category.color, background: category.bg }}
                    >
                      {category.emoji}
                    </div>
                    <h3 className="font-display uppercase text-xl tracking-wider" style={{ color: category.color }}>
                      {category.title}
                    </h3>
                  </div>

                  {/* Skills as pill tags */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, sIdx) => (
                      <motion.span
                        key={skill}
                        className="inline-block font-sans font-medium text-xs uppercase tracking-wider px-3 py-1.5 border-2 transition-all duration-200 cursor-default"
                        style={{
                          borderColor: category.border,
                          color: category.color,
                        }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 + sIdx * 0.06 }}
                        whileHover={{
                          background: category.color,
                          color: 'hsl(270,50%,5%)',
                          scale: 1.05,
                        }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Giant category number backdrop */}
                <div
                  className="absolute -bottom-4 -right-2 font-display text-[8rem] leading-none select-none pointer-events-none opacity-5"
                  style={{ color: category.color }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* === SKILL MARQUEE === */}
      <div className="border-t-4 overflow-hidden" style={{
        borderColor: 'hsl(327,81%,62%)',
        background: 'hsl(327 40% 6%)',
      }}>
        {/* Row 1 */}
        <div className="flex whitespace-nowrap py-3 border-b border-[hsl(327,81%,62%/0.2)] animate-marquee">
          {[...allSkills, ...allSkills].map((item, i) => (
            <span
              key={i}
              className="flex-shrink-0 font-display text-lg tracking-widest uppercase px-6"
              style={{ color: item.color, opacity: 0.7 }}
            >
              {item.skill}
              <span className="mx-3 opacity-30" style={{ color: 'hsl(327,81%,62%)' }}>·</span>
            </span>
          ))}
        </div>
        {/* Row 2 reverse */}
        <div className="flex whitespace-nowrap py-3 animate-marquee-reverse">
          {[...allSkills, ...allSkills].reverse().map((item, i) => (
            <span
              key={i}
              className="flex-shrink-0 font-sans font-bold text-sm tracking-widest uppercase px-6"
              style={{ color: item.color, opacity: 0.5 }}
            >
              {item.skill}
              <span className="mx-3 opacity-20" style={{ color: 'hsl(271,91%,65%)' }}>◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
