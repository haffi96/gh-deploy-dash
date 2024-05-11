"use client";

import { z } from "zod";
import { RepoList } from "@/lib/schemas/GithubApi";

export const UserSelectedRepos = z.array(z.string());

export function GetUserSelectedRepos() {
    const localData = localStorage.getItem("UserSelectedRepos");

    if (!localData) {
        return [];
    }

    return UserSelectedRepos.parse(JSON.parse(localData));
}

export function SaveReposSelection({ repos }: { repos: RepoList }) {
    let dataToAdd = [];
    for (const repo of repos) {
        dataToAdd.push(repo.full_name);
    }
    const parsedDataToAdd = UserSelectedRepos.parse(dataToAdd);
    localStorage.setItem("UserSelectedRepos", JSON.stringify(parsedDataToAdd));
}
