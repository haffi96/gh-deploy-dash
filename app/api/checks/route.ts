import { type NextRequest, NextResponse } from "next/server";
import { getWorkflowChecksForRef } from "@/lib/services/GithubApi";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const owner = searchParams.get("owner");
    const repoName = searchParams.get("repo_name");
    const head_sha = searchParams.get("head_sha");

    const checkRuns = await getWorkflowChecksForRef(
        head_sha!,
        owner!,
        repoName!,
    );
    return NextResponse.json({ checkRuns });
}
