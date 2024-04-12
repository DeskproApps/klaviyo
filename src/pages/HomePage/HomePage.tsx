import { LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle, useProfile, useRegisterElements } from "../../hooks";
import { Home } from "../../components";
import type { FC } from "react";

const HomePage: FC = () => {
  const { isLoading, profile, lists } = useProfile();

  useSetTitle("Klaviyo");

  useRegisterElements(({ registerElement }) => {
    registerElement("edit", {
      type: "edit_button",
      payload: { type: "changePage", path: "/profiles/update" },
    });
    registerElement("menu", {
      type: "menu",
      items: [{
        title: "Unlink profile",
        payload: { type: "unlink" },
      }],
    });
  });

  if (isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <Home profile={profile} lists={lists} />
  );
};

export { HomePage };
