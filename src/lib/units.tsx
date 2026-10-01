"use client";

import { createContext, useContext, useSyncExternalStore, ReactNode } from "react";
import type { UnitSystem } from "./types";

interface UnitContextValue {
  units: UnitSystem;
  setUnits: (u: UnitSystem) => void;
  toggleUnits: () => void;
}

const UnitContext = createContext<UnitContextValue | null>(null);

const STORAGE_KEY = "tallyard-units";
const CHANGE_EVENT = "tallyard-units-change";
let currentUnits: UnitSystem | undefined;

function getSnapshot(): UnitSystem {
  if (currentUnits) return currentUnits;
  const shared = new URLSearchParams(window.location.search).get("units");
  if (shared === "metric" || shared === "imperial") return (currentUnits = shared);
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "metric" || stored === "imperial") return (currentUnits = stored);
  } catch { /* Storage can be unavailable in private browsing. */ }
  return (currentUnits = "imperial");
}

function subscribe(onChange: () => void) {
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    currentUnits = event.newValue === "metric" ? "metric" : "imperial";
    onChange();
  };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener("storage", onStorage);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function setUnits(u: UnitSystem) {
  currentUnits = u;
  try { localStorage.setItem(STORAGE_KEY, u); } catch { /* Ignore unavailable storage. */ }
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

export function UnitProvider({ children }: { children: ReactNode }) {
  // The server snapshot is stable; the client subscribes to browser preferences.
  const units = useSyncExternalStore(subscribe, getSnapshot, () => "imperial" as UnitSystem);

  const toggleUnits = () => {
    setUnits(units === "imperial" ? "metric" : "imperial");
  };

  return (
    <UnitContext.Provider value={{ units, setUnits, toggleUnits }}>
      {children}
    </UnitContext.Provider>
  );
}

export function useUnits(): UnitContextValue {
  const ctx = useContext(UnitContext);
  if (!ctx) {
    // Graceful fallback if used outside provider — just return imperial
    return {
      units: "imperial",
      setUnits: () => {},
      toggleUnits: () => {},
    };
  }
  return ctx;
}
