import { get } from "lodash";
import { z } from "zod";
import { requiredFieldsValidator } from "./validators";
import type { Maybe } from "../../types";
import type { Profile, ProfileInput } from "../../services/klaviyo/types";
import type { FormValidationSchema } from "./types";

const validationSchema = z.object({
  email: z.union([
    z.string().email(),
    z.literal(""),
  ]).optional(),
  phone: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  organization: z.string(),
  title: z.string(),
})
  .refine(requiredFieldsValidator, {
    message: "Email or phone identifiers are required",
    path: ["custom"],
  });

const getInitValues = (profile?: Maybe<Profile>) => ({
  email: get(profile, ["attributes", "email"]) || "",
  firstName: get(profile, ["attributes", "first_name"]) || "",
  lastName: get(profile, ["attributes", "last_name"]) || "",
  phone: "",
  organization: "",
  title: "",
});

const getProfileValues = (data: FormValidationSchema): ProfileInput => {
  return {
    data: {
      type: "profile",
      attributes: {
        ...(!data.email ? {} : { email: data.email }),
        ...(!data.phone ? {} : { phone_number: data.phone }),
        first_name: data.firstName || "",
        last_name: data.lastName || "",
        organization: data.organization || "",
        title: data.title || "",
      },
    },
  };
};

export { validationSchema, getInitValues, getProfileValues };
