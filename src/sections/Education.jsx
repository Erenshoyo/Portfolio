import { motion } from "framer-motion";
import { educationData } from "../data/portfolioData";

export default function Education() {
  return (
    <section id="education" className="py-section-gap relative overflow-hidden border-t border-outline-variant/10">
      <div className="absolute inset-0 technical-grid pointer-events-none opacity-40"></div>
      
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Heading */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <div className="font-label-mono text-xs text-primary uppercase tracking-widest mb-3 font-bold">
                04 // ACADEMIC_LOG
              </div>
              <h2 className="font-display-lg text-4xl sm:text-5xl text-on-surface leading-tight">
                Educational <span className="font-display-lg italic font-normal text-primary">Foundations</span>
              </h2>
              <p className="font-body-md text-sm sm:text-base text-on-surface-variant mt-4 leading-relaxed">
                Academic trajectory, specialized courses, and theoretical computer science research.
              </p>
            </div>
          </div>

          {/* Right Column: Cards */}
          <div className="lg:w-2/3">
            <div className="space-y-6">
              {educationData.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group border border-outline-variant/15 p-6 sm:p-8 rounded bg-surface-container-low/30 overflow-hidden hover:border-outline-variant/30 transition-colors"
                >
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-outline-variant/30 group-hover:border-primary/50 transition-colors"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-outline-variant/30 group-hover:border-primary/50 transition-colors"></div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      {/* Timeline duration tag */}
                      <span className="font-label-mono text-xs text-primary uppercase tracking-wider block mb-2">
                        {item.duration}
                      </span>
                      
                      {/* Degree Name */}
                      <h3 className="font-headline-md text-lg sm:text-xl text-on-surface uppercase tracking-wider mb-2 font-semibold">
                        {item.degree}
                      </h3>

                      {/* Institution */}
                      <h4 className="font-label-mono text-sm text-secondary uppercase tracking-widest">
                        {item.institution}
                      </h4>
                    </div>

                    <div className="font-label-mono text-[10px] text-on-surface-variant/40 uppercase tracking-widest self-start sm:self-center">
                      SYS_RECORD: 0{item.id}_EDU
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
