import { type NextRequest, NextResponse } from 'next/server';
import { getWorkflowChecksForRef } from '@/lib/services/GithubApi';


export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const head_sha = searchParams.get("head_sha");
  const checkRuns = await getWorkflowChecksForRef(head_sha!);
  return NextResponse.json({ checkRuns });
}