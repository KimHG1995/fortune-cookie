import type { Locale } from "@/models/types/app/locale";

export type FortuneRequest = {
  readonly locale: Locale;
  readonly jobCategory: string;
  readonly tone: "차분함" | "유쾌함" | "직설" | "Calm" | "Playful" | "Direct";
};
