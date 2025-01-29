import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Profile, ProfileInput } from "./types";

const createProfileService = (
  client: IDeskproClient,
  data: ProfileInput,
) => {
  return baseRequest<Profile>(client, {
    url: `/profiles`,
    method: "POST",
    data: JSON.stringify(data),
  });
};

export { createProfileService };
