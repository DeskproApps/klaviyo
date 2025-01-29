import { useMemo, useState, useCallback } from "react";
import { get } from "lodash";
import { useNavigate } from "react-router-dom";
import { useDeskproAppClient, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { useSetTitle, useRegisterElements } from "../../hooks";
import { setEntityService } from "../../services/deskpro";
import { createProfileService } from "../../services/klaviyo";
import { getError } from "../../utils";
import { getProfileValues } from "../../components/ProfileForm";
import { CreateProfile } from "../../components";
import type { FC } from "react";
import type { Maybe, UserContext } from "../../types";
import type { Profile } from "../../services/klaviyo/types";
import type { FormValidationSchema } from "../../components/ProfileForm";

const CreateProfilePage: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const [error, setError] = useState<Maybe<string|string[]>>(null);
  const dpUserId = useMemo(() => get(context, ["data", "user", "id"]), [context]);
  const profile: Maybe<Profile> = useMemo(() => {
    const email = get(context, ["data", "user", "primaryEmail"])
      || get(context, ["data", "user", "emails", 0]);

    return !email ? null : {
      attributes: {
        email,
        first_name: get(context, ["data", "user", "firstName"]) || "",
        last_name: get(context, ["data", "user", "lastName"]) || "",
      }
    } as Profile;
  }, [context]);

  const onNavigateToLink = useCallback(() => navigate("/profiles/link"), [navigate]);

  const onCancel = useCallback(() => navigate(`/home`), [navigate]);

  const onSubmit = useCallback((data: FormValidationSchema) => {
    if (!client) {
      return Promise.resolve();
    }

    setError(null);

    return createProfileService(client, getProfileValues(data))
      .then((res) => {
        const profileId = get(res, ["data", "id"]);

        return !profileId
          ? Promise.resolve()
          : setEntityService(client, dpUserId?? "", profileId);
      })
      .then(() => navigate("/home"))
      .catch((err) => setError(getError(err)));
  }, [client, navigate, dpUserId]);

  useSetTitle("Link Profile");

  useRegisterElements(({ registerElement }) => {
    registerElement("home", {
      type: "home_button",
      payload: { type: "changePage", path: "/home" },
    });
  });

  return (
    <CreateProfile
      error={error}
      profile={profile}
      onCancel={onCancel}
      onSubmit={onSubmit}
      onNavigateToLink={onNavigateToLink}
    />
  );
};

export { CreateProfilePage };
