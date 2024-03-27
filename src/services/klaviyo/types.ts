import type { components } from "./schema";

export type Response<T> = Promise<{
  data: T,
  links?: components["schemas"]["CollectionLinks"],
}>;

export type APIError = {
  id: string;
  status: number;
  code: string;
  title: string;
  detail: string;
  source: object;
  meta: object;
};

export type KlaviyoAPIError = {
  errors: APIError[];
};

export type Account = components["schemas"]["AccountResponseObjectResource"];

export type Profile = components["schemas"]["ProfileResponseObjectResource"];
