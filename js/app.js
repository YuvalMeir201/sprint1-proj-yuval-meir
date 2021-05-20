"use strict";
const BOMB = " 💣 ";
const NORMAL = "😁";
const LOSE = "🤯";
const WIN = "😎";
const EMPTY = "";
const FLAG = "🚩";

var gBoard;
var gInterval;
var gTimer = 0;
var gLives;

var gLevel = {
  size: 4,
  mines: 2,
};

var gGame = {
  isOn: false,
  shownCount: 0,
  markedCount: 0,
  secsPassed: 0,
};

function initGame() {
  gLives = 3;

  var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
  };

  gBoard = buildBoard();
  addBomb();
  printMat(gBoard, ".board-container");
  gGame.isOn = true;
  renderLives();
}

function setDifficult(size, numMines) {
  gLevel = {
    size: size,
    mines: numMines,
  };
  initGame();
}

function buildBoard() {
  var board = createMat(gLevel.size, gLevel.size);
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board[0].length; j++) {
      var cell = {
        minesAroundCount: 0,
        isShown: false,
        isMine: false,
        isMarked: false,
      };
      board[i][j] = cell;
    }
  }
  console.table(board);
  return board;
}


function printMat(mat, selector) {
  var strHTML = '<table border="0"><tbody>';
  for (var i = 0; i < mat.length; i++) {
    strHTML += "<tr>";
    for (var j = 0; j < mat[0].length; j++) {
      var cell = EMPTY;
      var className = "cell-" + i + "-" + j;
      strHTML += `<td class="cell ${className}" onclick="cellClicked(this)">${cell} </td>`;
    }
    strHTML += "</tr>";
  }
  strHTML += "</tbody></table>";
  var elContainer = document.querySelector(selector);
  elContainer.innerHTML = strHTML;
}

function mouseAction(ev) {
  var elCell = ev.path[0].classList[1];
  if (!elCell) return;
  var cellCoord = getCellCoord(elCell);
  switch (ev.button) {
    case 0:
      if (!gGame.isOn) return;
      break;
    case 2:
      renderFlag(cellCoord);
      break;
  }
}

function cellClicked(elCell) {
  var cellCoord = getCellCoord(elCell.classList[1]);
  var currCell = gBoard[cellCoord.i][cellCoord.j];
  console.log(currCell);
  elCell.classList.add("cell-pressed");
  //if(!gGame.isOn) return;
  if (currCell.isMarked === true) return;
  if (currCell.isShown === true) return;

  if (checkFirstMove()) {
    StartTimer();
    currCell.isShown = true;
    if (currCell.isMine === true) {
      currCell.isMine = false;
      addBomb();
      setMinesNegsCount(gBoard);
      printMat(gBoard, ".board-container");
      renderCell(cellCoord, EMPTY);
    }
  }
  if (currCell.isMine) {
    if (gLives > 0) {
      gLives--;
      renderLives();
      renderCell(cellCoord, BOMB);
      currCell.isShown = true;
      return;
    } else {
      renderCell(cellCoord, BOMB);
      currCell.isShown = true;
      gameOver();
      return;
    }
  }
  if (!currCell.isMine) {
    if (currCell.minesAroundCount === 0) {
      expandShown(gBoard, elCell, cellCoord.i, cellCoord.j);
      renderCell(cellCoord, EMPTY);
      elCell.classList.add("cell-pressed");
      currCell.isShown = true;
    } else if (currCell.minesAroundCount > 0) {
      renderCell(cellCoord, currCell.minesAroundCount);
      elCell.classList.add("cell-pressed");
      currCell.isShown = true;
    }
    if(checkGameOver()){
      victory();
    }
  }
}
function expandShown(board, elCell, coordI, coordJ) {
  board[coordI][coordJ].isShown = true;
  elCell.classList.add("cell-pressed");
  for (var i = coordI - 1; i <= coordI + 1; i++) {
    if (i < 0 || i >= board.length) continue;
    for (var j = coordJ - 1; j <= coordJ + 1; j++) {
      if (j < 0 || j >= board[0].length) continue;
      if (i === coordI && j === coordJ) continue;
      var currCell = board[i][j];
      currCell.isShown = true;
      if (currCell.minesAroundCount > 0) {
        currCell.classList.add("cell-pressed");
        renderCell({ i: i, j: j }, currCell.minesAroundCount);
        currCell.isShown = true;
      } else if (currCell.minesAroundCount === 0) {
        currCell.classList.add("cell-pressed");
        renderCell({ i: i, j: j }, EMPTY);
        currCell.isShown = true;
      }
    }
  }
}
function checkGameOver(gBoard) {
  for(var i=0;i<gBoard.length;i++){
    for (var j=0;j<gBoard[0].length;j++){
      var currCell=gBoard[i][j];
      if(currCell.isMine){
        if(!currCell.isMarked) return false;
      }
      if(currCell.isMine===false){
        if(!currCell.isShown) return false;
      }
    }
  }
  return true;
}

function checkFirstMove() {
  for (var i = 0; i < gBoard.length; i++) {
    for (var j = 0; j < gBoard[0].length; j++) {
      var currCell = gBoard[i][j];
      if (currCell.isShown) {
        return false;
      }
    }
  }
  return true;
}

function renderLives() {
  var strHtml = "";
  for (var i = 0; i < gLives; i++) {
    strHtml += "❤️";
  }
  var elLive = document.querySelector(".live span");
  elLive.innerHTML = strHtml;
}

function renderFlag(cellCoord) {
 // if (!gGame.isOn) return;
  var currCell = gBoard[cellCoord.i][cellCoord.j];
  if (currCell.isShown) return;
  if (!currCell.isMarked) {
    currCell.isMarked = true;
    renderCell(cellCoord, FLAG);
  } else {
    currCell.isMarked = false;
    renderCell(cellCoord, EMPTY);
  }
}
function StartTimer() {
  var elTimer = document.querySelector(".clock span");
  gInterval = setInterval(function () {
    gGame.secsPassed += 0.01;
    elTimer.innerText = gGame.secsPassed.toFixed(2);
  }, 10);
}

function stopTimer() {
  clearInterval(gInterval);
  gGame.secsPassed = 0;
}
function gameOver() {
  elTitle=document.querySelector('h2');
  elTiltle.innerText= 'Game Over!';
  gGame.isOn = false;
  stopTimer();
}

function victory() {
  elTitle=document.querySelector('h2');
  elTiltle.innerText= 'You Win!';
  gGame.isOn=false;
  stopTimer();
}
function restartGame() {
  stopTimer();
  initGame();
}
