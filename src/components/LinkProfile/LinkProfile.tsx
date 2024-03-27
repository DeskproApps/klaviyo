import { Search, HorizontalDivider } from "@deskpro/app-sdk";
import { Container } from "../common";
import { Buttons, Profiles } from "./blocks";
import type { FC } from "react";
import type { Maybe } from "../../types";
import type { Profile } from "../../services/klaviyo/types";

export type Props = {
  profiles: Maybe<Profile[]>;
  isSubmitting: boolean;
  selectedProfile: Maybe<Profile>;
  onCancel: () => void;
  onLinkProfile: () => void;
  onChangeSearch: (search: string) => void;
};

const LinkProfile: FC<Props> = ({
  onCancel,
  profiles,
  isSubmitting,
  onLinkProfile,
  onChangeSearch,
  selectedProfile,
}) => {
  return (
    <>
      <Container>
        <Search onChange={onChangeSearch}/>
        <Buttons
          onCancel={onCancel}
          isSubmitting={isSubmitting}
          onLinkProfile={onLinkProfile}
          selectedProfile={selectedProfile}
        />
      </Container>

      <HorizontalDivider/>

      <Profiles profiles={profiles}/>
    </>
  );
};

export { LinkProfile };
