import type { KlaviyoAPIError } from "./types";

export type InitData = {
  status: number,
  data: KlaviyoAPIError,
};

class KlaviyoError extends Error {
  status: number;
  data: KlaviyoAPIError;

  constructor({ status, data }: InitData) {
    const message = "KlaviyoError Api Error";
    super(message);

    this.data = data;
    this.status = status;
  }
}

export { KlaviyoError };
