import { Stack } from "@deskpro/deskpro-ui";
import { Button } from "../../common";
import type { FC } from "react";
import type { Maybe } from "../../../types";
import type { Profile } from "../../../services/klaviyo/types";

export type Props = {
  isSubmitting: boolean;
  onCancel: () => void;
  selectedProfile: Maybe<Profile>;
  onLinkProfile: () => void;
};

const Buttons: FC<Props> = ({ isSubmitting, selectedProfile, onLinkProfile, onCancel }) => (
  <Stack justify="space-between">
    <Button
      type="button"
      text="Link Profile"
      disabled={!selectedProfile || isSubmitting}
      loading={isSubmitting}
      onClick={onLinkProfile}
    />
    <Button
      type="button"
      text="Cancel"
      intent="secondary"
      onClick={onCancel}
    />
  </Stack>
);

export { Buttons };
