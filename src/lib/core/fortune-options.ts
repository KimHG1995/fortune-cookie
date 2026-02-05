import type { Locale } from "@/models/types/app/locale";
import type { FortuneRequest } from "@/models/types/fortune/fortune-request";

type LocaleOptions = {
  readonly [key in Locale]: readonly string[];
};

type ToneOptions = {
  readonly [key in Locale]: readonly FortuneRequest["tone"][];
};

const jobCategories: LocaleOptions = {
  ko: [
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
  ],
  en: [
    "Planning",
    "Design",
    "Development",
    "Marketing",
    "Sales",
    "Operations",
    "Education",
    "Research",
    "Content",
    "Startup",
  ],
};

const toneOptions: ToneOptions = {
  ko: ["차분함", "유쾌함", "직설"],
  en: ["Calm", "Playful", "Direct"],
};

const fortuneOptions = {
  jobCategories,
  toneOptions,
};

export default fortuneOptions;
