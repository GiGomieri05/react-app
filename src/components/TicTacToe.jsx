import { useState } from 'react';

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);

  const winner = calcularVencedor(board);

  function clicar(index) {
    if (board[index] || winner) return;

    const novoBoard = [...board];
    novoBoard[index] = isX ? 'X' : 'O';
    setBoard(novoBoard);
    setIsX(!isX);
  }

  function reiniciar() {
    setBoard(Array(9).fill(null));
    setIsX(true);
  }

  return (
    <div>
      <p>{winner ? `Vencedor: ${winner}` : `Vez de: ${isX ? 'X' : 'O'}`}</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 80px)', gap: '4px' }}>
        {board.map((valor, index) => (
          <button key={index} onClick={() => clicar(index)}
            style={{ height: '80px', fontSize: '28px' }}>
            {valor}
          </button>
        ))}
      </div>

      <button onClick={reiniciar}>Reiniciar</button>
    </div>
  );
}

function calcularVencedor(board) {
  const linhas = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // colunas
    [0, 4, 8], [2, 4, 6],             // diagonais
  ];

  for (const [a, b, c] of linhas) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export default TicTacToe;