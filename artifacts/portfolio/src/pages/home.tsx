import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import WorkSection from '@/components/WorkSection';
import ExperienceSection from '@/components/ExperienceSection';
import ContactSection from '@/components/ContactSection';

export default function Home() {
  return (
    <div className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-primary-foreground relative overflow-hidden">
      {/* Film grain overlay */}
      <div className="pointer-events-none fixed inset-0 z-50 opacity-[0.03] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
      
      <Navigation />
      
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <WorkSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      
      <footer className="py-12 border-t border-border/50 text-center">
        <p className="text-muted-foreground text-sm uppercase tracking-widest font-sans">
          © {new Date().getFullYear()} Elias Thorne. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
