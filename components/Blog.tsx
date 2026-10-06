"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const posts = [
  {
    title: "Optimizing OCR Pipelines Using TensorRT",
    excerpt:
      "How we reduced inference latency by 60% on a production OCR system processing millions of receipts — the exact techniques, trade-offs, and lessons learned.",
    date: "Coming Soon",
    readTime: "8 min read",
    tags: ["OCR", "TensorRT", "Optimization"],
    accentColor: "#6366f1",
    tagClass: "bg-indigo-500/8 text-indigo-300 border-indigo-500/15",
    dotColor: "bg-indigo-400",
  },
  {
    title: "Lessons from Deploying CV Models on 40+ Cameras",
    excerpt:
      "What nobody tells you about edge AI at scale. Camera calibration, model drift, hardware failures, and why the deployment phase takes longer than training.",
    date: "Coming Soon",
    readTime: "10 min read",
    tags: ["Computer Vision", "Edge AI", "DeepStream"],
    accentColor: "#10b981",
    tagClass: "bg-emerald-500/8 text-emerald-300 border-emerald-500/15",
    dotColor: "bg-emerald-400",
  },
  {
    title: "Why Document AI Fails in Production",
    excerpt:
      "The gap between benchmark accuracy and real-world performance in document intelligence. Layout variance, multi-language edge cases, and how to design for them.",
    date: "Coming Soon",
    readTime: "7 min read",
    tags: ["Document AI", "Production ML", "NLP"],
    accentColor: "#8b5cf6",
    tagClass: "bg-violet-500/8 text-violet-300 border-violet-500/15",
    dotColor: "bg-violet-400",
  },
  {
    title: "Graph Neural Networks for Document Understanding",
    excerpt:
      "A practical walkthrough of using GATs to model spatial relationships between text regions — with code, architecture diagrams, and performance results.",
    date: "Coming Soon",
    readTime: "12 min read",
    tags: ["GNNs", "Document AI", "PyTorch"],
    accentColor: "#f59e0b",
    tagClass: "bg-amber-500/8 text-amber-300 border-amber-500/15",
    dotColor: "bg-amber-400",
  },
];

export default function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="blog" className="py-32 px-6" style={{ background: "rgba(18,18,20,0.4)" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-3">Writing</p>
          <h2 className="section-heading mb-5">Technical Insights</h2>
          <p className="text-zinc-500 max-w-2xl text-lg leading-relaxed">
            Practical lessons from building production AI systems. No theory — only what
            actually works (and what doesn&apos;t) in the real world.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              className="group relative rounded-2xl p-6 cursor-default transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "rgba(24,24,27,0.6)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = `${post.accentColor}30`;
                (e.currentTarget as HTMLElement).style.boxShadow = `0 16px 40px rgba(0,0,0,0.3), 0 0 20px ${post.accentColor}06`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-[10px] px-2.5 py-0.5 rounded-full font-semibold border uppercase tracking-wider ${post.tagClass}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h3 className="text-base font-semibold text-white mb-3 leading-snug group-hover:text-indigo-200 transition-colors duration-300">
                {post.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed mb-5">{post.excerpt}</p>

              <div className="flex items-center justify-between text-xs text-zinc-600">
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${post.dotColor}`} />
                  {post.date}
                </div>
                <span>{post.readTime}</span>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Coming soon notice */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center text-zinc-600 text-sm mt-8"
        >
          Articles launching soon. Follow on{" "}
          <a
            href="https://www.linkedin.com/in/mukulkr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors underline underline-offset-2"
          >
            LinkedIn
          </a>{" "}
          for updates.
        </motion.p>
      </div>
    </section>
  );
}
