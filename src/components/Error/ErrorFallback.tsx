import { get } from "lodash";
import { Stack } from "@deskpro/deskpro-ui";
import { DEFAULT_ERROR } from "../../constants";
import { KlaviyoError } from "../../services/klaviyo";
import { Container, ErrorBlock } from "../common";
import { FallbackRender } from "@sentry/react";

const ErrorFallback: FallbackRender = ({ error }) => {
  let message = DEFAULT_ERROR;
  let consoleMessage;


  if (error instanceof KlaviyoError) {
    message = get(error, ["data", "errors", 0, "detail"])
      || get(error, ["data", "errors", 0, "title"])
      || get(error, ["data", "errors", 0, "code"]);
  }

  // eslint-disable-next-line no-console
  console.error(consoleMessage || error);

  return (
    <Container>
      <ErrorBlock
        text={(
          <Stack gap={6} vertical style={{ padding: "8px" }}>
            {message}
          </Stack>
        )}
      />
    </Container>
  );
};

export { ErrorFallback };
