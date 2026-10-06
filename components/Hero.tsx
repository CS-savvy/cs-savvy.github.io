"use client";

import { motion } from "framer-motion";

const proofSignals = [
  { value: "8+", label: "Years Building\nML Systems" },
  { value: "5", label: "Filed\nPatents" },
  { value: "2", label: "Published\nResearch Papers" },
  { value: "50+", label: "Projects & POCs\nCompleted" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.21, 0.47, 0.32, 0.98] },
});

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-zinc-950"
    >
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      {/* Radial fade to hide grid edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 0%, #09090b 70%)",
        }}
      />

      {/* Glow orbs */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "15%",
          left: "25%",
          width: 700,
          height: 700,
          background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 65%)",
          borderRadius: "50%",
          filter: "blur(1px)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: "20%",
          right: "20%",
          width: 500,
          height: 500,
          background: "radial-gradient(circle, rgba(139,92,246,0.055) 0%, transparent 65%)",
          borderRadius: "50%",
          filter: "blur(1px)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 pt-28 pb-20 text-center">
        {/* Available badge */}
        <motion.div {...fadeUp(0)} className="mb-8">
          <span
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full text-sm text-zinc-300 font-medium"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.09)",
              backdropFilter: "blur(8px)",
            }}
          >
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            Available for consulting &amp; freelance projects
          </span>
        </motion.div>

        {/* Name */}
        <motion.h1
          {...fadeUp(0.1)}
          className="text-6xl sm:text-7xl lg:text-[92px] font-bold tracking-tight leading-none mb-4 text-gradient-hero"
        >
          Mukul Kumar
        </motion.h1>

        {/* Role */}
        <motion.p
          {...fadeUp(0.2)}
          className="text-2xl sm:text-3xl font-medium mb-6"
          style={{
            background: "linear-gradient(90deg, #818cf8 0%, #a78bfa 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Applied AI Engineer
        </motion.p>

        {/* Description */}
        <motion.p
          {...fadeUp(0.3)}
          className="text-lg text-zinc-500 max-w-2xl mx-auto mb-14 leading-relaxed"
        >
          Specializing in{" "}
          <span className="text-zinc-300 font-medium">Computer Vision</span>,{" "}
          <span className="text-zinc-300 font-medium">NLP</span>, and{" "}
          <span className="text-zinc-300 font-medium">Production ML Systems</span>.
          Senior Data Scientist with 8+ years building enterprise-grade AI that ships, scales,
          and delivers measurable impact. MTech AI at BITS Pilani.
        </motion.p>

        {/* Proof signals */}
        <motion.div
          {...fadeUp(0.4)}
          className="inline-flex flex-wrap justify-center gap-0 mb-14 rounded-2xl overflow-hidden"
          style={{
            border: "1px solid rgba(255,255,255,0.07)",
            background: "rgba(255,255,255,0.025)",
            backdropFilter: "blur(8px)",
          }}
        >
          {proofSignals.map((signal, i) => (
            <div
              key={signal.value}
              className="text-center px-8 py-5 relative"
              style={{
                borderRight: i < proofSignals.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
              }}
            >
              <div
                className="text-3xl sm:text-4xl font-bold mb-1.5 tabular-nums"
                style={{
                  background: "linear-gradient(135deg, #ffffff 0%, #c7d2fe 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {signal.value}
              </div>
              <div className="text-xs text-zinc-500 whitespace-pre-line leading-snug">
                {signal.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.5)}
          className="flex flex-wrap justify-center gap-3"
        >
          <a href="#projects" className="btn-primary">
            View Projects
          </a>
          <a href="#contact" className="btn-secondary">
            Hire Me
          </a>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-zinc-500 hover:text-zinc-300 transition-colors duration-200"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
            </svg>
            Resume
          </a>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-600"
      >
        <span className="text-[9px] uppercase tracking-[0.25em] font-semibold">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
