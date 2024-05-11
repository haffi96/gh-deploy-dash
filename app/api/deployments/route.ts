import { type NextRequest, NextResponse } from "next/server";
import { getDeploymentsWorkflows } from "@/lib/services/GithubApi";

export async function POST(request: NextRequest) {
    const { repos } = await request.json();
    const workflows = await getDeploymentsWorkflows(repos);
    return NextResponse.json({ workflows });
}