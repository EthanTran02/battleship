// export function createBoard(containerID) {
//   const container = document.getElementById(containerID);
//   if (!container) {
//     throw new Error(`Container ${containerID} not found`);
//     return;
//   }
//   const grid = document.createElement('div');
//   grid.classList.add('grid');
//   grid.id = `${containerID}-grid`;

//   for (let i = 0; i < 100; i++) {
//     const cell = document.createElement('div');
//     cell.classList.add('cell');
//     cell.dataset.x = i % 10;
//     cell.dataset.y = Math.floor(i / 10);
//     grid.appendChild(cell);
//   }
//   container.appendChild(grid);
// }

export function updateBoard(player, containerID) {
  const container = document.getElementById(containerID);
  const board = player.gameboard.board;

  // Clear and recreate the grid structure
  container.innerHTML = '';
  const grid = document.createElement('div');
  grid.classList.add('grid');

  for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
    for (let colIndex = 0; colIndex < 10; colIndex++) {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      const cellContent = board[rowIndex][colIndex];
      // Check if the cell contains a ship object (not null and not 'X' or 'O')
      if (cellContent !== null && cellContent !== 'hit' && cellContent !== 'miss') {
        cellElement.classList.add('ship');
      }
      grid.appendChild(cellElement);
    }
  }
  container.appendChild(grid);
}
