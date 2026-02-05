import { z } from "zod";
import localeMessages from "@/lib/core/locale-messages";
import type { Locale } from "@/models/types/app/locale";

const createContactFormSchema = (locale: Locale): z.ZodObject<{
  name: z.ZodString;
  email: z.ZodPipe<z.ZodString, z.ZodEmail>;
  topic: z.ZodString;
  message: z.ZodString;
}> => {
  const messages = localeMessages[locale].contact.validation;

  const emailSchema = z
    .string()
    .trim()
    .min(1, messages.emailRequired)
    .pipe(z.email(messages.emailInvalid));

  return z.object({
    name: z
      .string()
      .trim()
      .min(1, messages.nameRequired)
      .min(2, messages.nameMin)
      .max(20, messages.nameMax),
    email: emailSchema,
    topic: z
      .string()
      .trim()
      .min(1, messages.topicRequired)
      .min(2, messages.topicMin)
      .max(30, messages.topicMax),
    message: z
      .string()
      .trim()
      .min(1, messages.messageRequired)
      .min(20, messages.messageMin)
      .max(500, messages.messageMax),
  });
};

export default createContactFormSchema;
