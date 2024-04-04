import { cleanup, act } from "@testing-library/react";
import { tryToLinkAutomatically } from "../tryToLinkAutomatically";
import { getEntityListService, setEntityService } from "../../services/deskpro";
import { getProfilesService } from "../../services/klaviyo";
import { mockProfiles, mockClient, mockUserContext } from "../../../testing";

jest.mock("../../services/deskpro/getEntityListService");
jest.mock("../../services/deskpro/setEntityService");
jest.mock("../../services/klaviyo/getProfilesService");

describe("utils", () => {
  describe("tryToLinkAutomatically", () => {
    beforeEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("shouldn't link profile if already a linked", async () => {
      (getEntityListService as jest.Mock).mockResolvedValue(["1"]);
      (setEntityService as jest.Mock).mockResolvedValue(true);
      (getProfilesService as jest.Mock).mockResolvedValue({});

      await act(async () => {
        await tryToLinkAutomatically(mockClient as never, mockUserContext.data.user);
      });

      expect(getEntityListService).toHaveBeenCalled();
      expect(getProfilesService).not.toHaveBeenCalled();
      expect(setEntityService).not.toHaveBeenCalled();
    });

    test("shouldn't link profile if the dp user has no email", async () => {
      (getEntityListService as jest.Mock).mockResolvedValue(["1"]);
      (setEntityService as jest.Mock).mockResolvedValue(true);
      (getProfilesService as jest.Mock).mockResolvedValue({});

      await act(async () => {
        await tryToLinkAutomatically(mockClient as never, {} as never);
      });

      expect(getEntityListService).toHaveBeenCalled();
      expect(getProfilesService).not.toHaveBeenCalled();
      expect(setEntityService).not.toHaveBeenCalled();
    });

    test("shouldn't link if no profile found", async () => {
      (getEntityListService as jest.Mock).mockResolvedValue([]);
      (setEntityService as jest.Mock).mockResolvedValue(true);
      (getProfilesService as jest.Mock).mockResolvedValue({});

      await act(async () => {
        await tryToLinkAutomatically(mockClient as never, mockUserContext.data.user);
      });

      expect(getEntityListService).toHaveBeenCalled();
      expect(getProfilesService).toHaveBeenCalled();
      expect(setEntityService).not.toHaveBeenCalled();
    });

    test("should link profile", async () => {
      (getEntityListService as jest.Mock).mockResolvedValue([]);
      (setEntityService as jest.Mock).mockResolvedValue(true);
      (getProfilesService as jest.Mock).mockResolvedValue(mockProfiles);

      await act(async () => {
        await tryToLinkAutomatically(mockClient as never, mockUserContext.data.user);
      });

      expect(getEntityListService).toHaveBeenCalled();
      expect(getProfilesService).toHaveBeenCalled();
      expect(setEntityService).toHaveBeenCalled();
    });
  });
});
