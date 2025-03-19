import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { useDeskproAppClient, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { useSetTitle, useAsyncError, useRegisterElements } from "../../hooks";
import { setEntityService } from "../../services/deskpro";
import { useSearch } from "./hooks";
import { LinkProfile } from "../../components";
import type { FC } from "react";
import type { Maybe, Settings, UserData } from "../../types";
import type { Profile } from "../../services/klaviyo/types";

const LinkProfilePage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext<UserData, Settings>();
  const { asyncErrorHandler } = useAsyncError();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProfile, setSelectedProfile] = useState<Maybe<Profile>>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { isLoading, profiles } = useSearch(searchQuery);
  const dpUserId = context?.data?.user.id

  const isUsingOAuth = context?.settings.use_api_key !== true || context.settings.use_advanced_connect === false

  const onChangeSearch = useDebouncedCallback(setSearchQuery, 1000);

  const onNavigateToCreate = useCallback(() => navigate("/profiles/create"), [navigate]);

  const onCancel = useCallback(() => navigate("/home"), [navigate]);

  const onLinkProfile = useCallback(() => {
    if (!client || !dpUserId || !selectedProfile?.id) {
      return;
    }

    setIsSubmitting(true);

    return setEntityService(client, dpUserId, selectedProfile.id)
      .then(() => navigate("/home"))
      .catch(asyncErrorHandler)
      .finally(() => setIsSubmitting(false));
  }, [client, navigate, dpUserId, selectedProfile, asyncErrorHandler]);

  useSetTitle("Link Profile");

  useRegisterElements(({ registerElement }) => {
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });

    if (isUsingOAuth) {
      registerElement("menu", {
        type: "menu",
        items: [{
          title: "Logout",
          payload: { type: "logout" },
        }],
      })
    }
  });

  return (
    <LinkProfile
      profiles={profiles}
      onCancel={onCancel}
      isLoading={isLoading}
      isSubmitting={isSubmitting}
      onLinkProfile={onLinkProfile}
      onChangeSearch={onChangeSearch}
      selectedProfile={selectedProfile}
      onNavigateToCreate={onNavigateToCreate}
      onChangeSelectedProfile={setSelectedProfile}
    />
  );
};

export { LinkProfilePage };
