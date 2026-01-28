import createJsonResponse from "@/lib/core/create-json-response";
import type { ApiResponse } from "@/models/types/api-response";

type TestPayload = {
  readonly status: "ok";
  readonly timestamp: string;
};

const createSuccessResponse = (): ApiResponse<TestPayload> => {
  return {
    success: true,
    data: {
      status: "ok",
      timestamp: new Date().toISOString(),
    },
    error: null,
  };
};

export const GET = async (): Promise<Response> => {
  const response = createSuccessResponse();
  return createJsonResponse(response, 200);
};
