import { Container, Navigation } from "../common";
import { ProfileForm } from "../ProfileForm";
import type { FC } from "react";
import type { Props as FormProps } from "../ProfileForm";

type Props = FormProps & {
  onNavigateToLink: () => void;
};

const CreateProfile: FC<Props> = ({ onNavigateToLink, ...props }) => {
  return (
    <Container>
      <Navigation onNavigateToLink={onNavigateToLink}/>
      <ProfileForm {...props}/>
    </Container>
  );
};

export { CreateProfile };
