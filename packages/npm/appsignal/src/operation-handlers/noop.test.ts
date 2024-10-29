import test from "node:test";
import * as api from "noop-api";
import * as operationHandlers from "../operation-handlers.js";

test("noop", async () => {
  const server = new api.server.Server();
  server.registerNoopOperation(operationHandlers.noop);

  await using listener = await api.lib.listen(server);

  const baseUrl = new URL(`http://localhost:${listener.port}`);

  await api.client.noop({ baseUrl });
});
