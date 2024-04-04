import { toLower } from "lodash";
import type { Maybe } from "../types";
import type { List, Segment } from "../services/klaviyo/types";

const isSegment = (entity?: Maybe<List|Segment>): entity is Segment => {
  return toLower(entity?.type) === "segment";
};

export { isSegment };
