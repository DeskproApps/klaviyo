import { size } from "lodash";
import { Title, Property } from "@deskpro/app-sdk";
import { KlaviyoLogo, Secondary, NoFound } from "../../common";
import type { FC } from "react";
import type { PseudoCampaign } from "../../../services/klaviyo/types";

export type Props = {
  campaigns: PseudoCampaign[];
};

const Campaigns: FC<Props> = ({ campaigns }) => {
  return (
    <>
      <Title
        title={`Campaigns (${size(campaigns)})`}
        link="https://www.klaviyo.com/campaigns/list"
        icon={<KlaviyoLogo/>}
      />
      {!size(campaigns)
        ? <NoFound text="No Campaigns found"/>
        : campaigns.map((campaign, idx) => (
          <Property
            key={idx}
            text={(
              <>
                <Title title={campaign.campaignName} marginBottom={0}/>
                <Secondary>{campaign.subject}</Secondary>
              </>
            )}
          />
        ))}
    </>
  );
};

export { Campaigns };
