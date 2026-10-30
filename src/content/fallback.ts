/**
 * Fallback content, used until the Sanity dataset has a "Site settings" document.
 * It is also the seed data for `npm run seed` (scripts/seed-sanity.ts).
 * Once the CMS is seeded, edit content in the Studio at /studio instead.
 */

import type { ProcessStep, Project, Resume, RichText, Service, SiteSettings, Social, Testimonial } from "./types";

/** Turns plain paragraphs into Portable Text blocks. */
export function paragraphs(texts: string[]): RichText {
  return texts.map((text, i) => ({
    _type: "block",
    _key: `p${i}`,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `p${i}s`, text, marks: [] }],
  }));
}

export const googleScholarSocial: Social = {
  label: "Google Scholar",
  href: "https://scholar.google.com/citations?user=_BdkQGkAAAAJ",
  icon: "scholar",
};

export const fallbackSettings: SiteSettings = {
  name: "Mukul Kumar",
  role: "Computer Vision & Document AI Consultant",
  url: "https://mukulkumar.dev",
  heroTitle: "Production computer vision and document AI — accurate, fast, and cheap to run.",
  headline:
    "I help product and engineering teams ship ML systems that are accurate, fast at inference and cheap to run — 8 years taking CV and document AI to production, 5 patents filed.",
  intro:
    "Independent computer vision & document AI consultant. I help engineering and product teams take ML from prototype to production: accurate models, fast inference, lower GPU cost. 8 years in applied ML, 5 patents filed.",
  aboutTitle: "Hi, I'm Mukul.",
  about: paragraphs([
    "I help product and engineering teams turn computer vision and document AI ideas into production systems. Over 8 years I've taken deep learning from research to production - most recently automating vehicle damage assessment for insurance claims, and before that, extracting structured data from scanned receipts in a system deployed across multiple countries.",
    "I work across the whole lifecycle: framing the problem, building and evaluating models on your data, and making inference fit your latency and cost budget with TensorRT, Triton and DeepStream. After launch I set up the unglamorous parts that keep models useful - clean data pipelines, honest evaluation, drift monitoring and retraining.",
    "My research background - 5 filed patents and 2 peer-reviewed papers, including a lightweight graph-attention text line detector presented at the KDD Document Intelligence Workshop - means I can bring current methods to your problem when they help, and skip them when a simpler model will do.",
  ]),
  stats: [
    { value: "45%", label: "Lower manual inspection costs" },
    { value: "30%", label: "Lower annotation costs per year" },
    { value: "100–200×", label: "Smaller model at state-of-the-art accuracy" },
    { value: "8", label: "Years shipping ML to production" },
  ],
  resumeUrl: "/resume/mukul-resume.pdf",
  location: "Bengaluru, India — working with teams in the US, EU and India, async-friendly",
  email: "contact@mukulkumar.dev",
  focus: "Computer vision · Document AI · Inference optimization",
  engagements: "[TODO: e.g. Fixed-scope audits, project builds, fractional ML lead]",
  bookingUrl: undefined, // [TODO: Cal.com / Calendly URL] - set "Booking link" in Site settings
  contactBlurb:
    "Have a computer vision, document AI or inference problem? Tell me about the project, timeline and constraints - I'll reply within [TODO: e.g. 2 business days].",
  availability: "Available for consulting engagements",
  socials: [
    { label: "GitHub", href: "https://github.com/CS-savvy", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mukulkr", icon: "linkedin" },
    googleScholarSocial,
    { label: "Email", href: "mailto:contact@mukulkumar.dev", icon: "mail" },
  ],
  sideProjects: [
    {
      title: "LEHO",
      href: "https://leho.in",
      description: "Website for the Ladakh Environment and Health Organization, a Leh-based NGO working on community development and climate adaptation.",
    },
    {
      title: "Voyager Ladakh",
      href: "https://voyagerladakh.com",
      description: "Website for a Leh-based travel company running treks, expeditions and motorbike tours across Ladakh.",
    },
  ],
  process: [],
  headings: {},
};

/** Default "How I work" strip, used when Site settings has no process steps. */
export const fallbackProcess: ProcessStep[] = [
  {
    title: "Discover",
    description:
      "Understand the business goal, the data and the constraints - accuracy, latency, cost. Agree on success metrics up front.",
  },
  {
    title: "Build",
    description: "Prototype quickly, evaluate honestly on your own data, and iterate toward a model worth shipping.",
  },
  {
    title: "Optimize",
    description: "Make it fast and cheap to run - TensorRT, ONNX, Triton, batching and quantization where they pay off.",
  },
  {
    title: "Hand over",
    description: "Documentation, monitoring and retraining playbooks, and knowledge transfer so your team owns it.",
  },
];

export const fallbackServices: Service[] = [
  {
    id: "service-inference-optimization-audit",
    title: "Inference optimization audit",
    audience:
      "Teams whose models work but are too slow or too expensive to serve - high GPU bills, missed latency targets, or a model that doesn't fit the target device.",
    deliverables: [
      "Profiling of your serving path, from pre-processing to GPU utilisation",
      "Optimization plan and prototypes with TensorRT, ONNX and Triton",
      "Benchmark report: latency, throughput and cost per inference, before and after",
    ],
    timeline: "[TODO: e.g. 2–3 weeks]",
    proof: "TensorRT-optimised models shipped in insurance, document and video-analytics systems.",
    ctaLabel: "Discuss this",
  },
  {
    id: "service-document-ai-ocr",
    title: "Document AI & OCR pipelines",
    audience:
      "Companies processing receipts, invoices or forms at volume who need structured data out of messy scans and photos.",
    deliverables: [
      "Pipeline design: text detection, OCR, line grouping and entity extraction",
      "An evaluation set and field-level accuracy metrics on your own documents",
      "A production-ready service with confidence scores for human review",
    ],
    timeline: "[TODO: e.g. 6–10 weeks]",
    proof: "Backed by 4 filed patents and a KDD workshop paper on receipt extraction.",
    ctaLabel: "Discuss this",
  },
  {
    id: "service-computer-vision-production",
    title: "Computer vision: PoC to production",
    audience:
      "Product teams with an inspection, damage-detection or video-analytics idea - or a prototype that hasn't made it to production yet.",
    deliverables: [
      "Feasibility check and a data and labelling strategy, including self-supervised pre-training",
      "Model development with honest evaluation on held-out data",
      "Deployment to cloud, edge or live video streams, with monitoring",
    ],
    timeline: "[TODO: e.g. 8–12 weeks]",
    proof: "Vehicle damage assessment for insurance and real-time analytics on 40+ CCTV cameras.",
    ctaLabel: "Discuss this",
  },
  {
    id: "service-ml-system-review",
    title: "ML system review / fractional ML lead",
    audience:
      "Engineering and data leaders who need senior ML judgement without a full-time hire - before a big build, or when production models start to drift.",
    deliverables: [
      "Review of data pipelines, evaluation and MLOps, with prioritised findings",
      "A drift-monitoring and retraining strategy",
      "Ongoing technical leadership: roadmap, model reviews and hiring support",
    ],
    timeline: "[TODO: e.g. 2-week review, or N days per month]",
    ctaLabel: "Discuss this",
  },
];

const skills: Resume["skills"] = [
  {
    group: "Research",
    items: ["Transformers & GPT", "CNNs & GNNs", "Diffusion & GANs", "Self- & weakly-supervised learning"],
  },
  {
    group: "Build",
    items: ["PyTorch", "TensorFlow / Keras", "Hugging Face", "Deep Graph Library", "OpenCV", "spaCy", "Python", "C / C++"],
  },
  {
    group: "Optimize",
    items: ["TensorRT", "ONNX", "Triton Inference Server", "NVIDIA DeepStream", "PyCUDA"],
  },
  {
    group: "Operate",
    items: ["Docker", "AzureML / MLflow", "TF Serving", "AWS / GCP", "Drift monitoring & retraining"],
  },
];

const noRichText: RichText = [];

export const fallbackProjects: Project[] = [
  {
    slug: "vehicle-damage-assessment",
    title: "Automated Vehicle Damage Assessment",
    summary:
      "Ensemble computer-vision system that detects vehicle damage and missing parts for insurance claims - 90% damage-detection accuracy.",
    kind: "client",
    results: [
      { value: "90%", label: "Damage-detection accuracy" },
      { value: "45%", label: "Lower manual inspection costs" },
      { value: "30%", label: "Lower annotation costs per year" },
    ],
    context:
      "XA Group (Xpress Automation), motor-insurance claims, 2023 – 2026. I led full-stack development of the deep learning systems behind automated claim assessment.",
    problem: paragraphs([
      "Assessing a motor-insurance claim needed a manual inspection of the vehicle, which made claims slow and costly. Automating it required models that cover many damage types - and labelling enough data for every new damage type was itself expensive.",
    ]),
    approach: paragraphs([
      "An ensemble of computer-vision models detects and localises damage and identifies missing parts from claim photos, so claims can be assessed without a manual inspection.",
      "Self-supervised pre-training on unlabelled claim images cut the number of annotated examples needed for each new damage type. Models were optimised with TensorRT for inference.",
      "After launch I owned the models in production, monitoring for data drift and retraining when the incoming distribution shifted (AzureML, MLflow).",
    ]),
    stack: ["PyTorch", "Hugging Face", "Ultralytics", "TensorRT", "AzureML", "MLflow", "Docker"],
    description: noRichText,
    tags: ["Computer Vision", "Self-Supervised", "PyTorch", "TensorRT", "AzureML"],
    year: "2023 – 2026",
    highlights: [
      "90% damage-detection accuracy",
      "45% reduction in manual inspection costs",
      "30% annual reduction in annotation costs via self-supervised pre-training",
      "Drift monitoring and retraining with AzureML and MLflow",
    ],
    featured: true,
  },
  {
    slug: "receipt-information-extraction",
    title: "Information Extraction from Receipts",
    summary:
      "CV + NLP pipeline that extracts and decodes purchased items from scanned receipts. Deployed in multiple countries; 4 patents and a KDD workshop paper.",
    kind: "client",
    results: [
      { value: "Multi-country", label: "Production deployment" },
      { value: "4", label: "Patents filed" },
      { value: "1", label: "Peer-reviewed paper (KDD workshop)" },
    ],
    context:
      "Blackstraw.ai, working with a client's technical team, 2019 – 2023. I was lead developer on the receipt information-extraction system.",
    problem: paragraphs([
      "The client needed every purchased item - description, quantity and price - extracted from photos and scans of printed receipts. Real receipts arrive with heavy perspective distortion, creases and widely varied layouts, so text recognition alone doesn't produce structured, usable data.",
    ]),
    approach: paragraphs([
      "The pipeline chains several computer-vision models (text detection, OCR, line detection) with NLP models that structure the result: text classification, named-entity recognition, coreference resolution, dependency parsing and knowledge-graph embeddings for product matching.",
      "A key component is a lightweight Graph Attention Network that groups OCR detections into text lines, which became a published paper.",
      "Models were served with TF Serving and TensorRT, with custom CUDA kernels via PyCUDA.",
    ]),
    stack: ["Python", "C++", "PyCUDA", "PyTorch", "TensorFlow", "DGL", "TF Serving", "TensorRT"],
    description: noRichText,
    tags: ["Document AI", "GNN", "NLP", "OCR", "DGL", "TensorRT"],
    year: "2019 – 2023",
    highlights: ["Deployed in production across multiple countries", "4 patents filed and 1 research paper published"],
    links: [
      {
        label: "Read the paper",
        href: "https://nielseniq.com/global/en/info/graph-attention-networks-for-efficient-text-line-detection-on-receipt-layout-documents/",
      },
    ],
    featured: true,
  },
  {
    slug: "social-distancing-monitoring",
    title: "Social Distancing Monitoring System",
    summary: "Real-time, multi-camera system that flags social-distancing violations from existing CCTV feeds.",
    kind: "client",
    results: [
      { value: "40+", label: "CCTV cameras monitored" },
      { value: "Real-time", label: "Violation alerts" },
      { value: "1", label: "Patent filed (India)" },
    ],
    context: "Blackstraw.ai, 2020. An end-to-end video-analytics system for a facility's existing CCTV network.",
    problem: paragraphs([
      "The facility needed social-distancing violations flagged in real time across its 40+ CCTV cameras, using the cameras already installed on site.",
    ]),
    approach: paragraphs([
      "The system detects people in each feed, estimates the real-world distance between them and flags violations of social-distancing rules in real time.",
      "It is built on NVIDIA DeepStream with TensorRT-optimised detectors and GStreamer/FFmpeg video pipelines, packaged with Docker for deployment on site.",
    ]),
    stack: ["NVIDIA DeepStream", "TensorRT", "GStreamer", "FFmpeg", "Docker"],
    description: noRichText,
    tags: ["Computer Vision", "DeepStream", "TensorRT", "Video Analytics"],
    year: "2020",
    highlights: ["Deployed at a facility with 40+ CCTV cameras", "Patent filed in India (202021034381)"],
    featured: true,
  },
  {
    slug: "gat-text-line-detection",
    title: "GAT for Text Line Detection",
    summary:
      "4M-parameter Graph Attention + GRU model for line detection on receipts - state-of-the-art 97.23% F1 on CORD with 100–200× fewer parameters.",
    kind: "research",
    results: [
      { value: "97.23%", label: "F1 on CORD (state of the art)" },
      { value: "~4M", label: "Parameters" },
      { value: "100–200×", label: "Fewer parameters than competing models" },
    ],
    context:
      "Applied research alongside the receipt-extraction work, 2022. Co-authored with David Montero Martín, David Jiménez and Javier Yebes.",
    problem: paragraphs([
      "Matching key–value pairs on receipts depends on knowing which OCR detections sit on the same line. Existing line-detection models were built for structured documents and generalised poorly to receipts.",
    ]),
    approach: paragraphs([
      "We modelled OCR detections as a graph and combined Graph Attention layers with Gated Recurrent Units to predict line membership. An ablation study validated each architectural choice.",
      "The paper was presented at the Document Intelligence Workshop at KDD 2022 in Washington DC.",
    ]),
    stack: ["Graph Attention Networks", "GRU"],
    description: noRichText,
    tags: ["Research", "Graph Attention Networks", "Document AI"],
    year: "2022",
    highlights: [
      "97.23% F1 on the CORD dataset (state of the art)",
      "~4M parameters - 100–200× smaller than competing models",
      "Co-authored with David Montero Martín, David Jiménez and Javier Yebes",
    ],
    links: [
      {
        label: "Paper",
        href: "https://nielseniq.com/global/en/info/graph-attention-networks-for-efficient-text-line-detection-on-receipt-layout-documents/",
      },
    ],
    featured: false,
  },
  {
    slug: "parkinsons-vocal-classification",
    title: "Parkinson's Detection from Voice",
    summary:
      "Vocal Tab Transformer that classifies Parkinson's disease from dysphonia features, beating gradient-boosted trees by 1%+ AUC.",
    kind: "research",
    results: [{ value: "≥1%", label: "Higher AUC than gradient-boosted trees" }],
    context: "Research collaboration, published in MDPI Biomimetics (2023).",
    problem: paragraphs([
      "Parkinson's disease often shows up early in a person's voice. Dysphonia measures extracted from voice recordings form a large, complex tabular feature set, where Gradient-Boosted Decision Trees were the previous state of the art.",
    ]),
    approach: paragraphs([
      "We proposed the Vocal Tab Transformer, a transformer for tabular vocal features, which outperformed Gradient-Boosted Decision Trees by at least 1% AUC with better precision and recall.",
    ]),
    stack: ["Transformers", "Tabular deep learning"],
    description: noRichText,
    tags: ["Research", "Transformers", "Healthcare", "Tabular"],
    year: "2023",
    highlights: ["Published in MDPI Biomimetics (2023)", "Outperforms GBDT by ≥1% AUC"],
    links: [{ label: "Paper (MDPI)", href: "https://www.mdpi.com/2313-7673/8/4/351" }],
  },
  {
    slug: "fashion-catalog-models",
    title: "AI Catalogue Models for dataX.ai",
    summary: "Deep learning models powering dataX.ai, a web platform that auto-generates fashion product catalogues.",
    kind: "client",
    results: [],
    context: "CrowdANALYTIX, Data Science internship, 2018 – 2019.",
    problem: paragraphs([
      "dataX.ai, an AI-based platform for building fashion product catalogues, needed deep learning models running in production.",
    ]),
    approach: paragraphs([
      "I helped design and ship several of those models, covering the full loop: preparing datasets, training on Linux GPU servers, converting models to serving format and deploying them on TensorFlow Serving.",
    ]),
    stack: ["TensorFlow", "TF Serving"],
    description: noRichText,
    tags: ["Computer Vision", "TensorFlow", "TF Serving"],
    year: "2018 – 2019",
  },
];

const experience: Resume["experience"] = [
  {
    role: "Senior Data Scientist",
    company: "XA Group (Xpress Automation)",
    period: "Sep 2023 - May 2026",
    location: "Remote",
    summary: "Led deep learning for automated motor-insurance claims - 45% lower manual inspection costs.",
    points: [
      "Led full-stack development of deep learning systems for automotive insurance claims, cutting manual inspection costs by 45%.",
      "Designed ensemble CV models for damage and missing-part detection with 90% damage-detection accuracy.",
      "Built self-supervised learning pipelines that reduced annotation costs by 30% annually; maintained production models and retrained on data drift.",
    ],
    stack: ["PyTorch", "AzureML", "MLflow", "Hugging Face", "Ultralytics", "TensorRT", "Docker"],
  },
  {
    role: "Senior Data Scientist",
    company: "Blackstraw.ai",
    period: "Apr 2021 - Aug 2023",
    location: "Chennai / Remote",
    summary:
      "Consulted with client teams; lead developer on receipt extraction deployed in multiple countries, real-time CCTV analytics - 5 patents filed.",
    points: [
      "Consulted with client technical teams on data science and ML problems; lead developer on receipt information extraction deployed in multiple countries.",
      "Combined CV models with NLP (NER, coreference, dependency parsing, knowledge-graph embeddings) to structure extracted data - 4 patents and a KDD workshop paper.",
      "Technical interview panelist for data science hiring.",
    ],
    stack: ["PyTorch", "TensorFlow", "DGL", "C++", "PyCUDA", "TF Serving", "TensorRT"],
  },
  {
    role: "Data Scientist",
    company: "Blackstraw.ai",
    period: "Nov 2019 - Mar 2021",
    location: "Chennai, India",
    points: [
      "Built a real-time social-distancing monitoring system across 40+ CCTV cameras with NVIDIA DeepStream and TensorRT; patent filed in India.",
      "Developed computer-vision models for the receipt extraction pipeline.",
    ],
    stack: ["DeepStream", "TensorRT", "GStreamer", "FFmpeg", "Docker"],
  },
  {
    role: "Junior Data Scientist",
    company: "Blackstraw.ai",
    period: "Apr 2019 - Oct 2019",
    location: "Chennai, India",
    points: ["Started on document-understanding and computer-vision projects for enterprise clients."],
  },
  {
    role: "Data Science Intern",
    company: "CrowdANALYTIX",
    period: "Sep 2018 - Feb 2019",
    location: "Bengaluru, India",
    internship: true,
    points: [
      "Designed and deployed deep learning models for dataX.ai, an AI-based fashion catalogue platform - from dataset preparation and GPU training to TensorFlow Serving.",
    ],
  },
  {
    role: "Software Engineering Intern",
    company: "Oil and Natural Gas Corporation (ONGC)",
    period: "Jun 2017 - Jul 2017",
    location: "Dehradun, India",
    internship: true,
    points: ["Built an Android employee-directory app with direct calling, bookmarks and Google sign-in."],
  },
];

const publications: Resume["publications"] = [
  {
    title: "Graph Attention Networks for Efficient Text Line Detection on Receipt-Layout Documents",
    venue: "Document Intelligence Workshop @ KDD 2022, Washington DC",
    date: "Aug 2022",
    authors: "D. Montero Martín, M. Kumar, D. Jiménez, J. Yebes",
    summary: "Lightweight GAT + GRU line detector: 97.23% F1 on CORD with 100–200× fewer parameters.",
    href: "https://nielseniq.com/global/en/info/graph-attention-networks-for-efficient-text-line-detection-on-receipt-layout-documents/",
  },
  {
    title:
      "A Novel Artificial-Intelligence-Based Approach for Classification of Parkinson's Disease Using Complex and Large Vocal Features",
    venue: "Biomimetics (MDPI), 8(4), 351",
    date: "2023",
    authors: "R. Nijhawan, M. Kumar, S. Arya, N. Mendirtta, et al.",
    summary: "Vocal Tab Transformer for Parkinson's detection from dysphonia features; beats GBDT by ≥1% AUC.",
    href: "https://www.mdpi.com/2313-7673/8/4/351",
  },
];

const patents: Resume["patents"] = [
  {
    title: "Methods, Systems, Apparatus and Articles of Manufacture to Detect Lines on Documents",
    filed: "Jun 2022",
    id: "US81259087",
  },
  { title: "Automatic Document Content Extraction and Decoding", filed: "Jun 2021", id: "US81254014" },
  {
    title: "Automated Extraction of Purchased Items in Images of Receipts Using Computer Vision and Deep Learning",
    filed: "Jun 2021",
  },
  { title: "Automated Receipt Decoding: Product Matching and Dictionaries", filed: "Jun 2021" },
  { title: "Method and System to Detect Distance Between Entities", filed: "Aug 2020", id: "IN 202021034381" },
];

const education: Resume["education"] = [
  {
    degree: "M.Tech, Artificial Intelligence & Machine Learning",
    school: "Birla Institute of Technology and Science (BITS), Pilani - WILP",
    period: "2024 - 2026",
  },
  {
    degree: "B.Tech, Computer Science & Engineering",
    school: "College of Engineering Roorkee",
    period: "2014 - 2018",
    location: "Roorkee, India",
  },
];

const certifications: string[] = [
  "Qualified GATE CSE 2018 (score 346)",
  "DeepLearning.AI TensorFlow Developer (2020)",
  "Google Cloud Platform Fundamentals: Core Infrastructure",
  "Observability Fundamentals - Elastic Stack",
  "Data Science: Deep Learning in Python",
];

export const fallbackResume: Resume = { experience, publications, patents, skills, education, certifications };

/**
 * `projectSlug` links a testimonial to a case study; the seed turns it into a project reference.
 * `shortQuote` is a verbatim excerpt of `quote`.
 */
export const fallbackTestimonials: Testimonial[] = [
  {
    id: "javier-yebes",
    quote:
      "Research and innovation requires thoughtful data analysis, continuous learning and autonomy as demonstrated by Mukul. During the three years he worked on my team he grew as a professional specializing in CV, DL, ML and GNNs in the boundaries of image and text processing. He collaborated and communicated well as part of a diverse, international and multidisciplinary team and he participated in key innovations also pushing the boundaries of the state of the art. Mukul would be a valuable asset to any team in the area of ML, willing to adapt and tackle new challenges.",
    shortQuote:
      "He collaborated and communicated well as part of a diverse, international and multidisciplinary team and he participated in key innovations also pushing the boundaries of the state of the art.",
    name: "Javier Yebes",
    title: "Director, AI Research Science",
    company: "NielsenIQ",
    relationship: "Managed Mukul Directly",
    linkedinUrl: undefined, // [TODO: Javier Yebes's own LinkedIn profile URL]
    projectSlug: "receipt-information-extraction",
    featured: true,
  },
];
