import { useMemo, useCallback } from "react";
import { Link, Title, Property, TwoProperties } from "@deskpro/app-sdk";
import { nbsp } from "../../constants";
import { KlaviyoLogo, DeskproTickets } from "../common";
import type { FC, MouseEvent } from "react";
import type { Profile } from "../../services/klaviyo/types";

export type Props = {
  profile: Profile;
  onClickTitle: () => void;
};

const ProfileItem: FC<Props> = ({ profile, onClickTitle }) => {
  const fullName = useMemo(() => [
    profile.attributes.first_name,
    profile.attributes.last_name
  ].join(nbsp), [profile]);

  const onClick = useCallback((e: MouseEvent) => {
    e.preventDefault();
    onClickTitle && onClickTitle();
  }, [onClickTitle]);

  return (
    <>
      <Title
        title={!onClickTitle
          ? `${fullName}`
          : (<Link href="#" onClick={onClick}>{fullName}</Link>)
        }
        marginBottom={10}
        icon={<KlaviyoLogo/>}
        link={`https://www.klaviyo.com/profile/${profile.id}`}
      />
      <TwoProperties
        leftLabel="Email"
        leftText={profile.attributes.email}
        rightLabel="Phone number"
        rightText={profile.attributes.phone_number}
      />
      <TwoProperties
        leftLabel="Title"
        leftText={profile.attributes.title}
        rightLabel="Organization"
        rightText={profile.attributes.organization}
      />
      <Property
        label="Deskpro Tickets"
        text={<DeskproTickets entityId={profile.id}/>}
      />
    </>
  );
};

export { ProfileItem };
