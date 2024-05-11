"use client";

import React, { useEffect, useState } from "react";
import {
    TableHead,
    TableRow,
    TableHeader,
    Table,
    TableBody,
} from "@/components/ui/table";
import {
    CardTitle,
    CardDescription,
    CardHeader,
    Card,
    CardContent,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import { TableDeployBody } from "./tableDeployBody";
import { getDeploymentsWorkflows } from "@/lib/services/GithubApi";
import { GetUserSelectedRepos } from "@/lib/storage/local";
import { RepoDeploy } from "@/lib/schemas/GithubApi";

export function TabContent() {
    const [deploymentsWorkflows, setDeploymentsWorkflows] = useState<
        RepoDeploy[]
    >([]);

    useEffect(() => {
        const selectedRepoList = GetUserSelectedRepos();
        fetch("/api/deployments", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ repos: selectedRepoList }),
        })
            .then((response) => response.json())
            .then((data) => {
                setDeploymentsWorkflows(data.workflows);
            });
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
