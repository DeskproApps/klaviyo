import type { To, ParamKeyValuePair } from "react-router-dom";
import type { DropdownValueType } from "@deskpro/deskpro-ui";
import type { Context, IDeskproClient } from "@deskpro/app-sdk";
import type { Response } from "./services/klaviyo/types";

/** Common types */
export type Maybe<T> = T | undefined | null;

export type Dict<T> = Record<string, T>;

export type Option<Value = unknown> = Omit<DropdownValueType<Value>, "subItems">;

/** An ISO-8601 encoded UTC date time string. Example value: `""2019-09-07T15:50:00Z"` */
export type DateTime = string;

/** Request types */
export type ApiRequestMethod = "GET" | "POST" | "PATCH";

export type RequestParams = {
  url?: string;
  rawUrl?: string;
  method?: ApiRequestMethod;
  data?: Dict<string>|RequestInit["body"];
  headers?: Dict<string>;
  queryParams?: string|Dict<string>|ParamKeyValuePair[];
  settings?: Settings;
};

export type Request = <Data, Include = undefined>(
  client: IDeskproClient,
  params: RequestParams,
) => Response<Data, Include>;

/** Deskpro types */
export type Settings = {
  api_key?: string;
};

export type DPUser = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  titlePrefix: string;
  isDisabled: boolean;
  isAgent: boolean;
  isConfirmed: boolean;
  emails: string[];
  primaryEmail: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customFields: Dict<any>;
  language: string;
  locale: string;
};

export type UserData = {
  user: DPUser;
};

export type UserContext = Context<UserData, Maybe<Settings>>;

export type NavigateToChangePage = { type: "changePage", path: To };

export type UnlinkPayload = { type: "unlink" };

export type EventPayload =
  | NavigateToChangePage
  | UnlinkPayload
;
