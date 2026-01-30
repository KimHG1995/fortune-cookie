import type { CSSProperties, ReactElement } from "react";
import Image from "next/image";
import type { FortuneCookieEmojiProps } from "@/models/types/ui/fortune-cookie-emoji-props";

const cardStyle: CSSProperties = {
  width: "min(980px, 100%)",
  aspectRatio: "900 / 600",
  borderRadius: 24,
  overflow: "hidden",
  background: "var(--color-paper)",
  position: "relative",
};
/**
 * SVG 기반 포춘쿠키 이모지(캐릭터)를 렌더링한다.
 * traced SVG 파일을 그대로 렌더링한다.
 */
export default function FortuneCookieEmoji({
  stripText = "",
}: FortuneCookieEmojiProps): ReactElement {
  return (
    <div style={cardStyle}>
      <Image
        src="/fortune_cookie_traced_v2.svg"
        alt={`포춘쿠키 캐릭터 ${stripText}`}
        fill
        sizes="(min-width: 1024px) 980px, 100vw"
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}
