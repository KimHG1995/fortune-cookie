import type { FortuneRequest } from "@/models/types/fortune/fortune-request";

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

const fortuneOptions = {
  jobCategories,
  toneOptions,
};

export default fortuneOptions;
