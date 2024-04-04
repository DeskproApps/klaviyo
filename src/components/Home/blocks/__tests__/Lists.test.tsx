import { cleanup } from "@testing-library/react";
import { render, mockProfile } from "../../../../../testing";
import { Lists } from "../Lists";
import type { Props } from "../Lists";

const renderLists = (props?: Partial<Props>) => render((
  <Lists lists={props?.lists || mockProfile.included as never}/>
) , { wrappers: { theme: true } });

describe("Home", () => {
  describe("Lists", () => {
    afterEach(() => {
      jest.clearAllMocks();
      cleanup();
    });

    test("render", async () => {
      const { findByText } = renderLists();

      expect(await findByText(/Newsletter/i)).toBeInTheDocument();
      expect(await findByText(/Sample Data List/i)).toBeInTheDocument();
      expect(await findByText(/THIS IS REQUIRED/i)).toBeInTheDocument();
      expect(await findByText(/Engaged \(30 Days\)/i)).toBeInTheDocument();
      expect(await findByText(/Engaged \(90 Days\)/i)).toBeInTheDocument();
      expect(await findByText(/Engaged \(60 Days\)/i)).toBeInTheDocument();
      expect(await findByText(/New Subscribers/i)).toBeInTheDocument();
    })
  });
});
