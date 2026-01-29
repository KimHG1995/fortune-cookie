"use client";

import { useState } from "react";
import type { ReactElement } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import submitContactAction from "@/app/actions/submit-contact";
import contactFormSchema from "@/models/dto/contact-form.dto";
import type { ContactFormData } from "@/models/types/contact-form";

type SubmissionState = {
  readonly isSubmitted: boolean;
  readonly submittedAt: string | null;
};

type StoredSubmission = {
  readonly date: string;
  readonly submittedAt: string;
};

const storageKey = "contact:daily";

const isRecord = (input: unknown): input is Record<string, unknown> => {
  return typeof input === "object" && input !== null;
};

const isStoredSubmission = (input: unknown): input is StoredSubmission => {
  if (!isRecord(input)) {
    return false;
  }
  return typeof input.date === "string" && typeof input.submittedAt === "string";
};

export default function ContactPage(): ReactElement {
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    isSubmitted: false,
    submittedAt: null,
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      topic: "",
      message: "",
    },
  });

  async function handleSubmitContact(data: ContactFormData): Promise<void> {
    const todayKey = new Date().toISOString().slice(0, 10);
    const storedRaw = localStorage.getItem(storageKey);
    if (storedRaw) {
      try {
        const parsed: unknown = JSON.parse(storedRaw);
        if (isStoredSubmission(parsed) && parsed.date === todayKey) {
          setSubmissionState({
            isSubmitted: true,
            submittedAt: parsed.submittedAt,
          });
          return;
        }
      } catch {
        localStorage.removeItem(storageKey);
      }
    }
    const response = await submitContactAction({ data });
    if (response.success && response.data) {
      setSubmissionState({
        isSubmitted: true,
        submittedAt: response.data.submittedAt,
      });
      const payload: StoredSubmission = {
        date: todayKey,
        submittedAt: response.data.submittedAt,
      };
      localStorage.setItem(storageKey, JSON.stringify(payload));
      reset();
    }
  }

  return (
    <main className="background-canvas min-h-screen px-6 py-16">
      <div className="mx-auto w-full max-w-4xl space-y-10">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">문의</p>
          <h1 className="text-4xl font-semibold text-ink">대화를 남겨 주세요.</h1>
          <p className="text-base text-muted">
            기능 제안, 제휴, 오류 제보 모두 환영합니다. 메시지는 팀 내부에서만
            확인하며 외부에 공유하지 않습니다.
          </p>
        </header>
        <form
          className="space-y-6 rounded-3xl border border-ink/10 bg-paper/80 p-6 shadow-[var(--shadow-soft)]"
          onSubmit={handleSubmit(handleSubmitContact)}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-muted">
              이름
              <input
                {...register("name")}
                className="w-full rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-ink focus:outline-none focus:ring-[var(--ring-glow)]"
                placeholder="홍길동"
              />
              {errors.name && (
                <span className="text-xs text-ember">{errors.name.message}</span>
              )}
            </label>
            <label className="space-y-2 text-sm text-muted">
              이메일
              <input
                {...register("email")}
                className="w-full rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-ink focus:outline-none focus:ring-[var(--ring-glow)]"
                placeholder="hello@fortune.com"
              />
              {errors.email && (
                <span className="text-xs text-ember">{errors.email.message}</span>
              )}
            </label>
          </div>
          <label className="space-y-2 text-sm text-muted">
            문의 주제
            <input
              {...register("topic")}
              className="w-full rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-ink focus:outline-none focus:ring-[var(--ring-glow)]"
              placeholder="광고 제휴, 기능 제안 등"
            />
            {errors.topic && (
              <span className="text-xs text-ember">{errors.topic.message}</span>
            )}
          </label>
          <label className="space-y-2 text-sm text-muted">
            메시지
            <textarea
              {...register("message")}
              rows={5}
              className="w-full rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-ink focus:outline-none focus:ring-[var(--ring-glow)]"
              placeholder="구체적인 상황과 요청을 적어 주세요."
            />
            {errors.message && (
              <span className="text-xs text-ember">{errors.message.message}</span>
            )}
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-ink px-6 py-4 text-base font-semibold text-paper transition hover:translate-y-[-2px]"
            disabled={isSubmitting}
          >
            {isSubmitting ? "전송 중..." : "문의 보내기"}
          </button>
        </form>
        {submissionState.isSubmitted && (
          <section className="rounded-3xl border border-ink/10 bg-surface p-6 text-sm text-muted">
            <p className="text-ink">문의가 접수되었습니다.</p>
            <p className="mt-2">
              접수 시각: {submissionState.submittedAt}
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
