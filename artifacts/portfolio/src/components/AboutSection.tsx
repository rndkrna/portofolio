import { motion } from 'framer-motion';

export default function AboutSection() {
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
              The<br/>Narrative
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
                I believe that software should be felt as much as it is used. For the past decade, I have been exploring the intersection of design, engineering, and storytelling.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p>
                My approach is rooted in subtraction. Strip away the decorative, the superfluous, the expected. What remains must be structurally sound and undeniably beautiful. Whether I am architecting a complex web application or directing a digital campaign, the goal is always the same: clarity and resonance.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="border-l border-primary/30 pl-8 italic my-12 py-2"
            >
              <p className="text-2xl text-foreground font-serif">
                "We don't just build interfaces. We build environments for human attention."
              </p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
