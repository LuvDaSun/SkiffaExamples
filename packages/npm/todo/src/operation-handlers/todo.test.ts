import * as assert from "node:assert";
import test from "node:test";
import * as api from "todo-api";
import * as addTodoOperationHandler from "./todo.js";

test("create todo", async (t) => {
  const server = new api.server.Server();
  server.registerAddTodoItemOperation(addTodoOperationHandler.addTodoItem);
  await using listener = await api.lib.listen(server);
  const baseUrl = new URL(`http://localhost:${listener.port}`);

  const result = await api.client.addTodoItem({ description: "Wash clothes" }, { baseUrl });

  // Log the result to see what's returned
  console.log("Returned result:", result);

  // Check if the result matches the expected format
  assert.equal(result.description, "Wash clothes");
  assert.equal(result.done, false);
  assert.equal(typeof result.id, "number");
});
