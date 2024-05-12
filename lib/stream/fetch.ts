export async function* streamingFetch(
    input: RequestInfo | URL,
    init?: RequestInit,
) {
    const response = await fetch(input, init);
    if (!response.ok || !response.body) {
        throw response.statusText;
    }
    const reader = response.body!.getReader();
    const decoder = new TextDecoder("utf-8");

    // for (;;) {
    //     const { done, value } = await reader.read();
    //     if (done) break;

    //     try {
    //         const chunkObj = JSON.parse(decoder.decode(value));
    //         yield chunkObj
    //     } catch (e: any) {
    //         console.warn(e.message);
    //     }
    // }
    let buffer = ``;
    for (;;) {
        // eslint-disable-next-line no-await-in-loop
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const boundary = buffer.lastIndexOf(`\n`);
        if (boundary !== -1) {
            const completeData = buffer.substring(0, boundary);
            buffer = buffer.substring(boundary + 1);

            let jsonObj;

            completeData.split(`\n`).forEach((chunk) => {
                if (chunk) {
                    try {
                        jsonObj = JSON.parse(chunk);
                        // Yay! Do what you want with your JSON here!
                    } catch (e) {
                        console.error(`Error parsing JSON:`, e);
                    }
                }
            });
            yield jsonObj;
        }
    }
}
