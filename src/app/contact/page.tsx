"use client";

import { useState } from "react";
import type { ReactElement } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import submitContactAction from "@/app/actions/submit-contact";
import createContactFormSchema from "@/models/dto/contact-form.dto";
import localeMessages from "@/lib/core/locale-messages";
import useLocale from "@/lib/core/use-locale";
import clarityService from "@/lib/services/clarity-service";
import contactSubmissionStorage from "@/lib/services/contact-submission-storage";
import type { ContactSubmissionState } from "@/models/types/contact/contact-submission-state";
import type { StoredContactSubmission } from "@/models/types/contact/contact-submission-storage";
import type { ContactFormData } from "@/models/types/contact/contact-form-data";

export default function ContactPage(): ReactElement {
  const locale = useLocale();
  const messages = localeMessages[locale];
  const [submissionState, setSubmissionState] = useState<ContactSubmissionState>({
    isSubmitted: false,
    submittedAt: null,
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(createContactFormSchema(locale)),
    defaultValues: {
      name: "",
      email: "",
      topic: "",
      message: "",
    },
  });

  async function executeContactSubmit(data: ContactFormData): Promise<void> {
    const storedSubmission = contactSubmissionStorage.readStoredSubmission();
    if (storedSubmission) {
      setSubmissionState({
        isSubmitted: true,
        submittedAt: storedSubmission.submittedAt,
      });
      clarityService.executeClarityEvent("contact_submit_duplicate");
      return;
    }
    const response = await submitContactAction({ data });
    if (!response.success || !response.data) {
      return;
    }
    setSubmissionState({
      isSubmitted: true,
      submittedAt: response.data.submittedAt,
    });
    clarityService.executeClarityEvent("contact_submit_success");
    const payload: StoredContactSubmission = {
      date: new Date().toISOString().slice(0, 10),
      submittedAt: response.data.submittedAt,
    };
    contactSubmissionStorage.saveStoredSubmission(payload);
    reset();
  }

  return (
    <main className="background-canvas min-h-screen px-6 py-16">
      <div className="mx-auto w-full max-w-4xl space-y-10">
        <header className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">
            {messages.contact.eyebrow}
          </p>
          <h1 className="text-4xl font-semibold text-ink">
            {messages.contact.title}
          </h1>
          <p className="text-base text-muted">{messages.contact.description}</p>
        </header>
        <form
          className="space-y-6 rounded-3xl border border-ink/10 bg-paper/80 p-6 shadow-[var(--shadow-soft)]"
          onSubmit={handleSubmit(executeContactSubmit)}
        >
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm text-muted">
              {messages.contact.fields.name}
              <input
                {...register("name")}
                className="w-full rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-ink focus:outline-none focus:ring-[var(--ring-glow)]"
                placeholder={messages.contact.placeholders.name}
              />
              {errors.name && (
                <span className="text-xs text-ember">{errors.name.message}</span>
              )}
            </label>
            <label className="space-y-2 text-sm text-muted">
              {messages.contact.fields.email}
              <input
                {...register("email")}
                className="w-full rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-ink focus:outline-none focus:ring-[var(--ring-glow)]"
                placeholder={messages.contact.placeholders.email}
              />
              {errors.email && (
                <span className="text-xs text-ember">{errors.email.message}</span>
              )}
            </label>
          </div>
          <label className="space-y-2 text-sm text-muted">
            {messages.contact.fields.topic}
            <input
              {...register("topic")}
              className="w-full rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-ink focus:outline-none focus:ring-[var(--ring-glow)]"
              placeholder={messages.contact.placeholders.topic}
            />
            {errors.topic && (
              <span className="text-xs text-ember">{errors.topic.message}</span>
            )}
          </label>
          <label className="space-y-2 text-sm text-muted">
            {messages.contact.fields.message}
            <textarea
              {...register("message")}
              rows={5}
              className="w-full rounded-2xl border border-ink/10 bg-paper px-4 py-3 text-ink focus:outline-none focus:ring-[var(--ring-glow)]"
              placeholder={messages.contact.placeholders.message}
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
            {isSubmitting ? messages.contact.submitting : messages.contact.submit}
          </button>
        </form>
        {submissionState.isSubmitted && (
          <section className="rounded-3xl border border-ink/10 bg-surface p-6 text-sm text-muted">
            <p className="text-ink">{messages.contact.successTitle}</p>
            <p className="mt-2">
              {messages.contact.submittedAt}: {submissionState.submittedAt}
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
