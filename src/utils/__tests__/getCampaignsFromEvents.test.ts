import { getCampaignsFromEvents } from "../getCampaignsFromEvents";
import { mockEvents } from "../../../testing";

describe("utils", () => {
  describe("getCampaignsFromEvents", () => {
    test("should return campaigns", () => {
      expect(getCampaignsFromEvents(mockEvents.data as never)).toStrictEqual([
        { campaignName: "New one compaign", subject: "news news news" },
        { campaignName: "Internal Klaviyo - Test Campaign Name", subject: "Internal Klaviyo - Subject Line" },
      ]);
    });

    test.each([undefined, null, "", 0, true, false, {}, []])("wrong value: %p", (payload) => {
      expect(getCampaignsFromEvents(payload as never)).toStrictEqual([]);
    });
  });
});
