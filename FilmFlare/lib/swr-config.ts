import type { SWRConfiguration } from "swr";
import { fetcher } from "@/lib/api/client";

export const swrConfig: SWRConfiguration = {
  fetcher,
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  dedupingInterval: 60_000,
  errorRetryCount: 2,
  keepPreviousData: true,
};
