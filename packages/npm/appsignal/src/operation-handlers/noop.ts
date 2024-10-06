import { second } from "msecs";
import * as api from "noop-api";
import timers from "timers/promises";

export const noop: api.server.NoopOperationHandler<{}> = async () => {
  await timers.setTimeout(2 * second);
};
