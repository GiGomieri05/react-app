import { useState } from 'react';

function Calculator() {
  const [display, setDisplay] = useState('0');
  const [anterior, setAnterior] = useState(null);
  const [operador, setOperador] = useState(null);
  const [limparDisplay, setLimparDisplay] = useState(false);

  function clickNumber(num) {
    if (display === '0' || limparDisplay) {
      setDisplay(num);
      setLimparDisplay(false);
    } else {
      setDisplay(display + num);
    }
  }

  function clickOperation(op) {
    setAnterior(parseFloat(display));
    setOperador(op);
    setLimparDisplay(true);
  }

  function calculate() {
    if (anterior === null || operador === null) return;

    const atual = parseFloat(display);
    const ops = {
      '+': anterior + atual,
      '-': anterior - atual,
      '*': anterior * atual,
      '/': atual !== 0 ? anterior / atual : 'Erro',
    };

    setDisplay(String(ops[operador]));
    setAnterior(null);
    setOperador(null);
    setLimparDisplay(true);
  }

  function clear() {
    setDisplay('0');
    setAnterior(null);
    setOperador(null);
    setLimparDisplay(false);
  }

  const btns = ['7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', 'C', '=', '+'];

  function handleBtn(btn) {
    if (btn === 'C') return clear();
    if (btn === '=') return calculate();
    if (['+', '-', '*', '/'].includes(btn)) return clickOperation(btn);
    clickNumber(btn);
  }

  return (
    <div style={{ display: 'inline-grid', gap: '6px' }}>
      <div style={{
        gridColumn: 'span 4', textAlign: 'right',
        fontSize: '28px', padding: '8px 12px',
        background: 'rgba(0,0,0,0.06)', borderRadius: '8px'
      }}>
        {display}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 64px)', gap: '6px' }}>
        {btns.map(btn => (
          <button key={btn} onClick={() => handleBtn(btn)}
            style={{ height: '56px', fontSize: '18px' }}>
            {btn}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Calculator;