"use client";

import React, { useEffect, useRef, useState } from "react";
import { TableHead, TableRow, TableHeader, Table } from "@/components/ui/table";
import {
    CardTitle,
    CardDescription,
    CardHeader,
    Card,
    CardContent,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { TableDeployBody } from "@/components/deployments/tableDeployBody";
import { GetUserSelectedRepos } from "@/lib/storage/local";
import { DeploymentWorkflow } from "@/lib/schemas/GithubApi";
import { streamingFetchDeployments } from "@/lib/stream/fetch";

export function TabContent() {
    const [deploymentsWorkflows, setDeploymentsWorkflows] = useState<
        DeploymentWorkflow[]
    >([]);

    useEffect(() => {
        const selectedRepoList = GetUserSelectedRepos();
        const fetchData = async () => {
            const response = streamingFetchDeployments("/api/deployments", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ repos: selectedRepoList }),
            });

            for await (let chunk of response) {
                try {
                    // chunk is an array of DeploymentWorkflow objects
                    setDeploymentsWorkflows((prev) => [...prev, ...chunk]);
                } catch (e: any) {
                    console.warn(e.message);
                }
            }
        };
        fetchData();
    }, []);

    return (
        <TabsContent value="week">
            <Card x-chunk="dashboard-05-chunk-3">
                <CardHeader className="px-7">
                    <CardTitle>Deployments overview</CardTitle>
                    <CardDescription>
                        Recent deployments for your repositories.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    Environment
                                </TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    Repo
                                </TableHead>
                                <TableHead className="hidden sm:table-cell">
                                    Status
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Date
                                </TableHead>
                                <TableHead className="text-right">
                                    Link
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableDeployBody deployData={deploymentsWorkflows} />
                    </Table>
                </CardContent>
            </Card>
        </TabsContent>
    );
}
