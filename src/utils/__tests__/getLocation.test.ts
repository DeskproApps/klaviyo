import { getLocation } from "../getLocation";
import { mockProfile } from "../../../testing";

describe("utils", () => {
  describe("getLocation", () => {
    test("should return profile location", () => {
      expect(getLocation(mockProfile.data.attributes.location as never))
        .toBe("285 Andrew Young International Blvd, Ste 302, Atlanta, GA, USA, 30313");
    });

    test("shouldn't return location", () => {
      expect(getLocation({
        address1: "285 Andrew Young International Blvd",
        address2: "",
        city: "Atlanta",
        region: "",
        country: "USA",
        zip: "30313",
      } as never)).toBe("285 Andrew Young International Blvd, Atlanta, USA, 30313");
    });

    test.each([undefined, null, "", 0, true, false, {}])("wrong value: %p", (payload) => {
      expect(getLocation(payload as never)).toBe("");
    });
  });
});
