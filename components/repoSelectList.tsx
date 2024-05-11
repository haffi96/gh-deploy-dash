"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { RepoList } from "@/lib/schemas/GithubApi";
import { SaveReposSelection, GetUserSelectedRepos } from "@/lib/storage/local";
import { useEffect, useState } from "react";

const FormSchema = z.object({
    repos: z.array(z.string()).refine((value) => value.some((item) => item), {
        message: "You have to select at least one repo.",
    }),
});

export function RepoSelectList({ repoList }: { repoList: RepoList }) {
    const { toast } = useToast();
    const [selectedRepoList, setSelectedRepoList] = useState<string[]>([]);

    useEffect(() => {
        const selectedRepoList = GetUserSelectedRepos();
        setSelectedRepoList(selectedRepoList);
    }, []);

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        values: {
            repos: selectedRepoList,
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        });
        const filteredRepoList = repoList.filter((item) =>
            data.repos.includes(item.full_name),
        );
        SaveReposSelection({ repos: filteredRepoList });
        window.location.reload();
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 p-6"
            >
                <FormField
                    control={form.control}
                    name="repos"
                    render={() => (
                        <FormItem>
                            <div className="mb-4">
                                <FormLabel className="text-base">
                                    Repos
                                </FormLabel>
                                <FormDescription>
                                    Select the repositories you want to filter
                                    by.
                                </FormDescription>
                            </div>
                            {repoList
                                .sort((a, b) => {
                                    const aChecked = form
                                        .getValues("repos")
                                        ?.includes(a.full_name);
                                    const bChecked = form
                                        .getValues("repos")
                                        ?.includes(b.full_name);
                                    if (aChecked && !bChecked) {
                                        return -1;
                                    } else if (!aChecked && bChecked) {
                                        return 1;
                                    } else {
                                        return 0;
                                    }
                                })
                                .map((item) => (
                                    <FormField
                                        key={item.full_name}
                                        control={form.control}
                                        name="repos"
                                        render={({ field }) => {
                                            return (
                                                <FormItem
                                                    key={item.full_name}
                                                    className="flex flex-row items-start space-x-3 space-y-0"
                                                >
                                                    <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(
                                                                item.full_name,
                                                            )}
                                                            onCheckedChange={(
                                                                checked,
                                                            ) => {
                                                                return checked
                                                                    ? field.onChange(
                                                                          [
                                                                              ...field.value,
                                                                              item.full_name,
                                                                          ],
                                                                      )
                                                                    : field.onChange(
                                                                          field.value?.filter(
                                                                              (
                                                                                  value,
                                                                              ) =>
                                                                                  value !==
                                                                                  item.full_name,
                                                                          ),
                                                                      );
                                                            }}
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">
                                                        {item.full_name}
                                                    </FormLabel>
                                                </FormItem>
                                            );
                                        }}
                                    />
                                ))}
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="space-x-1">
                    <Button type="submit">Submit</Button>
                    <Button type="reset">Clear</Button>
                </div>
            </form>
        </Form>
    );
}
