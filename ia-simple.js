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

