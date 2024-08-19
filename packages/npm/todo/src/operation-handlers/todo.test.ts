import * as assert from "node:assert";
import test from "node:test";
import * as api from "todo-api";
import * as TodoOperationHandler from "./todo.js";

test("create todo", async () => {
  const server = new api.server.Server();
  server.registerAddTodoItemOperation(TodoOperationHandler.addTodoItem);
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

test("update todo", async () => {
  const server = new api.server.Server();
  server.registerAddTodoItemOperation(TodoOperationHandler.addTodoItem);
  server.registerModifyTodoItemOperation(TodoOperationHandler.modifyTodoItem); // Register the update operation
  await using listener = await api.lib.listen(server);
  const baseUrl = new URL(`http://localhost:${listener.port}`);

  // First, create a todo item to update
  const createdResult = await api.client.addTodoItem({ description: "InitialTodo " }, { baseUrl });
  const todoId = createdResult.id;

  const result = await api.client.modifyTodoItem({ id: todoId }, { description: "Eat Rice" }, { baseUrl });  

  // Log the result to see what's returned
  console.log("Returned result:", result);

  // Check if the result matches the expected format
  assert.equal(result.description, "Eat Rice");  
  assert.equal(result.done, false);
  assert.equal(typeof result.id, "number");
});
