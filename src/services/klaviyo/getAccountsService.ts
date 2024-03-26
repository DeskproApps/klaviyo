import { baseRequest } from "./baseRequest";
import type { IDeskproClient } from "@deskpro/app-sdk";
import type { Settings } from "../../types";
import type { Account } from "./types";

const getAccountsService = (
  client: IDeskproClient,
  settings: Settings,
) => {
  return baseRequest<Account[]>(client, {
    url: "/accounts",
    settings,
  });
};

export { getAccountsService };
