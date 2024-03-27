import { baseRequest } from "./baseRequest";
import { getFilterString } from "../../utils";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Maybe } from "../../types";
import type { Profile } from "./types";

type Params = {
  email: string|string[];
};

const getProfilesService = (
  client: IDeskproClient,
  params?: Maybe<Params>,
) => {
  const filter = getFilterString(params);

  return baseRequest<Profile[]>(client, {
    url: "/profiles",
    queryParams: {
      ...(!filter ? {} : { filter: getFilterString(params) }),
    },
  });
};

export { getProfilesService };
