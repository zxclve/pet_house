import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const authHeader = req.headers.get("authorization");
  const backendBaseUrl = process.env.BACKEND_BASE_URL ?? "http://localhost:8686";

  const res = await fetch(`${backendBaseUrl}/api/contracts/posts?${searchParams.toString()}`, {
    headers: authHeader ? { Authorization: authHeader } : undefined,
    cache: "no-store",
  });

  if (!res.ok) {
    const errorBody = await res.text();
    return NextResponse.json(
      { message: errorBody || "계약 관리 목록을 불러오지 못했습니다." },
      { status: res.status }
    );
  }

  return NextResponse.json(await res.json());
}
