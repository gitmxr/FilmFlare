import { NextResponse } from "next/server";
import { getErrorMessage, getErrorStatus } from "@/lib/api/errors";

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
  const page = parseInt(searchParams.get("page") ?? String(fallback), 10);
  return Number.isNaN(page) || page < 1 ? fallback : page;
}
