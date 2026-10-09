import { useMemo, useState, useSyncExternalStore } from "react";
const key = "hanlingo:word-notebook:v1";
const eventName = "hanlingo-word-notebook";
export function parseNotebook(value: string | null): string[] {
  try {
    const parsed: unknown = JSON.parse(value ?? "[]");
    return Array.isArray(parsed)
      ? [
          ...new Set(
            parsed.filter((id): id is string => typeof id === "string"),
          ),
        ]
      : [];
  } catch {
    return [];
  }
}
const snapshot = () => {
  try {
    return localStorage.getItem(key) ?? "[]";
  } catch {
    return "[]";
  }
};
const subscribe = (notify: () => void) => {
  window.addEventListener("storage", notify);
  window.addEventListener(eventName, notify);
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener(eventName, notify);
  };
};
export function useWordNotebook() {
  const raw = useSyncExternalStore(subscribe, snapshot, () => "[]");
  const saved = useMemo(() => parseNotebook(raw), [raw]);
  const [error, setError] = useState(false);
  const toggle = (id: string) => {
    const current = parseNotebook(snapshot());
    const next = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];
    try {
      localStorage.setItem(key, JSON.stringify(next));
      window.dispatchEvent(new Event(eventName));
      setError(false);
    } catch {
      setError(true);
    }
  };
  return { saved, toggle, error };
}
