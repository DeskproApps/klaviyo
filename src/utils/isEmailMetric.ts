import { get, toLower } from "lodash";
import type { Metric } from "../services/klaviyo/types";

const isEmailMetric = (metric: Metric): boolean => {
  return toLower(get(metric, ["attributes", "name"]) || undefined) === toLower("Bounced email");
};

export { isEmailMetric };
