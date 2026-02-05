"use client";

import type { Locale } from "@/models/types/app/locale";

type LocaleListener = () => void;

const storageKey = "fortune-cookie:locale";
const defaultLocale: Locale = "en";

const isLocale = (value: unknown): value is Locale => {
  return value === "ko" || value === "en";
};

let currentLocale: Locale = defaultLocale;
const listeners = new Set<LocaleListener>();

const getLocale = (): Locale => {
  return currentLocale;
};

const readStoredLocale = (): Locale => {
  if (typeof window === "undefined") {
    return defaultLocale;
  }
  const stored = window.localStorage.getItem(storageKey);
  if (!stored) {
    return defaultLocale;
  }
  return isLocale(stored) ? stored : defaultLocale;
};

const syncLocale = (): void => {
  const stored = readStoredLocale();
  if (stored === currentLocale) {
    return;
  }
  currentLocale = stored;
  listeners.forEach((listener) => listener());
};

const setLocale = (locale: Locale): void => {
  if (locale === currentLocale) {
    return;
  }
  currentLocale = locale;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(storageKey, locale);
  }
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: LocaleListener): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const localeStore = {
  getLocale,
  setLocale,
  syncLocale,
  subscribe,
};

export default localeStore;
