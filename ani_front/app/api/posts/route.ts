import { NextResponse } from "next/server";

const backendBaseUrl = process.env.BACKEND_BASE_URL ?? "http://localhost:8686";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const auth = req.headers.get("authorization");
  const res = await fetch(`${backendBaseUrl}/api/posts?${searchParams.toString()}`, {
    cache: "no-store",
    headers: auth ? { Authorization: auth } : {},
  });
  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": res.headers.get("Content-Type") || "application/json" },
  });
}
