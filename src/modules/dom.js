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

export function setupPlayerTurn(game, containerID) {
  const container = document.getElementById(containerID);

  container.removeEventListener('click', handleEvent);
  container.addEventListener('click', handleEvent);

  function handleEvent(event) {
    const modal = document.getElementById('modal-result');

    if (!event.target.classList.contains('cell')) return;
    if (game.currentTurn === 'real') {
      const cell = event.target;
      const x = parseInt(cell.dataset.x);
      const y = parseInt(cell.dataset.y);
      const cellContent = game.computerPlayer.gameboard.board[x][y];

      if (cellContent !== 'hit' && cellContent !== 'miss') {
        game.computerPlayer.gameboard.receiveAttack(x, y);
        updateBoardComp(game.computerPlayer, containerID);
        game.handleTurnComplete();
        updateBoardReal(game.realPlayer, 'board-container1');
      }

      if (game.checkGameOver()) {
        modal.style.display = 'block';
        container.removeEventListener('click', handleEvent);
        container.classList.add('game-over');
        return;
      }
    }
  }
}
