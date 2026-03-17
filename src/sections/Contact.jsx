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
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-5xl font-bold text-base-content mb-4 lowercase tracking-tight">
            contact.
          </h2>
          <div className="w-12 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            I'm currently available for freelance work and open to new
            opportunities.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-base-200 p-8 rounded-box shadow-lg border border-base-content/5 h-full">
              <h3 className="text-2xl font-bold mb-8 text-base-content">
                Get in touch
              </h3>

              <div className="space-y-6 flex flex-col items-start justify-center">
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="w-full flex items-center p-5 rounded-box bg-base-100/50 border border-base-content/5 hover:border-primary/30 transition-colors group"
                >
                  <div className="w-14 h-14 bg-base-300 text-primary rounded-full flex items-center justify-center mr-5 group-hover:scale-110 transition-transform">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-secondary font-medium tracking-wide uppercase">
                      Email Me
                    </p>
                    <p className="text-lg font-medium text-base-content mt-1">
                      {personalInfo.email}
                    </p>
                  </div>
                </a>

                {isConfiguredLink(personalInfo.calendarForm) ? (
                  <a
                    href={personalInfo.calendarForm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center p-5 rounded-box bg-base-100/50 border border-base-content/5 hover:border-primary/30 transition-colors group"
                  >
                    <div className="w-14 h-14 bg-base-300 text-base-content rounded-full flex items-center justify-center mr-5 group-hover:scale-110 transition-transform">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-secondary font-medium tracking-wide uppercase">
                        Book a Call
                      </p>
                      <p className="text-lg font-medium text-base-content mt-1">
                        Schedule Meeting
                      </p>
                    </div>
                  </a>
                ) : (
                  <div className="w-full flex items-center p-5 rounded-box bg-base-100/40 border border-dashed border-base-content/20">
                    <div className="w-14 h-14 bg-base-300 text-base-content/70 rounded-full flex items-center justify-center mr-5">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <p className="text-sm text-secondary font-medium tracking-wide uppercase">
                        Book a Call
                      </p>
                      <p className="text-base font-medium text-base-content/80 mt-1">
                        Calendar link coming soon
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <form
              onSubmit={handleSubmit}
              className="bg-base-200 p-8 rounded-box shadow-lg border border-base-content/5 h-full flex flex-col"
            >
              <div className="form-control mb-5">
                <label htmlFor="contact-name" className="label pb-2">
                  <span className="label-text text-base-content font-medium">
                    Name
                  </span>
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  className="input input-lg input-bordered focus:border-primary focus:outline-none w-full bg-base-100 rounded-lg text-base"
                  required
                />
              </div>

              <div className="form-control mb-5">
                <label htmlFor="contact-email" className="label pb-2">
                  <span className="label-text text-base-content font-medium">
                    Email
                  </span>
                </label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  className="input input-lg input-bordered focus:border-primary focus:outline-none w-full bg-base-100 rounded-lg text-base"
                  required
                />
              </div>

              <div className="form-control mb-8 flex-grow">
                <label htmlFor="contact-message" className="label pb-2">
                  <span className="label-text text-base-content font-medium">
                    Message
                  </span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="textarea textarea-bordered focus:border-primary focus:outline-none w-full h-full min-h-[150px] bg-base-100 rounded-lg text-base pt-4"
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg rounded-box font-medium w-full text-primary-content"
              >
                {isSuccess ? (
                  <>
                    <CheckCircle size={20} className="mr-2" /> Email Draft
                    Opened
                  </>
                ) : (
                  <>
                    Open Email Draft <Send size={18} className="ml-2" />
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
