import type { FortuneRequest } from "@/models/types/fortune/fortune-request";

export type FortuneCookieSelectorProps = {
  readonly selectedCategory: string;
  readonly selectedTone: FortuneRequest["tone"];
  readonly onSelectCategory: (value: string) => void;
  readonly onSelectTone: (value: FortuneRequest["tone"]) => void;
  readonly onCrack: () => void;
  readonly isLoading: boolean;
  readonly errorMessage: string | null;
};
