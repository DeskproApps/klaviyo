import type { components, paths } from "./schema";

export type Response<Data, Include = undefined> = Promise<{
  data: Data,
  links?: components["schemas"]["CollectionLinks"],
  included?: Include,
}>;

export type APIError = {
  id: string;
  status: number;
  code: string;
  title: string;
  detail: string;
  source?: object;
  meta?: object;
};

export type KlaviyoAPIError = {
  errors: APIError[];
};

export type Account = components["schemas"]["AccountResponseObjectResource"];

export type Profile = components["schemas"]["ProfileResponseObjectResource"];

export type List = components["schemas"]["ListResponseObjectResource"];

export type Segment = components["schemas"]["SegmentResponseObjectResource"];

export type ProfileInput = paths["/api/profiles/"]["post"]["requestBody"]["content"]["application/json"];

export type ProfileUpdateInput = paths["/api/profiles/{id}/"]["patch"]["requestBody"]["content"]["application/json"];

export type Metric = components["schemas"]["MetricResponseObjectResource"];

// @see https://developers.klaviyo.com/en/reference/metrics_api_overview#query-metrics
export type MetricType =
  | "Klaviyo" // Klaviyo
  | "API"     // API
  | string    // Shopify, PrestaShop, BigCommerce or other core integrations
;

export type Event = components["schemas"]["EventResponseObjectResource"];

export type PseudoCampaign = {
  campaignName: string;
  subject: string;
};
