// TodoWrapper.jsx
import React, { useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import Todo from './todo';
import TodoForm from './todoform';

const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

useEffect(() => {
  const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
  if (storedTodos.length > 0) {
    // Use todos from localStorage if available
    setTodos(storedTodos);
  }
  // No need for an else block; the state will remain [] if localStorage is empty
}, []);
;
  
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log('Saved Todos:', todos);
  }, [todos]);
  
  const addTodo = (todo) => {
    setTodos([
      ...todos,
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const toggleEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  };

  const updateTodo = (id, updatedTask) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, task: updatedTask, isEditing: false }
          : todo
      )
    );
  };

  const toggleCompleted = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className='TodoWrapper'>
      <TodoForm  addTodo={addTodo} />
      {todos.map((todo) => (
        <Todo
          key={todo.id}
          task={todo}
          onDelete={() => deleteTodo(todo.id)}
          onEdit={() => toggleEdit(todo.id)}
          onUpdate={(updatedTask) => updateTodo(todo.id, updatedTask)}
          onToggleCompleted={() => toggleCompleted(todo.id)}
        />
      ))}
    </div>
  );
};

export default TodoWrapper;
