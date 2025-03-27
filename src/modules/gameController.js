import { updateBoardComp, updateBoardReal } from './dom';

export function setupPlayerTurn(game, containerID) {
  const container = document.getElementById(containerID);
  const container1 = document.getElementById('board-container1');
  const container2 = document.getElementById('board-container2');

  const playerState = document.getElementById('game-stat-real');
  const compState = document.getElementById('game-stat-computer');

  container.removeEventListener('click', handleEvent);
  container.addEventListener('click', handleEvent);

  // initial blur effect (player turn)
  container1.classList.add('blur');
  container2.classList = '';

  // event for cells
  function handleEvent(event) {
    const modal = document.getElementById('modal-result');
    const cell = event.target;

    playerState.style.display = 'block';
    compState.style.display = 'block';

    // hide the randomButton
    document.getElementById('random').style.display = 'none';

    if (!cell.classList.contains('cell')) return;
    if (cell.classList.contains('hit') || cell.classList.contains('miss')) {
      return;
    }

    // blur on computer turn
    container1.classList = '';
    container2.classList.add('blur');

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

        // udpate computer status board
        checkShipSunk(game.computerPlayer);
      }

      setTimeout(() => {
        // check game over
        if (handleGameOver(game, modal, container2, handleEvent)) {
          return;
        }

        // back to blur on player turn
        container1.classList.add('blur');
        container2.classList = '';

        // update player status board
        checkShipSunk(game.realPlayer);
      }, 1000);
    }
  }
}

function handleGameOver(game, modal, container2, handleEvent) {
  if (!game.checkGameOver()) {
    return false;
  }

  modal.style.display = 'block';
  container2.removeEventListener('click', handleEvent);
  container2.classList.add('game-over');

  const winnerName =
    game.currentTurn === 'real' ? 'Player Win!' : 'Computer Win!';
  document.getElementById('winner-name').innerText = winnerName;

  return true;
}

export function checkShipSunk(player) {
  const ships = player.gameboard.ships;
  const counts = { 4: 0, 3: 0, 2: 0, 1: 0 };

  ships.forEach(ship => {
    const length = ship.length;
    if (![4, 3, 2, 1].includes(length)) return;

    const index = counts[length];
    counts[length]++;

    const isSunk = ship.isSunk();
    let containerSelector;

    switch (length) {
      case 4:
        containerSelector = `#game-stat-${player.name} #ship-4 .ship-41`;
        break;
      case 3:
        containerSelector = `#game-stat-${player.name} #ship-3 .ship-3${index + 1}`;
        break;
      case 2:
        containerSelector = `#game-stat-${player.name} #ship-2 .ship-2${index + 1}`;
        break;
      case 1:
        containerSelector = `#game-stat-${player.name} #ship-1 .ship-1${index + 1}`;
        break;
      default:
        return;
    }

    const shipElements = document.querySelectorAll(
      `${containerSelector} .ship`
    );
    shipElements.forEach(el => el.classList.toggle('sunk', isSunk));
  });
}
