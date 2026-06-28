import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { name: 'About',      href: '#about' },
  { name: 'Skills',     href: '#skills' },
  { name: 'Work',       href: '#work' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact',    href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
          scrolled ? 'py-3' : 'py-5 bg-transparent'
        }`}
        style={scrolled ? {
          background: 'rgba(15,12,36,0.65)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 4px 30px rgba(0,0,0,0.4)',
        } : {}}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo */}
          <a
            href="#hero"
            onClick={e => { e.preventDefault(); scrollTo('#hero'); }}
            className="group hover-target"
          >
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-display tracking-widest"
                style={{
                  background: 'linear-gradient(135deg, rgba(167,139,250,0.35), rgba(244,114,182,0.25))',
                  border: '1px solid rgba(255,255,255,0.18)',
                  backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  color: '#a78bfa',
                }}
              >
                RK
              </div>
              <span className="font-display text-base tracking-widest uppercase text-white/80 group-hover:text-white transition-colors">
                Renda Kurnia
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={e => { e.preventDefault(); scrollTo(link.href); }}
                  className="relative px-4 py-2 text-sm font-sans font-medium tracking-wide text-white/60 hover:text-white transition-colors hover-target group block"
                >
                  {link.name}
                  <span
                    className="absolute bottom-1 left-4 right-4 h-px scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ background: 'linear-gradient(90deg, #a78bfa, #f472b6)' }}
                  />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA button */}
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); scrollTo('#contact'); }}
            className="hidden md:flex items-center gap-2 font-sans font-semibold text-sm tracking-wider px-5 py-2.5 rounded-full transition-all duration-300 hover-target hover-glow-violet"
            style={{
              background: 'linear-gradient(135deg, rgba(167,139,250,0.25), rgba(244,114,182,0.15))',
              border: '1px solid rgba(167,139,250,0.4)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              color: '#a78bfa',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, #a78bfa, #f472b6)';
              (e.currentTarget as HTMLElement).style.color = '#0f0c24';
              (e.currentTarget as HTMLElement).style.borderColor = 'transparent';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, rgba(167,139,250,0.25), rgba(244,114,182,0.15))';
              (e.currentTarget as HTMLElement).style.color = '#a78bfa';
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,139,250,0.4)';
            }}
          >
            Hire Me
          </a>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg hover-target transition-all"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: 'rgba(255,255,255,0.8)',
            }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu — frosted overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col justify-center items-center"
            style={{
              background: 'rgba(10,8,28,0.85)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Orbs inside menu */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full pointer-events-none animate-orb-1"
              style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.25) 0%, transparent 70%)' }} />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full pointer-events-none animate-orb-2"
              style={{ background: 'radial-gradient(circle, rgba(236,72,153,0.2) 0%, transparent 70%)' }} />

            <button
              className="absolute top-6 right-6 p-2.5 rounded-xl hover-target"
              style={{
                background: 'rgba(255,255,255,0.07)',
                border: '1px solid rgba(255,255,255,0.12)',
                color: 'rgba(255,255,255,0.7)',
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={22} />
            </button>

            <ul className="flex flex-col gap-3 text-center relative z-10 w-full max-w-xs px-6">
              {links.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.07 + 0.05 }}
                >
                  <a
                    href={link.href}
                    onClick={e => { e.preventDefault(); scrollTo(link.href); }}
                    className="block w-full py-4 rounded-2xl font-display text-3xl tracking-widest uppercase text-white/70 hover:text-white transition-all duration-200 hover-target"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.background = 'linear-gradient(135deg, rgba(167,139,250,0.18), rgba(244,114,182,0.12))';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(167,139,250,0.35)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)';
                      (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.08)';
                    }}
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
