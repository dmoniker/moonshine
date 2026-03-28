import { useState, type FormEvent } from "react";
import { useQuest } from "../context/QuestContext";

export function Journal() {
  const { profileData, addJournalEntry, deleteJournalEntry } = useQuest();
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [content, setContent] = useState("");

  const submit = (e: FormEvent) => {
    e.preventDefault();
    addJournalEntry(date, content);
    setContent("");
  };

  const sorted = [...profileData.journal].sort((a, b) =>
    a.date < b.date ? 1 : -1
  );

  return (
    <div className="space-y-8 max-w-3xl">
      <header>
        <h1 className="font-display text-3xl font-bold text-white">Journal</h1>
        <p className="text-slate-400 mt-2 text-sm">
          Dated entries for this mode only—reflections, metrics, jokes, breakthroughs.
        </p>
      </header>

      <form onSubmit={submit} className="glass-panel p-5 space-y-4">
        <div>
          <label htmlFor="jr-date" className="text-xs text-slate-500 uppercase tracking-wide">
            Date
          </label>
          <input
            id="jr-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="mt-1 w-full max-w-xs rounded-lg bg-night border border-white/15 px-3 py-2 text-sm text-white"
          />
        </div>
        <div>
          <label htmlFor="jr-body" className="text-xs text-slate-500 uppercase tracking-wide">
            Entry
          </label>
          <textarea
            id="jr-body"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            placeholder="What happened today? What did we learn?"
            className="mt-1 w-full rounded-lg bg-night border border-white/15 px-3 py-2 text-sm text-white placeholder:text-slate-600"
          />
        </div>
        <button
          type="submit"
          className="py-2.5 px-5 rounded-xl bg-accent text-night font-semibold hover:bg-accentDim transition-colors disabled:opacity-50"
          disabled={!content.trim()}
        >
          Save entry 📓
        </button>
      </form>

      <ul className="space-y-3">
        {sorted.map((e) => (
          <li key={e.id} className="glass-panel p-4 flex gap-4 items-start">
            <div className="text-xs text-gold font-medium w-24 shrink-0 pt-0.5">{e.date}</div>
            <p className="text-sm text-slate-200 flex-1 whitespace-pre-wrap">{e.content}</p>
            <button
              type="button"
              onClick={() => deleteJournalEntry(e.id)}
              className="text-xs text-slate-500 hover:text-red-400 shrink-0"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      {sorted.length === 0 && (
        <p className="text-slate-500 text-sm text-center py-8">No entries yet. Start one above.</p>
      )}
    </div>
  );
}
