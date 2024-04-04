import { cleanup } from "@testing-library/react";
import { render, mockProfiles } from "../../../../../testing";
import { Profiles } from "../Profiles";
import type { Props } from "../Profiles";

const renderProfiles = (props?: Partial<Props>) => render((
  <Profiles
    isLoading={props?.isLoading || false}
    profiles={props?.profiles || mockProfiles.data as never[]}
    selectedProfile={props?.selectedProfile || null}
    onChangeSelectedProfile={props?.onChangeSelectedProfile || jest.fn()}
  />
), { wrappers: { theme: true } });

describe("LinkProfile", () => {
  describe("Profiles", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderProfiles();

      expect(await findByText(/Ivan Vyhovsky/i)).toBeInTheDocument();
      expect(await findByText(/Pavlo Skoropadskyi/i)).toBeInTheDocument();
      expect(await findByText(/Pylyp Orlyk/i)).toBeInTheDocument();
      expect(await findByText(/Ivan Mazepa/i)).toBeInTheDocument();
      expect(await findByText(/Bohdan Khmelnytsky/i)).toBeInTheDocument();
    });

    test("should show \"No profiles found\"", async () => {
      const { findByText } = renderProfiles({ profiles: [] });

      expect(await findByText(/No profiles found/i)).toBeInTheDocument();
    });

    test("should the profile selected", async () => {
      const mockProfile = mockProfiles.data[0];
      const { container } = renderProfiles({ selectedProfile: mockProfile as never });
      const radio = container.querySelector(`input[id="${mockProfile.id}"`) as HTMLInputElement;

      expect(radio.checked).toBe(true);
    });
  });
});
