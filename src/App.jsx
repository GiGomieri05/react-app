import { useState } from 'react';
import './App.css';

// components imports
import TodoList from './components/TodoList';
import ClickCounter from './components/ClickCounter';
import TicTacToe from './components/TicTacToe';
import Calculator from './components/Calculator';
import CepSearch from './components/CepSearch';

const tabs = [
  { id: 'todo',     label: 'To-Do List',       Component: TodoList },
  { id: 'counter',  label: 'Contador',         Component: ClickCounter },
  { id: 'tictactoe',label: 'Jogo da Velha',    Component: TicTacToe },
  { id: 'calc',     label: 'Calculadora',      Component: Calculator },
  { id: 'cep',      label: 'Buscador de CEP',  Component: CepSearch },
];

function App() {
  const [active, setActive] = useState('todo');
  const current = tabs.find(t => t.id === active);
  const { Component } = current;

  return (
    <div className="App">
      <header className="App-header">
        <h1>Aplicação Tarefa 06 no React!</h1>
        <nav className="tab-nav">
          {/* Adds tab buttons dynamically */}
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn ${tab.id === active ? 'active' : ''}`}
              onClick={() => setActive(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>
      
      <main className="tab-content">
          <Component />
      </main>
    </div>
  );
}

export default App;
