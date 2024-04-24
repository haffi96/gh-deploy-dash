import { RepoDeploy, RepoDeploymentsSchema, RepoListSchema } from "@/lib/schemas/GithubApi";

const OWNER = "haffi96";
const REPO = "keyify";

export async function listDeployments() {
  const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/deployments?per_page=3`, {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: `Bearer ${process.env.GH_SECRET}`,
    }
  });
  const deployments = await response.json();
  return deployments;
}

export async function getWorkflowForRef(ref: string) {
  const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/actions/runs?head_sha=${ref}`, {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: `Bearer ${process.env.GH_SECRET}`,
    }
  });
  const workflows = await response.json();
  return workflows.workflow_runs[0]; // The total_count should be one
}

export async function getWorkflowChecksForRef(head_sha: string) {
  const response = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/commits/${head_sha}/check-runs`, {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: `Bearer ${process.env.GH_SECRET}`,
    }
  });
  const checks = await response.json();
  return checks;
}


export async function getDeploymentsWorkflows() {
  const deployments = await listDeployments();
  const repoDeployments = new Map<number, RepoDeploy>();

  for (const deployment of deployments) {
    const { sha, environment } = deployment;
    const workflow = await getWorkflowForRef(deployment.sha);
    const parsedDate = new Date(workflow.created_at)
    const repoDeployment = RepoDeploymentsSchema.parse({
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

    repoDeployments.set(deployment.id, repoDeployment);
  }

  const mappedArray = Array.from(repoDeployments.values());
  mappedArray.sort((a, b) => {
    return new Date(b.workflow_run.created_at).getTime() - new Date(a.workflow_run.created_at).getTime();
  })
  return mappedArray;
}


export async function listReposForUser() {
  const response = await fetch(`https://api.github.com/users/${OWNER}/repos?sort=pushed&per_page=10`, {
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
      Authorization: `Bearer ${process.env.GH_SECRET}`,
    }
  });
  const repos = await response.json();

  return RepoListSchema.parse(repos);
}