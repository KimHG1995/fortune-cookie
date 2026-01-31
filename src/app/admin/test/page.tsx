"use client";

import { useEffect, useState } from "react";
import type { ReactElement } from "react";

export default function AdminTestPage(): ReactElement {
  const [timestamp, setTimestamp] = useState<string>("-");

  useEffect(() => {
    setTimestamp(new Date().toISOString());
  }, []);

  return (
    <main className="background-canvas min-h-screen px-6 py-16">
      <div className="mx-auto w-full max-w-3xl space-y-6 rounded-3xl border border-ink/10 bg-paper/80 p-6 shadow-[var(--shadow-soft)]">
        <header className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">
            스모크 테스트
          </p>
          <h1 className="text-3xl font-semibold text-ink">
            /admin/test 정상 렌더링
          </h1>
        </header>
        <section className="rounded-2xl border border-ink/10 bg-surface p-4 text-sm text-muted">
          <p className="text-ink">상태: ok</p>
          <p className="mt-2">렌더 시각: {timestamp}</p>
        </section>
      </div>
    </main>
  );
}
