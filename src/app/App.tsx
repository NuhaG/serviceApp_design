import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useEffect, useState } from "react";

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light' | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'dark') {
        setTheme('dark');
        return;
      }
      if (stored === 'light') {
        setTheme('light');
        return;
      }
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    } catch (e) {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    const onThemeChange = (e: Event) => {
      const customEvent = e as CustomEvent;
      const detail = customEvent.detail;
      if (detail === 'dark') {
        setTheme('dark');
        return;
      }
      if (detail === 'light') {
        setTheme('light');
        return;
      }
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key === 'theme') {
        const val = e.newValue;
        if (val === 'dark') setTheme('dark');
        else if (val === 'light') setTheme('light');
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

  return (
    <div className={theme === 'dark' ? 'dark' : ''}>
      <RouterProvider router={router} />
    </div>
  );
}
