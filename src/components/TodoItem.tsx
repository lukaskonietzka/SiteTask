import React, { Component } from "react";
import "../styles/todo-item.css";

interface TodoItemProps {
    id: string;
    text: string;
    done: boolean;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export default class TodoItem extends Component<TodoItemProps> {
    handleToggle = (): void => {
        this.props.onToggle(this.props.id);
    };

    handleDelete = (): void => {
        this.props.onDelete(this.props.id);
    };

    render() {
        const { text, done } = this.props;

        return (
            <div className={`todo-item ${done ? "done" : ""}`}>
                <label className="todo-label">
                    <input
                        type="checkbox"
                        checked={done}
                        onChange={this.handleToggle}
                    />
                    <span>{text}</span>
                </label>
                <button className="todo-delete" onClick={this.handleDelete}>
                    ✕
                </button>
            </div>
        );
    }
}
