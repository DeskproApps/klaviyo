import { useState, useCallback } from "react";
import { get } from "lodash";
import { useDeskproAppEvents, useDeskproAppClient } from "@deskpro/app-sdk";
import { getAccountsService, KlaviyoError } from "../../services/klaviyo";
import { getError } from "../../utils";
import { VerifySettings } from "../../components";
import type { FC } from "react";
import type { Maybe, Settings } from "../../types";
import type { Account } from "../../services/klaviyo/types";

const VerifySettingsPage: FC = () => {
  const { client } = useDeskproAppClient();
  const [accounts, setAccounts] = useState<Maybe<Account[]>>(null);
  const [settings, setSettings] = useState<Settings>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Maybe<string>>(null);
  const errorMessage = "Failed to connect to Klaviyo, settings seem to be invalid";

  const onVerifySettings = useCallback(() => {
    if (!client || !settings?.api_key) {
      return;
    }

    setIsLoading(true);
    setError("");
    setAccounts(null);

    return getAccountsService(client, settings)
      .then((res) => setAccounts(get(res, ["data"])))
      .catch((err: KlaviyoError) => setError(getError(err,errorMessage)))
      .finally(() => setIsLoading(false));
  }, [client, settings, errorMessage]);

  useDeskproAppEvents({
    onAdminSettingsChange: setSettings,
  }, [client]);

  return (
    <VerifySettings
      error={error}
      settings={settings}
      accounts={accounts}
      isLoading={isLoading}
      onVerifySettings={onVerifySettings}
    />
  );
};

export { VerifySettingsPage };
