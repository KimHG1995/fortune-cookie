"use server";

import { headers } from "next/headers";
import executeSameOriginAssertion from "@/lib/core/assert-same-origin";
import executeDailyLimitEnforcement from "@/lib/core/enforce-daily-limit";
import createProblemDetails from "@/lib/core/create-problem-details";
import submitContact from "@/lib/services/contact-service";
import type { ApiResponse } from "@/models/types/api/api-response";
import type { ContactSubmissionResult } from "@/models/types/contact/contact-submission-result";
import type { SubmitContactInput } from "@/models/types/actions/submit-contact-input";

const getAllowedOrigins = (requestHeaders: Headers): readonly string[] => {
  const rawOrigins = process.env.APP_ORIGINS;
  const originSet = new Set<string>();
  if (rawOrigins) {
    rawOrigins
      .split(",")
      .map((origin) => origin.trim())
      .filter((origin) => origin.length > 0)
      .forEach((origin) => {
        originSet.add(origin);
      });
  }
  if (originSet.size === 0) {
    originSet.add("http://localhost:3000");
  }
  const forwardedHost = requestHeaders.get("x-forwarded-host");
  const host = requestHeaders.get("host");
  const proto = requestHeaders.get("x-forwarded-proto") ?? "http";
  const resolvedHost = forwardedHost ?? host;
  if (resolvedHost) {
    originSet.add(`${proto}://${resolvedHost}`);
  }
  return Array.from(originSet);
};

const createErrorResponse = (message: string): ApiResponse<ContactSubmissionResult> => {
  return {
    success: false,
    data: null,
    error: createProblemDetails({
      type: "about:blank",
      title: "요청 거부",
      status: 403,
      detail: message,
      instance: "/actions/submit-contact",
    }),
  };
};

const submitContactAction = async (
  input: SubmitContactInput,
): Promise<ApiResponse<ContactSubmissionResult>> => {
  try {
    const requestHeaders = await headers();
    executeSameOriginAssertion({
      headers: requestHeaders,
      allowedOrigins: getAllowedOrigins(requestHeaders),
    });
    executeDailyLimitEnforcement({
      headers: requestHeaders,
      action: "contact",
      maxPerDay: 1,
    });
    return submitContact({ data: input.data });
  } catch (error) {
    if (error instanceof Error) {
      return createErrorResponse(error.message);
    }
    return createErrorResponse("요청을 처리할 수 없습니다.");
  }
};

export default submitContactAction;
