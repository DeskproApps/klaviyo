import { ErrorBlock } from "../../components/common";
import { getAccountsService } from "../../services/klaviyo";
import { getEntityListService } from "../../services/deskpro";
import { LoadingSpinner, useDeskproAppClient, useDeskproElements, useDeskproLatestAppContext, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { Settings, UserData } from "../../types";
import { tryToLinkAutomatically } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useState, type FC } from "react";

const LoadingAppPage: FC = () => {
  const { client } = useDeskproAppClient()
  const { context } = useDeskproLatestAppContext<UserData, Settings>()

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isFetchingAuth, setIsFetchingAuth] = useState<boolean>(true)

  const navigate = useNavigate();

  // Determine authentication method from settings
  const isUsingOAuth = context?.settings.use_api_key !== true || context.settings.use_advanced_connect === false
  const user = context?.data?.user

  useDeskproElements(({ registerElement, clearElements }) => {
    clearElements()
    registerElement("refresh", { type: "refresh_button" })
  });

  useInitialisedDeskproAppClient((client) => {
    client.setTitle("Klaviyo")

    if (!context || !context?.settings || !user) {
      return
    }

    // Store the authentication method in the user state
    client.setUserState("isUsingOAuth", isUsingOAuth)

    // Verify authentication status
    // If OAuth2 mode and the user is logged in the request would be make with their stored access token
    // If access token mode the request would be made with the access token provided in the app setup
    getAccountsService(client)
      .then((res) => {
        if (res.data) {
          setIsAuthenticated(true)
        }
      })
      .catch(() => { })
      .finally(() => {
        setIsFetchingAuth(false)
      })
  }, [context, context?.settings])

  if (!client || !user || isFetchingAuth) {
    return (<LoadingSpinner />)
  }



  if (isAuthenticated) {
    // Link the user or navigate to the link page
    tryToLinkAutomatically(client, user)
      .then(() => getEntityListService(client, user.id))
      .then((entityIds) => navigate(entityIds.length > 0 ? "/home" : "/profiles/link"))
      .catch(() => { navigate("/profiles/link") })
  } else {

    if (isUsingOAuth) {
      navigate("/login")
    } else {
      // Show error for invalid access tokens (expired or not present)
      return (
        <div style={{ width: "100%", padding: 12, boxSizing: "border-box" }} >
          <ErrorBlock text={"Invalid Access Token"} />
        </div>
      )
    }

  }

  return (
    <LoadingSpinner />
  );
};

export { LoadingAppPage };
