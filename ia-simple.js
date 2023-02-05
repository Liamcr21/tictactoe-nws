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
            
            const getAISymbol = () => {
            return playerSymbol === 'X' ? 'O' : 'X';
            };
            
            const checkForWinningConditions = () => {
            let symbol = currentTurn;
            for (let i = 0; i < gridSize; i++) {
            let rowWin = true;
            let colWin = true;
            for (let j = 0; j < gridSize; j++) {
            if (gameBoard[i][j] !== symbol) {
            rowWin = false;
            }
            if (gameBoard[j][i] !== symbol) {
            colWin = false;
            }
            }
            if (rowWin || colWin) {
            winner = symbol;
            showResult(symbol + ' a gagné!');
            return;
            }
            }
            
            let diagWin1 = true;
            let diagWin2 = true;
            for (let i = 0; i < gridSize; i++) {
            if (gameBoard[i][i] !== symbol) {
            diagWin1 = false;
            }
            if (gameBoard[i][gridSize - i - 1] !== symbol) {
            diagWin2 = false;
            }
            }
            if (diagWin1 || diagWin2) {
            winner = symbol;
            showResult(symbol + ' a gagné!');
            return;
            }
            
            let draw = true;
            for (let i = 0; i < gridSize; i++) {
            for (let j = 0; j < gridSize; j++) {
            if (gameBoard[i][j] === null) {
            draw = false;
            }
            }
            }
            if (draw) {
            showResult('Match nul!');
            }
            };
            
            