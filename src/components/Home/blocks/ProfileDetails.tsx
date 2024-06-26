import { useMemo } from "react";
import { get } from "lodash";
import { Title, Property } from "@deskpro/app-sdk";
import { getFullName, getExternalLink, getLocation } from "../../../utils";
import { KlaviyoLogo, DeskproTickets } from "../../common";
import type { FC } from "react";
import type { Profile } from "../../../services/klaviyo/types";

export type Props = {
  profile: Profile;
};

const ProfileDetails: FC<Props> = ({ profile }) => {
  const link = useMemo(() => getExternalLink.profile(profile.id), [profile]);

  return (
    <>
      <Title
        title={getFullName(profile)}
        {...(!link ? {} : { icon: <KlaviyoLogo/> })}
        {...(!link ? {} : { link })}
      />
      <Property
        label="Unique ID"
        text={profile.id}
      />
      <Property
        label="Email"
        text={profile.attributes.email}
      />
      <Property
        label="Phone number"
        text={profile.attributes.phone_number}
      />
      <Property
        label="Title"
        text={profile.attributes.title}
      />
      <Property
        label="Organization"
        text={profile.attributes.organization}
      />
      <Property
        label="Deskpro Tickets"
        text={<DeskproTickets entityId={profile.id}/>}
      />
      <Property
        label="Location"
        text={getLocation(get(profile, ["attributes", "location"]))}
      />
    </>
  );
};

export { ProfileDetails };
