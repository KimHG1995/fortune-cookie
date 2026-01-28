"use server";

import requestFortune from "@/lib/services/fortune-service";
import type { ApiResponse } from "@/models/types/api-response";
import type { FortuneRequest } from "@/models/types/fortune-request";
import type { FortuneResult } from "@/models/types/fortune";

type RequestFortuneInput = {
  readonly request: FortuneRequest;
};

const requestFortuneAction = async (
  input: RequestFortuneInput,
): Promise<ApiResponse<FortuneResult>> => {
  return requestFortune({ request: input.request });
};

export default requestFortuneAction;
