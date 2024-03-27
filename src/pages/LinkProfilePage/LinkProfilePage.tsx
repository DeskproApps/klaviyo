import { useMemo, useState, useCallback } from "react";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { useDeskproAppClient, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { useSetTitle, useAsyncError, useRegisterElements } from "../../hooks";
import { setEntityService } from "../../services/deskpro";
import { useSearch } from "./hooks";
import { LinkProfile } from "../../components";
import type { FC } from "react";
import type { Maybe, UserContext } from "../../types";
import type { Profile } from "../../services/klaviyo/types";

const LinkProfilePage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const { asyncErrorHandler } = useAsyncError();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedProfile, setSelectedProfile] = useState<Maybe<Profile>>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { isLoading, profiles } = useSearch(searchQuery);
  const dpUserId = useMemo(() => get(context, ["data", "user", "id"]), [context]);

  const onChangeSearch = useDebouncedCallback(setSearchQuery, 1000);

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
    registerElement("refresh", { type: "refresh_button" });
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
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
      onChangeSelectedProfile={setSelectedProfile}
    />
  );
};

export { LinkProfilePage };
