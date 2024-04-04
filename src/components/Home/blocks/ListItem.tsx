import { get, capitalize } from "lodash";
import { Title, TwoProperties, HorizontalDivider } from "@deskpro/app-sdk";
import { getExternalLink } from "../../../utils";
import { format } from "../../../utils/date";
import { KlaviyoLogo } from "../../common";
import type { FC } from "react";
import type { List, Segment } from "../../../services/klaviyo/types";

export type Props = {
  list: List|Segment;
};

const ListItem: FC<Props> = ({ list }) => (
  <>
    <Title
      title={get(list, ["attributes", "name"])}
      marginBottom={10}
      link={getExternalLink.list(list.id)}
      icon={<KlaviyoLogo/>}
    />
    <TwoProperties
      leftLabel="Type"
      leftText={capitalize(get(list, ["type"]))}
      rightLabel="Created"
      rightText={format(get(list, ["attributes", "created"]))}
    />
    <HorizontalDivider style={{ marginBottom: 10 }}/>
  </>
);

export { ListItem };
