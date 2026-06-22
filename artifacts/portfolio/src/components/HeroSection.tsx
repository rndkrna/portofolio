import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

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
  avatar: "/images/profile-avatar.png"
};

export default function HeroSection() {
  const [profile, setProfile] = useState<ProfileData>(fallbackProfile);

  useEffect(() => {
    fetch("/api/profile")
      .then(res => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then(data => setProfile(data))
      .catch(() => {});
  }, []);

  const containerRef = useRef<HTMLElement>(null);
  
  // Hook scroll progress relative to this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax transformations for background image
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const scaleBg = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacityBg = useTransform(scrollYProgress, [0, 1], [0.4, 0.15]);
  
  // Parallax for text content
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  // Words for heading reveal
  const line1 = "Crafting".split(" ");
  const line2 = "Secure Web Systems".split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      }
    }
  };

  const wordVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <section 
      ref={containerRef}
      id="hero" 
      className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0 mix-blend-luminosity"
        style={{ y: yBg, scale: scaleBg, opacity: opacityBg }}
      >
        <img 
          src="/images/hero-bg.png" 
          alt="Cinematic abstract texture" 
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background"></div>
      </motion.div>

      {/* Floating Ambient Auras (Premium visual depth) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div 
          className="absolute -top-[20%] -left-[10%] w-[50vw] h-[50vw] rounded-full bg-primary/10 blur-[150px]"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-[40%] right-[-10%] w-[45vw] h-[45vw] rounded-full bg-accent/5 blur-[120px]"
          animate={{
            x: [0, -60, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 z-10 relative">
        <motion.div 
          style={{ y: yText }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Subtitle */}
          <div className="overflow-hidden mb-6">
            <motion.p 
              className="text-primary tracking-[0.35em] uppercase text-xs md:text-sm font-medium"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {profile.role}
            </motion.p>
          </div>

          {/* Heading with Mask Reveal */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display uppercase tracking-tight leading-[0.9] mb-8 select-none">
            <span className="block overflow-hidden py-1">
              {line1.map((word, i) => (
                <motion.span 
                  key={i} 
                  className="inline-block"
                  variants={wordVariants}
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </span>
            <span className="block overflow-hidden py-1 text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
              {line2.map((word, i) => (
                <motion.span 
                  key={i} 
                  className="inline-block"
                  variants={wordVariants}
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </span>
          </h1>

          {/* Intro Description */}
          <motion.div
            className="max-w-xl"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 1, ease: "easeOut" } }
            }}
          >
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
              {profile.bio}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Discover Button */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 hover-target cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        onClick={() => {
          document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground hover:text-primary transition-colors">Discover</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown className="text-primary/70" size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
