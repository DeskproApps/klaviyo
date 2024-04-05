import { useState } from "react";
import { has, get } from "lodash";
import { useForm } from "react-hook-form";
import { Input, Stack } from "@deskpro/deskpro-ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { getInitValues, validationSchema } from "./utils";
import { Label, Button, ErrorBlock } from "../common";
import type { FC } from "react";
import type { Props, FormValidationSchema } from "./types";

const ProfileForm: FC<Props> = ({ error, onSubmit, onCancel, profile, isEditMode }) => {
  const [formError, setFormError] = useState(null);
  const form = useForm<FormValidationSchema>({
    defaultValues: getInitValues(profile),
    resolver: zodResolver(validationSchema),
  });
  const {
    watch,
      trigger,
      register,
      getValues,
      formState: { errors, isSubmitting },
  } = form;

  const onClickSubmit = async () => {
    setFormError(null);
    const isValid = await trigger();

    if (!isValid) {
      const customErrors = get(form, ["formState", "errors", "custom", "message"])
      setFormError(customErrors);
      return Promise.resolve();
    }

    return onSubmit(getValues());
  };

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {error && <ErrorBlock text={error}/>}
      {formError && <ErrorBlock text={formError}/>}

      <Label htmlFor="email" label="Email">
        <Input
          id="email"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["email", "message"])}
          value={watch("email")}
          {...register("email")}
        />
      </Label>

      <Label htmlFor="phone" label="Phone">
        <Input
          id="phone"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["phone", "message"])}
          value={watch("phone")}
          {...register("phone")}
        />
      </Label>

      <Label htmlFor="firstName" label="First name">
        <Input
          id="firstName"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["firstName", "message"])}
          value={watch("firstName")}
          {...register("firstName")}
        />
      </Label>

      <Label htmlFor="lastName" label="Last name">
        <Input
          id="lastName"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["lastName", "message"])}
          value={watch("lastName")}
          {...register("lastName")}
        />
      </Label>

      <Label htmlFor="organization" label="Organization">
        <Input
          id="organization"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["organization", "message"])}
          value={watch("organization")}
          {...register("organization")}
        />
      </Label>

      <Label htmlFor="title" label="Title">
        <Input
          id="title"
          type="text"
          variant="inline"
          inputsize="small"
          placeholder="Add value"
          error={has(errors, ["title", "message"])}
          value={watch("title")}
          {...register("title")}
        />
      </Label>

      <Stack justify="space-between">
        <Button
          type="button"
          text={isEditMode ? "Save" : "Create"}
          onClick={onClickSubmit}
          disabled={isSubmitting}
          loading={isSubmitting}
        />
        <Button
          type="button"
          text="Cancel"
          intent="tertiary"
          onClick={onCancel}
        />
      </Stack>
    </form>
  );
};

export { ProfileForm };
