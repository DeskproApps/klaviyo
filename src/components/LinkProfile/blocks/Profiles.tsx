import { NoFoundProfiles } from "../../common";
import type { FC } from "react";
import type { Maybe } from "../../../types";
import type { Profile } from "../../../services/klaviyo/types";

export type Props = {
  profiles: Maybe<Profile[]>;
};

const Profiles: FC<Props> = ({ profiles }) => {
  return (
    <NoFoundProfiles profiles={profiles}>
      {() => (
        <>Profiles</>
      )}
    </NoFoundProfiles>
  );
};

export { Profiles };
