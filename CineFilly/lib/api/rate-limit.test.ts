import { describe, expect, it, beforeEach } from "vitest";
import { checkRateLimit, resetRateLimitStore } from "@/lib/api/rate-limit";

function createRequest(ip = "1.2.3.4") {
  return new Request("http://localhost/api/movies/trending", {
    headers: { "x-forwarded-for": ip },
  });
}

describe("checkRateLimit", () => {
  beforeEach(() => {
    resetRateLimitStore();
  });

  it("allows requests under the limit", () => {
    const result = checkRateLimit(createRequest());
    expect(result.allowed).toBe(true);
    expect(result.remaining).toBeGreaterThan(0);
  });

  it("blocks requests over the limit", () => {
    for (let i = 0; i < 60; i++) {
      checkRateLimit(createRequest());
    }

    const blocked = checkRateLimit(createRequest());
    expect(blocked.allowed).toBe(false);
    expect(blocked.remaining).toBe(0);
  });

  it("tracks clients separately", () => {
    for (let i = 0; i < 60; i++) {
      checkRateLimit(createRequest("1.1.1.1"));
    }

    const otherClient = checkRateLimit(createRequest("2.2.2.2"));
    expect(otherClient.allowed).toBe(true);
  });
});
