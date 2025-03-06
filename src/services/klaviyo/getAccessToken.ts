import { IDeskproClient, proxyFetch } from "@deskpro/app-sdk";
interface GetAccessTokenParams {
    code: string,
    callbackURL: string
    code_verifier: string
}

export default async function getAccessToken(
    client: IDeskproClient,
    params: GetAccessTokenParams
) {
    try {

        const { code, callbackURL, code_verifier } = params
        const fetch = await proxyFetch(client);
        
        const response = await fetch(`https://a.klaviyo.com/oauth/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic __client_id + ':' + client_secret.base64__"
            },
            body: new URLSearchParams({
                grant_type: "authorization_code",
                client_id: "__client_id__",
                client_secret: "__client_secret__",
                code: code,
                code_verifier: code_verifier,
                redirect_uri: callbackURL,
            }).toString()
        });

        if (!response.ok) {
            throw new Error("Failed to fetch access token");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error("Error fetching access token");
    }
}