import type { ReactElement } from "react";
import { Cormorant_Garamond, Space_Grotesk } from "next/font/google";
import ErrorBoundary from "@/app/(core)/error-boundary";
import SiteFooter from "@/app/components/site-footer";
import SiteHeader from "@/app/components/site-header";
import type { RootLayoutProps } from "@/models/types/app/root-layout-props";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-display",
});

export default function RootLayout({ children }: RootLayoutProps): ReactElement {
  return (
    <html lang="ko">
      <body className={`${spaceGrotesk.variable} ${cormorantGaramond.variable}`}>
        <ErrorBoundary>
          <SiteHeader />
          {children}
          <SiteFooter />
        </ErrorBoundary>
      </body>
    </html>
  );
}
