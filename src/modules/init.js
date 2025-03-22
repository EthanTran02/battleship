import { updateBoardComp, updateBoardReal } from "./dom";

export function setupPlayerTurn(game, containerID) {
  const container = document.getElementById(containerID);
  const container1 = document.getElementById('board-container1');
  const container2 = document.getElementById('board-container2');

  container.removeEventListener('click', handleEvent);
  container.addEventListener('click', handleEvent);

  // initial blur effect (player turn)
  container1.classList.add('blur');
  container2.classList = '';

  // event for cells
  function handleEvent(event) {
    const modal = document.getElementById('modal-result');
    const cell = event.target;

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
      }

      // if game over
      if (game.checkGameOver()) {
        modal.style.display = 'block';
        container2.removeEventListener('click', handleEvent);
        container2.classList.add('game-over');
        return;
      }

      // back to blur on player turn
      setTimeout(() => {
        container1.classList.add('blur');
        container2.classList = '';
      }, 1000);
    }
  }
}
