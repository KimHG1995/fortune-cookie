"use client";

import { useEffect, useState, useTransition } from "react";
import type { ReactElement } from "react";
import requestFortuneAction from "@/app/actions/request-fortune";
import FortuneCookieCard from "@/app/components/fortune-cookie-card";
import FortuneCookieSelector from "@/app/components/fortune-cookie-selector";
import fortuneOptions from "@/lib/core/fortune-options";
import localeMessages from "@/lib/core/locale-messages";
import useLocale from "@/lib/core/use-locale";
import useCrackSound from "@/lib/core/use-crack-sound";
import clarityService from "@/lib/services/clarity-service";
import fortuneStorage from "@/lib/services/fortune-storage";
import type { Locale } from "@/models/types/app/locale";
import type { FortuneRequest } from "@/models/types/fortune/fortune-request";
import type { FortuneResult } from "@/models/types/fortune/fortune-result";

type LocaleSelection = {
  readonly category: string;
  readonly tone: FortuneRequest["tone"];
};

type LocaleMap<T> = {
  readonly [key in Locale]: T;
};

const createInitialSelections = (): LocaleMap<LocaleSelection> => {
  return {
    ko: {
      category: fortuneOptions.jobCategories.ko[0],
      tone: fortuneOptions.toneOptions.ko[0],
    },
    en: {
      category: fortuneOptions.jobCategories.en[0],
      tone: fortuneOptions.toneOptions.en[0],
    },
  };
};

const createInitialFortunes = (): LocaleMap<FortuneResult | null> => {
  return { ko: null, en: null };
};

const createInitialCrackedState = (): LocaleMap<boolean> => {
  return { ko: false, en: false };
};

const createInitialErrors = (): LocaleMap<string | null> => {
  return { ko: null, en: null };
};

export default function FortuneCookie(): ReactElement {
  const locale = useLocale();
  const messages = localeMessages[locale];
  const [selections, setSelections] = useState<LocaleMap<LocaleSelection>>(
    createInitialSelections,
  );
  const [fortunes, setFortunes] = useState<LocaleMap<FortuneResult | null>>(
    createInitialFortunes,
  );
  const [crackedState, setCrackedState] = useState<LocaleMap<boolean>>(
    createInitialCrackedState,
  );
  const [errors, setErrors] = useState<LocaleMap<string | null>>(
    createInitialErrors,
  );
  const [isLoading, startTransition] = useTransition();
  const { executeCrackSound } = useCrackSound();
  const selection = selections[locale];
  const fortune = fortunes[locale];
  const isCracked = crackedState[locale];
  const errorMessage = errors[locale];

  useEffect(() => {
    const storedFortune = fortuneStorage.readStoredFortune(locale);
    if (storedFortune) {
      setFortunes((prev) => ({ ...prev, [locale]: storedFortune }));
      setCrackedState((prev) => ({ ...prev, [locale]: true }));
      return;
    }
    setFortunes((prev) =>
      prev[locale] === null ? prev : { ...prev, [locale]: null },
    );
    setCrackedState((prev) =>
      prev[locale] ? { ...prev, [locale]: false } : prev,
    );
  }, [locale]);

  const executeCrackAnimation = (): void => {
    setCrackedState((prev) => ({ ...prev, [locale]: false }));
    window.setTimeout(() => {
      setCrackedState((prev) => ({ ...prev, [locale]: true }));
    }, 30);
  };

  async function executeFortuneRequest(request: FortuneRequest): Promise<void> {
    const response = await requestFortuneAction({ request });
    if (response.success) {
      if (response.data) {
        setFortunes((prev) => ({ ...prev, [locale]: response.data }));
        fortuneStorage.saveStoredFortune(locale, response.data);
      }
      setErrors((prev) => ({ ...prev, [locale]: null }));
      clarityService.executeClarityEvent("fortune_success");
      return;
    }
    setFortunes((prev) => ({ ...prev, [locale]: null }));
    setErrors((prev) => ({ ...prev, [locale]: messages.fortune.error }));
    clarityService.executeClarityEvent("fortune_error");
  }

  function executeCrack(): void {
    clarityService.executeClarityEvent("fortune_crack");
    executeCrackAnimation();
    executeCrackSound();
    setErrors((prev) => ({ ...prev, [locale]: null }));
    const storedFortune = fortuneStorage.readStoredFortune(locale);
    if (storedFortune) {
      setFortunes((prev) => ({ ...prev, [locale]: storedFortune }));
      setCrackedState((prev) => ({ ...prev, [locale]: true }));
      clarityService.executeClarityEvent("fortune_success");
      return;
    }
    if (fortune) {
      setFortunes((prev) => ({ ...prev, [locale]: null }));
      setCrackedState((prev) => ({ ...prev, [locale]: false }));
    }
    const request: FortuneRequest = {
      locale,
      jobCategory: selection.category,
      tone: selection.tone,
    };
    startTransition(() => {
      void executeFortuneRequest(request);
    });
  }

  const handleSelectCategory = (value: string): void => {
    setSelections((prev) => ({
      ...prev,
      [locale]: { ...prev[locale], category: value },
    }));
  };

  const handleSelectTone = (value: FortuneRequest["tone"]): void => {
    setSelections((prev) => ({
      ...prev,
      [locale]: { ...prev[locale], tone: value },
    }));
  };

  return (
    <section className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
      <FortuneCookieSelector
        selectedCategory={selection.category}
        selectedTone={selection.tone}
        onSelectCategory={handleSelectCategory}
        onSelectTone={handleSelectTone}
        onCrack={executeCrack}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
      <FortuneCookieCard isCracked={isCracked} fortune={fortune} />
    </section>
  );
}
