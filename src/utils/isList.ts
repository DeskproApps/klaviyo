import { toLower } from "lodash";
import type { Maybe } from "../types";
import type { List, Segment } from "../services/klaviyo/types";

const isList = (entity?: Maybe<List|Segment>): entity is List => {
  return toLower(entity?.type) === "list";
};

export { isList };
