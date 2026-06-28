import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Linkedin,
  Globe,
  CheckCircle2,
  AlertCircle,
  Phone,
  MapPin,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useSubmitContactForm } from "@workspace/api-client-react";

const socials = [
  {
    icon: SiGithub,
    label: "GitHub",
    href: "https://github.com/rndkrna",
    color: "hsl(271,91%,65%)",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/renda-kurnia-manik-11a574338",
    color: "hsl(188,92%,42%)",
  },
  {
    icon: Globe,
    label: "Website",
    href: "https://rendakurniamanik.vercel.app",
    color: "hsl(43,96%,56%)",
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const submitMutation = useSubmitContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("idle");
    submitMutation.mutate(
      { data: formData },
      {
        onSuccess: (res) => {
          if (res.success) {
            setStatus("success");
            setFormData({ name: "", email: "", message: "" });
          } else {
            setStatus("error");
            setErrorMessage(res.message || "Gagal mengirim pesan.");
          }
        },
        onError: (err: any) => {
          setStatus("error");
          setErrorMessage(err?.message || "Terjadi kesalahan sistem.");
        },
      }
    );
  };

  return (
    <section id="contact" className="relative overflow-hidden">

      {/* === SECTION HEADER === */}
      <div className="relative py-20 border-y-4 overflow-hidden" style={{
        borderColor: 'hsl(84,81%,44%)',
        background: 'linear-gradient(135deg, hsl(100 50% 5%) 0%, hsl(270 50% 5%) 60%)',
      }}>
        <div className="grid-pattern absolute inset-0 opacity-30" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex items-start gap-6">
            <span
              className="font-display text-[8rem] md:text-[12rem] leading-none"
              style={{
                WebkitTextStroke: '2px hsl(84 81% 44% / 0.3)',
                color: 'transparent',
              }}
            >
              05
            </span>
            <div className="pt-4 md:pt-8">
              <p className="font-mono text-xs tracking-[0.3em] uppercase text-[hsl(84,81%,55%)] mb-2">
                Let's Collaborate
              </p>
              <h2 className="font-display uppercase leading-none">
                <span className="block text-7xl md:text-9xl text-foreground">Get In</span>
                <span
                  className="block text-7xl md:text-9xl"
                  style={{ color: 'hsl(84,81%,44%)' }}
                >
                  Touch
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* === MAIN CONTENT === */}
      <div className="py-20 relative" style={{ background: 'hsl(270 50% 4%)' }}>
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

            {/* LEFT: Contact Info */}
            <div className="lg:col-span-4">
              <motion.div
                className="sticky top-32 space-y-8"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Description */}
                <div className="border-l-4 border-[hsl(271,91%,65%)] pl-5">
                  <p className="font-sans text-foreground/60 font-light leading-relaxed">
                    Ada proyek menarik? Mari berkolaborasi dan wujudkan ide Anda menjadi realitas digital yang luar biasa.
                  </p>
                </div>

                {/* Contact details */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 group/c">
                    <div className="w-10 h-10 border-2 border-[hsl(271,91%,65%/0.4)] flex items-center justify-center flex-shrink-0 group-hover/c:border-[hsl(271,91%,65%)] transition-colors">
                      <Phone size={16} style={{ color: 'hsl(271,91%,65%)' }} />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] tracking-widest uppercase text-foreground/30 mb-0.5">Phone</p>
                      <p className="font-sans text-sm text-foreground/70">+62 853-6018-3199</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 group/c">
                    <div className="w-10 h-10 border-2 border-[hsl(43,96%,56%/0.4)] flex items-center justify-center flex-shrink-0 group-hover/c:border-[hsl(43,96%,56%)] transition-colors">
                      <MapPin size={16} style={{ color: 'hsl(43,96%,56%)' }} />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] tracking-widest uppercase text-foreground/30 mb-0.5">Location</p>
                      <p className="font-sans text-sm text-foreground/70">Tanjung Pinang, Kepulauan Riau</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-foreground/30 mb-4">Social</p>
                  <div className="flex flex-col gap-3">
                    {socials.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/s flex items-center gap-3 border-2 px-4 py-3 transition-all duration-300 hover-target"
                        style={{ borderColor: social.color + '30' }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = social.color;
                          (e.currentTarget as HTMLElement).style.background = social.color + '10';
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = social.color + '30';
                          (e.currentTarget as HTMLElement).style.background = 'transparent';
                        }}
                      >
                        <social.icon size={18} style={{ color: social.color }} />
                        <span className="font-sans font-bold text-xs uppercase tracking-widest" style={{ color: social.color }}>
                          {social.label}
                        </span>
                        <ArrowRight size={12} className="ml-auto opacity-0 group-hover/s:opacity-100 transition-opacity" style={{ color: social.color }} />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT: Form */}
            <div className="lg:col-span-8">
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-0 border-2"
                style={{ borderColor: 'hsl(271,91%,65%/0.3)' }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Name field */}
                <div className="border-b-2" style={{ borderColor: 'hsl(271,91%,65%/0.2)' }}>
                  <label
                    htmlFor="name"
                    className="block font-mono text-[10px] tracking-[0.3em] uppercase px-6 pt-5 pb-1"
                    style={{ color: 'hsl(271,91%,65%)' }}
                  >
                    01 — Nama
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent focus:outline-none px-6 py-4 font-sans text-lg text-foreground font-light placeholder:text-foreground/20"
                    placeholder="Nama lengkap Anda..."
                  />
                </div>

                {/* Email field */}
                <div className="border-b-2" style={{ borderColor: 'hsl(271,91%,65%/0.2)' }}>
                  <label
                    htmlFor="email"
                    className="block font-mono text-[10px] tracking-[0.3em] uppercase px-6 pt-5 pb-1"
                    style={{ color: 'hsl(327,81%,62%)' }}
                  >
                    02 — Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent focus:outline-none px-6 py-4 font-sans text-lg text-foreground font-light placeholder:text-foreground/20"
                    placeholder="email@domain.com"
                  />
                </div>

                {/* Message field */}
                <div className="border-b-2" style={{ borderColor: 'hsl(271,91%,65%/0.2)' }}>
                  <label
                    htmlFor="message"
                    className="block font-mono text-[10px] tracking-[0.3em] uppercase px-6 pt-5 pb-1"
                    style={{ color: 'hsl(43,96%,56%)' }}
                  >
                    03 — Pesan
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent focus:outline-none px-6 py-4 font-sans text-lg text-foreground font-light leading-relaxed placeholder:text-foreground/20 resize-none"
                    placeholder="Ceritakan proyek atau ide Anda..."
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="w-full group relative overflow-hidden flex items-center justify-between px-8 py-5 font-sans font-bold uppercase tracking-[0.25em] text-sm transition-all duration-300 hover-target disabled:opacity-50"
                  style={{
                    background: 'linear-gradient(90deg, hsl(271,91%,65%), hsl(327,81%,62%))',
                    color: 'hsl(270,50%,5%)',
                  }}
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />
                  <span className="relative z-10">
                    {submitMutation.isPending ? "Sending..." : "Send Message"}
                  </span>
                  <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.form>

              {/* Status Messages */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center gap-3 border-2 border-[hsl(84,81%,44%)] text-[hsl(84,81%,55%)] p-5 mt-4"
                    style={{ background: 'hsl(84 81% 44% / 0.08)' }}
                  >
                    <CheckCircle2 size={20} />
                    <span className="font-sans text-sm font-light">
                      Pesan Anda berhasil dikirim ke database! Terima kasih.
                    </span>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center gap-3 border-2 border-red-500/50 text-red-400 p-5 mt-4"
                    style={{ background: 'hsl(0 84% 60% / 0.08)' }}
                  >
                    <AlertCircle size={20} />
                    <span className="font-sans text-sm font-light">{errorMessage}</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* === FOOTER STRIP === */}
      <div className="border-t-4 py-8" style={{
        borderColor: 'hsl(271,91%,65%)',
        background: 'hsl(270 50% 4%)',
      }}>
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="font-mono text-xs tracking-[0.3em] uppercase text-foreground/30">
              © 2026 Renda Kurnia Manik — All Rights Reserved
            </p>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-[hsl(271,91%,65%)]" />
              <p className="font-mono text-xs tracking-widest text-foreground/30">
                Built with React + TypeScript
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
