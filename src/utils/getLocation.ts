import { get, isEmpty } from "lodash";
import type { Profile } from "../services/klaviyo/types";

const getLocation = (
  location?: Profile["attributes"]["location"],
): string => {
  if (isEmpty(location)) {
    return "";
  }

  const locationArray = [
    get(location, ["address1"]),
    get(location, ["address2"]),
    get(location, ["city"]),
    get(location, ["region"]),
    get(location, ["country"]),
    get(location, ["zip"]),
  ].filter(Boolean);

  if (isEmpty(locationArray)) {
    return "";
  }
  return locationArray.join(", ");
};

export { getLocation };
