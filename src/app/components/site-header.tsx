import Link from "next/link";

export default function SiteHeader(): JSX.Element {
  return (
    <header className="border-b border-ink/10 bg-paper/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-start justify-between gap-4 px-6 py-6 md:flex-row md:items-center">
        <div className="space-y-2">
          <Link href="/" className="text-2xl font-semibold text-ink">
            포춘 브레이커
          </Link>
          <p className="text-sm text-muted">
            직업을 쪼개고, 오늘 할 일을 선명하게 만드는 포춘쿠키 실험실
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-4 text-sm text-muted">
          <Link className="transition hover:text-ink" href="/about">
            소개
          </Link>
          <Link className="transition hover:text-ink" href="/insight">
            인사이트
          </Link>
          <Link className="transition hover:text-ink" href="/privacy-policy">
            개인정보 처리방침
          </Link>
          <Link className="transition hover:text-ink" href="/contact">
            문의
          </Link>
        </nav>
      </div>
    </header>
  );
}
