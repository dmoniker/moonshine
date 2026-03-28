/**
 * Fixed 8-week, part-time distillation quest (2–4 hrs/week).
 * Task ids must stay stable so saved JSON keeps mapping.
 */

export interface WeekTask {
  id: string;
  label: string;
  /** Minutes, for time-estimate chips */
  estimateMin: number;
}

export interface WeekDefinition {
  number: number;
  emoji: string;
  title: string;
  tagline: string;
  hoursRange: string;
  tasks: WeekTask[];
  successCriteria: string[];
}

export const DIAMANDIS_QUOTE =
  "The day before something is truly a breakthrough, it's a crazy idea.";

export const DIAMANDIS_ATTRIBUTION = "Peter H. Diamandis";

export const WEEKS: WeekDefinition[] = [
  {
    number: 1,
    emoji: "🚀",
    title: "Launch Pad",
    tagline: "Prime the mission: tools, vocabulary, and a shared north star.",
    hoursRange: "2–3 hrs",
    tasks: [
      {
        id: "w1-t1",
        label: "Install Python 3.11+, Git, and VS Code (or your preferred editor)",
        estimateMin: 45,
      },
      {
        id: "w1-t2",
        label: "Create the `moonshine-quest` folder and confirm `python3 --version` works",
        estimateMin: 15,
      },
      {
        id: "w1-t3",
        label:
          'Watch one Moonshots episode together; each writes 3 “crazy ideas” that excite them',
        estimateMin: 45,
      },
      {
        id: "w1-t4",
        label:
          "Pair-read the first 3 pages of the Hinton distillation paper intro (skim figures OK)",
        estimateMin: 35,
      },
    ],
    successCriteria: [
      "Your dev environment runs without friction",
      "You can explain distillation in one sentence: “teach a small model from a big one.”",
      "Your `distillation_progress.json` is updating as you use this dashboard",
    ],
  },
  {
    number: 2,
    emoji: "🧠",
    title: "Teacher & Student",
    tagline: "Go deep on logits, soft labels, and temperature.",
    hoursRange: "2–4 hrs",
    tasks: [
      {
        id: "w2-t1",
        label: "Read Hinton et al. sections on soft targets and temperature (take shared notes)",
        estimateMin: 60,
      },
      {
        id: "w2-t2",
        label: "Draw a one-page diagram: Teacher → soft probabilities → Student",
        estimateMin: 30,
      },
      {
        id: "w2-t3",
        label: "List 3 real products that benefit from smaller / faster models",
        estimateMin: 25,
      },
      {
        id: "w2-t4",
        label: "Quest Sync: discuss where your own “student model” might live (app, robot, site…)",
        estimateMin: 30,
      },
    ],
    successCriteria: [
      "You can name why temperature ‘softens’ the teacher’s hints",
      "You agree on what success looks like for your family project by week 8",
    ],
  },
  {
    number: 3,
    emoji: "🧪",
    title: "Toy Distillation",
    tagline: "Replicate a tiny example so the mechanics feel real.",
    hoursRange: "3–4 hrs",
    tasks: [
      {
        id: "w3-t1",
        label: "Spin up a minimal notebook: train a tiny classifier on a toy dataset (MNIST or CIFAR-10 subset)",
        estimateMin: 90,
      },
      {
        id: "w3-t2",
        label: "Train a slightly larger “teacher” on the same data (or use a pretrained small CNN)",
        estimateMin: 60,
      },
      {
        id: "w3-t3",
        label: "Run one distillation loss step together—celebrate the first KL-div moment 🎉",
        estimateMin: 45,
      },
    ],
    successCriteria: [
      "Loss goes down for at least a short run",
      "You can point to teacher logits vs student logits in code",
    ],
  },
  {
    number: 4,
    emoji: "📊",
    title: "Data & Metrics",
    tagline: "Know what you measure before you scale up.",
    hoursRange: "2–3 hrs",
    tasks: [
      {
        id: "w4-t1",
        label: "Pick evaluation metrics (accuracy, latency, size on disk) and write them in your Journal",
        estimateMin: 30,
      },
      {
        id: "w4-t2",
        label: "Curate / label a small domain dataset you care about (photos, text, audio—your call)",
        estimateMin: 60,
      },
      {
        id: "w4-t3",
        label: "Define a simple train/val split and document it in Resources / notes",
        estimateMin: 35,
      },
    ],
    successCriteria: [
      "You have a repeatable way to score teacher vs student",
      "No metric ambiguity: same script next week should give comparable numbers",
    ],
  },
  {
    number: 5,
    emoji: "⚙️",
    title: "Modern Stack",
    tagline: "Leverage libraries so you focus on ideas, not plumbing.",
    hoursRange: "2–4 hrs",
    tasks: [
      {
        id: "w5-t1",
        label: "Skim OpenAI’s distillation / model optimization guide; note 3 constraints that matter to you",
        estimateMin: 40,
      },
      {
        id: "w5-t2",
        label: "Try one Hugging Face dataset or Trainer tutorial relevant to your format (vision/NLP)",
        estimateMin: 60,
      },
      {
        id: "w5-t3",
        label: "Decide: PyTorch-first, HF-first, or both—document the choice",
        estimateMin: 25,
      },
    ],
    successCriteria: [
      "You can load data and a baseline model with <30 min friction",
      "You know which library owns training loops for your project",
    ],
  },
  {
    number: 6,
    emoji: "🗜️",
    title: "Shrink & Ship Mindset",
    tagline: "Latency, memory, and the user experience of “fast enough.”",
    hoursRange: "2–3 hrs",
    tasks: [
      {
        id: "w6-t1",
        label: "Measure teacher latency vs a random tiny network on the same batch",
        estimateMin: 40,
      },
      {
        id: "w6-t2",
        label: "Read one short article on quantization OR pruning; pick whether you’ll touch it in v1",
        estimateMin: 35,
      },
      {
        id: "w6-t3",
        label: 'Whiteboard “v0.1 scope”: what ships vs what waits for "phase 2"',
        estimateMin: 35,
      },
    ],
    successCriteria: [
      "You can justify why a student model matters for your deployment target",
      "v0.1 scope fits remaining weeks (realistic + exciting)",
    ],
  },
  {
    number: 7,
    emoji: "🔥",
    title: "Distillation Sprint",
    tagline: "Train your student for real; iterate once on hyperparameters.",
    hoursRange: "3–4 hrs",
    tasks: [
      {
        id: "w7-t1",
        label: "Run full student training with distillation loss + your chosen regularization",
        estimateMin: 90,
      },
      {
        id: "w7-t2",
        label: "Compare student vs teacher on val metrics; screenshot or log in Journal",
        estimateMin: 40,
      },
      {
        id: "w7-t3",
        label: "One hyperparameter tweak (temperature, α, LR)—note what changed",
        estimateMin: 45,
      },
    ],
    successCriteria: [
      "Student beats a “train from scratch only” baseline OR you know exactly why not",
      "Artifacts saved: weights, config, and how to reproduce",
    ],
  },
  {
    number: 8,
    emoji: "🏁",
    title: "Capstone & Legacy",
    tagline: "Deploy, document, teach-back, and set your next moonshot.",
    hoursRange: "2–4 hrs",
    tasks: [
      {
        id: "w8-t1",
        label: "Package demo: Gradio, Streamlit, static export, or embedded app—pick one and ship",
        estimateMin: 75,
      },
      {
        id: "w8-t2",
        label: "Record a 5-minute screen demo or “explainer” for a friend (future you will thank you)",
        estimateMin: 35,
      },
      {
        id: "w8-t3",
        label: "Post your final link in My Model + write a gratitude entry in the Journal",
        estimateMin: 25,
      },
      {
        id: "w8-t4",
        label: "Family retro: what was hardest, funniest, and most surprising?",
        estimateMin: 30,
      },
    ],
    successCriteria: [
      "Someone outside the family can run or view your model / demo",
      "You have a one-paragraph README for your future selves",
    ],
  },
];
