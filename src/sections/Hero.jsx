import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { isConfiguredLink, personalInfo } from "../data/portfolioData";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const { clientX, clientY, currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    setMousePosition({
      x: clientX - rect.left,
      y: clientY - rect.top,
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="home"
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center pt-24 pb-16 px-margin-mobile md:px-margin-desktop overflow-hidden group"
    >
      {/* Structural backgrounds */}
      <div className="absolute inset-0 technical-grid pointer-events-none"></div>
      <div className="absolute inset-0 grain-overlay pointer-events-none"></div>
      
      {/* Ambient mouse glow */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(195, 203, 154, 0.08), transparent 45%)`,
        }}
      ></div>

      <div className="max-w-container-max mx-auto z-10 w-full flex flex-col justify-center">
        {/* Coordinates and status row */}
        <div className="w-full border-b border-outline-variant/15 pb-4 mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 font-label-mono text-xs text-on-surface-variant uppercase tracking-wider">
          <span>LAT: 23.8103° N // LNG: 90.4125° E</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            SYS_STATUS: OPERATIONAL // UPTIME: 99.98%
          </span>
        </div>

        <div className="flex flex-col items-center justify-center text-center">
          {/* Centered Content */}
          <motion.div
            className="max-w-3xl w-full flex flex-col items-center"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-4">
              <span className="font-label-mono text-xs uppercase tracking-widest text-primary font-bold">
                SYSTEM_INIT // PORTFOLIO_V1
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={itemVariants}>
              <h1 className="font-display-lg text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-on-surface leading-[1.05] tracking-tight mb-4">
                Md. Asif Shahriar <br />
                <span className="font-display-lg italic font-normal text-primary">Tauhid</span>
              </h1>
            </motion.div>

            {/* Subheadline */}
            <motion.div variants={itemVariants}>
              <h2 className="font-headline-md text-lg sm:text-xl md:text-2xl text-secondary uppercase tracking-widest mb-6 font-semibold">
                Software Engineer & Full-Stack Developer
              </h2>
            </motion.div>

            {/* Brand statement */}
            <motion.p
              variants={itemVariants}
              className="font-body-md text-base sm:text-lg text-on-surface-variant max-w-2xl mb-10 leading-relaxed text-center mx-auto"
            >
              {personalInfo.brandStatement}
            </motion.p>

            {/* Actions */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 mb-10 w-full max-w-md"
            >
              <a
                href="#projects"
                className="bg-primary text-background text-center px-8 py-3.5 font-ui-element text-sm uppercase tracking-wider font-semibold rounded hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                Explore Systems <ArrowRight size={16} />
              </a>

              <a
                href="https://wa.me/8801570234257"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-outline-variant text-on-surface text-center px-8 py-3.5 font-ui-element text-sm uppercase tracking-wider font-semibold rounded hover:bg-surface-container/50 transition-colors"
              >
                Contact Now
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={itemVariants}
              className="flex items-center justify-center gap-4 border-t border-outline-variant/15 pt-6 mt-4 w-full max-w-xs"
            >
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-on-surface-variant hover:text-primary transition-colors p-2 border border-outline-variant/15 rounded"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              {isConfiguredLink(personalInfo.socials.linkedin) && (
                <a
                  href={personalInfo.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-on-surface-variant hover:text-primary transition-colors p-2 border border-outline-variant/15 rounded"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              )}
              <a
                href={`mailto:${personalInfo.email}`}
                className="text-on-surface-variant hover:text-primary transition-colors p-2 border border-outline-variant/15 rounded"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
