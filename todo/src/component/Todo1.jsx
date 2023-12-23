import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const stringToColor = (str) => {
  // Simple hash function to convert a string to a color
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = Math.abs(hash).toString(16).substring(0, 6);
  return `#${"0".repeat(6 - color.length)}${color}`;
};

const Todo = ({ task, onDelete, onEdit, onUpdate, onToggleCompleted }) => {
  const { id, task: taskText, completed, isEditing } = task;
  const [updatedTask, setUpdatedTask] = useState(taskText);
  const backgroundColor = stringToColor(taskText);

  const todoStyle = {
    background: completed ? '#8758ff' : backgroundColor,
    color: "#fff",
    padding: "0.75rem 1rem",
    borderRadius: "5px",
    marginBottom: "1rem",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const handleEdit = () => {
    if (!completed) {
      onEdit();
      if (!isEditing) {
        setUpdatedTask(taskText);
      }
    }
  };

  const handleUpdate = () => {
    onUpdate(updatedTask);
  };

  const handleChange = (e) => {
    setUpdatedTask(e.target.value);
  };

  return (
    <div className="Todo" style={todoStyle}>
      <div>
        <input
          type="checkbox"
          checked={completed}
          onChange={() => onToggleCompleted(id)}
        />
        {isEditing ? (
          <>
            <input
              type="text"
              value={updatedTask}
              onChange={handleChange}
              className="todo-input"
            />
            <button className="update-btn" onClick={handleUpdate}>
              Update
            </button>
          </>
        ) : (
          <p onClick={onToggleCompleted}>{taskText}</p>
        )}
      </div>
      <div>
        <FontAwesomeIcon
          className="edit-icon"
          icon={faPenToSquare}
          onClick={handleEdit}
          style={{ cursor: completed ? "not-allowed" : "pointer" }}
        />
        <FontAwesomeIcon className="delete-icon" icon={faTrash} onClick={onDelete} />
      </div>
    </div>
  );
};

export default Todo;
