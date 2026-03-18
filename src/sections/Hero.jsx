import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { isConfiguredLink, personalInfo } from "../data/portfolioData";

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center pt-24 pb-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      <div className="container mx-auto z-10 w-full max-w-6xl">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-8">
          {/* Left Column (Text Content) */}
          <motion.div
            className="flex-1 text-center md:text-left"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Minimalist Intro Tag */}
            <motion.div variants={itemVariants} className="mb-6">
              <span className="inline-block px-3 py-1 rounded-full bg-base-200 text-xs font-semibold tracking-widest text-primary uppercase">
                Hello, I am
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants}>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-base-content mb-4 leading-tight">
                {personalInfo.name}
              </h1>
            </motion.div>

            {/* Subheadline Highlight */}
            <motion.div variants={itemVariants}>
              <h2 className="text-2xl md:text-3xl font-medium text-secondary mb-6">
                Software Engineer & Full-Stack Developer
              </h2>
            </motion.div>

            {/* Intro Paragraph */}
            <motion.p
              variants={itemVariants}
              className="text-lg text-base-content/80 max-w-xl mx-auto md:mx-0 mb-10 leading-relaxed font-light mt-4"
            >
              {personalInfo.brandStatement}
            </motion.p>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-10"
            >
              <a
                href="/Asif%20Shahriar%20Tauhid_CVF.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn border-none bg-primary text-primary-content hover:bg-primary/90 btn-lg rounded-box font-medium w-full sm:w-auto"
              >
                View Resume <ArrowRight className="ml-2" size={18} />
              </a>

              <a
                href="https://wa.me/8801570234257"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline border-base-content/40 hover:bg-base-content/10 hover:border-base-content text-base-content btn-lg rounded-box font-medium w-full sm:w-auto"
              >
                Contact Now
              </a>
            </motion.div>

            {/* Social Links Row */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center md:justify-start gap-6 border-t border-base-200 pt-8 mt-4 w-fit"
            >
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base-content/60 hover:text-primary transition-colors p-2"
                aria-label="GitHub"
              >
                <Github size={22} />
              </a>
              {isConfiguredLink(personalInfo.socials.linkedin) && (
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base-content/60 hover:text-primary transition-colors p-2"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={22} />
                </a>
              )}
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-base-content/60 hover:text-primary transition-colors p-2"
                aria-label="Email"
              >
                <Mail size={22} />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column (Visual / Avatar) */}
          <motion.div
            className="flex-1 flex justify-center md:justify-end w-full"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Outer decorative ring */}
              <div className="absolute inset-[-10%] rounded-full border border-primary/20 animate-[spin_15s_linear_infinite]"></div>

              {/* Avatar circle image */}
              <div className="w-full h-full rounded-full bg-base-200 shadow-2xl overflow-hidden flex items-center justify-center relative border border-base-content/5 group">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none z-10 transition-opacity duration-500 group-hover:opacity-0"></div>
                <img
                  src="/profile.webp"
                  alt={personalInfo.name}
                  width="384"
                  height="384"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover object-center relative z-0 transition-all duration-700 ease-out group-hover:scale-105"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
