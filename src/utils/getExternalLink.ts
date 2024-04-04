import { isEmpty } from "lodash";
import { URL } from "../constants";
import type { Maybe } from "../types";
import type { Profile, List, Segment } from "../services/klaviyo/types";

const getExternalLink = {
  profile: (profileId: Profile["id"]): Maybe<string> => {
    return isEmpty(profileId) ? null : `${URL}/profile/${profileId}`;
  },
  list: (listId?: List["id"]|Segment["id"]): string => {
    return isEmpty(listId) ? `${URL}/lists` : `${URL}/list/${listId}`;
  },
};

export { getExternalLink };
