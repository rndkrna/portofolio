import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, Cpu, ShieldAlert, Terminal, Network } from "lucide-react";

interface ProfileData {
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

const fallbackProfile: ProfileData = {
  name: "Renda Kurnia Manik",
  role: "Software Engineer & Technical Leader",
  bio: "I bridge the gap between business needs and technological solutions, building robust, secure web applications and driving collaborative research.",
  avatar: "/images/profile-avatar.png",
};

const marqueeItems = [
  "Software Engineer",
  "✦",
  "Web Security",
  "✦",
  "Laravel",
  "✦",
  "Technical Leader",
  "✦",
  "Fullstack Dev",
  "✦",
  "Cryptography",
  "✦",
  "React",
  "✦",
  "Docker",
  "✦",
];

export default function HeroSection() {
  const [profile, setProfile] = useState<ProfileData>(fallbackProfile);

  useEffect(() => {
    fetch("/api/profile", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setProfile(d))
      .catch(() => {});
  }, []);

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const yContent = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative min-h-[100dvh] flex flex-col justify-between overflow-hidden"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-[25%] -left-[15%] w-[70vw] h-[70vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(124,58,237,0.65) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute top-[25%] right-[-20%] w-[60vw] h-[60vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(219,39,119,0.55) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[-10%] left-[20%] w-[45vw] h-[45vw] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.35) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <img
          src="/images/hero-bg.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Main Content Area */}
      <motion.div
        className="relative z-10 flex-1 flex items-center pt-32 pb-20"
        style={{ opacity: fade, y: yContent }}
      >
        <div className="container mx-auto px-6 md:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Heading + Bio + CTAs */}
            <div className="lg:col-span-7 flex flex-col items-start space-y-8">
              {/* Role badge */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-[11px] tracking-[0.28em] uppercase glass-violet"
                  style={{ color: "#c4b5fd" }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                  {profile.role}
                </span>
              </motion.div>

              {/* Headline */}
              <div className="overflow-hidden">
                <motion.h1
                  className="font-display uppercase leading-none"
                  style={{
                    fontSize: "clamp(2rem, 9.5vw, 11rem)",
                    letterSpacing: "-0.03em",
                  }}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{
                    duration: 1.0,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.2,
                  }}
                >
                  <span className="block text-white">Crafting</span>
                  <span className="block text-stroke-violet">Secure</span>
                  <span
                    className="block"
                    style={{
                      background:
                        "linear-gradient(90deg, #fde68a 0%, #f9a8d4 100%)",
                      WebkitBackgroundClip: "text",
                      backgroundClip: "text",
                      color: "transparent",
                    }}
                  >
                    Web Systems
                  </span>
                </motion.h1>
              </div>

              {/* Bio card */}
              <motion.div
                className="w-full max-w-xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="glass rounded-2xl p-6 border-l-4 border-[#7c3aed]">
                  <p
                    className="font-sans text-base md:text-lg font-light leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.70)" }}
                  >
                    {profile.bio}
                  </p>
                </div>
              </motion.div>

              {/* CTAs */}
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <button
                  onClick={() =>
                    document
                      .querySelector("#work")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="group relative overflow-hidden flex items-center gap-3 font-sans font-bold uppercase tracking-[0.18em] text-xs py-4 px-8 rounded-full transition-all duration-300 hover-target hover-glow-violet"
                  style={{
                    background: "linear-gradient(135deg, #7c3aed, #db2777)",
                    color: "#fff",
                    boxShadow: "0 4px 30px rgba(124,58,237,0.45)",
                  }}
                >
                  <div
                    className="absolute inset-0 rounded-full -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
                    }}
                  />
                  <span className="relative z-10">View My Work</span>
                </button>
                <button
                  onClick={() =>
                    document
                      .querySelector("#contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="flex items-center font-sans font-medium uppercase tracking-[0.18em] text-xs py-4 px-8 rounded-full transition-all duration-300 glass-violet hover:scale-[1.03]"
                  style={{ color: "#c4b5fd" }}
                >
                  Hire Me
                </button>
              </motion.div>
            </div>

            {/* Right Column: Premium Interactive Glass Console / Bento Grid */}
            <motion.div
              className="lg:col-span-5 hidden lg:block"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.4 }}
            >
              <div className="glass rounded-3xl p-6 relative overflow-hidden border border-white/10 shadow-2xl flex flex-col gap-5">
                {/* Console header */}
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <Terminal
                      size={16}
                      className="text-violet-400 animate-pulse"
                    />
                    <span className="font-mono text-xs text-white/50 tracking-wider">
                      SEC_SYSTEMS_CONSOLE // V2.6
                    </span>
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
                  </div>
                </div>

                {/* Grid metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="glass-violet rounded-2xl p-4 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-violet-300">
                      <Cpu size={18} />
                      <span className="font-mono text-[9px] tracking-wider bg-violet-400/20 px-2 py-0.5 rounded-full text-violet-300">
                        ONLINE
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-white/40">
                      SYSTEM LOAD
                    </span>
                    <span className="font-display text-2xl text-white">
                      0.42 TFLOPS
                    </span>
                  </div>

                  <div className="glass-pink rounded-2xl p-4 flex flex-col gap-2">
                    <div className="flex items-center justify-between text-pink-300">
                      <ShieldAlert size={18} />
                      <span className="font-mono text-[9px] tracking-wider bg-pink-400/20 px-2 py-0.5 rounded-full text-pink-300">
                        ACTIVE
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-white/40">
                      CRYPT_ENGINE
                    </span>
                    <span className="font-display text-2xl text-white">
                      AES_GCM_256
                    </span>
                  </div>
                </div>

                {/* Console text log */}
                <div className="glass-strong rounded-2xl p-4 font-mono text-[11px] text-white/60 space-y-2 leading-relaxed">
                  <div className="flex items-center gap-2 text-green-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                    <span>$ initialize_handshake --secure</span>
                  </div>
                  <div className="text-white/40 pl-3">
                    🔑 HKDF key exchange established.
                  </div>
                  <div className="text-white/40 pl-3">
                    🔒 AES-GCM data stream initialized.
                  </div>
                  <div className="flex items-center gap-2 text-violet-400 pt-1">
                    <span>$ status --all</span>
                  </div>
                  <div className="text-white/40 pl-3">
                    🚀 Node latency: 14ms | Servers nominal.
                  </div>
                </div>

                {/* Network visualization block */}
                <div className="glass-gold rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Network size={20} className="text-amber-300" />
                    <div>
                      <div className="font-sans font-bold text-xs text-amber-200">
                        COLLABORATIVE NETWORK
                      </div>
                      <div className="font-mono text-[9px] text-white/40">
                        5 ORGANIZATION DEPLOYMENTS
                      </div>
                    </div>
                  </div>
                  <div className="font-display text-xl text-amber-200">
                    OK // 200
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Marquee Strip */}
      <div
        className="relative z-10 overflow-hidden py-3.5 glass"
        style={{ borderRadius: 0 }}
      >
        <div className="flex whitespace-nowrap animate-marquee">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span
              key={i}
              className="flex-shrink-0 font-display text-xl tracking-widest uppercase px-6"
              style={{
                color: item === "✦" ? "#fde68a" : "rgba(255,255,255,0.45)",
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 z-10 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        onClick={() =>
          document
            .querySelector("#about")
            ?.scrollIntoView({ behavior: "smooth" })
        }
      >
        <span
          className="font-mono text-[10px] tracking-[0.3em] uppercase"
          style={{ color: "rgba(255,255,255,0.35)" }}
        >
          Scroll
        </span>
        <div className="w-px h-10 overflow-hidden relative">
          <motion.div
            className="w-full absolute top-0 h-full"
            style={{
              background: "linear-gradient(180deg, #7c3aed, transparent)",
            }}
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown size={15} color="#7c3aed" />
        </motion.div>
      </motion.div>
    </section>
  );
}
