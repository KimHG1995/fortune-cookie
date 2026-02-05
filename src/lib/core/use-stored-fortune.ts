"use client";

import { useSyncExternalStore } from "react";
import fortuneStore from "@/lib/services/fortune-store";
import type { Locale } from "@/models/types/app/locale";
import type { FortuneResult } from "@/models/types/fortune/fortune-result";

const getServerSnapshot = (): FortuneResult | null => {
  return null;
};

export default function useStoredFortune(locale: Locale): FortuneResult | null {
  return useSyncExternalStore(
    fortuneStore.subscribe,
    () => fortuneStore.getSnapshot(locale),
    getServerSnapshot,
  );
}
