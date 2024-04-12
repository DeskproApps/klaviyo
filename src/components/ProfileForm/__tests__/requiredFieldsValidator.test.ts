import { requiredFieldsValidator } from "../validators";

describe("ProfileForm", () => {
  describe("validators", () => {
    describe("requiredFieldsValidator", () => {
      test("should return false if both email and phone are empty", () => {
        expect(requiredFieldsValidator()).toBeFalsy();
        expect(requiredFieldsValidator({email: "", phone: ""})).toBeFalsy();
      });

      test("should return true if email is not empty", () => {
        expect(requiredFieldsValidator({email: "ivan.mazepa@cossacks.org", phone: ""})).toBeTruthy();
      });

      test("should return true if phone is not empty", () => {
        expect(requiredFieldsValidator({email: "", phone: "+1234567890"})).toBeTruthy();
      });

      test.each([{}, [], "", 123, 0, false, true])("wrong value: %p", (value) => {
        expect(requiredFieldsValidator({recurring: true, endDatetime: value})).toBeFalsy();
      });
    });
  });
});
