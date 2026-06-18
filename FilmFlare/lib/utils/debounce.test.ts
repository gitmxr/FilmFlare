import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { debounce } from "@/lib/utils/debounce";

describe("debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("delays function execution", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 500);

    debounced("test");
    expect(fn).not.toHaveBeenCalled();

    vi.advanceTimersByTime(500);
    expect(fn).toHaveBeenCalledOnce();
    expect(fn).toHaveBeenCalledWith("test");
  });

  it("cancels previous calls when invoked repeatedly", () => {
    const fn = vi.fn();
    const debounced = debounce(fn, 500);

    debounced("first");
    vi.advanceTimersByTime(300);
    debounced("second");
    vi.advanceTimersByTime(500);

    expect(fn).toHaveBeenCalledOnce();
    expect(fn).toHaveBeenCalledWith("second");
  });
});
