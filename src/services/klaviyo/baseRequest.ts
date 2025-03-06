import { isEmpty } from "lodash";
import { proxyFetch, adminGenericProxyFetch } from "@deskpro/app-sdk";
import { BASE_URL, placeholders, API_REVISION } from "../../constants";
import { getQueryParams, getRequestBody } from "../../utils";
import { KlaviyoError } from "./KlaviyoError";
import type { Request } from "../../types";

const baseRequest: Request = async (client, {
  url,
  rawUrl,
  data,
  method = "GET",
  queryParams = {},
  headers: customHeaders,
  settings,
}) => {
  const dpFetch = await (!settings ? proxyFetch : adminGenericProxyFetch)(client);
  const baseUrl = rawUrl ? rawUrl : `${BASE_URL}${url || ""}`;
  const params = getQueryParams(queryParams);
  const body = getRequestBody(data);

  const isUsingOAuth2 = (await client.getUserState<boolean>("isUsingOAuth"))[0]?.data


  const requestUrl = `${baseUrl}${isEmpty(params) ? "" : `?${params}`}`;
  const options: RequestInit = {
    method,
    body,
    headers: {
      "Authorization": isUsingOAuth2 ? `Bearer [user[${placeholders.OAUTH2_ACCESS_TOKEN_PATH}]]` : `Klaviyo-API-Key ${settings?.api_key || placeholders.API_KEY}`,
      "revision": API_REVISION,
      "Accept": "application/json",
      ...customHeaders,
    },
  };

  if (!isEmpty(data)) {
    options.headers = {
      "Content-Type": "application/json",
      ...options.headers,
    };
  }

  const res = await dpFetch(requestUrl, options);

  if (res.status < 200 || res.status > 399) {
    let errorData;

    try {
      errorData = await res.json();
    } catch (e) {
      errorData = {};
    }

    throw new KlaviyoError({
      status: res.status,
      data: errorData,
    });
  }

  let result;

  try {
    result = await res.json();
  } catch (e) {
    return {};
  }

  return result;
};

export { baseRequest };
