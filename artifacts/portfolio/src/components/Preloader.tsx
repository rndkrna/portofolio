import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Layers, Award } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [avatar, setAvatar] = useState("/images/profile-avatar.png");

  useEffect(() => {
    fetch("/api/profile")
      .then(res => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then(data => {
        if (data.avatar) {
          setAvatar(data.avatar);
        }
      })
      .catch(() => {});
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      }
    },
    exit: {
      y: "-100%",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] as const }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-background z-[9999] flex items-center justify-center overflow-y-auto overflow-x-hidden py-12 md:py-0"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Premium ambient glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] left-[20%] w-[60vw] h-[60vw] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-[10%] right-[10%] w-[50vw] h-[50vw] rounded-full bg-accent/3 blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Column 1: Portrait Cover Card */}
          <motion.div 
            className="lg:col-span-5 flex justify-center"
            variants={itemVariants}
          >
            <div className="relative group max-w-sm w-full">
              {/* Outer frame border */}
              <div className="absolute inset-0 border border-primary/20 rounded-lg -m-4 pointer-events-none group-hover:scale-[1.02] transition-transform duration-700" />
              
              {/* Image Frame with subtle floating animation */}
              <motion.div 
                className="relative aspect-[4/5] rounded-md overflow-hidden bg-card/40 border border-border/60 shadow-2xl"
                animate={{
                  y: [0, -10, 0]
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <img
                  src={avatar}
                  alt="Renda Kurnia Manik Portrait"
                  className="w-full h-full object-cover grayscale contrast-110 group-hover:scale-105 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] select-none"
                />
                {/* Subtle dark gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
                
                {/* Visual Label */}
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-[10px] tracking-[0.3em] uppercase text-primary mb-1 font-mono">Verified Portfolio</p>
                  <p className="text-sm font-display tracking-widest text-foreground uppercase">Cover Portrait // 2026</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Column 2: Highlights and Enter Button */}
          <div className="lg:col-span-7 flex flex-col justify-center items-start text-left">
            {/* Title / Name */}
            <motion.div variants={itemVariants} className="mb-4">
              <span className="text-primary text-xs tracking-[0.4em] uppercase font-mono block mb-2">Introduction</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-tight leading-none text-foreground">
                Renda Kurnia <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">Manik</span>
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p 
              variants={itemVariants}
              className="text-muted-foreground font-light text-lg md:text-xl max-w-xl mb-10 leading-relaxed"
            >
              Software Engineer & Technical Leader yang memadukan keahlian kriptografi modern dengan rekayasa sistem web terdistribusi.
            </motion.p>

            {/* Spoiler Highlights Grid */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full mb-12 border-y border-border/30 py-8"
            >
              {/* Highlight 1 */}
              <div className="flex flex-col gap-3 group/hl">
                <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center border border-primary/20 group-hover/hl:bg-primary/20 transition-colors">
                  <Shield className="text-primary" size={18} />
                </div>
                <div>
                  <h4 className="text-xs tracking-widest uppercase font-display text-foreground mb-1">Cryptographic Systems</h4>
                  <p className="text-[11px] text-muted-foreground font-light leading-snug">Implementasi AES-256-GCM, HKDF, & proteksi login server.</p>
                </div>
              </div>

              {/* Highlight 2 */}
              <div className="flex flex-col gap-3 group/hl">
                <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center border border-primary/20 group-hover/hl:bg-primary/20 transition-colors">
                  <Layers className="text-primary" size={18} />
                </div>
                <div>
                  <h4 className="text-xs tracking-widest uppercase font-display text-foreground mb-1">Fullstack Dev</h4>
                  <p className="text-[11px] text-muted-foreground font-light leading-snug">Pembuatan media berita Detik1Aceh & web korporat responsif.</p>
                </div>
              </div>

              {/* Highlight 3 */}
              <div className="flex flex-col gap-3 group/hl">
                <div className="w-10 h-10 rounded-sm bg-primary/10 flex items-center justify-center border border-primary/20 group-hover/hl:bg-primary/20 transition-colors">
                  <Award className="text-primary" size={18} />
                </div>
                <div>
                  <h4 className="text-xs tracking-widest uppercase font-display text-foreground mb-1">Leadership Role</h4>
                  <p className="text-[11px] text-muted-foreground font-light leading-snug">Memimpin penelitian beasiswa enkripsi & kajian BEM UMRAH.</p>
                </div>
              </div>
            </motion.div>

            {/* Enter Button */}
            <motion.div variants={itemVariants} className="w-full sm:w-auto">
              <button
                onClick={onComplete}
                className="w-full sm:w-auto flex items-center justify-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground font-sans uppercase tracking-[0.25em] text-xs py-4 px-10 rounded-sm transition-all duration-300 shadow-lg shadow-primary/10 hover:shadow-primary/20 hover-target"
              >
                <span>Enter Portfolio</span>
                <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>

        </div>
      </div>
    </motion.div>
  );
}
