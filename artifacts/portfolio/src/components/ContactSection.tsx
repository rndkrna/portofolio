import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Linkedin,
  Globe,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { SiGithub } from "react-icons/si";
import { useSubmitContactForm } from "@workspace/api-client-react";

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
      },
    );
  };

  return (
    <section id="contact" className="py-32 md:py-48 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-primary tracking-[0.2em] uppercase text-xs mb-3">
              Initiate Dialogue
            </p>
            <h2 className="text-4xl md:text-5xl font-display uppercase tracking-tight">
              Get in Touch
            </h2>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-xs uppercase tracking-widest text-muted-foreground mb-2"
              >
                Nama
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-card/20 border border-border/40 focus:border-primary/50 focus:outline-none px-4 py-3 text-foreground rounded-sm transition-all duration-300 font-light"
                placeholder="Renda Kurnia Manik"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-xs uppercase tracking-widest text-muted-foreground mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full bg-card/20 border border-border/40 focus:border-primary/50 focus:outline-none px-4 py-3 text-foreground rounded-sm transition-all duration-300 font-light"
                placeholder="rkurniamanik@student.umrah.ac.id"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs uppercase tracking-widest text-muted-foreground mb-2"
              >
                Pesan
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full bg-card/20 border border-border/40 focus:border-primary/50 focus:outline-none px-4 py-3 text-foreground rounded-sm transition-all duration-300 font-light resize-none"
                placeholder="Tulis pesan Anda di sini..."
              />
            </div>

            <button
              type="submit"
              disabled={submitMutation.isPending}
              className="w-full bg-primary hover:bg-primary/95 text-primary-foreground font-sans uppercase tracking-[0.2em] text-xs py-4 px-6 rounded-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              {submitMutation.isPending ? "Sending..." : "Send Message"}
              <ArrowRight size={14} />
            </button>

            <AnimatePresence>
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 p-4 rounded-sm"
                >
                  <CheckCircle2 size={20} />
                  <span className="text-sm font-light">
                    Pesan Anda berhasil dikirim secara langsung ke database!
                    Terima kasih.
                  </span>
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex items-center gap-3 bg-destructive/10 border border-destructive/20 text-destructive-foreground p-4 rounded-sm"
                >
                  <AlertCircle size={20} />
                  <span className="text-sm font-light">{errorMessage}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

          <motion.div
            className="mt-16 text-center text-muted-foreground tracking-widest text-sm uppercase space-y-2 font-mono border-t border-border/20 pt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p>+62 853-6018-3199</p>
            <p>Tanjung Pinang, Kepulauan Riau</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-center gap-8 mt-12"
          >
            <a
              href="https://github.com/rndkrna"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors hover-target uppercase tracking-widest text-sm"
            >
              <SiGithub size={18} /> Github
            </a>
            <a
              href="https://www.linkedin.com/in/renda-kurnia-manik-11a574338"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors hover-target uppercase tracking-widest text-sm"
            >
              <Linkedin size={18} /> LinkedIn
            </a>
            <a
              href="https://rendakurniamanik.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors hover-target uppercase tracking-widest text-sm"
            >
              <Globe size={18} /> Website
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
