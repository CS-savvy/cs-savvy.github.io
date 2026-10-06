"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

type ResearchItem = {
  type: "patent" | "paper";
  title: string;
  description: string;
  tags: string[];
  venue?: string;
  status?: string;
};

const items: ResearchItem[] = [
  {
    type: "paper",
    title: "Graph Attention Networks for Efficient Text Line Detection on Receipt-Layout Documents",
    description:
      "Proposed a GAT-based approach to model spatial relationships between text elements in receipts, enabling robust text line detection and layout understanding across diverse receipt formats. Presented at the Document Intelligence Workshop, KDD 2022, Washington DC.",
    tags: ["Graph Neural Networks", "Document AI", "OCR", "Layout Analysis"],
    venue: "KDD 2022 Workshop · Washington DC",
  },
  {
    type: "paper",
    title: "A Novel Artificial-Intelligence-Based Approach for Classification of Parkinson's Disease Using Complex and Large Vocal Features",
    description:
      "Developed a Transformer-based model for non-invasive early detection of Parkinson's disease using acoustic and vocal biomarkers extracted from speech recordings. Outperforms traditional ML baselines across all evaluation metrics.",
    tags: ["Transformers", "Healthcare AI", "Signal Processing", "PyTorch"],
    venue: "MDPI Biomimetics · July 2023",
  },
  {
    type: "patent",
    title: "Methods, System, Apparatus and Articles of Manufacture to Detect Lines on Documents",
    description:
      "Patent covering detection and classification of text lines in receipt-layout documents using graph-based spatial reasoning and deep learning inference pipelines.",
    tags: ["Document AI", "Graph Neural Networks", "OCR", "Layout Detection"],
    status: "US81259087 · Jun 2022",
  },
  {
    type: "patent",
    title: "Automatic Document Content Extraction and Decoding",
    description:
      "Patent covering the end-to-end pipeline for automated extraction and interpretation of structured information from unstructured document formats using AI and NLP.",
    tags: ["Document AI", "NLP", "OCR", "Information Extraction"],
    status: "US81254014 · Jun 2021",
  },
  {
    type: "patent",
    title: "Automated Extraction of Purchased Items from Receipt Images",
    description:
      "Patent on extracting individual line items — product description, quantity, and price — from printed receipt images using computer vision and deep learning techniques.",
    tags: ["Computer Vision", "Receipt AI", "Deep Learning", "NLP"],
    status: "Filed · Jun 2021",
  },
  {
    type: "patent",
    title: "Automated Receipt Decoding: Product Matching and Dictionaries",
    description:
      "Patent on automated receipt decoding in DDS, covering product matching algorithms and dictionary-based normalization for structured extraction of receipt content.",
    tags: ["NLP", "Product Matching", "Information Extraction", "Document AI"],
    status: "Filed · Jun 2021",
  },
  {
    type: "patent",
    title: "Method and System to Detect Distance Between Entities",
    description:
      "Patent covering the multi-camera system for real-time measurement of inter-person distances using homography projection and deep learning-based person detection for social distancing compliance.",
    tags: ["Computer Vision", "Edge AI", "DeepStream", "Safety Systems"],
    status: "202021034381 · Aug 2020",
  },
];

export default function Research() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="research" className="py-32 px-6 bg-zinc-950">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-label mb-3">Research & IP</p>
          <h2 className="section-heading mb-5">Publications & Patents</h2>
          <p className="text-zinc-500 max-w-2xl text-lg leading-relaxed">
            2 published research papers and 5 filed patents — original IP from building
            production AI systems, not theoretical exercises.
          </p>
        </motion.div>

        {/* Items */}
        <div className="grid md:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07 }}
              className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: item.type === "paper"
                  ? "linear-gradient(135deg, rgba(14,165,233,0.04) 0%, rgba(24,24,27,0.6) 100%)"
                  : "linear-gradient(135deg, rgba(245,158,11,0.04) 0%, rgba(24,24,27,0.6) 100%)",
                border: item.type === "paper"
                  ? "1px solid rgba(14,165,233,0.12)"
                  : "1px solid rgba(245,158,11,0.12)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px rgba(0,0,0,0.3)";
                (e.currentTarget as HTMLElement).style.borderColor = item.type === "paper"
                  ? "rgba(14,165,233,0.25)"
                  : "rgba(245,158,11,0.25)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "";
                (e.currentTarget as HTMLElement).style.borderColor = item.type === "paper"
                  ? "rgba(14,165,233,0.12)"
                  : "rgba(245,158,11,0.12)";
              }}
            >
              {/* Type badge */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider border ${
                    item.type === "patent"
                      ? "bg-amber-500/10 text-amber-400 border-amber-500/25"
                      : "bg-sky-500/10 text-sky-400 border-sky-500/25"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      item.type === "patent" ? "bg-amber-400" : "bg-sky-400"
                    }`}
                  />
                  {item.type === "patent" ? "Patent" : "Research Paper"}
                </span>
                {item.venue && (
                  <span className="text-xs text-zinc-500 font-medium">{item.venue}</span>
                )}
                {item.status && (
                  <span className="text-xs text-zinc-500 font-medium">{item.status}</span>
                )}
              </div>

              <h3 className="text-sm font-semibold text-white mb-3 leading-snug">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-500 leading-relaxed mb-4">{item.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 rounded-full text-zinc-400 font-medium"
                    style={{
                      background: "rgba(255,255,255,0.05)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
