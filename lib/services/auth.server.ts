import { auth, clerkClient } from "@clerk/nextjs/server";

export async function getAccessToken() {
    const { userId } = auth();
    if (!userId) {
        throw new Error("User is not authenticated");
    }
    const clerkResponse = await clerkClient.users.getUserOauthAccessToken(
        userId,
        "oauth_github",
    );
    return clerkResponse.data[0].token;
}
