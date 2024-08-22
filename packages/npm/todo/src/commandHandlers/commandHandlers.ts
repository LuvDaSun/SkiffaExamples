//command handler for all commands

export const todos = new Map<number, { todoName: string; todoId: number; todoIsDone: boolean }>();
export class CommandHandlers {
  async createTodo(command: { todoName: string }) {
    //generate a unique id for each todo
    const generateId = (): number => {
      return Math.floor(100000 + Math.random() * 900000);
    };

    const todoId: number = generateId();
    const todoIsDone: boolean = false;

    //create the todo items
    const todo = {
      todoName: command.todoName,
      todoId,
      todoIsDone,
    };

    todos.set(todoId, todo);
    return todo;
  }

  async updateTodo(command: { todoId: number }) {
    const { todoId } = command; // Destructure from command
    const todoToUpdate = todos.get(todoId)!;

    if (todos.has(todoId)) {
      if (todoToUpdate) {
        todoToUpdate.todoName = "Go for camping";

        todos.set(todoId, todoToUpdate);
      }
    }
    return todoToUpdate;
  }

  async deleteTodoItem(command: { todoId: number }) {
    const { todoId } = command;
    const todoToDelete = todos.get(todoId);

    if (todos.has(todoId)) {
      if (todoToDelete) {
        todos.delete(todoId);
      }
    }
    return null;
  }
}
