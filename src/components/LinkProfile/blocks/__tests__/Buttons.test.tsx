import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render, mockProfiles } from "../../../../../testing";
import { Buttons } from "../Buttons";
import type { Props } from "../Buttons";

const renderButtons = (props?: Partial<Props>) => render((
  <Buttons
    onCancel={props?.onCancel || jest.fn()}
    isSubmitting={props?.isSubmitting || false}
    onLinkProfile={props?.onLinkProfile || jest.fn()}
    selectedProfile={props?.selectedProfile || null}
  />
), { wrappers: { theme: true } });

describe("LinkProfile", () => {
  describe("Buttons", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByRole } = renderButtons();
      const linkButton = await findByRole("button", { name: "Link Profile" });
      const cancelButton = await findByRole("button", { name: "Cancel" });

      expect(linkButton).toBeInTheDocument();
      expect(cancelButton).toBeInTheDocument();
    });

    test("shouldn't click \"Link Profile\" if no linked profile", async () => {
      const mockOnLinkProfile = jest.fn();
      const { findByRole } = renderButtons({ onLinkProfile: mockOnLinkProfile });
      const linkButton = await findByRole("button", { name: "Link Profile" });

      await userEvent.click(linkButton as Element);

      expect(mockOnLinkProfile).not.toHaveBeenCalled();
    });

    test("should click \"Link Profile\"", async () => {
      const mockOnLinkProfile = jest.fn();
      const { findByRole } = renderButtons({
        selectedProfile: mockProfiles.data[0] as never,
        onLinkProfile: mockOnLinkProfile,
      });
      const linkButton = await findByRole("button", { name: "Link Profile" });

      await userEvent.click(linkButton as Element);

      expect(mockOnLinkProfile).toHaveBeenCalled();
    });

    test("should click \"Cancel\"", async () => {
      const mockOnCancel = jest.fn();
      const { findByRole } = renderButtons({ onCancel: mockOnCancel });
      const cancelButton = await findByRole("button", { name: "Cancel" });

      await userEvent.click(cancelButton as Element);

      expect(mockOnCancel).toHaveBeenCalled();
    });
  });
});
