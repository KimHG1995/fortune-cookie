"use client";

type ClarityEventName = string;

type ClarityFunction = (action: "event", value: ClarityEventName) => void;

declare global {
  interface Window {
    clarity?: ClarityFunction;
  }
}

const canExecuteClarity = (): boolean => {
  return typeof window !== "undefined" && typeof window.clarity === "function";
};

const executeClarityEvent = (eventName: ClarityEventName): void => {
  if (!canExecuteClarity()) {
    return;
  }
  window.clarity("event", eventName);
};

const clarityService = {
  executeClarityEvent,
};

export default clarityService;
