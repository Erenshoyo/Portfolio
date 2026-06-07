import { useEffect, useState } from "react";
import { personalInfo } from "../data/portfolioData";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const formatted = new Date().toLocaleTimeString("en-US", {
        timeZone: "Asia/Dhaka",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-outline-variant/10 py-12 px-margin-mobile md:px-margin-desktop bg-surface-container-lowest transition-all duration-300">
      <div className="max-w-container-max mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div>
          <div className="font-label-mono text-label-mono text-primary uppercase tracking-widest mb-3 font-bold">
            Asif Shahriar Tauhid
          </div>
          <p className="font-body-md text-sm text-on-surface-variant max-w-md leading-relaxed">
            Designing & engineering web systems with absolute precision, performance, and responsive architecture.
          </p>
        </div>

        {/* Technical metadata table */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 font-label-mono text-xs text-on-surface-variant">
          <div>
            <span className="text-primary block mb-1 uppercase tracking-wider">LOC //</span>
            <span className="text-on-surface font-medium">DHAKA, BGD</span>
          </div>
          <div>
            <span className="text-primary block mb-1 uppercase tracking-wider">TIME //</span>
            <span className="text-on-surface font-medium">{time} (GMT+6)</span>
          </div>
          <div>
            <span className="text-primary block mb-1 uppercase tracking-wider">STACK //</span>
            <span className="text-on-surface font-medium">PERN</span>
          </div>
        </div>
      </div>

      <div className="max-w-container-max mx-auto border-t border-outline-variant/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs font-label-mono text-on-surface-variant gap-4">
        <span>© {currentYear} {personalInfo.name}. All rights reserved.</span>
        <span className="uppercase tracking-widest text-primary/80">DESIGNED & CODED BY TAUHID</span>
      </div>
    </footer>
  );
}
