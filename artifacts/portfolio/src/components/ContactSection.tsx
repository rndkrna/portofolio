import { motion } from 'framer-motion';
import { ArrowRight, Linkedin } from 'lucide-react';
import { SiGithub, SiX } from 'react-icons/si';

export default function ContactSection() {
  return (
    <section id="contact" className="py-32 md:py-48 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.p 
            className="text-primary tracking-widest uppercase text-sm mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Initiate Dialogue
          </motion.p>
          
          <motion.h2 
            className="text-5xl md:text-7xl lg:text-8xl font-display uppercase tracking-tighter mb-12 hover-target cursor-pointer group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <a href="mailto:hello@eliasthorne.com" className="relative inline-block">
              Let's Build
              <span className="block text-muted-foreground italic font-serif lowercase tracking-normal text-4xl md:text-6xl mt-2 group-hover:text-primary transition-colors">
                Something Extraordinary
              </span>
            </a>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 mt-16"
          >
            <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors hover-target uppercase tracking-widest text-sm">
              <SiGithub size={18} /> Github
            </a>
            <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors hover-target uppercase tracking-widest text-sm">
              <Linkedin size={18} /> LinkedIn
            </a>
            <a href="#" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors hover-target uppercase tracking-widest text-sm">
              <SiX size={18} /> Twitter
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
