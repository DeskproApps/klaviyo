import { Routes, Route, useNavigate } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { match } from "ts-pattern";
import {
  LoadingSpinner,
  useDeskproElements,
  useDeskproAppClient,
  useDeskproAppEvents,
} from "@deskpro/app-sdk";
import { useUnlinkProfile } from "./hooks";
import { isNavigatePayload } from "./utils";
import { ErrorFallback } from "./components";
import {
  HomePage,
  LoadingAppPage,
  LinkProfilePage,
  CreateProfilePage,
  UpdateProfilePage,
  VerifySettingsPage,
} from "./pages";
import type { FC } from "react";
import type { EventPayload } from "./types";
import { ErrorBoundary } from "@sentry/react";

const App: FC = () => {
  const navigate = useNavigate();
  const { client } = useDeskproAppClient();
  const { unlink, isLoading } = useUnlinkProfile();

  useDeskproElements(({ registerElement }) => {
    registerElement("refresh", { type: "refresh_button" });
  });

  const debounceElementEvent = useDebouncedCallback((_, __, payload: EventPayload) => {
    return match(payload.type)
      .with("changePage", () => isNavigatePayload(payload) && navigate(payload.path))
      .with("unlink", unlink)
      .run();
  }, 500);

  useDeskproAppEvents({
    onShow: () => {
      client && setTimeout(() => client.resize(), 200);
    },
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    onElementEvent: debounceElementEvent,
  }, [client]);

  if (!client || isLoading) {
    return (
      <LoadingSpinner/>
    );
  }

  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <Routes>
        <Route path="/admin/verify_settings" element={<VerifySettingsPage/>} />
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/profiles/link" element={<LinkProfilePage/>} />
        <Route path="/profiles/create" element={<CreateProfilePage/>} />
        <Route path="/profiles/update" element={<UpdateProfilePage/>} />
        <Route index element={<LoadingAppPage/>} />
      </Routes>
    </ErrorBoundary>
  );
};

export { App };
