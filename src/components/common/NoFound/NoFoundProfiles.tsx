import size from "lodash/size";
import { NoFound } from "./NoFound";
import type { FC, ReactNode } from "react";
import type { Maybe } from "../../../types";
import type { Profile } from "../../../services/klaviyo/types";

export type Props = {
  profiles: Maybe<Profile[]>,
  children?: (profiles: Profile[]) => ReactNode,
}

const NoFoundProfiles: FC<Props> = ({ children, profiles }) => (
  <>
    {!Array.isArray(profiles)
      ? <NoFound/>
      : !size(profiles)
      ? <NoFound text="No profiles found"/>
      : children && children(profiles)
    }
  </>
);

export { NoFoundProfiles };
