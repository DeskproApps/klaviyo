import { cleanup } from "@testing-library/react";
import { render, mockProfile } from "../../../../../testing";
import { ListItem } from "../ListItem";
import type { Props } from "../ListItem";

const renderListItem = (props?: Partial<Props>) => render((
  <ListItem list={props?.list || mockProfile.included[0] as never}/>
), { wrappers: { theme: true } });

describe("Home", () => {
  describe("ListItem", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render List", async () => {
      const { findByText } = renderListItem();

      expect(await findByText(/Newsletter/i)).toBeInTheDocument();
      expect(await findByText(/List/i)).toBeInTheDocument();
      expect(await findByText(/18 Mar 2024/i)).toBeInTheDocument();
    });

    test("render Segment", async () => {
      const { findByText } = renderListItem({ list: mockProfile.included[3] as never });

      expect(await findByText(/Engaged \(30 Days\)/i)).toBeInTheDocument();
      expect(await findByText(/Segment/i)).toBeInTheDocument();
      expect(await findByText(/18 Mar 2024/i)).toBeInTheDocument();
    });
  });
});
