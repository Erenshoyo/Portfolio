import { motion } from "framer-motion";
import { involvementData } from "../data/portfolioData";

export default function Involvement() {
  return (
    <section id="involvement" className="py-section-gap relative overflow-hidden border-t border-outline-variant/10">
      <div className="absolute inset-0 technical-grid pointer-events-none opacity-40"></div>
      
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Heading */}
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <div className="font-label-mono text-xs text-primary uppercase tracking-widest mb-3 font-bold">
                03 // PROFESSIONAL_LOG
              </div>
              <h2 className="font-display-lg text-4xl sm:text-5xl text-on-surface leading-tight">
                Systems & Community <span className="font-display-lg italic font-normal text-primary">Involvement</span>
              </h2>
              <p className="font-body-md text-sm sm:text-base text-on-surface-variant mt-4 leading-relaxed">
                Chronological ledger of professional contributions, open-source initiatives, and technological community service.
              </p>
            </div>
          </div>

          {/* Right Column: Timeline */}
          <div className="lg:w-2/3">
            <div className="relative pl-6 sm:pl-8 border-l border-outline-variant/20 space-y-12">
              {involvementData.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group"
                >
                  {/* Timeline node/indicator */}
                  <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 bg-background border-2 border-outline-variant group-hover:border-primary transition-colors rounded-full flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-outline-variant group-hover:bg-primary transition-colors rounded-full"></div>
                  </div>

                  <div className="border border-outline-variant/15 p-6 sm:p-8 rounded bg-surface-container-low/30 relative overflow-hidden group-hover:border-outline-variant/30 transition-colors">
                    {/* Corner details */}
                    <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-outline-variant/30 group-hover:border-primary/50 transition-colors"></div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-outline-variant/30 group-hover:border-primary/50 transition-colors"></div>

                    {/* Metadata Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                      <span className="font-label-mono text-xs text-primary uppercase tracking-wider">
                        {item.duration}
                      </span>
                      <span className="font-label-mono text-[10px] text-on-surface-variant/60 uppercase tracking-widest">
                        LOG_ID: 0{item.id}_RUN
                      </span>
                    </div>

                    {/* Roles */}
                    <h3 className="font-headline-md text-lg sm:text-xl text-on-surface uppercase tracking-wider mb-1 font-semibold">
                      {item.role}
                    </h3>
                    <h4 className="font-label-mono text-sm text-secondary uppercase tracking-widest mb-6">
                      {item.organization}
                    </h4>

                    {/* Bullet Points */}
                    <ul className="space-y-3 font-body-md text-sm sm:text-base text-on-surface-variant leading-relaxed">
                      {item.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span className="text-primary mt-1 select-none font-bold">//</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
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
