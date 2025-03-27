export function updateBoardReal(player, containerID) {
  const container = document.getElementById(containerID);
  const board = player.gameboard.board;

  // Clear and recreate the grid structure
  container.innerHTML = '';
  const grid = document.createElement('div');
  grid.classList.add(`grid`);

  // Add column labels (A-J)
  for (let i = 0; i < 10; i++) {
    const colLabel = document.createElement('div');
    colLabel.className = 'col-label';
    colLabel.textContent = String.fromCharCode(65 + i); // A, B, C, etc.
    colLabel.style.gridColumn = i + 2; // Start from second column
    colLabel.style.gridRow = 1;
    grid.appendChild(colLabel);
  }

  // Add row labels (1-10)
  for (let i = 0; i < 10; i++) {
    const rowLabel = document.createElement('div');
    rowLabel.className = 'row-label';
    rowLabel.textContent = i + 1; // 1, 2, 3, etc.
    rowLabel.style.gridRow = i + 2; // Start from second row
    rowLabel.style.gridColumn = 1;
    grid.appendChild(rowLabel);
  }

  for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
    for (let colIndex = 0; colIndex < 10; colIndex++) {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.dataset.x = rowIndex;
      cellElement.dataset.y = colIndex;
      // Position cells with offset for labels
      cellElement.style.gridRow = rowIndex + 2;
      cellElement.style.gridColumn = colIndex + 2;
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

  // Add column labels (A-J)
  for (let i = 0; i < 10; i++) {
    const colLabel = document.createElement('div');
    colLabel.className = 'col-label';
    colLabel.textContent = String.fromCharCode(65 + i); // A, B, C, etc.
    colLabel.style.gridColumn = i + 2; // Start from second column
    colLabel.style.gridRow = 1;
    grid.appendChild(colLabel);
  }

  // Add row labels (1-10)
  for (let i = 0; i < 10; i++) {
    const rowLabel = document.createElement('div');
    rowLabel.className = 'row-label';
    rowLabel.textContent = i + 1; // 1, 2, 3, etc.
    rowLabel.style.gridRow = i + 2; // Start from second row
    rowLabel.style.gridColumn = 1;
    grid.appendChild(rowLabel);
  }

  for (let rowIndex = 0; rowIndex < 10; rowIndex++) {
    for (let colIndex = 0; colIndex < 10; colIndex++) {
      const cellElement = document.createElement('div');
      cellElement.classList.add('cell');
      cellElement.dataset.x = rowIndex;
      cellElement.dataset.y = colIndex;
      // Position cells with offset for labels
      cellElement.style.gridRow = rowIndex + 2;
      cellElement.style.gridColumn = colIndex + 2;
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
