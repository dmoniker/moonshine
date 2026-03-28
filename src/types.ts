/** Which family member is viewing / updating state. */
export type ProfileId = "parent" | "son";

export interface JournalEntry {
  id: string;
  date: string;
  content: string;
}

export interface WeekProgress {
  completed: boolean;
  completedAt: string | null;
  tasks: Record<string, boolean>;
}

export interface ProfileProgress {
  welcomeSeen: boolean;
  weeks: Record<string, WeekProgress>;
  journal: JournalEntry[];
  /** Optional link to deployed model / demo at end of quest */
  modelUrl: string;
}

/** Root object persisted to distillation_progress.json */
export interface PersistedQuestData {
  parent: ProfileProgress;
  son: ProfileProgress;
}

export type TabId =
  | "dashboard"
  | "plan"
  | "journal"
  | "resources"
  | "model";
