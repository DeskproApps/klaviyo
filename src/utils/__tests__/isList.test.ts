import { isList } from "../isList";
import { mockProfile } from "../../../testing";

const mockList = mockProfile.included[0];
const mockSegment = mockProfile.included[6];

describe("utils", () => {
  describe("isList", () => {
    test("should list", () => {
      expect(isList(mockList as never)).toBeTruthy();
    });

    test("shouldn't list", () => {
      expect(isList(mockSegment as never)).toBeFalsy();
    });

    test.each(
      [undefined, null, "", 0, true, false, {}]
    )("wrong value: %p", (payload) => {
      expect(isList(payload as never)).toBeFalsy();
    });
  });
});
