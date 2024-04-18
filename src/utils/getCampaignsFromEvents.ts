import { map, get, isEmpty } from "lodash";
import type { Event } from "../services/klaviyo/types";

const getCampaignsFromEvents = (events?: Event[]) => {
  if (!Array.isArray(events) || isEmpty(events)) {
    return [];
  }

  return map(events, (event) => ({
    campaignName: get(event, ["attributes", "event_properties", "Campaign Name"]),
    subject: get(event, ["attributes", "event_properties", "Subject"]),
  }));
};

export { getCampaignsFromEvents };
