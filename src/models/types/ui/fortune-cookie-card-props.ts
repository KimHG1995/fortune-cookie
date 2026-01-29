import type { FortuneResult } from "@/models/types/fortune/fortune-result";

export type FortuneCookieCardProps = {
  readonly isCracked: boolean;
  readonly fortune: FortuneResult | null;
};
