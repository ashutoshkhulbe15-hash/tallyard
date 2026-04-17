"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import type { UnitSystem } from "./types";

interface UnitContextValue {
  units: UnitSystem;
  setUnits: (u: UnitSystem) => void;
  toggleUnits: () => void;
}

const UnitContext = createContext<UnitContextValue | null>(null);

const STORAGE_KEY = "tallyard-units";

export function UnitProvider({ children }: { children: ReactNode }) {
  // Default to imperial for initial render (SSR-safe), then hydrate from storage
  const [units, setUnitsState] = useState<UnitSystem>("imperial");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === "metric" || stored === "imperial") {
        setUnitsState(stored);
      }
    } catch {
      // localStorage unavailable (private browsing, etc.) — stay on imperial
    }
  }, []);

  const setUnits = (u: UnitSystem) => {
    setUnitsState(u);
    try {
      localStorage.setItem(STORAGE_KEY, u);
    } catch {
      // Ignore storage errors
    }
  };

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
