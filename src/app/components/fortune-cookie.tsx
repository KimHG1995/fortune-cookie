"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import type { ReactElement } from "react";
import requestFortuneAction from "@/app/actions/request-fortune";
import FortuneCookieEmoji from "@/app/components/fortune-cookie-emoji";
import type { FortuneCookieCardProps } from "@/models/types/ui/fortune-cookie-card-props";
import type { FortuneCookieSelectorProps } from "@/models/types/ui/fortune-cookie-selector-props";
import type { FortuneRequest } from "@/models/types/fortune/fortune-request";
import type { FortuneResult } from "@/models/types/fortune/fortune-result";

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

function createNoiseBuffer(context: AudioContext, duration: number): AudioBuffer {
  const frameCount = Math.floor(context.sampleRate * duration);
  const buffer = context.createBuffer(1, frameCount, context.sampleRate);
  const data = buffer.getChannelData(0);
  for (let index = 0; index < frameCount; index += 1) {
    const position = index / frameCount;
    const fade = 1 - position;
    const jitter = Math.random() * 2 - 1;
    data[index] = jitter * fade;
  }
  return buffer;
}

function scheduleGainEnvelope(
  gain: GainNode,
  startTime: number,
  peak: number,
  decay: number,
): void {
  gain.gain.setValueAtTime(0, startTime);
  gain.gain.linearRampToValueAtTime(peak, startTime + 0.01);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + decay);
}

function playNoiseBurst(input: {
  context: AudioContext;
  startTime: number;
  duration: number;
  filterType: BiquadFilterType;
  frequency: number;
  peak: number;
}): void {
  const source = input.context.createBufferSource();
  const filter = input.context.createBiquadFilter();
  const gain = input.context.createGain();
  source.buffer = createNoiseBuffer(input.context, input.duration);
  filter.type = input.filterType;
  filter.frequency.value = input.frequency;
  scheduleGainEnvelope(gain, input.startTime, input.peak, input.duration);
  source.connect(filter).connect(gain).connect(input.context.destination);
  source.start(input.startTime);
  source.stop(input.startTime + input.duration);
}

function playClick(input: {
  context: AudioContext;
  startTime: number;
  frequency: number;
  duration: number;
  peak: number;
}): void {
  const oscillator = input.context.createOscillator();
  const gain = input.context.createGain();
  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(input.frequency, input.startTime);
  scheduleGainEnvelope(gain, input.startTime, input.peak, input.duration);
  oscillator.connect(gain).connect(input.context.destination);
  oscillator.start(input.startTime);
  oscillator.stop(input.startTime + input.duration);
}

function playThump(input: {
  context: AudioContext;
  startTime: number;
  frequency: number;
  duration: number;
  peak: number;
}): void {
  const oscillator = input.context.createOscillator();
  const gain = input.context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(input.frequency, input.startTime);
  scheduleGainEnvelope(gain, input.startTime, input.peak, input.duration);
  oscillator.connect(gain).connect(input.context.destination);
  oscillator.start(input.startTime);
  oscillator.stop(input.startTime + input.duration);
}

function playCrackSoundSynth(context: AudioContext): void {
  const now = context.currentTime;
  const randomRange = (range: number): number => (Math.random() - 0.5) * range;

  playThump({
    context,
    startTime: now,
    duration: 0.26,
    frequency: 130 + randomRange(12),
    peak: 0.55,
  });
  playNoiseBurst({
    context,
    startTime: now + 0.01,
    duration: 0.14,
    filterType: "bandpass",
    frequency: 520 + randomRange(60),
    peak: 0.2,
  });
  playNoiseBurst({
    context,
    startTime: now + 0.03,
    duration: 0.24,
    filterType: "lowpass",
    frequency: 460 + randomRange(50),
    peak: 0.18,
  });
  playNoiseBurst({
    context,
    startTime: now + 0.05,
    duration: 0.34,
    filterType: "lowpass",
    frequency: 400,
    peak: 0.15,
  });
  playNoiseBurst({
    context,
    startTime: now + 0.09,
    duration: 0.4,
    filterType: "lowpass",
    frequency: 330,
    peak: 0.1,
  });
  playClick({
    context,
    startTime: now + 0.015,
    frequency: 520 + randomRange(50),
    duration: 0.06,
    peak: 0.08,
  });
}

function playCrackLowEndBoost(context: AudioContext): void {
  const now = context.currentTime;
  const randomRange = (range: number): number => (Math.random() - 0.5) * range;

  playThump({
    context,
    startTime: now,
    duration: 0.16,
    frequency: 120 + randomRange(10),
    peak: 0.28,
  });
  playNoiseBurst({
    context,
    startTime: now + 0.02,
    duration: 0.16,
    filterType: "lowpass",
    frequency: 360,
    peak: 0.08,
  });
  playNoiseBurst({
    context,
    startTime: now + 0.08,
    duration: 0.2,
    filterType: "lowpass",
    frequency: 280,
    peak: 0.06,
  });
}

const crackSoundUrl = "/sounds/fortune-cookie.mp3";

function useCrackSound(): { play: () => void } {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const audioGainRef = useRef<GainNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  function play(): void {
    const context = audioContextRef.current ?? new AudioContext();
    audioContextRef.current = context;
    if (context.state === "suspended") {
      void context.resume();
    }
    const audio = audioRef.current ?? new Audio(crackSoundUrl);
    audioRef.current = audio;
    audio.preload = "auto";
    audio.currentTime = 0;
    if (!audioSourceRef.current) {
      const source = context.createMediaElementSource(audio);
      const gain = context.createGain();
      gain.gain.value = 0.8;
      source.connect(gain).connect(context.destination);
      audioSourceRef.current = source;
      audioGainRef.current = gain;
    }
    const playResult = audio.play();
    if (!playResult) {
      playCrackLowEndBoost(context);
      return;
    }
    playResult
      .then(() => {
        playCrackLowEndBoost(context);
      })
      .catch(() => {
        playCrackSoundSynth(context);
      });
  }

  return { play };
}

const FortuneSelector = (props: FortuneCookieSelectorProps): ReactElement => {
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

const FortuneCard = (props: FortuneCookieCardProps): ReactElement => {
  const stripText = props.fortune?.luckyKeyword ?? "GOOD LUCK";

  return (
    <div
      className="cookie-crack rounded-3xl border border-ink/10 bg-surface p-6 shadow-[var(--shadow-soft)]"
      data-cracked={props.isCracked}
    >
      <div className="paper-grid rounded-2xl p-6">
        <FortuneCookieEmoji stripText={stripText} />
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

export default function FortuneCookie(): ReactElement {
  const [selectedCategory, setSelectedCategory] = useState<string>(jobCategories[0]);
  const [selectedTone, setSelectedTone] = useState<FortuneRequest["tone"]>("차분함");
  const [isCracked, setIsCracked] = useState<boolean>(false);
  const [fortune, setFortune] = useState<FortuneResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, startTransition] = useTransition();
  const { play } = useCrackSound();
  const storageKey = "fortune-cookie:daily";

  const getTodayKey = (): string => {
    return new Date().toISOString().slice(0, 10);
  };

  const isRecord = (input: unknown): input is Record<string, unknown> => {
    return typeof input === "object" && input !== null;
  };

  const isFortuneResult = (input: unknown): input is FortuneResult => {
    if (!isRecord(input)) {
      return false;
    }
    return (
      typeof input.title === "string" &&
      typeof input.summary === "string" &&
      typeof input.action === "string" &&
      typeof input.caution === "string" &&
      typeof input.luckyKeyword === "string" &&
      typeof input.luckyColor === "string" &&
      typeof input.luckyNumber === "number" &&
      typeof input.luckyTime === "string"
    );
  };

  const readStoredFortune = (): FortuneResult | null => {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
      return null;
    }
    try {
      const parsed: unknown = JSON.parse(raw);
      if (!isRecord(parsed)) {
        return null;
      }
      const date = parsed.date;
      const fortuneData = parsed.fortune;
      if (typeof date !== "string" || !isFortuneResult(fortuneData)) {
        return null;
      }
      if (date !== getTodayKey()) {
        return null;
      }
      return fortuneData;
    } catch {
      return null;
    }
  };

  const saveStoredFortune = (result: FortuneResult): void => {
    const payload = {
      date: getTodayKey(),
      fortune: result,
    };
    localStorage.setItem(storageKey, JSON.stringify(payload));
  };

  useEffect(() => {
    const storedFortune = readStoredFortune();
    if (!storedFortune) {
      return;
    }
    setFortune(storedFortune);
    setIsCracked(true);
  }, []);

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
      if (response.data) {
        saveStoredFortune(response.data);
      }
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
    const storedFortune = readStoredFortune();
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
