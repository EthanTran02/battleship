import './style.css';
import { Player } from './modules/player';
import { Ship } from './modules/ship';
import { updateBoardComp, updateBoardReal, restartPage } from './modules/dom';
import { setupPlayerTurn } from './modules/gameController';
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
// const ship11 = new Ship(6);
// realPlayer.gameboard.placeShip(ship11, [0, 0]);
updateBoardReal(realPlayer, 'board-container1');

// Computer
const computerPlayer = new Player('computer');
const compship11 = new Ship(1);
const compship12 = new Ship(1);
const compship13 = new Ship(1);
const compship14 = new Ship(1);
const compship21 = new Ship(2);
const compship22 = new Ship(2);
const compship23 = new Ship(2);
const compship31 = new Ship(3);
const compship32 = new Ship(3);
const compship41 = new Ship(4);
computerPlayer.gameboard.placeShipRandomly(
  compship11,
  compship12,
  compship13,
  compship14,
  compship21,
  compship22,
  compship23,
  compship31,
  compship32,
  compship41
);
// const compship11 = new Ship(2);
// computerPlayer.gameboard.placeShip(compship11, [0, 0]);
updateBoardComp(computerPlayer, 'board-container2');

//start the game
const game = new Game(realPlayer, computerPlayer);
setupPlayerTurn(game, 'board-container2');

// --------------- evenListener for button --------------- //
restartPage();

// document.getElementById('random').addEventListener('click', () => {
//   realPlayer.gameboard.placeShipRandomly(
//     ship11,
//     ship12,
//     ship13,
//     ship14,
//     ship21,
//     ship22,
//     ship23,
//     ship31,
//     ship32,
//     ship41
//   );
//   updateBoardReal(realPlayer, 'board-container1');
// });

// FIX: player win => popup modal | computerwin NOT popup modal
// maybe a board for checkint status => 2 baord display all ship ship a ship sunk, update the board for real-time interaction
