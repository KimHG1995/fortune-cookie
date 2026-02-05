"use client";

import type { ReactElement } from "react";
import FortuneCookieEmoji from "@/app/components/fortune-cookie-emoji";
import localeMessages from "@/lib/core/locale-messages";
import useLocale from "@/lib/core/use-locale";
import type { FortuneCookieCardProps } from "@/models/types/ui/fortune-cookie-card-props";

export default function FortuneCookieCard(
  props: FortuneCookieCardProps,
): ReactElement {
  const locale = useLocale();
  const messages = localeMessages[locale];
  const stripText = props.fortune?.luckyKeyword ?? messages.card.defaultKeyword;

  return (
    <div
      className="cookie-crack rounded-3xl border border-ink/10 bg-surface p-6 shadow-[var(--shadow-soft)]"
      data-cracked={props.isCracked}
    >
      <div className="paper-grid rounded-2xl p-6">
        <FortuneCookieEmoji stripText={stripText} isCracked={props.isCracked} />
        <div className="mt-6 space-y-4 text-sm text-muted">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            {messages.card.eyebrow}
          </p>
          {props.fortune ? (
            <div className="space-y-3">
              <p className="text-lg font-semibold text-ink">{props.fortune.title}</p>
              <p>{props.fortune.summary}</p>
              <div className="rounded-2xl border border-ink/10 bg-paper p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  {messages.card.actionLabel}
                </p>
                <p className="mt-2 text-sm text-ink">{props.fortune.action}</p>
              </div>
              <p className="text-sm">{props.fortune.caution}</p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-ink/10 bg-paper p-3">
                  <p className="text-muted">{messages.card.keywordLabel}</p>
                  <p className="mt-1 font-semibold text-ink">
                    {props.fortune.luckyKeyword}
                  </p>
                </div>
                <div className="rounded-xl border border-ink/10 bg-paper p-3">
                  <p className="text-muted">{messages.card.colorLabel}</p>
                  <p className="mt-1 font-semibold text-ink">
                    {props.fortune.luckyColor}
                  </p>
                </div>
                <div className="rounded-xl border border-ink/10 bg-paper p-3">
                  <p className="text-muted">{messages.card.numberLabel}</p>
                  <p className="mt-1 font-semibold text-ink">
                    {props.fortune.luckyNumber}
                  </p>
                </div>
                <div className="rounded-xl border border-ink/10 bg-paper p-3">
                  <p className="text-muted">{messages.card.timeLabel}</p>
                  <p className="mt-1 font-semibold text-ink">
                    {props.fortune.luckyTime}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p>{messages.card.empty}</p>
          )}
        </div>
      </div>
    </div>
  );
}
