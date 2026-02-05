"use client";

import type { ReactElement } from "react";
import localeMessages from "@/lib/core/locale-messages";
import useLocale from "@/lib/core/use-locale";

export default function AboutPage(): ReactElement {
  const locale = useLocale();
  const messages = localeMessages[locale];

  return (
    <main className="background-canvas min-h-screen px-6 py-16">
      <div className="mx-auto w-full max-w-4xl space-y-10">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">
            {messages.about.eyebrow}
          </p>
          <h1 className="text-4xl font-semibold text-ink">
            {messages.about.title}
          </h1>
          <p className="text-base text-muted">{messages.about.description}</p>
        </header>
        <section className="grid gap-4 md:grid-cols-3">
          {messages.about.principles.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-ink/10 bg-paper/80 p-6 shadow-[var(--shadow-soft)]"
            >
              <h2 className="text-lg font-semibold text-ink">{item.title}</h2>
              <p className="mt-3 text-sm text-muted">{item.description}</p>
            </article>
          ))}
        </section>
        <section className="rounded-3xl border border-ink/10 bg-surface p-6 shadow-[var(--shadow-soft)]">
          <h2 className="text-xl font-semibold text-ink">
            {messages.about.usageTitle}
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            {messages.about.usageItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
