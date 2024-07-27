import assert from "assert";
import test from "node:test";
import * as api from "reverse-api";
import * as operationHandlers from "../operation-handlers.js";

/**
 * test the reverse operation handler
 */
test("reverse", async () => {
  // create a new server
  const server = new api.server.Server();

  // register only one operation handler, the one we are testing
  server.registerReverseOperation(operationHandlers.reverse);

  // start listening on a random port
  await using listener = await api.lib.listen(server);

  // construct the url of the server
  const baseUrl = new URL(`http://localhost:${listener.port}`);

  // pass the value 123 to the operation handler
  const result = await api.client.reverse("123", { baseUrl });

  // we expect to get 321, the reverse of 123
  assert.equal(result, "321");
});
