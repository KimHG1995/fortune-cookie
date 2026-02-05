"use client";

import type { ReactElement } from "react";

const insights: readonly {
  title: string;
  description: string;
}[] = [
  {
    title: "직무를 더 작은 행동으로 쪼개기",
    description:
      "일을 직무가 아니라 행동 단위로 쪼개면 다음 행동이 더 선명해집니다. 오늘은 가장 작은 단위 하나만 고르는 것부터 시작하세요.",
  },
  {
    title: "운세를 검증 가능한 약속으로",
    description:
      "포춘은 운이 아니라 약속이어야 합니다. 행동 문장에 시간과 조건을 붙이면, 실제 성과로 이어질 확률이 커집니다.",
  },
  {
    title: "감정과 실행의 균형",
    description:
      "감정은 방향을, 실행은 속도를 만듭니다. 둘 중 하나가 과하면 흔들립니다. 오늘은 속도를 살짝 낮추는 선택이 유리합니다.",
  },
];

export default function InsightPage(): ReactElement {
  return (
    <main className="background-canvas min-h-screen px-6 py-16">
      <div className="mx-auto w-full max-w-4xl space-y-10">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">오늘의 인사이트</p>
          <h1 className="text-4xl font-semibold text-ink">일의 방향을 정리하는 인사이트</h1>
          <p className="text-base text-muted">
            포춘 브레이커는 단순한 재미를 위한 운세가 아닙니다. 매일의 작업을
            조정하고 실행의 질을 높이는 도구가 되길 바랍니다.
          </p>
        </header>
        <section className="grid gap-4">
          {insights.map((item) => (
            <article
              key={item.title}
              className="rounded-3xl border border-ink/10 bg-paper/80 p-6 shadow-[var(--shadow-soft)]"
            >
              <h2 className="text-lg font-semibold text-ink">{item.title}</h2>
              <p className="mt-3 text-sm text-muted">{item.description}</p>
            </article>
          ))}
        </section>
        <section className="rounded-3xl border border-ink/10 bg-surface p-6 text-sm text-muted">
          <p className="text-ink">오늘의 체크리스트</p>
          <ul className="mt-3 space-y-2">
            <li>1) 오늘 끝낼 수 있는 가장 작은 행동을 적어두었습니다.</li>
            <li>2) 그 행동을 실행할 시간을 정했습니다.</li>
            <li>3) 마감 후 스스로 피드백을 남겼습니다.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
