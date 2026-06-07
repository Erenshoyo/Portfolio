import { useMemo, useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks } from "../data/portfolioData";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { useTheme } from "../hooks/useTheme";

export default function Navbar({ currentView = "main", setView, setActivePostId }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sectionIds = useMemo(
    () => navLinks.map((link) => link.href.substring(1)),
    [],
  );
  const activeId = useScrollSpy(sectionIds, 100);
  const { theme, toggleTheme } = useTheme();

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (setView) setView("main");
    if (setActivePostId) setActivePostId(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavLinkClick = (e, link) => {
    e.preventDefault();
    const href = link.href;
    const isBlogLink = href === "#blog";

    if (isBlogLink) {
      if (setView) setView("blog");
      if (setActivePostId) setActivePostId(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      if (setView && currentView !== "main") {
        setView("main");
        if (setActivePostId) setActivePostId(null);
        // Wait for DOM to render main sections before scrolling
        setTimeout(() => {
          const element = document.querySelector(href);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10 transition-all duration-300 ease-in-out">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#home"
              onClick={handleLogoClick}
              className="font-label-mono text-label-mono text-primary uppercase tracking-widest font-bold hover:opacity-80 transition-opacity"
            >
              AST
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isBlogLink = link.href === "#blog";
              const isActive = isBlogLink
                ? currentView === "blog" || currentView === "blog-post"
                : currentView === "main" && activeId === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavLinkClick(e, link)}
                  className={`font-ui-element text-ui-element tracking-tight transition-colors duration-300 hover:text-primary relative py-1 ${
                    isActive ? "text-primary border-b border-primary" : "text-on-surface-variant"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded hover:bg-surface-container transition-colors text-on-surface"
              aria-label={`Switch to ${theme === "figmaDark" ? "light" : "dark"} theme`}
            >
              {theme === "figmaDark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href="/Asif%20Shahriar%20Tauhid_CVF.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-block bg-primary text-background px-5 py-2 font-ui-element text-ui-element hover:opacity-80 transition-opacity rounded"
            >
              Resume
            </a>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded hover:bg-surface-container transition-colors text-on-surface"
                aria-label="Toggle Mobile Menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-outline-variant/10 bg-background/95 backdrop-blur-xl"
          >
            <div className="px-margin-mobile py-4 space-y-2">
              {navLinks.map((link) => {
                const isBlogLink = link.href === "#blog";
                const isActive = isBlogLink
                  ? currentView === "blog" || currentView === "blog-post"
                  : currentView === "main" && activeId === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      handleNavLinkClick(e, link);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`block px-4 py-2 font-ui-element text-ui-element transition-colors rounded ${
                      isActive
                        ? "bg-primary/10 text-primary border-l-2 border-primary"
                        : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
              <a
                href="/Asif%20Shahriar%20Tauhid_CVF.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center bg-primary text-background py-2 mt-4 font-ui-element text-ui-element hover:opacity-80 transition-opacity rounded"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
