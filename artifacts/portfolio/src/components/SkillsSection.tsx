import { motion } from 'framer-motion';

const skillCategories = [
  {
    title: "Programming & Web",
    emoji: "⌨️",
    color: "#a855f7",
    borderAlpha: "rgba(168,85,247,0.4)",
    bgAlpha: "rgba(168,85,247,0.06)",
    skills: ["PHP", "JavaScript", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS"]
  },
  {
    title: "Backend & Systems",
    emoji: "⚙️",
    color: "#f43f8a",
    borderAlpha: "rgba(244,63,138,0.4)",
    bgAlpha: "rgba(244,63,138,0.06)",
    skills: ["Laravel", "Docker", "MySQL", "PostgreSQL", "Git / GitHub", "Linux CLI"]
  },
  {
    title: "Leadership & Methods",
    emoji: "🎯",
    color: "#f0a500",
    borderAlpha: "rgba(240,165,0,0.4)",
    bgAlpha: "rgba(240,165,0,0.06)",
    skills: ["Team Leadership", "Analytical Thinking", "Negotiation", "Public Speaking", "Research Methodology", "UML Modeling"]
  }
];

const allSkills = skillCategories.flatMap(c => c.skills.map(s => ({ skill: s, color: c.color })));

export default function SkillsSection() {
  return (
    <section id="skills" className="relative overflow-hidden">

      {/* ── Header ─────────────────────────────────────── */}
      <div
        className="relative py-20 overflow-hidden border-y-4"
        style={{ borderColor: "#f0a500", background: "linear-gradient(135deg, hsl(42 45% 9%) 0%, hsl(230 18% 8%) 100%)" }}
      >
        <div className="dot-pattern-sm absolute inset-0 opacity-50" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

            <div className="flex items-start gap-5">
              <span
                className="font-display leading-none"
                style={{
                  fontSize: "clamp(7rem, 18vw, 14rem)",
                  WebkitTextStroke: "2px rgba(240,165,0,0.25)",
                  color: "transparent",
                }}
              >
                02
              </span>
              <div className="pt-4 md:pt-8">
                <p className="font-mono text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "#f0a500" }}>
                  What I Know
                </p>
                <h2
                  className="font-display uppercase leading-none"
                  style={{ fontSize: "clamp(3.5rem, 8vw, 7.5rem)" }}
                >
                  <span
                    className="block"
                    style={{ WebkitTextStroke: "2px #f0a500", color: "transparent" }}
                  >
                    Capa-
                  </span>
                  <span className="block" style={{ color: "#f0a500" }}>bilities</span>
                </h2>
              </div>
            </div>

            <motion.div
              className="hidden md:block border-2 p-4 text-right"
              style={{ borderColor: "rgba(240,165,0,0.35)" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="font-mono text-xs tracking-widest uppercase" style={{ color: "hsl(220 15% 35%)" }}>Expertise</p>
              <p className="font-display text-2xl mt-1" style={{ color: "#f0a500" }}>3 Domains</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Cards ──────────────────────────────────────── */}
      <div className="py-20" style={{ background: "hsl(230 18% 8%)" }}>
        <div className="container mx-auto px-6 md:px-12">
          <div
            className="grid grid-cols-1 md:grid-cols-3 border-2"
            style={{ borderColor: "rgba(168,85,247,0.18)" }}
          >
            {skillCategories.map((cat, idx) => (
              <motion.div
                key={cat.title}
                className={`p-8 relative overflow-hidden group/card transition-all duration-500 ${idx < 2 ? "md:border-r-2" : ""}`}
                style={{ borderColor: "rgba(168,85,247,0.15)" }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.7, delay: idx * 0.15 }}
              >
                {/* Hover bg */}
                <div
                  className="absolute inset-0 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: cat.bgAlpha }}
                />
                {/* Top accent bar */}
                <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: cat.color }} />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-6 pb-5 border-b-2" style={{ borderColor: cat.borderAlpha }}>
                    <div
                      className="w-10 h-10 flex items-center justify-center text-xl border-2"
                      style={{ borderColor: cat.color + "60", background: cat.bgAlpha }}
                    >
                      {cat.emoji}
                    </div>
                    <h3 className="font-display uppercase text-xl tracking-wider" style={{ color: cat.color }}>
                      {cat.title}
                    </h3>
                  </div>

                  {/* Skill tags */}
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, sIdx) => (
                      <motion.span
                        key={skill}
                        className="inline-block font-sans font-semibold text-xs uppercase tracking-wider px-3 py-1.5 border-2 cursor-default transition-all duration-200"
                        style={{ borderColor: cat.borderAlpha, color: cat.color }}
                        initial={{ opacity: 0, scale: 0.85 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 + sIdx * 0.05 }}
                        whileHover={{ background: cat.color, color: "hsl(230 18% 8%)", scale: 1.04 }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Giant number backdrop */}
                <div
                  className="absolute -bottom-4 -right-2 font-display text-[7rem] leading-none select-none pointer-events-none opacity-[0.04]"
                  style={{ color: cat.color }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Dual marquee ───────────────────────────────── */}
      <div
        className="border-t-4 overflow-hidden"
        style={{ borderColor: "#f43f8a", background: "hsl(322 20% 6%)" }}
      >
        {/* Row 1 */}
        <div className="flex whitespace-nowrap py-3 border-b border-[rgba(244,63,138,0.18)] animate-marquee">
          {[...allSkills, ...allSkills].map((item, i) => (
            <span key={i} className="flex-shrink-0 font-display text-lg tracking-widest uppercase px-6" style={{ color: item.color, opacity: 0.7 }}>
              {item.skill}<span className="mx-3 opacity-30" style={{ color: "#f43f8a" }}>·</span>
            </span>
          ))}
        </div>
        {/* Row 2 reverse */}
        <div className="flex whitespace-nowrap py-3 animate-marquee-reverse">
          {[...allSkills, ...allSkills].reverse().map((item, i) => (
            <span key={i} className="flex-shrink-0 font-sans font-bold text-sm tracking-widest uppercase px-6" style={{ color: item.color, opacity: 0.45 }}>
              {item.skill}<span className="mx-3 opacity-25" style={{ color: "#a855f7" }}>◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
