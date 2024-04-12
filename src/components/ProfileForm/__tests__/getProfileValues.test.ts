import { cloneDeep } from "lodash";
import { getProfileValues } from "../utils";
import mockValues from "./mockValues.json";

describe("ProfileForm", () => {
  describe("utils", () => {
    describe("getProfileValues", () => {
      test("should return full profile values", () => {
        expect(getProfileValues(mockValues as never)).toStrictEqual({
          data: {
            type: "profile",
            attributes: {
              email: "pylyp.orlyk@zaporizhian.org",
              phone_number: "+1234567891",
              first_name: "Pylyp",
              last_name: "Orlyk",
              organization: "Zaporizhian Host",
              title: "Hetman",
            },
          },
        });
      });

      test("should return profile values without phone", () => {
        const values = cloneDeep(mockValues);
        values.phone = "";
        expect(getProfileValues(values as never))
          .toHaveProperty("data.attributes.email", "pylyp.orlyk@zaporizhian.org");
        expect(getProfileValues(values as never)).not.toHaveProperty("data.attributes.phone_number");
      });

      test("should return profile values without email", () => {
        const values = cloneDeep(mockValues);
        values.email = "";
        expect(getProfileValues(values as never)).toHaveProperty("data.attributes.phone_number", "+1234567891");
        expect(getProfileValues(values as never)).not.toHaveProperty("data.attributes.email");
      });

      test.each([{}, [], "", 123, 0, false, true])("wrong value: %p", (value) => {
        expect(getProfileValues(value as never)).toStrictEqual({
          data: {
            type: "profile",
            attributes: {
              first_name: "",
              last_name: "",
              organization: "",
              title: "",
            },
          },
        });
      });
    });
  });
});
