import { WEEKS } from "../data/schedule";
import { useQuest } from "../context/QuestContext";
import { WeekCard } from "./WeekCard";

export function Plan() {
  const { profileData, toggleTask, markWeekComplete } = useQuest();

  return (
    <div className="space-y-6 max-w-3xl">
      <header>
        <h1 className="font-display text-3xl font-bold text-white">8-week plan</h1>
        <p className="text-slate-400 mt-2 text-sm leading-relaxed">
          Part-time cadence: ~2–4 hours per week. Expand a week, work the checklist, then mark
          it complete when you’re ready for the celebration screen.
        </p>
      </header>

      <div className="space-y-4">
        {WEEKS.map((week) => (
          <WeekCard
            key={week.number}
            week={week}
            progress={profileData.weeks[String(week.number)]!}
            onToggleTask={(taskId) => toggleTask(week.number, taskId)}
            onMarkComplete={() => markWeekComplete(week.number)}
          />
        ))}
      </div>
    </div>
  );
}
