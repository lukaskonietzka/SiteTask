import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { loadTodos, saveTodos } from "../services/storage";
import { v4 as uuidv4 } from "uuid";
import { defaultTodos } from "../data/defaultTodos";
import { Todo } from "../types/types";
import "../styles/todo-list.css";
import AddTodo from "./AddTodo";

interface TodoListProps {
    title?: string;
    subTitle?: string;
}

const defaultSubtitle =
    "Diese App speichert eine Todo-Liste im Browser." +
    "Wird der Cache geleert, so gehen alle Daten verloren.";

const TodoList: React.FC <TodoListProps> = (props: TodoListProps) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const stored = loadTodos();
        if (stored.length === 0) {
            saveTodos(defaultTodos);
            setTodos(defaultTodos);
        } else {
            setTodos(stored);
        }
    }, []);

    const addTodo = (text: string) => {
        if (!text.trim()) return;
        const updated = [...todos, { id: uuidv4(), text, done: false }];
        setTodos(updated);
        saveTodos(updated);
    };

    const toggleTodo = (id: string) => {
        const updated = todos.map(t => (t.id === id ? { ...t, done: !t.done } : t));
        setTodos(updated);
        saveTodos(updated);
    };

    const deleteTodo = (id: string) => {
        const updated = todos.filter(t => t.id !== id);
        setTodos(updated);
        saveTodos(updated);
    };

    return (
        <div className="todo-container">
            <h1 className="todo-title">{props.title ? props.title : '📝 Zu erledigen...'}</h1>

            <div className="todo-list">
                {todos.map(todo => (
                    <TodoItem
                        key={todo.id}
                        {...todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                    />
                ))}
            </div>

            <p className="todo-footer">
                {props.subTitle ? props.subTitle : defaultSubtitle}
            </p>
            <AddTodo onAdd={addTodo} />
        </div>
    );
};

export default TodoList;
