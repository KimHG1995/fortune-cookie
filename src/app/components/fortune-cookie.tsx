"use client";

import { useRef, useState, useTransition } from "react";
import requestFortuneAction from "@/app/actions/request-fortune";
import type { FortuneRequest } from "@/models/types/fortune-request";
import type { FortuneResult } from "@/models/types/fortune";

const jobCategories: readonly string[] = [
  "기획",
  "디자인",
  "개발",
  "마케팅",
  "영업",
  "운영",
  "교육",
  "연구",
  "콘텐츠",
  "창업",
];

const toneOptions: readonly FortuneRequest["tone"][] = ["차분함", "유쾌함", "직설"];

type SelectorProps = {
  readonly selectedCategory: string;
  readonly selectedTone: FortuneRequest["tone"];
  readonly onSelectCategory: (value: string) => void;
  readonly onSelectTone: (value: FortuneRequest["tone"]) => void;
  readonly onCrack: () => void;
  readonly isLoading: boolean;
  readonly errorMessage: string | null;
};

type FortuneCardProps = {
  readonly isCracked: boolean;
  readonly fortune: FortuneResult | null;
};

function createNoiseBuffer(context: AudioContext): AudioBuffer {
  const duration = 0.2;
  const frameCount = Math.floor(context.sampleRate * duration);
  const buffer = context.createBuffer(1, frameCount, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < frameCount; index += 1) {
    const fade = 1 - index / frameCount;
    data[index] = (Math.random() * 2 - 1) * fade;
  }
  return buffer;
}

function playCrackSound(context: AudioContext): void {
  const source = context.createBufferSource();
  const filter = context.createBiquadFilter();
  const gain = context.createGain();
  source.buffer = createNoiseBuffer(context);
  filter.type = "highpass";
  filter.frequency.value = 800;
  gain.gain.value = 0.5;
  source.connect(filter).connect(gain).connect(context.destination);
  source.start();
}

function useAudioContext(): { play: () => void } {
  const audioContextRef = useRef<AudioContext | null>(null);
  function play(): void {
    const context = audioContextRef.current ?? new AudioContext();
    audioContextRef.current = context;
    if (context.state === "suspended") {
      void context.resume();
    }
    playCrackSound(context);
  }
  return { play };
}

const FortuneSelector = (props: SelectorProps): JSX.Element => {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
          일과 운세의 교집합
        </p>
        <h1 className="text-4xl font-semibold leading-tight text-ink md:text-5xl">
          포춘쿠키를 쪼개서,
          <br />
          오늘의 일을 정리하세요.
        </h1>
        <p className="max-w-xl text-base text-muted">
          무료 LLM 기반으로 오늘의 직업 흐름을 요약하고, 실행 가능한 행동을 한
          줄로 제안합니다. 쿠키가 갈라지는 순간, 바삭한 소리와 함께 당신만의
          가이드를 꺼내보세요.
        </p>
      </div>
      <div className="space-y-4">
        <p className="text-sm font-semibold text-ink">직업 분야 선택</p>
        <div className="flex flex-wrap gap-2">
          {jobCategories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => props.onSelectCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                props.selectedCategory === category
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/20 bg-paper text-ink hover:border-ink"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-sm font-semibold text-ink">톤 선택</p>
        <div className="flex flex-wrap gap-2">
          {toneOptions.map((tone) => (
            <button
              key={tone}
              type="button"
              onClick={() => props.onSelectTone(tone)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                props.selectedTone === tone
                  ? "border-accent bg-accent text-ink"
                  : "border-ink/20 bg-paper text-ink hover:border-accent"
              }`}
            >
              {tone}
            </button>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={props.onCrack}
        className="w-full rounded-full bg-ember px-6 py-4 text-base font-semibold text-paper shadow-[var(--shadow-soft)] transition hover:translate-y-[-2px]"
      >
        포춘쿠키 깨기
      </button>
      {props.isLoading && (
        <p className="text-sm text-muted">쿠키가 부서지는 중입니다...</p>
      )}
      {props.errorMessage && (
        <p className="text-sm text-ember">{props.errorMessage}</p>
      )}
    </div>
  );
};

const FortuneCard = (props: FortuneCardProps): JSX.Element => {
  return (
    <div
      className="cookie-crack rounded-3xl border border-ink/10 bg-surface p-6 shadow-[var(--shadow-soft)]"
      data-cracked={props.isCracked}
    >
      <div className="paper-grid rounded-2xl p-6">
        <div className="relative flex h-52 items-center justify-center">
          <div className="cookie-half cookie-left h-32 w-52 bg-accent" />
          <div className="cookie-half cookie-right h-32 w-52 bg-accent" />
          <div className="cookie-core absolute h-6 w-24 rounded-full bg-paper" />
          <div className="cookie-crumbs absolute -bottom-6 flex gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="h-3 w-3 rounded-full bg-accent-2" />
            <span className="h-2 w-2 rounded-full bg-accent" />
          </div>
        </div>
        <div className="mt-6 space-y-4 text-sm text-muted">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            오늘의 포춘
          </p>
          {props.fortune ? (
            <div className="space-y-3">
              <p className="text-lg font-semibold text-ink">{props.fortune.title}</p>
              <p>{props.fortune.summary}</p>
              <div className="rounded-2xl border border-ink/10 bg-paper p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  오늘의 실행
                </p>
                <p className="mt-2 text-sm text-ink">{props.fortune.action}</p>
              </div>
              <p className="text-sm">{props.fortune.caution}</p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-ink/10 bg-paper p-3">
                  <p className="text-muted">키워드</p>
                  <p className="mt-1 font-semibold text-ink">
                    {props.fortune.luckyKeyword}
                  </p>
                </div>
                <div className="rounded-xl border border-ink/10 bg-paper p-3">
                  <p className="text-muted">색</p>
                  <p className="mt-1 font-semibold text-ink">
                    {props.fortune.luckyColor}
                  </p>
                </div>
                <div className="rounded-xl border border-ink/10 bg-paper p-3">
                  <p className="text-muted">숫자</p>
                  <p className="mt-1 font-semibold text-ink">
                    {props.fortune.luckyNumber}
                  </p>
                </div>
                <div className="rounded-xl border border-ink/10 bg-paper p-3">
                  <p className="text-muted">시간</p>
                  <p className="mt-1 font-semibold text-ink">
                    {props.fortune.luckyTime}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p>쿠키를 깨면 결과가 나타납니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default function FortuneCookie(): JSX.Element {
  const [selectedCategory, setSelectedCategory] = useState<string>(jobCategories[0]);
  const [selectedTone, setSelectedTone] = useState<FortuneRequest["tone"]>("차분함");
  const [isCracked, setIsCracked] = useState<boolean>(false);
  const [fortune, setFortune] = useState<FortuneResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, startTransition] = useTransition();
  const { play } = useAudioContext();

  const triggerCrackAnimation = (): void => {
    setIsCracked(false);
    window.setTimeout(() => {
      setIsCracked(true);
    }, 30);
  };

  async function executeFortuneRequest(request: FortuneRequest): Promise<void> {
    const response = await requestFortuneAction({ request });
    if (response.success) {
      setFortune(response.data);
      setErrorMessage(null);
      return;
    }
    setFortune(null);
    setErrorMessage(response.error?.detail ?? "요청에 실패했습니다.");
  }

  function handleCrack(): void {
    triggerCrackAnimation();
    play();
    setErrorMessage(null);
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
      <FortuneSelector
        selectedCategory={selectedCategory}
        selectedTone={selectedTone}
        onSelectCategory={setSelectedCategory}
        onSelectTone={setSelectedTone}
        onCrack={handleCrack}
        isLoading={isLoading}
        errorMessage={errorMessage}
      />
      <FortuneCard isCracked={isCracked} fortune={fortune} />
    </section>
  );
}
