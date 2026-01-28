import { z } from "zod";

const contactFormSchema = z.object({
  name: z
    .string({ required_error: "이름을 입력해 주세요." })
    .min(2, "이름은 2글자 이상이어야 합니다.")
    .max(20, "이름은 20글자 이하이어야 합니다."),
  email: z
    .string({ required_error: "이메일을 입력해 주세요." })
    .email("이메일 형식이 올바르지 않습니다."),
  topic: z
    .string({ required_error: "문의 주제를 선택해 주세요." })
    .min(2, "문의 주제는 2글자 이상이어야 합니다.")
    .max(30, "문의 주제는 30글자 이하이어야 합니다."),
  message: z
    .string({ required_error: "메시지를 입력해 주세요." })
    .min(20, "메시지는 20글자 이상이어야 합니다.")
    .max(500, "메시지는 500글자 이하이어야 합니다."),
});

export default contactFormSchema;
