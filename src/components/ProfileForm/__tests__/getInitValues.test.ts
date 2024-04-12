import { getInitValues } from "../utils";
import { mockUserContext } from "../../../../testing";

describe("ProfileForm", () => {
  describe("utils", () => {
    describe("getInitValues", () => {
      test("should return empty values", () => {
        expect(getInitValues()).toStrictEqual({
          email: "",
          firstName: "",
          lastName: "",
          phone: "",
          organization: "",
          title: ""
        });
      });

      test("should return values with deskpro user", () => {
        const mockDpUser = {
          attributes: {
            email: mockUserContext.data.user.primaryEmail,
            first_name: mockUserContext.data.user.firstName,
            last_name: mockUserContext.data.user.lastName,
          },
        };

        expect(getInitValues(mockDpUser as never)).toStrictEqual({
          email: "cormac.mccarthy@example.org",
          firstName: "Dorcas",
          lastName: "McCullough",
          phone: "",
          organization: "",
          title: ""
        });
      });

      test.each([{}, [], "", 123, 0, false, true])("wrong value: %p", (value) => {
        expect(getInitValues(value as never)).toStrictEqual({
          email: "",
          firstName: "",
          lastName: "",
          phone: "",
          organization: "",
          title: "",
        });
      });
    });
  });
});
