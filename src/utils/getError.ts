import { get } from "lodash";
import { KlaviyoError } from "../services/klaviyo";
import { DEFAULT_ERROR } from "../constants";
import type { Maybe } from "../types";

const getError = (
  error: Maybe<KlaviyoError>,
  defaultError: string = DEFAULT_ERROR,
) => {
  return get(error, ["data", "errors", 0, "detail"])
    || get(error, ["data", "errors", 0, "title"])
    || defaultError;
};

export { getError };
