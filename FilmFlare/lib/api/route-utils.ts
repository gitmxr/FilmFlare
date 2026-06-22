import { NextResponse } from "next/server";
import { getErrorMessage, getErrorStatus } from "@/lib/api/errors";
import { parsePageNumber } from "@/lib/api/validation";

type RouteHandler<T> = () => Promise<T>;

export async function handleApiRoute<T>(
  handler: RouteHandler<T>,
  cacheControl?: string
) {
  try {
    const data = await handler();
    const headers = cacheControl ? { "Cache-Control": cacheControl } : undefined;
    return NextResponse.json(data, { headers });
  } catch (error) {
    const status = getErrorStatus(error);
    return NextResponse.json(
      { error: getErrorMessage(error) },
      { status }
    );
  }
}

export function parsePageParam(searchParams: URLSearchParams, fallback = 1) {
  return parsePageNumber(searchParams.get("page"), fallback);
}
