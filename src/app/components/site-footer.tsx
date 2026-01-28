import Link from "next/link";

export default function SiteFooter(): JSX.Element {
  return (
    <footer className="border-t border-ink/10 bg-paper">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-ink">포춘 브레이커</p>
          <p>AI 무료 LLM 기반의 포춘쿠키 운세 서비스</p>
          <p>광고 수익을 위해 얇은 콘텐츠를 만들지 않습니다.</p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link className="hover:text-ink" href="/about">
            소개
          </Link>
          <Link className="hover:text-ink" href="/privacy-policy">
            개인정보 처리방침
          </Link>
          <Link className="hover:text-ink" href="/contact">
            문의
          </Link>
        </div>
      </div>
    </footer>
  );
}
