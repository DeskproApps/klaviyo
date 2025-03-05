import { get } from "lodash";
import { Stack } from "@deskpro/deskpro-ui";
import { nbsp } from "../../constants";
import { Button, Invalid, Secondary } from "../common";
import type { FC } from "react";
import type { Maybe, PreInstalledSettings } from "../../types";
import type { Account } from "../../services/klaviyo/types";

export type Props = {
  isLoading: boolean;
  settings: PreInstalledSettings;
  error: Maybe<string>;
  accounts: Maybe<Account[]>;
  onVerifySettings: () => void;
};

const VerifySettings: FC<Props> = ({
  error,
  accounts,
  settings,
  isLoading,
  onVerifySettings,
}) => {
  return (
    <Stack align="baseline">
      <Button
        text="Verify Settings"
        intent="secondary"
        onClick={onVerifySettings}
        loading={isLoading}
        disabled={!settings?.api_key || isLoading}
      />
      {nbsp}
      {!accounts
        ? <Invalid type="p1">{error}</Invalid>
        : (
          <Secondary>
            Verified as &lt;{
              accounts
                .map(({ attributes }) =>
                  get(attributes, ["contact_information", "organization_name"])
                  || get(attributes, ["contact_information", "default_sender_name"])
                )
                .join(", ")
            }&gt;
          </Secondary>
        )
      }
    </Stack>
  );
};

export { VerifySettings };
