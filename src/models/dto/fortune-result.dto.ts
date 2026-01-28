import { z } from "zod";

const fortuneResultSchema = z.object({
  title: z.string().min(2).max(40),
  summary: z.string().min(10).max(200),
  action: z.string().min(10).max(200),
  caution: z.string().min(10).max(200),
  luckyKeyword: z.string().min(2).max(20),
  luckyColor: z.string().min(2).max(12),
  luckyNumber: z.number().int().min(0).max(99),
  luckyTime: z.string().min(4).max(20),
});

export default fortuneResultSchema;
