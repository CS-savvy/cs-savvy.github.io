"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type Project = {
  number: string;
  badge: string;
  title: string;
  category: string;
  description: string;
  problem: string;
  approach: string;
  stack: string[];
  metrics: { value: string; label: string }[];
  highlights: string[];
  accentColor: string;
  metricColor: string;
  badgeClass: string;
  dotColor: string;
  glowColor: string;
};

const projects: Project[] = [
  {
    number: "01",
    badge: "Flagship · 4 Patents Filed",
    title: "Receipt Intelligence System",
    category: "Document AI · Computer Vision · NLP",
    description:
      "End-to-end document intelligence pipeline for automated extraction of structured data from millions of diverse receipt formats across 10+ countries.",
    problem:
      "Enterprises needed accurate, scalable extraction from highly variable receipt layouts — different languages, currencies, and merchant formats.",
    approach:
      "Combined OCR preprocessing, Graph Attention Networks for layout understanding, and NER pipelines for entity extraction. Optimized with TensorRT for production inference.",
    stack: ["PyTorch", "TensorRT", "Graph Attention Networks", "OCR", "NER", "Triton", "Docker"],
    metrics: [
      { value: "94%+", label: "Extraction Accuracy" },
      { value: "60%", label: "Latency Reduction" },
      { value: "4", label: "Patents Filed" },
    ],
    highlights: [
      "Graph Attention Networks for receipt layout detection",
      "Multi-language OCR with custom preprocessing pipeline",
      "NER pipeline for key-field extraction",
      "TensorRT optimization for production inference",
      "Deployed and serving across 10+ countries",
    ],
    accentColor: "#6366f1",
    metricColor: "text-indigo-400",
    badgeClass: "text-indigo-300 bg-indigo-500/10 border-indigo-500/30",
    dotColor: "bg-indigo-400",
    glowColor: "rgba(99,102,241,0.06)",
  },
  {
    number: "02",
    badge: "Edge AI · Multi-Camera Scale",
    title: "Real-Time Social Distancing Monitor",
    category: "Computer Vision · Edge AI · Deployment",
    description:
      "Large-scale CCTV monitoring system for automated compliance detection, deployed on 40+ cameras with real-time edge inference and sub-100ms latency.",
    problem:
      "Organizations needed reliable, real-time monitoring across distributed camera networks without cloud latency or data-privacy concerns.",
    approach:
      "NVIDIA DeepStream pipeline on Jetson edge devices with homography-based distance estimation, spatial zone mapping, and a distributed alert system.",
    stack: ["DeepStream", "TensorRT", "YOLO", "NVIDIA Jetson", "OpenCV", "CUDA", "Python"],
    metrics: [
      { value: "40+", label: "Cameras Deployed" },
      { value: "<100ms", label: "Inference Latency" },
      { value: "12×", label: "GPU vs CPU Speedup" },
    ],
    highlights: [
      "Multi-camera real-time processing pipeline",
      "Edge deployment on NVIDIA Jetson devices",
      "DeepStream for high-throughput inference",
      "Custom homography-based distance estimation",
      "Distributed alert and spatial zone management",
    ],
    accentColor: "#10b981",
    metricColor: "text-emerald-400",
    badgeClass: "text-emerald-300 bg-emerald-500/10 border-emerald-500/30",
    dotColor: "bg-emerald-400",
    glowColor: "rgba(16,185,129,0.05)",
  },
  {
    number: "03",
    badge: "Research · MDPI Biomimetics 2023",
    title: "Parkinson's Disease Classifier",
    category: "Healthcare AI · Transformers · Research",
    description:
      "Transformer-based classification model for early Parkinson's detection using vocal biomarkers. Achieved 97.2% accuracy, published in MDPI Biomimetics, July 2023.",
    problem:
      "Early Parkinson's detection requires expensive clinical assessments. Objective, non-invasive screening using voice biomarkers could democratize access.",
    approach:
      "Fine-tuned Transformer architectures on voice recordings, with novel feature engineering from acoustic biomarkers. Evaluated on open benchmarks against traditional ML baselines.",
    stack: ["Transformers", "PyTorch", "Signal Processing", "scikit-learn", "librosa", "Python"],
    metrics: [
      { value: "97.2%", label: "Classification Accuracy" },
      { value: "0.96", label: "F1 Score" },
      { value: "MDPI '23", label: "Publication Venue" },
    ],
    highlights: [
      "Transformer architecture for acoustic biomarker time-series",
      "Novel feature engineering from complex vocal biomarkers",
      "Outperforms traditional ML baselines across all metrics",
      "Published in MDPI Biomimetics, July 2023",
      "Evaluated on open, public benchmark datasets",
    ],
    accentColor: "#8b5cf6",
    metricColor: "text-violet-400",
    badgeClass: "text-violet-300 bg-violet-500/10 border-violet-500/30",
    dotColor: "bg-violet-400",
    glowColor: "rgba(139,92,246,0.06)",
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="py-32 px-6 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-3">Selected Work</p>
          <h2 className="section-heading mb-5">Featured Projects</h2>
          <p className="text-zinc-500 max-w-2xl text-lg leading-relaxed">
            Deep case studies on production AI systems — from patent-filed document intelligence
            to real-time edge deployment at scale.
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="flex flex-col gap-5">
          {projects.map((project, i) => (
            <motion.article
              key={project.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
              className="relative rounded-2xl border border-zinc-800/60 overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-2xl"
              style={{
                background: "rgba(24,24,27,0.5)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)`;
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "";
                (e.currentTarget as HTMLElement).style.borderColor = "";
              }}
            >
              {/* Accent top border */}
              <div
                className="absolute top-0 inset-x-0 h-[2px]"
                style={{
                  background: `linear-gradient(90deg, ${project.accentColor}00 0%, ${project.accentColor}cc 40%, ${project.accentColor}80 70%, ${project.accentColor}00 100%)`,
                }}
              />

              {/* Subtle glow */}
              <div
                className="absolute top-0 inset-x-0 h-32 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse 60% 100% at 50% 0%, ${project.glowColor} 0%, transparent 100%)`,
                }}
              />

              <div className="relative p-8 lg:p-10">
                <div className="flex flex-col xl:flex-row gap-8">
                  {/* Main content */}
                  <div className="flex-1 min-w-0">
                    {/* Header row */}
                    <div className="flex flex-col sm:flex-row sm:items-start gap-4 mb-5">
                      <span className="text-6xl font-bold leading-none select-none flex-shrink-0" style={{ color: `${project.accentColor}20` }}>
                        {project.number}
                      </span>
                      <div className="min-w-0">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border mb-2.5 ${project.badgeClass}`}
                        >
                          {project.badge}
                        </span>
                        <h3 className="text-2xl font-bold text-white leading-tight">
                          {project.title}
                        </h3>
                        <p className="text-sm text-zinc-500 mt-1 font-medium">{project.category}</p>
                      </div>
                    </div>

                    <p className="text-zinc-400 mb-6 leading-relaxed">{project.description}</p>

                    {/* Problem / Approach */}
                    <div className="grid sm:grid-cols-2 gap-3 mb-6">
                      <div
                        className="rounded-xl p-4"
                        style={{
                          background: "rgba(9,9,11,0.5)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">
                          Problem
                        </p>
                        <p className="text-sm text-zinc-400 leading-relaxed">{project.problem}</p>
                      </div>
                      <div
                        className="rounded-xl p-4"
                        style={{
                          background: "rgba(9,9,11,0.5)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">
                          Approach
                        </p>
                        <p className="text-sm text-zinc-400 leading-relaxed">{project.approach}</p>
                      </div>
                    </div>

                    {/* Stack */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-3 py-1.5 rounded-full font-medium text-zinc-400"
                          style={{
                            background: "rgba(255,255,255,0.05)",
                            border: "1px solid rgba(255,255,255,0.08)",
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Highlights */}
                    <ul className="space-y-2">
                      {project.highlights.map((item) => (
                        <li key={item} className="flex items-start gap-2.5 text-sm text-zinc-500">
                          <span
                            className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${project.dotColor}`}
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Metrics column */}
                  <div className="xl:w-44 flex xl:flex-col gap-3 flex-wrap">
                    {project.metrics.map((metric) => (
                      <div
                        key={metric.label}
                        className="flex-1 xl:flex-none rounded-xl p-4 text-center min-w-[100px] transition-all duration-200"
                        style={{
                          background: `linear-gradient(135deg, ${project.accentColor}08 0%, rgba(9,9,11,0.6) 100%)`,
                          border: `1px solid ${project.accentColor}20`,
                        }}
                      >
                        <div className={`text-2xl font-bold mb-1.5 tabular-nums ${project.metricColor}`}>
                          {metric.value}
                        </div>
                        <div className="text-xs text-zinc-500 leading-snug">{metric.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
