import { cleanup } from "@testing-library/react";
import { render, mockEvents } from "../../../../../testing";
import { getCampaignsFromEvents } from "../../../../utils";
import { Campaigns } from "../Campaigns";
import type { Props } from "../Campaigns";

const renderCampaigns = (props?: Partial<Props>) => render((
  <Campaigns campaigns={props?.campaigns || getCampaignsFromEvents(mockEvents.data as never)}/>
), { wrappers: { theme: true } });

describe("Home", () => {
  describe("Campaigns", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderCampaigns();

      expect(await findByText(/New one compaign/i)).toBeInTheDocument();
      expect(await findByText(/news news news/i)).toBeInTheDocument();

      expect(await findByText(/Internal Klaviyo - Test Campaign Name/i)).toBeInTheDocument();
      expect(await findByText(/Internal Klaviyo - Subject Line/i)).toBeInTheDocument();
    });
  });
});
