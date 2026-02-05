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
import type { FortuneRequest } from "@/models/types/fortune/fortune-request";
import type { FortuneResult } from "@/models/types/fortune/fortune-result";

export default function FortuneCookie(): ReactElement {
  const locale = useLocale();
  const messages = localeMessages[locale];
  const [selectedCategory, setSelectedCategory] = useState<string>(
    fortuneOptions.jobCategories[locale][0],
  );
  const [selectedTone, setSelectedTone] = useState<FortuneRequest["tone"]>(
    fortuneOptions.toneOptions[locale][0],
  );
  const [isCracked, setIsCracked] = useState<boolean>(false);
  const [fortune, setFortune] = useState<FortuneResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, startTransition] = useTransition();
  const { executeCrackSound } = useCrackSound();

  useEffect(() => {
    setSelectedCategory(fortuneOptions.jobCategories[locale][0]);
    setSelectedTone(fortuneOptions.toneOptions[locale][0]);
    setErrorMessage(null);
    const storedFortune = fortuneStorage.readStoredFortune(locale);
    if (storedFortune) {
      setFortune(storedFortune);
      setIsCracked(true);
      return;
    }
    setFortune(null);
    setIsCracked(false);
  }, [locale]);

  const executeCrackAnimation = (): void => {
    setIsCracked(false);
    window.setTimeout(() => {
      setIsCracked(true);
    }, 30);
  };

  async function executeFortuneRequest(request: FortuneRequest): Promise<void> {
    const response = await requestFortuneAction({ request });
    if (response.success) {
      setFortune(response.data);
      if (response.data) {
        fortuneStorage.saveStoredFortune(locale, response.data);
      }
      setErrorMessage(null);
      clarityService.executeClarityEvent("fortune_success");
      return;
    }
    setFortune(null);
    setErrorMessage(messages.fortune.error);
    clarityService.executeClarityEvent("fortune_error");
  }

  function executeCrack(): void {
    clarityService.executeClarityEvent("fortune_crack");
    executeCrackAnimation();
    executeCrackSound();
    setErrorMessage(null);
    const storedFortune = fortuneStorage.readStoredFortune(locale);
    if (storedFortune) {
      setFortune(storedFortune);
      clarityService.executeClarityEvent("fortune_success");
      return;
    }
    const request: FortuneRequest = {
      locale,
      jobCategory: selectedCategory,
      tone: selectedTone,
    };
    startTransition(() => {
      void executeFortuneRequest(request);
    });
  }

  return (
    <section className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
      <FortuneCookieSelector
        selectedCategory={selectedCategory}
        selectedTone={selectedTone}
        onSelectCategory={setSelectedCategory}
        onSelectTone={setSelectedTone}
        onCrack={executeCrack}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
      <FortuneCookieCard isCracked={isCracked} fortune={fortune} />
    </section>
  );
}
