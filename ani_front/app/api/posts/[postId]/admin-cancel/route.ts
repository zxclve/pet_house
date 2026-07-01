import { NextResponse } from "next/server";

const backendBaseUrl = process.env.BACKEND_BASE_URL ?? "http://localhost:8686";

export async function POST(
  req: Request,
  ctx: { params: Promise<{ postId: string }> }
) {
  const { postId } = await ctx.params;
  const auth = req.headers.get("authorization");
  const res = await fetch(`${backendBaseUrl}/api/posts/${postId}/admin-cancel`, {
    method: "POST",
    headers: auth ? { Authorization: auth } : {},
    cache: "no-store",
  });
  const text = await res.text();
  return new NextResponse(text || null, {
    status: res.status,
    headers: { "Content-Type": res.headers.get("Content-Type") || "application/json" },
  });
}
