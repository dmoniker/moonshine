/** Curated links — opened in a new tab; no runtime API calls from this app. */

const LINKS: { title: string; desc: string; url: string; emoji: string }[] = [
  {
    emoji: "🎙️",
    title: "Moonshots with Peter Diamandis",
    desc: "Podcast landing — mindset episodes pair well with week 1.",
    url: "https://www.diamandis.com/podcast",
  },
  {
    emoji: "📄",
    title: "Distilling the Knowledge in a Neural Network",
    desc: "Hinton et al. (2015) — the paper that named the game.",
    url: "https://arxiv.org/abs/1503.02531",
  },
  {
    emoji: "🛠️",
    title: "OpenAI — Model optimization",
    desc: "Official docs on getting the most from models (includes distillation workflows).",
    url: "https://platform.openai.com/docs/guides/model-optimization",
  },
  {
    emoji: "📚",
    title: "OpenAI Cookbook",
    desc: "Hands-on patterns and examples you can adapt locally.",
    url: "https://cookbook.openai.com/",
  },
  {
    emoji: "🤗",
    title: "Hugging Face — Knowledge distillation",
    desc: "Transformer-centric guide and trainer hooks.",
    url: "https://huggingface.co/blog/knowledge-distillation",
  },
  {
    emoji: "🔥",
    title: "PyTorch Tutorials",
    desc: "If you want raw torch before frameworks.",
    url: "https://docs.pytorch.org/tutorials/",
  },
];

export function Resources() {
  return (
    <div className="space-y-6 max-w-3xl">
      <header>
        <h1 className="font-display text-3xl font-bold text-white">Resources</h1>
        <p className="text-slate-400 mt-2 text-sm leading-relaxed">
          Bookmarks for the journey. Everything opens in your browser—this dashboard stays 100%
          local.
        </p>
      </header>

      <ul className="space-y-3">
        {LINKS.map((l) => (
          <li key={l.url}>
            <a
              href={l.url}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-panel p-4 flex gap-4 items-start hover:border-accent/40 transition-colors group"
            >
              <span className="text-2xl shrink-0" aria-hidden>
                {l.emoji}
              </span>
              <div className="min-w-0">
                <p className="font-display font-semibold text-white group-hover:text-accent transition-colors">
                  {l.title}
                </p>
                <p className="text-sm text-slate-400 mt-1">{l.desc}</p>
                <p className="text-xs text-slate-500 mt-2 truncate">{l.url}</p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
