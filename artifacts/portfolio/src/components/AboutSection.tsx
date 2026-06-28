import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, FolderCode, GraduationCap, Flame } from "lucide-react";

interface ProfileData {
  aboutParagraph1: string;
  aboutParagraph2: string;
  quote: string;
}

const fallback: ProfileData = {
  aboutParagraph1:
    "Mahasiswa Teknik Informatika yang memadukan keahlian teknis pengembangan perangkat lunak dengan pengalaman kepemimpinan strategis yang solid. Berpengalaman memimpin tim penelitian dan divisi organisasi, serta sukses mengeksekusi proyek web komersial dari tahap negosiasi klien hingga deployment.",
  aboutParagraph2:
    "Saat ini saya menempuh studi S1 Teknik Informatika di Universitas Maritim Raja Ali Haji (UMRAH) di Tanjung Pinang, Kepulauan Riau. Sebelumnya, saya menempuh pendidikan di SMAN 1 Singkil Utara jurusan Ilmu Pengetahuan Sosial (IPS).",
  quote:
    "Memadukan keahlian teknis pengembangan perangkat lunak dengan pengalaman kepemimpinan strategis yang solid.",
};

export default function AboutSection() {
  const [profile, setProfile] = useState<ProfileData>(fallback);

  useEffect(() => {
    fetch("/api/profile", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setProfile(d))
      .catch(() => {});
  }, []);

  const stats = [
    {
      num: "3+",
      label: "Projects",
      icon: FolderCode,
      color: "#c4b5fd",
      desc: "Commercial Web Apps",
    },
    {
      num: "5+",
      label: "Roles",
      icon: Award,
      color: "#f9a8d4",
      desc: "Research & Organization",
    },
    {
      num: "2+",
      label: "Years",
      icon: Flame,
      color: "#fde68a",
      desc: "Active Development",
    },
  ];

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[20%] right-[-10%] w-[55vw] h-[55vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.55) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[20%] left-[-10%] w-[50vw] h-[50vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(219,39,119,0.45) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Label */}
        <motion.div
          className="flex items-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <span
            className="font-mono text-xs tracking-[0.35em] uppercase"
            style={{ color: "#c4b5fd" }}
          >
            01 — About
          </span>
          <div
            className="flex-1 h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(167,139,250,0.4), transparent)",
            }}
          />
        </motion.div>

        {/* ── BENTO GRID LAYOUT ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Main Header Bento (Takes 2 columns on large screens) */}
          <motion.div
            className="lg:col-span-2 glass rounded-3xl p-8 lg:p-10 flex flex-col justify-between border border-white/10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="space-y-6">
              <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
                INTRODUCTION
              </span>
              <h2
                className="font-display uppercase leading-none text-white"
                style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
              >
                The{" "}
                <span
                  style={{
                    background: "linear-gradient(90deg, #c4b5fd, #f9a8d4)",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    color: "transparent",
                  }}
                >
                  Narrative
                </span>
              </h2>
              <p className="font-sans text-lg font-light leading-relaxed text-white/70">
                <span className="font-display text-5xl float-left mr-3 mt-1 text-[#c4b5fd] leading-none">
                  {profile.aboutParagraph1[0]}
                </span>
                {profile.aboutParagraph1.slice(1)}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-white/40 font-mono text-xs">
              <div className="flex items-center gap-2">
                <GraduationCap size={16} className="text-violet-400" />
                <span>UMRAH · S1 Teknik Informatika</span>
              </div>
              <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              <span>Tanjung Pinang, Riau Islands</span>
            </div>
          </motion.div>

          {/* Card 2: Quote Bento (Pink Glass) */}
          <motion.div
            className="glass-pink rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="font-display text-[9rem] leading-none absolute -top-4 -left-2 select-none pointer-events-none text-pink-300 opacity-20">
              "
            </div>
            <div className="relative z-10 space-y-6">
              <span className="font-mono text-[10px] tracking-widest text-pink-200/50 uppercase">
                PHILOSOPHY
              </span>
              <p className="font-serif italic text-xl leading-relaxed text-white">
                "{profile.quote}"
              </p>
            </div>
            <div className="relative z-10 flex items-center gap-3 mt-8">
              <div className="w-6 h-[1.5px] bg-pink-300" />
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-pink-200/60">
                Renda Kurnia Manik
              </span>
            </div>
          </motion.div>

          {/* Card 3: Story Continuation Bento */}
          <motion.div
            className="glass rounded-3xl p-8 border border-white/10 flex flex-col justify-between"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="space-y-4">
              <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase">
                BACKGROUND
              </span>
              <p className="font-sans text-base font-light leading-relaxed text-white/60">
                {profile.aboutParagraph2}
              </p>
            </div>
            <div className="mt-8 font-mono text-[10px] text-white/30 uppercase tracking-widest">
              Securing System Architecture
            </div>
          </motion.div>

          {/* Cards 4, 5, 6: Individual Stat Bento Cards */}
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                className="glass rounded-3xl p-6 border border-white/10 flex items-center gap-5 transition-all duration-300 hover:scale-[1.02]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 + 0.25 }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{
                    background: s.color + "15",
                    border: `1px solid ${s.color}35`,
                    color: s.color,
                  }}
                >
                  <Icon size={24} />
                </div>
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-3xl text-white">
                      {s.num}
                    </span>
                    <span
                      className="font-sans font-bold text-xs uppercase tracking-wider"
                      style={{ color: s.color }}
                    >
                      {s.label}
                    </span>
                  </div>
                  <p className="font-sans text-xs text-white/40 mt-0.5">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Marquee Strip */}
        <div
          className="mt-24 overflow-hidden py-3.5 glass"
          style={{ borderRadius: 0 }}
        >
          <div className="flex whitespace-nowrap animate-marquee-reverse">
            {[
              "Teknik Informatika",
              "◆",
              "UMRAH",
              "◆",
              "Tanjung Pinang",
              "◆",
              "Kepulauan Riau",
              "◆",
              "Web Developer",
              "◆",
              "Security Researcher",
              "◆",
              "Team Leader",
              "◆",
              "Teknik Informatika",
              "◆",
              "UMRAH",
              "◆",
              "Tanjung Pinang",
              "◆",
              "Kepulauan Riau",
              "◆",
              "Web Developer",
              "◆",
              "Security Researcher",
              "◆",
              "Team Leader",
              "◆",
            ].map((item, i) => (
              <span
                key={i}
                className="flex-shrink-0 font-display text-lg tracking-widest uppercase px-5"
                style={{
                  color:
                    item === "◆"
                      ? "rgba(249,168,212,0.6)"
                      : "rgba(255,255,255,0.28)",
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
