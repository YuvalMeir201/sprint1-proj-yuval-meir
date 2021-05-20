'use strict';

function addBomb() {
    for (var i = 0; i < gLevel.mines; i++) {
      var currCell = getEmptyPos();
      var coordI = currCell.i;
      var coordJ = currCell.j;
      gBoard[coordI][coordJ].isMine = true;
    }
    setMinesNegsCount(gBoard);
  }
  
  function setMinesNegsCount(board) {
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board[0].length; j++) {
        var cell = board[i][j];
        if (cell.isMine === true) continue;
        cell.minesAroundCount = countMines(i, j);
      }
    }
  }
  function countMines(cellI, cellJ) {
    var countMines = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
      if (i < 0 || i >= gBoard.length) continue;
      for (var j = cellJ - 1; j <= cellJ + 1; j++) {
        if (i === cellI && j === cellJ) continue;
        if (j < 0 || j >= gBoard[i].length) continue;
        if (gBoard[i][j].isMine === true) {
          countMines++;
        }
      }
    }
    return countMines;
  }