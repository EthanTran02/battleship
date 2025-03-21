import './style.css';
import { Player } from './modules/player';
import { Ship } from './modules/ship';
import {
  updateBoardComp,
  updateBoardReal,
  setupPlayerTurn,
} from './modules/dom';
import { Game } from './modules/game';

const realPlayer = new Player('real');
const ship = new Ship(3);
const ship2 = new Ship(5);
realPlayer.gameboard.placeShip(ship, [0, 0]);
realPlayer.gameboard.placeShip(ship2, [4, 5]);
updateBoardReal(realPlayer, 'board-container1');

const computerPlayer = new Player('computer');
const compShip = new Ship(2);
const compShip2 = new Ship(4);
computerPlayer.gameboard.placeShip(compShip, [0, 0]);
computerPlayer.gameboard.placeShip(compShip2, [4, 5]);
updateBoardComp(computerPlayer, 'board-container2');

const game = new Game(realPlayer, computerPlayer);
setupPlayerTurn(game, 'board-container2');
