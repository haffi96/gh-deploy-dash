import { z } from "zod";

// Schema types
export type RepoDeploy = z.infer<typeof RepoDeploymentsSchema>;
export type WorkflowChecks = z.infer<typeof WorkflowChecksSchema>;
export type RepoList = z.infer<typeof RepoListSchema>;


// Schemas
export const RepoDeploymentsSchema = z.object({
  head_sha: z.string(),
  environment: z.string(),
  workflow_run: z.object({
    title: z.string(),
    workflow_name: z.string(),
    workflow_id: z.number(),
    run_number: z.number(),
    event: z.string(),
    status: z.string(),
    conclusion: z.string(),
    created_at: z.date(),
    check_suite_id: z.number(),
    html_url: z.string(),
    actor: z.object({
      login: z.string(),
      avatar_url: z.string(),
      html_url: z.string(),
    }),
    repository: z.object({
      name: z.string(),
      full_name: z.string(),
      html_url: z.string(),
      owner: z.object({
        login: z.string().optional(),
        avatar_url: z.string(),
        html_url: z.string(),
      }),
    }),
  }),
});

export const WorkflowChecksSchema = z.object({
  total_count: z.number(),
  check_runs: z.array(z.object({
    name: z.string(),
    conclusion: z.string(),
    html_url: z.string(),
  })),
});


export const RepoListSchema = z.array(z.object({
  name: z.string(),
  full_name: z.string(),
  html_url: z.string(),
}));