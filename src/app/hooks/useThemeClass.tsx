import { useEffect, useState } from "react";

export function useThemeClass() {
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("theme");
      if (stored === "dark") {
        setIsDark(true);
        return;
      }
      if (stored === "light") {
        setIsDark(false);
        return;
      }
      const prefersDark =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      setIsDark(!!prefersDark);
    } catch (e) {
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
    const onThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const detail = customEvent.detail;
      if (detail === 'dark') {
        setIsDark(true);
        return;
      }
      if (detail === 'light') {
        setIsDark(false);
        return;
      }
      // Fallback: read from DOM if detail not provided
      try {
        const isDark = document.documentElement.classList.contains('dark');
        setIsDark(isDark);
      } catch (_) {}
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'theme') {
        const val = e.newValue;
        if (val === 'dark') setIsDark(true);
        else if (val === 'light') setIsDark(false);
      }
    };

    // Listen to custom theme change event
    window.addEventListener('themechange', onThemeChange as EventListener);
    // Listen to storage events (other tabs)
    window.addEventListener('storage', onStorage as EventListener);

    return () => {
      window.removeEventListener('themechange', onThemeChange as EventListener);
      window.removeEventListener('storage', onStorage as EventListener);
    };
  }, []);

  if (isDark === null) return "";
  return isDark ? "dark" : "";
}
