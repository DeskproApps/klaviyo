import { cleanup, renderHook, waitFor } from "@testing-library/react";
import { wrap, mockProfile } from "../../../testing";
import { getEntityListService } from "../../services/deskpro";
import { getProfileService } from "../../services/klaviyo";
import { useProfile } from "../useProfile";
import type { Result } from "../useProfile";

jest.mock("../../services/deskpro/getEntityListService");
jest.mock("../../services/klaviyo/getProfileService");

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

      const { result } = renderUseProfile();

      await waitFor(() => {
        expect(result.current.isLoading).toBe(false);
        expect(result.current.profile).toStrictEqual(mockProfile.data);
        expect(result.current.lists).toStrictEqual(mockProfile.included);
      });
    });
  });
});
