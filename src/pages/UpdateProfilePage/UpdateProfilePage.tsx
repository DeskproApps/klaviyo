import { useMemo, useState, useCallback } from "react";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { useDeskproAppClient, LoadingSpinner } from "@deskpro/app-sdk";
import { useRegisterElements, useProfile, useSetTitle } from "../../hooks";
import { updateProfileService } from "../../services/klaviyo";
import { getError } from "../../utils";
import { getProfileValues } from "../../components/ProfileForm";
import { UpdateProfile } from "../../components";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { FormValidationSchema } from "../../components/ProfileForm";

const UpdateProfilePage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const [error, setError] = useState<Maybe<string|string[]>>(null);
  const { profile, isLoading } = useProfile();
  const profileId = useMemo(() => get(profile, ["id"]), [profile]);

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
