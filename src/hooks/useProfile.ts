import { useMemo } from "react";
import { get, find } from "lodash";
import { useQueryWithClient, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { getEntityListService } from "../services/deskpro";
import { getProfileService, getMetricsService, getEventsService } from "../services/klaviyo";
import { QueryKey } from "../query";
import { isEmailMetric, getCampaignsFromEvents } from "../utils";
import type { Maybe, UserContext } from "../types";
import type { Profile, List, Segment, PseudoCampaign } from "../services/klaviyo/types";

export type Result = {
  isLoading: boolean;
  profile: Maybe<Profile>;
  lists: (List|Segment)[];
  campaigns: PseudoCampaign[];
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
    [QueryKey.PROFILE, profileId as string],
    (client) => getProfileService(client, profileId),
    { enabled: Boolean(profileId) },
  );

  const metrics = useQueryWithClient(
    [QueryKey.METRICS, "Klaviyo"],
    (client) => getMetricsService(client, "Klaviyo"),
  );

  const emailMetricId = useMemo(() => {
    return  find(metrics.data?.data, isEmailMetric)?.id;
  }, [metrics.data]);

  const emailEvents = useQueryWithClient(
    [QueryKey.EVENTS, profileId as string],
    (client) => getEventsService(client, { profile_id: profileId, metric_id: emailMetricId }),
    { enabled: Boolean(profileId) && Boolean(emailMetricId) },
  );

  const campaigns = useMemo(() => getCampaignsFromEvents(emailEvents.data?.data), [emailEvents.data?.data]);

  return {
    isLoading: [profileIds, profile, emailEvents].some(({ isLoading, isFetching }) => isLoading || isFetching) && Boolean(profileId),
    profile: get(profile, ["data", "data"], null),
    lists: get(profile, ["data", "included"], []) || [],
    campaigns,
  };
};

export { useProfile };
