import { getExternalLink } from "../getExternalLink";

describe("utils", () => {
  describe("getExternalLink", () => {

    describe("profile", () => {
      test("should return profile link", () => {
        expect(getExternalLink.profile("100500"))
          .toBe("https://www.klaviyo.com/profile/100500");
      });

      test.each([undefined, null, "", 0, true, false, {}])("wrong value: %p", (payload) => {
        expect(getExternalLink.profile(payload as never)).toBeNull();
      });
    });

    describe("list", () => {
      test("should return list link", () => {
        expect(getExternalLink.list("100500")).toBe("https://www.klaviyo.com/list/100500");
      });

      test.each([undefined, null, "", 0, true, false, {}])("wrong value: %p", (payload) => {
        expect(getExternalLink.list(payload as never)).toBe("https://www.klaviyo.com/lists");
      });
    });
  });
});
