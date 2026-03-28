import {
  buildMarkdownExport,
  downloadMarkdown,
  downloadPdfExport,
} from "../lib/exportReport";
import { useQuest } from "../context/QuestContext";
import type { TabId } from "../types";

const TABS: { id: TabId; label: string; emoji: string }[] = [
  { id: "dashboard", label: "Dashboard", emoji: "📡" },
  { id: "plan", label: "8-Week Plan", emoji: "🗺️" },
  { id: "journal", label: "Journal", emoji: "📓" },
  { id: "resources", label: "Resources", emoji: "🔗" },
  { id: "model", label: "My Model", emoji: "🤖" },
];

export function Sidebar() {
  const {
    activeTab,
    setActiveTab,
    profile,
    setProfile,
    setShowQuestSync,
    data,
  } = useQuest();

  const exportMd = () => {
    const md = buildMarkdownExport(data, profile);
    downloadMarkdown(`distillation-quest-${profile}.md`, md);
  };

  const exportPdf = () => {
    downloadPdfExport(data, profile);
  };

  return (
    <aside className="w-full md:w-64 shrink-0 flex flex-col gap-6 md:min-h-screen md:sticky md:top-0 md:py-8 md:pr-2">
      <div className="glass-panel p-4 space-y-1">
        <p className="font-display font-bold text-white text-lg tracking-tight">Moonshine</p>
        <p className="text-xs text-slate-500">Distillation Quest</p>
      </div>

      <div className="glass-panel p-3 space-y-2">
        <p className="text-[10px] uppercase tracking-wider text-slate-500 px-2">Mode</p>
        <div className="flex rounded-xl bg-night p-1 border border-white/10">
          {(["parent", "son"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setProfile(m)}
              className={`flex-1 py-2 px-2 rounded-lg text-xs font-semibold transition-colors ${
                profile === m
                  ? "bg-accent text-night shadow-glow"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              {m === "parent" ? "👤 Parent" : "🧒 Son"}
            </button>
          ))}
        </div>
        <p className="text-[10px] text-slate-500 px-2 leading-snug">
          Progress & journal are separate per mode; both save in one JSON file.
        </p>
      </div>

      <nav className="glass-panel p-2 flex flex-row md:flex-col gap-1 overflow-x-auto md:overflow-visible">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setActiveTab(t.id)}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
              activeTab === t.id
                ? "bg-mist text-white border border-accent/30"
                : "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            <span>{t.emoji}</span>
            {t.label}
          </button>
        ))}
      </nav>

      <div className="glass-panel p-3 space-y-2">
        <button
          type="button"
          onClick={() => setShowQuestSync(true)}
          className="w-full py-2.5 px-3 rounded-xl bg-gold/15 border border-gold/30 text-gold text-sm font-semibold hover:bg-gold/25 transition-colors"
        >
          🤝 Quest Sync (30 min)
        </button>
        <p className="text-[10px] text-slate-500 px-1">Family debrief agenda</p>
      </div>

      <div className="glass-panel p-3 space-y-2">
        <p className="text-[10px] uppercase tracking-wider text-slate-500 px-1">Export</p>
        <button
          type="button"
          onClick={exportMd}
          className="w-full py-2 px-3 rounded-xl bg-mist border border-white/10 text-sm text-slate-200 hover:border-accent/40 transition-colors"
        >
          ⬇️ Download Markdown
        </button>
        <button
          type="button"
          onClick={exportPdf}
          className="w-full py-2 px-3 rounded-xl bg-mist border border-white/10 text-sm text-slate-200 hover:border-accent/40 transition-colors"
        >
          ⬇️ Download PDF
        </button>
      </div>
    </aside>
  );
}
