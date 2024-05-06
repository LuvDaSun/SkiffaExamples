import assert from "assert";
import test from "node:test";
import * as api from "reverse-api";
import * as operationHandlers from "../operation-handlers/index.js";

/**
 * test the reverse operation handler
 */
test("reverse", async () => {
  // create a new server
  const server = new api.Server();

  // register only one operation handler, the one we are testing
  server.registerReverseOperation(operationHandlers.reverse);

  // start listening on a random port
  await using listener = await api.lib.listen(server);

  // construct the url of the server
  const baseUrl = new URL(`http://localhost:${listener.port}`);

  // pass the value 123 to the operation handler
  const result = await api.reverse(
    {
      contentType: "text/plain",
      value: () => "123",
    },
    {},
    { baseUrl },
  );

  // status should be 200
  assert(result.status === 200);

  // collect the result
  const resultValue = await result.value();

  // we expect to get 321, the reverse of 123
  assert.equal(resultValue, "321");
});
