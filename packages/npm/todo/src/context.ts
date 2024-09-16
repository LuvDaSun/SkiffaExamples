import { TodoService } from "./services.js";

export interface Context {
  todo: TodoService;
}

export const createContext = (): Context => {
  const todo = new TodoService();

  return {
    todo,
  };
};
