import './style.css';
import { Player } from './modules/player';
import { Ship } from './modules/ship';
import { createBoard, updateBoard } from './modules/boardDOM';

createBoard('board-container1');
createBoard('board-container2');

const realPlayer = new Player('real');
const computerPlayer = new Player('computer');

const ship = new Ship(3);
realPlayer.gameboard.placeShip(ship, [0, 0]);
console.log(realPlayer.gameboard.board);
updateBoard(realPlayer, 'board-container1');
