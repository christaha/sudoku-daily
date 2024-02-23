class Game {
  constructor() {
    this.board = undefined;
    this.activeCell = undefined;
  }

  fetchBoard = async () => {
    const res = await fetch('/api/board');
    const data = await res.json();
    this.board = data[0].board;
    return data[0].board;
  };

  updateBoard = (value) => {
    const newValue = value === '.' ? '' : value;
    document.getElementById(this.activeCell).innerHTML = newValue;
    const [row, col] = this.activeCell.split('_');
    this.board[row][col] = newValue;
  };

  updateActiveCell = (event) => {
    if (this.activeCell) {
      document.getElementById(this.activeCell).classList.remove('active');
    }
    this.activeCell = event.srcElement.id;
    document.getElementById(event.srcElement.id).classList.add('active');
  };

  createCell = (element, row, col) => {
    const cell = document.createElement('td');
    cell.id = `${row}_${col}_cell`;
    const cellText = document.createElement('div');

    if (this.board[row][col] === '.') {
      cellText.id = `${row}_${col}_input`;
      cell.onclick = this.updateActiveCell;
    } else {
      cell.classList.add('filled-in-tile');
      cellText.innerHTML = String(this.board[row][col]);
      cell.appendChild(cellText);
    }

    if (row === 2 || row === 5) {
      cell.classList.add('border-bottom');
    }

    if (col === 2 || col === 5) {
      cell.classList.add('border-right');
    }

    element.appendChild(cell);
  };

  displayBoard = async () => {
    await this.fetchBoard();

    const loader = document.getElementById('loading-wrapper');
    loader.className = 'hidden';

    const gameWrapper = document.getElementById('game-wrapper');
    const gameTable = document.createElement('div');
    gameTable.id = 'game-table';
    gameWrapper.appendChild(gameTable);

    const result = document.createElement('tbody');
    result.className = 'sudoku-board';

    gameTable.appendChild(result);

    for (let i = 0; i < 9; i += 1) {
      const row = document.createElement('tr');

      row.className = `${i}_row`;
      result.appendChild(row);

      for (let j = 0; j < 9; j += 1) {
        this.createCell(row, i, j);
      }
    }
  };
}

// Create listeners
const game = new Game();

function onNumberClick(e) {
  game.updateBoard(e.target.id);
}

function addListenerToNumbers() {
  const buttons = document.getElementsByClassName('number-button');
  const buttonsCount = buttons.length;
  for (let i = 0; i < buttonsCount; i += 1) {
    buttons[i].onclick = onNumberClick;
  }
}

async function startGame() {
  await game.displayBoard();
  addListenerToNumbers();
}

document.addEventListener('DOMContentLoaded', startGame);
