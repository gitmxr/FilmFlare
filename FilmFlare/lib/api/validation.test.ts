import { describe, expect, it } from "vitest";
import { ApiError } from "@/lib/api/errors";
import {
  MAX_PAGE,
  parsePageNumber,
  validateMovieId,
  validateSearchQuery,
  validateYouTubeEmbedId,
  validateYouTubeVideoId,
} from "@/lib/api/validation";

describe("validation", () => {
  it("parses and caps page numbers", () => {
    expect(parsePageNumber("1")).toBe(1);
    expect(parsePageNumber("9999")).toBe(MAX_PAGE);
    expect(parsePageNumber("-1", 2)).toBe(2);
  });

  it("validates movie IDs", () => {
    expect(validateMovieId("550")).toBe("550");
    expect(() => validateMovieId("abc")).toThrow(ApiError);
  });

  it("validates YouTube video IDs", () => {
    expect(validateYouTubeVideoId("dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(() => validateYouTubeVideoId("bad-id")).toThrow(ApiError);
    expect(validateYouTubeEmbedId("dQw4w9WgXcQ")).toBe("dQw4w9WgXcQ");
    expect(validateYouTubeEmbedId("bad")).toBeNull();
  });

  it("validates search queries", () => {
    expect(validateSearchQuery(" batman ")).toBe("batman");
    expect(() => validateSearchQuery("")).toThrow(ApiError);
    expect(() => validateSearchQuery("a".repeat(201))).toThrow(ApiError);
  });
});
