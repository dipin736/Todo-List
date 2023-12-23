// TodoForm.jsx
import React, { useState } from 'react';

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(value);
    setValue('');
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className='TodoForm'>
      <h1>What's the plan for today</h1>
      <input
        type='text'
        value={value}
        onChange={handleChange}
        className='todo-input'
        placeholder='What is the task today?'
      />
      <button type='submit' className='shadow__btn'>
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
