const boardElement = document.getElementById("board");
const statusText = document.getElementById("status");
const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popup-message");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winConditions = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

function renderBoard() {
  boardElement.innerHTML = "";
  board.forEach((value, i) => {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.textContent = value;
    cell.addEventListener("click", () => handleCellClick(i));
    boardElement.appendChild(cell);
  });
}

function handleCellClick(index) {
  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  renderBoard();
  checkWinner();
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  if (gameActive) statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWinner() {
  for (let condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      endGame(`Player ${currentPlayer} wins!`);
      return;
    }
  }

  if (!board.includes("")) {
    endGame("It's a draw!");
  }
}

function endGame(message) {
  statusText.textContent = message;
  popupMessage.textContent = message;
  popup.style.display = "flex";
  gameActive = false;
}

function closePopup() {
  popup.style.display = "none";
  restartGame();
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusText.textContent = "Player X's turn";
  renderBoard();
}

renderBoard();