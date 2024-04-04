import { isSegment } from "../isSegment";
import { mockProfile } from "../../../testing";

const mockSegment = mockProfile.included[6];
const mockList = mockProfile.included[0];

describe("utils", () => {
  describe("isSegment", () => {
    test("should segment", () => {
      expect(isSegment(mockSegment as never)).toBeTruthy();
    });

    test("shouldn't segment", () => {
      expect(isSegment(mockList as never)).toBeFalsy();
    });

    test.each(
      [undefined, null, "", 0, true, false, {}]
    )("wrong value: %p", (payload) => {
      expect(isSegment(payload as never)).toBeFalsy();
    });
  });
});
