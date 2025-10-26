import React, { useState } from "react";
import "../styles/add-category.css";

interface AddCategoryProps {
    onAdd: (category: string) => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ onAdd }: AddCategoryProps) => {
    const [open, setOpen] = useState(false);
    const [categoryName, setCategoryName] = useState("");

    const handleAdd = (): void => {
        if (!categoryName.trim()) return;
        onAdd(categoryName.trim());
        setCategoryName("");
        setOpen(false);
    };

    return (
        <div className="add-category-container">
            {open && (
                <div className="add-category-input-wrapper">
                    <input
                        type="text"
                        value={categoryName}
                        onChange={e => setCategoryName(e.target.value)}
                        placeholder="Neue Kategorie..."
                        className="add-category-input"
                        autoFocus
                        onKeyDown={e => e.key === "Enter" && handleAdd()}
                    />
                    <button
                        title="Kategorie hinzufügen"
                        className="add-category-submit"
                        onClick={handleAdd}>
                        ✓
                    </button>
                    <button
                        title="Abbrechen"
                        className="add-category-cancel"
                        onClick={(): void => setOpen(false)}>
                        ✕
                    </button>
                </div>
            )}

            <button
                title="Neue Kategorie hinzufügen"
                className="add-category-button"
                onClick={(): void => setOpen(!open)}>
                +
            </button>
        </div>
    );
};

export default AddCategory;
