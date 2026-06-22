import { describe, expect, it } from "vitest";
import { ApiError, getErrorMessage, getErrorStatus } from "@/lib/api/errors";
import { handleApiRoute, parsePageParam } from "@/lib/api/route-utils";

describe("ApiError helpers", () => {
  it("extracts message and status from ApiError", () => {
    const error = new ApiError("Not found", 404);
    expect(getErrorMessage(error)).toBe("Not found");
    expect(getErrorStatus(error)).toBe(404);
  });

  it("falls back for unknown errors", () => {
    expect(getErrorMessage("boom")).toBe("Internal server error");
    expect(getErrorStatus("boom")).toBe(500);
  });
});

describe("parsePageParam", () => {
  it("parses valid page numbers", () => {
    const params = new URLSearchParams("page=3");
    expect(parsePageParam(params)).toBe(3);
  });

  it("returns fallback for invalid values", () => {
    const params = new URLSearchParams("page=abc");
    expect(parsePageParam(params, 1)).toBe(1);
  });

  it("caps page numbers at the maximum", () => {
    const params = new URLSearchParams("page=9999");
    expect(parsePageParam(params)).toBe(500);
  });
});

describe("handleApiRoute", () => {
  it("returns JSON data on success", async () => {
    const response = await handleApiRoute(async () => ({ ok: true }));
    expect(response.status).toBe(200);

    const body = await response.json();
    expect(body).toEqual({ ok: true });
  });

  it("returns error JSON with status on failure", async () => {
    const response = await handleApiRoute(async () => {
      throw new ApiError("Bad request", 400);
    });

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Bad request" });
  });

  it("sets cache-control header when provided", async () => {
    const response = await handleApiRoute(
      async () => [],
      "public, s-maxage=3600"
    );

    expect(response.headers.get("Cache-Control")).toBe("public, s-maxage=3600");
  });
});
