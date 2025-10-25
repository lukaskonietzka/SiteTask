export interface Todo {
    id: string;
    text: string;
    category?: string;
    done: boolean;
}

export interface UserTodos {
    name: string;
    todos: Todo[];
}

export interface TodosFile {
    [userId: string]: UserTodos;
}
