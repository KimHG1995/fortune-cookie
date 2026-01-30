import type { ReactElement } from "react";
import FortuneCookieEmoji from "@/app/components/fortune-cookie-emoji";
import type { FortuneCookieCardProps } from "@/models/types/ui/fortune-cookie-card-props";

export default function FortuneCookieCard(
  props: FortuneCookieCardProps,
): ReactElement {
  const stripText = props.fortune?.luckyKeyword ?? "행운";

  return (
    <div
      className="cookie-crack rounded-3xl border border-ink/10 bg-surface p-6 shadow-[var(--shadow-soft)]"
      data-cracked={props.isCracked}
    >
      <div className="paper-grid rounded-2xl p-6">
        <FortuneCookieEmoji stripText={stripText} />
        <div className="mt-6 space-y-4 text-sm text-muted">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">오늘의 포춘</p>
          {props.fortune ? (
            <div className="space-y-3">
              <p className="text-lg font-semibold text-ink">{props.fortune.title}</p>
              <p>{props.fortune.summary}</p>
              <div className="rounded-2xl border border-ink/10 bg-paper p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-muted">
                  오늘의 실행
                </p>
                <p className="mt-2 text-sm text-ink">{props.fortune.action}</p>
              </div>
              <p className="text-sm">{props.fortune.caution}</p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl border border-ink/10 bg-paper p-3">
                  <p className="text-muted">키워드</p>
                  <p className="mt-1 font-semibold text-ink">
                    {props.fortune.luckyKeyword}
                  </p>
                </div>
                <div className="rounded-xl border border-ink/10 bg-paper p-3">
                  <p className="text-muted">색</p>
                  <p className="mt-1 font-semibold text-ink">
                    {props.fortune.luckyColor}
                  </p>
                </div>
                <div className="rounded-xl border border-ink/10 bg-paper p-3">
                  <p className="text-muted">숫자</p>
                  <p className="mt-1 font-semibold text-ink">
                    {props.fortune.luckyNumber}
                  </p>
                </div>
                <div className="rounded-xl border border-ink/10 bg-paper p-3">
                  <p className="text-muted">시간</p>
                  <p className="mt-1 font-semibold text-ink">
                    {props.fortune.luckyTime}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <p>쿠키를 깨면 결과가 나타납니다.</p>
          )}
        </div>
      </div>
    </div>
  );
}
