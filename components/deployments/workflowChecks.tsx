import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { WorkflowChecks, WorkflowChecksSchema } from "@/lib/schemas/GithubApi";
import { ConclusionBadge } from "@/components/conclusionBadge";
import { DeploymentWorkflow } from "@/lib/schemas/GithubApi";

export function RefWorkflowChecks({ deployment }: { deployment: DeploymentWorkflow }) {
    const [loadedChecks, setLoadedChecks] = useState<WorkflowChecks>();

    useEffect(() => {
        async function getWorkflowChecksForRef() {
            const owner = deployment.workflow_run.repository.owner.login;
            const repoName = deployment.workflow_run.repository.name;
            const headSha = deployment.head_sha;
            const response = await fetch(
                `/api/checks?head_sha=${headSha}&owner=${owner}&repo_name=${repoName}`,
            );
            const { checkRuns } = await response.json();
            const parsedChecks = WorkflowChecksSchema.parse(checkRuns);
            setLoadedChecks(parsedChecks);
        }
        getWorkflowChecksForRef();
    }, [deployment]);

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Check name</TableHead>
                    <TableHead className="hidden sm:table-cell">
                        Status
                    </TableHead>
                    <TableHead className="hidden sm:table-cell">Link</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {loadedChecks &&
                    loadedChecks.check_runs.map((checkRun, index) => (
                        <TableRow key={index}>
                            <TableCell className="font-medium">
                                {checkRun.name}
                            </TableCell>
                            <TableCell>
                                <ConclusionBadge
                                    conclusion={checkRun.conclusion}
                                />
                            </TableCell>
                            <TableCell>
                                <a href={checkRun.html_url}>
                                    <ExternalLink className="hover:zinc-600 h-4 w-4" />
                                </a>
                            </TableCell>
                        </TableRow>
                    ))}
            </TableBody>
        </Table>
    );
}
