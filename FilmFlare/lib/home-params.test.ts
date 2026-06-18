import { describe, expect, it } from "vitest";
import { buildHomePageUrl, parseHomePages } from "@/lib/home-params";

describe("parseHomePages", () => {
  it("returns page 1 for missing params", () => {
    expect(parseHomePages({})).toEqual({
      trendingPage: 1,
      topRatedPage: 1,
      bollywoodPage: 1,
      hollywoodPage: 1,
    });
  });

  it("parses valid page numbers", () => {
    expect(
      parseHomePages({
        trendingPage: "2",
        topRatedPage: "3",
      })
    ).toEqual({
      trendingPage: 2,
      topRatedPage: 3,
      bollywoodPage: 1,
      hollywoodPage: 1,
    });
  });

  it("falls back for invalid page values", () => {
    expect(parseHomePages({ trendingPage: "0" })).toEqual({
      trendingPage: 1,
      topRatedPage: 1,
      bollywoodPage: 1,
      hollywoodPage: 1,
    });
  });
});

describe("buildHomePageUrl", () => {
  it("updates one page param while preserving others", () => {
    const current = new URLSearchParams("trendingPage=1&topRatedPage=2");
    expect(buildHomePageUrl(current, "trendingPage", 3)).toBe(
      "?trendingPage=3&topRatedPage=2"
    );
  });
});
