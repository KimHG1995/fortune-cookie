"use client";

const principles: readonly { title: string; description: string }[] = [
  {
    title: "얇은 콘텐츠 금지",
    description:
      "광고 수익을 위해 의미 없는 문장을 반복하지 않습니다. 매일의 업무를 재정렬하는 데 도움이 되는 밀도 있는 문장을 제공합니다.",
  },
  {
    title: "행동 중심 운세",
    description:
      "운세는 기분을 맞추는 말이 아니라, 오늘의 행동을 정리하는 도구입니다. 실행을 돕는 문장으로 구성합니다.",
  },
  {
    title: "투명한 데이터",
    description:
      "개인정보는 최소한으로 수집하고, 서비스 제공 목적 외에는 사용하지 않습니다.",
  },
];

export default function AboutPage(): JSX.Element {
  return (
    <main className="background-canvas min-h-screen px-6 py-16">
      <div className="mx-auto w-full max-w-4xl space-y-10">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">
            서비스 소개
          </p>
          <h1 className="text-4xl font-semibold text-ink">포춘 브레이커란?</h1>
          <p className="text-base text-muted">
            포춘 브레이커는 직업을 쪼개고 실행을 정리하는 포춘쿠키 서비스입니다.
            AI LLM의 무료 제공량을 기반으로 오늘의 흐름을 요약하고, 가벼운 한
            문장 이상의 실질적인 행동 제안을 제공합니다.
          </p>
        </header>
        <section className="grid gap-4 md:grid-cols-3">
          {principles.map((item) => (
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
          <h2 className="text-xl font-semibold text-ink">어떻게 활용하면 좋을까요?</h2>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>하루 시작 전에 포춘을 확인하고 오늘의 우선순위를 정하세요.</li>
            <li>팀 회의 전에 요약 문장을 공유해 대화의 방향을 빠르게 맞추세요.</li>
            <li>퇴근 전에 행동 문장을 체크리스트로 사용해 마감 감각을 유지하세요.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
