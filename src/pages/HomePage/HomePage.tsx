import { isEmpty } from "lodash";
import { LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle, useProfile, useRegisterElements } from "../../hooks";
import { Home } from "../../components";
import type { FC } from "react";

const HomePage: FC = () => {
  const { isLoading, profile, lists, campaigns } = useProfile();

  useSetTitle("Klaviyo");

  useRegisterElements(({ registerElement }) => {
    registerElement("menu", {
      type: "menu",
      items: [{
        title: "Unlink profile",
        payload: { type: "unlink" },
      }],
    });
    if (!isEmpty(profile)) {
      registerElement("edit", {
        type: "edit_button",
        payload: { type: "changePage", path: "/profiles/update" },
      });
    }
  }, [profile]);

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <Home
      profile={profile}
      lists={lists}
      campaigns={campaigns}
    />
  );
};

export { HomePage };
