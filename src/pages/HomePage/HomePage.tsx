import { Home } from "../../components";
import { isEmpty } from "lodash";
import { LoadingSpinner, useDeskproLatestAppContext } from "@deskpro/app-sdk";
import { Settings } from "../../types";
import { useSetTitle, useProfile, useRegisterElements } from "../../hooks";
import type { FC } from "react";

const HomePage: FC = () => {
  const { isLoading, profile, lists, campaigns } = useProfile();
  const { context } = useDeskproLatestAppContext<unknown, Settings>()

  useSetTitle("Klaviyo");

  useRegisterElements(({ registerElement }) => {
    registerElement("menu", {
      type: "menu",
      items: [{
        title: "Unlink profile",
        payload: { type: "unlink" },
      },
      ...(context?.settings.use_api_key !== true
        ? [
          {
            title: "Logout",
            payload: { type: "logout" },
          },
        ]
        : []),],
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
      <LoadingSpinner />
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
