function createMat(ROWS, COLS) {
  var mat = [];
  for (var i = 0; i < ROWS; i++) {
    var row = [];
    for (var j = 0; j < COLS; j++) {
      row.push("");
    }
    mat.push(row);
  }
  return mat;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}
function getEmptyPos() {
  var emptyPoss = [];
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      var currCell = gBoard[i][j];
      if (currCell.isShown) continue;
      if (currCell.isMine) continue;
      emptyPoss.push({ i: i, j: j });
    }
  }
  var randomCell = emptyPoss[getRandomInt(0, emptyPoss.length - 1)];
  return randomCell;
}

// Returns the class name for a specific cell
function getClassName(location) {
  var cellClass = "cell-" + location.i + "-" + location.j;
  return cellClass;
}
function getCellCoord(strCellId) {
  var parts = strCellId.split("-");
  var coord = { i: parts[1], j: parts[2] };
  return coord;
}
function renderCell(location, value) {
  var cellSelector = "." + getClassName(location);
  var elCell = document.querySelector(cellSelector);
  elCell.innerHTML = value;
}
