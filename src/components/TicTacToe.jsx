import { useState } from 'react';

function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isX, setIsX] = useState(true);

  const winner = calcularVencedor(board);
  const empate = !winner && board.every(cell => cell !== null);

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

  function getStatus() {
    if (winner) return `Vencedor: ${winner}`;
    if (empate) return 'Empate!';
    return `Vez de: ${isX ? 'X' : 'O'}`;
  }

  return (
    <div className="tictactoe">
      <h2 className="component-title">Jogo da Velha</h2>
      <p className="tictactoe-status">{getStatus()}</p>

      <div className="tictactoe-board">
        {board.map((valor, index) => (
          <button
            key={index}
            className={`tictactoe-cell ${valor === 'X' ? 'cell-x' : ''} ${valor === 'O' ? 'cell-o' : ''}`}
            onClick={() => clicar(index)}
          >
            {valor}
          </button>
        ))}
      </div>

      <button className="tictactoe-reset-btn" onClick={reiniciar}>
        <i className="fa-solid fa-rotate-left"></i>
        Reiniciar
      </button>
    </div>
  );
}

function calcularVencedor(board) {
  const linhas = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];
  for (const [a, b, c] of linhas) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

export default TicTacToe;
