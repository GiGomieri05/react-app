import { useState } from 'react';
import './App.css';

// components imports
import TodoList from './components/TodoList';
import ClickCounter from './components/ClickCounter';
import TicTacToe from './components/TicTacToe';
import Calculator from './components/Calculator';
import CepSearch from './components/CepSearch';

const tabs = [
  { id: 'todo',     label: 'To-Do List',      color: '#EEEDFE', Component: TodoList },
  { id: 'counter',  label: 'Contador',         color: '#E1F5EE', Component: ClickCounter },
  { id: 'tictactoe',label: 'Jogo da Velha',    color: '#FAECE7', Component: TicTacToe },
  { id: 'calc',     label: 'Calculadora',      color: '#FAEEDA', Component: Calculator },
  { id: 'cep',      label: 'Buscador de CEP',  color: '#E6F1FB', Component: CepSearch },
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
      
      <main className="tab-content" style={{ background: current.color }}>
          <Component />
      </main>
    </div>
  );
}

export default App;
