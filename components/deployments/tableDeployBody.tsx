'use client'

import React from 'react'
import { RepoDeploy } from './tabContent'
import { TableRow, TableCell, TableBody } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../ui/collapsible'




interface DeployRowProps {
  deployData: RepoDeploy[];
}

export function TableDeployRow(props: DeployRowProps) {
  const { deployData } = props;
  return (
    <TableBody>
      {
        deployData &&
        deployData.map((parsedDeployment, index) => (
          <Collapsible key={index} asChild>
            <>
              <CollapsibleTrigger asChild>
                <TableRow key={index} className="bg-accent">
                  <TableCell>
                    <div className="font-medium">{parsedDeployment.workflow_run.title}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">{parsedDeployment.workflow_run.workflow_name}</div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">{parsedDeployment.environment}</TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs" variant="secondary">
                      {parsedDeployment.workflow_run.repository.name}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <Badge className="text-xs bg-green-400" variant="secondary">
                      {parsedDeployment.workflow_run.conclusion}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{parsedDeployment.workflow_run.created_at.toLocaleString('en-GB')}</TableCell>
                  <TableCell className="">
                    <a href={parsedDeployment.workflow_run.html_url}>
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </TableCell>
                </TableRow>
              </CollapsibleTrigger>
              <CollapsibleContent asChild>
                <TableRow key={index}>
                  <TableCell className="font-medium">----</TableCell>
                  <TableCell>----</TableCell>
                  <TableCell>----</TableCell>
                  <TableCell className="text-right">----</TableCell>
                </TableRow>
              </CollapsibleContent>
            </>
          </Collapsible>
        ))
      }
    </TableBody >
  )
}
