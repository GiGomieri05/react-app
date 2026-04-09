import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim() === '') return;
    setTodos([...todos, inputValue.trim()]);
    setInputValue('');
  };

  const removeTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTodo();
  };

  return (
    <div className="todo">
      <h2 className="component-title">A fazeres</h2>
      <div className="todo-input-row">
        <input
          type="text"
          className="todo-input"
          value={inputValue}
          placeholder="Nova tarefa..."
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button className="todo-add-btn" onClick={addTodo}>Adicionar</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            <span>{todo}</span>
            <button className="todo-remove-btn" onClick={() => removeTodo(index)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
