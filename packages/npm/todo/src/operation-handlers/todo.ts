import * as api from "todo-api";

import { CommandHandlers } from "../commandHandlers/commandHandlers.js";
import CreateTodo from "../commands/createTodo.js";

export const addTodoOperationHandler: api.server.AddTodoItemOperationHandler<{}> = async (todo) => {
  const createTodoCommand = new CreateTodo(todo.description);
  const commandHandlers = new CommandHandlers();

  await commandHandlers.createTodo(createTodoCommand);

  // this should return the new todo item
  return {
    description: todo.description,
    done: false,
    id: 1,
  };
};
