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
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="skills" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Figma Lowercase Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl font-bold text-base-content mb-4 lowercase tracking-tight">
            skills.
          </h2>
          <div className="w-12 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Technologies and tools I use to build modern web solutions.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto"
        >
          {skillsData.map((category, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="w-full md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] bg-base-200 p-8 rounded-box border border-base-content/5 hover:border-primary/20 transition-all hover:-translate-y-1 text-center flex flex-col items-center"
            >
              <div className="flex items-center justify-center mb-6 pb-4 border-b border-base-content/10 w-full">
                <div className="w-2 h-2 rounded-full bg-primary mr-3"></div>
                <h3 className="text-xl font-semibold text-base-content tracking-wide">
                  {category.category}
                </h3>
              </div>

              <ul className="flex flex-wrap justify-center gap-4 w-full">
                {category.items.map((skill, sIdx) => {
                  const Icon = skill.icon;
                  return (
                    <li
                      key={sIdx}
                      className="w-[calc(50%-0.5rem)] max-w-[180px] flex flex-col items-center justify-center p-3 rounded-lg bg-base-100/50 border border-base-content/5 group hover:bg-base-100 transition-colors"
                    >
                      <div className="text-secondary mb-2 group-hover:text-primary transition-colors">
                        <Icon size={24} strokeWidth={1.5} />
                      </div>
                      <span className="text-sm font-medium text-base-content/70 group-hover:text-base-content text-center transition-colors">
                        {skill.name}
                      </span>
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
