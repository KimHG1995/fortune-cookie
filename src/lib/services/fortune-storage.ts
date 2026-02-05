"use client";

import type { Locale } from "@/models/types/app/locale";
import type { FortuneResult } from "@/models/types/fortune/fortune-result";

type StoredFortune = {
  readonly date: string;
  readonly fortune: FortuneResult;
};

type FortuneStorage = {
  readonly readStoredFortune: (locale: Locale) => FortuneResult | null;
  readonly saveStoredFortune: (locale: Locale, fortune: FortuneResult) => void;
};

const createStorageKey = (locale: Locale): string => {
  return `fortune-cookie:daily:${locale}`;
};

const canUseStorage = (): boolean => {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
};

const createTodayKey = (): string => {
  return new Date().toISOString().slice(0, 10);
};

const isRecord = (input: unknown): input is Record<string, unknown> => {
  return typeof input === "object" && input !== null;
};

function isStoredFortune(input: unknown): input is StoredFortune {
  if (!isRecord(input)) {
    return false;
  }
  return typeof input.date === "string" && isRecord(input.fortune);
}

function parseStoredFortune(raw: string): StoredFortune | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isStoredFortune(parsed)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function readStoredFortune(locale: Locale): FortuneResult | null {
  if (!canUseStorage()) {
    return null;
  }
  const raw = localStorage.getItem(createStorageKey(locale));
  if (!raw) {
    return null;
  }
  const stored = parseStoredFortune(raw);
  if (!stored) {
    return null;
  }
  if (stored.date !== createTodayKey()) {
    return null;
  }
  return stored.fortune;
}

function saveStoredFortune(locale: Locale, fortune: FortuneResult): void {
  if (!canUseStorage()) {
    return;
  }
  const payload: StoredFortune = {
    date: createTodayKey(),
    fortune,
  };
  localStorage.setItem(createStorageKey(locale), JSON.stringify(payload));
}

const fortuneStorage: FortuneStorage = {
  readStoredFortune,
  saveStoredFortune,
};

export default fortuneStorage;
