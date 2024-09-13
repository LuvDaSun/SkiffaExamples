import { todoService } from "./services/services.js";

export interface Context {
    todo: todoService
}


export const createContext = (): Context => {
    const TodoService = new todoService()

    return {
        todo: TodoService
    }
}