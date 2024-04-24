import React from 'react'
import { TableHead, TableRow, TableHeader, Table } from "@/components/ui/table"
import { CardTitle, CardDescription, CardHeader, Card, CardContent } from "@/components/ui/card"
import { TabsContent } from "@/components/ui/tabs"
import { TableDeployBody } from './tableDeployBody'
import { getDeploymentsWorkflows } from '@/lib/services/GithubApi';

export async function TabContent() {
  const deploymentsWorkflows = await getDeploymentsWorkflows();

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
            <TableDeployBody deployData={deploymentsWorkflows} />
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
