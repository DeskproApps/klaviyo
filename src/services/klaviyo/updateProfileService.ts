import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Profile, ProfileUpdateInput } from "./types";

const updateProfileService = (
  client: IDeskproClient,
  profileId: Profile["id"],
  data: ProfileUpdateInput
) => {
  data
  return baseRequest<Profile>(client, {
    url: `/profiles/${profileId}`,
    method: "PATCH",
    data: JSON.stringify(data),
  });
};

export { updateProfileService };
