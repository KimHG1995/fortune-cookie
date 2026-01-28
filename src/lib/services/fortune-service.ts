import "server-only";

import createProblemDetails from "@/lib/core/create-problem-details";
import fortuneRequestSchema from "@/models/dto/fortune-request.dto";
import fortuneResultSchema from "@/models/dto/fortune-result.dto";
import type { ApiResponse } from "@/models/types/api-response";
import type { FortuneRequest } from "@/models/types/fortune-request";
import type { FortuneResult } from "@/models/types/fortune";

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
  return `${request.jobCategory}|${request.tone}`;
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

const writeCache = (
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

function createFallbackFortune(request: FortuneRequest): FortuneResult {
  const actions = [
    "오늘은 30분만 집중해서 핵심 업무를 끝낸 뒤, 남은 시간은 내일을 위한 정리로 마무리해 보세요.",
    "결정은 빠르게, 실행은 작게 시작하세요. 작은 성공이 리듬을 만듭니다.",
    "대화로 막힌 흐름을 푸는 날입니다. 점심 전 짧은 피드백 요청이 열쇠가 됩니다.",
  ];
  const cautions = [
    "완벽하게 정리된 계획보다, 우선순위 한 가지만 분명히 하는 편이 효과적입니다.",
    "동시에 여러 프로젝트를 건드리면 성과가 분산됩니다. 한 가지에 집중해 주세요.",
    "피로가 결정의 질을 낮춥니다. 휴식 신호를 무시하지 마세요.",
  ];
  const index = Math.floor(Math.random() * actions.length);
  return {
    title: `${request.jobCategory}의 흐름이 정리되는 날`,
    summary: `${request.jobCategory} 분야에서 방향성이 분명해집니다. 톤은 ${request.tone}에 맞춰 안정적인 속도로 가는 것이 좋습니다.`,
    action: actions[index],
    caution: cautions[index],
    luckyKeyword: "우선순위",
    luckyColor: "살구색",
    luckyNumber: 7 + index,
    luckyTime: "오후 3시",
  };
}

const buildSystemPrompt = (tone: FortuneRequest["tone"]): string => {
  return `너는 포춘쿠키 운세 작가다. 톤은 ${tone}이며 한국어로 작성한다. 감정적 과장보다 현실적인 조언과 짧은 실행 지침을 준다. 결과는 반드시 JSON 객체만 출력한다.`;
};

const buildUserPrompt = (jobCategory: string): string => {
  return `직업 분야는 "${jobCategory}"이다. 아래 형식으로만 결과를 만들어라.\n\n{
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
      parts: [{ text: buildSystemPrompt(request.tone) }],
    },
    contents: [
      {
        role: "user",
        parts: [{ text: buildUserPrompt(request.jobCategory) }],
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
  writeCache(parseResult.data, now, response);
  return response;
}

export default requestFortune;
