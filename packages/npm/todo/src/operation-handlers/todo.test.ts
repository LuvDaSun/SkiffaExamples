import * as assert from "node:assert";
import test from "node:test";
import * as api from "todo-api";
import * as operationHandlers from "../operation-handlers.js";

test("todo test scenario", async () => {
  // Start the server once
  const server = new api.server.Server();

  // Register the operations
  server.registerOperations({
    listTodoItems: operationHandlers.ListTodoItems,
    addTodoItem: operationHandlers.addTodoItem,
    modifyTodoItem: operationHandlers.modifyTodoItem,
    deleteTodoItem: operationHandlers.deleteTodoItem,
    todoItemSetDone: operationHandlers.todoItemSetDone,
  });

  await using listener = await api.lib.listen(server);
  const baseUrl = new URL(`http://localhost:${listener.port}`);

  let createTodo: { id: number; description: string; done: boolean };

  await test("list (expect empty list)", async () => {
    const listTodo: { id: number; description: string; done: boolean }[] =
      await api.client.listTodoItems({ baseUrl });

    assert.deepEqual(listTodo, []);
  });

  await test("create a todo item", async () => {
    createTodo = await api.client.addTodoItem({ description: "Go to work" }, { baseUrl });
  });

  await test("list (expect 1 item in list)", async () => {
    const listTodo: { id: number; description: string; done: boolean }[] =
      await api.client.listTodoItems({ baseUrl });

    assert.equal(listTodo.length, 1);
    assert.equal(listTodo[0].description, "Go to work");
  });

  await test("update the todo item", async () => {
    const updatedTodo = "Go to the gym";

    await api.client.modifyTodoItem(
      { id: createTodo.id },
      { description: updatedTodo },
      { baseUrl },
    );
  });

  await test("list (expect 1 updated item in list)", async () => {
    const listTodo: { id: number; description: string; done: boolean }[] =
      await api.client.listTodoItems({ baseUrl });

    assert.equal(listTodo.length, 1);
    assert.equal(listTodo[0].description, "Go to the gym");
  });

  await test("set-done the todo item", async () => {
    await api.client.todoItemSetDone({ id: createTodo.id }, { baseUrl });
  });

  await test("list (expect 1 done item in list)", async () => {
    const listTodo: { id: number; description: string; done: boolean }[] =
      await api.client.listTodoItems({ baseUrl });

    assert.equal(listTodo.length, 1);
    assert.equal(listTodo[0].done, true);
  });

  await test("delete the todo item", async () => {
    await api.client.deleteTodoItem({ id: createTodo.id }, { baseUrl });
  });

  await test("list (expect empty list)", async () => {
    const listTodo: { id: number; description: string; done: boolean }[] =
      await api.client.listTodoItems({ baseUrl });

    assert.deepEqual(listTodo, []);
  });
});
