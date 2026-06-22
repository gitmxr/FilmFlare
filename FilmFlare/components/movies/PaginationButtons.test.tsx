import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import PaginationButtons from "@/components/movies/PaginationButtons";

describe("PaginationButtons", () => {
  it("disables previous button on first page", () => {
    render(
      <PaginationButtons page={1} param="trendingPage" onPageChange={vi.fn()} />
    );

    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next page" })).not.toBeDisabled();
  });

  it("calls onPageChange for next and previous", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <PaginationButtons
        page={2}
        param="trendingPage"
        onPageChange={onPageChange}
      />
    );

    await user.click(screen.getByRole("button", { name: "Next page" }));
    expect(onPageChange).toHaveBeenCalledWith("trendingPage", 3);

    await user.click(screen.getByRole("button", { name: "Previous page" }));
    expect(onPageChange).toHaveBeenCalledWith("trendingPage", 1);
  });

  it("disables both buttons while pending", () => {
    render(
      <PaginationButtons
        page={2}
        param="trendingPage"
        onPageChange={vi.fn()}
        isPending
      />
    );

    expect(screen.getByRole("button", { name: "Previous page" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });

  it("disables next button when there is no next page", () => {
    render(
      <PaginationButtons
        page={2}
        param="trendingPage"
        onPageChange={vi.fn()}
        hasNextPage={false}
      />
    );

    expect(screen.getByRole("button", { name: "Next page" })).toBeDisabled();
  });
});
