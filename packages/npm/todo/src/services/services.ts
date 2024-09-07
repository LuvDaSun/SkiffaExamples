//command handler for all commands
import * as todoApi from "todo-api";

export class todoService {

  private todos: Map<number, { todoName: string, todoId: number, todoIsDone: boolean }> = new Map();

  async listTodoItems(): Promise<todoApi.types.TodoItem[]> {
    return Array.from(this.todos.values()).map((todo) => ({
      id: todo.todoId,
      description: todo.todoName,
      done: todo.todoIsDone,
    }));
  }


  async createTodo(todoName: string) {
    //generate a unique id for each todo
    const generateId = (): number => {
      return Math.floor(100000 + Math.random() * 900000);
    };

    const todoId: number = generateId();
    const todoIsDone: boolean = false;

    //create the todo items
    const todo = {
      todoName: todoName,
      todoId,
      todoIsDone,
    };

    this.todos.set(todoId, todo);
    return todo;
  }

  async updateTodo(todoId: number) {
    const todoToUpdate = this.todos.get(todoId)!;

    if (this.todos.has(todoId)) {
      if (todoToUpdate) {
        todoToUpdate.todoName = "Go to the gym";

        this.todos.set(todoId, todoToUpdate);
      }
    }
    return todoToUpdate;
  }

  deleteTodoItem(todoId: number): void {
    const todoToDelete = this.todos.get(todoId);

    if (this.todos.has(todoId)) {
      if (todoToDelete) {
        this.todos.delete(todoId);
      }
    }
  }

  markTodoAsDone(todoId: number) {
    const todoToMarkDone = this.todos.get(todoId)!;

    if (this.todos.has(todoId)) {
      if (todoToMarkDone) {
        todoToMarkDone.todoIsDone = true;
        this.todos.set(todoId, todoToMarkDone);
      }
    }

    return todoToMarkDone;
  }
}
