import { useState } from 'react';
import './App.css';

import TodoList from './components/TodoList';
import ClickCounter from './components/ClickCounter';
import TicTacToe from './components/TicTacToe';
import Calculator from './components/Calculator';
import CepSearch from './components/CepSearch';

const tabs = [
  { id: 'todo',      label: 'To-Do List',      Component: TodoList },
  { id: 'counter',   label: 'Contador',        Component: ClickCounter },
  { id: 'tictactoe', label: 'Jogo da Velha',   Component: TicTacToe },
  { id: 'calc',      label: 'Calculadora',     Component: Calculator },
  { id: 'cep',       label: 'Buscador de CEP', Component: CepSearch },
];

function App() {
  const [active, setActive] = useState('todo');
  const current = tabs.find(t => t.id === active);
  const { Component } = current;

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Aplicação Tarefa 06 no React!</h1>
        <nav className="tab-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn tab-btn--${tab.id} ${tab.id === active ? 'active' : ''}`}
              onClick={() => setActive(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      <main className={`tab-content tab-content--${active}`}>
        <Component />
      </main>
    </div>
  );
}

export default App;
