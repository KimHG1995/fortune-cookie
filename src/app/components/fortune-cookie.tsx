"use client";

import { useEffect, useState, useTransition } from "react";
import type { ReactElement } from "react";
import requestFortuneAction from "@/app/actions/request-fortune";
import FortuneCookieCard from "@/app/components/fortune-cookie-card";
import FortuneCookieSelector from "@/app/components/fortune-cookie-selector";
import fortuneOptions from "@/lib/core/fortune-options";
import useCrackSound from "@/lib/core/use-crack-sound";
import fortuneStorage from "@/lib/services/fortune-storage";
import type { FortuneRequest } from "@/models/types/fortune/fortune-request";
import type { FortuneResult } from "@/models/types/fortune/fortune-result";

const createInitialCategory = (): string => {
  return fortuneOptions.jobCategories[0];
};

export default function FortuneCookie(): ReactElement {
  const [selectedCategory, setSelectedCategory] = useState<string>(createInitialCategory());
  const [selectedTone, setSelectedTone] = useState<FortuneRequest["tone"]>("차분함");
  const [isCracked, setIsCracked] = useState<boolean>(false);
  const [fortune, setFortune] = useState<FortuneResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, startTransition] = useTransition();
  const { executeCrackSound } = useCrackSound();

  useEffect(() => {
    const storedFortune = fortuneStorage.readStoredFortune();
    if (!storedFortune) {
      return;
    }
    setFortune(storedFortune);
    setIsCracked(true);
  }, []);

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
        fortuneStorage.saveStoredFortune(response.data);
      }
      setErrorMessage(null);
      return;
    }
    setFortune(null);
    setErrorMessage(response.error?.detail ?? "요청에 실패했습니다.");
  }

  function executeCrack(): void {
    executeCrackAnimation();
    executeCrackSound();
    setErrorMessage(null);
    const storedFortune = fortuneStorage.readStoredFortune();
    if (storedFortune) {
      setFortune(storedFortune);
      return;
    }
    const request: FortuneRequest = {
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
