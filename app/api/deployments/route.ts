import { type NextRequest } from "next/server";
import {
    fetchWorkflowsGenerator,
    listDeployments,
} from "@/lib/services/GithubApi";
import { makeStream, StreamingResponse } from "@/lib/stream";

// This is required to enable streaming
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
    const { repos } = await request.json();

    const deployments = await listDeployments(repos);
    const stream = makeStream(fetchWorkflowsGenerator(deployments));
    const response = new StreamingResponse(stream);
    return response;
}
