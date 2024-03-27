import { useMemo, useState, useCallback } from "react";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { useDeskproAppClient, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { useSetTitle, useAsyncError, useRegisterElements } from "../../hooks";
import { LinkProfile } from "../../components";
import type { FC } from "react";
import type { Maybe, UserContext } from "../../types";
import type { Profile } from "../../services/klaviyo/types";

const LinkProfilePage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const { asyncErrorHandler } = useAsyncError();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchQuery, setSearchQuery] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedProfile, setSelectedProfile] = useState<Maybe<Profile>>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const dpUserId = useMemo(() => get(context, ["data", "user", "id"]), [context]);

  const onChangeSearch = useCallback((search: string) => {
    setSearchQuery(search);
  }, []);

  const onCancel = useCallback(() => navigate("/home"), [navigate]);

  const onLinkProfile = useCallback(() => {
    if (!client || !dpUserId || !selectedProfile) {
      return;
    }

    setIsSubmitting(true);

    return Promise.resolve()
      .catch(asyncErrorHandler);
  }, [client, dpUserId, selectedProfile, asyncErrorHandler]);

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
      profiles={[]}
      onCancel={onCancel}
      isSubmitting={isSubmitting}
      onLinkProfile={onLinkProfile}
      onChangeSearch={onChangeSearch}
      selectedProfile={selectedProfile}
    />
  );
};

export { LinkProfilePage };
