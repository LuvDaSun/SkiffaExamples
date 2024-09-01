//command handler for all commands
import * as todoApi from "todo-api";

const todos: Map<number, { todoName: string, todoId: number, todoIsDone: boolean }> = new Map()
export class CommandHandlers {


  async listTodoItems(): Promise<todoApi.types.TodoItem[]> {
    return Array.from(todos.values()).map((todo) => ({
      id: todo.todoId,
      description: todo.todoName,
      done: todo.todoIsDone,
    }));
  }


  async createTodo(  todoName: string ) {
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

    todos.set(todoId, todo);
    return todo;
  }

  async updateTodo( todoId: number ) {
     const todoToUpdate = todos.get(todoId)!;

    if (todos.has(todoId)) {
      if (todoToUpdate) {
        todoToUpdate.todoName = "Go to the gym";

        todos.set(todoId, todoToUpdate);
      }
    }
    return todoToUpdate;
  }

  deleteTodoItem( todoId: number ): void {
     const todoToDelete = todos.get(todoId);

    if (todos.has(todoId)) {
      if (todoToDelete) {
        todos.delete(todoId);
      }
    }
  }

  markTodoAsDone(todoId: number ) {
     const todoToMarkDone = todos.get(todoId)!;

    if (todos.has(todoId)) {
      if (todoToMarkDone) {
        todoToMarkDone.todoIsDone = true;
        todos.set(todoId, todoToMarkDone);
      }
    }

    return todoToMarkDone;
  }
}
