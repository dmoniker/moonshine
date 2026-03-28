import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { loadQuestData, saveQuestData } from "../api/persist";
import { WEEKS } from "../data/schedule";
import {
  createDefaultPersistedData,
  normalizePersistedData,
} from "../lib/defaults";
import type {
  JournalEntry,
  PersistedQuestData,
  ProfileId,
  ProfileProgress,
  TabId,
} from "../types";

interface QuestContextValue {
  ready: boolean;
  profile: ProfileId;
  setProfile: (p: ProfileId) => void;
  activeTab: TabId;
  setActiveTab: (t: TabId) => void;
  data: PersistedQuestData;
  profileData: ProfileProgress;
  /** Current week focus (first incomplete week, else 8) */
  currentWeekNumber: number;
  setWelcomeSeen: () => void;
  toggleTask: (weekNum: number, taskId: string) => void;
  markWeekComplete: (weekNum: number) => void;
  addJournalEntry: (date: string, content: string) => void;
  deleteJournalEntry: (id: string) => void;
  setModelUrl: (url: string) => void;
  showCelebrate: { weekNum: number } | null;
  dismissCelebrate: () => void;
  showQuestSync: boolean;
  setShowQuestSync: (v: boolean) => void;
}

const QuestContext = createContext<QuestContextValue | null>(null);

const SAVE_DEBOUNCE_MS = 450;

/** First week not yet marked complete; if all done, 8 (victory lap / capstone). */
function firstIncompleteWeek(p: ProfileProgress): number {
  for (const w of WEEKS) {
    const wp = p.weeks[String(w.number)]!;
    if (!wp.completed) return w.number;
  }
  return 8;
}

function weekProgressFraction(p: ProfileProgress): number {
  let done = 0;
  let total = 0;
  for (const w of WEEKS) {
    const wp = p.weeks[String(w.number)]!;
    if (wp.completed) {
      done += w.tasks.length;
      total += w.tasks.length;
      continue;
    }
    for (const t of w.tasks) {
      total += 1;
      if (wp.tasks[t.id]) done += 1;
    }
  }
  return total === 0 ? 0 : done / total;
}

export function QuestProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [data, setData] = useState<PersistedQuestData>(createDefaultPersistedData);
  const [profile, setProfileState] = useState<ProfileId>("parent");
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const [showCelebrate, setShowCelebrate] = useState<{ weekNum: number } | null>(
    null
  );
  const [showQuestSync, setShowQuestSync] = useState(false);

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dataRef = useRef(data);
  dataRef.current = data;

  const scheduleSave = useCallback(() => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      void saveQuestData(dataRef.current);
    }, SAVE_DEBOUNCE_MS);
  }, []);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const raw = await loadQuestData();
      if (cancelled) return;
      const normalized = normalizePersistedData(raw ?? {});
      setData(normalized);
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    scheduleSave();
  }, [data, ready, scheduleSave]);

  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      void saveQuestData(dataRef.current);
    };
  }, []);

  const profileData = data[profile];

  const currentWeekNumber = useMemo(
    () => firstIncompleteWeek(profileData),
    [profileData]
  );

  const setProfile = useCallback((p: ProfileId) => {
    setProfileState(p);
  }, []);

  const patchProfile = useCallback(
    (fn: (prev: ProfileProgress) => ProfileProgress) => {
      setData((d) => ({
        ...d,
        [profile]: fn(d[profile]),
      }));
    },
    [profile]
  );

  const setWelcomeSeen = useCallback(() => {
    patchProfile((prev) => ({ ...prev, welcomeSeen: true }));
  }, [patchProfile]);

  const toggleTask = useCallback(
    (weekNum: number, taskId: string) => {
      patchProfile((prev) => {
        const wk = prev.weeks[String(weekNum)]!;
        return {
          ...prev,
          weeks: {
            ...prev.weeks,
            [String(weekNum)]: {
              ...wk,
              tasks: { ...wk.tasks, [taskId]: !wk.tasks[taskId] },
            },
          },
        };
      });
    },
    [patchProfile]
  );

  const markWeekComplete = useCallback(
    (weekNum: number) => {
      patchProfile((prev) => {
        const wk = prev.weeks[String(weekNum)]!;
        const weekDef = WEEKS.find((w) => w.number === weekNum)!;
        const tasks = { ...wk.tasks };
        for (const t of weekDef.tasks) tasks[t.id] = true;
        return {
          ...prev,
          weeks: {
            ...prev.weeks,
            [String(weekNum)]: {
              completed: true,
              completedAt: new Date().toISOString(),
              tasks,
            },
          },
        };
      });
      setShowCelebrate({ weekNum });
    },
    [patchProfile]
  );

  const addJournalEntry = useCallback(
    (date: string, content: string) => {
      const entry: JournalEntry = {
        id: crypto.randomUUID(),
        date,
        content: content.trim(),
      };
      if (!entry.content) return;
      patchProfile((prev) => ({
        ...prev,
        journal: [entry, ...prev.journal],
      }));
    },
    [patchProfile]
  );

  const deleteJournalEntry = useCallback(
    (id: string) => {
      patchProfile((prev) => ({
        ...prev,
        journal: prev.journal.filter((e) => e.id !== id),
      }));
    },
    [patchProfile]
  );

  const setModelUrl = useCallback(
    (url: string) => {
      patchProfile((prev) => ({ ...prev, modelUrl: url }));
    },
    [patchProfile]
  );

  const dismissCelebrate = useCallback(() => setShowCelebrate(null), []);

  const value = useMemo<QuestContextValue>(
    () => ({
      ready,
      profile,
      setProfile,
      activeTab,
      setActiveTab,
      data,
      profileData,
      currentWeekNumber,
      setWelcomeSeen,
      toggleTask,
      markWeekComplete,
      addJournalEntry,
      deleteJournalEntry,
      setModelUrl,
      showCelebrate,
      dismissCelebrate,
      showQuestSync,
      setShowQuestSync,
    }),
    [
      ready,
      profile,
      activeTab,
      data,
      profileData,
      currentWeekNumber,
      setWelcomeSeen,
      toggleTask,
      markWeekComplete,
      addJournalEntry,
      deleteJournalEntry,
      setModelUrl,
      showCelebrate,
      dismissCelebrate,
      showQuestSync,
    ]
  );

  return (
    <QuestContext.Provider value={value}>{children}</QuestContext.Provider>
  );
}

export function useQuest() {
  const ctx = useContext(QuestContext);
  if (!ctx) throw new Error("useQuest outside QuestProvider");
  return ctx;
}

export function useWeekProgressFraction() {
  const { profileData } = useQuest();
  return useMemo(() => weekProgressFraction(profileData), [profileData]);
}
