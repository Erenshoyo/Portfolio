import { motion } from "framer-motion";
import { projectsData } from "../data/portfolioData";
import { ExternalLink, Github } from "lucide-react";

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl font-bold text-base-content mb-4 lowercase tracking-tight">
            projects.
          </h2>
          <div className="w-12 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            A selection of my recent frontend work and side projects.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {projectsData.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-base-200 rounded-box border border-base-content/5 hover:border-primary/30 transition-all flex flex-col h-full overflow-hidden shadow-lg"
            >
              {/* Project Image */}
              <div className="h-48 w-full bg-base-300 relative overflow-hidden flex items-center justify-center group-hover:bg-base-200 transition-colors">
                <div className="absolute inset-0 bg-gradient-to-t from-base-200 to-transparent z-10 opacity-60"></div>
                
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="text-base-content/20 group-hover:scale-110 transition-transform duration-700">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      <circle cx="8.5" cy="8.5" r="1.5"></circle>
                      <polyline points="21 15 16 10 5 21"></polyline>
                    </svg>
                  </div>
                )}

                {project.status === "in-progress" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    className="absolute top-4 right-4 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-base-100/80 backdrop-blur-md border border-primary/20 shadow-sm"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                      In Progress
                    </span>
                  </motion.div>
                )}
              </div>

              <div className="p-6 flex-grow flex flex-col relative z-20">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-base-content group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="flex gap-3">
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:text-base-content transition-colors"
                      aria-label="GitHub Repository"
                    >
                      <Github size={20} />
                    </a>
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-secondary hover:text-primary transition-colors"
                      aria-label="Live Demo"
                    >
                      <ExternalLink size={20} />
                    </a>
                  </div>
                </div>

                <p className="text-secondary text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>

                <div className="mt-auto pt-4 border-t border-base-content/10">
                  <ul className="flex flex-wrap gap-2 text-xs font-medium text-base-content/80">
                    {project.techStack.map((tech, i) => (
                      <li key={i} className="px-2 py-1 bg-base-100 rounded-md border border-base-content/5">{tech}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a
            href="https://github.com/Erenshoyo"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline border-base-content/40 hover:bg-base-content/10 hover:border-base-content text-base-content btn-wide rounded-box"
          >
            View More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
