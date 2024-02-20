function createEmptyBoard() {
  const result = [];
  for (let r = 0; r < 9; r += 1) {
    const row = [];
    for (let c = 0; c < 9; c += 1) {
      row.push('.');
    }
    result.push(row);
  }
  return result;
}

function createShuffledArray(start, end) {
  const unshuffled = [];
  for (let i = start; i <= end; i += 1) {
    unshuffled.push(i);
  }

  const shuffled = unshuffled.map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  return shuffled;
}

function copyBoard(board) {
  return structuredClone(board);
}

module.exports = { createShuffledArray, createEmptyBoard, copyBoard };
