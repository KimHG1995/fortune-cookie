import type { ReactElement } from "react";
import fortuneOptions from "@/lib/core/fortune-options";
import type { FortuneCookieSelectorProps } from "@/models/types/ui/fortune-cookie-selector-props";

export default function FortuneCookieSelector(
  props: FortuneCookieSelectorProps,
): ReactElement {
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
          {fortuneOptions.jobCategories.map((category) => (
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
          {fortuneOptions.toneOptions.map((tone) => (
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
}
