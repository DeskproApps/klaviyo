import { Container } from "../common";
import { ProfileForm } from "../ProfileForm";
import type { FC } from "react";
import type { Props as FormProps } from "../ProfileForm";

type Props = FormProps;

const UpdateProfile: FC<Props> = (props) => {
  return (
    <Container>
      <ProfileForm {...props} isEditMode/>
    </Container>
  );
};

export { UpdateProfile };
