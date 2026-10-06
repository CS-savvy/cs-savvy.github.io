/**
 * All site content lives here. Edit this file to update the portfolio -
 * no component changes required.
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
  location?: string;
  points: string[];
  stack?: string[];
};

export type Publication = {
  title: string;
  venue: string;
  date: string;
  authors?: string;
  summary?: string;
  href?: string;
};

export type Patent = {
  title: string;
  filed: string;
  id?: string;
};

export type Education = {
  degree: string;
  school: string;
  period: string;
  location?: string;
};

export const site = {
  name: "Mukul Kumar",
  role: "Senior Data Scientist",
  url: "https://mukulkumar.dev",
  headline:
    "I build and ship deep learning systems for computer vision and NLP - from research prototype to production.",
  intro:
    "Machine Learning and AI Engineer with 8 years of experience deploying deep learning solutions, 5 filed patents and 2 peer-reviewed publications. Research interests: Graph Neural Networks and attention methods.",
  about: [
    "I'm a Machine Learning and AI Engineer with 8 years of experience taking deep learning systems from research to production - most recently automating vehicle damage assessment for insurance claims, and before that, extracting structured data from millions of scanned receipts deployed across multiple countries.",
    "My research interests are Graph Neural Networks and attention methods. That work has produced 5 filed patents and 2 peer-reviewed papers, including a lightweight GAT-based text line detector presented at the KDD Document Intelligence Workshop.",
    "I care about the unglamorous parts that make models useful: clean data pipelines, honest evaluation, retraining when data drifts, and inference that fits the latency and cost budget (TensorRT, Triton, DeepStream). I'm always happy to collaborate with researchers on NLP or computer vision projects.",
  ],
  stats: [
    { value: "8", label: "Years in applied ML" },
    { value: "5", label: "Patents filed" },
    { value: "2", label: "Peer-reviewed papers" },
    { value: "45%", label: "Inspection cost reduction" },
  ],
  resumeUrl: "/resume/mukul-resume.pdf",
  location: "Bengaluru, India",
  email: "mukul.kr99@gmail.com",
  availability: "Open to new opportunities",
  socials: [
    { label: "GitHub", href: "https://github.com/CS-savvy", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/mukulkr", icon: "linkedin" },
    { label: "Email", href: "mailto:mukul.kr99@gmail.com", icon: "mail" },
  ] as Social[],
};

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Models & Methods",
    items: ["Transformers & GPT", "Diffusion & GANs", "CNNs & GNNs", "LSTMs", "Self- & weakly-supervised learning"],
  },
  {
    group: "Frameworks",
    items: ["PyTorch", "TensorFlow / Keras", "Hugging Face", "Deep Graph Library", "OpenCV", "ONNX", "scikit-learn", "spaCy"],
  },
  {
    group: "Deployment & MLOps",
    items: ["TensorRT", "Triton Inference Server", "TF Serving", "NVIDIA DeepStream", "Docker", "AzureML / MLflow"],
  },
  {
    group: "Engineering",
    items: ["Python", "C / C++", "PyCUDA", "SQL / MySQL", "Bash", "AWS / GCP"],
  },
];

export const projects: Project[] = [
  {
    slug: "vehicle-damage-assessment",
    title: "Automated Vehicle Damage Assessment",
    summary:
      "Ensemble computer-vision system that detects vehicle damage and missing parts for insurance claims - 90% damage-detection accuracy.",
    description: [
      "At XA Group I led full-stack development of the deep learning systems behind automated motor-insurance claims: given photos of a vehicle, the system detects and localises damage and identifies missing parts so claims can be assessed without a manual inspection.",
      "The solution is an ensemble of computer-vision models. To keep labelling affordable I built self-supervised learning pipelines that pre-train on unlabelled claim images, so far fewer annotated examples are needed for each new damage type.",
      "After deployment I owned the models in production - monitoring for data drift and retraining when the incoming data distribution shifted. Models were optimised with TensorRT for inference.",
    ],
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
    description: [
      "At Blackstraw I worked with the client's team on extracting every item - description, quantity and price - from photos and scans of printed receipts, despite heavy perspective distortion, creases and varied layouts.",
      "The pipeline chains several computer-vision models (text detection, OCR, line detection) with NLP models that structure the result: text classification, named-entity recognition, coreference resolution, dependency parsing and knowledge-graph embeddings for product matching.",
      "A key component is a lightweight Graph Attention Network that groups OCR detections into text lines, which became a published paper. Models were served with TF Serving and TensorRT, with custom CUDA kernels via PyCUDA.",
    ],
    tags: ["Document AI", "GNN", "NLP", "OCR", "DGL", "TensorRT"],
    year: "2019 – 2023",
    highlights: [
      "Deployed in production across multiple countries",
      "4 patents filed and 1 research paper published",
      "Stack: Python, C++, PyCUDA, PyTorch, TensorFlow, DGL, TF Serving, TensorRT",
    ],
    links: [
      {
        label: "Read the paper",
        href: "https://nielseniq.com/global/en/info/graph-attention-networks-for-efficient-text-line-detection-on-receipt-layout-documents/",
      },
    ],
    featured: true,
  },
  {
    slug: "gat-text-line-detection",
    title: "GAT for Text Line Detection",
    summary:
      "4M-parameter Graph Attention + GRU model for line detection on receipts - state-of-the-art 97.23% F1 on CORD with 100–200× fewer parameters.",
    description: [
      "Matching key–value pairs on receipts depends on knowing which OCR detections sit on the same line, and existing line-detection models were built for structured documents and generalised poorly to receipts.",
      "We modelled OCR detections as a graph and combined Graph Attention layers with Gated Recurrent Units to predict line membership. An ablation study validated each architectural choice.",
      "The paper was presented at the Document Intelligence Workshop at KDD 2022 in Washington DC.",
    ],
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
    featured: true,
  },
  {
    slug: "social-distancing-monitoring",
    title: "Social Distancing Monitoring System",
    summary: "Real-time, multi-camera system that flags social-distancing violations from existing CCTV feeds.",
    description: [
      "An end-to-end system that uses the CCTV cameras already installed on a property to detect people, estimate the real-world distance between them and flag violations of social-distancing rules in real time.",
      "Built on NVIDIA DeepStream with TensorRT-optimised detectors and GStreamer/FFmpeg video pipelines, packaged with Docker for deployment on site.",
    ],
    tags: ["Computer Vision", "DeepStream", "TensorRT", "Video Analytics"],
    year: "2020",
    highlights: ["Deployed at a facility with 40+ CCTV cameras", "Patent filed in India (202021034381)"],
  },
  {
    slug: "parkinsons-vocal-classification",
    title: "Parkinson's Detection from Voice",
    summary:
      "Vocal Tab Transformer that classifies Parkinson's disease from dysphonia features, beating gradient-boosted trees by 1%+ AUC.",
    description: [
      "Parkinson's disease often shows up early in a person's voice. We extracted dysphonia measures from voice recordings and treated them as a large, complex tabular feature set.",
      "We proposed the Vocal Tab Transformer, a transformer for tabular vocal features, which outperformed the previous state of the art - Gradient-Boosted Decision Trees - by at least 1% AUC with better precision and recall.",
    ],
    tags: ["Research", "Transformers", "Healthcare", "Tabular"],
    year: "2023",
    highlights: ["Published in MDPI Biomimetics (2023)", "Outperforms GBDT by ≥1% AUC"],
    links: [{ label: "Paper (MDPI)", href: "https://www.mdpi.com/2313-7673/8/4/351" }],
  },
  {
    slug: "fashion-catalog-models",
    title: "AI Catalogue Models for dataX.ai",
    summary: "Deep learning models powering dataX.ai, a web platform that auto-generates fashion product catalogues.",
    description: [
      "As a Data Science intern at CrowdANALYTIX I helped design and ship several deep learning models for dataX.ai, an AI-based platform for building fashion product catalogues.",
      "The work covered the full loop: preparing datasets, training on Linux GPU servers, converting models to serving format and deploying them on TensorFlow Serving.",
    ],
    tags: ["Computer Vision", "TensorFlow", "TF Serving"],
    year: "2018 – 2019",
  },
];

export const experience: Experience[] = [
  {
    role: "Senior Data Scientist",
    company: "XA Group (Xpress Automation)",
    period: "Sep 2023 - May 2026",
    location: "Remote",
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
    points: [
      "Designed and deployed deep learning models for dataX.ai, an AI-based fashion catalogue platform - from dataset preparation and GPU training to TensorFlow Serving.",
    ],
  },
  {
    role: "Software Engineering Intern",
    company: "Oil and Natural Gas Corporation (ONGC)",
    period: "Jun 2017 - Jul 2017",
    location: "Dehradun, India",
    points: [
      "Built an Android employee-directory app with direct calling, bookmarks and Google sign-in.",
    ],
  },
];

export const publications: Publication[] = [
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

export const patents: Patent[] = [
  { title: "Methods, Systems, Apparatus and Articles of Manufacture to Detect Lines on Documents", filed: "Jun 2022", id: "US81259087" },
  { title: "Automatic Document Content Extraction and Decoding", filed: "Jun 2021", id: "US81254014" },
  { title: "Automated Extraction of Purchased Items in Images of Receipts Using Computer Vision and Deep Learning", filed: "Jun 2021" },
  { title: "Automated Receipt Decoding: Product Matching and Dictionaries", filed: "Jun 2021" },
  { title: "Method and System to Detect Distance Between Entities", filed: "Aug 2020", id: "IN 202021034381" },
];

export const education: Education[] = [
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

export const certifications: string[] = [
  "Qualified GATE CSE 2018 (score 346)",
  "DeepLearning.AI TensorFlow Developer (2020)",
  "Google Cloud Platform Fundamentals: Core Infrastructure",
  "Observability Fundamentals - Elastic Stack",
  "Data Science: Deep Learning in Python",
];

export const nav = [
  { label: "About", href: "/#about" },
  ...(experience.length ? [{ label: "Experience", href: "/#experience" }] : []),
  { label: "Projects", href: "/#projects" },
  { label: "Research", href: "/#research" },
  { label: "Skills", href: "/#skills" },
  { label: "Contact", href: "/#contact" },
];
