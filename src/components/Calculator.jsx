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

  function getBtnClass(btn) {
    if (btn === '=') return 'calc-btn calc-btn--equal';
    if (btn === 'C') return 'calc-btn calc-btn--clear';
    if (['+', '-', '*', '/'].includes(btn)) return 'calc-btn calc-btn--op';
    return 'calc-btn';
  }

  const labels = { '*': '×', '/': '÷', '-': '−' };

  return (
    <div className="calculator">
      <h2 className="component-title">Calculadora</h2>
      <div className="calc-display">{display}</div>
      <div className="calc-grid">
        {btns.map((btn, index) => (
          <button key={index} className={getBtnClass(btn)} onClick={() => handleBtn(btn)}>
            {labels[btn] || btn}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Calculator;
