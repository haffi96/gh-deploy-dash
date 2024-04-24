import React from 'react'
import { CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { type RepoList } from '@/lib/schemas/GithubApi'
import { Checkbox } from "@/components/ui/checkbox"

export function RepoSelectList({ repoList }: { repoList: RepoList }) {
  return (
    <CardContent className="p-6 text-sm">
      <div className="flex flex-col items-center space-y-2">
        {
          repoList.map((repo, index) => (
            <>
              <div className="flex flex-row w-full space-x-3" key={index}>
                <Checkbox className="place-items-start" id={`repo-${index}`} />
                <label
                  htmlFor="terms"
                  className="text-sm place-items-end font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {repo.full_name}
                </label>
              </div>
              <Separator className="my-2" />
            </>
          ))
        }
      </div>
      <Separator className="my-2" />
    </CardContent>
  )
}
