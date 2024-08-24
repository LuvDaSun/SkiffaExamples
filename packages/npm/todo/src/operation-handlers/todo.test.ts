import * as assert from "node:assert";
import test from "node:test";
import * as api from "todo-api";
import * as operationHandlers from "../operation-handlers.js";
import * as TodoOperationHandler from "./todo.js";

test("todo test scenario", async () => {
  const server = new api.server.Server();
  server.registerOperations(operationHandlers);

  test("list", async () => {
    // expect empty list
  });

  test("create", async () => {
    //
  });

  test("list", async () => {
    // expect 1 item in list
  });

  test("update", async () => {
    //
  });

  test("list", async () => {
    // expect 1 updated item in list
  });

  test("set-done", async () => {
    //
  });

  test("list", async () => {
    // expect 1 updated item in list
  });

  test("delete", async () => {
    //
  });

  test("list", async () => {
    // expect empty list
  });
});

test.skip("create todo", async () => {
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

test.skip("update todo", async () => {
  const server = new api.server.Server();
  server.registerAddTodoItemOperation(TodoOperationHandler.addTodoItem);
  server.registerModifyTodoItemOperation(TodoOperationHandler.modifyTodoItem); // Register the update operation
  await using listener = await api.lib.listen(server);
  const baseUrl = new URL(`http://localhost:${listener.port}`);

  // First, create a todo item to update
  const createdResult = await api.client.addTodoItem({ description: "InitialTodo " }, { baseUrl });
  const todoId = createdResult.id;

  const result = await api.client.modifyTodoItem(
    { id: todoId },
    { description: "Eat Rice" },
    { baseUrl },
  );

  // Log the result to see what's returned
  console.log("Returned result:", result);

  // Check if the result matches the expected format
  assert.equal(result.description, "Eat Rice");
  assert.equal(result.done, false);
  assert.equal(typeof result.id, "number");
});

test.skip("List todo", async () => {
  const server = new api.server.Server();
  server.registerAddTodoItemOperation(TodoOperationHandler.addTodoItem);
  server.registerListTodoItemsOperation(TodoOperationHandler.listTodoItem); // Register the update operation
  await using listener = await api.lib.listen(server);
  const baseUrl = new URL(`http://localhost:${listener.port}`);

  // First, create a todo item to update
  const createdResult = await api.client.addTodoItem({ description: "InitialTodo " }, { baseUrl });
  const description = createdResult.description;

  const result = await api.client.listTodoItems({ description: description });

  // Log the result to see what's returned
  console.log("Returned result:", result);

  // Check if the result matches the expected format
  assert.equal(typeof result, "string");
});

test.skip("delete todo", async () => {
  const server = new api.server.Server();
  server.registerAddTodoItemOperation(TodoOperationHandler.addTodoItem);
  server.registerDeleteTodoItemOperation(TodoOperationHandler.deleteTodoItem); // Register the update operation
  await using listener = await api.lib.listen(server);
  const baseUrl = new URL(`http://localhost:${listener.port}`);

  // First, create a todo item to update
  const createdResult = await api.client.addTodoItem({ description: "InitialTodo " }, { baseUrl });
  const todoId = createdResult.id;

  const result = await api.client.deleteTodoItem({ id: todoId }, { baseUrl });

  // Log the result to see what's returned
  console.log("Returned result:", result);

  // Check if the result matches the expected format
  assert.equal(typeof result !== "object", true);
});
