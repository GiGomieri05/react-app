import { useState } from 'react';

function ClickCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <h2 className="component-title">Conta Clique</h2>

      <div className="counter-display">
        <span className="counter-label-top">Me clicaram</span>
        <span className="counter-number">{count}</span>
        <span className="counter-label-bottom">vezes</span>
      </div>

      <button className="counter-btn" onClick={() => setCount(count + 1)}>
        <i className="fa-solid fa-computer-mouse"></i>
        Clique aqui!
      </button>

      <button className="counter-reset-btn" onClick={() => setCount(0)}>
        <i className="fa-solid fa-rotate-left"></i>
        Resetar
      </button>
    </div>
  );
}

export default ClickCounter;
