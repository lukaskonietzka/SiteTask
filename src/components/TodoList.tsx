import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { loadTodos, saveTodos } from "../services/storage";
import { v4 as uuidv4 } from "uuid";
import { defaultTodos } from "../data/defaultTodos";
import { Todo } from "../types/types";
import "../styles/todo-list.css";
import AddCategory from "./AddCategory";
import AddTodo from "./AddTodo";

interface TodoListProps {
    title?: string;
    subTitle?: string;
}

const defaultSubtitle: string =
    "Diese App speichert eine Todo-Liste im Browser. Wird der Cache geleert, so gehen alle Daten verloren.";

const TodoList: React.FC<TodoListProps> = (props: TodoListProps) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect((): void => {
        const stored = loadTodos();
        if (stored.length === 0) {
            saveTodos(defaultTodos);
            setTodos(defaultTodos);
        } else {
            setTodos(stored);
        }
    }, []);

    const addCategory = (category: string): void => {
        const exists = todos.some(t => t.category === category);
        if (exists) return;

        const newCategory: Todo = {
            id: uuidv4(),
            text: "",
            category,
            done: false,
        };

        const updated: Todo[] = [...todos, newCategory];
        setTodos(updated);
        saveTodos(updated);
    };

    const addTodo = (category: string, text: string): void => {
        const trimmed: string = text.trim();
        if (!trimmed) return;

        const newTodo: Todo = {
            id: uuidv4(),
            text: trimmed,
            category,
            done: false,
        };

        const updated: Todo[] = [...todos, newTodo];
        setTodos(updated);
        saveTodos(updated);
    };

    const toggleTodo = (id: string): void => {
        const updated: Todo[] = todos.map(t =>
            t.id === id ? { ...t, done: !t.done } : t
        );
        setTodos(updated);
        saveTodos(updated);
    };

    const deleteTodo = (id: string): void => {
        const updated: Todo[] = todos.filter(t => t.id !== id);
        setTodos(updated);
        saveTodos(updated);
    };

    const categories: string[] = todos.reduce<string[]>((acc, todo) => {
        const category = (todo as any).category ?? "Unkategorisiert";
        if (!acc.includes(category)) acc.push(category);
        return acc;
    }, []);

    return (
        <div className="todo-container">
            <h1 className="todo-title">
                {props.title ? props.title : "📝 Zu erledigen..."}
            </h1>

            <div className="todo-grid">
                {categories.map(category => (
                    <div key={category} className="todo-card">
                        <h2 className="todo-card-title">{category}</h2>

                        <div className="todo-list">
                            {todos
                                .filter(todo => (todo.category ?? "Unkategorisiert") === category)
                                .map(todo => (
                                    <TodoItem
                                        key={todo.id}
                                        {...todo}
                                        onToggle={toggleTodo}
                                        onDelete={deleteTodo}
                                    />
                                ))}
                        </div>
                        <AddTodo
                            category={category}
                            onAdd={(cat, text) => addTodo(cat, text)}
                        />
                    </div>
                ))}
            </div>

            <p className="todo-footer">
                {props.subTitle ? props.subTitle : defaultSubtitle}
            </p>
            <AddCategory onAdd={addCategory} />
        </div>
    );
};

export default TodoList;
