import { useState } from 'react';
import './App.css';

import TodoList from './components/TodoList';
import ClickCounter from './components/ClickCounter';
import TicTacToe from './components/TicTacToe';
import Calculator from './components/Calculator';
import CepSearch from './components/CepSearch';
import GroupInfo from './components/GroupInfo';

const tabs = [
  { id: 'todo',      label: 'To-Do List',      icon: 'fa-solid fa-list-check',     Component: TodoList },
  { id: 'counter',   label: 'Contador',        icon: 'fa-solid fa-computer-mouse', Component: ClickCounter },
  { id: 'tictactoe', label: 'Jogo da Velha',   icon: 'fa-solid fa-gamepad',        Component: TicTacToe },
  { id: 'calc',      label: 'Calculadora',     icon: 'fa-solid fa-calculator',     Component: Calculator },
  { id: 'cep',       label: 'Buscador de CEP', icon: 'fa-solid fa-map-pin',        Component: CepSearch },
];

function App() {
  const [active, setActive] = useState('todo');
  const [showInfo, setShowInfo] = useState(false);
  const current = tabs.find(t => t.id === active);
  const { Component } = current;

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-title-row">
          <h1 className="app-title">Aplicação Tarefa 06 no React!</h1>
          <button
            className="info-btn"
            onClick={() => setShowInfo(true)}
            aria-label="Informações do grupo"
          >
            <i className="fa-solid fa-circle-info"></i>
          </button>
        </div>

        <nav className="tab-nav">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-btn tab-btn--${tab.id} ${tab.id === active ? 'active' : ''}`}
              onClick={() => setActive(tab.id)}
            >
              <i className={tab.icon}></i>
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      <main className={`tab-content tab-content--${active}`}>
        <Component />
      </main>

      {showInfo && <GroupInfo onClose={() => setShowInfo(false)} />}
    </div>
  );
}

export default App;
