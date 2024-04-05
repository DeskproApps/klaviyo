import { get } from "lodash";

const requiredFieldsValidator = <T>(values?: T): boolean => {
  const email = get(values, ["email"]);
  const phone = get(values, ["phone"]);

  return Boolean(email) || Boolean(phone);
};

export { requiredFieldsValidator };
