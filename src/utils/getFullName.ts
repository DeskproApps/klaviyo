import { get, size } from "lodash";
import type { Maybe } from "../types";
import type { Profile } from "../services/klaviyo/types";

const getFullName = (profile?: Maybe<Profile>): string => {
  const name = [
    get(profile, ["attributes", "first_name"]),
    get(profile, ["attributes", "last_name"]),
  ].filter(Boolean);

  return size(name) ? name.join(" ") : get(profile, ["attributes", "email"]) || "";
};

export { getFullName };
