import { DeploymentWorkflow } from "../schemas/GithubApi";

export const makeStream = (
    generator: AsyncGenerator<DeploymentWorkflow[], void, unknown>,
) => {
    const encoder = new TextEncoder();
    return new ReadableStream<any>({
        // The pull method controls what happens
        // when data is added to a stream.
        async pull(controller) {
            const { value, done } = await generator.next();
            // done == true when the generator will yield
            // no more new values. If that's the case,
            // close the stream.
            if (done) {
                controller.close();
            } else {
                const markedData = encoder.encode(JSON.stringify(value) + "\n");
                controller.enqueue(markedData);
            }
        },
    });
};

export class StreamingResponse extends Response {
    constructor(res: ReadableStream<any>, init?: ResponseInit) {
        super(res as any, {
            ...init,
            status: 200,
            headers: {
                "Content-Type": "text/html; charset=utf-8",
                ...init?.headers,
            },
        });
    }
}
