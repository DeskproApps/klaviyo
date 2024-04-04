import { Fragment } from "react";
import { Radio } from "@deskpro/deskpro-ui";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { Card, NoFoundProfiles } from "../../common";
import { ProfileItem } from "../../ProfileItem";
import type { FC, Dispatch } from "react";
import type { Maybe } from "../../../types";
import type { Profile } from "../../../services/klaviyo/types";

export type Props = {
  isLoading: boolean;
  profiles: Maybe<Profile[]>;
  selectedProfile: Maybe<Profile>;
  onChangeSelectedProfile: Dispatch<Maybe<Profile>>;
};

const Profiles: FC<Props> = ({
  profiles,
  isLoading,
  selectedProfile,
  onChangeSelectedProfile,
}) => {
  if (isLoading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <NoFoundProfiles profiles={profiles}>
      {(profiles) => profiles.map((profile) => (
        <Fragment key={profile.id}>
          <Card>
            <Card.Media>
              <Radio
                size={12}
                id={profile.id as string}
                style={{ marginTop: 4 }}
                checked={profile.id === selectedProfile?.id}
                onChange={() => onChangeSelectedProfile(profile)}
              />
            </Card.Media>
            <Card.Body>
              <ProfileItem
                profile={profile}
                onClickTitle={() => onChangeSelectedProfile(profile)}
              />
            </Card.Body>
          </Card>
        </Fragment>
      ))}
    </NoFoundProfiles>
  );
};

export { Profiles };
