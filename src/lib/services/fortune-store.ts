"use client";

import fortuneStorage from "@/lib/services/fortune-storage";
import type { Locale } from "@/models/types/app/locale";
import type { FortuneResult } from "@/models/types/fortune/fortune-result";

type FortuneListener = () => void;

const listeners = new Set<FortuneListener>();

const subscribe = (listener: FortuneListener): (() => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const notify = (): void => {
  listeners.forEach((listener) => listener());
};

const getSnapshot = (locale: Locale): FortuneResult | null => {
  return fortuneStorage.readStoredFortune(locale);
};

const saveFortune = (locale: Locale, fortune: FortuneResult): void => {
  fortuneStorage.saveStoredFortune(locale, fortune);
  notify();
};

const fortuneStore = {
  subscribe,
  getSnapshot,
  saveFortune,
  notify,
};

export default fortuneStore;
