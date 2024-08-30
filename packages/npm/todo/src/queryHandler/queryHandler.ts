import { TodoItem } from "../../../../../generated/npm/todo-api/typed/types.js";
import { todos } from "../commandHandlers/commandHandlers.js";
export class QueryHandler {
  async listTodoItems(): Promise<TodoItem[]> {
    return Array.from(todos.values()).map((todo) => ({
      id: todo.todoId,
      description: todo.todoName,
      done: todo.todoIsDone,
    }));
  }
}