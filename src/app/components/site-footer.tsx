"use client";

import Link from "next/link";
import type { ReactElement } from "react";
import localeMessages from "@/lib/core/locale-messages";
import useLocale from "@/lib/core/use-locale";

export default function SiteFooter(): ReactElement {
  const locale = useLocale();
  const messages = localeMessages[locale];

  return (
    <footer className="border-t border-ink/10 bg-paper">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-ink">{messages.footer.brand}</p>
          <p>{messages.footer.description}</p>
          <p>{messages.footer.statement}</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link className="hover:text-ink" href="/about">
            {messages.footer.nav.about}
          </Link>
          <Link className="hover:text-ink" href="/privacy-policy">
            {messages.footer.nav.privacy}
          </Link>
          <Link className="hover:text-ink" href="/contact">
            {messages.footer.nav.contact}
          </Link>
        </div>
      </div>
    </footer>
  );
}
