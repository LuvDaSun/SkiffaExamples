import { todos } from "../commandHandlers/commandHandlers.js";

export class QueryHandler {
  async listTodoItems(command: { todoName: string[] }) {
    // Initialize command.todoName if it hasn't been initialized
    command.todoName = command.todoName || [];

    todos.forEach((todo) => {
      command.todoName.push(todo.todoName);
    });

    return command.todoName;
  }
}
