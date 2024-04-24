import React from 'react'
import { TabsTrigger, TabsList, Tabs } from "@/components/ui/tabs"
import { DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuContent, DropdownMenu, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu"
import { FileIcon, ListFilterIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TabContent } from './tabContent'


export default function DashboardTabs() {
  return (
    <Tabs defaultValue="week">
      <div className="flex items-center">
        <TabsList>
          <TabsTrigger value="week">Today</TabsTrigger>
          <TabsTrigger value="month">Week</TabsTrigger>
          <TabsTrigger value="year">Month</TabsTrigger>
        </TabsList>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-7 gap-1 text-sm" size="sm" variant="outline">
                <ListFilterIcon className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>Fulfilled</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Declined</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Refunded</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button className="h-7 gap-1 text-sm" size="sm" variant="outline">
            <FileIcon className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Export</span>
          </Button>
        </div>
      </div>
      <TabContent />
    </Tabs>
  )
}
