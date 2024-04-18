import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { wrap, mockProfile, mockMetrics, mockEvents } from "../../../testing";
import { getEntityListService } from "../../services/deskpro";
import { getProfileService, getMetricsService, getEventsService } from "../../services/klaviyo";
import { useProfile } from "../useProfile";
import type { Result } from "../useProfile";

jest.mock("../../services/deskpro/getEntityListService");
jest.mock("../../services/klaviyo/getProfileService");
jest.mock("../../services/klaviyo/getMetricsService");
jest.mock("../../services/klaviyo/getEventsService");

const renderUseProfile = () => renderHook<Result, unknown>(
  () => useProfile(),
  { wrapper: ({ children }) => wrap(children as never, { query: true }) },
);

describe("hooks", () => {
  describe("useUnlinkProfile", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("should return profile data", async () => {
      (getEntityListService as jest.Mock).mockResolvedValue(["100500"]);
      (getProfileService as jest.Mock).mockResolvedValue(mockProfile);
      (getMetricsService as jest.Mock).mockResolvedValue(mockMetrics);
      (getEventsService as jest.Mock).mockResolvedValue(mockEvents);

      const { result } = renderUseProfile();

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.profile).toStrictEqual(mockProfile.data);
        expect(result.current.lists).toStrictEqual(mockProfile.included);
        expect(result.current.campaigns).toStrictEqual([
          { campaignName: "New one compaign", subject: "news news news" },
          { campaignName: "Internal Klaviyo - Test Campaign Name", subject: "Internal Klaviyo - Subject Line" },
        ]);
      });
    });
  });
});
