import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ProfileData {
  aboutParagraph1: string;
  aboutParagraph2: string;
  quote: string;
}

const fallbackProfile: ProfileData = {
  aboutParagraph1:
    "Mahasiswa Teknik Informatika yang memadukan keahlian teknis pengembangan perangkat lunak dengan pengalaman kepemimpinan strategis yang solid. Berpengalaman memimpin tim penelitian dan divisi organisasi, serta sukses mengeksekusi proyek web komersial dari tahap negosiasi klien hingga deployment.",
  aboutParagraph2:
    "Saat ini saya menempuh studi S1 Teknik Informatika di Universitas Maritim Raja Ali Haji (UMRAH) di Tanjung Pinang, Kepulauan Riau. Sebelumnya, saya menempuh pendidikan di SMA Negeri 1 Singkil Utara di jurusan Ilmu Pengetahuan Sosial (IPS). Latar belakang ini membentuk cara pandang saya yang holistik dalam merumuskan solusi teknologi.",
  quote:
    "Memadukan keahlian teknis pengembangan perangkat lunak dengan pengalaman kepemimpinan strategis yang solid.",
};

export default function AboutSection() {
  const [profile, setProfile] = useState<ProfileData>(fallbackProfile);

  useEffect(() => {
    fetch("/api/profile", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setProfile(d))
      .catch(() => {});
  }, []);

  return (
    <section id="about" className="relative overflow-hidden">

      {/* ── Header block ───────────────────────────────────── */}
      <div
        className="relative py-20 overflow-hidden border-b-4"
        style={{ borderColor: "#a855f7", background: "linear-gradient(135deg, hsl(262 40% 12%) 0%, hsl(230 18% 8%) 100%)" }}
      >
        <div className="dot-pattern absolute inset-0 opacity-50" />

        {/* Top-right accent */}
        <div
          className="absolute top-0 right-0 w-32 h-32 pointer-events-none"
          style={{ background: "linear-gradient(225deg, rgba(168,85,247,0.25) 0%, transparent 70%)" }}
        />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">

            {/* Left: giant number + title */}
            <div className="flex items-start gap-5">
              <span
                className="font-display leading-none"
                style={{
                  fontSize: "clamp(7rem, 18vw, 14rem)",
                  WebkitTextStroke: "2px rgba(168,85,247,0.28)",
                  color: "transparent",
                }}
              >
                01
              </span>
              <div className="pt-4 md:pt-8">
                <p className="font-mono text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "#a855f7" }}>
                  Chapter One
                </p>
                <h2
                  className="font-display uppercase leading-none"
                  style={{ fontSize: "clamp(3.5rem, 8vw, 7.5rem)" }}
                >
                  <span className="block text-white">The</span>
                  <span
                    className="block"
                    style={{
                      background: "linear-gradient(90deg, #a855f7, #f43f8a)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Narrative
                  </span>
                </h2>
              </div>
            </div>

            {/* Right: colored squares */}
            <motion.div
              className="hidden md:flex flex-col items-end gap-2"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex gap-2">
                <div className="w-5 h-5" style={{ background: "#a855f7" }} />
                <div className="w-5 h-5" style={{ background: "#f43f8a" }} />
                <div className="w-5 h-5" style={{ background: "#f0a500" }} />
                <div className="w-5 h-5 border-2" style={{ borderColor: "#a855f7" }} />
              </div>
              <p className="font-mono text-xs" style={{ color: "hsl(220 15% 35%)" }}>UMRAH · 2022 — Now</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────── */}
      <div className="py-24 relative" style={{ background: "hsl(230 18% 8%)" }}>
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

            {/* Text */}
            <div className="lg:col-span-7 space-y-8">
              <motion.p
                className="font-sans text-lg md:text-xl font-light leading-relaxed"
                style={{ color: "hsl(220 15% 65%)" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
              >
                <span
                  className="font-display text-7xl float-left mr-3 mt-0 leading-none"
                  style={{ color: "#a855f7" }}
                >
                  {profile.aboutParagraph1[0]}
                </span>
                {profile.aboutParagraph1.slice(1)}
              </motion.p>

              <motion.p
                className="font-sans text-lg md:text-xl font-light leading-relaxed"
                style={{ color: "hsl(220 15% 65%)" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                {profile.aboutParagraph2}
              </motion.p>
            </div>

            {/* Quote + stats */}
            <div className="lg:col-span-5">
              <motion.div
                className="sticky top-32"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8 }}
              >
                {/* Quote card */}
                <div className="relative p-8 border-2 overflow-hidden hover-glow-pink transition-all duration-300" style={{ borderColor: "rgba(244,63,138,0.4)" }}>
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: "linear-gradient(135deg, rgba(244,63,138,0.06) 0%, transparent 65%)" }}
                  />
                  {/* Huge quote mark */}
                  <div
                    className="font-display text-[9rem] leading-none absolute -top-3 -left-1 select-none pointer-events-none"
                    style={{ color: "#f43f8a", opacity: 0.18 }}
                  >
                    "
                  </div>
                  <div className="relative z-10">
                    <p className="font-serif italic text-xl md:text-2xl text-white leading-relaxed mb-5">
                      "{profile.quote}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-[2px]"
                        style={{ background: "linear-gradient(90deg, #f43f8a, #a855f7)" }}
                      />
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: "hsl(220 15% 40%)" }}>
                        Renda Kurnia Manik
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-3 border-2 border-t-0" style={{ borderColor: "rgba(168,85,247,0.25)" }}>
                  {[
                    { num: "3+", label: "Projects", color: "#a855f7" },
                    { num: "5+", label: "Roles",    color: "#f43f8a" },
                    { num: "2+", label: "Years",    color: "#f0a500" },
                  ].map((s, i) => (
                    <div
                      key={s.label}
                      className={`p-5 text-center ${i < 2 ? "border-r-2" : ""}`}
                      style={{ borderColor: "rgba(168,85,247,0.18)" }}
                    >
                      <p className="font-display text-4xl" style={{ color: s.color }}>{s.num}</p>
                      <p className="font-mono text-[10px] tracking-widest uppercase mt-1" style={{ color: "hsl(220 15% 38%)" }}>
                        {s.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Marquee ────────────────────────────────────────── */}
      <div
        className="border-t-2 overflow-hidden py-3"
        style={{ borderColor: "rgba(168,85,247,0.25)", background: "hsl(230 18% 7%)" }}
      >
        <div className="flex whitespace-nowrap animate-marquee-reverse">
          {[
            "Teknik Informatika","◆","UMRAH","◆","Tanjung Pinang","◆",
            "Kepulauan Riau","◆","Web Developer","◆","Security Researcher","◆","Team Leader","◆",
            "Teknik Informatika","◆","UMRAH","◆","Tanjung Pinang","◆",
            "Kepulauan Riau","◆","Web Developer","◆","Security Researcher","◆","Team Leader","◆",
          ].map((item, i) => (
            <span
              key={i}
              className="flex-shrink-0 font-display text-lg tracking-widest uppercase px-5"
              style={{ color: item === "◆" ? "#f43f8a" : "rgba(255,255,255,0.2)" }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
