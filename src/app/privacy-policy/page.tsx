"use client";

import type { ReactElement } from "react";
import localeMessages from "@/lib/core/locale-messages";
import useLocale from "@/lib/core/use-locale";

export default function PrivacyPolicyPage(): ReactElement {
  const locale = useLocale();
  const messages = localeMessages[locale];

  return (
    <main className="background-canvas min-h-screen px-6 py-16">
      <div className="mx-auto w-full max-w-4xl space-y-10">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">
            {messages.privacy.eyebrow}
          </p>
          <h1 className="text-4xl font-semibold text-ink">
            {messages.privacy.title}
          </h1>
          <p className="text-base text-muted">{messages.privacy.description}</p>
        </header>
        <section className="space-y-6">
          {messages.privacy.sections.map((section) => (
            <article
              key={section.title}
              className="rounded-3xl border border-ink/10 bg-paper/80 p-6 shadow-[var(--shadow-soft)]"
            >
              <h2 className="text-lg font-semibold text-ink">{section.title}</h2>
              <ul className="mt-4 space-y-2 text-sm text-muted">
                {section.items.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>
        <section className="rounded-3xl border border-ink/10 bg-surface p-6 text-sm text-muted">
          <p>{messages.privacy.closing}</p>
        </section>
      </div>
    </main>
  );
}
