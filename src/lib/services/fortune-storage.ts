"use client";

import type { FortuneResult } from "@/models/types/fortune/fortune-result";

type StoredFortune = {
  readonly date: string;
  readonly fortune: FortuneResult;
};

type FortuneStorage = {
  readonly readStoredFortune: () => FortuneResult | null;
  readonly saveStoredFortune: (fortune: FortuneResult) => void;
};

const storageKey = "fortune-cookie:daily";

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

function readStoredFortune(): FortuneResult | null {
  const raw = localStorage.getItem(storageKey);
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

function saveStoredFortune(fortune: FortuneResult): void {
  const payload: StoredFortune = {
    date: createTodayKey(),
    fortune,
  };
  localStorage.setItem(storageKey, JSON.stringify(payload));
}

const fortuneStorage: FortuneStorage = {
  readStoredFortune,
  saveStoredFortune,
};

export default fortuneStorage;
