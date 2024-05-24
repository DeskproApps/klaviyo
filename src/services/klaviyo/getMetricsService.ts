import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Metric, MetricType } from "./types";

const getMetricsService = (
  client: IDeskproClient,
  type?: MetricType,
) => {
  return baseRequest<Metric[]>(client, {
    url: "/metrics",
    queryParams: {
      ...(!type ? {} : { filter: `equals(integration.name,"${type}")` }),
    },
  });
};

export { getMetricsService };
