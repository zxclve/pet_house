import { NextResponse } from "next/server";

const backendBaseUrl = process.env.BACKEND_BASE_URL ?? "http://localhost:8686";

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ postId: string }> }
) {
  const { postId } = await ctx.params;
  const res = await fetch(`${backendBaseUrl}/api/posts/${postId}`, { cache: "no-store" });
  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": res.headers.get("Content-Type") || "application/json" },
  });
}
