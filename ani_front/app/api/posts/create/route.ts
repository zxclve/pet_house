import { NextResponse } from "next/server";

const backendBaseUrl = process.env.BACKEND_BASE_URL ?? "http://localhost:8686";

export async function POST(req: Request) {
  const auth = req.headers.get("authorization");
  const formData = await req.formData();
  const res = await fetch(`${backendBaseUrl}/api/posts/create`, {
    method: "POST",
    headers: auth ? { Authorization: auth } : {},
    body: formData,
    cache: "no-store",
  });
  const text = await res.text();
  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": res.headers.get("Content-Type") || "application/json" },
  });
}
