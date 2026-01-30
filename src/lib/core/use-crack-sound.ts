"use client";

import { useRef } from "react";

type NoiseBurstInput = {
  readonly context: AudioContext;
  readonly startTime: number;
  readonly duration: number;
  readonly filterType: BiquadFilterType;
  readonly frequency: number;
  readonly peak: number;
};

type ClickInput = {
  readonly context: AudioContext;
  readonly startTime: number;
  readonly frequency: number;
  readonly duration: number;
  readonly peak: number;
};

type ThumpInput = {
  readonly context: AudioContext;
  readonly startTime: number;
  readonly frequency: number;
  readonly duration: number;
  readonly peak: number;
};

type PlanItem = {
  readonly startOffset: number;
  readonly duration: number;
  readonly frequency: number;
  readonly peak: number;
  readonly range: number;
};

type NoisePlanItem = PlanItem & {
  readonly filterType: BiquadFilterType;
};

const crackSoundUrl = "/sounds/fortune-cookie.mp3";

const createRandomRange = (range: number): number => {
  return (Math.random() - 0.5) * range;
};

const crackThumpPlans: readonly PlanItem[] = [
  { startOffset: 0, duration: 0.26, frequency: 130, peak: 0.55, range: 12 },
];

const crackNoisePlans: readonly NoisePlanItem[] = [
  {
    startOffset: 0.01,
    duration: 0.14,
    filterType: "bandpass",
    frequency: 520,
    peak: 0.2,
    range: 60,
  },
  {
    startOffset: 0.03,
    duration: 0.24,
    filterType: "lowpass",
    frequency: 460,
    peak: 0.18,
    range: 50,
  },
  {
    startOffset: 0.05,
    duration: 0.34,
    filterType: "lowpass",
    frequency: 400,
    peak: 0.15,
    range: 0,
  },
  {
    startOffset: 0.09,
    duration: 0.4,
    filterType: "lowpass",
    frequency: 330,
    peak: 0.1,
    range: 0,
  },
];

const crackClickPlans: readonly PlanItem[] = [
  {
    startOffset: 0.015,
    duration: 0.06,
    frequency: 520,
    peak: 0.08,
    range: 50,
  },
];

const crackLowEndThumpPlans: readonly PlanItem[] = [
  { startOffset: 0, duration: 0.16, frequency: 120, peak: 0.28, range: 10 },
];

const crackLowEndNoisePlans: readonly NoisePlanItem[] = [
  {
    startOffset: 0.02,
    duration: 0.16,
    filterType: "lowpass",
    frequency: 360,
    peak: 0.08,
    range: 0,
  },
  {
    startOffset: 0.08,
    duration: 0.2,
    filterType: "lowpass",
    frequency: 280,
    peak: 0.06,
    range: 0,
  },
];

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

function executeGainEnvelope(input: {
  gain: GainNode;
  startTime: number;
  peak: number;
  decay: number;
}): void {
  input.gain.gain.setValueAtTime(0, input.startTime);
  input.gain.gain.linearRampToValueAtTime(input.peak, input.startTime + 0.01);
  input.gain.gain.exponentialRampToValueAtTime(0.001, input.startTime + input.decay);
}

function executeNoiseBurst(input: NoiseBurstInput): void {
  const source = input.context.createBufferSource();
  const filter = input.context.createBiquadFilter();
  const gain = input.context.createGain();
  source.buffer = createNoiseBuffer(input.context, input.duration);
  filter.type = input.filterType;
  filter.frequency.value = input.frequency;
  executeGainEnvelope({
    gain,
    startTime: input.startTime,
    peak: input.peak,
    decay: input.duration,
  });
  source.connect(filter).connect(gain).connect(input.context.destination);
  source.start(input.startTime);
  source.stop(input.startTime + input.duration);
}

function executeClick(input: ClickInput): void {
  const oscillator = input.context.createOscillator();
  const gain = input.context.createGain();
  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(input.frequency, input.startTime);
  executeGainEnvelope({
    gain,
    startTime: input.startTime,
    peak: input.peak,
    decay: input.duration,
  });
  oscillator.connect(gain).connect(input.context.destination);
  oscillator.start(input.startTime);
  oscillator.stop(input.startTime + input.duration);
}

function executeThump(input: ThumpInput): void {
  const oscillator = input.context.createOscillator();
  const gain = input.context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(input.frequency, input.startTime);
  executeGainEnvelope({
    gain,
    startTime: input.startTime,
    peak: input.peak,
    decay: input.duration,
  });
  oscillator.connect(gain).connect(input.context.destination);
  oscillator.start(input.startTime);
  oscillator.stop(input.startTime + input.duration);
}

function executeNoisePlan(
  context: AudioContext,
  startTime: number,
  plans: readonly NoisePlanItem[],
): void {
  plans.forEach((plan) => {
    executeNoiseBurst({
      context,
      startTime: startTime + plan.startOffset,
      duration: plan.duration,
      filterType: plan.filterType,
      frequency: plan.frequency + createRandomRange(plan.range),
      peak: plan.peak,
    });
  });
}

function executeThumpPlan(
  context: AudioContext,
  startTime: number,
  plans: readonly PlanItem[],
): void {
  plans.forEach((plan) => {
    executeThump({
      context,
      startTime: startTime + plan.startOffset,
      duration: plan.duration,
      frequency: plan.frequency + createRandomRange(plan.range),
      peak: plan.peak,
    });
  });
}

function executeClickPlan(
  context: AudioContext,
  startTime: number,
  plans: readonly PlanItem[],
): void {
  plans.forEach((plan) => {
    executeClick({
      context,
      startTime: startTime + plan.startOffset,
      duration: plan.duration,
      frequency: plan.frequency + createRandomRange(plan.range),
      peak: plan.peak,
    });
  });
}

function executeCrackSoundSynth(context: AudioContext): void {
  const now = context.currentTime;
  executeThumpPlan(context, now, crackThumpPlans);
  executeNoisePlan(context, now, crackNoisePlans);
  executeClickPlan(context, now, crackClickPlans);
}

function executeCrackLowEndBoost(context: AudioContext): void {
  const now = context.currentTime;
  executeThumpPlan(context, now, crackLowEndThumpPlans);
  executeNoisePlan(context, now, crackLowEndNoisePlans);
}

function createAudioContext(context: AudioContext | null): AudioContext {
  return context ?? new AudioContext();
}

function createAudioElement(audio: HTMLAudioElement | null): HTMLAudioElement {
  const element = audio ?? new Audio(crackSoundUrl);
  element.preload = "auto";
  element.currentTime = 0;
  return element;
}

function createAudioNode(
  context: AudioContext,
  audio: HTMLAudioElement,
  source: MediaElementAudioSourceNode | null,
): MediaElementAudioSourceNode {
  if (source) {
    return source;
  }
  const createdSource = context.createMediaElementSource(audio);
  const gain = context.createGain();
  gain.gain.value = 0.8;
  createdSource.connect(gain).connect(context.destination);
  return createdSource;
}

async function executeResumeContext(context: AudioContext): Promise<void> {
  if (context.state !== "suspended") {
    return;
  }
  await context.resume();
}

function executeAudioPlayback(audio: HTMLAudioElement): Promise<void> {
  const playResult = audio.play();
  if (!playResult) {
    return Promise.resolve();
  }
  return playResult;
}

export default function useCrackSound(): { executeCrackSound: () => void } {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioSourceRef = useRef<MediaElementAudioSourceNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  function executeCrackSound(): void {
    const context = createAudioContext(audioContextRef.current);
    audioContextRef.current = context;
    const audio = createAudioElement(audioRef.current);
    audioRef.current = audio;
    const source = createAudioNode(context, audio, audioSourceRef.current);
    audioSourceRef.current = source;
    void executeResumeContext(context)
      .then(() => executeAudioPlayback(audio))
      .then(() => {
        executeCrackLowEndBoost(context);
      })
      .catch(() => {
        executeCrackSoundSynth(context);
      });
  }

  return { executeCrackSound };
}
