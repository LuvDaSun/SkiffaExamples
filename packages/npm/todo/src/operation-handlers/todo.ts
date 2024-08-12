import * as api from "todo-api";
import { CommandHandlers } from "../commandHandlers/commandHandlers.js";
import CreateTodo from "../commands/createTodo.js";

export const addTodoItem: api.server.AddTodoItemOperationHandler<{}> = async (todo) => {
  const createTodoCommand = new CreateTodo(todo.description);
  const commandHandlers = new CommandHandlers();

  const createdTodo = await commandHandlers.createTodo(createTodoCommand);

  const todoItem = {
    description: createdTodo.todoName,
    id: createdTodo.todoId,
    done: createdTodo.todoIsDone,
  };

  return todoItem;
};
