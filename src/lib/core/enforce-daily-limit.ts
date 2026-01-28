type DailyLimitInput = {
  readonly headers: Headers;
  readonly action: "fortune" | "contact";
  readonly maxPerDay: number;
};

type DailyLimitState = {
  readonly count: number;
};

const dailyLimitCache = new Map<string, DailyLimitState>();

const getTodayKey = (): string => {
  return new Date().toISOString().slice(0, 10);
};

const getClientKey = (headers: Headers): string => {
  const forwardedFor = headers.get("x-forwarded-for");
  const realIp = headers.get("x-real-ip");
  const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : realIp ?? "unknown";
  const userAgent = headers.get("user-agent") ?? "unknown";
  return `${ip}|${userAgent}`;
};

export default function enforceDailyLimit(input: DailyLimitInput): void {
  const dateKey = getTodayKey();
  const clientKey = getClientKey(input.headers);
  const storeKey = `${input.action}|${dateKey}|${clientKey}`;
  const current = dailyLimitCache.get(storeKey);

  if (!current) {
    dailyLimitCache.set(storeKey, { count: 1 });
    return;
  }

  if (current.count >= input.maxPerDay) {
    throw new Error("일일 요청 제한을 초과했습니다.");
  }

  dailyLimitCache.set(storeKey, { count: current.count + 1 });
}
