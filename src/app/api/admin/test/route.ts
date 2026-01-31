import createJsonResponse from "@/lib/core/create-json-response";
import type { ApiResponse } from "@/models/types/api/api-response";
import type { AdminTestPayload } from "@/models/types/admin/admin-test-payload";

const createSuccessResponse = (): ApiResponse<AdminTestPayload> => {
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
