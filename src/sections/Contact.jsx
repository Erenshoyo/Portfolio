import { useState } from "react";
import { motion } from "framer-motion";
import { isConfiguredLink, personalInfo } from "../data/portfolioData";
import { Mail, Calendar, Send, CheckCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Portfolio inquiry from ${formData.name}`,
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`,
    );

    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setIsSuccess(true);
    setFormData({ name: "", email: "", message: "" });

    window.setTimeout(() => setIsSuccess(false), 5000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="py-section-gap relative overflow-hidden border-t border-outline-variant/10">
      <div className="absolute inset-0 technical-grid pointer-events-none opacity-40"></div>
      
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        {/* Section Heading */}
        <div className="mb-16 text-center">
          <div className="font-label-mono text-xs text-primary uppercase tracking-widest mb-3 font-bold">
            06 // CONTACT_SYSTEM
          </div>
          <h2 className="font-display-lg text-4xl sm:text-5xl text-on-surface leading-tight">
            Initiate <span className="font-display-lg italic font-normal text-primary">Communication</span>
          </h2>
          <p className="font-body-md text-sm sm:text-base text-on-surface-variant max-w-xl mx-auto mt-4 leading-relaxed">
            Reach out via the system dispatch form below or choose an alternative connection protocol.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-gutter max-w-5xl mx-auto">
          {/* Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="border border-outline-variant/15 p-6 sm:p-8 rounded bg-surface-container-low/30 h-full relative overflow-hidden flex flex-col justify-between">
              {/* Corner Accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-outline-variant/30"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-outline-variant/30"></div>

              <div>
                <h3 className="font-headline-md text-lg sm:text-xl text-on-surface uppercase tracking-wider mb-8 font-semibold">
                  Connection Protocols
                </h3>

                <div className="space-y-4 flex flex-col items-start justify-center">
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="w-full flex items-center p-5 rounded border border-outline-variant/10 bg-surface-container-low/40 hover:border-primary/30 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 border border-outline-variant/20 text-primary rounded flex items-center justify-center mr-5 group-hover:bg-primary/5 transition-colors">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="font-label-mono text-[10px] text-on-surface-variant/60 uppercase tracking-widest">
                        Email Mailbox
                      </p>
                      <p className="font-body-md text-base text-on-surface mt-1 font-semibold">
                        {personalInfo.email}
                      </p>
                    </div>
                  </a>

                  {isConfiguredLink(personalInfo.calendarForm) ? (
                    <a
                      href={personalInfo.calendarForm}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center p-5 rounded border border-outline-variant/10 bg-surface-container-low/40 hover:border-primary/30 transition-all duration-300 group"
                    >
                      <div className="w-12 h-12 border border-outline-variant/20 text-on-surface rounded flex items-center justify-center mr-5 group-hover:bg-on-surface/5 transition-colors">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <p className="font-label-mono text-[10px] text-on-surface-variant/60 uppercase tracking-widest">
                          Synchronous Booking
                        </p>
                        <p className="font-body-md text-base text-on-surface mt-1 font-semibold">
                          Schedule Live Meeting
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div className="w-full flex items-center p-5 rounded border border-dashed border-outline-variant/20 bg-surface-container-low/20">
                      <div className="w-12 h-12 border border-dashed border-outline-variant/25 text-on-surface-variant/50 rounded flex items-center justify-center mr-5">
                        <Calendar size={18} />
                      </div>
                      <div>
                        <p className="font-label-mono text-[10px] text-on-surface-variant/40 uppercase tracking-widest">
                          Synchronous Booking
                        </p>
                        <p className="font-body-md text-sm text-on-surface-variant/60 mt-1">
                          Calendar booking coming soon
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="font-label-mono text-[9px] text-on-surface-variant/40 uppercase tracking-widest mt-8 border-t border-outline-variant/10 pt-4">
                SECURE_CONNECTION // STABLE
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className="border border-outline-variant/15 p-6 sm:p-8 rounded bg-surface-container-low/30 h-full flex flex-col justify-between relative"
            >
              {/* Corner Accents */}
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-outline-variant/30"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-outline-variant/30"></div>

              <div>
                <div className="mb-5">
                  <label htmlFor="contact-name" className="block font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2">
                    Sender Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className="w-full bg-surface-container-lowest/50 border border-outline-variant/15 p-4 rounded text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary font-body-md text-base transition-colors"
                    required
                  />
                </div>

                <div className="mb-5">
                  <label htmlFor="contact-email" className="block font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2">
                    Sender Email Protocol
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full bg-surface-container-lowest/50 border border-outline-variant/15 p-4 rounded text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary font-body-md text-base transition-colors"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="contact-message" className="block font-label-mono text-[10px] text-on-surface-variant uppercase tracking-wider mb-2">
                    Message Body
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-surface-container-lowest/50 border border-outline-variant/15 p-4 rounded text-on-surface placeholder:text-on-surface-variant/30 focus:outline-none focus:border-primary font-body-md text-base min-h-[120px] transition-colors"
                    placeholder="Write your message here..."
                    required
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="w-full font-ui-element text-xs uppercase tracking-wider font-semibold bg-primary text-background py-3.5 rounded hover:opacity-95 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isSuccess ? (
                  <>
                    <CheckCircle size={14} /> Mail Client Launched
                  </>
                ) : (
                  <>
                    Dispatch Message <Send size={12} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
