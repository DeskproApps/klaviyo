import { get } from "lodash";
import { useQueryWithClient } from "@deskpro/app-sdk";
import { getProfilesService } from "../../services/klaviyo";
import { QueryKey } from "../../query";
import type { Profile } from "../../services/klaviyo/types";

type UseSearch = (q?: string) => {
  isLoading: boolean;
  profiles: Profile[];
};

const useSearch: UseSearch = (q) => {
  const profiles = useQueryWithClient(
    [QueryKey.SEARCH, q as string],
    (client) => getProfilesService(client, { email: q as string }),
    { enabled: Boolean(q) },
  );

  return {
    isLoading: [profiles].some(({ isLoading }) => isLoading) && Boolean(q),
    profiles: get(profiles, ["data", "data"] || []) || [],
  };
};

export { useSearch };
