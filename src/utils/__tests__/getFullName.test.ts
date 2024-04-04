import { omit, cloneDeep } from "lodash";
import { getFullName } from "../getFullName";
import { mockProfile } from "../../../testing";

describe("utils", () => {
  describe("getFullName", () => {
    test("should return full_name", () => {
      expect(getFullName(mockProfile.data as never)).toBe("Ivan Vyhovsky");
    });

    test("should return email", () => {
      const profile = omit(
        cloneDeep(mockProfile.data),
        ["attributes.first_name", "attributes.last_name"],
      );
      expect(getFullName(profile as never)).toBe("ivan.vyhovsky@cossacks.org");
    });

    test("should return only FirstName or LastName", () => {
      const profileWithFirstName = omit(cloneDeep(mockProfile.data), ["attributes.last_name"]);
      expect(getFullName(profileWithFirstName as never)).toBe("Ivan");

      const profileWithLastName = omit(cloneDeep(mockProfile.data), ["attributes.first_name"]);
      expect(getFullName(profileWithLastName as never)).toBe("Vyhovsky");
    });

    test.each([undefined, null, "", 0, true, false, {}])("wrong value: %p", (payload) => {
      expect(getFullName(payload as never)).toBe("");
    });
  });
});
