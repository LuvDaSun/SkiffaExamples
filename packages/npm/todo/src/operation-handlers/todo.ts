import * as api from "todo-api";
import { todoService } from "../services/services.js";

const TodoService = new todoService();

export const ListTodoItems: api.server.ListTodoItemsOperationHandler<{}> = async () => {

  return await TodoService.listTodoItems();
};

export const addTodoItem: api.server.AddTodoItemOperationHandler<{}> = async (todo) => {
  const createdTodo = await TodoService.createTodo(todo.description);

  const todoItem = {
    description: createdTodo.todoName,
    id: createdTodo.todoId,
    done: createdTodo.todoIsDone,
  };

  return todoItem;
};

export const modifyTodoItem: api.server.ModifyTodoItemOperationHandler<{}> = async (todo) => {

  const updatedTodo = await TodoService.updateTodo(todo.id);

  const todoItem = {
    description: updatedTodo.todoName,
    id: updatedTodo.todoId,
    done: updatedTodo.todoIsDone,
  };
  return todoItem;
};

export const deleteTodoItem: api.server.DeleteTodoItemOperationHandler<{}> = async (todo) => {

  TodoService.deleteTodoItem(todo.id);
};

export const todoItemSetDone: api.server.TodoItemSetDoneOperationHandler<{}> = async (todo) => {

  const isDone = TodoService.markTodoAsDone(todo.id);

  const todoItem = {
    description: isDone.todoName,
    id: isDone.todoId,
    done: isDone.todoIsDone,
  };
  return todoItem;
};
