import React, { useState } from "react";
import "../styles/add-todo-styles.css";

interface AddTodoProps {
    onAdd: (text: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ onAdd }) => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState("");

    const handleAdd = () => {
        if (!text.trim()) return;
        onAdd(text);
        setText("");
        setOpen(false);
    };

    return (
        <div className="add-todo-container">
            {open ? (
                <div className="add-todo-input-wrapper">
                    <input
                        type="text"
                        value={text}
                        onChange={e => setText(e.target.value)}
                        placeholder="Neue Aufgabe..."
                        className="add-todo-input"
                        autoFocus
                    />
                    <button
                        title="Hinzufügen"
                        className="add-todo-submit"
                        onClick={handleAdd}>
                        ✓
                    </button>
                    <button
                        title="Abbrechen"
                        className="add-todo-cancel"
                        onClick={() => setOpen(false)}>
                        ✕
                    </button>
                </div>
            ) : (
                <button
                    title="Neue Aufgabe hinzufügen"
                    className="add-todo-button"
                    onClick={() => setOpen(true)}>
                    +
                </button>
            )}
        </div>
    );
};

export default AddTodo;
