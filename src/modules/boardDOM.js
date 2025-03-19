export function createBoard(containerID) {

  const container = document.getElementById(containerID);
  const grid = document.createElement('div');
  grid.classList.add('grid');

  for (let i = 0; i < 100; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.x = i % 10;
    cell.dataset.y = Math.floor(i / 10);
    grid.appendChild(cell);
  }
  container.appendChild(grid);
}
