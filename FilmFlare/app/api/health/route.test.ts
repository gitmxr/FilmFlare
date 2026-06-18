import { describe, expect, it, vi } from "vitest";
import { GET } from "@/app/api/health/route";

describe("GET /api/health", () => {
  it("returns ok when API keys are configured", async () => {
    vi.stubEnv("TMDB_API_KEY", "test-tmdb");
    vi.stubEnv("YOUTUBE_API_KEY", "test-youtube");

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.status).toBe("ok");
    expect(body.checks.tmdbApiKey).toBe(true);
    expect(body.checks.youtubeApiKey).toBe(true);
  });

  it("returns degraded when API keys are missing", async () => {
    vi.stubEnv("TMDB_API_KEY", "");
    vi.stubEnv("YOUTUBE_API_KEY", "");

    const response = await GET();
    const body = await response.json();

    expect(response.status).toBe(503);
    expect(body.status).toBe("degraded");
  });
});
