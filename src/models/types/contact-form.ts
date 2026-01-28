import { z } from "zod";
import contactFormSchema from "@/models/dto/contact-form.dto";

export type ContactFormData = z.infer<typeof contactFormSchema>;
