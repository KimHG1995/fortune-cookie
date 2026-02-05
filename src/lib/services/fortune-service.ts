import "server-only";

import createProblemDetails from "@/lib/core/create-problem-details";
import createFallbackFortune from "@/lib/services/fortune-fallback";
import fortuneRequestSchema from "@/models/dto/fortune-request.dto";
import fortuneResultSchema from "@/models/dto/fortune-result.dto";
import type { ApiResponse } from "@/models/types/api/api-response";
import type { FortuneRequest } from "@/models/types/fortune/fortune-request";
import type { FortuneResult } from "@/models/types/fortune/fortune-result";

type CacheEntry = {
  readonly value: ApiResponse<FortuneResult>;
  readonly expiresAt: number;
};

const cacheTimeMs = 1000 * 60 * 5;
const fortuneCache = new Map<string, CacheEntry>();

const createSuccessResponse = (data: FortuneResult): ApiResponse<FortuneResult> => {
  return {
    success: true,
    data,
    error: null,
  };
};

const createErrorResponse = (input: {
  status: number;
  title: string;
  detail: string;
  instance: string;
}): ApiResponse<FortuneResult> => {
  return {
    success: false,
    data: null,
    error: createProblemDetails({
      type: "about:blank",
      title: input.title,
      status: input.status,
      detail: input.detail,
      instance: input.instance,
    }),
  };
};

const createCacheKey = (request: FortuneRequest): string => {
  return `${request.locale}|${request.jobCategory}|${request.tone}`;
};

function readCache(
  request: FortuneRequest,
  now: number,
): ApiResponse<FortuneResult> | null {
  const key = createCacheKey(request);
  const cached = fortuneCache.get(key);
  if (!cached) {
    return null;
  }
  if (cached.expiresAt <= now) {
    fortuneCache.delete(key);
    return null;
  }
  return cached.value;
}

const saveCache = (
  request: FortuneRequest,
  now: number,
  value: ApiResponse<FortuneResult>,
): void => {
  const key = createCacheKey(request);
  fortuneCache.set(key, { value, expiresAt: now + cacheTimeMs });
};

const isRecord = (input: unknown): input is Record<string, unknown> => {
  return typeof input === "object" && input !== null;
};

function getGeminiText(input: unknown): string | null {
  if (!isRecord(input)) {
    return null;
  }
  const candidates = input.candidates;
  if (!Array.isArray(candidates) || candidates.length === 0) {
    return null;
  }
  const firstCandidate = candidates[0];
  if (!isRecord(firstCandidate)) {
    return null;
  }
  const content = firstCandidate.content;
  if (!isRecord(content)) {
    return null;
  }
  const parts = content.parts;
  if (!Array.isArray(parts) || parts.length === 0) {
    return null;
  }
  const firstPart = parts[0];
  if (!isRecord(firstPart)) {
    return null;
  }
  const text = firstPart.text;
  if (typeof text !== "string") {
    return null;
  }
  return text;
}

function extractJsonText(content: string): string | null {
  const startIndex = content.indexOf("{");
  const endIndex = content.lastIndexOf("}");
  if (startIndex < 0 || endIndex < 0 || endIndex <= startIndex) {
    return null;
  }
  return content.slice(startIndex, endIndex + 1);
}

const buildSystemPrompt = (request: FortuneRequest): string => {
  if (request.locale === "en") {
    return `You are a fortune cookie writer. Write in English with a ${request.tone} tone. Avoid emotional exaggeration and give realistic advice with short, actionable guidance. Output only a JSON object.`;
  }
  return `너는 포춘쿠키 운세 작가다. 톤은 ${request.tone}이며 한국어로 작성한다. 감정적 과장보다 현실적인 조언과 짧은 실행 지침을 준다. 결과는 반드시 JSON 객체만 출력한다.`;
};

const buildUserPrompt = (request: FortuneRequest): string => {
  if (request.locale === "en") {
    return `The role is "${request.jobCategory}". Output only in the following JSON format.\n\n{
  "title": "Within 40 characters",
  "summary": "Within 200 characters",
  "action": "Within 200 characters",
  "caution": "Within 200 characters",
  "luckyKeyword": "Within 20 characters",
  "luckyColor": "Within 12 characters",
  "luckyNumber": "Integer 0~99",
  "luckyTime": "Time expression"
}`;
  }
  return `직업 분야는 "${request.jobCategory}"이다. 아래 형식으로만 결과를 만들어라.\n\n{
  "title": "40자 이내",
  "summary": "200자 이내",
  "action": "200자 이내",
  "caution": "200자 이내",
  "luckyKeyword": "20자 이내",
  "luckyColor": "12자 이내",
  "luckyNumber": 0~99 정수,
  "luckyTime": "시간 표현"
}`;
};

const createGeminiPayload = (request: FortuneRequest): Record<string, unknown> => {
  return {
    systemInstruction: {
      role: "system",
      parts: [{ text: buildSystemPrompt(request) }],
    },
    contents: [
      {
        role: "user",
        parts: [{ text: buildUserPrompt(request) }],
      },
    ],
    generationConfig: {
      temperature: 0.7,
    },
  };
};

function parseGeminiResponse(data: unknown): FortuneResult | null {
  const text = getGeminiText(data);
  if (!text) {
    return null;
  }
  const jsonText = extractJsonText(text);
  if (!jsonText) {
    return null;
  }
  try {
    const parsed: unknown = JSON.parse(jsonText);
    const result = fortuneResultSchema.safeParse(parsed);
    if (!result.success) {
      return null;
    }
    return result.data;
  } catch {
    return null;
  }
}

async function requestFortuneFromGemini(input: {
  apiKey: string;
  request: FortuneRequest;
}): Promise<FortuneResult | null> {
  const endpoint = new URL(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent",
  );
  endpoint.searchParams.set("key", input.apiKey);
  const response = await fetch(endpoint.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createGeminiPayload(input.request)),
  });
  if (!response.ok) {
    return null;
  }
  const data: unknown = await response.json();
  return parseGeminiResponse(data);
}

async function resolveFortuneResult(request: FortuneRequest): Promise<FortuneResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return createFallbackFortune(request);
  }
  const result = await requestFortuneFromGemini({ apiKey, request });
  if (!result) {
    return createFallbackFortune(request);
  }
  return result;
}

async function requestFortune(input: {
  request: FortuneRequest;
}): Promise<ApiResponse<FortuneResult>> {
  const parseResult = fortuneRequestSchema.safeParse(input.request);
  if (!parseResult.success) {
    return createErrorResponse({
      status: 400,
      title: "요청 검증 실패",
      detail: parseResult.error.message,
      instance: "/actions/request-fortune",
    });
  }
  const now = Date.now();
  const cached = readCache(parseResult.data, now);
  if (cached) {
    return cached;
  }
  const fortuneResult = await resolveFortuneResult(parseResult.data);
  const response = createSuccessResponse(fortuneResult);
  saveCache(parseResult.data, now, response);
  return response;
}

export default requestFortune;
