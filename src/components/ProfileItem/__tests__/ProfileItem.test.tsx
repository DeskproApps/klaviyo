import { cleanup } from "@testing-library/react";
import { render, mockProfiles } from "../../../../testing";
import { ProfileItem } from "../ProfileItem";
import type { Props } from "../ProfileItem";

const renderProfileItem = (props?: Partial<Props>) => render((
  <ProfileItem
    profile={props?.profile || mockProfiles.data[0] as never}
    onClickTitle={props?.onClickTitle || jest.fn()}
  />
), { wrappers: { theme: true } });

describe("ProfileItem", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = renderProfileItem();

    expect(await findByText(/Ivan Vyhovsky/i)).toBeInTheDocument();
    expect(await findByText(/ivan\.vyhovsky@cossacks\.org/i)).toBeInTheDocument();
    expect(await findByText(/\+441234567890/i)).toBeInTheDocument();
    expect(await findByText(/Hetman of Zaporizhian Host/i)).toBeInTheDocument();
    expect(await findByText(/Cossack Hetmanate/i)).toBeInTheDocument();
  });
});
