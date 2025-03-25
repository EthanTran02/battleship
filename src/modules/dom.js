export function updateBoardReal(player, containerID) {
  const container = document.getElementById(containerID);
  const board = player.gameboard.board;

  // Clear and recreate the grid structure
  container.innerHTML = '';
  const grid = document.createElement('div');
  grid.classList.add(`grid`);

  for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
    for (let colIndex = 0; colIndex < 10; colIndex++) {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.dataset.x = rowIndex;
      cellElement.dataset.y = colIndex;
      const cellContent = board[rowIndex][colIndex];
      // Check if the cell contains a ship object (not null and not 'X' or 'O')
      if (
        cellContent !== null &&
        cellContent !== 'hit' &&
        cellContent !== 'miss'
      ) {
        cellElement.classList.add('ship');
      } else if (cellContent === 'hit') {
        cellElement.classList.add('hit');
      } else if (cellContent === 'miss') {
        cellElement.classList.add('miss');
      }
      grid.appendChild(cellElement);
    }
  }
  container.appendChild(grid);
}

export function updateBoardComp(player, containerID) {
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
      cellElement.dataset.x = rowIndex;
      cellElement.dataset.y = colIndex;
      const cellContent = board[rowIndex][colIndex];
      // Check if the cell contains a ship object (not null and not 'X' or 'O')
      if (cellContent === 'hit') {
        cellElement.classList.add('hit');
      } else if (cellContent === 'miss') {
        cellElement.classList.add('miss');
      }
      grid.appendChild(cellElement);
    }
  }
  container.appendChild(grid);
}

export function restartPage() {
  document.getElementById('restart-button').addEventListener('click', () => {
    location.reload();
  });
}

export function shipPlaceRandomly(player, containerID) {
  document.getElementById('random').addEventListener('click', () => {
    const ships = player.gameboard.ships;
    player.gameboard.placeShipRandomly(...ships);
    updateBoardReal(player, containerID);
  });
}
