import { size } from "lodash";
import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Profile, Metric, Event } from "./types";

type Params = {
  profile_id?: Profile["id"];
  metric_id?: Metric["id"];
};

const getEventsService = (
  client: IDeskproClient,
  params?: Params,
) => {
  const filter = [];

  if (params?.profile_id) {
    filter.push(`equals(profile_id,"${params.profile_id}")`);
  }

  if (params?.metric_id) {
    filter.push(`equals(metric_id,"${params.metric_id}")`);
  }

  return baseRequest<Event[]>(client, {
    url: "/events",
    queryParams: {
      ...(!filter ? {} : {
        filter: (size(filter) === 2) ? `and(${filter[0]},${filter[1]})` : filter[0],
      }),
    },
  });
};

export { getEventsService };
