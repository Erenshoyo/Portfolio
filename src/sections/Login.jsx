import { useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff, ArrowRight } from "lucide-react";

export default function Login({ setView }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }

      // Login success, redirect to dashboard view
      setView("dashboard");
    } catch (err) {
      setErrorMsg(err.message || "Invalid authentication response.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-16 pb-24 px-margin-mobile relative">
      <div className="absolute inset-0 technical-grid pointer-events-none opacity-30"></div>
      <div className="absolute inset-0 grain-overlay pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-md w-full border border-outline-variant/20 rounded p-8 bg-surface-container-lowest/50 backdrop-blur-md relative z-10"
      >
        {/* Custom sharp corner markers */}
        <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-primary"></div>
        <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-primary"></div>
        <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-primary"></div>
        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-primary"></div>

        <div className="text-center mb-8">
          <span className="font-label-mono text-xs uppercase tracking-widest text-primary font-bold block mb-2">
            CONSOLE_GATE // AUTH_REQUIRED
          </span>
          <h1 className="font-display-lg text-2xl sm:text-3xl text-on-surface font-bold">
            Administrative Access
          </h1>
          <p className="font-body-md text-xs sm:text-sm text-on-surface-variant mt-2 leading-relaxed">
            Please log in with secure database credentials to edit website configurations.
          </p>
        </div>

        {errorMsg && (
          <div className="mb-6 p-4 border border-error/20 bg-error/5 rounded text-xs font-label-mono text-error">
            <span className="font-bold uppercase block mb-1">[ERR_AUTH_FAILED]</span>
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email input field */}
          <div className="space-y-1.5">
            <label className="font-label-mono text-[10px] uppercase tracking-wider text-on-surface-variant block">
              Identity Email
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/70" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@domain.com"
                className="w-full bg-surface-container border border-outline-variant/20 focus:border-primary/50 outline-none rounded pl-10 pr-4 py-2.5 text-sm font-body-md text-on-surface transition-colors placeholder:text-on-surface-variant/30"
              />
            </div>
          </div>

          {/* Password input field */}
          <div className="space-y-1.5">
            <label className="font-label-mono text-[10px] uppercase tracking-wider text-on-surface-variant block">
              System Code Key
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant/70" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-surface-container border border-outline-variant/20 focus:border-primary/50 outline-none rounded pl-10 pr-10 py-2.5 text-sm font-body-md text-on-surface transition-colors placeholder:text-on-surface-variant/30"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant/70 hover:text-on-surface"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary hover:opacity-95 text-background font-ui-element text-sm font-bold py-3 px-4 rounded flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {isLoading ? "Validating credentials..." : "Initialize Dashboard Session"}
            {!isLoading && <ArrowRight size={16} />}
          </button>
        </form>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setView("main")}
            className="font-label-mono text-[10px] text-on-surface-variant hover:text-primary uppercase tracking-widest transition-colors"
          >
            Abort Console Connection
          </button>
        </div>
      </motion.div>
    </div>
  );
}
