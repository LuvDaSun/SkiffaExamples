import * as api from "todo-api";
import { CommandHandlers } from "../commandHandlers/commandHandlers.js";

import CreateTodo from "../commands/createTodo.js";
import updateTodo from "../commands/updateTodo.js";

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

export const modifyTodoItem: api.server.ModifyTodoItemOperationHandler<{}> = async (todo) => {
  const updateTodoCommand = new updateTodo(todo.id);
  const commandHandlers = new CommandHandlers();

 const updatedTodo = await commandHandlers.updateTodo(updateTodoCommand);

  const todoItem = {
    description: updatedTodo.todoName,
    id: updatedTodo.todoId,
    done: updatedTodo.todoIsDone,
  };
  return todoItem;
};


export const deleteTodoItem:api.server.DeleteTodoItemOperationHandler<{}>= async(todo)=>{

}