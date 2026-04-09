import { useState } from 'react';

function ClickCounter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <h2 className="component-title">Conta Clique</h2>
      <p className="counter-display">Me clicaram <span className="counter-number">{count}</span> vezes</p>
      <button className="counter-btn" onClick={() => setCount(count + 1)}>Clique aqui!</button>
      <button className="counter-reset-btn" onClick={() => setCount(0)}>Resetar</button>
    </div>
  );
}

export default ClickCounter;
