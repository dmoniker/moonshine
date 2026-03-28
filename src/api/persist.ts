import type { PersistedQuestData } from "../types";

const API = "/api/quest-data";

export async function loadQuestData(): Promise<unknown | null> {
  try {
    const res = await fetch(API);
    if (!res.ok) return null;
    const text = await res.text();
    if (!text.trim()) return null;
    return JSON.parse(text) as unknown;
  } catch {
    return null;
  }
}

export async function saveQuestData(data: PersistedQuestData): Promise<boolean> {
  try {
    const body = JSON.stringify(data, null, 2);
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });
    return res.ok;
  } catch {
    return false;
  }
}
