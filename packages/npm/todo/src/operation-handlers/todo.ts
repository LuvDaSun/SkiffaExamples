import * as api from "todo-api";
import { Context } from "../context.js";

export const ListTodoItems =
  (context: Context): api.server.ListTodoItemsOperationHandler<{}> =>
  async () => {
    return await context.todo.listTodoItems();
  };

export const addTodoItem =
  (context: Context): api.server.AddTodoItemOperationHandler<{}> =>
  async (todo) => {
    const createdTodo = await context.todo.createTodo(todo.description);

    const todoItem = {
      description: createdTodo.todoName,
      id: createdTodo.todoId,
      done: createdTodo.todoIsDone,
    };

    return todoItem;
  };

export const modifyTodoItem =
  (context: Context): api.server.ModifyTodoItemOperationHandler<{}> =>
  async (todo) => {
    const updatedTodo = await context.todo.updateTodo(todo.id);

    const todoItem = {
      description: updatedTodo.todoName,
      id: updatedTodo.todoId,
      done: updatedTodo.todoIsDone,
    };
    return todoItem;
  };

export const deleteTodoItem =
  (context: Context): api.server.DeleteTodoItemOperationHandler<{}> =>
  async (todo) => {
    context.todo.deleteTodoItem(todo.id);
  };

export const todoItemSetDone =
  (context: Context): api.server.TodoItemSetDoneOperationHandler<{}> =>
  async (todo) => {
    const isDone = context.todo.markTodoAsDone(todo.id);

    const todoItem = {
      description: isDone.todoName,
      id: isDone.todoId,
      done: isDone.todoIsDone,
    };
    return todoItem;
  };
