import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Profile, List, Segment } from "./types";

const getProfileService = (
  client: IDeskproClient,
  profileId: Profile["id"],
) => {
  return baseRequest<Profile, (List|Segment)[]>(client, {
    url: `/profiles/${profileId}`,
    queryParams: {
      include: "lists,segments",
      "fields[list]": "name,created,updated,opt_in_process",
      "fields[segment]": "name,created,updated,is_active,is_processing,is_starred",
    },
  });
};

export { getProfileService };
