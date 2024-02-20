class Game {
  constructor() {
    this.board = undefined;
  }

  fetchBoard = async () => {
    const res = await fetch('/api/board');
    const data = await res.json();
    this.board = data[0].board;
    return data[0].board;
  };

  createInput = (element, row, col) => {
    if (this.board[row][col] === '.') {
      const cellInput = document.createElement('input');
      cellInput.type = 'text';
      cellInput.maxLength = 1;
      cellInput.className = 'cell-input';
      cellInput.id = `${row}_${col}_input`;
      element.appendChild(cellInput);
    } else {
      const cellText = document.createElement('div');
      cellText.innerHTML = String(this.board[row][col]);
      element.appendChild(cellText);
    }
  };

  displayBoard = async () => {
    await this.fetchBoard();

    const gameWrapper = document.getElementById('game-wrapper');

    const result = document.createElement('tbody');
    result.className = 'sudoku-board';

    gameWrapper.appendChild(result);

    for (let i = 0; i < 9; i += 1) {
      const row = document.createElement('tr');
      row.className = `${i}_row`;
      result.appendChild(row);

      for (let j = 0; j < 9; j += 1) {
        const cell = document.createElement('td');
        cell.id = `${i}_${j}_cell`;

        this.createInput(cell, i, j);
        row.appendChild(cell);
      }
    }
  };
}

const game = new Game();

async function startGame() {
  await game.displayBoard();
}

document.addEventListener('DOMContentLoaded', startGame);
