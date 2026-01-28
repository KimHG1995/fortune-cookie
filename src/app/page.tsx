"use client";

import type { ReactElement } from "react";
import FortuneCookie from "@/app/components/fortune-cookie";

export default function HomePage(): ReactElement {
  return (
    <div className="background-canvas min-h-screen">
      <main className="mx-auto w-full max-w-6xl px-6 py-16">
        <FortuneCookie />
      </main>
    </div>
  );
}
