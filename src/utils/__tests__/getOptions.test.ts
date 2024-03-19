import { getOptions } from "../getOptions";

describe("utils", () => {
  describe("getOptions", () => {
    test.each(
      [undefined, null, "", 0, true, false, {}],
    )("wrong value: %p", (value) => {
      expect(getOptions(value as never)).toStrictEqual([]);
    });
  });
});
