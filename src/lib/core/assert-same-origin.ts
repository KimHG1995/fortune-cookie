type AssertSameOriginInput = {
  readonly headers: Headers;
  readonly allowedOrigins: readonly string[];
};

const getHostFromOrigin = (origin: string): string | null => {
  try {
    return new URL(origin).host;
  } catch {
    return null;
  }
};

const isAllowedReferer = (referer: string, allowedOrigins: readonly string[]): boolean => {
  return allowedOrigins.some((origin) => referer.startsWith(origin));
};

const isAllowedHost = (host: string, allowedOrigins: readonly string[]): boolean => {
  return allowedOrigins.some((origin) => {
    const allowedHost = getHostFromOrigin(origin);
    return allowedHost !== null && allowedHost === host;
  });
};

export default function executeSameOriginAssertion(input: AssertSameOriginInput): void {
  const origin = input.headers.get("origin");
  const referer = input.headers.get("referer");
  const fetchSite = input.headers.get("sec-fetch-site");
  const host = input.headers.get("x-forwarded-host") ?? input.headers.get("host");

  if (fetchSite && fetchSite !== "same-origin" && fetchSite !== "same-site") {
    throw new Error("허용되지 않은 출처입니다.");
  }

  const hasAllowedOrigin = origin ? input.allowedOrigins.includes(origin) : false;
  const hasAllowedReferer = referer ? isAllowedReferer(referer, input.allowedOrigins) : false;
  const hasAllowedHost = host ? isAllowedHost(host, input.allowedOrigins) : false;

  if (!hasAllowedOrigin && !hasAllowedReferer && !hasAllowedHost) {
    throw new Error("허용되지 않은 출처입니다.");
  }
}
