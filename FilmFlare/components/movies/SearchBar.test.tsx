import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import SearchBar from "@/components/movies/SearchBar";

describe("SearchBar", () => {
  it("renders input with current value", () => {
    render(<SearchBar value="batman" onChange={vi.fn()} />);
    expect(screen.getByLabelText("Search for movies")).toHaveValue("batman");
  });

  it("calls onChange when typing", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();

    render(<SearchBar value="" onChange={onChange} />);
    await user.type(screen.getByLabelText("Search for movies"), "a");

    expect(onChange).toHaveBeenCalled();
  });

  it("shows search history when input is empty", async () => {
    const user = userEvent.setup();
    const onSelectHistory = vi.fn();

    render(
      <SearchBar
        value=""
        onChange={vi.fn()}
        history={["batman", "matrix"]}
        onSelectHistory={onSelectHistory}
      />
    );

    await user.click(screen.getByRole("button", { name: "batman" }));
    expect(onSelectHistory).toHaveBeenCalledWith("batman");
  });

  it("shows loading state while searching", () => {
    render(<SearchBar value="batman" onChange={vi.fn()} isSearching />);
    expect(screen.getByText("Searching…")).toBeInTheDocument();
  });
});
