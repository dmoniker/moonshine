import { WEEKS } from "../data/schedule";
import { useQuest } from "../context/QuestContext";

export function CelebrateModal() {
  const { showCelebrate, dismissCelebrate } = useQuest();

  if (!showCelebrate) return null;

  const week = WEEKS.find((w) => w.number === showCelebrate.weekNum);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-emerald-950/80 p-4"
      onClick={dismissCelebrate}
      role="presentation"
    >
      <div
        className="glass-panel max-w-md w-full p-8 text-center space-y-4 border-accent/30 shadow-glow"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="celebrate-title"
      >
        <div className="text-6xl" aria-hidden>
          🎉🏆✨
        </div>
        <h2 id="celebrate-title" className="font-display text-2xl font-bold text-accent">
          Week {showCelebrate.weekNum} complete!
        </h2>
        {week && (
          <p className="text-slate-300">
            {week.emoji} <strong className="text-white">{week.title}</strong>
          </p>
        )}
        <p className="text-slate-400 text-sm leading-relaxed">
          You compressed time into skill. Future-you is already proud. Take a victory lap, then
          journal one sentence about what surprised you.
        </p>
        <button
          type="button"
          onClick={dismissCelebrate}
          className="w-full py-3 rounded-xl bg-accent text-night font-semibold hover:bg-accentDim transition-colors"
        >
          Keep going →
        </button>
      </div>
    </div>
  );
}
