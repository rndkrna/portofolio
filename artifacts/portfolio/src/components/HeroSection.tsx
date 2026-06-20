import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[100dvh] flex items-center justify-center pt-20 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity">
        <img 
          src="/images/hero-bg.png" 
          alt="Cinematic abstract texture" 
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background"></div>
      </div>

      <div className="container mx-auto px-6 md:px-12 z-10 relative">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-primary tracking-[0.3em] uppercase text-sm mb-6 font-medium">
              Creative Director & Technologist
            </p>
          </motion.div>

          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-display uppercase tracking-tight leading-[0.9] mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            Crafting <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">
              Digital Poetry
            </span>
          </motion.h1>

          <motion.div
            className="max-w-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          >
            <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed">
              I build immersive digital experiences that blur the line between utility and art. Every pixel considered. Every interaction earned.
            </p>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 hover-target"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
      >
        <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground">Discover</span>
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
