import { useMemo } from "react";
import { get } from "lodash";
import { useQueryWithClient, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { getEntityListService } from "../services/deskpro";
import { getProfileService } from "../services/klaviyo";
import { QueryKey } from "../query";
import type { Maybe, UserContext } from "../types";
import type { Profile, List, Segment } from "../services/klaviyo/types";

export type Result = {
  isLoading: boolean;
  profile: Maybe<Profile>;
  lists: (List|Segment)[];
};

type UseProfile = () => Result;

const useProfile: UseProfile = () => {
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const dpUserId = useMemo(() => get(context, ["data", "user", "id"]), [context]);

  const profileIds = useQueryWithClient(
    [QueryKey.LINKED_PROFILE, dpUserId as string],
    (client) => getEntityListService(client, dpUserId as string),
    { enabled: Boolean(dpUserId) },
  );

  const profileId = useMemo(() => get(profileIds.data, [0]), [profileIds.data]);

  const profile = useQueryWithClient(
    [QueryKey.LINKED_PROFILE, dpUserId as string],
    (client) => getProfileService(client, profileId),
    { enabled: Boolean(profileId) },
  );

  return {
    isLoading: [profileIds, profile].some(({ isLoading, isFetching }) => isLoading || isFetching) && Boolean(profileId),
    profile: get(profile, ["data", "data"], null),
    lists: get(profile, ["data", "included"], []) || [],
  };
};

export { useProfile };
