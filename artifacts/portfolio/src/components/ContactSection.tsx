import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Linkedin, Globe, CheckCircle2, AlertCircle, Phone, MapPin, Send, Mail } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useSubmitContactForm } from "@workspace/api-client-react";

const socials = [
  { icon: SiGithub, label: "GitHub",   href: "https://github.com/rndkrna",                                color: "#c4b5fd", glassClass: "glass-violet" },
  { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/renda-kurnia-manik-11a574338", color: "#67e8f9", glassClass: "glass-cyan" },
  { icon: Globe,    label: "Website",  href: "https://rendakurniamanik.vercel.app",                      color: "#fde68a", glassClass: "glass-gold" },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle"|"success"|"error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const submitMutation = useSubmitContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus("idle");
    submitMutation.mutate({ data: formData }, {
      onSuccess: res => {
        if (res.success) { setStatus("success"); setFormData({ name: "", email: "", message: "" }); }
        else { setStatus("error"); setErrorMessage(res.message || "Gagal mengirim pesan."); }
      },
      onError: (err: any) => { setStatus("error"); setErrorMessage(err?.message || "Terjadi kesalahan sistem."); },
    });
  };

  return (
    <section id="contact" className="relative py-32 overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-[55vw] h-[55vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(134,239,172,0.18) 0%, transparent 70%)' }} />
        <div className="absolute bottom-[-10%] right-[-5%] w-[50vw] h-[50vw] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.20) 0%, transparent 70%)' }} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Label */}
        <motion.div className="flex items-center gap-4 mb-6" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <span className="font-mono text-xs tracking-[0.35em] uppercase" style={{ color: '#86efac' }}>05 — Contact</span>
          <div className="flex-1 h-px" style={{ background: 'linear-gradient(90deg, rgba(134,239,172,0.4), transparent)' }} />
        </motion.div>

        {/* Heading */}
        <motion.div className="mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 className="font-display uppercase leading-none" style={{ fontSize: 'clamp(3.5rem, 7vw, 6rem)' }}>
            <span className="block text-white">Get In</span>
            <span className="block" style={{ background: 'linear-gradient(90deg, #86efac, #67e8f9)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>Touch</span>
          </h2>
        </motion.div>

        {/* Dynamic Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Cards Bento (Takes 4/12) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            {/* Blurb glass card */}
            <motion.div 
              className="glass rounded-3xl p-6 border border-white/10"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            >
              <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase block mb-2">COLLABORATE</span>
              <p className="font-sans font-light leading-relaxed text-white/60">
                Ada proyek menarik? Mari berkolaborasi dan wujudkan ide Anda menjadi realitas digital yang luar biasa.
              </p>
            </motion.div>

            {/* Phone & Location detail cards */}
            <motion.div 
              className="flex flex-col gap-3"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }}
            >
              {[
                { icon: Phone, label: "Phone", value: "+62 853-6018-3199", color: "#c4b5fd", glassClass: "glass-violet" },
                { icon: MapPin, label: "Location", value: "Tanjung Pinang, Kepulauan Riau", color: "#fde68a", glassClass: "glass-gold" },
              ].map(c => (
                <div key={c.label} className={`${c.glassClass} rounded-2xl px-5 py-4 flex items-center gap-4 border border-white/5`}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: c.color + '22', border: `1px solid ${c.color}30` }}>
                    <c.icon size={16} style={{ color: c.color }} />
                  </div>
                  <div>
                    <p className="font-mono text-[10px] tracking-widest uppercase mb-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>{c.label}</p>
                    <p className="font-sans text-sm text-white/80">{c.value}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Social Links Bento */}
            <motion.div 
              className="glass rounded-3xl p-6 border border-white/10"
              initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="font-mono text-[9px] tracking-widest text-white/40 uppercase block mb-4">SOCIAL NETWORK</span>
              <div className="flex flex-col gap-2">
                {socials.map(s => (
                  <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                    className="group flex items-center gap-3 rounded-xl px-4 py-3 bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/15 transition-all duration-300 hover-target"
                  >
                    <s.icon size={16} style={{ color: s.color }} />
                    <span className="font-sans font-semibold text-xs tracking-wider uppercase text-white/70 group-hover:text-white transition-colors">{s.label}</span>
                    <ArrowRight size={12} className="ml-auto opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" style={{ color: s.color }} />
                  </a>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right Column: Form Bento Layout (Takes 8/12) */}
          <div className="lg:col-span-8">
            <motion.form 
              onSubmit={handleSubmit} 
              className="glass rounded-3xl border border-white/10 overflow-hidden shadow-2xl"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            >
              
              {/* Form title */}
              <div className="p-8 pb-4 border-b border-white/10">
                <span className="font-mono text-[10px] tracking-widest text-white/40 uppercase block mb-1">SECURE MESSAGE STREAM</span>
                <h3 className="font-display text-2xl uppercase tracking-wider text-white">Send A Message</h3>
              </div>

              {/* Input grid: Name & Email side-by-side on desktop */}
              <div className="grid grid-cols-1 md:grid-cols-2 border-b border-white/10">
                <div className="border-b md:border-b-0 md:border-r border-white/10">
                  <label htmlFor="name" className="block font-mono text-[10px] tracking-[0.3em] uppercase px-8 pt-6 pb-1" style={{ color: '#c4b5fd' }}>
                    01 — Nama
                  </label>
                  <input type="text" id="name" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-transparent focus:outline-none px-8 py-4 font-sans text-base text-white font-light placeholder:text-white/15" placeholder="Nama lengkap Anda..." />
                </div>
                <div>
                  <label htmlFor="email" className="block font-mono text-[10px] tracking-[0.3em] uppercase px-8 pt-6 pb-1" style={{ color: '#f9a8d4' }}>
                    02 — Email
                  </label>
                  <input type={formData.name ? "email" : "text"} id="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-transparent focus:outline-none px-8 py-4 font-sans text-base text-white font-light placeholder:text-white/15" placeholder="email@domain.com" />
                </div>
              </div>

              {/* Message field */}
              <div className="border-b border-white/10">
                <label htmlFor="message" className="block font-mono text-[10px] tracking-[0.3em] uppercase px-8 pt-6 pb-1" style={{ color: '#fde68a' }}>
                  03 — Pesan
                </label>
                <textarea id="message" required rows={6} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-transparent focus:outline-none px-8 py-4 font-sans text-base text-white font-light leading-relaxed placeholder:text-white/15 resize-none" placeholder="Ceritakan proyek atau ide Anda..." />
              </div>

              {/* Action bar with secure status indicator and submit */}
              <div className="p-6 bg-white/3 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-white/30 font-mono text-[10px]">
                  <Mail size={12} />
                  <span>ENCRYPTED_SSL_HANDSHAKE_ACTIVE</span>
                </div>
                
                <button 
                  type="submit" 
                  disabled={submitMutation.isPending}
                  className="group relative overflow-hidden flex items-center justify-center gap-3 font-sans font-bold uppercase tracking-[0.22em] text-xs py-3.5 px-8 rounded-full transition-all duration-300 hover-target disabled:opacity-50 w-full md:w-auto"
                  style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)', color: '#fff', boxShadow: '0 4px 20px rgba(124,58,237,0.35)' }}
                >
                  <div className="absolute inset-0 rounded-full -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)' }} />
                  <span className="relative z-10">{submitMutation.isPending ? "Sending..." : "Send Message"}</span>
                  <Send size={14} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </motion.form>

            {/* Status alerts */}
            <AnimatePresence>
              {status === "success" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="flex items-center gap-3 glass-green p-5 mt-4">
                  <CheckCircle2 size={20} color="#86efac" />
                  <span className="font-sans text-sm font-light" style={{ color: '#86efac' }}>Pesan berhasil dikirim! Terima kasih.</span>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="flex items-center gap-3 p-5 mt-4 rounded-2xl"
                  style={{ background: 'rgba(239,68,68,0.12)', border: '1px solid rgba(239,68,68,0.35)' }}>
                  <AlertCircle size={20} color="#fca5a5" />
                  <span className="font-sans text-sm font-light text-red-300">{errorMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-24 py-8 glass" style={{ borderRadius: 0 }}>
          <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <p className="font-mono text-xs tracking-[0.25em] uppercase" style={{ color: 'rgba(255,255,255,0.28)' }}>© 2026 Renda Kurnia Manik — All Rights Reserved</p>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full" style={{ background: 'linear-gradient(135deg, #7c3aed, #db2777)' }} />
              <p className="font-mono text-xs tracking-widest" style={{ color: 'rgba(255,255,255,0.28)' }}>Built with React + TypeScript</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
