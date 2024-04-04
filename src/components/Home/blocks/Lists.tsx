import { size, isEmpty } from "lodash";
import { Title } from "@deskpro/app-sdk";
import { getExternalLink } from "../../../utils";
import { NoFound, KlaviyoLogo } from "../../common";
import { ListItem } from "./ListItem";
import type { FC } from "react";
import type { List, Segment } from "../../../services/klaviyo/types";

export type Props = {
  lists: (List|Segment)[];
};

const Lists: FC<Props> = ({ lists }) => {
  return (
    <>
      <Title
        title={`List & Segments (${size(lists)})`}
        link={getExternalLink.list()}
        icon={<KlaviyoLogo/>}
      />
      {isEmpty(lists)
        ? <NoFound text="No lists found"/>
        : lists.map((list) => (
          <ListItem key={list.id} list={list}/>
        ))
      }
    </>
  );
};

export { Lists };
