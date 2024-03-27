import { isEmpty, isString } from "lodash";
import type { Maybe } from "../types";

type Params = {
  email: string|string[];
};

const getFilterString = (params?: Maybe<Params>) => {
  const { email } = params || {};
  let filter = "";

  if (email && !isEmpty(email)) {
    filter = `any(email,${isString(email) ? `["${email}"]` : JSON.stringify(email)})`;
  }

  return filter;
};

export { getFilterString };
