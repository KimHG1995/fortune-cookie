import { z } from "zod";

const fortuneRequestSchema = z.object({
  jobCategory: z
    .string()
    .min(1, "직업 분야를 선택해 주세요.")
    .min(2, "직업 분야는 2글자 이상이어야 합니다.")
    .max(20, "직업 분야는 20글자 이하이어야 합니다."),
  tone: z.enum(["차분함", "유쾌함", "직설"], { message: "톤을 선택해 주세요." }),
});

export default fortuneRequestSchema;
