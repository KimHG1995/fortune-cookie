"use client";

const sections: readonly {
  title: string;
  items: readonly string[];
}[] = [
  {
    title: "수집하는 정보",
    items: [
      "문의 페이지에서 입력하는 이름, 이메일, 메시지",
      "서비스 안정성을 위한 기본적인 접속 로그",
    ],
  },
  {
    title: "이용 목적",
    items: [
      "문의 응대 및 서비스 개선",
      "오류 분석과 품질 향상",
      "부정 사용 방지",
    ],
  },
  {
    title: "보관 기간",
    items: [
      "문의 응대 완료 후 3개월 이내 파기",
      "법령에 따른 보관 의무가 있는 경우 해당 기간 보관",
    ],
  },
  {
    title: "이용자 권리",
    items: [
      "개인정보 열람, 정정, 삭제 요청",
      "처리 정지 요청",
    ],
  },
];

export default function PrivacyPolicyPage(): JSX.Element {
  return (
    <main className="background-canvas min-h-screen px-6 py-16">
      <div className="mx-auto w-full max-w-4xl space-y-10">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">
            개인정보 처리방침
          </p>
          <h1 className="text-4xl font-semibold text-ink">우리는 정보를 절제합니다.</h1>
          <p className="text-base text-muted">
            포춘 브레이커는 서비스 운영에 꼭 필요한 범위 내에서만 정보를
            수집하며, 목적 외 사용을 하지 않습니다.
          </p>
        </header>
        <section className="space-y-6">
          {sections.map((section) => (
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
          <p>
            개인정보 보호와 관련한 문의는 <strong className="text-ink">문의 페이지</strong>를
            통해 접수해 주세요. 최대한 빠르게 응답하겠습니다.
          </p>
        </section>
      </div>
    </main>
  );
}
