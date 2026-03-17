import { motion } from "framer-motion";
import { involvementData } from "../data/portfolioData";
import { Rocket } from "lucide-react";

export default function Involvement() {
  return (
    <section id="involvement" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12">
          
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="md:w-1/3"
          >
            <h2 className="text-5xl font-bold text-base-content mb-6 lowercase tracking-tight">
              involvement.
            </h2>
            <div className="w-12 h-1 bg-primary mb-6"></div>
            <p className="text-secondary text-lg">
              Community building, continuous learning, and hands-on frontend development.
            </p>
          </motion.div>

          {/* Timeline List */}
          <div className="md:w-2/3">
            <div className="space-y-8">
              {involvementData.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-base-200 p-8 rounded-box shadow-lg border border-base-content/5 hover:border-primary/20 transition-all flex flex-col sm:flex-row gap-6 relative"
                >
                  {/* Icon Column */}
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-12 h-12 rounded-full bg-base-100 flex items-center justify-center text-primary border border-base-content/10">
                      <Rocket size={20} />
                    </div>
                  </div>

                  {/* Content Column */}
                  <div className="flex-grow">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-2 gap-2">
                      <h3 className="text-xl font-bold text-base-content">
                        {item.role}
                      </h3>
                      <span className="inline-block px-3 py-1 rounded-full bg-base-100/50 text-xs font-semibold text-secondary tracking-wider whitespace-nowrap border border-base-content/5 border-dashed">
                        {item.duration}
                      </span>
                    </div>
                    
                    <h4 className="text-primary font-medium mb-4 text-sm uppercase tracking-widest">
                      {item.organization}
                    </h4>
                    
                    <ul className="space-y-3">
                      {item.points.map((point, i) => (
                        <li key={i} className="text-base-content/80 text-sm md:text-base flex items-start leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 mr-3 flex-shrink-0"></span>
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
