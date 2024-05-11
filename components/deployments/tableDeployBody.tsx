"use client";

import { TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { RefWorkflowChecks } from "./workflowChecks";
import { RepoDeploy } from "@/lib/schemas/GithubApi";
import { ConclusionBadge } from "@/components/conclusionBadge";

interface DeployRowProps {
    deployData: RepoDeploy[];
}

export function TableDeployBody(props: DeployRowProps) {
    const { deployData } = props;
    return (
        <TableBody>
            {deployData &&
                deployData.map((parsedDeployment, index) => (
                    <Collapsible key={index} asChild>
                        <>
                            <CollapsibleTrigger asChild>
                                <TableRow key={index} className="bg-accent">
                                    <TableCell>
                                        <div className="font-medium">
                                            {
                                                parsedDeployment.workflow_run
                                                    .title
                                            }
                                        </div>
                                        <div className="hidden text-sm text-muted-foreground md:inline">
                                            {
                                                parsedDeployment.workflow_run
                                                    .workflow_name
                                            }
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        {parsedDeployment.environment}
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <Badge
                                            className="text-xs"
                                            variant="secondary"
                                        >
                                            {
                                                parsedDeployment.workflow_run
                                                    .repository.name
                                            }
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden sm:table-cell">
                                        <ConclusionBadge
                                            conclusion={
                                                parsedDeployment.workflow_run
                                                    .conclusion
                                            }
                                        />
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        {parsedDeployment.workflow_run.created_at.toLocaleString(
                                            "en-GB",
                                        )}
                                    </TableCell>
                                    <TableCell className="hover:bg-zinc-400">
                                        <a
                                            href={
                                                parsedDeployment.workflow_run
                                                    .html_url
                                            }
                                        >
                                            <ExternalLink className="hover:zinc-600 h-4 w-4" />
                                        </a>
                                    </TableCell>
                                </TableRow>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="" asChild>
                                <TableCell colSpan={6}>
                                    <RefWorkflowChecks
                                        deployment={parsedDeployment}
                                    />
                                </TableCell>
                            </CollapsibleContent>
                        </>
                    </Collapsible>
                ))}
        </TableBody>
    );
}
