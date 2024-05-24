import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container, NoFound } from "../common";
import { ProfileDetails, Lists, Campaigns } from "./blocks";
import { FC } from "react";
import type { Maybe } from "../../types";
import type { Profile, List, Segment, PseudoCampaign } from "../../services/klaviyo/types";

type Props = {
  profile: Maybe<Profile>;
  lists: (List|Segment)[];
  campaigns: PseudoCampaign[];
};

const Home: FC<Props> = ({ profile, lists, campaigns }) => {
  if (!profile) {
    return (
      <Container>
        <NoFound text="No profile linked"/>
      </Container>
    );
  }

  return (
    <>
      <Container>
        <ProfileDetails profile={profile}/>
      </Container>

      <HorizontalDivider/>

      <Container>
        <Campaigns campaigns={campaigns}/>
      </Container>

      <HorizontalDivider/>

      <Container>
        <Lists lists={lists}/>
      </Container>
    </>
  );
};

export { Home };
