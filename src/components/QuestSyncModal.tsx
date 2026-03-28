import { useQuest } from "../context/QuestContext";

const AGENDA = [
  "0:00–0:05 — Quick wins: what got checked off this week?",
  "0:05–0:15 — Demo or walkthrough: show one artifact (notebook, plot, metric)",
  "0:15–0:25 — Blockers: where did friction show up? One fix for next week",
  "0:25–0:30 — Next commit: single concrete next step + who owns it",
];

export function QuestSyncModal() {
  const { showQuestSync, setShowQuestSync } = useQuest();

  if (!showQuestSync) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 p-4"
      role="presentation"
      onClick={() => setShowQuestSync(false)}
    >
      <div
        className="glass-panel max-w-md w-full p-6 space-y-4"
        role="dialog"
        aria-labelledby="quest-sync-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-2">
          <h2 id="quest-sync-title" className="font-display text-xl font-semibold text-white">
            🤝 Quest Sync — 30 min
          </h2>
          <button
            type="button"
            onClick={() => setShowQuestSync(false)}
            className="text-slate-400 hover:text-white text-sm px-2 py-1 rounded-lg hover:bg-white/5"
          >
            Close
          </button>
        </div>
        <p className="text-sm text-slate-400">
          A simple debrief so parent & son stay aligned. Set a timer and roll through the beats.
        </p>
        <ol className="list-decimal list-inside space-y-2 text-sm text-slate-200 leading-relaxed">
          {AGENDA.map((line) => (
            <li key={line} className="pl-1">
              {line}
            </li>
          ))}
        </ol>
        <p className="text-xs text-slate-500">
          Tip: end on gratitude—one thing you appreciated about how your teammate showed up.
        </p>
      </div>
    </div>
  );
}
