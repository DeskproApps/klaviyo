import { useMemo } from "react";
import { get, size } from "lodash";
import { useNavigate } from "react-router-dom";
import { useDeskproLatestAppContext, useInitialisedDeskproAppClient } from "@deskpro/app-sdk";
import { getEntityListService } from "../../services/deskpro";
import { getAccountsService } from "../../services/klaviyo";
import { useAsyncError } from "../../hooks";
import type { UserContext } from "../../types";

type UseLoadingApp = () => void;

const useLoadingApp: UseLoadingApp = () => {
  const navigate = useNavigate();
  const { context } = useDeskproLatestAppContext() as { context: UserContext };
  const { asyncErrorHandler } = useAsyncError();
  const dpUserId = useMemo(() => get(context, ["data", "user", "id"]), [context]);

  useInitialisedDeskproAppClient((client) => {
    if (!dpUserId) {
      return;
    }

    getAccountsService(client)
      .then(() => getEntityListService(client, dpUserId))
      .then((entityIds) => navigate(size(entityIds) ? "/home" : "/profiles/link"))
      .catch(asyncErrorHandler)
  }, [dpUserId]);
};

export { useLoadingApp };
