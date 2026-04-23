import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const backendBaseUrl = process.env.BACKEND_BASE_URL ?? "http://localhost:8686";

  const res = await fetch(`${backendBaseUrl}/user/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: await req.text(),
    cache: "no-store",
  });

  const text = await res.text();

  return new NextResponse(text, {
    status: res.status,
    headers: { "Content-Type": "application/json" },
  });
}
