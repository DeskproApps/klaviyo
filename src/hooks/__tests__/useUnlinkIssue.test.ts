import { cleanup, renderHook, act } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { deleteEntityService, getEntityListService } from "../../services/deskpro";
import { useUnlinkProfile } from "../useUnlinkProfile";
import type { Result } from "../useUnlinkProfile";

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock("../useAsyncError", () => ({
  useAsyncError: jest.fn().mockReturnValue({ asyncErrorHandler: jest.fn() }),
}));
jest.mock("../../services/deskpro/deleteEntityService");
jest.mock("../../services/deskpro/getEntityListService");

const renderUseUnlinkProfile = () => renderHook<Result, unknown>(() => useUnlinkProfile());

describe("useUnlinkProfile", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("should unlink profile", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (getEntityListService as jest.Mock).mockResolvedValueOnce(["1"]);
    (deleteEntityService as jest.Mock).mockResolvedValueOnce(undefined);

    const { result } = renderUseUnlinkProfile();

    await act(async () => {
      await result.current.unlink();
    })

    expect(getEntityListService).toHaveBeenCalled();
    expect(deleteEntityService).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith("/profiles/link");
  });

  test("should unlink all profiles if there is more than one", async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockImplementation(() => mockNavigate);
    (getEntityListService as jest.Mock).mockResolvedValueOnce(["1", "2", "3"]);
    (deleteEntityService as jest.Mock).mockResolvedValueOnce(undefined);

    const { result } = renderUseUnlinkProfile();

    await act(async () => {
      await result.current.unlink();
    });

    expect(deleteEntityService).toHaveBeenCalledTimes(3);
  });
});
