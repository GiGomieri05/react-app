import { useState, useEffect, useRef } from 'react';

function pad(n) {
  return String(n).padStart(2, '0');
}

function Stopwatch() {
  const [ms, setMs] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => setMs(prev => prev + 10), 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  function handleStartStop() {
    setRunning(r => !r);
  }

  function handleReset() {
    setRunning(false);
    setMs(0);
    setLaps([]);
  }

  function handleLap() {
    if (!running) return;
    setLaps(prev => [ms, ...prev]);
  }

  const hours   = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const centis  = Math.floor((ms % 1000) / 10);

  return (
    <div className="stopwatch">
      <h2 className="component-title">Cronômetro</h2>

      <div className="stopwatch-display">
        {hours > 0 && <span>{pad(hours)}:</span>}
        <span>{pad(minutes)}:</span>
        <span>{pad(seconds)}</span>
        <span className="stopwatch-centis">.{pad(centis)}</span>
      </div>

      <div className="stopwatch-controls">
        <button
          className={`stopwatch-btn stopwatch-btn--main ${running ? 'stopwatch-btn--pause' : 'stopwatch-btn--start'}`}
          onClick={handleStartStop}
        >
          <i className={`fa-solid ${running ? 'fa-pause' : 'fa-play'}`}></i>
          {running ? 'Pausar' : 'Iniciar'}
        </button>

        <button
          className="stopwatch-btn stopwatch-btn--lap"
          onClick={handleLap}
          disabled={!running}
        >
          <i className="fa-solid fa-flag"></i>
          Volta
        </button>

        <button
          className="stopwatch-btn stopwatch-btn--reset"
          onClick={handleReset}
          disabled={running}
        >
          <i className="fa-solid fa-rotate-left"></i>
          Resetar
        </button>
      </div>

      {laps.length > 0 && (
        <ul className="stopwatch-laps">
          {laps.map((lapMs, i) => {
            const lh = Math.floor(lapMs / 3600000);
            const lm = Math.floor((lapMs % 3600000) / 60000);
            const ls = Math.floor((lapMs % 60000) / 1000);
            const lc = Math.floor((lapMs % 1000) / 10);
            const label = lh > 0
              ? `${pad(lh)}:${pad(lm)}:${pad(ls)}.${pad(lc)}`
              : `${pad(lm)}:${pad(ls)}.${pad(lc)}`;
            return (
              <li key={i} className="stopwatch-lap-item">
                <span className="stopwatch-lap-index">#{laps.length - i}</span>
                <span className="stopwatch-lap-time">{label}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export default Stopwatch;
