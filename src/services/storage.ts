import { v4 as uuidv4 } from "uuid";

export const getUserId = (): string => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
        userId = uuidv4();
        localStorage.setItem("userId", userId);
    }
    return userId;
};

export const loadTodos = (): any[] => {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
};

export const saveTodos = (todos: any[]): void => {
    localStorage.setItem("todos", JSON.stringify(todos));
};
