"use client";

import type { StoredContactSubmission } from "@/models/types/contact/contact-submission-storage";

type ContactSubmissionStorage = {
  readonly readStoredSubmission: () => StoredContactSubmission | null;
  readonly saveStoredSubmission: (input: StoredContactSubmission) => void;
};

const storageKey = "contact:daily";

const createTodayKey = (): string => {
  return new Date().toISOString().slice(0, 10);
};

const isRecord = (input: unknown): input is Record<string, unknown> => {
  return typeof input === "object" && input !== null;
};

function isStoredSubmission(input: unknown): input is StoredContactSubmission {
  if (!isRecord(input)) {
    return false;
  }
  return typeof input.date === "string" && typeof input.submittedAt === "string";
}

function parseStoredSubmission(raw: string): StoredContactSubmission | null {
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isStoredSubmission(parsed)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function readStoredSubmission(): StoredContactSubmission | null {
  const raw = localStorage.getItem(storageKey);
  if (!raw) {
    return null;
  }
  const stored = parseStoredSubmission(raw);
  if (!stored) {
    localStorage.removeItem(storageKey);
    return null;
  }
  if (stored.date !== createTodayKey()) {
    return null;
  }
  return stored;
}

function saveStoredSubmission(input: StoredContactSubmission): void {
  localStorage.setItem(storageKey, JSON.stringify(input));
}

const contactSubmissionStorage: ContactSubmissionStorage = {
  readStoredSubmission,
  saveStoredSubmission,
};

export default contactSubmissionStorage;
