import { useSetTitle, useRegisterElements } from "../../hooks";
import type { FC } from "react";

const HomePage: FC = () => {
  useSetTitle("Klaviyo");

  useRegisterElements(({ registerElement }) => {
    registerElement("menu", {
      type: "menu",
      items: [{
        title: "Unlink profile",
        payload: { type: "unlink" },
      }],
    });
  });

  return (
    <>HomePage</>
  );
};

export { HomePage };
