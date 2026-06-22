import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface ProfileData {
  aboutParagraph1: string;
  aboutParagraph2: string;
  quote: string;
}

const fallbackProfile: ProfileData = {
  aboutParagraph1:
    "Mahasiswa Teknik Informatika yang memadukan keahlian teknis pengembangan perangkat lunak dengan pengalaman kepemimpinan strategis yang solid. Berpengalaman memimpin tim penelitian dan divisi organisasi, serta sukses mengeksekusi proyek web komersial dari tahap negosiasi klien hingga deployment.",
  aboutParagraph2:
    "Saat ini saya menempuh studi S1 Teknik Informatika di Universitas Maritim Raja Ali Haji (UMRAH) di Tanjung Pinang, Kepulauan Riau. Sebelumnya, saya menempuh pendidikan di SMA Negeri 1 Singkil Utara di jurusan Ilmu Pengetahuan Sosial (IPS). Latar belakang ini membentuk cara pandang saya yang holistik dalam merumuskan solusi teknologi.",
  quote:
    "Memadukan keahlian teknis pengembangan perangkat lunak dengan pengalaman kepemimpinan strategis yang solid.",
};

export default function AboutSection() {
  const [profile, setProfile] = useState<ProfileData>(fallbackProfile);

  useEffect(() => {
    fetch("/api/profile", { cache: "no-store" })
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error();
      })
      .then((data) => setProfile(data))
      .catch(() => {});
  }, []);

  return (
    <section id="about" className="py-32 relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start">
          {/* Sticky Header Column */}
          <div className="lg:col-span-4 lg:sticky lg:top-32">
            <motion.h2
              className="text-4xl md:text-5xl font-display uppercase tracking-widest text-primary"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              The
              <br />
              Narrative
            </motion.h2>
            <motion.div
              className="w-12 h-px bg-border mt-8"
              initial={{ width: 0 }}
              whileInView={{ width: 48 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </div>

          {/* Content Column */}
          <div className="lg:col-span-8 space-y-12 text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <p className="first-letter:text-7xl first-letter:font-display first-letter:text-primary first-letter:float-left first-letter:mr-4 first-letter:mt-2">
                {profile.aboutParagraph1}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p>{profile.aboutParagraph2}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="border-l border-primary/30 pl-8 italic my-12 py-2"
            >
              <p className="text-2xl text-foreground font-serif">
                "{profile.quote}"
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
