"use client";

import { useEffect, useSyncExternalStore } from "react";
import localeStore from "@/lib/services/locale-store";
import type { Locale } from "@/models/types/app/locale";

const getServerLocale = (): Locale => {
  return "en";
};

export default function useLocale(): Locale {
  const locale = useSyncExternalStore(
    localeStore.subscribe,
    localeStore.getLocale,
    getServerLocale,
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return locale;
}
