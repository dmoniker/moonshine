import { DIAMANDIS_ATTRIBUTION, DIAMANDIS_QUOTE } from "../data/schedule";
import { useQuest } from "../context/QuestContext";

export function WelcomeScreen() {
  const { setWelcomeSeen, profile } = useQuest();
  const label = profile === "parent" ? "Parent" : "Son";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/95 p-6 backdrop-blur-sm">
      <div className="glass-panel max-w-lg w-full p-8 md:p-10 text-center space-y-6 animate-[fadeIn_0.5s_ease-out]">
        <div className="text-5xl" aria-hidden>
          🌙✨
        </div>
        <p className="font-display text-xl md:text-2xl text-white leading-relaxed">
          “{DIAMANDIS_QUOTE}”
        </p>
        <p className="text-slate-400 text-sm">— {DIAMANDIS_ATTRIBUTION}</p>
        <p className="text-slate-300 text-left text-sm leading-relaxed border-l-2 border-accent/60 pl-4">
          This is your <strong className="text-accent">ticket to the future</strong>—eight
          part-time weeks to learn model distillation, side by side. Everything stays on this
          machine in <code className="text-gold/90 text-xs">distillation_progress.json</code>.
        </p>
        <p className="text-xs text-slate-500">
          Mode: <span className="text-gold font-medium">{label}</span> (switch anytime in the
          sidebar)
        </p>
        <button
          type="button"
          onClick={setWelcomeSeen}
          className="w-full py-3.5 px-6 rounded-xl bg-accent text-night font-display font-semibold text-lg shadow-glow hover:bg-accentDim transition-colors"
        >
          Start Your Quest 🚀
        </button>
      </div>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.98); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
