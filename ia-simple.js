let gridSize;
let playerSymbol;
let gameBoard;
let currentTurn;
let winner;

const startGame = () => {
  gridSize = parseInt(document.querySelector('input[name="gridSize"]:checked').value);
  playerSymbol = document.querySelector('input[name="symbol"]:checked').value;
  gameBoard = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));
  currentTurn = playerSymbol;
  winner = null;

  const table = document.querySelector('#gameBoard');
  table.innerHTML = '';

  for (let i = 0; i < gridSize; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < gridSize; j++) {
      const cell = document.createElement('td');
      cell.addEventListener('click', () => {
        if (!winner && gameBoard[i][j] === null) {
          cell.textContent = playerSymbol;
          gameBoard[i][j] = playerSymbol;
          checkForWinningConditions();
          if (!winner) {
            const aiMove = getAIMove();
            gameBoard[aiMove.i][aiMove.j] = getAISymbol();
            document.querySelector(`tr:nth-child(${aiMove.i + 1}) td:nth-child(${aiMove.j + 1})`).textContent = getAISymbol();
            checkForWinningConditions();
            }
            }
            });
            row.appendChild(cell);
            }
            table.appendChild(row);
            }
            };
  