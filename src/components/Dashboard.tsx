import { DIAMANDIS_ATTRIBUTION, DIAMANDIS_QUOTE, WEEKS } from "../data/schedule";
import { useQuest, useWeekProgressFraction } from "../context/QuestContext";
import { ProgressRing } from "./ProgressRing";

export function Dashboard() {
  const { profileData, currentWeekNumber, setActiveTab } = useQuest();
  const fraction = useWeekProgressFraction();

  const allDone = WEEKS.every((w) => profileData.weeks[String(w.number)]!.completed);
  const cw = WEEKS.find((w) => w.number === currentWeekNumber);
  const wp = cw ? profileData.weeks[String(cw.number)]! : null;

  const nextTask =
    cw && wp && !wp.completed
      ? cw.tasks.find((t) => !wp.tasks[t.id]) ?? null
      : null;

  const pct = Math.round(fraction * 100);

  return (
    <div className="space-y-8 max-w-3xl">
      <header className="space-y-3">
        <p className="text-accent text-sm font-medium">Your mission command</p>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-white">
          Distillation Quest 🌙
        </h1>
        <blockquote className="border-l-4 border-gold/50 pl-4 py-1 text-slate-300 italic text-sm leading-relaxed">
          “{DIAMANDIS_QUOTE}”
          <footer className="text-slate-500 not-italic mt-2 text-xs">
            — {DIAMANDIS_ATTRIBUTION}
          </footer>
        </blockquote>
      </header>

      <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start">
        <div className="relative text-accent">
          <ProgressRing value={fraction} size={140} stroke={12} />
          <span className="absolute inset-0 flex items-center justify-center font-display font-bold text-2xl text-white">
            {pct}%
          </span>
        </div>
        <div className="flex-1 space-y-3">
          <h2 className="font-display text-xl text-white">Overall progress</h2>
          <p className="text-slate-400 text-sm leading-relaxed">
            {allDone ? (
              <>
                <span className="text-accent font-medium">Quest complete.</span> You did the
                work—now teach someone else what you learned.
              </>
            ) : (
              <>
                Stay steady: ~2–4 hours per week, eight weeks. Small sessions compound into
                real capability.
              </>
            )}
          </p>
        </div>
      </div>

      <section className="glass-panel p-6 space-y-4">
        <h2 className="font-display text-lg text-white flex items-center gap-2">
          <span>📍</span> Current week
        </h2>
        {allDone ? (
          <p className="text-slate-300">
            Every week is marked complete. Open <strong>My Model</strong> to save your
            deployment link, and add a final journal entry for future-you.
          </p>
        ) : cw && wp ? (
          <>
            <p className="text-xl text-white font-display">
              {cw.emoji} Week {cw.number}: {cw.title}
            </p>
            <p className="text-slate-400 text-sm">{cw.tagline}</p>
            <p className="text-xs text-slate-500">Typical time: ~{cw.hoursRange} this week</p>

            <div className="rounded-xl bg-night/80 border border-white/10 p-4">
              <p className="text-xs uppercase tracking-wide text-gold/80 mb-2">Next task</p>
              {nextTask ? (
                <>
                  <p className="text-slate-100 font-medium">{nextTask.label}</p>
                  <p className="text-xs text-slate-500 mt-1">
                    ~{nextTask.estimateMin} min · then check it off in the plan
                  </p>
                </>
              ) : (
                <p className="text-accent font-medium">
                  All tasks checked—hit “Mark week complete” in the 8-week plan 🎯
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={() => setActiveTab("plan")}
              className="text-sm text-accent hover:underline font-medium"
            >
              Go to 8-week plan →
            </button>
          </>
        ) : null}
      </section>
    </div>
  );
}
