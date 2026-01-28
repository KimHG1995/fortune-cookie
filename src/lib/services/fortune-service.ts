import type { ApiResponse } from "@/models/types/api-response";
import type { FortuneRequest } from "@/models/types/fortune-request";
import type { FortuneResult } from "@/models/types/fortune";
import type { ProblemDetails } from "@/models/types/problem-details";

const isRecord = (input: unknown): input is Record<string, unknown> => {
  return typeof input === "object" && input !== null;
};

const isProblemDetails = (input: unknown): input is ProblemDetails => {
  if (!isRecord(input)) {
    return false;
  }
  return (
    typeof input.type === "string" &&
    typeof input.title === "string" &&
    typeof input.status === "number" &&
    typeof input.detail === "string" &&
    typeof input.instance === "string"
  );
};

const isFortuneResult = (input: unknown): input is FortuneResult => {
  if (!isRecord(input)) {
    return false;
  }
  return (
    typeof input.title === "string" &&
    typeof input.summary === "string" &&
    typeof input.action === "string" &&
    typeof input.caution === "string" &&
    typeof input.luckyKeyword === "string" &&
    typeof input.luckyColor === "string" &&
    typeof input.luckyNumber === "number" &&
    typeof input.luckyTime === "string"
  );
};

const isApiResponse = (input: unknown): input is ApiResponse<FortuneResult> => {
  if (!isRecord(input)) {
    return false;
  }
  const hasSuccess = typeof input.success === "boolean";
  const hasData = "data" in input;
  const hasError = "error" in input;
  if (!hasSuccess || !hasData || !hasError) {
    return false;
  }
  if (input.success) {
    return isFortuneResult(input.data);
  }
  return input.error === null || isProblemDetails(input.error);
};

const createClientErrorResponse = (detail: string): ApiResponse<FortuneResult> => {
  return {
    success: false,
    data: null,
    error: {
      type: "about:blank",
      title: "요청 실패",
      status: 500,
      detail,
      instance: "/fortune",
    },
  };
};

const requestFortune = async (input: {
  request: FortuneRequest;
}): Promise<ApiResponse<FortuneResult>> => {
  try {
    const response = await fetch("/api/fortune", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input.request),
    });
    const data: unknown = await response.json();
    if (!isApiResponse(data)) {
      return createClientErrorResponse("응답 형식이 올바르지 않습니다.");
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      return createClientErrorResponse(error.message);
    }
    return createClientErrorResponse("알 수 없는 오류가 발생했습니다.");
  }
};

export default requestFortune;
