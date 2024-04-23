import React from 'react'
import { TableHead, TableRow, TableHeader, TableBody, Table } from "@/components/ui/table"
import { CardTitle, CardDescription, CardHeader, Card, CardContent } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { z } from "zod";
import { TableDeployRow } from './tableDeployBody'

const OWNER = "haffi96";
const REPO = "keyify";

const RepoDeploymentsSchema = z.object({
  head_sha: z.string(),
  environment: z.string(),
  workflow_run: z.object({
    title: z.string(),
    workflow_name: z.string(),
    workflow_id: z.number(),
    run_number: z.number(),
    event: z.string(),
    status: z.string(),
    conclusion: z.string(),
    created_at: z.date(),
    check_suite_id: z.number(),
    html_url: z.string(),
    actor: z.object({
      login: z.string(),
      avatar_url: z.string(),
      html_url: z.string(),
    }),
    repository: z.object({
      name: z.string(),
      full_name: z.string(),
      html_url: z.string(),
      owner: z.object({
        login: z.string().optional(),
        avatar_url: z.string(),
        html_url: z.string(),
      }),
    }),
  }),
});

export type RepoDeploy = z.infer<typeof RepoDeploymentsSchema>;


async function listDeployments() {
  const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/deployments`, {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: `Bearer ${process.env.GH_SECRET}`,
    }
  });
  const deployments = await response.json();
  return deployments;
}

async function getWorkflowForRef(ref: string) {
  const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/actions/runs?head_sha=${ref}`, {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: `Bearer ${process.env.GH_SECRET}`,
    }
  });
  const workflows = await response.json();
  return workflows.workflow_runs[0]; // The total_count should be one
}

export async function TabContent() {
  const deployments = await listDeployments();


  const repoDeployments = new Map<number, RepoDeploy>();

  for (const deployment of deployments) {
    const { sha, environment } = deployment;
    const workflow = await getWorkflowForRef(deployment.sha);

    const parsedDate = new Date(workflow.created_at)

    const repoDeployment = RepoDeploymentsSchema.parse({
      head_sha: sha,
      environment,
      workflow_run: {
        title: workflow.display_title,
        workflow_name: workflow.name,
        workflow_id: workflow.workflow_id,
        run_number: workflow.run_number,
        event: workflow.event,
        status: workflow.status,
        conclusion: workflow.conclusion,
        created_at: parsedDate,
        check_suite_id: workflow.check_suite_id,
        html_url: workflow.html_url,
        actor: {
          login: workflow.actor.login,
          avatar_url: workflow.actor.avatar_url,
          html_url: workflow.actor.html_url,
        },
        repository: {
          name: workflow.repository.name,
          full_name: workflow.repository.full_name,
          html_url: workflow.repository.html_url,
          owner: {
            login: workflow.repository.owner.login,
            avatar_url: workflow.repository.owner.avatar_url,
            html_url: workflow.repository.owner.html_url,
          },
        },
      },
    });

    repoDeployments.set(deployment.id, repoDeployment);
  }

  const mappedArray = Array.from(repoDeployments.values());

  mappedArray.sort((a, b) => {
    return new Date(b.workflow_run.created_at).getTime() - new Date(a.workflow_run.created_at).getTime();
  })

  return (
    <TabsContent value="week">
      <Card x-chunk="dashboard-05-chunk-3">
        <CardHeader className="px-7">
          <CardTitle>Deployments overview</CardTitle>
          <CardDescription>Recent deployments for your repositories.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden sm:table-cell">Environment</TableHead>
                <TableHead className="hidden sm:table-cell">Repo</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableDeployRow deployData={mappedArray} />
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
