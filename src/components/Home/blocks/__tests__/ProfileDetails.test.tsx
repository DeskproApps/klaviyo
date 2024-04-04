import { cleanup } from "@testing-library/react";
import { render, mockProfile } from "../../../../../testing";
import { ProfileDetails } from "../ProfileDetails";
import type { Props } from "../ProfileDetails";

const renderProfileDetails = (props?: Partial<Props>) => render((
  <ProfileDetails profile={props?.profile || mockProfile.data as never}/>
), { wrappers: { theme: true } });

describe("Home", () => {
  describe("ProfileDetails", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderProfileDetails();

      expect(await findByText(/Ivan Vyhovsky/i)).toBeInTheDocument();
      expect(await findByText(/ivan\.vyhovsky@cossacks\.org/i)).toBeInTheDocument();
      expect(await findByText(/\+441234567890/i)).toBeInTheDocument();
      expect(await findByText(/Hetman of Zaporizhian Host/i)).toBeInTheDocument();
      expect(await findByText(/Cossack Hetmanate/i)).toBeInTheDocument();
    });
  });
});
