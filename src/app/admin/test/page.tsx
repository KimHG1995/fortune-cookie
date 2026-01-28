"use client";

export default function AdminTestPage(): JSX.Element {
  return (
    <main className="background-canvas min-h-screen px-6 py-16">
      <div className="mx-auto w-full max-w-3xl space-y-4 rounded-3xl border border-ink/10 bg-paper/80 p-6 shadow-[var(--shadow-soft)]">
        <h1 className="text-2xl font-semibold text-ink">스모크 테스트</h1>
        <p className="text-sm text-muted">
          이 페이지가 정상 렌더링되면 CSR 기준의 화면 테스트가 통과됩니다.
        </p>
        <p className="text-sm text-muted">
          API 상태는 <span className="text-ink">/api/admin/test</span>에서 확인하세요.
        </p>
      </div>
    </main>
  );
}
