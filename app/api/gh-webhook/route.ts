import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const req = await request.json();
    console.log("repos", req);

    return NextResponse.json({ message: "ok" });
}
