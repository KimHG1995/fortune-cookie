"use client";

import FortuneCookie from "@/app/components/fortune-cookie";

export default function HomePage(): JSX.Element {
  return (
    <div className="background-canvas min-h-screen">
      <main className="mx-auto w-full max-w-6xl px-6 py-16">
        <FortuneCookie />
      </main>
    </div>
  );
}
