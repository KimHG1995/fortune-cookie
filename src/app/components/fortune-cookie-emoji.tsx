"use client";

import type { CSSProperties, ReactElement } from "react";
import Image from "next/image";
import localeMessages from "@/lib/core/locale-messages";
import useLocale from "@/lib/core/use-locale";
import type { FortuneCookieEmojiProps } from "@/models/types/ui/fortune-cookie-emoji-props";

const uncrackedImageUrl = "/fortune-cookie.svg";
const crackedImageUrl = "/crack-fortune-cookie.svg";

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
 * 깨짐 상태에 따라 이미지를 자연스럽게 전환한다.
 */
export default function FortuneCookieEmoji({
  stripText = "",
  isCracked,
}: FortuneCookieEmojiProps): ReactElement {
  const locale = useLocale();
  const messages = localeMessages[locale];
  const intactAlt = `${messages.emojiAlt.intactPrefix} ${stripText}`.trim();
  const crackedAlt = `${messages.emojiAlt.crackedPrefix} ${stripText}`.trim();

  return (
    <div style={cardStyle}>
      <Image
        src={uncrackedImageUrl}
        alt={intactAlt}
        fill
        sizes="(min-width: 1024px) 980px, 100vw"
        className={`transition-all duration-500 ease-out ${
          isCracked ? "opacity-0 scale-95" : "opacity-100 scale-100"
        }`}
        style={{ objectFit: "contain" }}
        priority
      />
      <Image
        src={crackedImageUrl}
        alt={crackedAlt}
        fill
        sizes="(min-width: 1024px) 980px, 100vw"
        className={`transition-all duration-500 ease-out ${
          isCracked ? "opacity-100 scale-100" : "opacity-0 scale-105"
        }`}
        style={{ objectFit: "contain" }}
      />
    </div>
  );
}
