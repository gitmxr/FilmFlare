export interface PaginatedState {
  page: number;
  totalPages?: number;
}

export type LoadingState = "idle" | "loading" | "success" | "error";
