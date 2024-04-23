import React from 'react'
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { CardTitle, CardDescription, CardHeader, Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from 'lucide-react'
import { TabsContent } from "@/components/ui/tabs"


export function TabContent() {
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
                <TableHead className="hidden sm:table-cell">Type</TableHead>
                <TableHead className="hidden sm:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="text-right">Link</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="bg-accent">
                <TableCell>
                  <div className="font-medium">New feature 1</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">org/repo-name1</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">Prod</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    Deploy
                  </Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs bg-green-400" variant="secondary">
                    Success
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
                <TableCell className="">
                  <a href="https://github.com/bilal-and-haffi/aiPersonalisedGifts/actions/runs/8683893867">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </TableCell>
              </TableRow>
              <TableRow className="bg-accent">
                <TableCell>
                  <div className="font-medium">New feature 2</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">org/repo-name2</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">Prod</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    Deploy
                  </Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs bg-amber-500" variant="secondary">
                    Pending
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
                <TableCell className="">
                  <a href="https://github.com/bilal-and-haffi/aiPersonalisedGifts/actions/runs/8683893867">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </TableCell>
              </TableRow>
              <TableRow className="bg-accent">
                <TableCell>
                  <div className="font-medium">New feature 3</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">org/repo-name3</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">Prod</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    Deploy
                  </Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs bg-red-400" variant="secondary">
                    Failed
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
                <TableCell className="">
                  <a href="https://github.com/bilal-and-haffi/aiPersonalisedGifts/actions/runs/8683893867">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </TableCell>
              </TableRow>
              <TableRow className="bg-accent">
                <TableCell>
                  <div className="font-medium">New feature 4</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">org/repo-name4</div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">Prod</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    Deploy
                  </Badge>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs bg-zinc-400" variant="secondary">
                    Cancelled
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">2023-06-23</TableCell>
                <TableCell className="">
                  <a href="https://github.com/bilal-and-haffi/aiPersonalisedGifts/actions/runs/8683893867">
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  )
}
