import { getFilterString } from "../getFilterString";

describe("utils", () => {
  describe("getFilterString", () => {
    test("should return email", () => {
      expect(getFilterString({ email: "bohdan.khmelnytsky@cossacks.org" } as never))
        .toBe(`any(email,["bohdan.khmelnytsky@cossacks.org"])`);
    });

    test("should return emails", () => {
      const params = { email: ["ivan.mazepa@cossacks.org", "pylyp.orlyk@zaporizhian.org"] };
      expect(getFilterString(params as never))
        .toBe(`any(email,["ivan.mazepa@cossacks.org","pylyp.orlyk@zaporizhian.org"])`);
    });

    test.each(
      [undefined, null, "", 0, true, false, {}]
    )("wrong value: %p", (payload) => {
      expect(getFilterString(payload as never)).toBe("");
    });
  });
});
