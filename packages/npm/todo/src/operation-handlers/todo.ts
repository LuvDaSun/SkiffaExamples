import * as api from "todo-api";
import { CommandHandlers } from "../commandHandlers/commandHandlers.js";

export const ListTodoItems: api.server.ListTodoItemsOperationHandler<{}> = async () => {
  const commandHandler = new CommandHandlers();
  return await commandHandler.listTodoItems();
};

export const addTodoItem: api.server.AddTodoItemOperationHandler<{}> = async (todo) => {
   const commandHandlers = new CommandHandlers();

  const createdTodo = await commandHandlers.createTodo(todo.description);

  const todoItem = {
    description: createdTodo.todoName,
    id: createdTodo.todoId,
    done: createdTodo.todoIsDone,
  };

  return todoItem;
};

export const modifyTodoItem: api.server.ModifyTodoItemOperationHandler<{}> = async (todo) => {
   const commandHandlers = new CommandHandlers();

  const updatedTodo = await commandHandlers.updateTodo(todo.id);

  const todoItem = {
    description: updatedTodo.todoName,
    id: updatedTodo.todoId,
    done: updatedTodo.todoIsDone,
  };
  return todoItem;
};

export const deleteTodoItem: api.server.DeleteTodoItemOperationHandler<{}> = async (todo) => {
   const deleteTodoHandler = new CommandHandlers();

  deleteTodoHandler.deleteTodoItem(todo.id);
};

export const todoItemSetDone: api.server.TodoItemSetDoneOperationHandler<{}> = async (todo) => {
   const isDoneHandler = new CommandHandlers();

  const isDone = isDoneHandler.markTodoAsDone(todo.id);

  const todoItem = {
    description: isDone.todoName,
    id: isDone.todoId,
    done: isDone.todoIsDone,
  };
  return todoItem;
};
