import {
    DeploymentWorkflow,
    DeploymentWorkflowSchema,
    RepoDeployments,
    RepoDeploymentsSchema,
    RepoListSchema,
} from "@/lib/schemas/GithubApi";
import { getAccessToken } from "./auth.server";

const GITHUB_BOTS_TO_SKIP = ["github-advanced-security[bot]", "Bot"];
const DEFAULT_API_VERSION = "2022-11-28";

export async function getDeploymentsForRepo({
    owner,
    repoName,
}: {
    owner: string;
    repoName: string;
}) {
    const access_token = await getAccessToken();
    const response = await fetch(
        `https://api.github.com/repos/${owner}/${repoName}/deployments?per_page=10`,
        {
            headers: {
                "X-GitHub-Api-Version": DEFAULT_API_VERSION,
                Authorization: `Bearer ${access_token}`,
            },
        },
    );
    const respJson = await response.json();
    return RepoDeploymentsSchema.parse(respJson);
}

export async function listDeployments(repos: string[]) {
    let allDeployments = [];
    for (const repo of repos) {
        const repoOwner = repo.split("/")[0];
        const repoName = repo.split("/")[1];
        const repoDeployments = await getDeploymentsForRepo({
            owner: repoOwner,
            repoName: repoName,
        });
        allDeployments.push(...repoDeployments);
    }

    allDeployments.sort((a, b) => {
        return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
    });

    return allDeployments;
}

export async function getWorkflowForRef(
    ref: string,
    owner: string,
    repoName: string,
) {
    const access_token = await getAccessToken();
    const response = await fetch(
        `https://api.github.com/repos/${owner}/${repoName}/actions/runs?head_sha=${ref}&event=push`,
        {
            headers: {
                "X-GitHub-Api-Version": DEFAULT_API_VERSION,
                Authorization: `Bearer ${access_token}`,
            },
        },
    );
    const workflows = await response.json();
    return workflows.workflow_runs[0]; // The total_count should be one
}

export async function getWorkflowChecksForRef(
    head_sha: string,
    owner: string,
    repoName: string,
) {
    const access_token = await getAccessToken();
    const response = await fetch(
        `https://api.github.com/repos/${owner}/${repoName}/commits/${head_sha}/check-runs`,
        {
            headers: {
                "X-GitHub-Api-Version": DEFAULT_API_VERSION,
                Authorization: `Bearer ${access_token}`,
            },
        },
    );
    const checks = await response.json();
    return checks;
}

export async function listReposForUser() {
    const access_token = await getAccessToken();
    const response = await fetch(
        `https://api.github.com/user/repos?sort=pushed&per_page=30`,
        {
            headers: {
                "X-GitHub-Api-Version": DEFAULT_API_VERSION,
                Authorization: `Bearer ${access_token}`,
            },
        },
    );
    const repos = await response.json();
    return RepoListSchema.parse(repos);
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function* fetchWorkflowsGenerator(
    deployments: RepoDeployments,
): AsyncGenerator<DeploymentWorkflow[], void, unknown> {
    let deploymentWorkflows = [];
    for (const deployment of deployments) {
        if (GITHUB_BOTS_TO_SKIP.includes(deployment.creator.type)) {
            continue;
        }

        const { sha, environment, repository_url, creator } = deployment;
        const repoName = repository_url.split("/").slice(-1)[0];
        const workflow = await getWorkflowForRef(
            deployment.sha,
            creator.login,
            repoName,
        );

        // workflow can be null if there is no `push` event workflow for ref
        // Currently filtering on push events only
        if (!workflow || GITHUB_BOTS_TO_SKIP.includes(workflow.actor.login)) {
            continue;
        }

        const parsedDate = new Date(workflow.created_at);
        const deploymentWorkflow = DeploymentWorkflowSchema.parse({
            head_sha: sha,
            environment,
            workflow_run: {
                title: workflow.display_title,
                workflow_name: workflow.name,
                workflow_id: workflow.workflow_id,
                run_number: workflow.run_number,
                event: workflow.event,
                status: workflow.status,
                conclusion: workflow.conclusion,
                created_at: parsedDate,
                check_suite_id: workflow.check_suite_id,
                html_url: workflow.html_url,
                actor: {
                    login: workflow.actor.login,
                    avatar_url: workflow.actor.avatar_url,
                    html_url: workflow.actor.html_url,
                },
                repository: {
                    name: workflow.repository.name,
                    full_name: workflow.repository.full_name,
                    html_url: workflow.repository.html_url,
                    owner: {
                        login: workflow.repository.owner.login,
                        avatar_url: workflow.repository.owner.avatar_url,
                        html_url: workflow.repository.owner.html_url,
                    },
                },
            },
        });
        deploymentWorkflows.push(deploymentWorkflow);
        yield deploymentWorkflows;
    }
}
