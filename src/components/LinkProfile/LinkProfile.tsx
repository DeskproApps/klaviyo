import { Search, HorizontalDivider } from "@deskpro/app-sdk";
import { Container } from "../common";
import { Buttons, Profiles } from "./blocks";
import type { FC, Dispatch } from "react";
import type { Maybe } from "../../types";
import type { Profile } from "../../services/klaviyo/types";

export type Props = {
  isLoading: boolean;
  profiles: Maybe<Profile[]>;
  isSubmitting: boolean;
  selectedProfile: Maybe<Profile>;
  onCancel: () => void;
  onLinkProfile: () => void;
  onChangeSearch: (search: string) => void;
  onChangeSelectedProfile: Dispatch<Maybe<Profile>>;
};

const LinkProfile: FC<Props> = ({
  onCancel,
  profiles,
  isLoading,
  isSubmitting,
  onLinkProfile,
  onChangeSearch,
  selectedProfile,
  onChangeSelectedProfile,
}) => {
  return (
    <>
      <Container>
        <Search isFetching={isLoading} onChange={onChangeSearch}/>
        <Buttons
          onCancel={onCancel}
          isSubmitting={isSubmitting}
          onLinkProfile={onLinkProfile}
          selectedProfile={selectedProfile}
        />
      </Container>

      <HorizontalDivider/>

      <Container>
        <Profiles
          profiles={profiles}
          isLoading={isLoading}
          selectedProfile={selectedProfile}
          onChangeSelectedProfile={onChangeSelectedProfile}
        />
      </Container>
    </>
  );
};

export { LinkProfile };
