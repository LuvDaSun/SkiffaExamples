import assert from "assert";
import test from "node:test";
import * as api from "reverse-api";
import * as operationHandlers from "../operation-handlers/index.js";

test("reverse", async () => {
  const server = new api.Server();

  // register only one operation handler
  server.registerReverseOperation(operationHandlers.reverse);

  await using listener = await api.lib.listen(server);

  const result = await api.reverse(
    {
      contentType: "text/plain",
      value: () => "123",
    },
    {},
    { baseUrl: new URL(`http://localhost:${listener.port}`) },
  );

  assert(result.status === 200);

  const resultValue = await result.value();

  assert.equal(resultValue, "321");
});
