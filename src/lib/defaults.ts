import { WEEKS } from "../data/schedule";
import type {
  PersistedQuestData,
  ProfileProgress,
  WeekProgress,
} from "../types";

function emptyWeekProgress(tasks: string[]): WeekProgress {
  const tasksMap: Record<string, boolean> = {};
  for (const id of tasks) tasksMap[id] = false;
  return { completed: false, completedAt: null, tasks: tasksMap };
}

export function createDefaultProfile(): ProfileProgress {
  const weeks: Record<string, WeekProgress> = {};
  for (const w of WEEKS) {
    weeks[String(w.number)] = emptyWeekProgress(w.tasks.map((t) => t.id));
  }
  return {
    welcomeSeen: false,
    weeks,
    journal: [],
    modelUrl: "",
  };
}

export function createDefaultPersistedData(): PersistedQuestData {
  return {
    parent: createDefaultProfile(),
    son: createDefaultProfile(),
  };
}

/** Merge loaded JSON with defaults so new weeks/tasks never brick old saves. */
export function normalizePersistedData(raw: unknown): PersistedQuestData {
  const base = createDefaultPersistedData();
  if (!raw || typeof raw !== "object") return base;

  const o = raw as Record<string, unknown>;
  return {
    parent: mergeProfile(base.parent, o.parent),
    son: mergeProfile(base.son, o.son),
  };
}

function mergeProfile(defaults: ProfileProgress, incoming: unknown): ProfileProgress {
  if (!incoming || typeof incoming !== "object") return defaults;
  const p = incoming as Record<string, unknown>;

  const weeks: Record<string, WeekProgress> = { ...defaults.weeks };
  const incomingWeeks =
    p.weeks && typeof p.weeks === "object"
      ? (p.weeks as Record<string, unknown>)
      : {};

  for (const w of WEEKS) {
    const key = String(w.number);
    const def = defaults.weeks[key]!;
    const iw = incomingWeeks[key];
    const taskIds = w.tasks.map((t) => t.id);
    const mergedTasks: Record<string, boolean> = {};
    for (const id of taskIds) mergedTasks[id] = false;

    if (iw && typeof iw === "object") {
      const wk = iw as Record<string, unknown>;
      const completed = Boolean(wk.completed);
      const completedAt =
        typeof wk.completedAt === "string" ? wk.completedAt : null;
      const tIn =
        wk.tasks && typeof wk.tasks === "object"
          ? (wk.tasks as Record<string, unknown>)
          : {};
      for (const id of taskIds) {
        mergedTasks[id] = Boolean(tIn[id]);
      }
      weeks[key] = { completed, completedAt, tasks: mergedTasks };
    } else {
      weeks[key] = def;
    }
  }

  let journal = defaults.journal;
  if (Array.isArray(p.journal)) {
    journal = p.journal
      .filter(
        (e): e is { id: string; date: string; content: string } =>
          !!e &&
          typeof e === "object" &&
          typeof (e as { id?: unknown }).id === "string" &&
          typeof (e as { date?: unknown }).date === "string" &&
          typeof (e as { content?: unknown }).content === "string"
      )
      .map((e) => ({
        id: e.id,
        date: e.date,
        content: e.content,
      }));
  }

  return {
    welcomeSeen:
      typeof p.welcomeSeen === "boolean" ? p.welcomeSeen : defaults.welcomeSeen,
    weeks,
    journal,
    modelUrl: typeof p.modelUrl === "string" ? p.modelUrl : defaults.modelUrl,
  };
}
