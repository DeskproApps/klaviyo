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
