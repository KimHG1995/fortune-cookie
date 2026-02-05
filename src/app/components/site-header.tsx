"use client";

import Link from "next/link";
import type { ReactElement } from "react";
import localeMessages from "@/lib/core/locale-messages";
import useLocale from "@/lib/core/use-locale";
import localeStore from "@/lib/services/locale-store";

export default function SiteHeader(): ReactElement {
  const locale = useLocale();
  const messages = localeMessages[locale];

  return (
    <header className="border-b border-ink/10 bg-paper/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-6 py-6 md:flex-row md:items-center">
        <div className="space-y-2">
          <Link href="/" className="text-2xl font-semibold text-ink">
            {messages.header.brand}
          </Link>
          <p className="text-sm text-muted">
            {messages.header.tagline}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
          <nav className="flex flex-wrap items-center gap-4 text-sm text-muted">
            <Link className="transition hover:text-ink" href="/about">
              {messages.header.nav.about}
            </Link>
            <Link className="transition hover:text-ink" href="/insight">
              {messages.header.nav.insight}
            </Link>
            <Link className="transition hover:text-ink" href="/privacy-policy">
              {messages.header.nav.privacy}
            </Link>
            <Link className="transition hover:text-ink" href="/contact">
              {messages.header.nav.contact}
            </Link>
          </nav>
          <div className="flex items-center gap-2 rounded-full border border-ink/10 bg-paper px-2 py-1">
            <button
              type="button"
              onClick={() => localeStore.setLocale("ko")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                locale === "ko" ? "bg-ink text-paper" : "text-muted"
              }`}
              aria-pressed={locale === "ko"}
            >
              {messages.header.localeToggle.korean}
            </button>
            <button
              type="button"
              onClick={() => localeStore.setLocale("en")}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition ${
                locale === "en" ? "bg-ink text-paper" : "text-muted"
              }`}
              aria-pressed={locale === "en"}
            >
              {messages.header.localeToggle.english}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
