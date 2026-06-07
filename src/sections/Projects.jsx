import { motion } from "framer-motion";
import { projectsData } from "../data/portfolioData";
import { ExternalLink, Github } from "lucide-react";

export default function Projects({ projects }) {
  const displayProjects = projects && projects.length > 0 ? projects : projectsData;

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

  return (
    <section
      id="projects"
      className="py-section-gap relative overflow-hidden border-t border-outline-variant/10"
    >
      <div className="absolute inset-0 technical-grid pointer-events-none opacity-40"></div>

      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Section Heading */}
        <div className="mb-16">
          <div className="font-label-mono text-xs text-primary uppercase tracking-widest mb-3 font-bold">
            05 // SELECTED_DEPLOYMENTS
          </div>
          <h2 className="font-display-lg text-4xl sm:text-5xl text-on-surface leading-tight">
            Systems & Platforms Coded <br />
            at{" "}
            <span className="font-display-lg italic font-normal text-primary">
              Scale
            </span>
          </h2>
          <p className="font-body-md text-sm sm:text-base text-on-surface-variant max-w-xl mt-4 leading-relaxed">
            An archive of verified, compiled, and deployed applications
            incorporating modern design systems and efficient states.
          </p>
        </div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter"
        >
          {displayProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="group border border-outline-variant/15 p-6 rounded bg-surface-container-low/30 relative flex flex-col justify-between overflow-hidden hover:border-primary/20 hover:bg-surface-container-low/50 transition-all duration-300"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-outline-variant/30 group-hover:border-primary/50 transition-colors"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-outline-variant/30 group-hover:border-primary/50 transition-colors"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-outline-variant/30 group-hover:border-primary/50 transition-colors"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-outline-variant/30 group-hover:border-primary/50 transition-colors"></div>

              <div>
                {/* Tech Label / ID */}
                <div className="font-label-mono text-[10px] text-on-surface-variant/60 tracking-wider mb-4 flex justify-between items-center">
                  <span>LOG_ID // 0{project.id}_SYS</span>
                  {project.status === "in-progress" ? (
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-[9px] text-primary uppercase font-bold tracking-widest">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping"></span>
                      ONGOING
                    </span>
                  ) : (
                    <span className="text-[9px] border border-outline-variant/20 px-2 py-0.5 rounded text-on-surface-variant/60 tracking-widest uppercase font-bold bg-surface-container-lowest">
                      DEPLOYED
                    </span>
                  )}
                </div>

                {/* Project Image */}
                <div className="border border-outline-variant/10 rounded overflow-hidden aspect-[16/10] bg-surface-container-lowest filter grayscale group-hover:grayscale-0 transition-all duration-500 mb-6 relative">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-outline-variant/40">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        ></rect>
                        <polyline points="21 15 16 10 5 21"></polyline>
                      </svg>
                    </div>
                  )}
                </div>

                {/* Title */}
                <h3 className="font-headline-md text-lg sm:text-xl text-on-surface uppercase tracking-wider mb-3 font-semibold group-hover:text-primary transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="font-body-md text-sm text-on-surface-variant leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                {/* Tech Badges */}
                <div className="border-t border-outline-variant/10 pt-4 mb-6">
                  <ul className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <li
                        key={i}
                        className="font-label-mono text-[10px] border border-outline-variant/15 px-2 py-0.5 rounded bg-surface-container-lowest/80 text-on-surface-variant"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 font-ui-element text-xs uppercase tracking-wider font-semibold border border-outline-variant text-on-surface text-center py-2.5 rounded hover:bg-surface-container/50 transition-colors flex items-center justify-center gap-2"
                  >
                    <Github size={14} /> Repository
                  </a>
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 font-ui-element text-xs uppercase tracking-wider font-semibold bg-primary text-background text-center py-2.5 rounded hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={14} /> Live System
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View More Callout */}
        <div className="mt-16 text-center">
          <a
            href="https://github.com/Erenshoyo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block border border-outline-variant text-on-surface text-center px-12 py-3.5 font-ui-element text-sm uppercase tracking-wider font-semibold rounded hover:bg-surface-container/50 transition-colors"
          >
            Visit Github
          </a>
        </div>
      </div>
    </section>
  );
}
