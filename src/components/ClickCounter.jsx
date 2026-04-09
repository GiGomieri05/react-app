import { useState } from 'react';

function ClickCounter() {
  const [count, setCount] = useState(0); // initial value: 0

  return (
    <div>
      <h2>Conta Clique</h2>
      <p> Me clicaram {count} vezes</p>
      <button onClick={() => setCount(count + 1)}>Clique aqui!</button>
    </div>
  );
}

export default ClickCounter;