import { HorizontalDivider } from "@deskpro/app-sdk";
import { Container, NoFound } from "../common";
import { ProfileDetails, Lists } from "./blocks";
import { FC } from "react";
import type { Maybe } from "../../types";
import type { Profile, List, Segment } from "../../services/klaviyo/types";

type Props = {
  profile: Maybe<Profile>;
  lists: (List|Segment)[];
};

const Home: FC<Props> = ({ profile, lists }) => {
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
        <Lists lists={lists}/>
      </Container>
    </>
  );
};

export { Home };
