import { set, cloneDeep } from "lodash";
import { getError } from "../getError";
import { KlaviyoError } from "../../services/klaviyo";
import { mockError } from "../../../testing";

describe("utils", () => {
  describe("getError", () => {
    test("should return error details", () => {
      const error = new KlaviyoError({ status: 401, data: mockError as never });
      expect(getError(error)).toBe("Missing or invalid private key.");
    });

    test("should return error title", () => {
      const mock = cloneDeep(mockError);
      const error = new KlaviyoError({
        status: 401,
        data: set(mock, ["errors", 0, "detail"], null) as never
      });

      expect(getError(error)).toBe("Authentication credentials were not provided.");
    });

    test("should return the default error that was passed", () => {
      const mock = cloneDeep(mockError);
      set(mock, ["errors", 0, "detail"], null);
      set(mock, ["errors", 0, "title"], null);

      const error = new KlaviyoError({
        status: 401,
        data: mock as never
      });

      expect(getError(error, "Custom text error")).toBe("Custom text error");
    });

    test("should return default error", () => {
      const mock = cloneDeep(mockError);
      set(mock, ["errors", 0, "detail"], null);
      set(mock, ["errors", 0, "title"], null);

      const error = new KlaviyoError({
        status: 401,
        data: mock as never
      });

      expect(getError(error)).toBe("There was an error!");
    });

    test.each(
      [undefined, null, "", 0, true, false, {}]
    )("wrong value: %p", (payload) => {
      expect(getError(payload as never)).toBe("There was an error!");
    });
  });
});
