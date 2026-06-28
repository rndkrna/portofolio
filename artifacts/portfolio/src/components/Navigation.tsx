import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const links = [
  { name: 'About', href: '#about', color: 'hover:text-[hsl(271,91%,75%)]' },
  { name: 'Skills', href: '#skills', color: 'hover:text-[hsl(43,96%,65%)]' },
  { name: 'Work', href: '#work', color: 'hover:text-[hsl(327,81%,70%)]' },
  { name: 'Experience', href: '#experience', color: 'hover:text-[hsl(188,92%,60%)]' },
  { name: 'Contact', href: '#contact', color: 'hover:text-[hsl(84,81%,55%)]' },
];

const mobileColors = [
  'text-[hsl(271,91%,75%)]',
  'text-[hsl(43,96%,65%)]',
  'text-[hsl(327,81%,70%)]',
  'text-[hsl(188,92%,60%)]',
  'text-[hsl(84,81%,55%)]',
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
          scrolled
            ? 'bg-[hsl(270,50%,5%)/95] backdrop-blur-xl border-b-4 border-[hsl(271,91%,65%)] py-3'
            : 'bg-transparent py-5'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
          {/* Logo — maximalist badge style */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
            className="relative group hover-target"
          >
            <div className="flex items-center gap-2">
              {/* Color accent square */}
              <div className="w-3 h-8 bg-gradient-to-b from-[hsl(271,91%,65%)] to-[hsl(327,81%,62%)] flex-shrink-0" />
              <span className="text-lg font-display tracking-widest uppercase text-foreground group-hover:text-[hsl(271,91%,75%)] transition-colors duration-300 leading-none">
                Renda<br />
                <span className="text-[hsl(43,96%,56%)]">Kurnia</span>
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-1">
            {links.map((link, i) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                  className={`relative text-sm font-sans font-semibold tracking-widest uppercase text-foreground/70 ${link.color} transition-all duration-200 hover-target px-4 py-2 block group`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {/* Bold underline on hover */}
                  <span className="absolute bottom-0 left-4 right-4 h-[3px] bg-current scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </a>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); scrollTo('#contact'); }}
            className="hidden md:flex items-center gap-2 bg-[hsl(271,91%,65%)] hover:bg-[hsl(271,91%,72%)] text-[hsl(270,50%,5%)] font-sans font-bold uppercase tracking-widest text-xs py-2.5 px-5 transition-all duration-200 hover-target"
          >
            Hire Me
          </a>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-foreground hover-target p-2 border-2 border-[hsl(271,91%,65%)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu — full screen maximalist */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col justify-center items-center overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, hsl(270 50% 5%) 0%, hsl(290 60% 8%) 50%, hsl(270 50% 5%) 100%)',
            }}
            initial={{ opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
            animate={{ opacity: 1, clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
            exit={{ opacity: 0, clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          >
            {/* Decorative big number backdrop */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <span
                className="text-[40vw] font-display leading-none select-none"
                style={{
                  WebkitTextStroke: '2px hsl(271 91% 65% / 0.08)',
                  color: 'transparent',
                }}
              >
                MENU
              </span>
            </div>

            {/* Dot pattern */}
            <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

            {/* Close button */}
            <button
              className="absolute top-6 right-6 text-foreground p-2 border-2 border-[hsl(271,91%,65%)] hover:bg-[hsl(271,91%,65%)] hover:text-[hsl(270,50%,5%)] transition-all"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={24} />
            </button>

            <ul className="flex flex-col gap-2 text-center relative z-10">
              {links.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 60 }}
                  transition={{ delay: i * 0.07 + 0.1, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className={`text-6xl font-display uppercase tracking-widest block px-8 py-2 text-stroke-1 text-foreground/30 hover:text-foreground hover:no-underline transition-all duration-200 ${mobileColors[i]}`}
                    style={{ WebkitTextStroke: '0px' }}
                  >
                    <span className={`${mobileColors[i]} font-display text-6xl block hover:tracking-normal transition-all`}>
                      {link.name}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            {/* Bottom social row */}
            <motion.div
              className="absolute bottom-8 left-0 right-0 flex justify-center gap-6 text-xs font-sans tracking-widest uppercase text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span>GitHub</span>
              <span className="text-[hsl(271,91%,65%)]">·</span>
              <span>LinkedIn</span>
              <span className="text-[hsl(327,81%,62%)]">·</span>
              <span>Website</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
