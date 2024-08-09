//command handler for all commands

export class CommandHandlers {
  private todos: Map<number, { todoName: string; todoId: number; todoIsDone: boolean }> = new Map();

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

    this.todos.set(todoId, todo);
  }
}
