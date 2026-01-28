import "server-only";

import contactFormSchema from "@/models/dto/contact-form.dto";
import createProblemDetails from "@/lib/core/create-problem-details";
import type { ApiResponse } from "@/models/types/api-response";
import type { ContactSubmissionResult } from "@/models/types/contact-submission";
import type { ContactFormData } from "@/models/types/contact-form";

const createSuccessResponse = (
  data: ContactSubmissionResult,
): ApiResponse<ContactSubmissionResult> => {
  return {
    success: true,
    data,
    error: null,
  };
};

const createErrorResponse = (input: {
  status: number;
  title: string;
  detail: string;
  instance: string;
}): ApiResponse<ContactSubmissionResult> => {
  return {
    success: false,
    data: null,
    error: createProblemDetails({
      type: "about:blank",
      title: input.title,
      status: input.status,
      detail: input.detail,
      instance: input.instance,
    }),
  };
};

async function submitContact(input: {
  data: ContactFormData;
}): Promise<ApiResponse<ContactSubmissionResult>> {
  const parseResult = contactFormSchema.safeParse(input.data);
  if (!parseResult.success) {
    return createErrorResponse({
      status: 400,
      title: "요청 검증 실패",
      detail: parseResult.error.message,
      instance: "/actions/submit-contact",
    });
  }
  const submittedAt = new Date().toISOString();
  console.info("[문의 접수]", parseResult.data);
  return createSuccessResponse({ submittedAt });
}

export default submitContact;
