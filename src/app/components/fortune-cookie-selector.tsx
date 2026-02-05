"use client";

import type { ReactElement } from "react";
import fortuneOptions from "@/lib/core/fortune-options";
import localeMessages from "@/lib/core/locale-messages";
import useLocale from "@/lib/core/use-locale";
import type { FortuneCookieSelectorProps } from "@/models/types/ui/fortune-cookie-selector-props";

export default function FortuneCookieSelector(
  props: FortuneCookieSelectorProps,
): ReactElement {
  const locale = useLocale();
  const messages = localeMessages[locale];
  const categories = fortuneOptions.jobCategories[locale];
  const tones = fortuneOptions.toneOptions[locale];

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted">
          {messages.home.eyebrow}
        </p>
        <h1 className="text-4xl font-semibold leading-tight text-ink md:text-5xl">
          {messages.home.titleLine1}
          <br />
          {messages.home.titleLine2}
        </h1>
        <p className="max-w-xl text-base text-muted">
          {messages.home.description}
        </p>
      </div>
      <div className="space-y-4">
        <p className="text-sm font-semibold text-ink">
          {messages.home.categoryLabel}
        </p>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
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
        <p className="text-sm font-semibold text-ink">{messages.home.toneLabel}</p>
        <div className="flex flex-wrap gap-2">
          {tones.map((tone) => (
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
        {messages.home.buttonLabel}
      </button>
      {props.isLoading && (
        <p className="text-sm text-muted">{messages.home.loading}</p>
      )}
      {props.errorMessage && (
        <p className="text-sm text-ember">{props.errorMessage}</p>
      )}
    </div>
  );
}
