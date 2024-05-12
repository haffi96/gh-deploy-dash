import { z } from "zod";

// Schema types
export type RepoDeployments = z.infer<typeof RepoDeploymentsSchema>;
export type DeploymentWorkflow = z.infer<typeof DeploymentWorkflowSchema>;
export type WorkflowChecks = z.infer<typeof WorkflowChecksSchema>;
export type RepoList = z.infer<typeof RepoListSchema>;

// Schemas
export const DeploymentWorkflowSchema = z.object({
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
    check_runs: z.array(
        z.object({
            name: z.string(),
            conclusion: z.string(),
            html_url: z.string(),
        }),
    ),
});

export const RepoListSchema = z.array(
    z.object({
        name: z.string(),
        full_name: z.string(),
        html_url: z.string(),
    }),
);


export const RepoDeploymentsSchema = z.array(z.object({
    url: z.string(),
    id: z.number(),
    node_id: z.string(),
    task: z.string(),
    original_environment: z.string(),
    environment: z.string(),
    description: z.string().nullable(),
    created_at: z.string(),
    updated_at: z.string(),
    statuses_url: z.string(),
    repository_url: z.string(),
    creator: z.object({
        login: z.string(),
        id: z.number(),
        avatar_url: z.string(),
        url: z.string(),
        type: z.string(),
        site_admin: z.boolean(),
    }),
    sha: z.string(),
    ref: z.string(),
    payload: z.object({}),
    transient_environment: z.boolean(),
    production_environment: z.boolean(),
    performed_via_github_app: z.object({
        id: z.number(),
        slug: z.string(),
        node_id: z.string(),
        owner: z.object({
            login: z.string(),
            id: z.number(),
            avatar_url: z.string(),
            url: z.string(),
            type: z.string(),
            site_admin: z.boolean(),
        }),
        name: z.string(),
        description: z.string(),
        external_url: z.string(),
        html_url: z.string(),
        created_at: z.string(),
        updated_at: z.string(),
        events: z.array(z.string()),
    }).nullable(),
}));