import './style.css';
import { Player } from './modules/player';
import { Ship } from './modules/ship';
import { updateBoardComp, updateBoardReal, restartPage } from './modules/dom';
import { setupPlayerTurn } from './modules/init';
import { Game } from './modules/game';

// Player
const realPlayer = new Player('real');
const ship11 = new Ship(1);
const ship12 = new Ship(1);
const ship13 = new Ship(1);
const ship14 = new Ship(1);
const ship21 = new Ship(2);
const ship22 = new Ship(2);
const ship23 = new Ship(2);
const ship31 = new Ship(3);
const ship32 = new Ship(3);
const ship41 = new Ship(4);
realPlayer.gameboard.placeShipRandomly(
  ship11,
  ship12,
  ship13,
  ship14,
  ship21,
  ship22,
  ship23,
  ship31,
  ship32,
  ship41
);
updateBoardReal(realPlayer, 'board-container1');

// Computer
const computerPlayer = new Player('computer');
const compShip = new Ship(2);
computerPlayer.gameboard.placeShip(compShip, [0, 0]);
updateBoardComp(computerPlayer, 'board-container2');

const game = new Game(realPlayer, computerPlayer);
setupPlayerTurn(game, 'board-container2');

// evenListener for button
restartPageButton();

document.getElementById('random').addEventListener('click', () => {
  realPlayer.gameboard.placeShipRandomly(
    ship11,
    ship12,
    ship13,
    ship14,
    ship21,
    ship22,
    ship23,
    ship31,
    ship32,
    ship41
  );
  updateBoardReal(realPlayer, 'board-container1');
});
