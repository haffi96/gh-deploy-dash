/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/uJqiydZEhex
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { DashboardSummary } from "@/components/deployments/summary";
import DashboardTabs from "@/components/deployments/tabs";
import { listReposForUser } from "@/lib/services/GithubApi";
import { RepoSelectionCard } from "@/components/repoSelectionCard";

export async function DeploymentsDashboard() {
    const repoList = await listReposForUser();
    return (
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
                <DashboardSummary />
                <DashboardTabs />
            </div>
            <div>
                <RepoSelectionCard repoList={repoList} />
            </div>
        </main>
    );
}
