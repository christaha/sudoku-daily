function getCellClassName(row, col) {
  let name = '';

  if (row === 1) {
    name += 'border-top';
  }

  if (row === 8) {
    name += 'border-bottom';
  }

  if (col === 1) {
    name += 'border-left';
  }

  if (col === 8) {
    name += 'border-right';
  }

  return name;
}
