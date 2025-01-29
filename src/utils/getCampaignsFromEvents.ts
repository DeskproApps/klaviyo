import { map, isEmpty } from "lodash";
import type { Event } from "../services/klaviyo/types";

const getCampaignsFromEvents = (events?: Event[]) => {
  if (!Array.isArray(events) || isEmpty(events)) {
    return [];
  }

  return map(events, (event) => ({
    campaignName: String(event.attributes.event_properties?.["Campaign Name"] ?? ""),
    subject: String(event.attributes.event_properties?.["Subject"] ?? ""),
  }));
};

export { getCampaignsFromEvents };
