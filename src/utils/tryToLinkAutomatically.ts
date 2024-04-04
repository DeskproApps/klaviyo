import { get, uniq, concat, filter, isEmpty } from "lodash";
import { getEntityListService, setEntityService } from "../services/deskpro";
import { getProfilesService } from "../services/klaviyo";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { UserData } from "../types";

const tryToLinkAutomatically = async (
  client: IDeskproClient,
  dpUser: UserData["user"],
) => {
  try {
    const entityIds = await getEntityListService(client, dpUser.id);

    if (!isEmpty(entityIds)) {
      return;
    }

    const emails = filter(
      uniq(concat(get(dpUser, ["primaryEmail"]), get(dpUser, ["emails"]))),
      Boolean,
    );

    if (isEmpty(emails)) {
      return;
    }

    const profiles = await getProfilesService(client, { email: emails });
    const profileId = get(profiles, ["data", 0, "id"]);

    if (!profileId) {
      return;
    }

    return setEntityService(client, dpUser.id, profileId);
  } catch (e) {
    return;
  }
};

export { tryToLinkAutomatically };
