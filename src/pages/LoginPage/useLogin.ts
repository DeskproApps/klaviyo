import { createSearchParams, useNavigate } from "react-router-dom";
import { generateCodes, tryToLinkAutomatically } from "../../utils";
import { getAccountsService } from "../../services/klaviyo";
import { getEntityListService } from "../../services/deskpro";
import { IOAuth2, OAuth2Result, useDeskproLatestAppContext, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { placeholders } from "../../constants";
import { Settings, UserData } from "../../types";
import { useCallback, useState } from "react";
import getAccessToken from "../../services/klaviyo/getAccessToken";

interface UseLogin {
    onSignIn: () => void,
    authUrl: string | null,
    error: null | string,
    isLoading: boolean,
};

export default function useLogin(): UseLogin {
    const [authUrl, setAuthUrl] = useState<string | null>(null)
    const [error, setError] = useState<null | string>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isPolling, setIsPolling] = useState(false)
    const [oauth2Context, setOAuth2Context] = useState<IOAuth2 | null>(null)
    const [authCodes, setAuthCodes] = useState<{ codeChallenge: string, codeVerifier: string } | null>(null)
    const navigate = useNavigate()

    const { context } = useDeskproLatestAppContext<UserData, Settings>()

    const user = context?.data?.user


    useInitialisedDeskproAppClient(async (client) => {
        if (context?.settings.use_deskpro_saas === undefined || !user) {
            // Make sure settings have loaded.
            return
        }

        // Ensure they aren't using access tokens
        if (context.settings.use_api_key === true) {
            setError("Enable OAuth to access this page");
            return
        }

        if (!authCodes) {
            const codes = await generateCodes()
            setAuthCodes(codes)
            return
        }

        const mode = context?.settings.use_deskpro_saas ? 'global' : 'local';

        const clientId = context?.settings.client_id;
        if (mode === 'local' && typeof clientId !== 'string') {
            // Local mode requires a clientId.
            setError("A client ID is required");
            return
        }

        const oauth2Response = mode === "local" ?
            await client.startOauth2Local(
                ({ state, callbackUrl }) => {
                    return `https://www.klaviyo.com/oauth/authorize?${createSearchParams([
                        ["response_type", "code"],
                        ["client_id", clientId ?? ""],
                        ["redirect_uri", callbackUrl],
                        ["scope", "accounts:read events:read lists:read metrics:read profiles:read profiles:write segments:read"],
                        ["code_challenge_method", "S256"],
                        ["code_challenge", authCodes.codeChallenge],
                        ["state", state],
                    ])}`;
                },
                /\bcode=(?<code>[^&#]+)/,
                async (code: string): Promise<OAuth2Result> => {
                    // Extract the callback URL from the authorization URL
                    const url = new URL(oauth2Response.authorizationUrl);
                    const redirectUri = url.searchParams.get("redirect_uri");

                    if (!redirectUri) {
                        throw new Error("Failed to get callback URL");
                    }

                    const data = await getAccessToken(client, { code, callbackURL: redirectUri, code_verifier: authCodes.codeVerifier });

                    return { data }
                }
            )
            // Global Proxy Service
            : await client.startOauth2Global("TW2mwcHyQwCmkrzNjgdMAQ");

        setAuthUrl(oauth2Response.authorizationUrl)
        setOAuth2Context(oauth2Response)

    }, [setAuthUrl, context?.settings.use_deskpro_saas, authCodes])

    useInitialisedDeskproAppClient((client) => {
        if (!user || !oauth2Context) {
            return
        }

        const startPolling = async () => {
            try {
                const result = await oauth2Context.poll()

                await client.setUserState(placeholders.OAUTH2_ACCESS_TOKEN_PATH, result.data.access_token, { backend: true })

                if (result.data.refresh_token) {
                    await client.setUserState(placeholders.OAUTH2_REFRESH_TOKEN_PATH, result.data.refresh_token, { backend: true })
                }

                try {
                    await getAccountsService(client)
                } catch {
                    throw new Error("Error authenticating user")
                }

                tryToLinkAutomatically(client, user)
                    .then(() => getEntityListService(client, user.id))
                    .then((entityIds) => navigate(entityIds.length > 0 ? "/home" : "/profiles/link"))
                    .catch(() => { navigate("/profiles/link") })
            } catch (error) {
                setError(error instanceof Error ? error.message : 'Unknown error');
            } finally {
                setIsLoading(false)
                setIsPolling(false)
            }
        }

        if (isPolling) {
            startPolling()
        }
    }, [isPolling, user, oauth2Context, navigate])


    const onSignIn = useCallback(() => {
        setIsLoading(true);
        setIsPolling(true);
        window.open(authUrl ?? "", '_blank');
    }, [setIsLoading, authUrl]);


    return { authUrl, onSignIn, error, isLoading }

}