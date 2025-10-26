import React, { useState, KeyboardEvent } from "react";
import "../styles/add-todo.css";

interface AddTodoProps {
    category: string;
    onAdd: (category: string, text: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ category, onAdd }) => {
    const [text, setText] = useState("");

    const handleAdd = (): void => {
        const trimmed: string = text.trim();
        if (!trimmed) return;
        onAdd(category, trimmed);
        setText("");
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === "Enter") handleAdd();
    };

    return (
        <div className="todo-add-inline">
            <input
                type="text"
                className="todo-input-inline"
                placeholder={`Neues Todo in ${category}`}
                value={text}
                onChange={e => setText(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button className="todo-add-btn" onClick={handleAdd}>
                +
            </button>
        </div>
    );
};

export default AddTodo;
