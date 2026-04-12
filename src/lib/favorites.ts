"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "yingqu:favorites:v2";
export const MAX_FAVORITES = 30;

export type FavoriteEntry = { schoolId: string; programId: string };
type StoredShape = { entries: FavoriteEntry[]; updatedAt: number };

function readStorage(): FavoriteEntry[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as StoredShape;
    if (!parsed || !Array.isArray(parsed.entries)) return [];
    return parsed.entries.filter(
      (e): e is FavoriteEntry =>
        e != null &&
        typeof e === "object" &&
        typeof (e as FavoriteEntry).schoolId === "string" &&
        typeof (e as FavoriteEntry).programId === "string"
    );
  } catch {
    return [];
  }
}

function writeStorage(entries: FavoriteEntry[]): void {
  if (typeof window === "undefined") return;
  try {
    const payload: StoredShape = { entries, updatedAt: Date.now() };
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* quota / privacy mode — silently ignore */
  }
}

export function useFavorites() {
  const [entries, setEntries] = useState<FavoriteEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage on mount (client only)
  useEffect(() => {
    setEntries(readStorage());
    setHydrated(true);
  }, []);

  // Persist whenever entries change (after hydration)
  useEffect(() => {
    if (!hydrated) return;
    writeStorage(entries);
  }, [entries, hydrated]);

  const programIdSet = useMemo(
    () => new Set(entries.map((e) => e.programId)),
    [entries]
  );

  const toggle = useCallback((schoolId: string, programId: string) => {
    setEntries((prev) => {
      const idx = prev.findIndex((e) => e.programId === programId);
      if (idx >= 0) {
        return prev.filter((_, i) => i !== idx);
      }
      if (prev.length >= MAX_FAVORITES) return prev;
      return [...prev, { schoolId, programId }];
    });
  }, []);

  const has = useCallback(
    (programId: string) => programIdSet.has(programId),
    [programIdSet]
  );

  const clear = useCallback(() => setEntries([]), []);

  /** Unique school ids in favorites, preserving insertion order. */
  const schoolIds = useMemo(() => {
    const seen = new Set<string>();
    const out: string[] = [];
    for (const e of entries) {
      if (!seen.has(e.schoolId)) {
        seen.add(e.schoolId);
        out.push(e.schoolId);
      }
    }
    return out;
  }, [entries]);

  const programIds = useMemo(() => entries.map((e) => e.programId), [entries]);

  return {
    entries,
    schoolIds,
    programIds,
    count: entries.length,
    toggle,
    has,
    clear,
    hydrated,
  };
}
