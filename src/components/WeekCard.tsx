import { useState } from "react";
import type { WeekDefinition } from "../data/schedule";
import type { WeekProgress } from "../types";

function formatMin(m: number): string {
  if (m >= 60) {
    const h = m / 60;
    return `${h === 1 ? "1 hr" : `${h} hrs`}`;
  }
  return `${m} min`;
}

export function WeekCard({
  week,
  progress,
  onToggleTask,
  onMarkComplete,
}: {
  week: WeekDefinition;
  progress: WeekProgress;
  onToggleTask: (taskId: string) => void;
  onMarkComplete: () => void;
}) {
  const [open, setOpen] = useState(week.number <= 2 || !progress.completed);

  const totalTasks = week.tasks.length;
  const doneCount = week.tasks.filter((t) => progress.tasks[t.id]).length;
  const allChecked = doneCount === totalTasks;

  return (
    <article
      className={`rounded-2xl border transition-colors ${
        progress.completed
          ? "border-accent/50 bg-emerald-950/20"
          : "border-white/10 bg-panel/60"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-4 p-4 text-left hover:bg-white/5 rounded-2xl transition-colors"
        aria-expanded={open}
      >
        <span className="text-3xl shrink-0" aria-hidden>
          {week.emoji}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-display font-semibold text-white">
              Week {week.number}: {week.title}
            </h3>
            {progress.completed && (
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent/20 text-accent">
                Done
              </span>
            )}
          </div>
          <p className="text-sm text-slate-400 mt-0.5">{week.tagline}</p>
          <p className="text-xs text-slate-500 mt-1">
            ~{week.hoursRange}/wk · {doneCount}/{totalTasks} tasks
          </p>
        </div>
        <span className="text-slate-500 text-lg">{open ? "▼" : "▶"}</span>
      </button>

      {open && (
        <div className="px-4 pb-4 pt-0 space-y-4 border-t border-white/5">
          <ul className="space-y-2 pt-3">
            {week.tasks.map((t) => (
              <li key={t.id} className="flex gap-3 items-start">
                <input
                  type="checkbox"
                  id={`${week.number}-${t.id}`}
                  checked={progress.tasks[t.id] ?? false}
                  onChange={() => onToggleTask(t.id)}
                  disabled={progress.completed}
                  className="mt-1.5 rounded border-white/20 bg-night text-accent focus:ring-accent"
                />
                <label
                  htmlFor={`${week.number}-${t.id}`}
                  className={`text-sm leading-relaxed flex-1 cursor-pointer ${
                    progress.tasks[t.id] ? "text-slate-400 line-through" : "text-slate-200"
                  }`}
                >
                  {t.label}
                  <span className="ml-2 text-xs text-slate-500 whitespace-nowrap">
                    ~{formatMin(t.estimateMin)}
                  </span>
                </label>
              </li>
            ))}
          </ul>

          <div>
            <p className="text-xs font-medium text-gold/90 uppercase tracking-wide mb-2">
              Success criteria
            </p>
            <ul className="list-disc list-inside text-sm text-slate-300 space-y-1">
              {week.successCriteria.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>

          {!progress.completed && (
            <button
              type="button"
              onClick={onMarkComplete}
              className={`w-full sm:w-auto py-2.5 px-5 rounded-xl font-semibold transition-colors ${
                allChecked
                  ? "bg-accent text-night hover:bg-accentDim shadow-glow"
                  : "bg-mist text-slate-200 hover:bg-slate-600 border border-white/10"
              }`}
            >
              {allChecked ? "Mark week complete ✅" : "Mark week complete (early)"}
            </button>
          )}
          {!allChecked && !progress.completed && (
            <p className="text-xs text-slate-500">
              Checklist not finished—still okay if life happened; you can complete early and
              catch up next session.
            </p>
          )}
        </div>
      )}
    </article>
  );
}
