import { useQuest } from "../context/QuestContext";

export function MyModel() {
  const { profileData, setModelUrl } = useQuest();
  const v = profileData.modelUrl;

  return (
    <div className="space-y-6 max-w-2xl">
      <header>
        <h1 className="font-display text-3xl font-bold text-white">My model</h1>
        <p className="text-slate-400 mt-2 text-sm leading-relaxed">
          At the end of week 8, drop your deployed demo, Hugging Face space, GitHub release, or
          write-up URL. Stored only in your local JSON for this mode.
        </p>
      </header>

      <div className="glass-panel p-5 space-y-4">
        <label htmlFor="model-url" className="text-xs text-slate-500 uppercase tracking-wide">
          Deployment / demo link
        </label>
        <input
          id="model-url"
          type="url"
          value={v}
          onChange={(e) => setModelUrl(e.target.value)}
          placeholder="https://…"
          className="w-full rounded-lg bg-night border border-white/15 px-3 py-2.5 text-sm text-white placeholder:text-slate-600"
        />
        {v && (
          <a
            href={v}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex text-sm text-accent hover:underline font-medium"
          >
            Open link →
          </a>
        )}
      </div>

      <p className="text-xs text-slate-600">
        Tip: this field is just for you—no validation, no cloud sync.
      </p>
    </div>
  );
}
