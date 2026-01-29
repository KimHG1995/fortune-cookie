import type { ProblemDetails } from "@/models/types/api/problem-details";

export type ApiResponse<TData> = {
  readonly success: boolean;
  readonly data: TData | null;
  readonly error: ProblemDetails | null;
};
