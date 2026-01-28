"use server";

import submitContact from "@/lib/services/contact-service";
import type { ApiResponse } from "@/models/types/api-response";
import type { ContactSubmissionResult } from "@/models/types/contact-submission";
import type { ContactFormData } from "@/models/types/contact-form";

type SubmitContactInput = {
  readonly data: ContactFormData;
};

const submitContactAction = async (
  input: SubmitContactInput,
): Promise<ApiResponse<ContactSubmissionResult>> => {
  return submitContact({ data: input.data });
};

export default submitContactAction;
