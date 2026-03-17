import { isConfiguredLink, personalInfo } from "../data/portfolioData";
import { Github, Linkedin, Facebook, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-base-300/50 py-12 border-t border-base-content/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <a
          href="#home"
          className="text-2xl font-bold text-base-content mb-4 transition-transform hover:scale-105"
        >
          Tauhid.
        </a>

        <p className="text-secondary text-center max-w-sm mb-8 text-sm leading-relaxed">
          Building digital products, brands, and experiences with a focus on
          modern design and user experience.
        </p>

        <div className="flex space-x-6 mb-10">
          <a
            href={personalInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-base-200 text-base-content hover:bg-primary hover:text-primary-content transition-all"
            aria-label="GitHub"
          >
            <Github size={18} />
          </a>
          {isConfiguredLink(personalInfo.socials.linkedin) && (
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-base-200 text-base-content hover:bg-[#0077b5] hover:text-white transition-all"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          )}
          {isConfiguredLink(personalInfo.socials.facebook) && (
            <a
              href={personalInfo.socials.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-base-200 text-base-content hover:bg-[#1877f2] hover:text-white transition-all"
              aria-label="Facebook"
            >
              <Facebook size={18} />
            </a>
          )}
          <a
            href={`mailto:${personalInfo.email}`}
            className="w-10 h-10 rounded-full flex items-center justify-center bg-base-200 text-base-content hover:bg-error hover:text-white transition-all"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
        </div>

        <div className="text-center text-xs font-medium text-secondary">
          <p>
            © {currentYear} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
