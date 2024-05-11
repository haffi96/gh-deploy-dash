import React from "react";
import {
    BreadcrumbLink,
    BreadcrumbItem,
    BreadcrumbSeparator,
    BreadcrumbPage,
    BreadcrumbList,
    Breadcrumb,
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
    DropdownMenuTrigger,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenu,
} from "@/components/ui/dropdown-menu";
import { SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
    return (
        <div>
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <Breadcrumb className="hidden md:flex">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/">Dashboard</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbLink asChild>
                                <Link href="/deployments">Deployments</Link>
                            </BreadcrumbLink>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                            <BreadcrumbPage>Recent</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <div className="relative ml-auto flex-1 md:grow-0">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                        placeholder="Search..."
                        type="search"
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            className="overflow-hidden rounded-full"
                            size="icon"
                            variant="outline"
                        >
                            <Image
                                alt="Avatar"
                                className="overflow-hidden rounded-full"
                                height={36}
                                src="/placeholder.svg"
                                style={{
                                    aspectRatio: "36/36",
                                    objectFit: "cover",
                                }}
                                width={36}
                            />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Support</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </header>
        </div>
    );
}
