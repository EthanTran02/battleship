import './style.css';
import { Player } from './modules/player';
import { Ship } from './modules/ship';
import { updateBoard } from './modules/boardDOM';

// createBoard('board-container1');
// createBoard('board-container2');

const realPlayer = new Player('real');
const ship = new Ship(3);
const ship2 = new Ship(5);
realPlayer.gameboard.placeShip(ship, [0, 0]);
realPlayer.gameboard.placeShip(ship2, [4, 5]);
updateBoard(realPlayer, 'board-container1');

const computerPlayer = new Player('computer');
const compShip = new Ship(2);
const compShip2 = new Ship(4);
computerPlayer.gameboard.placeShip(compShip, [5, 2]);
computerPlayer.gameboard.placeShip(compShip2, [2, 7]);
updateBoard(computerPlayer, 'board-container2');
