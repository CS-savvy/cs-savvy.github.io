"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const categories = [
  {
    title: "AI & Machine Learning",
    items: [
      "PyTorch",
      "TensorFlow",
      "Transformers (HuggingFace)",
      "Diffusion Models",
      "Graph Neural Networks",
      "Reinforcement Learning",
      "scikit-learn",
      "XGBoost",
    ],
    tagClass: "bg-indigo-500/8 text-indigo-300 border-indigo-500/15 hover:bg-indigo-500/15 hover:border-indigo-500/25",
    accentColor: "#6366f1",
  },
  {
    title: "Computer Vision",
    items: [
      "OpenCV",
      "NVIDIA DeepStream",
      "TensorRT",
      "YOLO (v5–v10)",
      "Detectron2",
      "SAM",
      "ControlNet",
      "Stable Diffusion",
    ],
    tagClass: "bg-emerald-500/8 text-emerald-300 border-emerald-500/15 hover:bg-emerald-500/15 hover:border-emerald-500/25",
    accentColor: "#10b981",
  },
  {
    title: "NLP & Document AI",
    items: [
      "Named Entity Recognition",
      "Knowledge Graphs",
      "Coreference Resolution",
      "OCR Pipelines",
      "LangChain / RAG",
      "spaCy",
      "NLTK",
      "Document Layout Analysis",
    ],
    tagClass: "bg-violet-500/8 text-violet-300 border-violet-500/15 hover:bg-violet-500/15 hover:border-violet-500/25",
    accentColor: "#8b5cf6",
  },
  {
    title: "Infrastructure & MLOps",
    items: [
      "Docker",
      "NVIDIA Triton",
      "TF Serving",
      "AWS (EC2, S3, SageMaker)",
      "GCP (Vertex AI)",
      "Kubernetes",
      "CUDA / cuDNN",
      "MLflow",
    ],
    tagClass: "bg-amber-500/8 text-amber-300 border-amber-500/15 hover:bg-amber-500/15 hover:border-amber-500/25",
    accentColor: "#f59e0b",
  },
];

export default function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="stack" className="py-32 px-6" style={{ background: "rgba(18,18,20,0.4)" }}>
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-3">Capabilities</p>
          <h2 className="section-heading mb-5">Technical Depth</h2>
          <p className="text-zinc-500 max-w-2xl text-lg leading-relaxed">
            Organized by capability — not thrown on a page as a sticker collection.
          </p>
        </motion.div>

        {/* Category grid */}
        <div className="grid sm:grid-cols-2 gap-4">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              className="rounded-2xl p-6"
              style={{
                background: "rgba(24,24,27,0.6)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <h3 className="text-sm font-semibold text-zinc-400 mb-4 flex items-center gap-2.5 uppercase tracking-wider">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: cat.accentColor, boxShadow: `0 0 6px ${cat.accentColor}80` }}
                />
                {cat.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-all duration-200 cursor-default ${cat.tagClass}`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Languages bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-4 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center gap-4"
          style={{
            background: "rgba(24,24,27,0.6)",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <span className="text-xs font-semibold text-zinc-500 flex-shrink-0 uppercase tracking-widest">
            Languages
          </span>
          <div className="flex flex-wrap gap-2">
            {["Python", "TypeScript", "C++", "CUDA", "SQL", "Bash"].map((lang) => (
              <span
                key={lang}
                className="text-xs px-3 py-1.5 rounded-full font-semibold text-zinc-300 transition-colors duration-200 hover:text-white cursor-default"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                {lang}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
