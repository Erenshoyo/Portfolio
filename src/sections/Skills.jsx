import { motion } from "framer-motion";
import { skillsData } from "../data/portfolioData";

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Pre-mapping classes for bento layout asymmetry
  const getBentoClasses = (index) => {
    switch (index) {
      case 0:
        return "col-span-12 md:col-span-7";
      case 1:
        return "col-span-12 md:col-span-5";
      case 2:
        return "col-span-12 md:col-span-5";
      case 3:
        return "col-span-12 md:col-span-7";
      case 4:
        return "col-span-12";
      default:
        return "col-span-12";
    }
  };

  const categoryLabels = [
    "01 / CORE_ENGINE",
    "02 / RUNTIME_SYSTEM",
    "03 / PRESENTATION_LAYER",
    "04 / BUILD_PIPELINE",
    "05 / NEXT_STACK_RESEARCH",
  ];

  return (
    <section id="skills" className="py-section-gap relative overflow-hidden border-t border-outline-variant/10">
      <div className="absolute inset-0 technical-grid pointer-events-none opacity-50"></div>
      
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Section Heading */}
        <div className="mb-16">
          <div className="font-label-mono text-xs text-primary uppercase tracking-widest mb-3 font-bold">
            02 // TECHNICAL_ARSENAL
          </div>
          <h2 className="font-display-lg text-4xl sm:text-5xl text-on-surface leading-tight">
            Engineered Capabilities & <span className="font-display-lg italic font-normal text-primary">Tooling</span>
          </h2>
          <p className="font-body-md text-sm sm:text-base text-on-surface-variant max-w-xl mt-4 leading-relaxed">
            A precise mapping of my technological competencies, structural libraries, and ongoing systems development research.
          </p>
        </div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-12 gap-gutter"
        >
          {skillsData.map((category, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className={`${getBentoClasses(idx)} border border-outline-variant/15 p-6 sm:p-8 rounded bg-surface-container-low/40 relative flex flex-col justify-between overflow-hidden group/card transition-colors duration-300 hover:border-primary/20 hover:bg-surface-container-low/60`}
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-outline-variant/30 group-hover/card:border-primary/50 transition-colors"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-outline-variant/30 group-hover/card:border-primary/50 transition-colors"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-outline-variant/30 group-hover/card:border-primary/50 transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-outline-variant/30 group-hover/card:border-primary/50 transition-colors"></div>

              <div>
                {/* Tech Label */}
                <div className="font-label-mono text-[10px] text-on-surface-variant/60 tracking-wider mb-6 flex justify-between items-center">
                  <span>{categoryLabels[idx]}</span>
                  <span className="w-1.5 h-1.5 bg-outline-variant/40 rounded-full group-hover/card:bg-primary transition-colors"></span>
                </div>

                {/* Category Title */}
                <h3 className="font-headline-md text-lg sm:text-xl text-on-surface uppercase tracking-wider mb-4 font-semibold">
                  {category.category}
                </h3>
              </div>

              {/* Skills Sub-list */}
              <ul className="flex flex-wrap gap-3 mt-6">
                {category.items.map((skill, sIdx) => {
                  const Icon = skill.icon;
                  return (
                    <li
                      key={sIdx}
                      className="font-label-mono text-xs border border-outline-variant/15 px-3.5 py-1.5 rounded bg-surface-container-lowest/80 text-on-surface-variant hover:text-primary hover:border-primary transition-all duration-300 flex items-center gap-2"
                    >
                      <span className="opacity-70 group-hover/card:opacity-100">
                        <Icon size={14} />
                      </span>
                      <span>{skill.name}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
