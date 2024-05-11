import React from "react";
import { RepoList } from "@/lib/schemas/GithubApi";
import {
    CardTitle,
    CardDescription,
    CardHeader,
    CardFooter,
    Card,
} from "@/components/ui/card";
import {
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    MoreVerticalIcon,
} from "lucide-react";
import { RepoSelectList } from "@/components/repoSelectList";
import {
    PaginationItem,
    PaginationContent,
    Pagination,
} from "@/components/ui/pagination";

export function RepoSelectionCard({ repoList }: { repoList: RepoList }) {
    return (
        <Card className="fixed overflow-hidden" x-chunk="dashboard-05-chunk-4">
            <CardHeader className="flex flex-row items-start bg-muted/50">
                <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                        Repositories
                    </CardTitle>
                    <CardDescription>
                        Choose repositories to include
                    </CardDescription>
                </div>
                <div className="ml-auto flex items-center gap-1">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                className="h-8 w-8"
                                size="icon"
                                variant="outline"
                            >
                                <MoreVerticalIcon className="h-3.5 w-3.5" />
                                <span className="sr-only">More</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Add more</DropdownMenuItem>
                            <DropdownMenuItem>Export</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Trash</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>

            <RepoSelectList repoList={repoList} />

            <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                <div className="text-xs text-muted-foreground">
                    Updated
                    <time dateTime="2023-11-23">November 23, 2023</time>
                </div>
                <Pagination className="ml-auto mr-0 w-auto">
                    <PaginationContent>
                        <PaginationItem>
                            <Button
                                className="h-6 w-6"
                                size="icon"
                                variant="outline"
                            >
                                <ChevronLeftIcon className="h-3.5 w-3.5" />
                                <span className="sr-only">Previous Order</span>
                            </Button>
                        </PaginationItem>
                        <PaginationItem>
                            <Button
                                className="h-6 w-6"
                                size="icon"
                                variant="outline"
                            >
                                <ChevronRightIcon className="h-3.5 w-3.5" />
                                <span className="sr-only">Next Order</span>
                            </Button>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </CardFooter>
        </Card>
    );
}
