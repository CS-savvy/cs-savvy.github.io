/**
 * All site content lives here. Edit this file to update the portfolio —
 * no component changes required.
 *
 * Entries marked `TODO` are starting-point copy: replace them with your own
 * details before publishing.
 */

export type Social = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "x" | "scholar" | "mail";
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string[];
  tags: string[];
  year: string;
  highlights?: string[];
  links?: { label: string; href: string }[];
  featured?: boolean;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  points: string[];
};

export const site = {
  name: "Mukul",
  role: "Deep Learning Engineer",
  url: "https://cs-savvy.vercel.app", // TODO: set to your production domain
  // TODO: refine your headline and bio
  headline: "I build and ship deep learning systems — from research prototype to production.",
  intro:
    "Deep Learning Engineer focused on computer vision, NLP and efficient model deployment. I enjoy turning messy real-world data into models that are fast, reliable and measurable.",
  about: [
    "I work across the full ML lifecycle: framing the problem, curating data, training and evaluating models, and getting them running efficiently in production.",
    "I care about the unglamorous parts that make models useful — clean data pipelines, reproducible experiments, honest evaluation and inference that fits the latency and cost budget.",
  ],
  resumeUrl: "/resume/mukul-resume.pdf",
  location: "", // TODO: e.g. "Bengaluru, India"
  availability: "Open to new opportunities",
  socials: [
    { label: "GitHub", href: "https://github.com/CS-savvy", icon: "github" },
    // TODO: add your profiles
    // { label: "LinkedIn", href: "https://www.linkedin.com/in/<you>", icon: "linkedin" },
    // { label: "Google Scholar", href: "https://scholar.google.com/citations?user=<id>", icon: "scholar" },
  ] as Social[],
};

export const skills: { group: string; items: string[] }[] = [
  { group: "Deep Learning", items: ["PyTorch", "TensorFlow / Keras", "JAX", "Hugging Face", "Lightning"] },
  { group: "Domains", items: ["Computer Vision", "NLP & LLMs", "Representation Learning", "Model Compression"] },
  { group: "MLOps & Deployment", items: ["ONNX / TensorRT", "Triton", "Docker", "Kubernetes", "MLflow / W&B"] },
  { group: "Engineering", items: ["Python", "C++", "CUDA", "SQL", "FastAPI", "TypeScript"] },
];

// TODO: replace these with your real projects. Each one gets its own page at /projects/<slug>.
export const projects: Project[] = [
  {
    slug: "realtime-object-detection",
    title: "Real-time Object Detection on Edge",
    summary: "Optimised a detection model for edge GPUs with quantisation and TensorRT, hitting real-time throughput.",
    description: [
      "Trained and fine-tuned a single-stage detector on a domain-specific dataset, then compressed it for deployment on embedded GPUs.",
      "Applied post-training quantisation and layer fusion via TensorRT and validated accuracy against the FP32 baseline at every step.",
    ],
    tags: ["Computer Vision", "PyTorch", "TensorRT", "Quantisation"],
    year: "2025",
    highlights: ["INT8 inference with minimal accuracy loss", "End-to-end export pipeline: PyTorch → ONNX → TensorRT"],
    featured: true,
  },
  {
    slug: "document-understanding",
    title: "Document Understanding Pipeline",
    summary: "Layout-aware transformer for extracting structured fields from scanned documents.",
    description: [
      "Built an OCR + layout-aware transformer pipeline that turns scanned forms into structured JSON.",
      "Set up a labelling workflow, active-learning loop and per-field evaluation dashboard.",
    ],
    tags: ["NLP", "Transformers", "OCR", "Hugging Face"],
    year: "2024",
    highlights: ["Active learning cut labelling effort", "Per-field precision/recall tracking"],
    featured: true,
  },
  {
    slug: "llm-retrieval-assistant",
    title: "Retrieval-Augmented Assistant",
    summary: "RAG system over internal knowledge with hybrid search, reranking and offline evals.",
    description: [
      "Designed a retrieval-augmented generation service combining dense and sparse retrieval with a cross-encoder reranker.",
      "Built an offline evaluation harness to measure answer faithfulness and retrieval recall before each release.",
    ],
    tags: ["LLMs", "RAG", "Vector Search", "FastAPI"],
    year: "2024",
    highlights: ["Hybrid BM25 + dense retrieval", "Automated regression evals in CI"],
  },
];

// TODO: add your work history. The Experience section is hidden while this list is empty.
export const experience: Experience[] = [
  // {
  //   role: "Deep Learning Engineer",
  //   company: "Company",
  //   period: "2022 — Present",
  //   points: ["What you built and the impact it had."],
  // },
];

export const nav = [
  { label: "About", href: "/#about" },
  { label: "Skills", href: "/#skills" },
  { label: "Projects", href: "/#projects" },
  ...(experience.length ? [{ label: "Experience", href: "/#experience" }] : []),
  { label: "Contact", href: "/#contact" },
];
