import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Database, Users, ChevronRight, Award } from "lucide-react";

const skillCategories = [
  {
    id: "programming",
    title: "Programming & Web",
    emoji: "⌨️",
    icon: Terminal,
    color: "#c4b5fd",
    glassClass: "glass-violet",
    desc: "Building highly interactive frontend interfaces and responsive architectures.",
    skills: ["PHP", "JavaScript", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS"],
  },
  {
    id: "backend",
    title: "Backend & Systems",
    emoji: "⚙️",
    icon: Database,
    color: "#f9a8d4",
    glassClass: "glass-pink",
    desc: "Designing secure relational databases, server APIs, and deployment pipelines.",
    skills: [
      "Laravel",
      "Docker",
      "MySQL",
      "PostgreSQL",
      "Git / GitHub",
      "Linux CLI",
    ],
  },
  {
    id: "leadership",
    title: "Leadership & Methods",
    emoji: "🎯",
    icon: Users,
    color: "#fde68a",
    glassClass: "glass-gold",
    desc: "Leading organizational divisions, research groups, and client negotiations.",
    skills: [
      "Team Leadership",
      "Analytical Thinking",
      "Negotiation",
      "Public Speaking",
      "Research Methodology",
      "UML Modeling",
    ],
  },
];

const allSkills = skillCategories.flatMap((c) =>
  c.skills.map((s) => ({ skill: s, color: c.color })),
);

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState(skillCategories[0].id);

  const activeCategory = skillCategories.find((c) => c.id === activeTab)!;

  return (
    <section id="skills" className="relative py-32 overflow-hidden">
      {/* Local Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[10%] left-[20%] w-[55vw] h-[55vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.4) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[10%] right-[-10%] w-[50vw] h-[50vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(236,72,153,0.3) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span
            className="font-mono text-xs tracking-[0.35em] uppercase"
            style={{ color: "#fde68a" }}
          >
            02 — Capabilities
          </span>
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(251,191,36,0.4), transparent)",
            }}
          />
        </motion.div>

        {/* Heading + Subtitle */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-16">
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2
              className="font-display uppercase leading-none"
              style={{ fontSize: "clamp(2rem, 7vw, 6.5rem)" }}
            >
              <span className="block text-white">Technical & Leadership</span>
              <span
                className="block"
                style={{
                  background: "linear-gradient(90deg, #fde68a, #fb923c)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                Expertise
              </span>
            </h2>
          </motion.div>
          <motion.div
            className="lg:col-span-4 lg:text-right"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-sm font-light text-white/50 leading-relaxed">
              Sebuah sinergi dari full-stack development, cryptographic system
              research, dan organisasi tim.
            </p>
          </motion.div>
        </div>

        {/* Dynamic Bento Tab Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-20">
          {/* Left Column: Tab Selectors (Takes 5/12) */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            {skillCategories.map((cat, idx) => {
              const Icon = cat.icon;
              const isActive = cat.id === activeTab;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`w-full text-left p-6 rounded-2xl transition-all duration-300 flex items-center justify-between border hover-target ${
                    isActive
                      ? "bg-white/10 border-white/20 shadow-lg translate-x-2"
                      : "bg-white/5 border-white/5 opacity-60 hover:opacity-100 hover:bg-white/8"
                  }`}
                  style={{
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-transform group-hover:scale-105"
                      style={{
                        background: isActive
                          ? cat.color + "25"
                          : "rgba(255,255,255,0.05)",
                        border: `1px solid ${isActive ? cat.color + "50" : "rgba(255,255,255,0.1)"}`,
                        color: cat.color,
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <span className="font-mono text-[10px] text-white/40 block mb-0.5">
                        DOMAIN 0{idx + 1}
                      </span>
                      <h3 className="font-display uppercase text-lg tracking-wider text-white">
                        {cat.title}
                      </h3>
                    </div>
                  </div>
                  <ChevronRight
                    size={18}
                    className={`transition-transform duration-300 text-white/30 ${isActive ? "rotate-90 text-white" : ""}`}
                  />
                </button>
              );
            })}
          </div>

          {/* Right Column: Display Panel (Takes 7/12) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className={`${activeCategory.glassClass} p-8 rounded-3xl relative overflow-hidden border border-white/10`}
                style={{
                  minHeight: "340px",
                  boxShadow: `0 24px 60px ${activeCategory.color}15`,
                }}
              >
                {/* Big decorative symbol/background element */}
                <div
                  className="absolute -bottom-8 -right-6 font-display text-[12rem] leading-none select-none pointer-events-none opacity-[0.06]"
                  style={{ color: activeCategory.color }}
                >
                  {activeCategory.emoji}
                </div>

                <div className="relative z-10 space-y-6">
                  {/* Category Description */}
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
                      DOMAIN HIGHLIGHT
                    </span>
                    <h4 className="font-display text-3xl text-white uppercase tracking-wide">
                      {activeCategory.title}
                    </h4>
                    <p className="font-sans text-sm font-light leading-relaxed text-white/60 max-w-md">
                      {activeCategory.desc}
                    </p>
                  </div>

                  <div className="w-full h-px bg-white/10" />

                  {/* Skills Grid */}
                  <div className="space-y-3">
                    <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase block mb-1">
                      CORE COMPETENCIES
                    </span>
                    <div className="flex flex-wrap gap-2.5">
                      {activeCategory.skills.map((skill, sIdx) => (
                        <motion.span
                          key={skill}
                          className="inline-block font-sans font-semibold text-xs uppercase tracking-wider px-4 py-2 rounded-full border cursor-default transition-all duration-200"
                          style={{
                            background: activeCategory.color + "12",
                            border: `1px solid ${activeCategory.color}35`,
                            color: activeCategory.color,
                          }}
                          whileHover={{
                            background: activeCategory.color,
                            color: "#1e0030",
                            scale: 1.05,
                            boxShadow: `0 8px 20px ${activeCategory.color}35`,
                          }}
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Corner light source */}
                <div
                  className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full pointer-events-none"
                  style={{
                    background: activeCategory.color + "15",
                    filter: "blur(30px)",
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Skills Marquee Container */}
        <div className="glass overflow-hidden rounded-2xl border border-white/10">
          <div className="overflow-hidden py-3.5 border-b border-white/5">
            <div className="flex whitespace-nowrap animate-marquee">
              {[...allSkills, ...allSkills].map((item, i) => (
                <span
                  key={i}
                  className="flex-shrink-0 font-display text-lg tracking-widest uppercase px-6"
                  style={{ color: item.color, opacity: 0.75 }}
                >
                  {item.skill}
                  <span className="mx-3 opacity-30">·</span>
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden py-3.5">
            <div className="flex whitespace-nowrap animate-marquee-reverse">
              {[...allSkills, ...allSkills].reverse().map((item, i) => (
                <span
                  key={i}
                  className="flex-shrink-0 font-sans font-bold text-sm tracking-widest uppercase px-6"
                  style={{ color: item.color, opacity: 0.45 }}
                >
                  {item.skill}
                  <span className="mx-3 opacity-25">◆</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
