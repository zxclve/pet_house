import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const res = await fetch(
    `http://localhost:8686/api/contracts?${searchParams.toString()}`
  );

  const data = await res.json();

  return NextResponse.json(data);
}