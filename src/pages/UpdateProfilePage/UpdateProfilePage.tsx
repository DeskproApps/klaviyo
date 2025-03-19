import { getError } from "../../utils";
import { getProfileValues } from "../../components/ProfileForm";
import { UpdateProfile } from "../../components";
import { updateProfileService } from "../../services/klaviyo";
import { useDeskproAppClient, LoadingSpinner, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useRegisterElements, useProfile, useSetTitle } from "../../hooks";
import type { FC } from "react";
import type { FormValidationSchema } from "../../components/ProfileForm";
import type { Maybe, Settings } from "../../types";

const UpdateProfilePage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const {context}= useDeskproLatestAppContext<unknown, Settings>()
  const [error, setError] = useState<Maybe<string|string[]>>(null);
  const { profile, isLoading } = useProfile();
  const profileId = useMemo(() => profile?.id, [profile]);
  const isUsingOAuth = context?.settings.use_api_key !== true || context.settings.use_advanced_connect === false

  const onCancel = useCallback(() => navigate(`/home`), [navigate]);

  const onSubmit = useCallback((data: FormValidationSchema) => {
    if (!client || !profileId) {
      return Promise.resolve();
    }

    setError(null);

    return updateProfileService(client, profileId, getProfileValues(data, profileId))
      .then(() => navigate("/home"))
      .catch((err) => setError(getError(err)));
  }, [client, profileId, navigate]);

  useSetTitle("Klaviyo");

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

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <UpdateProfile
      error={error}
      profile={profile}
      onCancel={onCancel}
      onSubmit={onSubmit}
    />
  );
};

export { UpdateProfilePage };
