let grid;
let spacing = 20;
let step;

function setup() {
  createCanvas(400, 400);
  background(51);
  grid = make2DArray(spacing, spacing);
  for (let i = 0; i < spacing; i++) {
    for (let j = 0; j < spacing; j++) {
      grid[i][j] = false;
    }
  }
  setupTestArray();
  frameRate(5);
  step = width / spacing;
}

function setupTestArray() {
  // solcillator
  grid[0][1] = true;
  grid[1][1] = true;
  grid[2][1] = true;

  // static square
  grid[5][0] = true;
  grid[6][0] = true;
  grid[5][1] = true;
  grid[6][1] = true;

  //glider
  grid[1][4] = true;
  grid[2][5] = true;
  grid[0][6] = true;
  grid[1][6] = true;
  grid[2][6] = true;
}

function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}

function deepCopyArray(oldA) {
  let newA = new Array(oldA.length);
  for (let i = 0; i < oldA.length; i++) {
    newA[i] = [...oldA[i]];
  }
  return newA;
}

function draw() {
  background(51);
  let newGrid = deepCopyArray(grid);
  for (var x = 0; x < width; x += step) {
    for (var y = 0; y < height; y += step) {
      stroke(255);
      strokeWeight(1);
      line(x, 0, x, height);
      line(0, y, width, y);
      let col = floor(x / step);
      let row = floor(y / step);
      let neighbours = getNeighbourCount(col, row);
      const alive = runGameRules(neighbours, grid[col][row]);
      newGrid[col][row] = alive;
      if (grid[col][row]) {
        fill(255, 204, 0);
        square(x, y, step);
      }
    }
  }
  grid = newGrid;
}

function getNeighbourCount(x, y) {
  let neighbours = 0;
  for (let i = x - 1; i <= x + 1; i++) {
    for (let j = y - 1; j <= y + 1; j++) {
      if (
        i >= 0 &&
        j >= 0 &&
        i < grid.length &&
        j < grid[0].length &&
        !(i == x && j == y) &&
        grid[i][j]
      ) {
        neighbours++;
      }
    }
  }
  return neighbours;
}

function runGameRules(neighbours, wasAlive) {
  if (!wasAlive) {
    return neighbours == 3;
  } else {
    return neighbours >= 2 && neighbours <= 3;
  }
}

function mouseClicked() {
  const arrX = floor(mouseX / step);
  const arrY = floor(mouseY / step);
  grid[arrX][arrY] = !grid[arrX][arrY];
  console.log(`clicked x: ${arrX}, y: ${arrY}`);
}
