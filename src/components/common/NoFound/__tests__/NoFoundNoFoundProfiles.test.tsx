import { cleanup } from "@testing-library/react";
import { render } from "../../../../../testing";
import { NoFoundProfiles } from "../NoFoundProfiles";
import type { Props } from "../NoFoundProfiles";

const renderNoFoundProfiles = (props?: Partial<Props>) => render((
  <NoFoundProfiles
    profiles={props?.profiles as never}
    children={props?.children || "" as never}
  />
), { wrappers: { theme: true } });

describe("NoFoundProfiles", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByText } = renderNoFoundProfiles();
    expect(await findByText(/No found/i)).toBeInTheDocument();
  });

  test("should show \"No profiles found\" if no issues", async () => {
    const { findByText } = renderNoFoundProfiles({ profiles: [] });
    expect(await findByText(/No profiles found/i)).toBeInTheDocument();
  });

  test("should show passing \"children\" if issues exist", async () => {
    const { findByText } = renderNoFoundProfiles({
      profiles: [{ id: "001" }] as never[],
      children: () => "Some content",
    });

    expect(await findByText(/Some content/i)).toBeInTheDocument();
  });
});
