import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Linkedin, Globe, CheckCircle2, AlertCircle, Phone, MapPin } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useSubmitContactForm } from "@workspace/api-client-react";

const socials = [
  { icon: SiGithub, label: "GitHub",   href: "https://github.com/rndkrna",                                          color: "#a855f7" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/renda-kurnia-manik-11a574338",             color: "#22d3ee" },
  { icon: Globe,    label: "Website",  href: "https://rendakurniamanik.vercel.app",                                  color: "#f0a500" },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
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
          if (res.success) { setStatus("success"); setFormData({ name: "", email: "", message: "" }); }
          else { setStatus("error"); setErrorMessage(res.message || "Gagal mengirim pesan."); }
        },
        onError: (err: any) => { setStatus("error"); setErrorMessage(err?.message || "Terjadi kesalahan sistem."); },
      }
    );
  };

  return (
    <section id="contact" className="relative overflow-hidden">

      {/* ── Header ─────────────────────────────────────── */}
      <div
        className="relative py-20 overflow-hidden border-y-4"
        style={{ borderColor: "#4ade80", background: "linear-gradient(135deg, hsl(140 40% 6%) 0%, hsl(230 18% 8%) 100%)" }}
      >
        <div className="stripe-pattern absolute inset-0 opacity-60" />
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="flex items-start gap-5">
            <span
              className="font-display leading-none"
              style={{
                fontSize: "clamp(7rem, 18vw, 14rem)",
                WebkitTextStroke: "2px rgba(74,222,128,0.25)",
                color: "transparent",
              }}
            >
              05
            </span>
            <div className="pt-4 md:pt-8">
              <p className="font-mono text-xs tracking-[0.3em] uppercase mb-2" style={{ color: "#4ade80" }}>
                Let's Collaborate
              </p>
              <h2
                className="font-display uppercase leading-none"
                style={{ fontSize: "clamp(3.5rem, 8vw, 7.5rem)" }}
              >
                <span className="block text-white">Get In</span>
                <span className="block" style={{ color: "#4ade80" }}>Touch</span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────── */}
      <div className="py-20 relative" style={{ background: "hsl(230 18% 8%)" }}>
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

            {/* LEFT: Info */}
            <div className="lg:col-span-4">
              <motion.div
                className="sticky top-32 space-y-8"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Blurb */}
                <div className="border-l-4 border-[#a855f7] pl-5">
                  <p className="font-sans font-light leading-relaxed" style={{ color: "hsl(220 15% 60%)" }}>
                    Ada proyek menarik? Mari berkolaborasi dan wujudkan ide Anda menjadi realitas digital yang luar biasa.
                  </p>
                </div>

                {/* Contact details */}
                <div className="space-y-4">
                  {[
                    { icon: Phone, label: "Phone", value: "+62 853-6018-3199", color: "#a855f7" },
                    { icon: MapPin, label: "Location", value: "Tanjung Pinang, Kepulauan Riau", color: "#f0a500" },
                  ].map((c) => (
                    <div key={c.label} className="flex items-center gap-4 group/c">
                      <div
                        className="w-10 h-10 border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover/c:scale-110"
                        style={{ borderColor: c.color + "40" }}
                      >
                        <c.icon size={16} style={{ color: c.color }} />
                      </div>
                      <div>
                        <p className="font-mono text-[10px] tracking-widest uppercase mb-0.5" style={{ color: "hsl(220 15% 35%)" }}>{c.label}</p>
                        <p className="font-sans text-sm" style={{ color: "hsl(220 15% 68%)" }}>{c.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social links */}
                <div>
                  <p className="font-mono text-[10px] tracking-[0.3em] uppercase mb-4" style={{ color: "hsl(220 15% 32%)" }}>Social</p>
                  <div className="flex flex-col gap-3">
                    {socials.map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/s flex items-center gap-3 border-2 px-4 py-3 transition-all duration-300 hover-target"
                        style={{ borderColor: s.color + "30" }}
                        onMouseEnter={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = s.color;
                          (e.currentTarget as HTMLElement).style.background = s.color + "12";
                        }}
                        onMouseLeave={e => {
                          (e.currentTarget as HTMLElement).style.borderColor = s.color + "30";
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                        }}
                      >
                        <s.icon size={18} style={{ color: s.color }} />
                        <span className="font-sans font-bold text-xs uppercase tracking-widest" style={{ color: s.color }}>{s.label}</span>
                        <ArrowRight size={12} className="ml-auto opacity-0 group-hover/s:opacity-100 transition-opacity" style={{ color: s.color }} />
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
                className="border-2"
                style={{ borderColor: "rgba(168,85,247,0.3)" }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Name */}
                <div className="border-b-2" style={{ borderColor: "rgba(168,85,247,0.18)" }}>
                  <label htmlFor="name" className="block font-mono text-[10px] tracking-[0.3em] uppercase px-6 pt-5 pb-1" style={{ color: "#a855f7" }}>
                    01 — Nama
                  </label>
                  <input
                    type="text" id="name" required value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent focus:outline-none px-6 py-4 font-sans text-lg text-white font-light placeholder:text-white/15"
                    placeholder="Nama lengkap Anda..."
                  />
                </div>

                {/* Email */}
                <div className="border-b-2" style={{ borderColor: "rgba(168,85,247,0.18)" }}>
                  <label htmlFor="email" className="block font-mono text-[10px] tracking-[0.3em] uppercase px-6 pt-5 pb-1" style={{ color: "#f43f8a" }}>
                    02 — Email
                  </label>
                  <input
                    type="email" id="email" required value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent focus:outline-none px-6 py-4 font-sans text-lg text-white font-light placeholder:text-white/15"
                    placeholder="email@domain.com"
                  />
                </div>

                {/* Message */}
                <div className="border-b-2" style={{ borderColor: "rgba(168,85,247,0.18)" }}>
                  <label htmlFor="message" className="block font-mono text-[10px] tracking-[0.3em] uppercase px-6 pt-5 pb-1" style={{ color: "#f0a500" }}>
                    03 — Pesan
                  </label>
                  <textarea
                    id="message" required rows={6} value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent focus:outline-none px-6 py-4 font-sans text-lg text-white font-light leading-relaxed placeholder:text-white/15 resize-none"
                    placeholder="Ceritakan proyek atau ide Anda..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={submitMutation.isPending}
                  className="w-full group relative overflow-hidden flex items-center justify-between px-8 py-5 font-sans font-bold uppercase tracking-[0.25em] text-sm transition-all duration-300 hover-target disabled:opacity-50"
                  style={{ background: "linear-gradient(90deg, #a855f7, #f43f8a)", color: "hsl(230 18% 8%)" }}
                >
                  <div
                    className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)" }}
                  />
                  <span className="relative z-10">{submitMutation.isPending ? "Sending..." : "Send Message"}</span>
                  <ArrowRight size={20} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </button>
              </motion.form>

              {/* Status */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="flex items-center gap-3 border-2 border-[#4ade80] text-[#4ade80] p-5 mt-4"
                    style={{ background: "rgba(74,222,128,0.07)" }}
                  >
                    <CheckCircle2 size={20} />
                    <span className="font-sans text-sm font-light">Pesan berhasil dikirim! Terima kasih.</span>
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                    className="flex items-center gap-3 border-2 border-red-500 text-red-400 p-5 mt-4"
                    style={{ background: "rgba(239,68,68,0.07)" }}
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

      {/* ── Footer ─────────────────────────────────────── */}
      <div
        className="border-t-4 py-8"
        style={{ borderColor: "#a855f7", background: "hsl(230 18% 6%)" }}
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="font-mono text-xs tracking-[0.3em] uppercase" style={{ color: "hsl(220 15% 30%)" }}>
              © 2026 Renda Kurnia Manik — All Rights Reserved
            </p>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2" style={{ background: "#a855f7" }} />
              <p className="font-mono text-xs tracking-widest" style={{ color: "hsl(220 15% 32%)" }}>Built with React + TypeScript</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
